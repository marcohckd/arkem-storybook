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
  title: "Components/Button/Secondary",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem" },
    docs: {
      description: {
        component: `# Button - Secondary Hierarchy

Secondary buttons are versatile, medium-sized elements suitable for various interface contexts.

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

## Usage

Secondary buttons are perfect for:
- Secondary form actions
- Toolbar buttons
- Inline actions
- Cancel/back actions

\\\`\\\`\\\`tsx
<Button hierarchy="secondary" size="md" tone="black">
  Cancel
</Button>

<Button hierarchy="secondary" size="sm" tone="grey" iconTrailing={true} trailingIconName="Settings">
  Settings
</Button>
\\\`\\\`\\\`

Use the **Playground** to customize all button properties, or view the **States** story to see all interaction states.`,
      },
    },
  },
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

