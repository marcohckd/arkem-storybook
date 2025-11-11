import type { Meta, StoryObj } from "@storybook/react";
import {
  Settings,
  Database,
  Shield,
  FileText,
  BarChart3,
  Users,
  Globe,
  Server,
  Lock,
  Key,
  Code,
  Terminal,
  Network,
  HardDrive,
  Cloud,
  Activity,
  Zap,
  Search,
  Filter,
  Download,
  Upload,
  Mail,
  MessageSquare,
  Bell,
  Calendar,
} from "lucide-react";
import { UserManagementTable, type User, type Module } from "./UserManagementTable";

const meta: Meta<typeof UserManagementTable> = {
  title: "Pages/UserManagementTable",
  component: UserManagementTable,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-fill-neutral-600)', minHeight: '100vh', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
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

const mockModules: Module[] = [
  { id: "settings", name: "Settings", icon: Settings },
  { id: "database", name: "Database", icon: Database },
  { id: "security", name: "Security", icon: Shield },
  { id: "documents", name: "Documents", icon: FileText },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "users", name: "Users", icon: Users },
  { id: "network", name: "Network", icon: Globe },
];

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

export const Default: Story = {
  args: {
    users: mockUsers,
    modules: mockModules,
    pageSize: 10,
    onUserEdit: (user) => {
      console.log("Edit user:", user);
    },
    onBulkUpdate: (userIds) => {
      console.log("Bulk update users:", userIds);
    },
    onBulkActivate: (userIds) => {
      console.log("Bulk activate/deactivate users:", userIds);
    },
    onBulkExport: (userIds) => {
      console.log("Export users:", userIds);
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Default table view with sample users, module access columns, and data access controls. Shows the full feature set including sorting, pagination, and row actions.",
      },
    },
  },
};

export const WithSelection: Story = {
  args: {
    users: mockUsers,
    modules: mockModules,
    pageSize: 10,
    onUserEdit: (user) => {
      console.log("Edit user:", user);
    },
    onBulkUpdate: (userIds) => {
      console.log("Bulk update users:", userIds);
    },
    onBulkActivate: (userIds) => {
      console.log("Bulk activate/deactivate users:", userIds);
    },
    onBulkExport: (userIds) => {
      console.log("Export users:", userIds);
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Select users to see the batch actions toolbar appear.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    users: [],
    modules: mockModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Table displays an empty state message when no users are available.",
      },
    },
  },
};

export const Sorting: Story = {
  args: {
    users: mockUsers,
    modules: mockModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Click on column headers (Name, Role) to sort the table.",
      },
    },
  },
};

export const Pagination: Story = {
  args: {
    users: mockUsers,
    modules: mockModules,
    pageSize: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "Table paginates users based on the pageSize prop. This example shows 5 users per page.",
      },
    },
  },
};

export const LargeDataset: Story = {
  args: {
    users: [
      ...mockUsers,
      ...mockUsers.map((u, i) => ({ ...u, id: `${u.id}-${i + 13}`, name: `${u.name} ${i + 2}` })),
      ...mockUsers.map((u, i) => ({ ...u, id: `${u.id}-${i + 25}`, name: `${u.name} ${i + 3}` })),
    ],
    modules: mockModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Table handles large datasets with pagination. Scroll to see sticky columns in action.",
      },
    },
  },
};

// Additional module sets for variations
const manyModules: Module[] = [
  { id: "settings", name: "Settings", icon: Settings },
  { id: "database", name: "Database", icon: Database },
  { id: "security", name: "Security", icon: Shield },
  { id: "documents", name: "Documents", icon: FileText },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "users", name: "Users", icon: Users },
  { id: "network", name: "Network", icon: Globe },
  { id: "server", name: "Server", icon: Server },
  { id: "lock", name: "Lock", icon: Lock },
  { id: "key", name: "Key Management", icon: Key },
  { id: "code", name: "Code", icon: Code },
  { id: "terminal", name: "Terminal", icon: Terminal },
  { id: "network2", name: "Network 2", icon: Network },
  { id: "harddrive", name: "Storage", icon: HardDrive },
  { id: "cloud", name: "Cloud", icon: Cloud },
  { id: "activity", name: "Activity", icon: Activity },
  { id: "zap", name: "Performance", icon: Zap },
  { id: "search", name: "Search", icon: Search },
  { id: "filter", name: "Filter", icon: Filter },
  { id: "download", name: "Download", icon: Download },
  { id: "upload", name: "Upload", icon: Upload },
  { id: "mail", name: "Mail", icon: Mail },
  { id: "message", name: "Messages", icon: MessageSquare },
  { id: "bell", name: "Notifications", icon: Bell },
  { id: "calendar", name: "Calendar", icon: Calendar },
];

const fewModules: Module[] = [
  { id: "settings", name: "Settings", icon: Settings },
  { id: "database", name: "Database", icon: Database },
  { id: "security", name: "Security", icon: Shield },
];

const generateManyUsers = (count: number): User[] => {
  const names = [
    "John Doe", "Jane Smith", "Bob Johnson", "Alice Williams", "Charlie Brown",
    "Diana Prince", "Edward Norton", "Fiona Apple", "George Lucas", "Helen Mirren",
    "Ian McKellen", "Julia Roberts", "Kevin Spacey", "Laura Linney", "Michael Caine",
    "Natalie Portman", "Oscar Isaac", "Penelope Cruz", "Quentin Tarantino", "Rachel Weisz",
    "Samuel Jackson", "Tilda Swinton", "Uma Thurman", "Viggo Mortensen", "Willem Dafoe",
  ];
  const roles: ("admin" | "user")[] = ["admin", "user"];
  const allModuleIds = manyModules.map(m => m.id);
  
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ""),
    role: roles[i % roles.length],
    modules: allModuleIds.filter((_, idx) => Math.random() > 0.5),
    recordLimit: Math.floor(Math.random() * 20000) + 1000,
    timeWindowDays: [7, 14, 30, 60, 90, 120, 180][Math.floor(Math.random() * 7)],
    maskShodan: Math.random() > 0.5,
    hashIdentifiers: Math.random() > 0.5,
    aiAssistant: Math.random() > 0.5,
  }));
};

export const ManyModules: Story = {
  args: {
    users: mockUsers.slice(0, 8),
    modules: manyModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Table with many module columns (24 modules). Horizontal scrolling is required. Actions column stays sticky on the right.",
      },
    },
  },
};

export const FewModules: Story = {
  args: {
    users: mockUsers,
    modules: fewModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Table with only 3 module columns. No horizontal scrolling needed unless viewport is very narrow.",
      },
    },
  },
};

export const ManyUsers: Story = {
  args: {
    users: generateManyUsers(50),
    modules: mockModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Table with 50 users. Pagination is essential. Test scrolling behavior with many rows.",
      },
    },
  },
};

export const AllAdmins: Story = {
  args: {
    users: mockUsers.map(u => ({ ...u, role: "admin" as const })),
    modules: mockModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "All users have admin role. Badge styling is consistent across all rows.",
      },
    },
  },
};

export const AllRegularUsers: Story = {
  args: {
    users: mockUsers.map(u => ({ ...u, role: "user" as const })),
    modules: mockModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "All users have regular user role. Badge styling shows secondary variant.",
      },
    },
  },
};

export const LongNames: Story = {
  args: {
    users: [
      { ...mockUsers[0], name: "Dr. Christopher Alexander Montgomery III" },
      { ...mockUsers[1], name: "Professor Elizabeth Victoria St. James-Wellington" },
      { ...mockUsers[2], name: "Sir William Henry Fitzpatrick O'Brien" },
      { ...mockUsers[3], name: "Lady Margaret Rose Thompson-Harrington" },
      { ...mockUsers[4], name: "Count Alessandro Giovanni De Medici" },
    ],
    modules: mockModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Users with very long names. Test column width handling and text overflow.",
      },
    },
  },
};

export const NarrowViewport: Story = {
  args: {
    users: mockUsers,
    modules: manyModules.slice(0, 12),
    pageSize: 10,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Table in narrow mobile viewport. Horizontal scrolling is required. Actions column remains sticky.",
      },
    },
  },
};

export const TabletViewport: Story = {
  args: {
    users: mockUsers,
    modules: manyModules.slice(0, 15),
    pageSize: 10,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Table in tablet viewport. Moderate horizontal scrolling may be needed.",
      },
    },
  },
};

export const MaximumModules: Story = {
  args: {
    users: mockUsers.slice(0, 5),
    modules: manyModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Maximum number of module columns (24). Extreme horizontal scrolling scenario. Actions column stays visible.",
      },
    },
  },
};

export const SingleUser: Story = {
  args: {
    users: [mockUsers[0]],
    modules: mockModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Table with a single user. Minimal data scenario.",
      },
    },
  },
};

export const ExtremeData: Story = {
  args: {
    users: [
      { ...mockUsers[0], recordLimit: 999999, timeWindowDays: 365, maskShodan: true, hashIdentifiers: true, aiAssistant: true },
      { ...mockUsers[1], recordLimit: 1, timeWindowDays: 1, maskShodan: false, hashIdentifiers: false, aiAssistant: false },
      { ...mockUsers[2], recordLimit: 500000, timeWindowDays: 180, maskShodan: true, hashIdentifiers: false, aiAssistant: true },
    ],
    modules: manyModules.slice(0, 18),
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Extreme data values - very high/low record limits, long time windows. Test number formatting and display.",
      },
    },
  },
};

export const ScrollbarStyling: Story = {
  args: {
    users: mockUsers,
    modules: manyModules,
    pageSize: 10,
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: `## Custom Scrollbar Styling

This story demonstrates the custom-styled horizontal scrollbar with token-based colors.

### Scrollbar Features:
- **Thin scrollbar** (8px height) for minimal visual footprint
- **Token-based colors** using semantic design tokens
- **Hover states** - scrollbar thumb becomes more visible on hover
- **Active states** - scrollbar thumb highlights when dragging
- **Cross-browser support**:
  - Firefox: Uses \`scrollbar-color\` and \`scrollbar-width: thin\`
  - Chrome/Safari/Edge: Uses \`::-webkit-scrollbar\` pseudo-elements

### Scrollbar Colors:
- **Track**: \`--semantic-background-base\` (#080808)
- **Thumb**: \`--semantic-border-muted\` (#212121)
- **Thumb Hover**: \`--semantic-border-subtle\` (#2d2d2d)
- **Thumb Active**: \`--semantic-border-strong\` (#e5e5e5)

### Testing:
1. Resize the viewport to make the table narrower
2. Observe the horizontal scrollbar appearing at the bottom
3. Hover over the scrollbar thumb to see the hover state
4. Click and drag the scrollbar to see the active state
5. Notice how the Actions column remains sticky on the right during scroll

The scrollbar styling maintains consistency with the dark theme and provides clear visual feedback for user interaction.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px", maxWidth: "100%", margin: "0 auto" }}>
        <div style={{ 
          padding: "var(--spacing-style-spacing-4px-4-16px)", 
          background: "var(--semantic-background-base)", 
          borderRadius: "var(--radius-md)",
          marginBottom: "var(--spacing-style-spacing-4px-4-16px)",
          border: "1px solid var(--semantic-border-subtle)"
        }}>
          <p style={{ 
            color: "var(--semantic-text-secondary)", 
            fontSize: "var(--fonts-semantic-sm)",
            margin: 0 
          }}>
            <strong>Scrollbar Demo:</strong> This container is constrained to 600px width to force horizontal scrolling. 
            Scroll horizontally to see the custom-styled scrollbar and sticky Actions column.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const ScrollbarDemo: Story = {
  args: {
    users: mockUsers.slice(0, 5),
    modules: manyModules,
    pageSize: 10,
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: `# Scrollbar Styling Demo

This story is specifically designed to showcase the custom scrollbar styling and behavior.

## Scrollbar Implementation

The scrollbar uses token-based styling for consistent theming:

\`\`\`css
.arkem-user-table__container {
  scrollbar-color: var(--semantic-border-muted) var(--semantic-background-base);
  scrollbar-width: thin;
}

.arkem-user-table__container::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.arkem-user-table__container::-webkit-scrollbar-track {
  background: var(--semantic-background-base);
  border-radius: var(--radius-sm);
}

.arkem-user-table__container::-webkit-scrollbar-thumb {
  background: var(--semantic-border-muted);
  border-radius: var(--radius-sm);
  border: 1px solid var(--semantic-background-base);
}

.arkem-user-table__container::-webkit-scrollbar-thumb:hover {
  background: var(--semantic-border-subtle);
}

.arkem-user-table__container::-webkit-scrollbar-thumb:active {
  background: var(--semantic-border-strong);
}
\`\`\`

## Interactive Testing

1. **Observe the scrollbar**: The horizontal scrollbar appears at the bottom when content overflows
2. **Hover interaction**: Move your mouse over the scrollbar thumb - it becomes lighter
3. **Drag interaction**: Click and drag the scrollbar - it becomes bright (#e5e5e5) when active
4. **Scroll behavior**: Use mouse wheel, trackpad, or drag the scrollbar to scroll horizontally
5. **Sticky column**: Notice the Actions column remains visible on the right during scroll

## Design Tokens Used

- \`--semantic-background-base\`: Scrollbar track background
- \`--semantic-border-muted\`: Default scrollbar thumb color
- \`--semantic-border-subtle\`: Hover state color
- \`--semantic-border-strong\`: Active/dragging state color
- \`--radius-sm\`: Border radius for rounded scrollbar

## Browser Compatibility

- ✅ Chrome/Edge: Full support via \`::-webkit-scrollbar\`
- ✅ Safari: Full support via \`::-webkit-scrollbar\`
- ✅ Firefox: Uses \`scrollbar-color\` and \`scrollbar-width\`
- ✅ All browsers: Fallback to default scrollbar if custom styling not supported`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <div style={{ 
          padding: "var(--spacing-16)", 
          background: "var(--semantic-background-raised)", 
          borderRadius: "var(--radius-md)",
          marginBottom: "var(--spacing-16)",
          border: "1px solid var(--semantic-border-subtle)"
        }}>
          <h3 style={{ 
            color: "var(--semantic-text-primary)", 
            fontSize: "var(--fonts-semantic-lg)",
            fontWeight: "var(--font-weight-semibold)",
            margin: "0 0 var(--spacing-8) 0"
          }}>
            Scrollbar Styling Showcase
          </h3>
          <p style={{ 
            color: "var(--semantic-text-secondary)", 
            fontSize: "var(--fonts-semantic-md)",
            margin: "0 0 var(--spacing-12) 0",
            lineHeight: "1.5"
          }}>
            This demo uses a constrained width container to force horizontal scrolling. 
            The table contains 24 module columns, ensuring the scrollbar is always visible.
          </p>
          <div style={{
            display: "flex",
            gap: "var(--spacing-12)",
            flexWrap: "wrap",
            marginTop: "var(--spacing-12)"
          }}>
            <div style={{
              padding: "var(--spacing-8) var(--spacing-12)",
              background: "var(--semantic-background-base)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--semantic-border-muted)"
            }}>
              <div style={{ 
                color: "var(--semantic-text-muted)", 
                fontSize: "var(--fonts-semantic-xs)",
                textTransform: "uppercase",
                letterSpacing: "var(--letter-spacing-normal)",
                marginBottom: "var(--spacing-4)"
              }}>
                Container Width
              </div>
              <div style={{ 
                color: "var(--semantic-text-primary)", 
                fontSize: "var(--fonts-semantic-md)",
                fontWeight: "var(--font-weight-semibold)"
              }}>
                500px
              </div>
            </div>
            <div style={{
              padding: "var(--spacing-8) var(--spacing-12)",
              background: "var(--semantic-background-base)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--semantic-border-muted)"
            }}>
              <div style={{ 
                color: "var(--semantic-text-muted)", 
                fontSize: "var(--fonts-semantic-xs)",
                textTransform: "uppercase",
                letterSpacing: "var(--letter-spacing-normal)",
                marginBottom: "var(--spacing-4)"
              }}>
                Module Columns
              </div>
              <div style={{ 
                color: "var(--semantic-text-primary)", 
                fontSize: "var(--fonts-semantic-md)",
                fontWeight: "var(--font-weight-semibold)"
              }}>
                24 columns
              </div>
            </div>
            <div style={{
              padding: "var(--spacing-8) var(--spacing-12)",
              background: "var(--semantic-background-base)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--semantic-border-muted)"
            }}>
              <div style={{ 
                color: "var(--semantic-text-muted)", 
                fontSize: "var(--fonts-semantic-xs)",
                textTransform: "uppercase",
                letterSpacing: "var(--letter-spacing-normal)",
                marginBottom: "var(--spacing-4)"
              }}>
                Scrollbar Height
              </div>
              <div style={{ 
                color: "var(--semantic-text-primary)", 
                fontSize: "var(--fonts-semantic-md)",
                fontWeight: "var(--font-weight-semibold)"
              }}>
                8px
              </div>
            </div>
          </div>
        </div>
        <div style={{ 
          width: "500px", 
          maxWidth: "100%", 
          margin: "0 auto",
          border: "2px dashed var(--semantic-border-subtle)",
          borderRadius: "var(--radius-md)",
          padding: "var(--spacing-8)",
          background: "var(--semantic-background-base)"
        }}>
          <div style={{
            textAlign: "center",
            color: "var(--semantic-text-muted)",
            fontSize: "var(--fonts-semantic-xs)",
            textTransform: "uppercase",
            letterSpacing: "var(--letter-spacing-normal)",
            marginBottom: "var(--spacing-8)"
          }}>
            Constrained Container (500px)
          </div>
          <Story />
        </div>
      </div>
    ),
  ],
};


