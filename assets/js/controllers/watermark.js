const images = document.querySelectorAll(".watermark img");
const watermark = document.querySelector(".watermark");
const hoverArea = document.getElementById("watermark-hover-area");

let index = 0;
let cycleCount = 0;
let maxCycles = 1;
let interval = null;

function rotateWatermark() {
	images.forEach((img, i) => {
		img.classList.toggle("active", i === index);
	});
	index = (index + 1) % images.length;

	if (index === 0) {
		cycleCount++;
		if (cycleCount >= maxCycles) {
			stopWatermark();
		}
	}
}

function startWatermark() {
	if (interval) return; // tránh gọi lại nếu đã chạy

	watermark.style.display = "block";
	index = 0;
	cycleCount = 0;
	rotateWatermark();
	interval = setInterval(rotateWatermark, 5500);
}

function stopWatermark() {
	clearInterval(interval);
	interval = null;
	images.forEach((img, i) => {
		img.classList.toggle("active", i === images.length - 1);
	});

	setTimeout(() => {
		watermark.style.display = "none";
	}, 10000);
}
// Khi hover vào vùng góc dưới, watermark hiện lại
hoverArea.addEventListener("mouseenter", () => {
	startWatermark();
});
