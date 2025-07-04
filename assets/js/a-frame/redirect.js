AFRAME.registerComponent("redirect", {
	schema: {
		url: {
			type: "string",
			default: "#",
		},
	},
	init: function () {
        var clickCount = 0;
		this.el.addEventListener("click", () => {
            clickCount++;

            if (clickCount == 1){
                createToast("Double tap to redirect");
            } else
            if (clickCount == 2){
			    window.open(this.data.url, "__blank");
            }
            

            setTimeout(() => {
                clickCount = 0
            }, 700);
		});
	},
});
