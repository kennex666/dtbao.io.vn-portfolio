const __board_screens = [
	"1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png"
]
AFRAME.registerComponent("board-component", {
	init: function () {
        this.currentAlbumId = 0;

		this.screen = document.querySelector("#board_screen");
		this.btnNext = this.el.querySelector(".btn-next");
		this.btnPrevious = this.el.querySelector(".btn-previous");
        

        this.btnNext.addEventListener("click", () => {
			this.switchAlbum(1);
		});
        this.btnPrevious.addEventListener("click", () => {
			this.switchAlbum(-1);
		});
        
       this.renderAlbum(0);
	},
    renderAlbum: function(id = 0){
        
		this.screen.setAttribute("material", `src: assets/images/boards/${__board_screens[id]}`)

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