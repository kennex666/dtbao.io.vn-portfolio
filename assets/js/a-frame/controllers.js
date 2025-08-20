// AFRAME.registerComponent("lock-camera", {
// 	init: function () {
// 		// this.el.components["look-controls"].pause();
// 		this.el.object3D.rotation.set(-1.143, 0, 0);
// 	},
// });

AFRAME.registerComponent("adaptive-cursor", {
	init: function () {
		const isMobile = AFRAME.utils.device.isMobile();
		const isHeadset = AFRAME.utils.device.checkHeadsetConnected();
		settings.device = isHeadset ? "vr" : isMobile ? "mobile" : "pc";
	},
});

AFRAME.registerComponent("joystick-keyboard", {
	init: function () {
		if (!settings.isTouchable) return;

		const keyMap = {
			forward: "KeyW",
			backward: "KeyS",
			left: "KeyA",
			right: "KeyD",
		};

		const keysDown = new Set();

		const dispatchKey = (type, code) => {
			const event = new KeyboardEvent(type, {
				code,
				key: code.replace("Key", ""),
				keyCode: code.charCodeAt(0),
				bubbles: true,
			});
			window.dispatchEvent(event);
		};

		const handleKeyState = (dir, pressed) => {
			const code = keyMap[dir];
			if (!code) return;

			if (pressed && !keysDown.has(code)) {
				keysDown.add(code);
				dispatchKey("keydown", code);
			} else if (!pressed && keysDown.has(code)) {
				keysDown.delete(code);
				dispatchKey("keyup", code);
			}
		};

		const zone = document.getElementById("joystick-container");
		if (!zone) {
			console.warn("Joystick container not found.");
			return;
		}
		zone.style.display = "block";
		zone.style.touchAction = "none"; // Ngăn browser gesture default
		zone.style.pointerEvents = "auto"; // Đảm bảo joystick nhận touch riêng

		const joystick = nipplejs.create({
			zone: zone,
			mode: "static",
			position: { left: "5vw", bottom: "10vh" },
			color: "white",
			size: 110,
			multitouch: true, // hỗ trợ đa điểm
		});

		let lastDir = {
			forward: false,
			backward: false,
			left: false,
			right: false,
		};

		const updateDirection = (angle) => {
			const dir = {
				forward: angle > 30 && angle < 150,
				backward: angle > 210 && angle < 330,
				left: angle > 120 && angle < 240,
				right: angle < 30 || angle > 330,
			};

			for (const d in dir) {
				if (dir[d] !== lastDir[d]) {
					handleKeyState(d, dir[d]);
					lastDir[d] = dir[d];
				}
			}
		};

		joystick.on("move", (evt, data) => {
			if (data?.angle?.degree != null) {
				updateDirection(data.angle.degree);
			}
		});

		joystick.on("end", () => {
			for (const d in keyMap) {
				handleKeyState(d, false);
				lastDir[d] = false;
			}
		});
	},
});

AFRAME.registerComponent("touch-drag-look", {
	schema: {
		enabled: { default: true },
	},
	init: function () {
		this.xRotation = 0;
		this.yRotation = 0;
		this.startX = 0;
		this.startY = 0;
		this.touchId = null;
		this.dragging = false;
		const isMobile = AFRAME.utils.device.isMobile();

		if (isMobile || settings.isTouchable) {
			this.el.setAttribute(
				"look-controls",
				"enabled: false; magicWindowTrackingEnabled: false;"
			);
		}
		// PC (default mouse)
		else {
			this.el.setAttribute(
				"look-controls",
				"enabled: true; magicWindowTrackingEnabled: false; reverseMouseDrag: true;"
			);
		}

		this.el.sceneEl.canvas.addEventListener(
			"touchstart",
			this.onTouchStart.bind(this),
			{ passive: false }
		);
		this.el.sceneEl.canvas.addEventListener(
			"touchmove",
			this.onTouchMove.bind(this),
			{ passive: false }
		);
		this.el.sceneEl.canvas.addEventListener(
			"touchend",
			this.onTouchEnd.bind(this)
		);

		if (isMobile || settings.isTouchable) {
			console.log("touch update listening")
			this.el.addEventListener("update-xy", (t) => {
				this.el.object3D.rotation.set(t.detail.x, t.detail.y, 0);
			});
		}
		
	},
	onTouchStart: function (e) {
		if (!this.data.enabled) return;
		for (let i = 0; i < e.touches.length; i++) {
			const t = e.touches[i];
			if (t.clientX > window.innerWidth * 0.3) {
				this.touchId = t.identifier;
				this.startX = t.clientX;
				this.startY = t.clientY;
					
				const rot = this.el.object3D.rotation;
				this.xRotation = THREE.MathUtils.radToDeg(rot.x);
				this.yRotation = THREE.MathUtils.radToDeg(rot.y);

				this.dragging = true;
				e.preventDefault();
				break;
			}
		}
	},
	onTouchMove: function (e) {
		if (!this.dragging) return;

		for (let i = 0; i < e.changedTouches.length; i++) {
			const t = e.changedTouches[i];
			if (t.identifier == this.touchId) {
				const deltaX = t.clientX - this.startX;
				const deltaY = t.clientY - this.startY;

				this.yRotation -= deltaX * 0.12;
				this.xRotation -= deltaY * 0.12;

				this.xRotation = Math.max(-90, Math.min(90, this.xRotation));

				this.el.object3D.rotation.y = THREE.MathUtils.degToRad(
					this.yRotation
				);
				this.el.object3D.rotation.x = THREE.MathUtils.degToRad(
					this.xRotation
				);

				this.startX = t.clientX;
				this.startY = t.clientY;
				e.preventDefault();
				break;
			}
		}
	},
	onTouchEnd: function (e) {
		for (let i = 0; i < e.changedTouches.length; i++) {
			const t = e.changedTouches[i];
			if (t.identifier === this.touchId) {
				this.dragging = false;
				this.touchId = null;
				break;
			}
		}
	},
});