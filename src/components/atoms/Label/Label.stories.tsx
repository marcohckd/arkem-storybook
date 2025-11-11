// src/components/Label/Label.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Label } from "./Label";
import { FormField } from "../../molecules/FormField/FormField";

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
  tags: ['!dev'],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", width: "300px" }}>
      <Label htmlFor="example-input">Example Input</Label>
      <input
        id="example-input"
        type="text"
        placeholder="Enter text..."
        style={{
          padding: "var(--spacing-8)",
          background: "var(--semantic-background-muted)",
          border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
          borderRadius: "var(--radius-xs)",
          color: "var(--semantic-text-primary)",
          fontSize: "var(--fonts-semantic-md)",
        }}
      />
    </div>
  ),
};

export const MultipleLabels: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)", width: "300px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <Label htmlFor="input1">First Input</Label>
        <input
          id="input1"
          type="text"
          style={{
            padding: "var(--spacing-8)",
            background: "var(--semantic-background-muted)",
            border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
            borderRadius: "var(--radius-xs)",
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-md)",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <Label htmlFor="input2">Second Input</Label>
        <input
          id="input2"
          type="text"
          style={{
            padding: "var(--spacing-8)",
            background: "var(--semantic-background-muted)",
            border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
            borderRadius: "var(--radius-xs)",
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-md)",
          }}
        />
      </div>
    </div>
  ),
};

export const RequiredIndicator: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)", width: "300px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-style-spacing-4px-0-5-2px)" }}>
          <Label htmlFor="required-input">Email Address</Label>
          <span style={{ color: "var(--semantic-text-error)", fontSize: "var(--fonts-semantic-sm)" }}>*</span>
        </div>
        <input
          id="required-input"
          type="email"
          required
          style={{
            padding: "var(--spacing-8)",
            background: "var(--semantic-background-muted)",
            border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
            borderRadius: "var(--radius-xs)",
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-md)",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-style-spacing-4px-0-5-2px)" }}>
          <Label htmlFor="optional-input">Phone Number</Label>
          <span style={{ color: "var(--semantic-text-secondary)", fontSize: "var(--fonts-semantic-sm)", fontStyle: "italic" }}>
            (optional)
          </span>
        </div>
        <input
          id="optional-input"
          type="tel"
          style={{
            padding: "var(--spacing-8)",
            background: "var(--semantic-background-muted)",
            border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
            borderRadius: "var(--radius-xs)",
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-md)",
          }}
        />
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)", width: "300px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-style-spacing-4px-0-5-2px)" }}>
          <Label htmlFor="error-input">Email Address</Label>
          <span style={{ color: "var(--semantic-text-error)", fontSize: "var(--fonts-semantic-sm)" }}>*</span>
        </div>
        <input
          id="error-input"
          type="email"
          required
          aria-invalid="true"
          aria-describedby="error-message"
          style={{
            padding: "var(--spacing-8)",
            background: "var(--semantic-background-muted)",
            border: "var(--border-width-thin) solid var(--semantic-text-error)",
            borderRadius: "var(--radius-xs)",
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-md)",
          }}
        />
        <span
          id="error-message"
          style={{
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-error)",
          }}
        >
          Please enter a valid email address
        </span>
      </div>
    </div>
  ),
};

export const WithFormField: Story = {
  tags: ['!dev'],
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", width: "300px" }}>
        <FormField
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <FormField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          error={password.length > 0 && password.length < 8 ? "Password must be at least 8 characters" : undefined}
        />
      </div>
    );
  },
};

export const AccessibilityExample: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story: `This example demonstrates proper accessibility practices:

1. **Label Association**: The \`htmlFor\` prop matches the input's \`id\`
2. **Required Indicator**: Visual indicator with asterisk
3. **Error Association**: \`aria-describedby\` links error message to input
4. **Screen Reader Support**: Label text is announced when input receives focus

**Best Practices:**
- Always use \`htmlFor\` to associate labels with inputs
- Include required indicators for required fields
- Link error messages using \`aria-describedby\`
- Use descriptive label text that explains the purpose of the field`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", width: "300px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-style-spacing-4px-0-5-2px)" }}>
          <Label htmlFor="accessible-input">Full Name</Label>
          <span style={{ color: "var(--semantic-text-error)", fontSize: "var(--fonts-semantic-sm)" }}>*</span>
        </div>
        <input
          id="accessible-input"
          type="text"
          required
          aria-required="true"
          aria-describedby="name-help"
          style={{
            padding: "var(--spacing-8)",
            background: "var(--semantic-background-muted)",
            border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
            borderRadius: "var(--radius-xs)",
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-md)",
          }}
        />
        <span
          id="name-help"
          style={{
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-secondary)",
          }}
        >
          Enter your first and last name
        </span>
      </div>
    </div>
  ),
};

