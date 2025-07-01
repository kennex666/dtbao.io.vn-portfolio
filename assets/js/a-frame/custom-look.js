AFRAME.registerComponent("custom-look", {
	init: function () {
		let el = this.el;
		el.addEventListener("update-xy", function (t) {
			let lookControls = el.components["look-controls"];
			if (lookControls) {
				lookControls.pitchObject.rotation.x = t.detail.x;
				lookControls.yawObject.rotation.y = t.detail.y;
			}
		});

		el.addEventListener("update-position", function(t) {
			camera.setAttribute("position", { x: t.detail.x, y: t.detail.y, z:  t.detail.z});
		});
		
		window.addEventListener("wheel", (e) => {
			if (settings.isDevMode)
				return;
			const dir = e.deltaY > 0 ? -0.2 : 0.2; 
			const pos = this.el.getAttribute("position");
			pos.y += dir;
			this.el.setAttribute("position", pos);
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
