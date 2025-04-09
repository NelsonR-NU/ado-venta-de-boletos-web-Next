import { addons } from "@storybook/manager-api";
import adoTheme from "./theme";
import { themes } from "@storybook/theming/create";

addons.setConfig({
  theme: adoTheme,
  ...themes.light,
});
