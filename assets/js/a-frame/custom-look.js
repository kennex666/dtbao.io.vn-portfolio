AFRAME.registerComponent("custom-look", {
	init: function () {
		function adjustY(delta) {
			const pos = el.getAttribute("position");
			pos.y += delta;
			el.setAttribute("position", pos);
		}
		function loopAdjustY() {
			if (isCtrlHeld) {
				adjustY(-0.05); // Giảm dần
			}
			if (isSpaceHeld) {
				adjustY(0.05); // Tăng dần
			}
			if (isCtrlHeld || isSpaceHeld) {
				requestAnimationFrame(loopAdjustY);
			}
		}

		let el = this.el;
		let isCtrlHeld = false;
		let isSpaceHeld = false;


		el.addEventListener("update-xy", function (t) {
			let lookControls = el.components["look-controls"];
			if (lookControls) {
				lookControls.pitchObject.rotation.x = t.detail.x;
				lookControls.yawObject.rotation.y = t.detail.y;
			}
		});

		el.addEventListener("update-position", function (t) {
			camera.setAttribute("position", {
				x: t.detail.x,
				y: t.detail.y,
				z: t.detail.z,
			});
		});

		window.addEventListener("wheel", (e) => {
			if (settings.isDevMode) return;
			if (settings.disableScroll) return;
			const dir = e.deltaY > 0 ? -0.2 : 0.2;
			adjustY(dir);
		});

		window.addEventListener("keydown", (e) => {
			if (settings.isDevMode || settings.disableScroll) return;

			if (e.key === "Control" && !isCtrlHeld) {
				isCtrlHeld = true;
				loopAdjustY();
			}
			if (e.code === "Space" && !isSpaceHeld) {
				e.preventDefault();
				isSpaceHeld = true;
				loopAdjustY();
			}
		});
		window.addEventListener("keyup", (e) => {
			if (e.key === "Control") {
				isCtrlHeld = false;
			}
			if (e.code === "Space") {
				isSpaceHeld = false;
			}
		});
	},
	getCurrentRotation: function () {
		let lookControls = this.el.components["look-controls"];
		if (lookControls) {
			return {
				x: lookControls.pitchObject.rotation.x,
				y: lookControls.yawObject.rotation.y,
			};
		}
	},
});

AFRAME.registerComponent("custom-color", {
	schema: {
		color: { type: "string", default: "#d6a84f" },
	},
	init: function () {
		this.el.addEventListener("model-loaded", () => {
			const mesh = this.el.getObject3D("mesh");
			if (!mesh) return;

			mesh.traverse((node) => {
				if (node.isMesh && node.material) {
					node.material.color.set(this.data.color); // màu vàng dịu
					node.material.roughness = 0.7; // bớt bóng
					node.material.metalness = 0.1; // hơi có phản sáng
					node.material.needsUpdate = true;
				}
			});
		});
	},
});

AFRAME.registerComponent("force-flat-shader", {
	init: function () {
		this.el.addEventListener("model-loaded", () => {
			const model = this.el.getObject3D("mesh");
			if (!model) return;

			model.traverse((node) => {
				if (node.isMesh) {
					node.material = new THREE.MeshBasicMaterial({
						map: node.material.map, // giữ texture cũ nếu có
						color: node.material.color,
						transparent: node.material.transparent,
						opacity: node.material.opacity,
					});
				}
			});
		});
	},
});
