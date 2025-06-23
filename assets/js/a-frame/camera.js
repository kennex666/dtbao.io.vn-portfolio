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

		let rayOrigin = "mouse";
		let useFuse = false;

		// VR headset
		if (isHeadset) {
			rayOrigin = "entity";
			useFuse = true;
		}
		// Mobile (touch screen)
		else if (isMobile) {
			rayOrigin = "entity";
			useFuse = false;
			btnUse.style.display = "block"
		}
		// PC (default mouse)
		else {
			rayOrigin = "mouse";
			useFuse = false;
		}

		this.el.setAttribute("cursor", {
			rayOrigin: rayOrigin,
			fuse: useFuse,
			fuseTimeout: 1500,
		});

		this.el.setAttribute("raycaster", {
			objects: ".clickable",
		});

		settings.device = isHeadset ? "vr" : isMobile ? "mobile" : "pc";

		if (settings.device != "pc"){
			camera.innerHTML = `<a-entity
				a-entity=""
				position="0 0 -1"
				geometry="primitive: ring; radiusInner: 0.001; radiusOuter: 0.005"
				material="shader: flat; color: #ffffff"
			></a-entity>`;
		}

		console.log(
			`[adaptive-cursor] Setup for ${
				isHeadset ? "VR" : isMobile ? "Mobile" : "PC"
			}: rayOrigin=${rayOrigin}, fuse=${useFuse}`
		);
	},
});

AFRAME.registerComponent("joystick-keyboard", {
	init: function () {
		if (navigator.maxTouchPoints === 0) return; // chỉ chạy trên thiết bị cảm ứng

		const keyMap = {
			forward: "KeyW",
			backward: "KeyS",
			left: "KeyA",
			right: "KeyD",
		};

		const keysDown = new Set();

		const dispatchKey = (type, code) => {
			const event = new KeyboardEvent(type, {
				code: code,
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
		zone.style.display = "block";

		const joystick = nipplejs.create({
			zone: zone,
			mode: "static",
			position: { left: "5vw", bottom: "10vh" },
			color: "white",
			size: 100,
		});

		joystick.on("move", (evt, data) => {
			const angle = data.angle.degree;
			handleKeyState("left", angle > 120 && angle < 240);
			handleKeyState("backward", angle > 210 && angle < 330);
			handleKeyState("forward", angle > 30 && angle < 150);
			handleKeyState("right", angle < 30 || angle > 330);
		});

		joystick.on("end", () => {
			Object.keys(keyMap).forEach((dir) => handleKeyState(dir, false));
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
		this.dragging = false;
		const isMobile = AFRAME.utils.device.isMobile();
		const isHeadset = AFRAME.utils.device.checkHeadsetConnected();
		
		// VR headset
		if (isHeadset) {
			this.el.setAttribute(
				"look-controls", "enabled: true; magicWindowTrackingEnabled: true;" )
		}
		// Mobile (touch screen)
		else if (isMobile) {
			this.el.setAttribute(
				"look-controls",
				"enabled: false; magicWindowTrackingEnabled: false;"
			);
		}
		// PC (default mouse)
		else {
			this.el.setAttribute(
				"look-controls",
				"enabled: true; magicWindowTrackingEnabled: false;"
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
	},
	onTouchStart: function (e) {
		if (!this.data.enabled) return;
		this.dragging = true;
		this.startX = e.touches[0].clientX;
		this.startY = e.touches[0].clientY;
		e.preventDefault();
	},
	onTouchMove: function (e) {
		if (!this.dragging) return;

		const deltaX = e.touches[0].clientX - this.startX;
		const deltaY = e.touches[0].clientY - this.startY;

		this.yRotation -= deltaX * 0.12;
		this.xRotation -= deltaY * 0.12;

		this.xRotation = Math.max(-90, Math.min(90, this.xRotation));

		this.el.object3D.rotation.y = THREE.MathUtils.degToRad(this.yRotation);
		this.el.object3D.rotation.x = THREE.MathUtils.degToRad(this.xRotation);

		this.startX = e.touches[0].clientX;
		this.startY = e.touches[0].clientY;
		e.preventDefault();
	},
	onTouchEnd: function () {
		this.dragging = false;
	},
});



AFRAME.registerComponent("sky-boundary-check", {
	schema: {
		radius: { type: "number", default: 50 },
		message: { type: "selector" },
	},
	tick() {
		const cameraPos = this.el.object3D.position;
		const distance = cameraPos.length();
		if (settings.easterEggs.unlocked.includes("chien_binh_ranh_roi")) {
			return;
		}

		if (
			settings.easterEggs.sky.script.length > settings.easterEggs.sky.currentStep &&
			distance > settings.easterEggs.sky.script[settings.easterEggs.sky.currentStep]?.boundary
		) {
			// unlock thành tựu
			if (settings.easterEggs.sky.script.length == ++settings.easterEggs.sky.currentStep)
				settings.easterEggs.unlocked.push("chien_binh_ranh_roi");
			
			alert(
				settings.easterEggs.sky.script[
					settings.easterEggs.sky.currentStep - 1
				]?.text
					.replace(
						"{easter_egg_count}",
						settings.easterEggs.unlocked.length
					)
					.replace(
						"{easter_egg_total}",
						settings.easterEggs.total.length
					)
			);
		}
	},
});
