const hd = 1; // 基本单位
export const globaSetting: { [k: string]: any } = {
  "brand-primary": "#00AF86"
};

export const customTheme = (brandPrimary: string) => {
  let brandPrimaryTap = "#289289";

  return {
    "primary-color-bg": "#253546",
    "primary-color": brandPrimary,
    "link-color": brandPrimary,
    "brand-primary-tap": brandPrimaryTap,
    "brand-height": 10 * hd
  };
};
