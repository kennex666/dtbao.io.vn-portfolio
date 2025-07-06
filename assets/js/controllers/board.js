const __board_screens = [
	"assets/images/boards/1.png",
	"assets/images/boards/2.png",
	"assets/images/boards/3.png",
	"assets/images/boards/4.png",
	"assets/images/boards/5.png",
	"assets/images/boards/6.png",
	"assets/images/boards/7.png",
	"assets/images/boards/8.png",
	"assets/images/boards/9.png",
	"assets/images/boards/10.png",
	"assets/images/boards/11.png",
];
AFRAME.registerComponent("board-component", {
	init: function () {
        this.currentAlbumId = 0;

		this.screen = document.querySelector("#board_screen");
		this.btnNext = this.el.querySelector(".btn-next");
		this.btnPrevious = this.el.querySelector(".btn-previous");
        

        this.btnNext.addEventListener("click", () => {
			this.switchAlbum(1);
			
			__logger.logToSheet({
				type: "view-portfolio",
				metadata: {
					action: "next",
					currentImage: this.currentAlbumId,
				},
			});
		});
        this.btnPrevious.addEventListener("click", () => {
			this.switchAlbum(-1);
			__logger.logToSheet({
				type: "view-portfolio",
				metadata: {
					action: "previous",
					currentImage: this.currentAlbumId,
				},
			});
		});
        
       this.renderAlbum(0);
	},
    renderAlbum: function(id = 0){
        
		this.screen.setAttribute("material", `src: ${__board_screens[id]}`)

    },

    switchAlbum: function (direction = 1) {
        this.currentAlbumId = this.currentAlbumId + direction;
        if (this.currentAlbumId < 0) {
			this.currentAlbumId = __board_screens.length - 1;
		} 
        
        if (this.currentAlbumId > __board_screens.length - 1) {
			this.currentAlbumId = 0;
		}

       this.renderAlbum(this.currentAlbumId);
    },
});