const fontSize = {
  title: "4.5rem",
  subTitle: "3.5rem",
  heading: "3rem",
  subHeading: "2.5rem",
  text: "2rem",
  subText: "1.5rem",
  description: "1rem",
  subDescription: "0.75rem",
};

const color = {
  green: "#5BC179",
  black: "#555",
  white: "#fefefe",
  darkGrey: "#666",
  grey: "#aaa",
  lightGrey: "#ccc",
  temperature: "#ef7777",
  humidity: "#7791ef",
  error: "#bf4646",
};

const common = {
  esd: 'font-family: "ESD";',
  gb: 'font-family: "GB";',
  nbg: 'font-family: "NBG";',
  ellipsis: "text-overflow: ellipsis; white-space: nowrap; overflow: hidden;",
  hoverEffect:
    "cursor: pointer; :hover { filter: brightness(125%) drop-shadow(0 0 0.5rem rgba(255, 255, 255, 0.5)); }",
  hoverEffectRed:
    "cursor: pointer; :hover { filter: grayscale(0) drop-shadow(0 0 0.5rem #ff0000); }",
};

const theme = {
  fontSize,
  color,
  common,
};

export default theme;
