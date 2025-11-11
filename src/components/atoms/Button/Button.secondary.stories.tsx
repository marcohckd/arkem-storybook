// src/components/Button/Button.secondary.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import * as LucideIcons from "lucide-react";
import { Circle } from "lucide-react";

import { Button } from "./Button";

const iconOptions = Object.keys(LucideIcons)
  .filter((key) => {
    const value = LucideIcons[key as keyof typeof LucideIcons];
    return typeof value === "function" && key[0] === key[0].toUpperCase();
  })
  .sort();

const meta: Meta<typeof Button> = {
  title: "Atoms/Button/Secondary",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem" },
    docs: {
      description: {
        component: `Secondary buttons are versatile, medium-sized elements suitable for various interface contexts.

## Hierarchy

- **Secondary**: Medium buttons (sm: 32px, md: 40px height) for secondary actions
- **Typography**: Semantic/sm (12px) or Semantic/md (14px)
- **Ideal for**: Secondary actions, toolbars, forms, inline actions

## Features

- Two size variants: \`sm\` (32px) and \`md\` (40px)
- Three tone variants: \`grey\`, \`black\`, \`color\` (brand)
- Full state support: default, hover, focused, disabled
- Icon support: leading, trailing, or icon-only
- Flexible text display: with or without label text
- Full-width option for responsive layouts
- Accessible with ARIA labels

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
- **Font Weight**: \`var(--font-weight-medium)\` -> \`var(--typography-mode-1-font-weight-medium)\` -> 500
- **Text Color**: Varies by tone
  - \`grey\`: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
  - \`black\`: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
  - \`color\`: \`var(--semantic-text-inverse)\` -> \`var(--color-text-inverse)\` -> #080808
- **Background**: Varies by tone and state (see Token Reference Table)
- **Border**: \`var(--semantic-border-subtle)\` -> #2D2D2D (when applicable)
- **Focus Ring**: \`var(--semantic-focus-ring)\` -> #E0DD5B59 (rgba(224, 221, 91, 0.35))

## Usage

Secondary buttons are perfect for:
- Secondary form actions
- Toolbar buttons
- Inline actions
- Cancel/back actions

\`\`\`tsx
<Button hierarchy="secondary" size="md" tone="black">
  Cancel
</Button>

<Button hierarchy="secondary" size="sm" tone="grey" iconTrailing={true} trailingIconName="Settings">
  Settings
</Button>
\`\`\`

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
| Font Size (md) | \`--fonts-semantic-md\` | \`--typography-mode-1-font-size-16\` | 16px |
| Font Weight | \`--font-weight-medium\` | \`--typography-mode-1-font-weight-medium\` | 500 |
| Text (grey/black) | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 |
| Text (color tone) | \`--semantic-text-inverse\` | \`--color-text-inverse\` | #080808 |
| Border | \`--semantic-border-subtle\` | — | #2D2D2D |
| Focus Ring | \`--semantic-focus-ring\` | — | rgba(224, 221, 91, 0.35) |

### Key Tokens Used

- \`--fonts-semantic-sm/md\`: Button text sizes
- \`--font-weight-medium\`: Button text weight
- \`--semantic-text-primary/inverse\`: Text colors
- \`--semantic-background-*\`: Background colors (varies by tone/state)
- \`--semantic-border-subtle\`: Border color
- \`--semantic-focus-ring\`: Focus indicator
- \`--spacing-*\`: Internal padding and spacing

Use the **Playground** to customize all button properties, or view the **States** story to see all interaction states.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md"] },
    hierarchy: { control: "radio", options: ["secondary"] },
    tone: {
      control: "radio",
      options: ["grey", "black", "color"],
      description: "Applies to all hierarchies",
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
    size: "md",
    tone: "black",
    state: "default",
    iconLeading: true,
    iconTrailing: false,
    showText: true,
    children: "Secondary Button",
    leadingIcon: <Circle />,
    trailingIcon: <Circle />,
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
      <Button hierarchy="secondary" size={args.size || "md"} tone={args.tone || "black"} state="default">
        Default
      </Button>
      <Button hierarchy="secondary" size={args.size || "md"} tone={args.tone || "black"} state="hover">
        Hover
      </Button>
      <Button hierarchy="secondary" size={args.size || "md"} tone={args.tone || "black"} state="focused">
        Focused
      </Button>
      <Button hierarchy="secondary" size={args.size || "md"} tone={args.tone || "black"} state="disabled">
        Disabled
      </Button>
    </div>
  ),
};

