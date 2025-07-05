let isLoading = false;
let allLoaded = false;
const messagesPerPage = 5;
const messagesContainer = document.getElementById("tab-messages");

function showEndNote() {
	const doneNote = document.createElement("p");
	doneNote.className = "text-center text-xs text-[#a78f6c] italic mt-2";
	doneNote.innerText = "— Đã hết lời nhắn —";
	messagesContainer.appendChild(doneNote);
}


function showLoadingNote() {
    const doneNote = document.createElement("p");
	doneNote.setAttribute("loading-note", "true");
    doneNote.className =
		"loading-note animate-blink text-center text-xs text-[#e2b714] font-medium italic mt-2 opacity-0 translate-y-2 transition-all duration-500";

	doneNote.innerText = "— Đang tải lời nhắn mới —";

	messagesContainer.appendChild(doneNote);

	// Kích hoạt animation sau 1 tick
	requestAnimationFrame(() => {
		doneNote.classList.add("opacity-100");
	});

	// Scroll xuống cuối
	messagesContainer.scrollTo({
		top: messagesContainer.scrollHeight,
		behavior: "smooth",
	});
}

function showErrorNote() {
	const doneNote = document.createElement("p");
	doneNote.className =
		"loading-note animate-blink text-center text-xs text-red-600 font-medium italic mt-2 opacity-0 translate-y-2 transition-all duration-500";

	doneNote.innerText = "— Mạng lỗi bất định —";

	messagesContainer.appendChild(doneNote);

	// Kích hoạt animation sau 1 tick
	requestAnimationFrame(() => {
		doneNote.classList.add("opacity-100");
	});

	// Scroll xuống cuối
	messagesContainer.scrollTo({
		top: messagesContainer.scrollHeight,
		behavior: "smooth",
	});
}

function removeLoadingNote(el) {
    el.querySelectorAll("[loading-note]").forEach((el) => el.remove())
}


async function loadMessagesPage() {
	if (isLoading || allLoaded) return;

	isLoading = true;
    showLoadingNote();
	const currentPage =
		parseInt(messagesContainer.getAttribute("currentpage")) || 0;

	try {
		const res = await fetch(
			`https://api-lite-main001.dtbao.io.vn/unk-endpoint.php?page=${
				currentPage + 1
			}&limit=${messagesPerPage}`
		);
		const data = await res.json();

		if (!data.messages || data.messages.length === 0) {
            allLoaded = true;
            if (!currentPage) {
                renderVisitorEntry(
					"Jasper Kennex",
					new Date().toLocaleDateString("vi-VN"),
					"Có vẻ chưa có ai để lại tên, sao bạn không thử tại tab ghi danh nhỉ?"
				);
            }
            removeLoadingNote(messagesContainer);
			showEndNote();
			return;
		}

		data.messages.forEach(({ name, date, message }) => {
			renderVisitorEntry(name, date, message);
		});

		messagesContainer.setAttribute("currentpage", currentPage + 1);

		if (!data.hasMore || data.messages.length < messagesPerPage) {
			allLoaded = true;
			showEndNote();
		}
	} catch (err) {
		console.error("Lỗi khi load lời nhắn:", err);
        allLoaded = true;
        showErrorNote();
	} finally {
		isLoading = false;
        removeLoadingNote(messagesContainer);
	}
}

function renderVisitorEntry(name, date, message) {
	const displayMessage = message?.trim() || "Đã ghé thăm portfolio này.";
	const safeName = name?.trim() || "Khách ẩn danh";
	const safeDate = date || new Date().toLocaleDateString("vi-VN");

	const html = `
		<div class="visitor-entry p-4 rounded border border-[#b28b67] bg-[#fff8e7] shadow-sm">
			<div class="flex justify-between items-center mb-1">
				<p class="font-semibold text-[#4a2f1c] text-lg truncate max-w-[70%]">${escapeHTML(
					safeName
				)}</p>
				<span class="text-sm text-[#9c7d57]">🗓️ ${escapeHTML(safeDate)}</span>
			</div>
			<p class="italic text-[#5e3d24] text-base whitespace-pre-line">${escapeHTML(
				displayMessage
			)}</p>
		</div>
	`;

	document
		.querySelector("[list-visitors]")
		.insertAdjacentHTML("beforeend", html);
}

function visitorSubmition() {
	const btn = document.getElementById("btn-submitmsg");
	const text = document.getElementById("submitmsg-text");
	const icon = document.getElementById("submitmsg-icon");

	const inputName = document.getElementById("frm-input-name");
	const inputMsg = document.getElementById("frm-input-message");

	const guestId = __logger.uuid;

	btn.addEventListener("click", async () => {
		const name = inputName.value.trim();
		const message = inputMsg.value.trim();

		// 🧪 Kiểm tra dữ liệu
		if (!name) return showError("Vui lòng nhập tên");
		if (name.length > 25) return showError("Tên không quá 25 ký tự");
		if (message.length > 255)
			return showError("Lời nhắn quá dài (tối đa 255 ký tự)");

		// 🟡 Trạng thái: đang gửi
		btn.disabled = true;
		text.textContent = "Đang ghi danh...";
		icon.innerHTML = `<span class="animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-[#7b4b25] rounded-full"></span>`;

		try {
			const res = await fetch(
				"https://api-lite-main001.dtbao.io.vn/unk-endpoint.php",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name,
						message,
						guest_id: guestId,
					}),
				}
			);

			const data = await res.json();

			if (data.success) {
				text.textContent = "Đã ghi danh - ";
				icon.textContent = "📜";

				// Reset sau 2.5s
				setTimeout(() => {
					btn.disabled = false;
					text.textContent = "Ghi danh";
					icon.textContent = "✍️";
					inputName.value = "";
					inputMsg.value = "";
				}, 2500);
			} else {
				showError(data.error || "Gửi thất bại!");
			}
		} catch (err) {
			showError("Lỗi kết nối: " + err.message);
		}
	});

	function showError(msg) {
		text.textContent = msg;
		icon.textContent = "⚠️";

		setTimeout(() => {
			btn.disabled = false;
			text.textContent = "Ghi danh";
			icon.textContent = "✍️";
		}, 2500);
	}
}

function visitorHandler() {
	const btnTabs = document.querySelectorAll(".tab-btn");
	btnTabs.forEach((btn) => {
		btn.addEventListener("click", () => {
			const tab = btn.getAttribute("data-tab");
			document
				.getElementById("tab-messages")
				.classList.toggle("hidden", tab !== "messages");
			document
				.getElementById("tab-form")
				.classList.toggle("hidden", tab !== "form");

			btnTabs.forEach((btn) => {
				if (btn.getAttribute("data-tab") == tab) {
					btn.classList =
						"tab-btn px-4 py-2 rounded border border-[#7b4b25] bg-[#f5e0b7] hover:bg-[#ecd3a0] text-[#4a2f1c] font-semibold transition w-full";
				} else {
					btn.classList =
						"tab-btn px-4 py-2 rounded border border-[#7b4b25] bg-[#fff8e7] hover:bg-[#fceccc] text-[#4a2f1c] font-semibold transition w-full";
				}
			});
		});
	});

    let debounceTimer = null;

	messagesContainer.addEventListener("scroll", () => {
		if (debounceTimer) clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			const { scrollTop, scrollHeight, clientHeight } = messagesContainer;

			if (scrollTop + clientHeight >= scrollHeight - 100) {
				loadMessagesPage();
			}
		}, 200);
	});
}
