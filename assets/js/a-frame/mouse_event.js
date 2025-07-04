AFRAME.registerComponent("mission-click", {
    schema: {
        totalClickActivation: {
            default: 1,
            type: "number"
        },
        missionId: {
            default: "",
            type: "string"
        }
    },
    init: function() {
        this.currentClick = 0;
        this.el.addEventListener("click", () => {
			++this.currentClick;
			if (this.data.totalClickActivation == this.currentClick) {
				__missions.unlockMission(this.data.missionId);
			}
		});
    }
})

AFRAME.registerComponent("mission-hover", {
	schema: {
		totalClickActivation: {
			default: 1,
			type: "number",
		},
		missionId: {
			default: "",
			type: "string",
		},
	},
	init: function () {
		this.currentClick = 0;

		this.el.addEventListener("hover", () => {
			++this.currentClick;
			if (this.data.totalClickActivation == this.currentClick) {
				__missions.unlockMission(this.data.missionId);
			}
		});
	},
});