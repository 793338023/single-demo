"use strict";
exports.__esModule = true;
var theme_1 = require("./theme");
var getCustomTheme = function (theme) {
    if (theme === void 0) { theme = null; }
    if (theme != null && typeof theme !== "object") {
        throw new Error("[getCustomTheme()]:arguments type error");
    }
    var brandPrimary = theme && theme["brand-primary"]
        ? theme["brand-primary"]
        : theme_1.globaSetting["brand-primary"];
    return Object.assign({}, theme_1.customTheme(brandPrimary), theme);
};
exports["default"] = getCustomTheme;
