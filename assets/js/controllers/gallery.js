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
		});
        this.btnPrevious.addEventListener("click", () => {
			this.switchAlbum(-1);
		});
        
       this.renderAlbum(0);
	},
    renderAlbum: function(id = 0){
        
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
			{ rotation: "-8 -70 0", position: "-0.85507 -0.08635 -1.43721" },
			{
				rotation: "-6 -90 0",
				position: "-0.645 -0.086 -0.22392",
				geometry: "height: 0.7; width: 1.244",
			},
			{ rotation: "-8 -110 0", position: "-0.855 -0.08635 0.97059" },
		];

		const createImageTag = (
			src,
			{ rotation, position, geometry = "height: 0.7" }
		) => {
			return `
                <a-image src="${src}" 
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