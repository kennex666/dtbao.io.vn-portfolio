function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var srcFrom = getParameterByName("s") ? getParameterByName("s") : "Mặc định";

var screenSize = "";
if (screen.width) {
	width = screen.width ? screen.width : "";
	height = screen.height ? screen.height : "";
	screenSize += "" + width + " x " + height;
}

if (document.referrer) srcFrom = srcFrom + " - " + document.referrer;

function makeid(length) {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

const __logger = {
	uuid: "not_available",
	versionWeb: "1.0.0",
	key_visit: "3d_visit_total",
	key_last_time: "3d_visit_last_time",
	key_version: "3d_last_version",
	key_user_id: "3d_user_id",
	key_message: "3d_send_message",
	disabled: true,
	data: {},
	init: () => {
		const data = {};
		__missions.loadMission();
		data.visit_total = __logger.saveVisit();
		data.visit_last_time = __logger.saveRecentlyVisit();
		data.version = __logger.saveVersion();
		data.uuid = __logger.createUUID();
		data.session = __logger.createSessionId();
		__logger.data = data;
		return data;
	},
	createUUID: () => {
		let data = window.localStorage.getItem(__logger.key_user_id);
		if (data) {
			__logger.uuid = data;
		} else {
			__logger.uuid = `${makeid(4)}-${makeid(4)}-${Math.round(
				new Date().getTime() / 1000
			)}`;
			window.localStorage.setItem(__logger.key_user_id, __logger.uuid);
		}
		return __logger.uuid;
	},
	saveVersion: () => {
		let data = window.localStorage.getItem(__logger.key_version) || 0;
		if (data) {
		}
		window.localStorage.setItem(__logger.key_version, __logger.versionWeb);
		return data;
	},
	saveVisit: () => {
		let data = window.localStorage.getItem(__logger.key_visit) || 0;
		data -= 0;
		++data;
		window.localStorage.setItem(__logger.key_visit, data);
		return data;
	},
	saveRecentlyVisit: () => {
		let data = window.localStorage.getItem(__logger.key_last_time) || 0;

		data = new Date().getTime();

		window.localStorage.setItem(__logger.key_last_time, data);
		return data;
	},
	createSessionId: () => {
		return crypto.randomUUID?.() || Math.random().toString(36).substring(2);
	},
	logToSheet: async ({
		type = "login",
		metadata = "",
		extraParams = {},
	} = {}) => {
		if (__logger.disabled) return;

		const ip = await __logger.getIP();
		const payload = {
			type,
			uuid: __logger.uuid,
			sid: __logger.data.session,
			ip,
			page: location.pathname,
			ref: srcFrom,
			ua: navigator.userAgent,
			metadata:
				typeof metadata === "object"
					? JSON.stringify(metadata)
					: metadata,
			...extraParams,
		};

		fetch("https://api-lite-main001.dtbao.io.vn/unk-endpoint-2.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		}).catch(console.error);
	},
	getInformationAPICF: async () => {
		try {
			let response = await fetch(
				"https://www.cloudflare.com/cdn-cgi/trace"
			);
			let responseText = await response.text();
			return responseText;
		} catch (e) {
			return "";
		}
	},
	getIP: async () => {
		if (__logger.data.ip && __logger.data.ip != "unk-ip") {
			return __logger.data.ip;
		}
		const logInfo = await __logger.getInformationAPICF();

		if (!logInfo || logInfo.length < 30) return "unk-ip";

		const line = logInfo.split("\n").find((line) => line.startsWith("ip="));

		const ipAddr = line ? line.slice(3).trim() : "unk-ip";
		__logger.data.ip = ipAddr;
		return ipAddr;
	},
};


class Err0r extends Error {
	toString() {}

	get message() {
		window.dispatchEvent(new Event("dev-tools-detected"));
	}
}

console.log(new Err0r());