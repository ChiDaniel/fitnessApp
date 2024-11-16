import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#f0f0f0",
    background: "#333",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
  /*   green: {
    primary: "#0f0",
    lightGray: "#eee",
    gray: "#888",
  }, */
  gray: {
    primary: "#888",
    lightGray: "#eee",
    gray: "#888",
  },
  primary: "#0f0",
  lightGray: "#eee",
};
