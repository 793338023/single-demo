import { globaSetting as themeGlobalSetting, customTheme } from "./theme";
type IGetCustomTheme = (
  theme?: null | ({ "brand-primary": string } & object)
) => any;

const getCustomTheme: IGetCustomTheme = function(theme = null) {
  if (theme != null && typeof theme !== "object") {
    throw new Error("[getCustomTheme()]:arguments type error");
  }
  const brandPrimary =
    theme && theme["brand-primary"]
      ? theme["brand-primary"]
      : themeGlobalSetting["brand-primary"];
  return Object.assign({}, customTheme(brandPrimary), theme);
};

export default getCustomTheme;
