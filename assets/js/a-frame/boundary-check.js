AFRAME.registerComponent("sky-boundary-check", {
	schema: {
		radius: { type: "number", default: 50 },
		message: { type: "selector" },
	},
	tick() {
		const cameraPos = this.el.object3D.position;
		const distance = cameraPos.length();
		if (__missions.isUnlocked("chien_binh_ranh_roi")) {
			return;
		}

		if (
			__missions.sky.script.length > __missions.sky.currentStep &&
			distance >
				__missions.sky.script[__missions.sky.currentStep]?.boundary
		) {
			// unlock thành tựu
			alert(
				__missions.sky.script[__missions.sky.currentStep]?.text
					.replace("{easter_egg_count}", __missions.unlocked.length + 1)
					.replace("{easter_egg_total}", __missions.total.length)
			);

			if (__missions.sky.script.length == ++__missions.sky.currentStep){
				__missions.unlockMission("chien_binh_ranh_roi");
			}
		}
	},
});
