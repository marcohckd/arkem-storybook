// src/components/Button/Button.actions.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import * as LucideIcons from "lucide-react";

import { Button, type ButtonProps } from "./Button";

const iconOptions = Object.keys(LucideIcons)
  .filter((key) => {
    const value = LucideIcons[key as keyof typeof LucideIcons];
    return typeof value === "function" && key[0] === key[0].toUpperCase();
  })
  .sort();

type ButtonStoryArgs = ButtonProps & {
  iconName?: keyof typeof LucideIcons;
};

const meta: Meta<ButtonStoryArgs> = {
  title: "Components/Button/Actions",
  component: Button as any,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Button - Actions

Action buttons are specialized icon-only buttons used in headers and toolbars, featuring distinct function types.

## Function Variants

- **Feature**: Brand-colored icon with subtle border (uses Semantic/Border/Subtle)
- **Action**: More subtle - no border, muted icon color, subtle hover background
- **Table Action**: Even more subtle - no border, very subtle hover, muted icon color (for table contexts)
- **Borderless**: No border, transparent background, standard icon color with interactive hover state
- **Close**: No border, neutral tone, always displays "X" icon

## Sizes

- **Small (sm)**: 32px height - for Header Primary
- **Medium (md)**: 40px height - for Header Secondary (default)
- **Large (lg)**: 48px height - for standalone actions

## Features

- Icon-only design (no text labels)
- Consistent 2px spacing when grouped
- Semantic border colors (Semantic/Border/Subtle)
- Full state support: default, hover, focused, disabled
- Accessible with ARIA labels
- Close button always uses Lucide "X" icon

## Usage

Action buttons are perfect for:
- Header action bars
- Toolbar buttons
- Feature actions (save, share)
- Standard actions (settings, edit)
- Close/dismiss buttons

\\\`\\\`\\\`tsx
// Feature button
<Button function="feature" size="md" trailingIconName="Star" showText={false} />

// Action button
<Button function="action" size="md" trailingIconName="Settings" showText={false} />

// Table action button (more subtle)
<Button function="table-action" size="md" trailingIconName="Edit" showText={false} />

// Borderless button (no border, transparent background)
<Button function="borderless" size="md" trailingIconName="Edit" showText={false} />

// Close button (always uses X icon)
<Button function="close" size="md" showText={false} ariaLabel="Close" />
\\\`\\\`\\\`

**Note**: All action buttons require showText={false} and appropriate ariaLabel for accessibility.

Use the **Playground** to explore different icon combinations and sizes.`,
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    function: {
      control: "radio",
      options: ["feature", "action", "table-action", "borderless", "close"],
      description: "Action button function variant",
    },
    iconName: {
      control: "select",
      options: iconOptions,
      description: "Lucide icon name (for feature/action/table-action/borderless only, close always uses X)",
      if: { arg: "function", neq: "close" },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    ariaLabel: {
      control: "text",
      description: "Accessibility label for icon-only buttons",
    },
    trailingIconName: { table: { disable: true } },
    hierarchy: { table: { disable: true } },
    tone: { table: { disable: true } },
    showText: { table: { disable: true } },
    iconLeading: { table: { disable: true } },
    iconTrailing: { table: { disable: true } },
  },
  args: {
    size: "md",
    function: "action",
    iconName: "ArrowRight",
    disabled: false,
    ariaLabel: "Action",
    showText: false,
    iconTrailing: true,
    iconLeading: false,
    hierarchy: "secondary",
    tone: "black",
  },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Playground: Story = {
  render: (args) => {
    const getIconName = () => {
      if (args.function === "close") {
        return "X" as keyof typeof LucideIcons;
      }
      if (args.function === "table-action" || args.function === "borderless") {
        return (args.iconName || "Edit") as keyof typeof LucideIcons;
      }
      return (args.iconName || "ArrowRight") as keyof typeof LucideIcons;
    };
    return (
      <Button
        {...args}
        trailingIconName={getIconName()}
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
      />
    );
  },
};

export const Feature: Story = {
  tags: ['!dev'],
  args: {
    function: "feature",
    size: "md",
    iconName: "ArrowRight",
    ariaLabel: "Feature action",
  },
  render: (args) => {
    const iconName = args.iconName || "ArrowRight";
    return (
      <Button
        {...args}
        trailingIconName={iconName as keyof typeof LucideIcons}
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
      />
    );
  },
};

export const Action: Story = {
  tags: ['!dev'],
  args: {
    function: "action",
    size: "md",
    iconName: "ArrowRight",
    ariaLabel: "Action",
  },
  render: (args) => {
    const iconName = args.iconName || "ArrowRight";
    return (
      <Button
        {...args}
        trailingIconName={iconName as keyof typeof LucideIcons}
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
      />
    );
  },
};

export const Borderless: Story = {
  tags: ['!dev'],
  args: {
    function: "borderless",
    size: "md",
    iconName: "Edit",
    ariaLabel: "Borderless action",
  },
  render: (args) => {
    const iconName = args.iconName || "Edit";
    return (
      <Button
        {...args}
        trailingIconName={iconName as keyof typeof LucideIcons}
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
      />
    );
  },
};

export const Close: Story = {
  tags: ['!dev'],
  args: {
    function: "close",
    size: "md",
    ariaLabel: "Close",
  },
  render: (args) => {
    return (
      <Button
        {...args}
        trailingIconName="X"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
      />
    );
  },
};

export const AllSizes: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-style-spacing-4px-4-16px)", alignItems: "center", flexWrap: "wrap" }}>
      <Button
        function="action"
        size="sm"
        trailingIconName="ArrowRight"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Action"
      />
      <Button
        function="action"
        size="md"
        trailingIconName="ArrowRight"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Action"
      />
      <Button
        function="action"
        size="lg"
        trailingIconName="ArrowRight"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Action"
      />
    </div>
  ),
};

export const AllFunctions: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-style-spacing-4px-4-16px)", alignItems: "center", flexWrap: "wrap" }}>
      <Button
        function="feature"
        size="md"
        trailingIconName="ArrowRight"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Feature"
      />
      <Button
        function="action"
        size="md"
        trailingIconName="ArrowRight"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Action"
      />
      <Button
        function="table-action"
        size="md"
        trailingIconName="Edit"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Table Action"
      />
      <Button
        function="borderless"
        size="md"
        trailingIconName="Edit"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Borderless"
      />
      <Button
        function="close"
        size="md"
        trailingIconName="X"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Close"
      />
    </div>
  ),
};

export const InlineComposition: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div
      className="actions-inline"
      style={{
        display: "flex",
        gap: "var(--spacing-style-spacing-4px-0-5-2px, 2px)",
        alignItems: "center",
      }}
    >
      <Button
        function="feature"
        size="md"
        trailingIconName="ArrowRight"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Feature"
      />
      <Button
        function="action"
        size="md"
        trailingIconName="ArrowRight"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Action"
      />
      <Button
        function="close"
        size="md"
        trailingIconName="X"
        showText={false}
        iconTrailing={true}
        iconLeading={false}
        hierarchy="secondary"
        tone="black"
        ariaLabel="Close"
      />
    </div>
  ),
};

