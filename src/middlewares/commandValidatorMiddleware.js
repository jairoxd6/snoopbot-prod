const configs = require("../../configs");
const fs = require("fs");

module.exports = (next) => {
	return async (matches, event, api, extra) => {
		let sentPrefix = event.body.substring(0, 1);
		const settingsList = JSON.parse(fs.readFileSync(configs.APP_SETTINGS_LIST_FILE, {encoding: "utf8"}));
		const settings = settingsList.threads[event.threadID] || settingsList.defaultSettings;
		const prefix = settings.prefix;
		
		console.log(settings);

		if(sentPrefix !== prefix)
		    return;
		
		if(matches.length === 0)
		    return;
		
		await next(matches, event, api, extra);
	};
};