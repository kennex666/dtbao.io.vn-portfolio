AFRAME.registerComponent("firefly", {
	schema: {
		count: { type: "number", default: 10 },
		spread: { type: "number", default: 4 },
		existence: { type: "number", default: -1 },
		size: { type: "number", default: 0.03 },
		randomSize: { type: "number", default: 0 },
        light: { type: "boolean", default: false }
	},
	init: function () {
		const originCoor = this.el.object3D.position;
		const data = this.data;
		const spread = data.spread;

		for (let i = 0; i < data.count; i++) {
			const x = originCoor.x + (Math.random() - 0.5) * spread;
			const y = originCoor.y + (Math.random() - 0.5) * spread;
			const z = originCoor.z + (Math.random() - 0.5) * spread;

			const firefly = document.createElement("a-entity");
			firefly.classList.add("firefly");

			const size = data.size;
			const randomSize = data.randomSize;
			const radius =
				randomSize > 0
					? (Math.random() - 0.5) * 2 * randomSize + size
					: size;

			firefly.setAttribute(
				"geometry",
				"primitive: sphere; radius: " + radius
			);

			firefly.setAttribute("material", {
				shader: "flat",
				color: "#ffeeaa",
				emissive: "#ffaa00",
				emissiveIntensity: 1,
				transparent: true,
				opacity: 0.7,
			});

			firefly.setAttribute("position", `${x} ${y} ${z}`);
			firefly.setAttribute("animation__move", {
				property: "position",
				dir: "alternate",
				dur: 2000 + Math.random() * 2000,
				loop: true,
				to: `${x + (Math.random() - 0.5) * 0.5} ${
					y + (Math.random() - 0.5) * 0.5
				} ${z + (Math.random() - 0.5) * 0.5}`,
				easing: "easeInOutSine",
			});
			firefly.setAttribute("animation__flicker", {
				property: "material.opacity",
				dir: "alternate",
				dur: 800 + Math.random() * 1000,
				loop: true,
				from: 0.3,
				to: 0.8,
				easing: "easeInOutQuad",
			});

			if (data.existence !== -1) {
				setTimeout(() => {
					firefly.setAttribute("animation__fadeout", {
						property: "material.opacity",
						to: 0,
						dur: 1000,
						easing: "easeInOutQuad",
					});
					setTimeout(() => {
						if (firefly.parentNode) {
							firefly.parentNode.removeChild(firefly);
						}
					}, 1001);
				}, data.existence);
			}

			// Thêm light nếu setting cao
			if (data.light) {
				const light = document.createElement("a-light");
				light.setAttribute("type", "point");
				light.setAttribute("intensity", 0.02);
				light.setAttribute("distance", 1);
				light.setAttribute("decay", 2);
				light.setAttribute("color", "#ffaa00");
				firefly.appendChild(light);
			}

			this.el.appendChild(firefly);
		}

		// Lắng nghe graphic-changed MỘT LẦN thôi
		this.el.sceneEl.addEventListener("graphic-changed", (e) => {
            console.log("🎯 Emitted graphic-changed:", e);
			this.updateGraphics(e.detail.level);
		});
	},
	updateGraphics: function (level) {
		const fireflies = this.el.querySelectorAll(".firefly");

		fireflies.forEach((firefly) => {
			const existingLight = firefly.querySelector("a-light");

			if (GRAPHIC_ENUM.medium < level) {
				if (!existingLight) {
					const light = document.createElement("a-light");
					light.setAttribute("type", "point");
					light.setAttribute("intensity", 0.02);
					light.setAttribute("distance", 1);
					light.setAttribute("decay", 2);
					light.setAttribute("color", "#ffaa00");
					firefly.appendChild(light);
                    
				}
			} else {
                console.log("Remove")
				if (existingLight) {
					existingLight.remove();
				}
			}
		});
	},
});
