const __playlist = [
	{
		title: "Từng ngày yêu em",
		artist: "buitruonglinh x tungtic",
		uri: "/assets/sounds/albums/tungngayyeuem.mp3",
	},
	{
		title: "Yêu lại từ đầu",
		artist: "Khắc Việt x tungtic",
		uri: "/assets/sounds/albums/yeulaitudau.mp3",
	},
];

const MediaPlayer_Status = {
	playing: 1,
	pause: 0
};
const MediaPlayer = {
	player: null,
	current: {
		title: __playlist[0].title,
		artist: __playlist[0].artist,
		uri: __playlist[0].uri,
        index: 0,
	},
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
		MediaPlayer.player = el.querySelector(".speaker");

		btnPrevious.addEventListener("click", () => {
            this.playNext(-1);
        });
		btnNext.addEventListener("click", () => {
            this.playNext(1);
        });

		this.btnControl.addEventListener("click", () => {
			this.playMusic();
		});

        MediaPlayer.player.addEventListener("sound-ended", () => {
            this.playNext(1);
        });
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
			});
        } else {
            MediaPlayer.player.components.sound.stopSound();
            MediaPlayer.player.setAttribute("sound", {
                src: `url(${MediaPlayer.current.uri})`,
                autoplay: false,
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
		} else {
			MediaPlayer.status = MediaPlayer_Status.playing;
			MediaPlayer.player?.components?.sound?.playSound();
			this.btnControl.setAttribute("src", "#btn-media-pause");
		}
	},
});
