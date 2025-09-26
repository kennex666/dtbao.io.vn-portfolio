const __playlist = [
	{
		title: "Đừng Làm Trái Tim Anh Đau",
		artist: "Sơn Tùng M-TP",
		uri: "/assets/sounds/albums/dunglamtraitimanhdau.mp3",
	},
	{
		title: "Phonecert (Vietnamese)",
		artist: "Hoàng Dũng",
		uri: "/assets/sounds/albums/phonecert.mp3",
	},
	{
		title: "Từng Ngày Yêu Em",
		artist: "buitruonglinh x tungtic",
		uri: "/assets/sounds/albums/tungngayyeuem.mp3",
	},
	{
		title: "Một Ngày Chẳng Nắng",
		artist: "Pháo Northside",
		uri: "/assets/sounds/albums/motngaychangnang.mp3",
	},
	{
		title: "Yêu Lại Từ Đầu",
		artist: "Khắc Việt x tungtic",
		uri: "/assets/sounds/albums/yeulaitudau.mp3",
	},
	{
		title: "Ex's Hate Me x Do For Love",
		artist: "B Ray x AMEE",
		uri: "/assets/sounds/albums/exhateme_doforlove.mp3",
	},
	{
		title: "Cháu Xin Lỗi Chú",
		artist: "LINH THỘN ft. GIA NGHI",
		uri: "/assets/sounds/albums/chauxinloichu.mp3",
	},
];

const MediaPlayer_Status = {
	playing: 1,
	pause: 0
};
const MediaPlayer = {
	player: null,
	controllers: {
		switchMusic: null,
		playMusic: null,
	},
	current: {
		title: __playlist[0].title,
		artist: __playlist[0].artist,
		uri: __playlist[0].uri,
		index: 0,
	},
	vol: 1,
	status: MediaPlayer_Status.pause,
};

AFRAME.registerComponent("media-controller", {
	schema: {},
	init: function () {
		const el = this.el;
		this.title = el.querySelector(".media-title");
		this.artist = el.querySelector(".media-artists");
		this.titlePlayNext = el.querySelector(".media-playnext");

		const btnPrevious = el.querySelector(".btn-previous");
		const btnNext = el.querySelector(".btn-next");
		this.btnControl = el.querySelector(".btn-control-media");

		const vlDown = el.querySelector(".media-vl-down");
		const vlUp = el.querySelector(".media-vl-up");

		this.vlControl = el.querySelector(".media-vl-control");


		MediaPlayer.player = el.querySelector(".speaker");

		setTimeout(() => {
			this.playNext(0);
		}, 300)

		btnPrevious.addEventListener("click", () => {
            this.playNext(-1);
        });
		btnNext.addEventListener("click", () => {
            this.playNext(1);
        });

		
		vlDown.addEventListener("click", () => {
			this.giamVolume();
		});
		
		vlUp.addEventListener("click", () => {
			this.tangVolume();
		});

		this.btnControl.addEventListener("click", () => {
			this.playMusic();
		});

        MediaPlayer.player.addEventListener("sound-ended", () => {
            this.playNext(1);
        });

		
		MediaPlayer.controllers.switchMusic = (id) => {this.switchMusic(id)};
		MediaPlayer.controllers.playMusic = () => { this.playMusic() };
	},

	tangVolume:	function() {
		const soundComp = MediaPlayer.player.components.sound;
		if (MediaPlayer.vol < 2) {
			MediaPlayer.vol += 0.1;
			soundComp.pool.children[0].setVolume(Math.min(MediaPlayer.vol, 2));
		}
	},

	// Giảm âm lượng
	giamVolume: function () {
		const soundComp =  MediaPlayer.player.components.sound;
		if (MediaPlayer.vol > 0) {
			MediaPlayer.vol -= 0.1;
			soundComp.pool.children[0].setVolume(Math.max(MediaPlayer.vol, 0));
		}
	},

	switchMusic: function (id) {
		MediaPlayer.current = {
			title: __playlist[id].title,
			artist: __playlist[id].artist,
			uri: __playlist[id].uri,
			index: id,
		};

		this.title.setAttribute("value", MediaPlayer.current.title);
		this.artist.setAttribute("value", MediaPlayer.current.artist);
		this.titlePlayNext.setAttribute(
			"value",
			`>> Play next | ${__playlist[this.whatsNext(1)].title}`
		);
        if (MediaPlayer.status == MediaPlayer_Status.playing){
            MediaPlayer.player.components.sound.stopSound();
			MediaPlayer.player.setAttribute("sound", {
				src: `url(${MediaPlayer.current.uri})`,
				autoplay: true,
				volume: MediaPlayer.vol,
			});
        } else {
            MediaPlayer.player.components.sound.stopSound();
            MediaPlayer.player.setAttribute("sound", {
				src: `url(${MediaPlayer.current.uri})`,
				autoplay: false,
				volume: MediaPlayer.vol,
			});
        }
	},
	playNext: function (direction = 1) {
		let nextIndex = MediaPlayer.current.index + direction;
		if (__playlist.length <= nextIndex) {
			nextIndex = 0;
		} else if (nextIndex < 0) {
			nextIndex = __playlist.length - 1;
		}
		this.switchMusic(nextIndex);
	},
	whatsNext: (direction = 1) => {
		let nextIndex = MediaPlayer.current.index + direction;
		if (__playlist.length <= nextIndex) {
			nextIndex = 0;
		} else if (nextIndex < 0) {
			nextIndex = __playlist.length - 1;
		}
        return nextIndex;
	},
	playMusic: function () {
		if (MediaPlayer.status == MediaPlayer_Status.playing) {
			MediaPlayer.status = MediaPlayer_Status.pause;
			MediaPlayer.player?.components?.sound?.pauseSound();
			this.btnControl.setAttribute("src", "#btn-media-play");
			this.vlControl.setAttribute("visible", false);
		} else {
			MediaPlayer.status = MediaPlayer_Status.playing;
			MediaPlayer.player?.components?.sound?.playSound();
			this.btnControl.setAttribute("src", "#btn-media-pause");
			this.vlControl.setAttribute("visible", true);
		}
	},
});
