function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
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
	init: () => {
		const data = {};
		__missions.loadMission();
		data.visit_total = __logger.saveVisit();
		data.visit_last_time = __logger.saveRecentlyVisit();
		data.version = __logger.saveVersion();
		data.uuid = __logger.createUUID();
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
};