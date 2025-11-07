import type { Preview } from "@storybook/react";
import { themes } from "storybook/theming";
import "../src/styles/tokens.css";
import "../src/styles/tokens-semantic.css";
import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "arkem",
      values: [
        {
          name: "arkem",
          value: "var(--semantic-background-base)",
        },
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#121212",
        },
      ],
    },
    layout: "centered",
    docs: {
      theme: {
        ...themes.dark,
        appBg: "var(--semantic-background-base)",
        appContentBg: "var(--semantic-background-base)",
        textColor: "var(--semantic-text-primary)",
        textInverseColor: "var(--semantic-text-inverse)",
        barTextColor: "var(--semantic-text-primary)",
        barSelectedColor: "var(--semantic-brand-base)",
        barBg: "var(--semantic-background-raised)",
        inputBg: "var(--semantic-background-interactive)",
        inputBorder: "var(--semantic-border-subtle)",
        inputTextColor: "var(--semantic-text-primary)",
        textMutedColor: "var(--semantic-text-secondary)",
        fontBase: "var(--font-family-base)",
        fontCode: "monospace",
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
