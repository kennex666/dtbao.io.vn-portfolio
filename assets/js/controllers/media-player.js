const MediaPlayer_Status = {
    playing: 1,
    pause: -1,
    stop: 0,
}
const MediaPlayer = {
    player: null,
    current: {
        title: "",
        artist: "",
        uri: ""
    },
    status: MediaPlayer_Status.stop
}