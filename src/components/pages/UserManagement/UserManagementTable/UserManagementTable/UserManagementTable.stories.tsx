import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Network,
  LocateFixed,
  ScanSearch,
} from "lucide-react";
import { UserManagementTable, type User, type Module } from "./UserManagementTable";
import { Drawer } from "../../../../organisms/Drawer/Drawer";

const meta: Meta<typeof UserManagementTable> = {
  title: "Pages/UserManagementTable",
  component: UserManagementTable,
  decorators: [
    (Story) => (
      <div style={{ 
        backgroundColor: 'var(--semantic-background-base)', 
        minHeight: '100vh', 
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    padding: "var(--spacing-0)",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `A specialized table component for managing users with module access, data access controls, and batch operations.

## Features

- Batch selection and actions
- Sortable columns (name, role)
- Sticky Actions column (right side) - remains visible during horizontal scroll
- Horizontal scrolling with custom styled scrollbar
- Module access columns with icons and tooltips
- Data access columns (Record Limit, Time Window, etc.)
- Pagination support
- Row actions (edit)
- Empty state handling
- Responsive design with token-based styling

## Usage

\`\`\`tsx
<UserManagementTable
  users={users}
  modules={modules}
  onUserEdit={(user) => console.log("Edit", user)}
  onBulkUpdate={(ids) => console.log("Bulk update", ids)}
  pageSize={10}
/>
\`\`\`

## Responsive Behavior

The table supports horizontal scrolling when content exceeds the viewport width. The Actions column remains sticky on the right side, ensuring quick access to row actions even when scrolling through many module columns.
`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserManagementTable>;

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    role: "admin",
    modules: ["settings", "database", "security", "documents", "analytics", "users", "network"],
    recordLimit: 10000,
    timeWindowDays: 90,
    maskShodan: true,
    hashIdentifiers: true,
    aiAssistant: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "user",
    modules: ["documents", "analytics"],
    recordLimit: 5000,
    timeWindowDays: 30,
    maskShodan: false,
    hashIdentifiers: false,
    aiAssistant: false,
  },
  {
    id: "3",
    name: "Bob Johnson",
    role: "user",
    modules: ["database", "security", "documents"],
    recordLimit: 3000,
    timeWindowDays: 60,
    maskShodan: true,
    hashIdentifiers: false,
    aiAssistant: true,
  },
  {
    id: "4",
    name: "Alice Williams",
    role: "admin",
    modules: ["settings", "database", "security", "users", "network"],
    recordLimit: 15000,
    timeWindowDays: 120,
    maskShodan: true,
    hashIdentifiers: true,
    aiAssistant: true,
  },
  {
    id: "5",
    name: "Charlie Brown",
    role: "user",
    modules: ["analytics", "documents"],
    recordLimit: 2000,
    timeWindowDays: 14,
    maskShodan: false,
    hashIdentifiers: false,
    aiAssistant: false,
  },
  {
    id: "6",
    name: "Diana Prince",
    role: "user",
    modules: ["security", "network"],
    recordLimit: 8000,
    timeWindowDays: 45,
    maskShodan: true,
    hashIdentifiers: true,
    aiAssistant: false,
  },
  {
    id: "7",
    name: "Edward Norton",
    role: "admin",
    modules: ["settings", "database", "security", "documents", "analytics", "users", "network"],
    recordLimit: 20000,
    timeWindowDays: 180,
    maskShodan: true,
    hashIdentifiers: true,
    aiAssistant: true,
  },
  {
    id: "8",
    name: "Fiona Apple",
    role: "user",
    modules: ["documents"],
    recordLimit: 1000,
    timeWindowDays: 7,
    maskShodan: false,
    hashIdentifiers: false,
    aiAssistant: false,
  },
  {
    id: "9",
    name: "George Lucas",
    role: "user",
    modules: ["analytics", "users"],
    recordLimit: 6000,
    timeWindowDays: 30,
    maskShodan: true,
    hashIdentifiers: false,
    aiAssistant: true,
  },
  {
    id: "10",
    name: "Helen Mirren",
    role: "admin",
    modules: ["settings", "database", "security"],
    recordLimit: 12000,
    timeWindowDays: 90,
    maskShodan: true,
    hashIdentifiers: true,
    aiAssistant: false,
  },
  {
    id: "11",
    name: "Ian McKellen",
    role: "user",
    modules: ["network", "documents", "analytics"],
    recordLimit: 4000,
    timeWindowDays: 21,
    maskShodan: false,
    hashIdentifiers: true,
    aiAssistant: true,
  },
  {
    id: "12",
    name: "Julia Roberts",
    role: "user",
    modules: ["documents", "analytics"],
    recordLimit: 2500,
    timeWindowDays: 14,
    maskShodan: false,
    hashIdentifiers: false,
    aiAssistant: false,
  },
];

const fewModules: Module[] = [
  { id: "settings", name: "Connections", icon: Network },
  { id: "database", name: "Tracer", icon: LocateFixed },
  { id: "security", name: "Monitor Mode", icon: ScanSearch },
];

export const Default: Story = {
  render: (args) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
      <>
        <UserManagementTable
          {...args}
          users={mockUsers}
          modules={fewModules}
          pageSize={10}
          headerLabel="User Management"
          onBack={() => {
            console.log("Back clicked");
          }}
          onClose={() => {
            console.log("Close clicked");
          }}
          onUserEdit={(user) => {
            setSelectedUser(user);
            setDrawerOpen(true);
          }}
          onBulkUpdate={(userIds) => {
            console.log("Bulk update users:", userIds);
          }}
          onBulkActivate={(userIds) => {
            console.log("Bulk activate/deactivate users:", userIds);
          }}
          onBulkExport={(userIds) => {
            console.log("Export users:", userIds);
          }}
        />
        {selectedUser && (
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            user={{
              name: selectedUser.name,
              email: `${selectedUser.name.toLowerCase().replace(" ", ".")}@example.com`,
              role: selectedUser.role,
            }}
            initialEnabledModules={selectedUser.modules as any}
            onSave={(payload) => {
              console.log("Save payload:", payload);
              setDrawerOpen(false);
            }}
          />
        )}
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Table with only 3 module columns. No horizontal scrolling needed unless viewport is very narrow. Includes a secondary header with back and close buttons that spans full width. Click the pencil icon to open the UserConfigDrawer.",
      },
    },
  },
};

