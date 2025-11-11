import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { Search } from "lucide-react";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `FormField molecule that composes Label + Input + Error message + Character count.

## Features

- Composes Label and Input atoms
- Error message display
- Character count display
- Help text support
- Token-based styling

## Usage

\`\`\`tsx
<FormField
  label="Email"
  placeholder="Enter your email"
  error="Invalid email address"
  helpText="We'll never share your email"
/>
\`\`\``,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: "Invalid email address",
  },
};

export const WithHelpText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    helpText: "Must be at least 8 characters",
    type: "password",
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description",
    maxLength: 100,
    showCharacterCount: true,
    multiline: true,
    rows: 4,
  },
};

export const WithIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    iconLeading: <Search size={16} />,
  },
};

