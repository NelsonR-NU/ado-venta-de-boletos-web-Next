import { create } from "@storybook/theming/create";

export default create({
  base: "light",
  brandTitle: "ADO - Storybook",
  brandUrl: process.env.ADO_STORYBOOK_URL,
  brandImage: "https://www.ado.com.mx/images/ado.svg",
  brandTarget: "_self",
  colorPrimary: "#E11F2A",
  colorSecondary: "#622366",

  // UI
  appBg: "#222425",
  appContentBg: "##454647FF",
  appBorderColor: "#3f4243",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#fff",
  textInverseColor: "#1D1F24",

  // Toolbar default and active colors
  barTextColor: "#73828c",
  barSelectedColor: "#E11F2A",
  barBg: "#222425",

  // Form colors
  inputBg: "#F4F6F9",
  inputBorder: "#622366",
  inputTextColor: "#1F2937",
  inputBorderRadius: 4,
});
