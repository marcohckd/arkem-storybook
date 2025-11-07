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
import { UserManagementTable, type User, type Module } from "../UserManagementTable/UserManagementTable";

const meta: Meta<typeof UserManagementTable> = {
  title: "Components/Scrollbar",
  component: UserManagementTable,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Custom Scrollbar Styling

A dedicated showcase for the token-based scrollbar styling used in the UserManagementTable component.

## Features

- **8px thin scrollbar** for minimal visual footprint
- **Token-based colors** that adapt to theme
- **Interactive states**: hover and active/drag states
- **Cross-browser support** with fallbacks

## Implementation

The scrollbar uses semantic design tokens for consistent theming:

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

## Design Tokens

- \`--semantic-background-base\`: Scrollbar track background (#080808)
- \`--semantic-border-muted\`: Default scrollbar thumb color (#212121)
- \`--semantic-border-subtle\`: Hover state color (#2d2d2d)
- \`--semantic-border-strong\`: Active/dragging state color (#e5e5e5)
- \`--radius-sm\`: Border radius for rounded scrollbar

## Browser Compatibility

- ✅ Chrome/Edge: Full support via \`::-webkit-scrollbar\`
- ✅ Safari: Full support via \`::-webkit-scrollbar\`
- ✅ Firefox: Uses \`scrollbar-color\` and \`scrollbar-width\`
- ✅ All browsers: Fallback to default scrollbar if custom styling not supported`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserManagementTable>;

// Mock data for scrollbar demonstration
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
];

export const Default: Story = {
  args: {
    users: mockUsers,
    modules: manyModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: `# Scrollbar Showcase

This story demonstrates the custom-styled horizontal scrollbar with token-based colors.

## Interactive Testing

1. **Observe the scrollbar**: The horizontal scrollbar appears at the bottom when content overflows
2. **Hover interaction**: Move your mouse over the scrollbar thumb - it becomes lighter
3. **Drag interaction**: Click and drag the scrollbar - it becomes bright (#e5e5e5) when active
4. **Scroll behavior**: Use mouse wheel, trackpad, or drag the scrollbar to scroll horizontally
5. **Sticky column**: Notice the Actions column remains visible on the right during scroll

The scrollbar styling maintains consistency with the dark theme and provides clear visual feedback for user interaction.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: "400px", 
        maxWidth: "100vw",
        margin: "0 auto",
        padding: "var(--spacing-16)"
      }}>
        <div style={{
          marginBottom: "var(--spacing-16)",
          padding: "var(--spacing-12)",
          background: "var(--semantic-background-raised)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--semantic-border-subtle)"
        }}>
          <h2 style={{
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-xl)",
            fontWeight: "var(--font-weight-bold)",
            margin: "0 0 var(--spacing-8) 0"
          }}>
            Scrollbar Showcase
          </h2>
          <p style={{
            color: "var(--semantic-text-secondary)",
            fontSize: "var(--fonts-semantic-sm)",
            margin: "0 0 var(--spacing-12) 0",
            lineHeight: "1.6"
          }}>
            This container is set to 400px width to force horizontal scrolling. 
            The scrollbar uses design tokens for consistent theming.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--spacing-8)",
            marginTop: "var(--spacing-12)"
          }}>
            <div style={{
              textAlign: "center",
              padding: "var(--spacing-8)",
              background: "var(--semantic-background-base)",
              borderRadius: "var(--radius-sm)"
            }}>
              <div style={{
                color: "var(--semantic-text-muted)",
                fontSize: "var(--fonts-semantic-xs)",
                marginBottom: "var(--spacing-4)"
              }}>
                Width
              </div>
              <div style={{
                color: "var(--semantic-text-primary)",
                fontSize: "var(--fonts-semantic-lg)",
                fontWeight: "var(--font-weight-semibold)"
              }}>
                400px
              </div>
            </div>
            <div style={{
              textAlign: "center",
              padding: "var(--spacing-8)",
              background: "var(--semantic-background-base)",
              borderRadius: "var(--radius-sm)"
            }}>
              <div style={{
                color: "var(--semantic-text-muted)",
                fontSize: "var(--fonts-semantic-xs)",
                marginBottom: "var(--spacing-4)"
              }}>
                Columns
              </div>
              <div style={{
                color: "var(--semantic-text-primary)",
                fontSize: "var(--fonts-semantic-lg)",
                fontWeight: "var(--font-weight-semibold)"
              }}>
                24
              </div>
            </div>
            <div style={{
              textAlign: "center",
              padding: "var(--spacing-8)",
              background: "var(--semantic-background-base)",
              borderRadius: "var(--radius-sm)"
            }}>
              <div style={{
                color: "var(--semantic-text-muted)",
                fontSize: "var(--fonts-semantic-xs)",
                marginBottom: "var(--spacing-4)"
              }}>
                Height
              </div>
              <div style={{
                color: "var(--semantic-text-primary)",
                fontSize: "var(--fonts-semantic-lg)",
                fontWeight: "var(--font-weight-semibold)"
              }}>
                8px
              </div>
            </div>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const NarrowContainer: Story = {
  args: {
    users: mockUsers,
    modules: manyModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Extremely narrow container (300px) to maximize scrollbar visibility and demonstrate scrolling behavior.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: "300px", 
        maxWidth: "100vw",
        margin: "0 auto",
        padding: "var(--spacing-16)"
      }}>
        <div style={{
          marginBottom: "var(--spacing-12)",
          padding: "var(--spacing-8)",
          background: "var(--semantic-background-raised)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--semantic-border-subtle)",
          textAlign: "center"
        }}>
          <div style={{
            color: "var(--semantic-text-muted)",
            fontSize: "var(--fonts-semantic-xs)",
            marginBottom: "var(--spacing-4)"
          }}>
            Container Width
          </div>
          <div style={{
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-lg)",
            fontWeight: "var(--font-weight-semibold)"
          }}>
            300px
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const WideContainer: Story = {
  args: {
    users: mockUsers,
    modules: manyModules,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Wider container (600px) showing scrollbar behavior with more visible content before scrolling is needed.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: "600px", 
        maxWidth: "100vw",
        margin: "0 auto",
        padding: "var(--spacing-16)"
      }}>
        <div style={{
          marginBottom: "var(--spacing-12)",
          padding: "var(--spacing-8)",
          background: "var(--semantic-background-raised)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--semantic-border-subtle)",
          textAlign: "center"
        }}>
          <div style={{
            color: "var(--semantic-text-muted)",
            fontSize: "var(--fonts-semantic-xs)",
            marginBottom: "var(--spacing-4)"
          }}>
            Container Width
          </div>
          <div style={{
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-lg)",
            fontWeight: "var(--font-weight-semibold)"
          }}>
            600px
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
};

