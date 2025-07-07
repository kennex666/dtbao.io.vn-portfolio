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
		changeGraphic: (level) => {
			settings.graphic = level;
			scene.emit("graphic-changed", { level }, false);
		},
	},
};