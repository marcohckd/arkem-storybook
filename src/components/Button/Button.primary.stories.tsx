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
  title: "Components/Button/Primary",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem" },
    docs: {
      description: {
        component: `# Button - Primary Hierarchy

Primary buttons are the most prominent call-to-action elements in the ARKEM Design System, using large sizing and display typography.

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

## Usage

Primary buttons are perfect for:
- Main call-to-action buttons
- Primary form submissions
- Hero section actions
- Prominent navigation actions

\\\`\\\`\\\`tsx
<Button hierarchy="primary" size="lg" tone="color">
  Get Started
</Button>

<Button hierarchy="primary" size="lg" tone="grey" trailingIconName="ArrowRight">
  Learn More
</Button>
\\\`\\\`\\\`

Use the **Playground** to customize all button properties, or view the **States** story to see all interaction states.`,
      },
    },
  },
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
  render: (args) => <Button {...args} />
};

export const States: Story = {
  parameters: {
    layout: "centered",
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

