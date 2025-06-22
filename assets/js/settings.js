const GRAPHIC_ENUM = {
    low: 1,
    medium: 2,
    high: 3,
    ultra: 4
}
const settings = {
	audio: false,
	graphic: GRAPHIC_ENUM.medium,
	controllers: {
		changeGraphic: (level) => {
			settings.graphic = level;
			scene.emit("graphic-changed", { level }, false);
		},
	},
	easterEggs: {
		unlocked: [],
		total: [
			{
				id: "chien_binh_ranh_roi",
				name: "Chiến binh rảnh rỗi (The Wanderer With Too Much Time)",
				display: "Chiến binh rảnh rỗi",
				description:
					"Không phải vì tò mò, mà là vì quá rảnh.\nHắn ta đã đi đến nơi tận cùng - để làm gì chứ?",
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
					text: "Easter egg của bà là...",
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
					text: "🏆 Mở khoá thành tựu: Chiến binh rảnh rỗi.\nChúc mừng bà nha :))) Hiện đã mở khoá: {easter_egg_count}/{easter_egg_total} easter eggs",
				},
			],
		},
	},
};