import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox, type CheckboxProps } from "./Checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Checkbox

A subtle, accessible checkbox component with custom styling using muted colors.

## Features

- Custom styled checkbox (not native browser default)
- Muted colors for subtle appearance in table contexts
- Full keyboard accessibility
- Focus ring for accessibility
- Hover and disabled states
- Uses semantic tokens only

## Usage

\`\`\`tsx
<Checkbox
  checked={isChecked}
  onCheckedChange={(checked) => setIsChecked(checked)}
  aria-label="Select item"
/>
\`\`\`

**Note**: Always provide an \`aria-label\` for accessibility, especially in table contexts.`,
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    "aria-label": {
      control: "text",
      description: "Accessibility label for the checkbox",
    },
    onCheckedChange: {
      action: "checked",
      description: "Callback when checkbox state changes",
    },
  },
  args: {
    checked: false,
    disabled: false,
    "aria-label": "Checkbox",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args: CheckboxProps) => <Checkbox {...args} />,
};

export const States: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-6-24px)", alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Unchecked
        </label>
        <Checkbox checked={false} aria-label="Unchecked checkbox" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Checked
        </label>
        <Checkbox checked={true} aria-label="Checked checkbox" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Disabled Unchecked
        </label>
        <Checkbox checked={false} disabled aria-label="Disabled unchecked checkbox" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Disabled Checked
        </label>
        <Checkbox checked={true} disabled aria-label="Disabled checked checkbox" />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  tags: ['!dev'],
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", alignItems: "flex-start" }}>
        <Checkbox
          checked={checked}
          onCheckedChange={setChecked}
          aria-label="Interactive checkbox"
        />
        <p style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Checked: {checked ? "Yes" : "No"}
        </p>
      </div>
    );
  },
};

export const InTableContext: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const sampleData = [
      { id: "1", name: "John Doe", role: "Admin" },
      { id: "2", name: "Jane Smith", role: "User" },
      { id: "3", name: "Bob Johnson", role: "User" },
    ];

    const toggleSelection = (id: string) => {
      setSelected((prev: string[]) =>
        prev.includes(id) ? prev.filter((i: string) => i !== id) : [...prev, id]
      );
    };

    const toggleAll = () => {
      setSelected(
        selected.length === sampleData.length
          ? []
          : sampleData.map((r) => r.id)
      );
    };

    return (
      <Table ariaLabel="Table with checkboxes">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selected.length === sampleData.length && sampleData.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row, index) => (
            <TableRow key={row.id} isEven={index % 2 === 0}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(row.id)}
                  onCheckedChange={() => toggleSelection(row.id)}
                  aria-label={`Select ${row.name}`}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

