const changeGraphic = (level) => {
    const scene = document.querySelector("a-scene");
    settings.graphic = level;
	scene.emit("graphic-changed", { level }, false);
}