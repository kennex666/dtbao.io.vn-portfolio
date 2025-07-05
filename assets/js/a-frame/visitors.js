AFRAME.registerComponent("use-items", {
    schema: {
        id: {
            type: "string",
            default: ""
        }
    },
    init: function() {
        const item = document.querySelector('#' + this.data.id);

        this.el.addEventListener("click", () => {
            settings.disableScroll = true;
            item.classList.toggle("hidden", false);
        })
    }
})