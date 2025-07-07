AFRAME.registerComponent("addon-physic", {
	schema: {
		type: {
			type: "string",
			default: "static-body",
		},
		shape: {
			type: "string",
			default: "auto",
		},
        addon: {
            type: "boolean",
            default: false
        }
	},

	init: function () {
		const el = this.el;

		const addBody = () => {
            if (this.data.type == "static-body"){
                el.setAttribute(
					"static-body",
					`shape: auto; friction: 0.9;"
					}`
				);
            } else
			el.setAttribute(
				"dynamic-body",
				`shape: ${this.data.shape}; ${
					this.data.addon
						? "mass: 1; friction: 0.3; restitution: 0.1; linearDamping: 0.3; angularDamping: 0.4;"
						: ""
				}`
			);

		};

		if (el.getAttribute("gltf-model") || el.getAttribute("obj-model")) {
			el.addEventListener("model-loaded", addBody);
		} else {
			el.addEventListener("loaded", () => {
				setTimeout(addBody, 0);
			});
		}
	},
});

AFRAME.registerComponent("kick-ball", {
	init: function () {
		this.el.addEventListener("click", (evt) => {
            const camDir = new THREE.Vector3();
			camera.object3D.getWorldDirection(camDir);
			camDir.normalize();

			// Lực chỉ theo mặt đất (XZ)
			const power = 5;
			const force = new CANNON.Vec3(
				-camDir.x * power,
				1,
				-camDir.z * power
			);

			const ballPos = new THREE.Vector3();
			this.el.object3D.getWorldPosition(ballPos);

			this.el.body.applyImpulse(
				force,
				new CANNON.Vec3(ballPos.x, ballPos.y, ballPos.z)
			);
		});
	},
});
