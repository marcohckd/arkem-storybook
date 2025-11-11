// src/components/Button/Button.mode.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import * as LucideIcons from "lucide-react";

import { Button } from "./Button";

const iconOptions = Object.keys(LucideIcons)
  .filter((key) => {
    const value = LucideIcons[key as keyof typeof LucideIcons];
    return typeof value === "function" && key[0] === key[0].toUpperCase();
  })
  .sort();

const meta: Meta<typeof Button> = {
  title: "Atoms/Button/Mode",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Mode buttons are specialized buttons for interface mode selection, featuring a distinct visual style with black tone only.

## Hierarchy

- **Mode**: Supports sm, md, and lg sizes with consistent black tone
- **Typography**: Varies by size (sm: 12px, md: 14px, lg: 14px)
- **Tone**: Fixed to \`black\` (cannot be overridden)
- **Ideal for**: Mode switchers, theme toggles, view mode selectors

## Features

- Three size variants: \`sm\`, \`md\`, \`lg\`
- Black tone only (enforced by hierarchy)
- Full state support: default, hover, focused, disabled
- Icon support: leading, trailing, or icon-only
- Distinct visual style with subtle borders
- Accessible with ARIA labels

## Usage

Mode buttons are perfect for:
- View mode toggles (grid/list)
- Theme switchers
- Display mode selectors
- Interface preference controls

\\\`\\\`\\\`tsx
<Button hierarchy="mode" size="md" tone="black">
  Grid View
</Button>

<Button hierarchy="mode" size="sm" tone="black" iconTrailing={true} trailingIconName="Grid">
  Grid
</Button>
\\\`\\\`\\\`

**Note**: The \`tone\` prop is automatically set to \`black\` for mode hierarchy and cannot be overridden.

## Token Hierarchy

Tokens follow a three-tier hierarchy:

**Semantic Tokens (Usage level)** - \`var(--semantic-*)\`
- Describe the purpose: \`--semantic-text-primary\`, \`--semantic-background-base\`
- Should always be used in components

**Primitive Tokens (System level)** - \`var(--color-*)\`, \`var(--spacing-*)\`
- Define the actual values: \`--color-neutral-100\`, \`--spacing-4\`
- Referenced by semantic tokens

**Raw Values (Reference only)**
- Actual CSS values: \`#FFFFFF\`, \`16px\`, \`rgba(224, 13, 91, 0.29)\`
- Never used directly in components

## Typography & Colors

- **Font**: \`var(--font-family-base)\` -> \`var(--typography-mode-1-font-family-ibm-plex-sans)\` -> IBM Plex Sans
- **Font Size**: 
  - \`sm\`: \`var(--fonts-semantic-sm)\` -> \`var(--typography-mode-1-font-size-12)\` -> 12px
  - \`md\`: \`var(--fonts-semantic-md)\` -> \`var(--typography-mode-1-font-size-16)\` -> 16px
  - \`lg\`: \`var(--fonts-semantic-md)\` -> \`var(--typography-mode-1-font-size-16)\` -> 16px
- **Font Weight**: \`var(--font-weight-medium)\` -> \`var(--typography-mode-1-font-weight-medium)\` -> 500
- **Text Color**: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
- **Background**: \`var(--semantic-background-interactive)\` -> #5A5A5A
- **Border**: \`var(--semantic-border-subtle)\` -> #2D2D2D
- **Focus Ring**: \`var(--semantic-focus-ring)\` -> #E0DD5B59 (rgba(224, 221, 91, 0.35))

## Accessibility

- Full keyboard navigation support
- Focus ring visible on keyboard focus
- ARIA labels supported via \`ariaLabel\` prop
- Disabled state properly announced to screen readers

## Design Tokens

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value |
|----------|---------------|-----------------|--------|
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | IBM Plex Sans |
| Font Size (sm) | \`--fonts-semantic-sm\` | \`--typography-mode-1-font-size-12\` | 12px |
| Font Size (md/lg) | \`--fonts-semantic-md\` | \`--typography-mode-1-font-size-16\` | 16px |
| Font Weight | \`--font-weight-medium\` | \`--typography-mode-1-font-weight-medium\` | 500 |
| Text | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 |
| Background | \`--semantic-background-interactive\` | — | #5A5A5A |
| Border | \`--semantic-border-subtle\` | — | #2D2D2D |
| Focus Ring | \`--semantic-focus-ring\` | — | rgba(224, 221, 91, 0.35) |

### Key Tokens Used

- \`--fonts-semantic-sm/md\`: Button text sizes
- \`--font-weight-medium\`: Button text weight
- \`--semantic-text-primary\`: Text color
- \`--semantic-background-interactive\`: Background color
- \`--semantic-border-subtle\`: Border color
- \`--semantic-focus-ring\`: Focus indicator
- \`--spacing-*\`: Internal padding and spacing

Use the **Playground** to customize all button properties, or view the **States** story to see all interaction states.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    hierarchy: { control: "radio", options: ["mode"] },
    tone: {
      control: "radio",
      options: ["black"],
      description: "Mode hierarchy only supports black tone",
    },
    state: {
      control: "radio",
      options: ["default", "hover", "focused", "disabled"],
    },
    iconLeading: {
      control: "boolean",
      description: "Show leading icon (left)",
    },
    iconTrailing: {
      control: "boolean",
      description: "Show trailing icon (right)",
    },
    leadingIconName: {
      control: "select",
      options: iconOptions,
      description: "Lucide icon for the leading position",
    },
    trailingIconName: {
      control: "select",
      options: iconOptions,
      description: "Lucide icon for the trailing position",
    },
    leadingIcon: { table: { category: "Icons" } },
    trailingIcon: { table: { category: "Icons" } },
    showText: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    hierarchy: "mode",
    size: "md",
    tone: "black",
    state: "default",
    iconLeading: false,
    iconTrailing: false,
    showText: true,
    children: "Mode Button",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  render: (args) => <Button {...args} />
};

export const States: Story = {
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--spacing-style-spacing-4px-4-16px)", flexWrap: "wrap", alignItems: "center" }}>
      <Button hierarchy="mode" size={args.size || "lg"} tone="black" state="default">
        Default
      </Button>
      <Button hierarchy="mode" size={args.size || "lg"} tone="black" state="hover">
        Hover
      </Button>
      <Button hierarchy="mode" size={args.size || "lg"} tone="black" state="focused">
        Focused
      </Button>
      <Button hierarchy="mode" size={args.size || "lg"} tone="black" state="disabled">
        Disabled
      </Button>
    </div>
  ),
};

