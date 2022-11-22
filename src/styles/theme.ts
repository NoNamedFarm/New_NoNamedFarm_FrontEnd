const fontSizes = {
  title: "4.5rem",
  subTitle: "3.5rem",
  heading: "3rem",
  subHeading: "2.5rem",
  text: "2rem",
  subText: "1.4rem",
  description: "1rem",
  subDescription: "0.75rem",
};

const colors = {
  greenGradient: "#3fc266",
  green: "#5bc179",
  black: "#565656",
  white: "#fefefe",
  grey1f: "#a7a7a7",
  grey2f: "#909090",
  grey3f: "#787579",
  temperature: "#ef7777",
  humidity: "#7791ef",
  error: "#bf4646",
  translucent: "rgba(0, 0, 0, 0.25)",
};

const common = {
  esd: 'font-family: "ESD";',
  gb: 'font-family: "GB";',
  nbg: 'font-family: "NBG";',
  boxShadow:
    "border-radius: 1.5rem; box-shadow: 0 0 0.5rem #909090; border: none;",
  ellipsis: "text-overflow: ellipsis; white-space: nowrap; overflow: hidden;",
  hoverEffect:
    "transition: filter 0.25s ease; cursor: pointer; :hover { filter: brightness(125%) drop-shadow(0 0 0.5rem rgba(255, 255, 255, 0.5)); }",
  hoverEffectRed:
    "transition: filter 0.25s ease; cursor: pointer; :hover { filter: grayscale(0) drop-shadow(0 0 0.5rem #ff0000); }",
};

const theme = {
  fontSizes,
  colors,
  common,
};

export default theme;
