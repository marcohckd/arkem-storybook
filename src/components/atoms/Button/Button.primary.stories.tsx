// src/components/Button/Button.primary.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Button } from "./Button";

const iconOptions = Object.keys(LucideIcons)
  .filter((key) => {
    const value = LucideIcons[key as keyof typeof LucideIcons];
    return typeof value === "function" && key[0] === key[0].toUpperCase();
  })
  .sort();

const meta: Meta<typeof Button> = {
  title: "Atoms/Button/Primary",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem" },
    docs: {
      description: {
        component: `Primary buttons are the most prominent call-to-action elements in the ARKEM Design System, using large sizing and display typography.

## Hierarchy

- **Primary**: Large buttons (lg, 48px height) for primary actions
- **Typography**: Display/sm (14px) with medium font weight
- **Ideal for**: Main CTAs, primary user actions, hero sections

## Features

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
- **Font Size**: \`var(--fonts-display-sm)\` -> \`var(--typography-mode-1-font-size-14)\` -> 14px
- **Font Weight**: \`var(--font-weight-medium)\` -> \`var(--typography-mode-1-font-weight-medium)\` -> 500
- **Text Color**: Varies by tone
  - \`grey\`: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
  - \`black\`: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
  - \`color\`: \`var(--semantic-text-inverse)\` -> \`var(--color-text-inverse)\` -> #080808
- **Background**: Varies by tone and state (see Token Reference Table)
- **Border**: \`var(--semantic-border-subtle)\` -> #2D2D2D (when applicable)
- **Focus Ring**: \`var(--semantic-focus-ring)\` -> #E0DD5B59 (rgba(224, 221, 91, 0.35))

## Usage

Primary buttons are perfect for:
- Main call-to-action buttons
- Primary form submissions
- Hero section actions
- Prominent navigation actions

\`\`\`tsx
<Button hierarchy="primary" size="lg" tone="color">
  Get Started
</Button>

<Button hierarchy="primary" size="lg" tone="grey" trailingIconName="ArrowRight">
  Learn More
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
| Font Size | \`--fonts-display-sm\` | \`--typography-mode-1-font-size-14\` | 14px |
| Font Weight | \`--font-weight-medium\` | \`--typography-mode-1-font-weight-medium\` | 500 |
| Text (grey/black) | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 |
| Text (color tone) | \`--semantic-text-inverse\` | \`--color-text-inverse\` | #080808 |
| Border | \`--semantic-border-subtle\` | — | #2D2D2D |
| Focus Ring | \`--semantic-focus-ring\` | — | rgba(224, 221, 91, 0.35) |

### Key Tokens Used

- \`--fonts-display-sm\`: Button text size
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
    size: { control: "radio", options: ["lg"] },
    hierarchy: { control: "radio", options: ["primary"] },
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
    size: "lg",
    tone: "color",
    state: "default",
    iconLeading: true,
    iconTrailing: false,
    showText: true,
    children: "Primary Button",
    leadingIcon: <ArrowRight />,
    trailingIcon: <ArrowRight />,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to customize all button properties. Use the Controls panel to experiment with different configurations.",
      },
    },
  },
  render: (args) => <Button {...args} />
};

export const States: Story = {
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story: "Shows all button interaction states: default, hover, focused, and disabled. Use these as reference for button styling.",
      },
    },
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--spacing-style-spacing-4px-4-16px)", flexWrap: "wrap", alignItems: "center" }}>
      <Button hierarchy="primary" size={args.size || "lg"} tone={args.tone || "color"} state="default">
        Default
      </Button>
      <Button hierarchy="primary" size={args.size || "lg"} tone={args.tone || "color"} state="hover">
        Hover
      </Button>
      <Button hierarchy="primary" size={args.size || "lg"} tone={args.tone || "color"} state="focused">
        Focused
      </Button>
      <Button hierarchy="primary" size={args.size || "lg"} tone={args.tone || "color"} state="disabled">
        Disabled
      </Button>
    </div>
  ),
};

