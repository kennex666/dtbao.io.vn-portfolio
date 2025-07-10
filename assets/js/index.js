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
			__logger.logToSheet({
				type: "load-script",
				metadata: "introjs",
			});
			const letGo = () => {
				const text = document.querySelector("#intro__text");
				camera.setAttribute(
					"position",
					`8.320 ${settings.cameraHeight} 11.519`
				);
				camera.emit("update-xy", { x: -0.076, y: 0.766 });
				loadScript(sceneScript.skipIntro, 0, { text });

				__logger.logToSheet({
					type: "load-script",
					metadata: "skip-intro",
				});
			}
			introJs.tour().oncomplete( () => { letGo(); }).onexit(() => {letGo();}).start()
			
		},
		detroy: () => {
			setTimeout(() => {
				__logger.isDoneGuide(true);
				__missions.unlockMission("lan_dau_tham_quan");
			}, 3000);
			
			__logger.logToSheet({
				type: "load-script",
				metadata: "end-skip-intro",
			});
			
			dispatchEvent(new Event("end-openning"));
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
			__logger.logToSheet({
				type: "load-script",
				metadata: "introjs",
			});
			const letGo = () => {
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
			}
			introJs.tour().oncomplete( () => { letGo(); }).onexit(() => {letGo();}).start()

		},
		detroy: () => {
			setTimeout(() => {
				__missions.unlockMission("lan_dau_tham_quan");
				__logger.isDoneGuide(true);
			}, 3000);

			
			__logger.logToSheet({
				type: "load-script",
				metadata: "end-intro-first",
			});
			
			dispatchEvent(new Event("end-openning"));
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
			setTimeout(() => {
				__missions.unlockMission("chao_mung_tro_lai");
			}, 3000);
			
			__logger.logToSheet({
				type: "load-script",
				metadata: "end-welcome-back",
			});
			
			dispatchEvent(new Event("end-openning"));
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
			<p class="text-red-500 font-bold">Giữ nút để thu hồi đom đóm</p>
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

function muteButtonHandle() {
	const btnMute = document.querySelector("#btn-volume-mute");
	btnMute.addEventListener("click", () => {
		settings.audio = !settings.audio;
		if (!settings.audio) {
			MediaPlayer.vol = 0;
			if (MediaPlayer.status == MediaPlayer_Status.playing) {
				MediaPlayer.controllers.playMusic();
			}
			document.querySelectorAll("[sound]").forEach((el) => {
				const soundComp = el.components.sound;
				soundComp.pool.children[0].setVolume(0);
				soundComp.stopSound();
			})

			btnMute.querySelector("img").src =
				window.assetMap.lazyLoad.src.btnMute;
		} else {
			MediaPlayer.vol = 1;
			document.querySelectorAll("[sound]").forEach((el) => {
				const soundComp = el.components.sound;
				soundComp.pool.children[0].setVolume(1);
			});

			btnMute.querySelector("img").src =
				window.assetMap.lazyLoad.src.btnUnmute;
		}
	})
}

function setupEscapeHandler() {
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			const btnCloses = document.querySelectorAll("[btn-close]");
			btnCloses.forEach((btn) => {
				btn?.click && btn?.click();
			})
			
			closeImageViewer();

		}
	});
}

function enableMerryChristmas() {
	// Sound theme & unlock mission
	setTimeout(() => {
		__playlist.push({
			title: "Chirstmas Theme",
			artist: "Easter Egg: Đêm lành",
			uri: "/assets/sounds/albums/christmas_theme.mp3",
		});
		MediaPlayer.vol = 0.5

		MediaPlayer.controllers.switchMusic(__playlist.length - 1);
		if (MediaPlayer.status == MediaPlayer_Status.pause) {
			MediaPlayer.controllers.playMusic();
		}

		__missions.unlockMission("merry_chirstmas");
	}, 5000);

	// Tree
	const christmasTree = document.createElement("a-entity");
	christmasTree.classList.toggle("clickable", true);
	christmasTree.setAttribute("event-theme", "chirstmas");
	christmasTree.setAttribute("addon-physic", "");
	christmasTree.setAttribute(
		"gltf-model",
		"assets/models/event-item/ChristmasTree.glb"
	);
	christmasTree.setAttribute("position", "4.11336 0.75537 4.84004");
	christmasTree.setAttribute("scale", "2 2 2");
	christmasTree.setAttribute("animation__pop", {
		property: "scale",
		from: "1.9 1.9 1.9",
		to: "2 2 2",
		dir: "alternate",
		dur: 300,
		loop: false,
		easing: "easeInOutQuad",
		startEvents: "click",
	});

	christmasTree.setAttribute("sound", {
		src: "#chirstmas-tree-hit-sound",
		on: "click",
	});

	scene.appendChild(christmasTree);

	// Presents
	const presents = document.createElement("a-entity");
	presents.setAttribute("event-theme", "chirstmas");
	presents.classList.toggle("clickable", true);
	presents.setAttribute("addon-physic", "");
	presents.setAttribute(
		"gltf-model",
		"assets/models/event-item/ChristmasPresents.glb"
	);
	presents.setAttribute("position", "4.034 0.251 4.735");
	presents.setAttribute("rotation", "0 180 0");
	presents.setAttribute("scale", "0.4 0.4 0.4");
	presents.setAttribute("animation__pop", {
		property: "scale",
		from: "0.38 0.38 0.38",
		to: "0.4 0.4 0.4",
		dir: "alternate",
		dur: 300,
		loop: false,
		easing: "easeInOutQuad",
		startEvents: "click",
	});

	presents.setAttribute("sound", {
		src: "#chirstmas-tree-hit-sound",
		on: "click",
	});

	scene.appendChild(presents);

	// Santa
	const santa = document.createElement("a-entity");
	santa.setAttribute("event-theme", "chirstmas");
	santa.classList.toggle("clickable", true);
	santa.setAttribute("addon-physic", "");
	santa.setAttribute("gltf-model", "assets/models/event-item/santa.glb");
	santa.setAttribute("position", "7.03995 1.27381 9.2941");
	santa.setAttribute("rotation", "0 185 0");
	santa.setAttribute("scale", "0.7 0.7 0.7");

	santa.setAttribute("animation__pop", {
		property: "scale",
		from: "0.6 0.6 0.6",
		to: "0.7 0.7 0.7",
		dir: "alternate",
		dur: 300,
		loop: false,
		easing: "easeInOutQuad",
		startEvents: "click",
	});

	santa.setAttribute("sound", {
		src: "#merry-chirstmas-toy-sound",
		on: "click",
		volume: 1.2,
	});
	scene.appendChild(santa);

	// Firefly
	const fireflyColors = [
		{ color: "#ff3b3b", emissive: "#ff7a7a" }, // đỏ tươi
		{ color: "#00ff9c", emissive: "#66ffc2" }, // Xanh lá neon
		{ color: "#ffd700", emissive: "#fff066" }, // Vàng kim
		{ color: "#8ecfff", emissive: "#b6e6ff" }, // Xanh băng
		{ color: "#fffac8", emissive: "#ffffe0" }, // Vàng kem nhẹ
		{ color: "#ff69b4", emissive: "#ff9fd0" }, // Hồng đậm
		{ color: "#9370db", emissive: "#b499ff" }, // Tím lavender
		{ color: "#00bfff", emissive: "#66dfff" }, // Xanh nước biển
		{ color: "#00ffaa", emissive: "#66ffd2" }, // Xanh lá chuối
		{ color: "#ff8c00", emissive: "#ffc266" }, // Cam rực
	];

	fireflyColors.forEach((combo) => {
		const fireflyRaw = document.createElement("a-entity");
		fireflyRaw.setAttribute("firefly", {
			spread: 1.4,
			count: 5,
			size: 0.02,
			randomSize: 0.02,
			color: combo.color,
			emissive: combo.emissive,
		});
		const positionCamera = document.createElement("a-entity");
		positionCamera.setAttribute("event-theme", "chirstmas");
		positionCamera.setAttribute("position", "4.11336 1.32 4.84004");
		positionCamera.appendChild(fireflyRaw);
		scene.appendChild(positionCamera);
	});
}

function enableBirthday() {
	// Sound theme & unlock mission
	setTimeout(() => {
		__missions.unlockMission("happy_birthday");
	}, 5000);

	// Birthday cake
	const birthdayCake = document.createElement("a-entity");
	birthdayCake.setAttribute("event-theme", "chirstmas");
	birthdayCake.classList.toggle("clickable", true);
	birthdayCake.setAttribute("addon-physic", "");
	birthdayCake.setAttribute(
		"gltf-model",
		"assets/models/event-item/CakeBirthday.glb"
	);
	birthdayCake.setAttribute("position", "8.184 1.155 5.083");
	birthdayCake.setAttribute("scale", "0.3 0.3 0.3");

	birthdayCake.setAttribute("animation__pop", {
		property: "scale",
		from: "0.28 0.28 0.28",
		to: "0.3 0.3 0.3",
		dir: "alternate",
		dur: 300,
		loop: false,
		easing: "easeInOutQuad",
		startEvents: "click",
	});

	birthdayCake.setAttribute("sound", {
		src: "#birthday-cake-hit-sound",
		on: "click",
		volume: 1.2,
	});

	birthdayCake.innerHTML = `
	<a-entity id="candleLight" light="color: #ffdca8; distance: 3.22; intensity: 2.93; type: point" position="0.02907 0.98408 0.63214">
	</a-entity>`;
	scene.appendChild(birthdayCake);
}

function eventScene (date = new Date()) {

	console.log(date)
	if (date.getMonth() == 11) {
		enableMerryChristmas();
		if (date.getDate() == 19) {
			enableBirthday();
		}
	} else {
		// setTimeout( ( ) => {
		// 	if (MediaPlayer.status == MediaPlayer_Status.pause) {
		// 		MediaPlayer.controllers.playMusic();
		// 	}
		// }, 5000)
	}
}

function handleChangeGraphic () {
	const settingSelect = document.getElementById("graphicsSetting");
	settingSelect.addEventListener("change", (e) => {
		const level = e.target.value;
		settings.controllers.graphic.changeGraphic(level);
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
	});

	scene = document.querySelector("#scene");
	camera = document.querySelector("#camera");
	btnUse = document.querySelector("#btn-use");
	btnMissions = document.querySelector("#btn-missions");
	btnFirefly = document.querySelector("#btn-throwfirefly");
	const btnHome = document.querySelector("#btn-home");
	const btnCloses = document.querySelectorAll("[btn-close]");

	if (camera.hasLoaded) {
		if (!__logger.isDoneGuide()) sceneScript.guideIntro.init();
		else sceneScript.welcomeBack.init();
	} else {
		camera.addEventListener("loaded", () => {
			if (!__logger.isDoneGuide()) sceneScript.guideIntro.init();
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
	muteButtonHandle();
	handleChangeGraphic();
	setupEscapeHandler();

	// Unlock theme - for testing purpose
	// eventScene(new Date("2025-12-19"));

	window.addEventListener("dev-tools-detected", () => {
		setTimeout(() => {
			__missions.unlockMission("dev_tools");
		}, 1500);

		__logger.logToSheet({
			type: "dev-tools-detected",
		});

		window.dispatchEvent(new Event("clear-console"));
	});

	window.addEventListener("end-openning", () => {
		eventScene();
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

		settings.controllers.graphic.changeGraphic(settings.graphic);
	});
}

window.onbeforeunload = function () {
	__logger.logToSheet({
		type: "logout"
	})
};