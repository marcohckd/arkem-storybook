// src/components/Tabs/Tabs.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import { FormField } from "../FormField/FormField";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../organisms/Table";

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Tab navigation component built with Radix UI primitives and styled with ARKEM Design System tokens.

## Features

- **Keyboard Navigation**: Arrow keys, Home/End (provided by Radix UI)
- **Accessibility**: Full ARIA tabs pattern support
- **Active State**: Brand-colored border and text
- **Inactive State**: Secondary text color
- **Focus Management**: Automatic focus handling

## Usage

\`\`\`tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
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
- **Font Size**: \`var(--fonts-semantic-md)\` -> \`var(--typography-mode-1-font-size-16)\` -> 16px
- **Font Weight**: \`var(--font-weight-medium)\` -> \`var(--typography-mode-1-font-weight-medium)\` -> 500
- **Active Tab Text**: \`var(--semantic-brand-base)\` -> #E0DD5B
- **Inactive Tab Text**: \`var(--semantic-text-secondary)\` -> \`var(--color-text-secondary)\` -> #838383
- **Active Tab Border**: \`var(--semantic-brand-base)\` -> #E0DD5B
- **Background**: Transparent

## Accessibility

- Full ARIA tabs pattern support (provided by Radix UI)
- Keyboard navigation: Arrow keys, Home/End
- Focus management: Automatic focus handling
- Screen reader announcements for tab changes

## Design Tokens

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value |
|----------|---------------|-----------------|--------|
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | IBM Plex Sans |
| Font Size | \`--fonts-semantic-md\` | \`--typography-mode-1-font-size-16\` | 16px |
| Font Weight | \`--font-weight-medium\` | \`--typography-mode-1-font-weight-medium\` | 500 |
| Active Tab Text | \`--semantic-brand-base\` | — | #E0DD5B |
| Inactive Tab Text | \`--semantic-text-secondary\` | \`--color-text-secondary\` | #838383 |
| Active Tab Border | \`--semantic-brand-base\` | — | #E0DD5B |
| Tab List Border | \`--semantic-border-subtle\` | — | #2D2D2D |

### Key Tokens Used

- \`--fonts-semantic-md\`: Tab text size
- \`--font-weight-medium\`: Tab text weight
- \`--semantic-brand-base\`: Active tab color
- \`--semantic-text-secondary\`: Inactive tab color
- \`--semantic-border-subtle\`: Tab list border

Use the **Playground** to customize all tab properties.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description: "Initial active tab value",
    },
    value: {
      control: "text",
      description: "Controlled active tab value",
    },
    onValueChange: {
      action: "value changed",
      description: "Callback when tab changes",
    },
    children: {
      control: false,
    },
    className: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default tab navigation with four tabs. Click tabs to switch between content panels.",
      },
    },
  },
  render: () => (
    <div style={{ width: "500px" }}>
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Modules</TabsTrigger>
          <TabsTrigger value="tab2">Geography</TabsTrigger>
          <TabsTrigger value="tab3">Limits</TabsTrigger>
          <TabsTrigger value="tab4">Privacy</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
            Modules tab content
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
            Geography tab content
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
            Limits tab content
          </div>
        </TabsContent>
        <TabsContent value="tab4">
          <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
            Privacy tab content
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("tab1");
    return (
      <div style={{ width: "500px" }}>
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
              Content for Tab 1 (Current: {value})
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
              Content for Tab 2 (Current: {value})
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
              Content for Tab 3 (Current: {value})
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <Tabs defaultValue="modules">
        <TabsList>
          <TabsTrigger value="modules">
            <span style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8, 8px)" }}>
              <span>Modules</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="geography">
            <span style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8, 8px)" }}>
              <span>Geography</span>
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="modules">
          <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
            Modules content
          </div>
        </TabsContent>
        <TabsContent value="geography">
          <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
            Geography content
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const DisabledTab: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ width: "500px" }}>
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Enabled Tab</TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            Disabled Tab
          </TabsTrigger>
          <TabsTrigger value="tab3">Another Enabled Tab</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
            Enabled tab content
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
            This tab is disabled
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
            Another enabled tab content
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const WithForm: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Tabs containing form content. Demonstrates how Tabs can organize multiple forms or form sections.",
      },
    },
  },
  render: () => {
    const [personalEmail, setPersonalEmail] = useState("");
    const [personalName, setPersonalName] = useState("");
    const [accountPassword, setAccountPassword] = useState("");
    const [accountConfirm, setAccountConfirm] = useState("");
    
    return (
      <div style={{ width: "500px" }}>
        <Tabs defaultValue="personal">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <div style={{ padding: "var(--spacing-12)", display: "flex", flexDirection: "column", gap: "var(--spacing-16)" }}>
              <FormField
                label="Full Name"
                placeholder="Enter your name"
                value={personalName}
                onChange={(e) => setPersonalName(e.target.value)}
              />
              <FormField
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={personalEmail}
                onChange={(e) => setPersonalEmail(e.target.value)}
              />
            </div>
          </TabsContent>
          <TabsContent value="account">
            <div style={{ padding: "var(--spacing-12)", display: "flex", flexDirection: "column", gap: "var(--spacing-16)" }}>
              <FormField
                label="New Password"
                placeholder="Enter new password"
                type="password"
                value={accountPassword}
                onChange={(e) => setAccountPassword(e.target.value)}
                helpText="Must be at least 8 characters"
              />
              <FormField
                label="Confirm Password"
                placeholder="Confirm password"
                type="password"
                value={accountConfirm}
                onChange={(e) => setAccountConfirm(e.target.value)}
                error={accountConfirm && accountPassword !== accountConfirm ? "Passwords do not match" : undefined}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const WithTable: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Tabs containing table content. Demonstrates how Tabs can organize different data views.",
      },
    },
  },
  render: () => {
    const activeUsers = [
      { id: "1", name: "John Doe", role: "Admin", email: "john@example.com" },
      { id: "2", name: "Jane Smith", role: "User", email: "jane@example.com" },
    ];
    
    const inactiveUsers = [
      { id: "3", name: "Bob Johnson", role: "User", email: "bob@example.com" },
    ];
    
    return (
      <div style={{ width: "600px" }}>
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Users</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Users</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div style={{ padding: "var(--spacing-12)" }}>
              <Table ariaLabel="Active users table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeUsers.map((row, index) => (
                    <TableRow key={row.id} isEven={index % 2 === 0}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="inactive">
            <div style={{ padding: "var(--spacing-12)" }}>
              <Table ariaLabel="Inactive users table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inactiveUsers.map((row, index) => (
                    <TableRow key={row.id} isEven={index % 2 === 0}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

