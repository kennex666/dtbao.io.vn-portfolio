AFRAME.registerComponent("lock-camera", {
	init: function () {
		// this.el.components["look-controls"].pause();
		this.el.object3D.rotation.set(-1.143, 0, 0);
	},
});
