var scene = null;
var camera = null;
var btnUse = null;
var btnMissions = null;
var btnFirefly = null;

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
	guideIntro: {
		init: () => {
			const guideBook = document.querySelector("#guide-book");
			const btnStart = document.querySelector("#btn-start-intro");
			const btnSkip = document.querySelector("#btn-skip-intro");
			guideBook.classList.toggle("hidden", false);
			settings.disableScroll = true;
			btnStart.addEventListener("click", () => {
				sceneScript.guideIntro.detroy();
				sceneScript.firstTime.init();
			});
			btnSkip.addEventListener("click", () => {
				sceneScript.guideIntro.detroy();
				sceneScript.skipIntro.init();
			});
			
			__logger.logToSheet({
				type: "load-script",
				metadata: "guide-intro",
			});
		},
		detroy: () => {
			const guideBook = document.querySelector("#guide-book");
			guideBook.classList.toggle("hidden", true);
			settings.disableScroll = false;
			
			__logger.logToSheet({
				type: "load-script",
				metadata: "end-guide-intro",
			});
		},
	},
	skipIntro: {
		script: [
			{
				time: 3000,
				value: "👋Hãy tự do khám phá nhé, quý lữ kháchヾ(＾∇＾) ✨",
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
			loadScript(sceneScript.skipIntro, 0, { text });
			
			__logger.logToSheet({
				type: "load-script",
				metadata: "skip-intro"
			})
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
			
			__logger.logToSheet({
				type: "load-script",
				metadata: "end-skip-intro",
			});
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
			camera.setAttribute(
				"position",
				`8.320 ${settings.cameraHeight} 11.519`
			);
			camera.emit("update-xy", { x: -0.076, y: 0.766 });
			loadScript(sceneScript.firstTime, 0, { text });
			
			__logger.logToSheet({
				type: "load-script",
				metadata: "intro-first",
			});
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

			
			__logger.logToSheet({
				type: "load-script",
				metadata: "end-intro-first",
			});
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

			__logger.logToSheet({
				type: "load-script",
				metadata: "welcome-back",
			});
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
			
			__logger.logToSheet({
				type: "load-script",
				metadata: "end-welcome-back",
			});
		},
	},
};

function createToast(message, duration = 3000) {
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

	if (createToast._timeout) clearTimeout(createToast._timeout);
	createToast._timeout = setTimeout(() => {
		existing.style.display = "none";
	}, duration);
}

function createDoneToast(data, duration = 5000) {
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
                    <img src="${window.assetMap.lazyLoad.src.icoTrophy}" class="w-10 h-10"/>
                    <div class="flex-1 flex text-2xl font-semibold">
                        <span>${data.display}</span>
                    </div>
                </div>
                <div>
                    ${data.description}
                </div>
		`;
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

function guideHandler (){
	const btnGuide = document.querySelector("#btn-guide");

	btnGuide.addEventListener("click", () => {
		const guideBook = document.querySelector("#guide-book");
		const btnStart = document.querySelector("#btn-start-intro");
		const btnSkip = document.querySelector("#btn-skip-intro");
		const btnClose = guideBook.querySelector("[btn-close]");
		if (btnClose) {
			btnClose.classList.toggle("hidden", false);
		}
		guideBook.classList.toggle("hidden", false);
		settings.disableScroll = true;
		btnStart.parentElement.classList.toggle("hidden", true);
	})
}

function throwFirefly(spread = 5, count = 30) {
	const cameraPos = camera.getAttribute("position");
	const fireflyRaw = document.createElement("a-entity");
	fireflyRaw.setAttribute(
		"firefly",
		{
			spread,
			count,
			size: 0.02,
			randomSize: 0.03
		}
	);
	const positionCamera = document.createElement("a-entity");
	positionCamera.setAttribute("position", {
		x: cameraPos.x,
		y: cameraPos.y,
		z: cameraPos.z,
	});
	positionCamera.appendChild(fireflyRaw);
	positionCamera.classList.toggle("addon-firefly", true);
	scene.appendChild(positionCamera);
}

function escapeHTML(str) {
	return str.replace(/[&<>'"]/g, function (c) {
		return {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"'": "&#39;",
			'"': "&quot;",
		}[c];
	});
}

function throwButtonHandle () {
	let dismissNotificationFireFly = false;
	let holdTimer = null;
	let noHandleClick = false;
	btnFirefly.addEventListener("click", (e) => {
		if (noHandleClick)
			return;
		if (dismissNotificationFireFly) {
			throwFirefly();
			return;
			}
		let existingPopup = document.getElementById("firefly-warning-popup");
		if (existingPopup) existingPopup.remove();
		const popup = document.createElement("div");
		popup.id = "firefly-warning-popup";
		popup.innerHTML = `
		<div style="padding: 12px; width: 240px; background: #fff8dc; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); font-size: 1rem;">
			<strong>Cảnh báo:</strong><br>
			Thả đom đóm có thể khiến máy lag 🐞<br>
			<i>Nhấn giữ để thu hồi đom đóm</i>
			<br>
			<br>
			<button id="continue-firefly" style="margin-top: 6px; padding: 6px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Tiếp tục</button>
			<button id="dismiss-firefly" style="margin-top: 6px; padding: 6px 12px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Bỏ qua</button>
		</div>
	`;
		const offsetX = -220;
		const offsetY = 10; 
		popup.style.position = "fixed";
		popup.style.left = `${e.clientX + offsetX}px`;
		popup.style.top = `${e.clientY + offsetY}px`;
		popup.style.zIndex = 9999;

		document.body.appendChild(popup);

		document
			.getElementById("continue-firefly")
			.addEventListener("click", () => {
				popup.remove();
				throwFirefly(); 
				dismissNotificationFireFly = true;
			});

		document
			.getElementById("dismiss-firefly")
			.addEventListener("click", () => {
				popup.remove();
			});
		setTimeout(() => {
			popup.remove();
		}, 5000);
	});

	btnFirefly.addEventListener("mousedown", (e) => {
		holdTimer = setTimeout(() => {
			document.querySelectorAll(".addon-firefly").forEach(el => el.remove())
			noHandleClick = true;
		}, 500); 
	});

	btnFirefly.addEventListener("mouseup", () => {
		setTimeout(() => {
			noHandleClick = false;
		}, 100)
		clearTimeout(holdTimer); 
	});

	btnFirefly.addEventListener("mouseleave", () => {
		setTimeout(() => {
			noHandleClick = false;
		}, 100);
		clearTimeout(holdTimer); 
	});
}
function ballRecall() {
	document.querySelector("#btn-ballrecall").addEventListener("click", () => {
		const ball = document.querySelector("[kick-ball]");

		ball.object3D.position.set(2.10559, 0.23173, 4.64923);
		if (ball.body) {
			ball.body.position.set(2.10559, 0.23173, 4.64923);
			ball.body.velocity.set(0, 0, 0);
			ball.body.angularVelocity.set(0, 0, 0);
		}
	});
}
window.onload = () => {
	// Load data
	const guestData = __logger.init();

	__logger.logToSheet({ 
		type: "login",
		metadata: {
			touchable: settings.isTouchable,
			device: settings.device,
			raw_log: __logger.data,
		},
	})
	
	scene = document.querySelector("#scene");
	camera = document.querySelector("#camera");
	btnUse = document.querySelector("#btn-use");
	btnMissions = document.querySelector("#btn-missions");
	btnFirefly = document.querySelector("#btn-throwfirefly");
	const btnHome = document.querySelector("#btn-home");
	const btnCloses = document.querySelectorAll("[btn-close]");

	if (camera.hasLoaded) {
		if (guestData.visit_total == 1) sceneScript.guideIntro.init();
		else sceneScript.welcomeBack.init();
	} else {
		camera.addEventListener("loaded", () => {
			if (guestData.visit_total == 1) sceneScript.guideIntro.init();
			else sceneScript.welcomeBack.init();
		});
	}

	window.addEventListener("keydown", (e) => {
		if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "i") {
			settings.isDevMode = !settings.isDevMode;
			console.log("Dev mode!");
		}
	});

	btnCloses.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const elClosest = btn.closest("[id]");
			elClosest?.id &&
				__logger.logToSheet({
					type: "close-item",
					metadata: elClosest.id,
				});
			settings.disableScroll = false;
			elClosest.classList.toggle("hidden", true);
		});
	});

	btnHome.addEventListener("click", () => {
		camera.emit("update-xy", { x: -0.076, y: 0.766 });
		camera.emit("update-position", { x: 8.32, y: 2.2, z: 11.519 });
	});

	missionHandler();
	visitorHandler();
	visitorSubmition();
	guideHandler();
	// Gọi load lần đầu
	loadMessagesPage();

	throwButtonHandle();

	ballRecall();

	window.addEventListener("dev-tools-detected", () => {
		setTimeout(() => {
			__missions.unlockMission("dev_tools");
		}, 1500);
	});
}

window.onbeforeunload = function () {
	__logger.logToSheet({
		type: "logout"
	})
};