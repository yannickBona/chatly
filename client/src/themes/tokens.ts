export enum colorsEnum {
  transparent = "transparent",
  black = "black",
  white = "white",
  background = "background",
  borderColor = "borderColor",
  borderColorDark = "borderColorDark",
  inputColor = "inputColor",
  neutral = "neutral",
  // lightAccent = 'lightAccent',
  // accent = 'accent',
  // neutral0 = 'neutral0',
  // neutral1 = 'neutral1',
  // neutral2 = 'neutral2',
  // neutral3 = 'neutral3',
  // neutral4 = 'neutral4',
  // neutral5 = 'neutral5',
  // neutral6 = 'neutral6',
  // info = 'info',
  // error = 'error',
  // warning = 'warning',
  // success = 'success',
}
export const colors: { [key in colorsEnum]: string } = {
  black: "#222222",
  transparent: "transparent",
  white: "#fff",
  background: "#f7f7f9",
  inputColor: "#f7f7f9",
  neutral: "#6e6969",
  borderColor: "#cccdcd",
  borderColorDark: "#b9b9b9",
};

enum shadowsEnum {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}
export const shadows: { [key in shadowsEnum]: string } = {
  sm: "0 1px 3px -2px rgba(18, 20, 20, 0.18), 0 2px 3px 0 rgba(18, 20, 20, 0.09)",
  md: "0 6px 6px -2px rgba(18, 20, 20, 0.12), 0 10px 20px 0 rgba(18, 20, 20, 0.04)",
  lg: "0 10px 10px -4px rgba(18, 20, 20, 0.12), 0 14px 28px 0 rgba(18, 20, 20, 0.12)",
  xl: "0 15px 12px -6px rgba(57, 62, 70, 0.08), 0 19px 38px 0 rgba(57, 62, 70, 0.12)",
};

enum breakpointsEnum {
  mobile = "mobile",
}
export const breakpoints: { [key in breakpointsEnum]: string } = {
  mobile: "850px",
};
