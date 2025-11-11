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
          value: "#080808", /* --semantic-background-base */
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
        appBg: "#080808", /* --semantic-background-base */
        appContentBg: "#080808", /* --semantic-background-base */
        textColor: "#e5e5e5", /* --semantic-text-primary */
        textInverseColor: "#080808", /* --semantic-text-inverse */
        barTextColor: "#e5e5e5", /* --semantic-text-primary */
        barSelectedColor: "#e0dd5b", /* --semantic-brand-base */
        barBg: "#8a8a8a", /* --semantic-background-raised */
        inputBg: "#5a5a5a", /* --semantic-background-interactive */
        inputBorder: "#2d2d2d", /* --semantic-border-subtle */
        inputTextColor: "#e5e5e5", /* --semantic-text-primary */
        textMutedColor: "#838383", /* --semantic-text-secondary */
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
