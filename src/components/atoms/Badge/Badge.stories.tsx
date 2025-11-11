import type { Meta, StoryObj } from "@storybook/react";
import { Badge, type BadgeProps } from "./Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../organisms/Table";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `A subtle badge component for displaying labels and tags, particularly useful for role indicators in tables.

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
- **Font Size**: \`var(--fonts-semantic-xs)\` -> \`var(--typography-mode-1-font-size-12)\` -> 12px
- **Font Weight**: \`var(--font-weight-medium)\` -> \`var(--typography-mode-1-font-weight-medium)\` -> 500
- **Default Variant Text**: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
- **Default Variant Background**: \`var(--semantic-background-muted)\` -> #2D2D2D
- **Secondary Variant Text**: \`var(--semantic-text-secondary)\` -> \`var(--color-text-secondary)\` -> #838383
- **Secondary Variant Background**: Transparent
- **Secondary Variant Border**: \`var(--semantic-border-subtle)\` -> #2D2D2D

## Usage

\`\`\`tsx
<Badge variant="default">admin</Badge>
<Badge variant="secondary">user</Badge>

// In table context
<TableCell>
  <Badge variant={role === "admin" ? "default" : "secondary"}>
    {role}
  </Badge>
</TableCell>
\`\`\`

## Accessibility

- Maintains good contrast ratios
- Semantic HTML structure
- Screen reader friendly

## Design Tokens

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value |
|----------|---------------|-----------------|--------|
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | IBM Plex Sans |
| Font Size | \`--fonts-semantic-xs\` | \`--typography-mode-1-font-size-12\` | 12px |
| Font Weight | \`--font-weight-medium\` | \`--typography-mode-1-font-weight-medium\` | 500 |
| Default Text | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 |
| Default Background | \`--semantic-background-muted\` | — | #2D2D2D |
| Secondary Text | \`--semantic-text-secondary\` | \`--color-text-secondary\` | #838383 |
| Secondary Border | \`--semantic-border-subtle\` | — | #2D2D2D |

### Key Tokens Used

- \`--fonts-semantic-xs\`: Badge text size
- \`--font-weight-medium\`: Badge text weight
- \`--semantic-text-primary/secondary\`: Text colors
- \`--semantic-background-muted\`: Default variant background
- \`--semantic-border-subtle\`: Secondary variant border
- \`--radius-sm\`: Border radius

**Note**: Badges are designed to be subtle and work well in table contexts.`,
      },
    },
  },
  tags: ["autodocs"],
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

