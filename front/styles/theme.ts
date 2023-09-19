import { DefaultTheme } from "styled-components";

// TODO: 여기
const color = {
  // text color
  black1: "#303030",

  // main color
} as const;

// TODO: 여기
const fontSize = {
  heading1: "36px",
} as const;

// 나중에 값 조정 예정
const letterSpacing = {
  narrow: "-1.4px",
  spread: "0.4px",
} as const;

const shadow = {
  shadow1: "0px 12px 30px rgba(0, 0, 0, 0.16)",
} as const;

// TODO: 여기 !
const gradient = {
  // figma developer mode
};

const theme: DefaultTheme = {
  color,
  fontSize,
  letterSpacing,
  shadow,
  gradient,
};

export default theme;
