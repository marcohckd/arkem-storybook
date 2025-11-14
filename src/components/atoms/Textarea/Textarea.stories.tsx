import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Textarea component for multi-line text input.

## Features

- Multiple size variants
- State variants (default, error, success)
- Resize control
- Token-based styling
- Full accessibility support`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant of the textarea",
    },
    state: {
      control: "select",
      options: ["default", "error", "success"],
      description: "Visual state of the textarea",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    value: {
      control: "text",
      description: "Current value of the textarea (controlled)",
    },
    onChange: {
      action: "value changed",
      description: "Callback function called when the value changes",
    },
    rows: {
      control: "number",
      description: "Number of visible rows",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text displayed when textarea is empty",
    },
    maxLength: {
      control: "number",
      description: "Maximum number of characters allowed",
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "Resize behavior of the textarea",
    },
    className: {
      control: false,
      description: "Additional CSS class name",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
    rows: 4,
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("This is a sample textarea value.");
    return (
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        placeholder="Enter your message..."
      />
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", width: "300px" }}>
      <Textarea size="md" placeholder="Default state" rows={3} />
      <Textarea size="md" placeholder="Error state" state="error" rows={3} />
      <Textarea size="md" placeholder="Success state" state="success" rows={3} />
      <Textarea size="md" placeholder="Disabled" disabled rows={3} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", width: "300px" }}>
      <Textarea size="sm" placeholder="Small - Compact" rows={3} />
      <Textarea size="md" placeholder="Medium - Default" rows={3} />
      <Textarea size="lg" placeholder="Large - Prominent" rows={3} />
    </div>
  ),
};

