// src/components/Input/Input.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Search, X, Mail, Lock, User, Check } from "lucide-react";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Input

Text input fields for user data entry, styled with ARKEM Design System tokens to match Button typography and color tokens.

## Features

- **Three sizes**: \`sm\` (32px), \`md\` (40px), \`lg\` (48px) - matching Button sizes
- **Typography**: Uses semantic font scale matching Button component
- **Colors**: Uses semantic color tokens matching Button styling
- **Icons**: Support for leading and trailing icons
- **States**: Default, error, success, disabled
- **Labels & Character Count**: Optional label above input with character count
- **Multiline**: Textarea support for longer text input
- **Accessible**: Full ARIA support and keyboard navigation

## Typography & Colors

- **Font**: \`var(--font-family-base)\` (IBM Plex Sans)
- **Font Size**: \`var(--fonts-semantic-sm/md/lg)\` based on size
- **Font Weight**: \`var(--font-weight-regular)\` default, \`var(--font-weight-medium)\` on hover/focus
- **Text Color**: \`var(--semantic-text-primary)\`
- **Background**: \`var(--semantic-background-interactive)\`
- **Border**: \`var(--semantic-border-subtle)\` with brand focus ring

## Usage

\\\`\\\`\\\`tsx
// Basic input
<Input placeholder="Enter text..." />

// With search icon
<Input 
  placeholder="Search..." 
  iconLeading={<Search size={16} />}
/>

// Controlled input
<Input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Email"
  iconLeading={<Mail size={16} />}
/>
\\\`\\\`\\\`

Use the **Playground** to customize all input properties, or view the **States** story to see all interaction states.`,
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Input size (matches Button sizes)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    value: {
      control: "text",
      description: "Input value (controlled)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    iconLeading: {
      control: false,
      description: "Leading icon (left side)",
    },
    iconTrailing: {
      control: false,
      description: "Trailing icon (right side)",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility",
    },
    label: {
      control: "text",
      description: "Label text above input",
    },
    state: {
      control: "radio",
      options: ["default", "error", "success"],
      description: "Input state",
    },
    maxLength: {
      control: "number",
      description: "Maximum character length (shows character count)",
    },
    multiline: {
      control: "boolean",
      description: "Render as textarea",
    },
    rows: {
      control: "number",
      description: "Number of rows for textarea",
    },
  },
  args: {
    size: "md",
    placeholder: "Enter text...",
    disabled: false,
    state: "default",
    multiline: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    );
  },
};

export const Default: Story = {
  tags: ['!dev'],
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <Input
          placeholder="Enter text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  tags: ['!dev'],
  render: () => {
    const [smValue, setSmValue] = useState("");
    const [mdValue, setMdValue] = useState("");
    const [lgValue, setLgValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", width: "300px" }}>
        <Input
          size="sm"
          placeholder="Small (32px)"
          value={smValue}
          onChange={(e) => setSmValue(e.target.value)}
        />
        <Input
          size="md"
          placeholder="Medium (40px)"
          value={mdValue}
          onChange={(e) => setMdValue(e.target.value)}
        />
        <Input
          size="lg"
          placeholder="Large (48px)"
          value={lgValue}
          onChange={(e) => setLgValue(e.target.value)}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  tags: ['!dev'],
  render: () => {
    const [searchValue, setSearchValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [clearableValue, setClearableValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", width: "300px" }}>
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          iconLeading={<Search size={16} />}
          ariaLabel="Search"
        />
        <Input
          placeholder="Email"
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          iconLeading={<Mail size={16} />}
          ariaLabel="Email"
        />
        <Input
          placeholder="Password"
          type="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          iconLeading={<Lock size={16} />}
          ariaLabel="Password"
        />
        <Input
          placeholder="Clearable input"
          value={clearableValue}
          onChange={(e) => setClearableValue(e.target.value)}
          iconTrailing={
            clearableValue ? (
              <button
                onClick={() => setClearableValue("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Clear"
              >
                <X size={16} />
              </button>
            ) : null
          }
          ariaLabel="Clearable input"
        />
      </div>
    );
  },
};

export const States: Story = {
  tags: ['!dev'],
  render: () => {
    const [defaultValue, setDefaultValue] = useState("");
    const [focusedValue, setFocusedValue] = useState("");
    const [disabledValue] = useState("Disabled value");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", width: "300px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--semantic-text-secondary)" }}>
            Default
          </label>
          <Input
            placeholder="Default state"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--semantic-text-secondary)" }}>
            With Value
          </label>
          <Input
            placeholder="Enter text..."
            value="Sample text"
            onChange={() => {}}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--semantic-text-secondary)" }}>
            Disabled
          </label>
          <Input
            placeholder="Disabled input"
            value={disabledValue}
            disabled
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--semantic-text-secondary)" }}>
            Disabled (empty)
          </label>
          <Input
            placeholder="Disabled placeholder"
            disabled
          />
        </div>
      </div>
    );
  },
};

export const WithPlaceholder: Story = {
  tags: ['!dev'],
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", width: "300px" }}>
        <Input placeholder="Enter your name..." />
        <Input placeholder="Search for anything..." iconLeading={<Search size={16} />} />
        <Input placeholder="Type here..." />
      </div>
    );
  },
};

export const FullWidth: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "100%" }}>
        <Input
          placeholder="Full width input..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          iconLeading={<Search size={16} />}
        />
      </div>
    );
  },
};

export const WithLabelAndCharacterCount: Story = {
  tags: ['!dev'],
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <Input
          label="Username"
          placeholder="Enter username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={20}
          iconLeading={<User size={16} />}
        />
      </div>
    );
  },
};

export const InputStates: Story = {
  tags: ['!dev'],
  render: () => {
    const [defaultValue, setDefaultValue] = useState("Arsindesigners");
    const [errorValue, setErrorValue] = useState("Invalid username");
    const [successValue, setSuccessValue] = useState("Valid username");
    const [emptyValue, setEmptyValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "300px" }}>
        <Input
          label="Username"
          placeholder="Enter username"
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
          maxLength={20}
          iconLeading={<User size={16} />}
          state="default"
        />
        <Input
          label="Username"
          placeholder="Enter username"
          value={emptyValue}
          onChange={(e) => setEmptyValue(e.target.value)}
          maxLength={20}
          iconLeading={<User size={16} />}
          state="default"
        />
        <Input
          label="Username"
          placeholder="Enter username"
          value={errorValue}
          onChange={(e) => setErrorValue(e.target.value)}
          maxLength={20}
          iconLeading={<User size={16} />}
          state="error"
        />
        <Input
          label="Username"
          placeholder="Enter username"
          value={successValue}
          onChange={(e) => setSuccessValue(e.target.value)}
          maxLength={20}
          iconLeading={<User size={16} />}
          iconTrailing={<Check size={16} />}
          state="success"
        />
      </div>
    );
  },
};

export const MultilineTextarea: Story = {
  tags: ['!dev'],
  render: () => {
    const [value, setValue] = useState("Sample text typed here. Sample text typed here. Sample text typed here. Sample text typed here. Sample text typed here.");
    return (
      <div style={{ width: "300px" }}>
        <Input
          label="Description"
          placeholder="Enter description..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          multiline
          rows={6}
        />
      </div>
    );
  },
};

export const AllVariations: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
  render: () => {
    const [smValue, setSmValue] = useState("");
    const [mdValue, setMdValue] = useState("");
    const [lgValue, setLgValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px" }}>
        <div>
          <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 500, color: "var(--semantic-text-primary)" }}>
            Small (32px)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Input
              size="sm"
              placeholder="Small input"
              value={smValue}
              onChange={(e) => setSmValue(e.target.value)}
            />
            <Input
              size="sm"
              placeholder="With search icon"
              value={smValue}
              onChange={(e) => setSmValue(e.target.value)}
              iconLeading={<Search size={16} />}
            />
            <Input size="sm" placeholder="Disabled" disabled />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 500, color: "var(--semantic-text-primary)" }}>
            Medium (40px)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Input
              size="md"
              placeholder="Medium input"
              value={mdValue}
              onChange={(e) => setMdValue(e.target.value)}
            />
            <Input
              size="md"
              placeholder="With search icon"
              value={mdValue}
              onChange={(e) => setMdValue(e.target.value)}
              iconLeading={<Search size={16} />}
            />
            <Input size="md" placeholder="Disabled" disabled />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 500, color: "var(--semantic-text-primary)" }}>
            Large (48px)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Input
              size="lg"
              placeholder="Large input"
              value={lgValue}
              onChange={(e) => setLgValue(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="With search icon"
              value={lgValue}
              onChange={(e) => setLgValue(e.target.value)}
              iconLeading={<Search size={16} />}
            />
            <Input size="lg" placeholder="Disabled" disabled />
          </div>
        </div>
      </div>
    );
  },
};

