function formatDateTime(date, blinding) {
	const hh = String(date.getHours()).padStart(2, "0");
	const mm = String(date.getMinutes()).padStart(2, "0");
	return blinding ? `${hh} ${mm}` : `${hh}:${mm}`;
}

const Clock = {
	clock: null,

	init: (element) => {
        let blinding = false;
		Clock.clock = setInterval(() => {
            element.setAttribute("value", formatDateTime(new Date(), blinding));
            blinding = !blinding;
		}, 1000);
	},
	detroy: () => {
		clearInterval(Clock.clock);
	}
};

AFRAME.registerComponent("clock-controllers", {
	init: function () {
		const clock = this.el;

        setTimeout(() => {
            Clock.init(clock);
        }, 3000)

	},
});
