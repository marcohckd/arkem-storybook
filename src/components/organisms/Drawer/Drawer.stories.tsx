// src/components/Drawer/Drawer.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../../atoms/Button/Button";
import { UserManagementTable, User } from "../../pages/UserManagementTable/UserManagementTable";

import { Drawer } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Organisms/Drawer",
  component: Drawer,
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
        component: `A comprehensive user configuration drawer that slides in from the right side, providing a tabbed interface for managing user access settings.

## Features

- **Fixed Width**: 430px (not responsive)
- **Full Height**: Extends from top to bottom of viewport
- **Inner Shadow**: Always applied using \`--shadow-inner-panel\` token
- **Sticky Header/Footer**: Header and footer remain visible while scrolling
- **Tabbed Interface**: Four tabs for Modules, Geography, Limits, and Privacy
- **State Management**: Tracks dirty state and enables/disables save button
- **Accessibility**: Full ARIA support with visually hidden labels

## Tabs

1. **Modules**: Enable/disable feature modules for the user
2. **Geography**: Filter and select geographic access regions
3. **Limits**: Configure query limits, storage limits, and time windows
4. **Privacy**: Toggle privacy settings (hash email/phone, mask IP/location)

## Integration

The drawer integrates with UserManagementTable - clicking the Edit button opens the drawer with the selected user's data.

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
- **Header**: Uses Header Secondary component (Display/xs typography)
- **Body Text**: \`var(--fonts-semantic-md)\` -> \`var(--typography-mode-1-font-size-16)\` -> 16px
- **Text Color**: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
- **Background**: \`var(--semantic-background-base)\` -> #080808
- **Inner Shadow**: \`var(--shadow-inner-panel)\` -> \`inset 4px 4px 28px 1px rgba(224, 221, 91, 0.29)\` (always applied)

## Usage

\`\`\`tsx
<Drawer
  open={isOpen}
  user={selectedUser}
  onSave={(data) => handleSave(data)}
  onClose={() => setIsOpen(false)}
/>
\`\`\`

## Accessibility

- Focus trap keeps keyboard focus within drawer
- ARIA roles and labels properly configured
- Screen reader support for tab navigation
- Keyboard shortcuts for tab switching

## Design Tokens

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value |
|----------|---------------|-----------------|--------|
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | IBM Plex Sans |
| Header Font Size | \`--fonts-display-xs\` | \`--typography-mode-1-font-size-24\` | 24px |
| Body Font Size | \`--fonts-semantic-md\` | \`--typography-mode-1-font-size-16\` | 16px |
| Text | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 |
| Background | \`--semantic-background-base\` | — | #080808 |
| Inner Shadow | \`--shadow-inner-panel\` | — | inset 4px 4px 28px 1px rgba(224, 221, 91, 0.29) |

### Key Tokens Used

- \`--fonts-display-xs\`: Header title size
- \`--fonts-semantic-md\`: Body text size
- \`--semantic-text-primary\`: Text color
- \`--semantic-background-base\`: Background color
- \`--shadow-inner-panel\`: Inner shadow effect
- \`--spacing-*\`: Internal padding and spacing`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls drawer visibility",
    },
    user: {
      control: "object",
      description: "User data to configure",
    },
    initialEnabledModules: {
      control: "object",
      description: "Initial enabled modules",
    },
    onSave: {
      action: "saved",
      description: "Callback when save is clicked",
    },
    onOpenChange: {
      action: "open changed",
      description: "Callback when drawer open state changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "admin",
};

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: "var(--spacing-12, 12px)" }}>
        <Button
          onClick={() => setOpen(!open)}
          size="md"
          hierarchy="primary"
          tone="grey"
        >
          {open ? "Close Drawer" : "Open UserConfigDrawer"}
        </Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          user={mockUser}
          initialEnabledModules={["monitor", "tracer"]}
          onSave={(payload) => {
            console.log("Save payload:", payload);
          }}
        />
      </div>
    );
  },
};

export const WithUserData: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: "var(--spacing-12, 12px)" }}>
        <Button
          onClick={() => setOpen(!open)}
          size="md"
          hierarchy="primary"
          tone="grey"
        >
          {open ? "Close Drawer" : "Open Drawer"}
        </Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          user={{
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "user",
          }}
          initialEnabledModules={["monitor", "network_graph", "profile"]}
          initialLimits={{
            query: 25000,
            storage: 250,
            window: "Weekly",
          }}
          initialPrivacy={{
            hashEmail: true,
            hashPhone: false,
            maskIP: true,
            maskLocation: false,
          }}
          onSave={(payload) => {
            console.log("Save payload:", payload);
          }}
        />
      </div>
    );
  },
};

export const SlideEffect: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: "var(--spacing-12, 12px)" }}>
        <div
          style={{
            marginBottom: "var(--spacing-16, 16px)",
            padding: "var(--spacing-16, 16px)",
            background: "var(--semantic-background-muted)",
            border: "1px solid var(--semantic-border-subtle)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <h3
            style={{
              fontSize: "var(--fonts-semantic-lg)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--semantic-text-primary)",
              marginBottom: "var(--spacing-8, 8px)",
            }}
          >
            Smooth Slide Animation
          </h3>
          <p
            style={{
              fontSize: "var(--fonts-semantic-sm)",
              color: "var(--semantic-text-secondary)",
              marginBottom: "var(--spacing-12, 12px)",
            }}
          >
            Click the button below to see the drawer slide in from the right with a smooth animation.
            The backdrop fades in simultaneously, and both animate out smoothly when closed.
          </p>
          <Button
            onClick={() => setOpen(!open)}
            size="md"
            hierarchy="primary"
            tone="grey"
          >
            {open ? "Close Drawer" : "Open Drawer"}
          </Button>
        </div>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          user={mockUser}
          initialEnabledModules={["monitor", "tracer"]}
          onSave={(payload) => {
            console.log("Save payload:", payload);
          }}
        />
      </div>
    );
  },
};

export const TabNavigation: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("modules");
    return (
      <div style={{ padding: "var(--spacing-12, 12px)" }}>
        <div style={{ marginBottom: "var(--spacing-12, 12px)", display: "flex", gap: "var(--spacing-8, 8px)" }}>
          <Button
            onClick={() => {
              setOpen(true);
              setActiveTab("modules");
            }}
            size="md"
            hierarchy="secondary"
            tone="grey"
          >
            Open Modules Tab
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
              setActiveTab("geography");
            }}
            size="md"
            hierarchy="secondary"
            tone="grey"
          >
            Open Geography Tab
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
              setActiveTab("limits");
            }}
            size="md"
            hierarchy="secondary"
            tone="grey"
          >
            Open Limits Tab
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
              setActiveTab("privacy");
            }}
            size="md"
            hierarchy="secondary"
            tone="grey"
          >
            Open Privacy Tab
          </Button>
        </div>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          user={mockUser}
          initialEnabledModules={["monitor"]}
          onSave={(payload) => {
            console.log("Save payload:", payload);
          }}
        />
      </div>
    );
  },
};

export const SaveCallback: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [lastSave, setLastSave] = useState<any>(null);
    return (
      <div style={{ padding: "var(--spacing-12, 12px)" }}>
        <Button
          onClick={() => setOpen(true)}
          size="md"
          hierarchy="primary"
          tone="grey"
        >
          Open Drawer
        </Button>
        {lastSave && (
          <div
            style={{
              marginTop: "var(--spacing-12, 12px)",
              padding: "var(--spacing-12, 12px)",
              background: "var(--semantic-background-muted)",
              border: "1px solid var(--semantic-border-subtle)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <h3 style={{ color: "var(--semantic-text-primary)", marginBottom: "var(--spacing-8, 8px)" }}>
              Last Save Payload:
            </h3>
            <pre
                style={{
                color: "var(--semantic-text-secondary)",
                    fontSize: "var(--fonts-semantic-sm)",
                overflow: "auto",
                  }}
                >
              {JSON.stringify(lastSave, null, 2)}
            </pre>
          </div>
        )}
        <Drawer
          open={open}
          onOpenChange={setOpen}
          user={mockUser}
          initialEnabledModules={["monitor", "tracer"]}
          onSave={(payload) => {
            setLastSave(payload);
            setOpen(false);
          }}
        />
        </div>
    );
  },
};

export const IntegratedWithTable: Story = {
  render: () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const mockUsers: User[] = [
      {
        id: "1",
        name: "John Doe",
        role: "admin",
        modules: ["monitor", "tracer"],
        recordLimit: 10000,
        timeWindowDays: 1,
        maskShodan: false,
        hashIdentifiers: true,
        aiAssistant: true,
      },
      {
        id: "2",
        name: "Jane Smith",
        role: "user",
        modules: ["monitor", "network_graph"],
        recordLimit: 5000,
        timeWindowDays: 7,
        maskShodan: true,
        hashIdentifiers: false,
        aiAssistant: false,
      },
    ];

    const mockModules = [
      { id: "monitor", name: "Monitor", icon: () => null },
      { id: "tracer", name: "Tracer", icon: () => null },
      { id: "network_graph", name: "Network Graph", icon: () => null },
    ];

    return (
      <div style={{ padding: "var(--spacing-12, 12px)" }}>
        <UserManagementTable
          users={mockUsers}
          modules={mockModules}
          onUserEdit={(user) => {
            setSelectedUser(user);
            setDrawerOpen(true);
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
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: "var(--spacing-12, 12px)" }}>
          <Button
          onClick={() => setOpen(true)}
            size="md"
            hierarchy="primary"
            tone="grey"
          >
          Open Drawer
          </Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          user={null}
          onSave={(payload) => {
            console.log("Save payload:", payload);
          }}
        />
      </div>
    );
  },
};
