const GRAPHIC_ENUM = {
    low: 1,
    medium: 2,
    high: 3,
    ultra: 4
}
const settings = {
	isDevMode: false,
	device: "pc",
	audio: false,
	isTouchable: navigator.maxTouchPoints > 0,
	graphic: GRAPHIC_ENUM.medium,
	controllers: {
		changeGraphic: (level) => {
			settings.graphic = level;
			scene.emit("graphic-changed", { level }, false);
		},
	},
	missions: {
		unlocked: [],
		total: [
			{
				id: "chien_binh_ranh_roi",
				name: "Chiến Binh Rảnh Rỗi (The Wanderer With Too Much Time)",
				display: "Chiến Binh Rảnh Rỗi",
				rating: 4,
				isHidden: false,
				description:
					"Không phải vì tò mò, mà là vì quá rảnh.\nHắn ta đã đi đến nơi tận cùng - để làm gì chứ?",
				hint: "Đến ranh giới của thời không",
			},
			{
				id: "cuu_xuc_chi_uoc",
				name: "Cửu Xúc Chi Ước",
				display: "Cửu Xúc Chi Ước",
				rating: 5,
				isHidden: true,
				description:
					"Gì thế lữ khách? 9 lần? Đó là cách gọi ta xuất hiện, ta - Jasper Kennex - Số 09 đến đây ⚽",
				hint: "Hehehe, hãy đoán mò đi",
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
				id: "phong_tranh_ao",
				name: "Ảo Ảnh Thất",
				display: "Ảo Ảnh Thất",
				rating: 2,
				isHidden: false,
				description:
					"Một căn phòng phủ đầy ảo ảnh. Tất cả. đều là. ký ức?",
				hint: "VR Headset",
			},
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
			{
				id: "choi_dan",
				name: "Âm Thanh Ngọt Ngào",
				display: "Âm Thanh Ngọt Ngào",
				rating: 4,
				isHidden: false,
				description:
					"Oops... Tiếng gì thế? À, quý lữ khách, đừng làm hỏng cây đàn của tôi nhé!",
				hint: "🎸",
			},
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
			{
				id: "hoa_hong_cua_me",
				name: "Hoa Hồng Của Mẹ",
				display: "Hoa Hồng Của Mẹ",
				rating: 3,
				isHidden: false,
				description:
					"Là mẹ của tôi đã nói rằng bà ấy thích hoa hồng, thế là chọn cho tôi một chậu hoa này và đã nói hãy đặt nó ở đây 🌹",
				hint: "🌹",
			},
			{
				id: "su_tich_cay_bonsai",
				name: "Sự Tích Cây Bonsai",
				display: "Hoa Hồng Của Mẹ",
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
			{
				id: "dev_tools",
				name: "Đồng Dev",
				display: "Đồng Dev",
				rating: 5,
				isHidden: false,
				description: "Ấy daaa. Một lữ khách tò mò. Căn nhà này không có gì đâu ヾ(≧▽≦*)o",
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
	},
};