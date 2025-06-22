AFRAME.registerComponent("lock-camera", {
	init: function () {
		// this.el.components["look-controls"].pause();
		this.el.object3D.rotation.set(-1.143, 0, 0);
	},
});

AFRAME.registerComponent("sky-boundary-check", {
	schema: {
		radius: { type: "number", default: 50 },
		message: { type: "selector" },
	},
	tick() {
		const cameraPos = this.el.object3D.position;
		const distance = cameraPos.length();
		if (settings.easterEggs.unlocked.includes("chien_binh_ranh_roi")) {
			return;
		}

		if (
			settings.easterEggs.sky.script.length > settings.easterEggs.sky.currentStep &&
			distance > settings.easterEggs.sky.script[settings.easterEggs.sky.currentStep]?.boundary
		) {
			// unlock thành tựu
			if (settings.easterEggs.sky.script.length == ++settings.easterEggs.sky.currentStep)
				settings.easterEggs.unlocked.push("chien_binh_ranh_roi");
			
			alert(
				settings.easterEggs.sky.script[
					settings.easterEggs.sky.currentStep - 1
				]?.text
					.replace(
						"{easter_egg_count}",
						settings.easterEggs.unlocked.length
					)
					.replace(
						"{easter_egg_total}",
						settings.easterEggs.total.length
					)
			);
		}
	},
});
