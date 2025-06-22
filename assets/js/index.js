var scene = null;
var camera = null;

function loadScript (element, current = 0, options = {}){
    if (element.script[current]?.value)
        options?.text.setAttribute("value",
            element.script[current].value || "{text_script}"
        );
    else if (element.script[current].exec){
        element.script[current].exec();
    }

    setTimeout(() => {
        if (element.script.length == current + 1) {
            element.detroy();
        } else {
            loadScript(element, current + 1, options);
        }
    }, element.script[current].time);
}

const sceneScript = {
	dev: {
		init: () => {
			const text = document.querySelector("#intro__text");
			const introRange = document.querySelector("#intro__range");
			const floor = document.querySelector("#floor");
			text.setAttribute("visible", "false");
			startWatermark();
			camera.setAttribute("wasd-controls", "enabled: true");
			introRange.setAttribute("visible", false);
			floor.setAttribute("visible", true);
		},
		detroy: () => {
		},
	},
	firstTime: {
		script: [
			{
				time: 3000,
				value: "👋Xin chào lữ kháchヾ(＾∇＾) ✨",
				audio: "",
			},
			{
				time: 3000,
				value: "Tớ là Bảo - người đã xây căn phòng 3D này nè",
				audio: "",
			},
			{
				time: 4000,
				value: "Ở đây cậu cứ tự nhiên như nhà của mình",
				audio: "",
			},
			{
				time: 4000,
				value: "Hãy dạo vòng quanh và xem bất cứ thứ gì cậu muốn",
				audio: "",
			},
			{
				time: 3000,
				value: "Nếu chưa biết xem gì, hãy để tớ gợi ý nhé!",
				audio: "",
			},
			{
				time: 5000,
				value: "Trên bàn là cuốn sổ những khách quý từng ghé qua, cậu có thể để lại tên ở đó",
				audio: "",
			},
			{
				time: 3000,
				value: "Bảng bên tay trái sẽ gồm thông tin ngắn gọn về chủ nhà",
				audio: "",
			},
			{
				time: 3000,
				value: "Còn nhiều thứ lắm, cậu hãy tự khám phá nhé~",
				audio: "",
			},
			{
				time: 3000,
				value: "Chúc cậu vui vẻ. Xin mời!",
				audio: "",
			},
		],
		init: () => {
			const text = document.querySelector("#intro__text");
			loadScript(sceneScript.firstTime, 0, { text });
		},
		detroy: () => {
			const text = document.querySelector("#intro__text");
			const introRange = document.querySelector("#intro__range");
			const floor = document.querySelector("#floor");
			text.setAttribute("value", "Stoped script!");
			startWatermark();
			camera.setAttribute("wasd-controls", "enabled: true");
			introRange.setAttribute("visible", false);
			floor.setAttribute("visible", true);
		},
	},
	welcomeBack: {
		script: [
			{
				time: 3000,
				value: "👋Chào mừng trở lại ヾ(＾∇＾) ✨",
				audio: "",
			}
		],
		init: () => {
			const text = document.querySelector("#intro__text");
			loadScript(sceneScript.welcomeBack, 0, { text });
		},
		detroy: () => {
			const text = document.querySelector("#intro__text");
			const introRange = document.querySelector("#intro__range");
			const floor = document.querySelector("#floor");
			text.setAttribute("visible", "false");
			startWatermark();
			camera.setAttribute("wasd-controls", "enabled: true");
			introRange.setAttribute("visible", false);
			floor.setAttribute("visible", true);
		},
	},
};

window.onload = () => {
    scene = document.querySelector("#scene");
    camera = document.querySelector("#camera");

    if (camera.hasLoaded) {
        camera.emit("update-xy", { x: -0.076, y: 0.766 });
        sceneScript.dev.init();
    } else {
        camera.addEventListener("loaded", () => {
            camera.emit("update-xy", { x: -0.076, y: 0.766 });
            sceneScript.dev.init();
        });
    }
}