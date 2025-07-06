const __gallery = [
	{
		id: 0,
		title: "GDG Devfest 2024",
		images: [
			"/assets/images/album/devfest2024_01.jpg",
			"/assets/images/album/devfest2024_02.jpg",
			"/assets/images/album/devfest2024_03.jpg",
		],
		// images: [
		// 	"https://res.cloudinary.com/dqgvyfpv9/image/upload/v1751398302/albums-portfolio/devfest2024_02_sqgs3j.jpg",
		// 	"https://res.cloudinary.com/dqgvyfpv9/image/upload/v1751398292/albums-portfolio/devfest2024_01_mzfuq4.jpg",
		// 	"https://res.cloudinary.com/dqgvyfpv9/image/upload/v1751398265/albums-portfolio/devfest2024_03_xdrvyt.jpg",
		// ],
	},
	{
		id: 1,
		title: "GDG Devfest 2025",
		images: [
			"/assets/images/album/devfest2024_02.jpg",
			"/assets/images/album/devfest2024_01.jpg",
			"/assets/images/album/devfest2024_03.jpg",
		]
	},
];

function openImageViewer(src, link = null) {
	const viewer = document.getElementById("image-viewer");
	const img = document.getElementById("image-viewer-img");
	const linkBtn = document.getElementById("image-viewer-link");

	img.src = src;

	if (link) {
		linkBtn.href = link;
		linkBtn.classList.remove("hidden");
	} else {
		linkBtn.classList.add("hidden");
	}

	viewer.classList.remove("hidden");
	settings.disableScroll = true;
}

function closeImageViewer() {
	const imgEl = document.getElementById("image-viewer-img");
	__logger.logToSheet({
		type: "close-view-image",
		metadata: imgEl.src,
	});
	document.getElementById("image-viewer").classList.add("hidden");
	imgEl.src = "";
	settings.disableScroll = false;
}


AFRAME.registerComponent("image-viewer", {
	schema: {
		src: {
			type: "string"
		},
		url: {
			type: "string",
			default: ""
		}
	},
	init: function() {
		this.el.addEventListener("click", () => {
			const src = this.data.src || "#"
			const url = this.data.url || "";
			openImageViewer(src, url);
			
			__logger.logToSheet({
				type: "view-image",
				metadata: src,
			});
		})
	}
})

AFRAME.registerComponent("gallery-vr", {
    init: function (){
        this.isOpen = false;
        this.galleryVR = document.querySelector("#gallery-vr");

        this.galleryVRCircle = document.querySelector(".vr-headset-hidden");


        this.el.addEventListener("click", () => {
            const overlay = document.querySelector(".fade-overlay-gallery");
            this.isOpen = !this.isOpen;
            this.galleryVR.setAttribute("visible", this.isOpen);
            this.galleryVRCircle.setAttribute("visible", this.isOpen);
            this.el.setAttribute("visible", !this.isOpen);
            this.el.setAttribute(
				"hover-highlight",
				!this.isOpen
					? "title: Jasper Quest 9; adjustTitle: 0.2"
					: "title: Put it back after use; adjustTitle: 0.2"
			);

            if (this.isOpen){
                camera.emit("update-xy", {
					x: -0.11, y: -1.574});
                camera.emit("update-position", {
					x: 7.947,
					y: 2.2,
					z: 8.717,
				});
                overlay.setAttribute("visible", true);
                setTimeout(() => {
                    overlay.setAttribute("animation", {
						property: "material.opacity",
						from: 1,
						to: 0,
						dur: 1000,
						easing: "easeOutQuad",
					});
                }, 1)
                setTimeout(() => {
                    overlay.setAttribute("visible", false);
                    overlay.removeAttribute("animation");
                }, 1010)
            }
        })
    }
})

AFRAME.registerComponent("gallery-component", {
	init: function () {
        this.currentAlbumId = 0;
		this.btnNext = this.el.querySelector(".btn-next");
		this.btnPrevious = this.el.querySelector(".btn-previous");
		this.title = this.el.querySelector(".gallery-title");
		this.albumNumber = this.el.querySelector(".gallery-number");

		this.listImages = this.el.querySelector(".list-images");
        

        this.btnNext.addEventListener("click", () => {
			this.switchAlbum(1);
			__logger.logToSheet({
				type: "view-gallery",
				metadata: {
					action: "next",
					currentAlbum: this.currentAlbumId,
				},
			});
		});
        this.btnPrevious.addEventListener("click", () => {
			this.switchAlbum(-1);
			__logger.logToSheet({
				type: "view-gallery",
				metadata: {
					action: "previous",
					currentAlbum: this.currentAlbumId,
				},
			});
		});

        this.el.addEventListener("componentchanged", (e) => {
			if (e.detail.name === "visible") {
				console.log(
					"[Gallery] Visibility changed:",
					this.el.getAttribute("visible")
				);
				if (this.el.getAttribute("visible")) {
					this.renderAlbum(this.currentAlbumId);
				} else {
                    this.listImages.innerHTML = null;
                }
			}
		});
        
        
       this.renderAlbum(0);
	},
    renderAlbum: function(id = 0){
        
        if (!this.el.getAttribute("visible")){
            console.log("[Gallery] Not visible")
            return;
        } else {
            console.log("[Gallery] Rendering!")
        }

        this.listImages.innerHTML = this.createImageListDom(
			__gallery[id].images
		);
		this.title.setAttribute("value", __gallery[id].title);
        this.albumNumber.setAttribute("value", `${id + 1}/${__gallery.length}`);

    },

    switchAlbum: function (direction = 1) {
        this.currentAlbumId = this.currentAlbumId + direction;
        if (this.currentAlbumId < 0) {
			this.currentAlbumId = __gallery.length - 1;
		} 
        
        if (this.currentAlbumId > __gallery.length - 1) {
			this.currentAlbumId = 0;
		}

       this.renderAlbum(this.currentAlbumId);
    },

	createImageListDom: function (list) {
		const config = [
			{
				rotation: "-8 -70 0",
				position: "-0.85507 -0.08635 -1.43721",
			},
			{
				rotation: "-6 -90 0",
				position: "-0.645 -0.086 -0.22392",
				geometry: "height: 0.7; width: 1.244",
			},
			{
				rotation: "-8 -110 0",
				position: "-0.855 -0.08635 0.97059",
			},
		];

		const createImageTag = (
			src,
			{ rotation, position, hover = "", geometry = "height: 0.7" }
		) => {
			return `
                <a-image src="${src}" 
					class="clickable"
				 	image-viewer="src: ${src}"
                    material="opacity: 0.3; blending: none; color: #b5b5b5" 
                    geometry="${geometry}" 
                    animation__pulse="dir: alternate; dur: 1200; easing: easeInOutSine; from: 0.8; loop: true; property: material.opacity; to: 1" 
                    animation__glow="dir: alternate; dur: 1500; easing: easeInOutSine; from: 1 1 1; loop: true; property: scale; to: 1.03 1.03 1" 
                    rotation="${rotation}" 
                    position="${position}">
                </a-image>`;
		};

		return list
			.slice(0, 3)
			.map((src, i) => createImageTag(src, config[i]))
			.join(" ");
	},
});