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
			camera.setAttribute(
				"position",
				`8.320 ${settings.cameraHeight} 11.519`
			);
			camera.emit("update-xy", { x: -0.076, y: 0.766 });
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
			camera.setAttribute(
				"position",
				`8.320 ${settings.cameraHeight} 11.519`
			);
			camera.emit("update-xy", { x: -0.076, y: 0.766 });
			loadScript(sceneScript.firstTime, 0, { text });
		},
		detroy: () => {
			const text = document.querySelector("#intro__text");
			const introRange = document.querySelector("#intro__range");
			const floor = document.querySelector("#floor");
			camera.setAttribute(
				"wasd-controls",
				`enabled: true; acceleration: ${settings.speed.walk}`
			);
			text.setAttribute("visible", "false");
			text.removeAttribute("animation__blink");
			startWatermark();
			introRange.setAttribute("visible", false);
			floor.setAttribute("visible", true);
			setTimeout(() => {
				__missions.unlockMission("lan_dau_tham_quan");
			}, 3000);
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
			camera.setAttribute(
				"position",
				`8.320 ${settings.cameraHeight} 11.519`
			);
			camera.emit("update-xy", { x: -0.076, y: 0.766 });
			loadScript(sceneScript.welcomeBack, 0, { text });
		},
		detroy: () => {
			const text = document.querySelector("#intro__text");
			const introRange = document.querySelector("#intro__range");
			const floor = document.querySelector("#floor");
			camera.setAttribute(
				"wasd-controls",
				`enabled: true; acceleration: ${settings.speed.walk}`
			);
			text.setAttribute("visible", "false");
			text.removeAttribute("animation__blink");
			startWatermark();
			introRange.setAttribute("visible", false);
			floor.setAttribute("visible", true);
			setTimeout(() => {
				__missions.unlockMission("chao_mung_tro_lai");
			}, 3000);
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

function createDoneToast(data, duration = 5000) {
	// Kiểm tra xem đã có chưa
	let existing = document.getElementById("done-toast");

	if (!existing) {
		const toast = document.createElement("div");
		toast.id = "done-toast";
		toast.classList =
			"top-[10vh] left-[20px] fixed bg-white w-[30vw] p-4 rounded-lg text-[#536493]";
		document.body.appendChild(toast);
		existing = toast;
	}
	existing.classList.toggle("hidden", false);
	existing.classList.toggle("mission-popup", true);

	existing.innerHTML = `
                <div class="flex gap-x-3 items-center mb-2">
                    <img src="/assets/images/ico-trophy.png" class="w-10 h-10"/>
                    <div class="flex-1 flex text-2xl font-semibold">
                        <span>${data.display}</span>
                    </div>
                </div>
                <div>
                    ${data.description}
                </div>
		`;
	// Clear cũ nếu có
	if (createDoneToast._timeout) clearTimeout(createDoneToast._timeout);
	createDoneToast._timeout = setTimeout(() => {
		setTimeout(() => {
			existing.classList.toggle("mission-popoff", false);
			existing.classList.toggle("mission-popup", false);
			existing.classList.toggle("hidden", true);
		}, 100)
		existing.classList.toggle("mission-popoff", true);
	}, duration);
}

window.onload = () => {
	// Load data
	const guestData = __logger.init();

	scene = document.querySelector("#scene");
	camera = document.querySelector("#camera");
	btnUse = document.querySelector("#btn-use");
	btnMissions = document.querySelector("#btn-missions");
	const btnHome = document.querySelector("#btn-home");
	const missionsPage = document.querySelector("#missions");
	const listMissions = document.querySelector("[list-missions]");

	const btnCloses = document.querySelectorAll("[btn-close]");

	if (camera.hasLoaded) {
		if (guestData.visit_total == 1) 
			sceneScript.firstTime.init();
		else 
			sceneScript.welcomeBack.init();
		
	} else {
		camera.addEventListener("loaded", () => {
			if (guestData.visit_total == 1) sceneScript.firstTime.init();
			else sceneScript.welcomeBack.init();
		});
	}

	window.addEventListener("keydown", (e) => {
		if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "i") {
			settings.isDevMode = !settings.isDevMode;
			console.log("Dev mode!");
		}
	});

	btnMissions.addEventListener("click", (e) => {
		settings.disableScroll = true;
		missionsPage.classList.toggle("hidden", false);
		btnMissions.closest("[id]").classList.toggle("noselect", false);

		let dataCount = document.querySelector("[data-missions-count]");
		dataCount.innerText = `Đã hoàn thành: ${__missions.unlocked.length}/${__missions.total.length}`;
		listMissions.innerHTML = __missions.total
			.sort((a, b) => {
				return a.rating - b.rating;
			})
			.sort((a, b) => {
				if (a.isHidden && a.isHidden == b.isHidden) {
					return 0;
				}
				if (a.isHidden) return 1;
				if (b.isHidden) return -1;
				return 0;
			})
			.map((v) => {
				let isUnlocked = __missions.isUnlocked(v.id);
				if (v.isHidden) {
					return `<li>
                                <div class="flex gap-x-2 items-center mb-1">
                                    <img src="${
										isUnlocked
											? v.unlockico ||
											  "./assets/images/ico-unlockee02.gif"
											: "./assets/images/ico-easteregg.png"
									}" class="w-12 h-12"/>
                                    <div class="flex-1 flex">
                                        <span>${
											v.done
												? `${v.display} (#${
														__missions.getMission(
															v.id
														).index
												  })`
												: `Easter egg (#${
														__missions.getMission(
															v.id
														).index
												  })`
										}</span>
                                        <img src="/assets/images/ico-info.png" class="ms-2 w-3 h-3">
                                    </div>
									<img src="
                                    ${
										isUnlocked
											? "./assets/images/ico-done.png"
											: "./assets/images/ico-undone.png"
									}" class="w-12 h-12"/>
                                </div>
                                <div class="text-sm md:text-base ${
									v.done ? "" : "h-4 bg-[#1a1b30]"
								}">
                                    ${v.done ? v.description : ""}
                                </div>
                            </li>`;
				}
				return `
                            <li>
                                <div class="flex gap-x-2 items-center mb-1">
                                    <img src="${
										isUnlocked
											? "./assets/images/ico-trophy.png"
											: "./assets/images/ico-lock.png"
									}" class="w-12 h-12"/>
                                    <div class="flex-1 flex">
                                        <span>${v.display}</span>
                                        <img src="/assets/images/ico-info.png" class="ms-2 w-3 h-3">
                                    </div>
									<img src="${
										isUnlocked
											? "./assets/images/ico-done.png"
											: "./assets/images/ico-undone.png"
									}" class="w-12 h-12"/>
                                    
                                </div>
                                <div class="text-sm md:text-base">
                                    ${
										v.done
											? v.description
											: `[Độ khó: ${
													v.rating || "unk"
											  }/5] ${
													v.hint ||
													"Làm gì có gợi ý ~"
											  }`
									}
                                </div>
                            </li>
							`;
			})
			.join(" ");
	});

	btnCloses.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			settings.disableScroll = false;
			btn.closest("[id]").classList.toggle("hidden", true);
			btn.closest("[id]").classList.toggle("noselect", true);
		});
	});

	btnHome.addEventListener("click", () => {
		camera.emit("update-xy", { x: -0.076, y: 0.766 });
		camera.emit("update-position", { x: 8.32, y: 2.2, z: 11.519 });
	});
}