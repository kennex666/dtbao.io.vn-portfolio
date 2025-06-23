AFRAME.registerComponent("turn-the-light", {
	init: function () {
		// this.el.components["look-controls"].pause();
		const light = this.el.parentNode.querySelector(".light");

		this.el.addEventListener("click", () => {
			const isVisible = light.getAttribute("visible");
			light.setAttribute("visible", !isVisible);
		});
	},
});

// Tuongw tacs
AFRAME.registerComponent("hover-highlight", {
	schema: {
		title: {
			type: "string",
			default: "",
		},
		description: {
			type: "string",
			default: "",
		},
		color: {
			type: "string",
			default: "#ffffff",
		},
		adjustTitle: {
			type: "number",
			default: 0,
		},
		enabledLookAt: {
			type: "boolean",
			default: true,
		},
		rotation: {
			type: "string",
			default: "",
		},
		fontSize: {
			type: "number",
			default: 0.16,
		},
		maxWidth: {
			type: "number",
			default: 3
		},
	},
	init: function () {
		const el = this.el;
		const arrow = document.querySelector("#hover-arrow");
		const text = document.querySelector("#hover-text");
		let isHovering = false;

		const box = new THREE.Box3();

		el.addEventListener("mouseenter", () => {
			if (isHovering || !arrow) return;
			isHovering = true;

			if (settings.device == "mobile") {
				btnUse.style.opacity = "0.6";
			}
				// Tính bounding box trong không gian thế giới
				box.setFromObject(el.object3D);

			const topPosition = new THREE.Vector3(
				(box.min.x + box.max.x) / 2,
				box.max.y + 0.2,
				(box.min.z + box.max.z) / 2
			);

			arrow.object3D.position.copy(topPosition);

			arrow.setAttribute("visible", true);

			if (this.data.title) {
				const topPosition2 = new THREE.Vector3(
					(box.min.x + box.max.x) / 2,
					box.max.y + 0.5 + this.data.adjustTitle,
					(box.min.z + box.max.z) / 2
				);

				text.object3D.position.copy(topPosition2);
				text.setAttribute("color", this.data.color);
				text.setAttribute("max-width", this.data.maxWidth);
				text.setAttribute("font-size", this.data.fontSize);
				text.setAttribute("value", this.data.title);
				if (this.data.enabledLookAt) {
					text.setAttribute("look-at", "#camera");
				} else {
					text.removeAttribute("look-at");
					this.data.rotation &&
						text.setAttribute(
							"rotation",
							this.data.rotation.toString().trim()
						);
				}
				
				setTimeout(() => {
					text.setAttribute("visible", true);
				}, 1);
			}
		});

		el.addEventListener("mouseleave", () => {
			if (!isHovering || !arrow) return;
			isHovering = false;

			if (settings.device == "mobile") {
				btnUse.style.opacity = "0.3";
			}

			if (this.data.title) {
				text.setAttribute("visible", false);
			}
			arrow.setAttribute("visible", false);
		});
	},
});

AFRAME.registerComponent("redirect", {
	schema: {
		url: {
			type: "string",
			default: "#"
		}
	},
	init: function(){
		this.el.addEventListener("click", () =>{
			window.open(this.data.url, "__blank");
		})
	}
})