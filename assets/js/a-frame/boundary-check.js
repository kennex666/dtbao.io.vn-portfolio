AFRAME.registerComponent("sky-boundary-check", {
	schema: {
		radius: { type: "number", default: 50 },
		message: { type: "selector" },
	},
	tick() {
		const cameraPos = this.el.object3D.position;
		const distance = cameraPos.length();
		if (__missions.unlocked.includes("chien_binh_ranh_roi")) {
			return;
		}

		if (
			__missions.sky.script.length > __missions.sky.currentStep &&
			distance >
				__missions.sky.script[__missions.sky.currentStep]?.boundary
		) {
			// unlock thành tựu
			if (__missions.sky.script.length == ++__missions.sky.currentStep)
				__missions.unlocked.push("chien_binh_ranh_roi");

			alert(
				__missions.sky.script[__missions.sky.currentStep - 1]?.text
					.replace("{easter_egg_count}", __missions.unlocked.length)
					.replace("{easter_egg_total}", __missions.total.length)
			);
		}
	},
});
