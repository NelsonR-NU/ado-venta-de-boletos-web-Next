import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { withNextIntl, withTailwind } from "./decorators";
import { themes } from "@storybook/theming/create";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.light,
    },
    options: {
      storySort: {
        order: ["UI Components", "Components", "Layouts", "Pages", "Features"],
      },
    },
    locale: "es",
    locales: {
      es: "Español",
      en: "English",
    },
  },
  globalTypes: {
    locale: {
      name: "Idioma",
      description: "Internacionalización del sistema",
      defaultValue: "es",
      toolbar: {
        icon: "globe",
        items: [
          { value: "es", title: "Español" },
          { value: "en", title: "English" },
        ],
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withNextIntl, withTailwind],
};

export default preview;
