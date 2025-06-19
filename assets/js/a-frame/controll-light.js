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

AFRAME.registerComponent("hover-highlight", {
	schema: {
		title: {
			type: "string",
			default: ""
		},
		description: {
			type: "string",
			default: ""
		},
		color: {
			type: "string",
			default: ""
		},
		adjustTitle: {
			type: "number",
			default: 0
		}
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

			// Tính bounding box trong không gian thế giới
			box.setFromObject(el.object3D);
			
			const topPosition = new THREE.Vector3(
				(box.min.x + box.max.x) / 2,
				box.max.y + 0.2,
				(box.min.z + box.max.z) / 2
			);

			arrow.object3D.position.copy(topPosition);
			
			arrow.setAttribute("visible", true);

			if (this.data.title){
				
				const topPosition2 = new THREE.Vector3(
					(box.min.x + box.max.x) / 2,
					box.max.y + 0.5 + this.data.adjustTitle,
					(box.min.z + box.max.z) / 2
				);

				text.object3D.position.copy(topPosition2);
				text.setAttribute("visible", true);
				text.setAttribute("value", this.data.title);
			}
		});

		el.addEventListener("mouseleave", () => {
			if (!isHovering || !arrow) return;
			isHovering = false;

			if (this.data.title){
				text.setAttribute("visible", false);
			}
			arrow.setAttribute("visible", false);
		});
	},
});