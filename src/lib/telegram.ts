import { debug, error } from "./logging";
import { newLine, getChatID, checkStatusInfo } from "./utilities";
import TelegramMenu from "../main";

async function sendToTelegram(
	user = "",
	textToSend: string,
	keyboard: NavPart = [],
	instance = "telegram.0",
	resize_keyboard = true,
	one_time_keyboard = true,
	userListWithChatID: UserListWithChatId[],
	parse_mode: BooleanString | "",
): Promise<void> {
	try {
		const _this = TelegramMenu.getInstance();
		const chatId = getChatID(userListWithChatID, user);
		const parse_modeType: ParseModeType = getParseMode(parse_mode);
		debug([
			{ text: `Send to: ${user} => ${textToSend}` },
			{ text: "Instance:", val: instance },
			{ text: "UserListWithChatID	:", val: userListWithChatID },
			{ text: "Parse_mode	:", val: parse_mode },
			{ text: "ChatId	:", val: chatId },
			{ text: "ParseModeType:", val: parse_modeType },
		]);

		textToSend = newLine(textToSend);
		if (keyboard.length == 0) {
			_this.sendTo(
				instance,
				"send",
				{
					text: textToSend,
					chatId: chatId,
					parse_mode: parse_modeType,
				},
				function (res: any) {
					_this.log.debug("Sent Value to " + JSON.stringify(res) + " users!");
				},
			);
		} else {
			const text = await checkStatusInfo(textToSend);
			_this.sendTo(
				instance,
				"send",
				{
					chatId: chatId,
					parse_mode: parse_modeType,
					text: text,
					reply_markup: {
						keyboard: keyboard,
						resize_keyboard: resize_keyboard,
						one_time_keyboard: one_time_keyboard,
					},
				},
				function (res: any) {
					debug([{ text: `Sent Value to ${res} users!` }]);
				},
			);
		}
	} catch (e: any) {
		error([
			{ text: "Error sendToTelegram:", val: e.message },
			{ text: "Stack:", val: e.stack },
		]);
	}
}

function sendToTelegramSubmenu(
	user: string,
	textToSend: string,
	keyboard: string,
	instance = "telegram.0",
	userListWithChatID: UserListWithChatId[],
	parse_mode: BooleanString,
): void {
	const _this = TelegramMenu.getInstance();
	const parseModeType = getParseMode(parse_mode);
	debug([{ text: "Send this ParseMode:", val: parseModeType }]);
	try {
		const chatId = getChatID(userListWithChatID, user);
		textToSend = newLine(textToSend);
		_this.sendTo(instance, "send", {
			chatId: chatId,
			parse_mode: parseModeType,
			text: textToSend,
			reply_markup: keyboard,
		});
	} catch (e: any) {
		error([
			{ text: "Error sendToTelegramSubmenu:", val: e.message },
			{ text: "Stack:", val: e.stack },
		]);
	}
}

const sendLocationToTelegram = async (user: string, data: any, instance: string, userListWithChatID: UserListWithChatId[]): Promise<void> => {
	const _this = TelegramMenu.getInstance();
	try {
		const chatId = getChatID(userListWithChatID, user);
		for (const element of data) {
			if (!(element.latitude || element.longitude)) {
				continue;
			}

			const latitude = await _this.getForeignStateAsync(element.latitude);
			const longitude = await _this.getForeignStateAsync(element.longitude);
			if (!latitude || !longitude) {
				continue;
			}
			_this.sendTo(instance, {
				chatId: chatId,
				latitude: latitude.val,
				longitude: longitude.val,
				disable_notification: true,
			});
		}
	} catch (e: any) {
		error([
			{ text: "Error sendLocationToTelegram:", val: e.message },
			{ text: "Stack:", val: e.stack },
		]);
	}
};

function getParseMode(val: BooleanString | boolean | ""): ParseModeType {
	if (val === "true" || val === true) {
		return "HTML";
	}
	return "Markdown";
}

export { sendToTelegram, sendToTelegramSubmenu, sendLocationToTelegram };