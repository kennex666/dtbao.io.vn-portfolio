var scene = null;
var camera = null;
var btnUse = null;
var btnMissions = null;

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
			text.removeAttribute("animation__blink");
			startWatermark();
			camera.setAttribute(
				"wasd-controls",
				`enabled: true; acceleration: ${settings.speed.walk}`
			);
			camera.setAttribute("position", `8.320 ${settings.cameraHeight} 11.519`);
			introRange.setAttribute("visible", false);
			floor.setAttribute("visible", true);
		},
		detroy: () => {},
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
			text.setAttribute("visible", "false");
			text.removeAttribute("animation__blink");
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
			},
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
			text.removeAttribute("animation__blink");
			startWatermark();
			camera.setAttribute("wasd-controls", "enabled: true");
			introRange.setAttribute("visible", false);
			floor.setAttribute("visible", true);
		},
	},
};

function createToast(message, duration = 3000) {
	// Kiểm tra xem đã có chưa
	let existing = document.getElementById("redirect-toast");
	if (!existing) {
		const toast = document.createElement("div");
		toast.id = "redirect-toast";
		Object.assign(toast.style, {
			position: "fixed",
			top: "40vh",
			right: "20px",
			background: "#ed5c71",
			color: "white",
			padding: "10px 16px",
			borderRadius: "8px",
			fontSize: "14px",
			zIndex: "1000",
			display: "none",
			maxWidth: "80vw",
			userSelect: "none",
			pointerEvents: "none",
		});
		document.body.appendChild(toast);
		existing = toast;
	}

	existing.textContent = message;
	existing.style.display = "block";

	// Clear cũ nếu có
	if (createToast._timeout) clearTimeout(createToast._timeout);
	createToast._timeout = setTimeout(() => {
		existing.style.display = "none";
	}, duration);
}

window.onload = () => {
    scene = document.querySelector("#scene");
    camera = document.querySelector("#camera");
	btnUse =document.querySelector("#btn-use");
	btnMissions = document.querySelector("#btn-missions");
	const btnHome = document.querySelector("#btn-home");
	const missionsPage = document.querySelector("#missions");
	const listMissions = document.querySelector("[list-missions]");

	const btnCloses = document.querySelectorAll("[btn-close]")

    if (camera.hasLoaded) {
        camera.emit("update-xy", { x: -0.076, y: 0.766 });
        sceneScript.dev.init();
    } else {
        camera.addEventListener("loaded", () => {
            camera.emit("update-xy", { x: -0.076, y: 0.766 });
            sceneScript.dev.init();
        });
    }

	window.addEventListener("keydown", (e) => {
		if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "i") {
			settings.isDevMode = !settings.isDevMode;
			console.log("Dev mode!")
		}
	});

	btnMissions.addEventListener("click", (e) => {
		settings.disableScroll = true;
		missionsPage.classList.toggle("hidden", false);
		btnMissions.closest("[id]").classList.toggle("noselect", false);

		let dataCount = document.querySelector("[data-missions-count]");
		dataCount.innerText = `Đã hoàn thành: ${__missions.unlocked.length}/${__missions.total.length}`
		listMissions.innerHTML = __missions.total.map((v) => {
			let  isUnlocked = __missions.unlocked.findIndex((val) => val == v.id) > -1;
			if (v.isHidden && !isUnlocked) {
				``;
			}
			return `
                            <li>
                                <div class="flex gap-x-2 items-center">
                                    <img src="./assets/images/ico-trophy.png" class="w-12 h-12"/>
                                    <div class="flex-1 flex">
                                        <span>${v.display}</span>
                                        <img src="/assets/images/ico-info.png" class="ms-2 w-3 h-3">
                                    </div>
                                    ${
										isUnlocked
											? `<img src="./assets/images/ico-done.png" class="w-12 h-12"/>`
											: `<img src="./assets/images/ico-undone.png" class="w-12 h-12"/>`
									}
                                </div>
                                <div class="text-sm md:text-base">
                                    ${v.description}
                                </div>
                            </li>
							`;
		}).join(" ")
	})

	btnCloses.forEach(btn => {
		btn.addEventListener("click", (e) => {
			settings.disableScroll = false;
			btn.closest("[id]").classList.toggle("hidden", true);
			btn.closest("[id]").classList.toggle("noselect", true);
		})
	})

	btnHome.addEventListener("click", () => {
		camera.emit("update-xy", { x: -0.076, y: 0.766 });
		camera.emit("update-position", { x: 8.32, y: 2.2, z: 11.519 });
	})
}