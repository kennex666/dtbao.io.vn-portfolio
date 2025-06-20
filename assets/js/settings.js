const GRAPHIC_ENUM = {
    low: 1,
    medium: 2,
    high: 3,
    ultra: 4
}
const settings = {
    audio: false,
    graphic: GRAPHIC_ENUM.medium,
    controllers: {
        changeGraphic: (level) => {
            settings.graphic = level;
            scene.emit("graphic-changed", { level }, false);
        }
    }
}