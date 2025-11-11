import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Link component for navigation and external links.

## Features

- Multiple variants (default, subtle, underline)
- Size variants
- Disabled state
- Token-based styling
- Full accessibility support`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle", "underline"],
      description: "Visual variant of the link",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant of the link",
    },
    disabled: {
      control: "boolean",
      description: "Whether the link is disabled",
    },
    href: {
      control: "text",
      description: "URL or path for the link",
    },
    children: {
      control: false,
      description: "Link text content",
    },
    className: {
      control: false,
      description: "Additional CSS class name",
    },
    onClick: {
      action: "clicked",
      description: "Callback function called when the link is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Link text",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
      <Link href="#" variant="default">Default link</Link>
      <Link href="#" variant="subtle">Subtle link</Link>
      <Link href="#" variant="underline">Underline link</Link>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
      <Link href="#">Normal link</Link>
      <Link href="#" disabled>Disabled link</Link>
    </div>
  ),
};

