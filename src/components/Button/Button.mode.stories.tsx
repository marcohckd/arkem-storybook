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
  title: "Components/Button/Mode",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Button - Mode Hierarchy

Mode buttons are specialized buttons for interface mode selection, featuring a distinct visual style with black tone only.

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

Use the **Playground** to customize all button properties, or view the **States** story to see all interaction states.`,
      },
    },
  },
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

