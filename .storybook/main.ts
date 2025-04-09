import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import type { Configuration, RuleSetRule } from "webpack";

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../src/assets"],
  webpackFinal: async (storybookConfig: Configuration) => {
    if (storybookConfig.resolve) {
      storybookConfig.resolve.alias = {
        ...storybookConfig.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
        "@/storybook": path.resolve(__dirname, "./.storybook"),
      };
    }

    if (storybookConfig.module?.rules) {
      // Find and remove the default SVG rule
      const fileLoaderRule = storybookConfig.module.rules.find(
        (rule) =>
          rule && typeof rule !== "string" && rule.test instanceof RegExp && rule.test.test(".svg")
      ) as RuleSetRule | undefined;

      if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/;
      }

      // Add the new SVG rule
      storybookConfig.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            resourceQuery: /react/,
            use: ["@svgr/webpack"],
          },
          {
            type: "asset/resource",
          },
        ],
      });
    }

    return storybookConfig;
  },
} satisfies StorybookConfig;

export default config;
