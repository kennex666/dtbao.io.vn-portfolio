
function missionHandler( ) {
	const missionsPage = document.querySelector("#missions");
	const listMissions = document.querySelector("[list-missions]");
	btnMissions.addEventListener("click", (e) => {
		settings.disableScroll = true;
		missionsPage.classList.toggle("hidden", false);
		// btnMissions.closest("[id]").classList.toggle("noselect", false);

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
											  window.assetMap.lazyLoad.src
													.icoEastereggUnl002
											: window.assetMap.lazyLoad.src
													.icoEasteregg
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
                                        <img src="${
											window.assetMap.lazyLoad.src.icoInfo
										}" class="ms-2 w-3 h-3">
                                    </div>
									<img src="
                                    ${
										isUnlocked
											? window.assetMap.lazyLoad.src
													.icoDone
											: window.assetMap.lazyLoad.src
													.icoUndone
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
											? window.assetMap.lazyLoad.src
													.icoTrophy
											: window.assetMap.lazyLoad.src
													.icoTrophyLock
									}" class="w-12 h-12"/>
                                    <div class="flex-1 flex">
                                        <span>${v.display}</span>
                                        <img src="${
											window.assetMap.lazyLoad.src.icoInfo
										}" class="ms-2 w-3 h-3">
                                    </div>
									<img src="${
										isUnlocked
											? window.assetMap.lazyLoad.src
													.icoDone
											: window.assetMap.lazyLoad.src
													.icoUndone
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
}

const __missions = {
	saveKey: "missions_unlock",
	isUnlocked: (id) => {
		const isUnlocked = __missions.unlocked.findIndex((e) => e.id == id);
		return isUnlocked != -1;
	},
	loadMission: () => {
		let data = window.localStorage.getItem(__missions.saveKey);
		if (data) {
			try {
				data = JSON.parse(data);
			} catch (error) {
				data = [];
			}
		} else {
			data = [];
		}
		data.forEach((e) => {
			const mission = __missions.total.findIndex((v) => v.id == e.id);
			if (mission != -1) {
				__missions.unlocked.push(e);
				__missions.total[mission].done = true;
			}
		});
		setTimeout(() => {
			if (__missions.isUnlocked("cuu_xuc_chi_uoc")) {
				__playlist.push({
					title: "Please Tell Me Why",
					artist: "Easter Egg Cũ (REMASTER)",
					uri: "/assets/sounds/albums/old-easteregg.mp3",
				});
			}
		}, 1000)
	},
	saveMission: (data) => {
		window.localStorage.setItem(__missions.saveKey, JSON.stringify(data));
	},
	loadNotification: (mission) => {
		setTimeout(() => {
			createDoneToast(mission.data);
			setTimeout(() => {
				__missions.queueNotification =
					__missions.queueNotification.filter(
						(v) => v.index != mission.index
					);
				if (__missions.queueNotification.length) {
					__missions.loadNotification(
						__missions.queueNotification[0]
					);
				}
			}, 5500);
		}, 200);
	},
	queueNotification: [],
	getMission: (id) => {
		const index = __missions.total.findIndex((v) => v.id == id);
		if (index == -1) {
			return false;
		}
		return {
			index,
			data: __missions.total[index],
		};
	},
	unlockMission: (id) => {
		const mission = __missions.getMission(id);

		if (!mission) return;
		if (__missions.unlocked.findIndex((v) => v.id == id) != -1) return;

		__missions.queueNotification.push(mission);
		__missions.unlocked.push({
			id,
			time: new Date().getTime(),
		});
		__missions.total[mission.index].done = true;
		__missions.saveMission(__missions.unlocked);

		if (__missions.queueNotification[0].index == mission.index) {
			__missions.loadNotification(mission);
		}

		if (mission.data.id == "cuu_xuc_chi_uoc") {
			__playlist.push({
				title: "Please Tell Me Why",
				artist: "Easter Egg Cũ (REMASTER)",
				uri: "/assets/sounds/albums/old-easteregg.mp3",
			});

			MediaPlayer.controllers.switchMusic(__playlist.length - 1);
			if (MediaPlayer.status == MediaPlayer_Status.pause) {
				MediaPlayer.controllers.playMusic();
			}
		}

		__logger.logToSheet({
			type: "missions-unlock",
			metadata: {
				id: mission.data.id,
				name: mission.data.name,
				isEasterEgg: mission.data.isHidden,
				total: __missions.unlocked.length,
				unlocked: __missions.unlocked,
			},
		});
	},
	unlocked: [],
	total: [
		// added
		{
			id: "chien_binh_ranh_roi",
			name: "Chiến Binh Rảnh Rỗi",
			display: "Chiến Binh Rảnh Rỗi",
			rating: 4,
			isHidden: false,
			description:
				"Không phải vì tò mò, mà là vì quá rảnh.\nHắn ta đã đi đến nơi tận cùng - để làm gì chứ?",
			hint: "Đến ranh giới của thời không",
		},
		// added
		{
			id: "cuu_xuc_chi_uoc",
			name: "Cửu Xúc Chi Ước",
			display: "Cửu Xúc Chi Ước",
			rating: 5,
			isHidden: true,
			unlockico: "./assets/images/ico-unlockee01.gif",
			description:
				"Gì thế lữ khách? 9 lần? Đó là cách gọi ta xuất hiện, ta - Jasper Kennex - Số 09 đến đây ⚽",
			hint: "Easter egg này thuộc portfolio 2D, đoán mò đi, hẹ hẹ hẹ",
		},
		{
			id: "kham_pha_van_vat",
			name: "Khám Phá Vạn Vật",
			display: "Khám Phá Vạn Vật",
			rating: 5,
			isHidden: false,
			description:
				"Vạn vật đều có linh. Những ký ức đã ngủ quên trong từng món đồ đang chờ được đánh thức. Bạn có thể nhìn thấy điều người khác không thấy?",
			hint: "",
		},
		{
			id: "the_great_wave_off_kanagawa",
			name: "The Great Wave off Kanagawa",
			display: "Làn sóng Kanagawa",
			rating: 2,
			isHidden: false,
			description:
				"Giữa làn sóng dữ dội, vẫn có một con thuyền dũng cảm vươn mình tiến về phía trước - như cách mình đối mặt thử thách trong hành trình sáng tạo.",
			hint: "🖼️",
		},
		// added
		{
			id: "phong_tranh_ao",
			name: "Ảo Ảnh Thất",
			display: "Ảo Ảnh Thất",
			rating: 2,
			isHidden: false,
			description: "Một căn phòng phủ đầy ảo ảnh. Tất cả. đều là. ký ức?",
			hint: "VR Headset",
		},
		// added
		{
			id: "lan_dau_tham_quan",
			name: "Nhập Cảnh Sơ Môn",
			display: "Nhập Cảnh Sơ Môn",
			rating: 1,
			isHidden: false,
			description:
				"Mỗi hành trình đều bắt đầu bằng một bước chân. Cảm ơn quý lữ khách đã để bước chân ấy chạm vào nơi này.",
			hint: "",
		},
		// added
		{
			id: "chao_mung_tro_lai",
			name: "Tái Kiến Chi Môn",
			display: "Tái Kiến Chi Môn",
			rating: 5,
			isHidden: false,
			description:
				"Cảm ơn quý lữ khách đã quay trở lại. Dù đã từng đặt chân đến nơi này, sự hiện diện của bạn hôm nay vẫn mang theo một điều rất đặc biệt. Chúc hành trình tiếp theo sẽ thật trọn vẹn!",
			hint: "3 lần tham quan",
		},
		// added
		{
			id: "ghi_danh",
			name: "Ghi Danh Sổ Tịch",
			display: "Ghi Danh Sổ Tịch",
			rating: 5,
			isHidden: false,
			description:
				"Mỗi cái tên là một câu chuyện. Việc lưu danh vào sổ chỉ là bước đầu - nhưng là dấu mốc đầu tiên để nơi này nhớ đến quý lữ khách.",
			hint: "Ghi danh tại quyển tập đang mở",
		},
		// added
		{
			id: "giai_ma_nhan_danh",
			name: "Giải Mã Nhân Danh",
			display: "Giải Mã Nhân Danh",
			rating: 4,
			isHidden: false,
			description:
				"Cảm ơn vì đã dành thời gian nhìn vào cái tên này. Phía sau nó là một câu chuyện, những lựa chọn, và cả những điều chưa nói thành lời. Hy vọng hành trình khai phá ấy khiến người thấy được một phần thật của tôi.",
			hint: "Bảng thông tin",
		},
		{
			id: "choi_bong",
			name: "Giấc Mơ Sân Cỏ",
			display: "Giấc Mơ Sân Cỏ",
			rating: 4,
			isHidden: false,
			description:
				"Mỗi cú chạm bóng là một nhịp tim. Mỗi bước chạy là một mảnh ước mơ được chắp cánh. Cảm ơn vì đã ghé qua giấc mơ này - nơi sân cỏ không chỉ là trò chơi, mà là cả tuổi trẻ.",
			hint: "PSG - PSG - PSG ⚽",
		},
		// added
		{
			id: "choi_dan",
			name: "Âm Thanh Ngọt Ngào",
			display: "Âm Thanh Ngọt Ngào",
			rating: 2,
			isHidden: false,
			description:
				"Oops... Tiếng gì thế? À, quý lữ khách, đừng làm hỏng cây đàn của tôi nhé!",
			hint: "🎸",
		},
		// added
		{
			id: "sy_quan",
			name: "Vì Dải Đất Này",
			display: "Vì Dải Đất Này",
			rating: 5,
			isHidden: false,
			description:
				"Lần đầu tiên mình mơ trở thành một người lính là năm lớp 9, để trở thành một người có thể bảo vệ những thứ mình thương 🪖🇻🇳 Giấc mộng vẫn đang mang, nhưng hành trình này đã khác...",
			hint: "🪖",
		},
		// added
		{
			id: "tuong_tac_den",
			name: "Không Gian Tối",
			display: "Không Gian Tối",
			rating: 3,
			isHidden: false,
			description:
				"Tối quá. Ta có thể nhận lấy một chút hào quang từ ngươi?",
			hint: "Workspace",
		},
		// added
		{
			id: "bi_an_long_dat",
			name: "Bí Ẩn Vực Sâu",
			display: "Bí Ẩn Vực Sâu",
			rating: 3,
			isHidden: false,
			description:
				"Thế giới này xây dựng với bề nổi, liệu có tảng băng nào đang chìm không nhỉ?",
			hint: "??? -> Rapper chuyên nghiệp",
		},
		// added
		{
			id: "hoa_hong_cua_me",
			name: "Hoa Hồng Của Mẹ",
			display: "Hoa Hồng Của Mẹ",
			rating: 3,
			isHidden: false,
			description:
				"Là mẹ của tôi đã nói rằng bà ấy thích hoa hồng, thế là mẹ chọn cho tôi chậu hoa này. Bà nói hãy đặt nó ở đây 🌹💖",
			hint: "🌹",
		},
		// added
		{
			id: "su_tich_cay_bonsai",
			name: "Sự Tích Cây Bonsai",
			display: "Sự Tích Cây Bonsai",
			rating: 3,
			isHidden: false,
			description:
				"Tương truyền có một người dành cả đời chỉ để uốn một cây bonsai. Mỗi sáng, ông tưới nước, chỉnh từng nhánh nhỏ, dù chẳng ai khen. Khi người ta hỏi vì sao chưa bỏ cuộc, ông chỉ đáp: 'Vì ngày mai nó sẽ đẹp hơn hôm nay một chút.'",
			hint: "🌲",
		},
		{
			id: "merry_chirstmas",
			name: "Ký Ức Đêm Lành",
			display: "Ký Ức Đêm Lành",
			rating: 5,
			isHidden: true,
			unlockico: "./assets/images/ico-unlockee-mrcm.png",
			description:
				"Tháng 12 rồi sao? Tôi làm trang này từ đầu tháng 06/2025 và lúc viết nhiệm vụ này là lúc 23/06/2025. Thời gian thấm thoát thoi đưa, ayyyy... Lên chủ đề Noel thôi~",
			hint: "🎄",
		},
		{
			id: "happy_birthday",
			name: "Hôm Nay Là Một Câu Chuyện",
			display: "Hôm Nay Là Một Câu Chuyện",
			rating: 5,
			isHidden: true,
			unlockico: "./assets/images/ico-unlockee-hpbd.gif",
			description:
				"Cuộc hành trình bắt đầu vào một ngày như hôm nay, và sẽ viết tiếp những câu chuyện cho những người muốn khám phá.",
			hint: "🎂",
		},
		{
			id: "bi_an_goc_khuat",
			name: "Góc Khuất",
			display: "Góc Khuất",
			rating: 5,
			isHidden: false,
			description: "Nhiệm vụ này... Rốt cuộc đâu mới là góc khuất?",
			hint: "Nơi mà bạn không thể nhìn thấy từ trên cao",
		},
		// added
		{
			id: "dev_tools",
			name: "Đồng Dev",
			display: "Đồng Dev",
			rating: 5,
			isHidden: false,
			description:
				"Ấy daaa. Một lữ khách tò mò. Căn nhà này không có gì đâu ヾ(≧▽≦*)o",
			hint: "Hãy nói lớn: 'Tôi là lập trình viên' 3 lần sẽ mở khoá thành tựu 🤡",
		},
	],
	sky: {
		currentStep: 0,
		script: [
			{
				boundary: 50,
				text: "Bà ra tới đây thiệt hả bà Thơ 🤡?",
			},
			{
				boundary: 60,
				text: "Hãy quay về đi, không là tui jump scare đó nha",
			},
			{
				boundary: 70,
				text: "Đi nữa là tui nhảy xuống bà luôn bây giờ",
			},
			{
				boundary: 95,
				text: "Được rồi",
			},
			{
				boundary: 110,
				text: "Tui muốn nói là...",
			},
			{
				boundary: 120,
				text: "Là...",
			},
			{
				boundary: 125,
				text: "Là gì nhỉ...?",
			},
			{
				boundary: 130,
				text: "🏆 Mở khoá thành tựu: Chiến binh rảnh rỗi.\nChúc mừng bà nha :))) Hiện đã mở khoá: {easter_egg_count}/{easter_egg_total} missions",
			},
		],
	},
};