// src/components/Label/Label.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Accessible form label component styled with ARKEM Design System tokens.

## Features

- **Accessibility**: Proper label association with form inputs via \`htmlFor\` prop
- **Typography**: Uses semantic font tokens
- **Colors**: Uses semantic text color tokens
- **Form Integration**: Works seamlessly with Input, Dropdown, and other form components

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
- **Font Size**: \`var(--fonts-semantic-sm)\` -> \`var(--typography-mode-1-font-size-12)\` -> 12px
- **Font Weight**: \`var(--font-weight-medium)\` -> \`var(--typography-mode-1-font-weight-medium)\` -> 500
- **Text Color**: \`var(--semantic-text-secondary)\` -> \`var(--color-text-secondary)\` -> #838383

## Usage

\`\`\`tsx
<Label htmlFor="input-id">Label Text</Label>
<input id="input-id" />

// With Input component
<Label htmlFor="email-input">Email Address</Label>
<Input id="email-input" placeholder="Enter email..." />
\`\`\`

## Accessibility

- Properly associates with form inputs via \`htmlFor\` prop
- Screen readers announce label text when input receives focus
- Required for accessible form design

## Design Tokens

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value |
|----------|---------------|-----------------|--------|
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | IBM Plex Sans |
| Font Size | \`--fonts-semantic-sm\` | \`--typography-mode-1-font-size-12\` | 12px |
| Font Weight | \`--font-weight-medium\` | \`--typography-mode-1-font-weight-medium\` | 500 |
| Text | \`--semantic-text-secondary\` | \`--color-text-secondary\` | #838383 |

### Key Tokens Used

- \`--fonts-semantic-sm\`: Label text size
- \`--font-weight-medium\`: Label text weight
- \`--semantic-text-secondary\`: Label text color
- \`--font-family-base\`: Font family

Use the **Playground** to customize label properties.`,
      },
    },
  },
  tags: ["autodocs"],
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

