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
import { Checkbox } from "./stubs";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Table

A reusable table component with support for selection, sorting, sticky columns, and various row states.

## Features

- Semantic HTML table structure
- Row states: even/odd, hover, selected
- Sticky column support
- Sortable headers
- Token-based styling
- Accessible with ARIA attributes

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
`,
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

