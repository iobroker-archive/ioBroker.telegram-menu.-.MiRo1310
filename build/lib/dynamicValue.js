"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var dynamicValue_exports = {};
__export(dynamicValue_exports, {
  getDynamicValue: () => getDynamicValue,
  removeUserFromDynamicValue: () => removeUserFromDynamicValue,
  setDynamicValue: () => setDynamicValue
});
module.exports = __toCommonJS(dynamicValue_exports);
var import_utilities = require("./utilities");
var import_telegram = require("./telegram");
const setDynamicValueObj = {};
const setDynamicValue = async (returnText, ack, id, userToSend, telegramInstance, one_time_keyboard, resize_keyboard, userListWithChatID, parse_mode, confirm) => {
  const { substring } = (0, import_utilities.decomposeText)(returnText, "{setDynamicValue:", "}");
  let array = substring.split(":");
  array = isBraceDeleteEntry(array);
  const text = array[1];
  if (text) {
    await (0, import_telegram.sendToTelegram)({
      user: userToSend,
      textToSend: text,
      keyboard: void 0,
      instance: telegramInstance,
      resize_keyboard,
      one_time_keyboard,
      userListWithChatID,
      parse_mode
    });
  }
  setDynamicValueObj[userToSend] = {
    id,
    ack,
    returnText: text,
    userToSend,
    parse_mode,
    confirm,
    telegramInstance,
    one_time_keyboard,
    resize_keyboard,
    userListWithChatID,
    valueType: array[2]
  };
  if (array[3] && array[3] != "") {
    return { confirmText: array[3], id: array[4] };
  }
  return { confirmText: "", id: void 0 };
};
const getDynamicValue = (userToSend) => {
  if (setDynamicValueObj[userToSend]) {
    return setDynamicValueObj[userToSend];
  }
  return null;
};
const removeUserFromDynamicValue = (userToSend) => {
  if (setDynamicValueObj[userToSend]) {
    delete setDynamicValueObj[userToSend];
    return true;
  }
  return false;
};
function isBraceDeleteEntry(array) {
  if (array[4] === "}") {
    return array.slice(0, 4);
  }
  return array;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDynamicValue,
  removeUserFromDynamicValue,
  setDynamicValue
});
//# sourceMappingURL=dynamicValue.js.map
