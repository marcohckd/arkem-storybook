// src/components/Label/Label.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Label

Accessible form label component styled with ARKEM Design System tokens.

## Features

- **Accessibility**: Proper label association with form inputs
- **Typography**: Uses semantic font tokens
- **Colors**: Uses semantic text color tokens

## Usage

\`\`\`tsx
<Label htmlFor="input-id">Label Text</Label>
<input id="input-id" />
\`\`\`

Use the **Playground** to customize label properties.`,
      },
    },
  },
  argTypes: {
    htmlFor: {
      control: "text",
      description: "ID of associated form input",
    },
    children: {
      control: "text",
      description: "Label text",
    },
    className: {
      control: false,
    },
  },
  args: {
    children: "Label Text",
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: (args) => <Label {...args} />,
};

export const WithInput: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8, 8px)", width: "300px" }}>
      <Label htmlFor="example-input">Example Input</Label>
      <input
        id="example-input"
        type="text"
        placeholder="Enter text..."
        style={{
          padding: "var(--spacing-8, 8px)",
          background: "var(--semantic-background-muted)",
          border: "1px solid var(--semantic-border-subtle)",
          borderRadius: "var(--radius-xs)",
          color: "var(--semantic-text-primary)",
          fontSize: "var(--fonts-semantic-md)",
        }}
      />
    </div>
  ),
};

export const MultipleLabels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12, 12px)", width: "300px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8, 8px)" }}>
        <Label htmlFor="input1">First Input</Label>
        <input
          id="input1"
          type="text"
          style={{
            padding: "var(--spacing-8, 8px)",
            background: "var(--semantic-background-muted)",
            border: "1px solid var(--semantic-border-subtle)",
            borderRadius: "var(--radius-xs)",
            color: "var(--semantic-text-primary)",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8, 8px)" }}>
        <Label htmlFor="input2">Second Input</Label>
        <input
          id="input2"
          type="text"
          style={{
            padding: "var(--spacing-8, 8px)",
            background: "var(--semantic-background-muted)",
            border: "1px solid var(--semantic-border-subtle)",
            borderRadius: "var(--radius-xs)",
            color: "var(--semantic-text-primary)",
          }}
        />
      </div>
    </div>
  ),
};

