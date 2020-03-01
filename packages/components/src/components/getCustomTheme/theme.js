"use strict";
exports.__esModule = true;
var hd = 1; // 基本单位
exports.globaSetting = {
    "brand-primary": "#00AF86"
};
exports.customTheme = function (brandPrimary) {
    var brandPrimaryTap = "#289289";
    return {
        "primary-color-bg": "#253546",
        "primary-color": brandPrimary,
        "link-color": brandPrimary,
        "brand-primary-tap": brandPrimaryTap,
        "brand-height": 10 * hd
    };
};
