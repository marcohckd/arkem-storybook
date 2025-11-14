import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, type DataTableColumn } from "./DataTable";
import { Badge } from "../../atoms/Badge";

const meta: Meta<typeof DataTable> = {
  title: "Organisms/Table",
  component: DataTable,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Generic DataTable component with selection, sorting, and pagination.

## Features

- Configurable columns with custom cell renderers
- Row selection with batch actions
- Column sorting
- Pagination
- Empty state handling
- Token-based styling

## Usage

\`\`\`tsx
<DataTable
  data={users}
  columns={columns}
  getRowId={(user) => user.id}
  enableSelection
  enableSorting
  enablePagination
  batchActions={[
    { label: "Delete", onClick: (ids) => handleDelete(ids) }
  ]}
/>
\`\`\``,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

interface SampleUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
}

const sampleUsers: SampleUser[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", status: "active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "user", status: "inactive" },
  { id: "4", name: "Alice Williams", email: "alice@example.com", role: "admin", status: "active" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "user", status: "active" },
];

const basicColumns: DataTableColumn<SampleUser>[] = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name,
    sortable: true,
  },
  {
    id: "email",
    header: "Email",
    accessor: (row) => row.email,
    sortable: true,
  },
  {
    id: "role",
    header: "Role",
    accessor: (row) => row.role,
    cell: (row) => (
      <Badge variant={row.role === "admin" ? "default" : "secondary"}>
        {row.role}
      </Badge>
    ),
    sortable: true,
    align: "center",
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ padding: "var(--spacing-24)" }}>
      <DataTable
        data={sampleUsers}
        columns={basicColumns}
        getRowId={(user) => user.id}
        enableSelection={false}
        enableSorting={true}
        enablePagination={false}
      />
    </div>
  ),
};

export const WithSelection: Story = {
  render: () => (
    <div style={{ padding: "var(--spacing-24)" }}>
      <DataTable
        data={sampleUsers}
        columns={basicColumns}
        getRowId={(user) => user.id}
        enableSelection={true}
        enableSorting={true}
        enablePagination={false}
        batchActions={[
          {
            label: "Delete",
            icon: "Trash2",
            onClick: (ids) => console.log("Delete", ids),
          },
        ]}
      />
    </div>
  ),
};

export const WithPagination: Story = {
  render: () => (
    <div style={{ padding: "var(--spacing-24)" }}>
      <DataTable
        data={sampleUsers}
        columns={basicColumns}
        getRowId={(user) => user.id}
        enableSelection={true}
        enableSorting={true}
        enablePagination={true}
        pageSize={2}
        batchActions={[
          {
            label: "Export",
            icon: "Download",
            onClick: (ids) => console.log("Export", ids),
          },
        ]}
      />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div style={{ padding: "var(--spacing-24)" }}>
      <DataTable
        data={[]}
        columns={basicColumns}
        getRowId={(user) => user.id}
        emptyMessage="No users found"
      />
    </div>
  ),
};
