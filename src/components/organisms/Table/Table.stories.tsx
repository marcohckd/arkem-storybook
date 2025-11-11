import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from ".";
import { Checkbox } from "../../atoms/Checkbox";

const meta: Meta<typeof Table> = {
  title: "Organisms/Table",
  component: Table,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--semantic-background-base)', minHeight: '100vh', padding: 'var(--spacing-20)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `A reusable table component with support for selection, sorting, sticky columns, and various row states.

## Features

- Semantic HTML table structure
- Row states: even/odd, hover, selected
- Sticky column support
- Sortable headers
- Token-based styling
- Accessible with ARIA attributes

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
- **Font Size**: \`var(--fonts-semantic-md)\` -> \`var(--typography-mode-1-font-size-16)\` -> 16px
- **Font Weight**: \`var(--font-weight-regular)\` -> \`var(--typography-mode-1-font-weight-regular)\` -> 400 (body), \`var(--font-weight-medium)\` -> \`var(--typography-mode-1-font-weight-medium)\` -> 500 (headers)
- **Text Color**: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
- **Header Background**: \`var(--semantic-background-raised)\` -> #121212
- **Even Row Background**: \`var(--semantic-background-base)\` -> #080808
- **Odd Row Background**: \`var(--semantic-background-muted)\` -> #2D2D2D
- **Selected Row**: \`var(--semantic-background-interactive)\` -> #5A5A5A
- **Border**: \`var(--semantic-border-subtle)\` -> #2D2D2D

## Usage

\`\`\`tsx
<Table ariaLabel="Sample Table">
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow isEven>
      <TableCell>John Doe</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>
\`\`\`

## Accessibility

- Semantic HTML table structure
- ARIA labels via \`ariaLabel\` prop
- Keyboard navigation support
- Screen reader support for table structure

## Design Tokens

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value |
|----------|---------------|-----------------|--------|
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | IBM Plex Sans |
| Font Size | \`--fonts-semantic-md\` | \`--typography-mode-1-font-size-16\` | 16px |
| Font Weight (body) | \`--font-weight-regular\` | \`--typography-mode-1-font-weight-regular\` | 400 |
| Font Weight (header) | \`--font-weight-medium\` | \`--typography-mode-1-font-weight-medium\` | 500 |
| Text | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 |
| Header Background | \`--semantic-background-raised\` | — | #121212 |
| Even Row Background | \`--semantic-background-base\` | — | #080808 |
| Odd Row Background | \`--semantic-background-muted\` | — | #2D2D2D |
| Selected Row Background | \`--semantic-background-interactive\` | — | #5A5A5A |
| Border | \`--semantic-border-subtle\` | — | #2D2D2D |

### Key Tokens Used

- \`--fonts-semantic-md\`: Table text size
- \`--font-weight-regular/medium\`: Text weights
- \`--semantic-text-primary\`: Text color
- \`--semantic-background-base/muted/raised/interactive\`: Row backgrounds
- \`--semantic-border-subtle\`: Border color
- \`--spacing-*\`: Cell padding`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: "1", name: "John Doe", role: "Admin", email: "john@example.com" },
  { id: "2", name: "Jane Smith", role: "User", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", role: "User", email: "bob@example.com" },
  { id: "4", name: "Alice Williams", role: "Admin", email: "alice@example.com" },
  { id: "5", name: "Charlie Brown", role: "User", email: "charlie@example.com" },
];

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Basic table with sample data showing name, role, and email columns. Demonstrates default table styling and structure.",
      },
    },
  },
  render: () => (
    <div style={{ padding: "var(--spacing-style-spacing-4px-6-24px)" }}>
      <Table ariaLabel="Sample Data Table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row, index) => (
            <TableRow key={row.id} isEven={index % 2 === 0}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
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
      <div style={{ padding: "var(--spacing-style-spacing-4px-6-24px)" }}>
        <Table ariaLabel="Table with Selection">
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={selected.length === sampleData.length}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((row, index) => (
              <TableRow
                key={row.id}
                isEven={index % 2 === 0}
                isSelected={selected.includes(row.id)}
              >
                <TableCell>
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onCheckedChange={() => toggleSelection(row.id)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const StickyColumns: Story = {
  render: () => (
    <div style={{ padding: "var(--spacing-style-spacing-4px-6-24px)", maxWidth: "800px", overflow: "auto" }}>
      <Table ariaLabel="Table with Sticky Columns">
        <TableHeader>
          <TableRow>
            <TableHead sticky>ID</TableHead>
            <TableHead sticky stickyOffset={48}>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row, index) => (
            <TableRow key={row.id} isEven={index % 2 === 0}>
              <TableCell sticky>{row.id}</TableCell>
              <TableCell sticky stickyOffset={48}>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>Engineering</TableCell>
              <TableCell>San Francisco</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const Sortable: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = useState<"name" | "role" | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const toggleSort = (column: "name" | "role") => {
      if (sortColumn === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    };

    const sortedData = [...sampleData].sort((a, b) => {
      if (!sortColumn) return 0;
      const aVal = a[sortColumn].toLowerCase();
      const bVal = b[sortColumn].toLowerCase();
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return (
      <div style={{ padding: "var(--spacing-style-spacing-4px-6-24px)" }}>
        <Table ariaLabel="Sortable Table">
          <TableHeader>
            <TableRow>
              <TableHead sortable onClick={() => toggleSort("name")}>
                Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead sortable onClick={() => toggleSort("role")}>
                Role {sortColumn === "role" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={row.id} isEven={index % 2 === 0}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const States: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ padding: "var(--spacing-style-spacing-4px-6-24px)" }}>
      <Table ariaLabel="Table States">
        <TableHeader>
          <TableRow>
            <TableHead>State</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow isEven={false}>
            <TableCell>Odd Row</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow isEven={true}>
            <TableCell>Even Row</TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
          <TableRow isEven={false} isSelected>
            <TableCell>Selected Row</TableCell>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
          <TableRow isEven={true}>
            <TableCell>Even Row (Hover)</TableCell>
            <TableCell>Alice Williams</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const EmptyState: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story: "Empty state example showing how to handle tables with no data. Provides a user-friendly message when no rows are available.",
      },
    },
  },
  render: () => (
    <div style={{ padding: "var(--spacing-style-spacing-4px-6-24px)" }}>
      <Table ariaLabel="Empty Table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} style={{ textAlign: "center", padding: "var(--spacing-24)" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--spacing-8)",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--fonts-semantic-sm)",
                    color: "var(--semantic-text-secondary)",
                    margin: 0,
                  }}
                >
                  No data available
                </p>
                <p
                  style={{
                    fontSize: "var(--fonts-semantic-sm)",
                    color: "var(--semantic-text-muted)",
                    margin: 0,
                  }}
                >
                  There are no items to display at this time.
                </p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const LongContent: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story: "Example showing how the table handles long content. Text truncation and overflow handling for cells with extensive content.",
      },
    },
  },
  render: () => {
    const longData = [
      {
        id: "1",
        name: "John Doe with a very long name that might overflow",
        role: "Administrator",
        email: "john.doe.with.a.very.long.email.address@example.com",
        description: "This is a very long description that demonstrates how the table handles extended text content in cells.",
      },
      {
        id: "2",
        name: "Jane Smith",
        role: "User",
        email: "jane@example.com",
        description: "Normal length description.",
      },
      {
        id: "3",
        name: "Bob Johnson",
        role: "Super Administrator with Extended Role Title",
        email: "bob@example.com",
        description: "Another example of long content that might need special handling in table cells.",
      },
    ];

    return (
      <div style={{ padding: "var(--spacing-style-spacing-4px-6-24px)", maxWidth: "800px" }}>
        <Table ariaLabel="Table with Long Content">
          <TableHeader>
            <TableRow>
              <TableHead style={{ minWidth: "200px" }}>Name</TableHead>
              <TableHead style={{ minWidth: "150px" }}>Role</TableHead>
              <TableHead style={{ minWidth: "250px" }}>Email</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {longData.map((row, index) => (
              <TableRow key={row.id} isEven={index % 2 === 0}>
                <TableCell
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={row.name}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  style={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={row.role}
                >
                  {row.role}
                </TableCell>
                <TableCell
                  style={{
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={row.email}
                >
                  {row.email}
                </TableCell>
                <TableCell
                  style={{
                    maxWidth: "300px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={row.description}
                >
                  {row.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

