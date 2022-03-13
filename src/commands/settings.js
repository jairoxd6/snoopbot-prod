const fs = require("fs");
const configs = require("../../configs");

const isBool = val => {
    return val === "true" || val === "false" || val === false || val === true;
};

const stringToBoolean = val => {
    return val === "true";
}

const saveSettings = (settings) => {
    fs.writeFileSync(configs.APP_SETTINGS_LIST_FILE, JSON.stringify(settings, undefined, 4), {encoding: "utf8"});
}

const settings = async (matches, event, api, extras) => {
    const settingsList = JSON.parse(fs.readFileSync(configs.APP_SETTINGS_LIST_FILE, {encoding: "utf8"}));
    const settings = settingsList.threads[event.threadID] || settingsList.defaultSettings;
    const userSetting = matches[1];
    const option = matches[2];

    if(userSetting in settings) {
        if(isBool(settings[userSetting]) && !isBool(option)) {
            api.sendMessage(`❌Invalid option for '${userSetting}', option should be of type boolean (true or false)!`, event.threadID, event.messageID);
            return;
        } else if(isBool(settings[userSetting]) && isBool(option)) {
            if(settingsList.threads[event.threadID] === undefined)
                settingsList.threads[event.threadID] = settings;

            settingsList.threads[event.threadID][userSetting] = stringToBoolean(option);
            saveSettings(settingsList);
        } else {
            if(settingsList.threads[event.threadID] === undefined)
                settingsList.threads[event.threadID] = settings;

            settingsList.threads[event.threadID][userSetting] = stringToBoolean(option);
            saveSettings(settingsList);
        }

        api.sendMessage(`✔SnoopBot's setting for:\n\n'${userSetting}'\n\nhas been set to:\n\n'${option}.'`, event.threadID, event.messageID);

        return;
    }

    api.sendMessage(`❌Unknown setting: '${userSetting}'.\n\nType '${settings.prefix}settings list' to see the list of available settings.`, event.threadID, event.messageID);
};


const list = async (matches, event, api, extras) => {
    console.log(matches);
};

module.exports = {settings, list};