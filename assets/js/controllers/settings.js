const GRAPHIC_ENUM = {
    low: 1,
    medium: 2,
    high: 3,
    ultra: 4
}
const settings = {
	isDevMode: false,
	speed: {
		walk: 20,
	},
	disableScroll: false,
	cameraHeight: 2.0,
	device: "pc",
	audio: true,
	isTouchable: navigator.maxTouchPoints > 0,
	graphic: GRAPHIC_ENUM.medium,
	controllers: {
		graphic: {
			changeGraphic: (level) => {
				settings.graphic = level - 0;
				scene.emit("graphic-changed", { level }, false);
				settings.controllers.graphic.applyGraphicsSetting(
					settings.graphic
				);
			},
			updateAllMaterials: (props = {}) => {
				const meshEls = document.querySelectorAll("[material]");
				meshEls.forEach((el) => {
					if (el.classList.contains("shader-flat")) {
						return;
					}
					Object.entries(props).forEach(([key, val]) => {
						el.setAttribute("material", `${key}: ${val}`);
					});
				});
			},
			setLightIntensity: (intensity = 1) => {
				const lights = document.querySelectorAll("a-light");
				lights.forEach((light) => {
					light.setAttribute("intensity", intensity);
				});
			},
			applyGraphicsSetting: (setting) => {
				const rendererBase =
					"antialias: true; physicallyCorrectLights: true";
				const setRenderer = (extra = "") =>
					scene.setAttribute("renderer", `${rendererBase}; ${extra}`);

				switch (setting) {
					case GRAPHIC_ENUM.low:
						setRenderer("shadowMap.enabled: false");
						scene.removeAttribute("shadow");
						settings.controllers.graphic.updateAllMaterials({
							shader: "flat",
						});
						// setLightIntensity(0.3);
						break;
					case GRAPHIC_ENUM.medium:
						setRenderer(
							"shadowMap.enabled: true; shadowMap.type: BasicShadowMap"
						);
						scene.setAttribute("shadow", "type: basic");
						settings.controllers.graphic.updateAllMaterials({
							shader: "standard",
						});
						// setLightIntensity(0.7);
						break;
					case GRAPHIC_ENUM.high:
						setRenderer(
							"shadowMap.enabled: true; shadowMap.type: PCFSoftShadowMap"
						);
						scene.setAttribute("shadow", "type: pcfsoft");
						settings.controllers.graphic.updateAllMaterials({
							shader: "standard",
						});
						// setLightIntensity(1);
						break;
				}
			},
		},
	},
};