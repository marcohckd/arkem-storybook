import type { Meta, StoryObj } from "@storybook/react";
import { Badge, type BadgeProps } from "./Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Badge

A subtle badge component for displaying labels and tags, particularly useful for role indicators in tables.

## Features

- Two variants: default (for admin roles) and secondary (for user roles)
- Muted colors for subtle appearance in table contexts
- Uses semantic tokens only
- Maintains good contrast for accessibility

## Variants

- **default**: Muted neutral background, used for admin roles
- **secondary**: Very subtle background with border, used for user roles

## Usage

\`\`\`tsx
<Badge variant="default">admin</Badge>
<Badge variant="secondary">user</Badge>
\`\`\`

**Note**: Badges are designed to be subtle and work well in table contexts.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "secondary"],
      description: "Badge variant",
    },
    children: {
      control: "text",
      description: "Badge text content",
    },
  },
  args: {
    variant: "default",
    children: "admin",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (args: BadgeProps) => <Badge {...args} />,
};

export const Variants: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-6-24px)", alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Default Variant (Admin)
        </label>
        <Badge variant="default">admin</Badge>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Secondary Variant (User)
        </label>
        <Badge variant="secondary">user</Badge>
      </div>
    </div>
  ),
};

export const InTableContext: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
  render: () => {
    const sampleData = [
      { id: "1", name: "John Doe", role: "admin" },
      { id: "2", name: "Jane Smith", role: "user" },
      { id: "3", name: "Bob Johnson", role: "user" },
      { id: "4", name: "Alice Williams", role: "admin" },
    ];

    return (
      <Table ariaLabel="Table with role badges">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row, index) => (
            <TableRow key={row.id} isEven={index % 2 === 0}>
              <TableCell>{row.name}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <Badge variant={row.role === "admin" ? "default" : "secondary"}>
                  {row.role}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

