// import { addons } from '@storybook/manager-api';
// import { themes } from '@storybook/theming';

// addons.setConfig({
//   theme: {
//     ...themes.dark,
//     brandTitle: 'ARKEM Design System',
//     brandUrl: '#',
//     brandImage: undefined,
//     brandTarget: '_self',
//     appBg: '#080808',
//     appContentBg: '#080808',
//     appPreviewBg: '#080808',
//     appBorderColor: '#2d2d2d',
//     appBorderRadius: 8,
//     textColor: '#e5e5e5',
//     textInverseColor: '#080808',
//     barTextColor: '#e5e5e5',
//     barSelectedColor: '#e0dd5b',
//     barBg: '#121212',
//     inputBg: '#212121',
//     inputBorder: '#3a3a3a',
//     inputTextColor: '#e5e5e5',
//     textMutedColor: '#838383',
//   },
// });

import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";
addons.setConfig({
  theme: create({
    base: "dark",
    fontBase: "var(--font-family-base)",
    fontCode: "var(--typography-mode-1-font-family-ibm-plex-sans)",
  }),
});
