const setstate = require("./setstate").setstate;
let step = 0;
let device2Switch = "";
let returnIDToListenTo;
let splittedData = [];
/**
 *
 * @param {*} _this
 * @param {string} text
 * @param {*} groupData
 * @param {string} userToSend
 * @returns
 */
function subMenu(_this, text, groupData, userToSend) {
	const splittetText = JSON.stringify(text).split(":");
	const callbackData = splittetText[1];
	_this.log.debug("splittet text2 " + JSON.stringify(splittetText[2]));
	_this.log.debug("callback: 	" + JSON.stringify(callbackData));
	_this.log.debug("callback: 	" + JSON.stringify(callbackData == "first"));
	_this.log.debug("devicetoswitch: 	" + JSON.stringify(device2Switch));
	_this.log.debug("text: 	" + JSON.stringify(text));

	if (callbackData.includes("switch")) {
		splittedData = callbackData.split("-");
		device2Switch = splittetText[2];
		const keyboard = {
			inline_keyboard: [
				[
					{
						text: splittedData[1].split(".")[0],
						callback_data: "menu:first",
					},
					{
						text: splittedData[2].split(".")[0],
						callback_data: "menu:second",
					},
				],
			],
		};
		return ["Wähle eine Option", JSON.stringify(keyboard), device2Switch];
	} else if (callbackData.includes("first")) {
		let val;
		splittedData[1].split(".")[1] == "true" ? (val = true) : (val = splittedData[1].split(".")[1]);
		_this.log.debug("val " + JSON.stringify(val));
		returnIDToListenTo = setstate(_this, groupData[device2Switch], userToSend, val, true);
		return [null, null, null, returnIDToListenTo];
	} else if (callbackData.includes("second")) {
		let val;
		splittedData[2].split(".")[1] == "true" ? (val = true) : (val = splittedData[2].split(".")[1]);
		returnIDToListenTo = setstate(_this, groupData[device2Switch], userToSend, val, true);
		return [null, null, null, returnIDToListenTo];
	}

	//SECTION - Percent
	else if (!text.includes("submenu") && callbackData.includes("percent")) {
		step = parseInt(callbackData.replace("percent", ""));
		let rowEntrys = 0;
		let menu = [];
		const keyboard = {
			inline_keyboard: [],
		};
		for (let i = 100; i >= 0; i -= step) {
			menu.push({
				text: `${i}%`,
				callback_data: `submenu:percent${step}:${i}:`,
			});
			if (i != 0 && i - step < 0)
				menu.push({
					text: `0%`,
					callback_data: `submenu:percent${step}:${0}:`,
				});
			rowEntrys++;
			if (rowEntrys == 8) {
				// @ts-ignore
				keyboard.inline_keyboard.push(menu);
				menu = [];
				rowEntrys = 0;
			}
		}
		// @ts-ignore
		if (rowEntrys != 0) keyboard.inline_keyboard.push(menu);

		device2Switch = splittetText[2];
		return ["Welcher Wert soll gesetzt werden?", JSON.stringify(keyboard), device2Switch];
	} else if (text.includes(`submenu:percent${step}`)) {
		const value = parseInt(text.split(":")[2]);
		returnIDToListenTo = setstate(_this, groupData[device2Switch], userToSend, value, true);
		return [null, null, null, returnIDToListenTo];
		//SECTION - Number
	} else if (!text.includes("submenu") && callbackData.includes("number")) {
		const splittedData = callbackData.replace("number", "").split("-");
		let rowEntrys = 0;
		let menu = [];
		const keyboard = {
			inline_keyboard: [],
		};
		let unit = "";
		if (splittedData[3] != "") unit = splittedData[3];
		let start = 0,
			end = 0;

		if (parseInt(splittedData[0]) < parseInt(splittedData[1])) {
			start = parseInt(splittedData[1]);
			end = parseInt(splittedData[0]);
		} else {
			start = parseInt(splittedData[0]);
			end = parseInt(splittedData[1]);
		}
		let index = -1;
		for (let i = start; i >= end; i -= parseInt(splittedData[2])) {
			// Zahlen umdrehen
			if (parseInt(splittedData[0]) < parseInt(splittedData[1])) {
				if (i === start) index = end - 1;
				index++;
			} else index = i;

			menu.push({
				text: `${index}${unit}`,
				callback_data: `submenu:${callbackData}:${index}:`,
			});
			// _this.log.debug("menu " + JSON.stringify(menu));
			// _this.log.debug("keyboard " + JSON.stringify(keyboard.inline_keyboard));
			rowEntrys++;
			if (rowEntrys == 8) {
				// @ts-ignore
				keyboard.inline_keyboard.push(menu);
				menu = [];
				rowEntrys = 0;
			}
		}
		// @ts-ignore
		if (rowEntrys != 0) keyboard.inline_keyboard.push(menu);
		device2Switch = splittetText[2];
		return ["Welcher Wert soll gesetzt werden?", JSON.stringify(keyboard), device2Switch];
	} else if (text.includes(`submenu:${callbackData}`)) {
		const value = parseInt(text.split(":")[2]);
		returnIDToListenTo = setstate(_this, groupData[device2Switch], userToSend, value, true);
		return [null, null, null, returnIDToListenTo];
	}
}
module.exports = {
	subMenu: subMenu,
};