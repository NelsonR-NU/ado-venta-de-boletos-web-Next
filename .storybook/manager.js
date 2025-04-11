import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming/create";
import adoTheme from "./theme";

addons.setConfig({
  theme: adoTheme,
  ...themes.light,
});
