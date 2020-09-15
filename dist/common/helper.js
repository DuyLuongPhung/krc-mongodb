"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullOrEmpty = exports.randomString = void 0;
function randomString(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.randomString = randomString;
function isNullOrEmpty(str) {
    return str == null || str.length === 0;
}
exports.isNullOrEmpty = isNullOrEmpty;
//# sourceMappingURL=helper.js.map