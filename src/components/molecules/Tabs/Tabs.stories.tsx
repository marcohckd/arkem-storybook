// src/components/Tabs/Tabs.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import * as React from "react";
import { Info } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import { FormField } from "../FormField/FormField";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../organisms/Table";
import "../../organisms/Modal/Modal.css";

// Helper component for Device Information style tabs
const DeviceInfoStyleTabs: React.FC<{
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div style={{
      display: 'flex',
      borderBottom: 'var(--border-width-thin) solid var(--semantic-border-muted)',
      background: 'var(--semantic-background-raised)',
      flexShrink: 0
    }}>
      {tabs.map((tab, idx) => {
        const [isHovered, setIsHovered] = React.useState(false);
        const isActive = activeTab === tab;
        
        return (
          <div
            key={tab}
            onClick={() => onTabChange(tab)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              flex: 1,
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--fonts-semantic-xs)',
              color: isActive 
                ? 'var(--semantic-text-primary)' 
                : isHovered 
                  ? 'var(--semantic-text-hover)' 
                  : 'var(--semantic-text-secondary-ii)',
              background: isActive 
                ? 'var(--semantic-background-raised)' 
                : isHovered 
                  ? 'var(--semantic-background-action-hover)' 
                  : 'var(--semantic-background-base)',
              borderRight: idx < tabs.length - 1 
                ? 'var(--border-widths-mode-1-border-width-hairline) solid var(--semantic-border-muted)' 
                : 'none',
              cursor: 'pointer',
              transition: 'color var(--transition-fast), background var(--transition-fast)',
              fontWeight: isActive 
                ? 'var(--font-weight-medium)' 
                : 'var(--font-weight-regular)'
            }}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
};

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
  render: () => {
    const [activeTab, setActiveTab] = useState("Modules");
    const tabs = ["Modules", "Geography", "Limits", "Privacy"];
    
    return (
      <div style={{ width: "500px" }}>
        <DeviceInfoStyleTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
          {activeTab === "Modules" && "Modules tab content"}
          {activeTab === "Geography" && "Geography tab content"}
          {activeTab === "Limits" && "Limits tab content"}
          {activeTab === "Privacy" && "Privacy tab content"}
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("Tab 1");
    const tabs = ["Tab 1", "Tab 2", "Tab 3"];
    
    return (
      <div style={{ width: "500px" }}>
        <DeviceInfoStyleTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
          Content for {activeTab} (Current: {activeTab})
        </div>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("Modules");
    const tabs = ["Modules", "Geography"];
    
    return (
      <div style={{ width: "500px" }}>
        <DeviceInfoStyleTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
          {activeTab === "Modules" && "Modules content"}
          {activeTab === "Geography" && "Geography content"}
        </div>
      </div>
    );
  },
};

export const DisabledTab: Story = {
  tags: ['!dev'],
  render: () => {
    const [activeTab, setActiveTab] = useState("Enabled Tab");
    const tabs = ["Enabled Tab", "Disabled Tab", "Another Enabled Tab"];
    
    return (
      <div style={{ width: "500px" }}>
        <div style={{
          display: 'flex',
          borderBottom: 'var(--border-width-thin) solid var(--semantic-border-muted)',
          background: 'var(--semantic-background-raised)',
          flexShrink: 0
        }}>
          {tabs.map((tab, idx) => {
            const [isHovered, setIsHovered] = React.useState(false);
            const isActive = activeTab === tab;
            const isDisabled = tab === "Disabled Tab";
            
            return (
              <div
                key={tab}
                onClick={() => !isDisabled && setActiveTab(tab)}
                onMouseEnter={() => !isDisabled && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  flex: 1,
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--fonts-semantic-xs)',
                  color: isDisabled
                    ? 'var(--semantic-text-muted)'
                    : isActive 
                      ? 'var(--semantic-text-primary)' 
                      : isHovered 
                        ? 'var(--semantic-text-hover)' 
                        : 'var(--semantic-text-secondary-ii)',
                  background: isActive 
                    ? 'var(--semantic-background-raised)' 
                    : isHovered && !isDisabled
                      ? 'var(--semantic-background-action-hover)' 
                      : 'var(--semantic-background-base)',
                  borderRight: idx < tabs.length - 1 
                    ? 'var(--border-widths-mode-1-border-width-hairline) solid var(--semantic-border-muted)' 
                    : 'none',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.5 : 1,
                  transition: 'color var(--transition-fast), background var(--transition-fast)',
                  fontWeight: isActive 
                    ? 'var(--font-weight-medium)' 
                    : 'var(--font-weight-regular)'
                }}
              >
                {tab}
              </div>
            );
          })}
        </div>
        <div style={{ padding: "var(--spacing-12)", color: "var(--semantic-text-primary)" }}>
          {activeTab === "Enabled Tab" && "Enabled tab content"}
          {activeTab === "Disabled Tab" && "This tab is disabled"}
          {activeTab === "Another Enabled Tab" && "Another enabled tab content"}
        </div>
      </div>
    );
  },
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
    const [activeTab, setActiveTab] = useState("Personal Info");
    const [personalEmail, setPersonalEmail] = useState("");
    const [personalName, setPersonalName] = useState("");
    const [accountPassword, setAccountPassword] = useState("");
    const [accountConfirm, setAccountConfirm] = useState("");
    const tabs = ["Personal Info", "Account Settings"];
    
    return (
      <div style={{ width: "500px" }}>
        <DeviceInfoStyleTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        {activeTab === "Personal Info" && (
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
        )}
        {activeTab === "Account Settings" && (
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
        )}
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
    const [activeTab, setActiveTab] = useState("Active Users");
    const tabs = ["Active Users", "Inactive Users"];
    
    const activeUsers = [
      { id: "1", name: "John Doe", role: "Admin", email: "john@example.com" },
      { id: "2", name: "Jane Smith", role: "User", email: "jane@example.com" },
    ];
    
    const inactiveUsers = [
      { id: "3", name: "Bob Johnson", role: "User", email: "bob@example.com" },
    ];
    
    return (
      <div style={{ width: "600px" }}>
        <DeviceInfoStyleTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        {activeTab === "Active Users" && (
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
        )}
        {activeTab === "Inactive Users" && (
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
        )}
      </div>
    );
  },
};

export const DeviceInformation: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Device Information variant with header, integrated tabs, and metric rows. This pattern features a tabbed interface with a header section containing an icon and title, with tab navigation using the Device Information style (background-based). Each tab displays metric rows with labels and values.",
      },
    },
  },
  render: () => {
    const [activeTab, setActiveTab] = useState('Identity');
    const tabs = ['Identity', 'Specs', 'Geolocation', 'Observations'];
    
    // Enrichment flags for conditional visibility
    const enrichmentFlags = {
      geo_country: true,
      geo_city: true,
    } as const;

    // Metric type definition
    type Metric = { key?: string; label: string; value?: string; error?: boolean; critical?: boolean };
    
    // Define content for each tab
    const tabContent: Record<string, Array<Metric>> = {
      Identity: [
        { label: 'DEVICE ID:', value: '0251E342-6E4D-4207-A1AD-DD0C3D9BF553' },
        { label: 'USER ID:', value: '6E4D' },
        { label: 'IP ADDRESS:', value: '192.168.1.100' }
      ],
      Specs: [
        { label: 'DEVICE MODEL:', value: 'iPhone 13 Pro' },
        { label: 'OS VERSION:', value: 'iOS 16.5.1' },
        { label: 'SCREEN SIZE:', value: '6.1 inches' }
      ],
      Geolocation: [
        { key: 'geo_country', label: 'COUNTRY:', value: 'Iran' },
        { key: 'geo_city', label: 'CITY:', value: 'Tehran' }
      ],
      Observations: [
        { label: 'FIRST SEEN:', value: '2024-01-15' },
        { label: 'LAST SEEN:', value: '2025-08-01' },
        { label: 'TOTAL EVENTS:', value: '247' }
      ]
    };

    // Render metric row with conditional visibility
    const renderMetricRow = (
      metric: Metric,
      idx: number,
      total: number,
    ) => {
      const isLast = idx === total - 1;
      const key = metric.key;
      const isAvailable = key ? enrichmentFlags[key as keyof typeof enrichmentFlags] : true;

      const displayValue = isAvailable && metric.value ? metric.value : 'N/A';
      const isEmpty = !isAvailable || !metric.value;

      return (
        <div
          key={idx}
          className={`arkem-modal__metric-row${isEmpty ? ' arkem-modal__metric-row--empty' : ''}`}
          style={{
            display: 'flex',
            height: '42px',
            background: 'var(--semantic-background-raised)',
            borderBottom: !isLast
              ? 'var(--border-widths-mode-1-border-width-hairline) solid var(--semantic-border-muted)'
              : 'none',
          }}
        >
          {/* label cell */}
          <div
            style={{
              width: '100px',
              padding: 'var(--spacing-style-spacing-4px-3-12px) var(--spacing-style-spacing-4px-4-16px)',
              display: 'flex',
              alignItems: 'center',
              fontSize: 'var(--fonts-semantic-xs)',
              color: 'var(--semantic-text-secondary)',
              textTransform: 'uppercase',
            }}
          >
            {metric.label}
          </div>
          {/* value cell */}
          <div
            style={{
              flex: 1,
              padding: 'var(--spacing-style-spacing-4px-3-12px) var(--spacing-style-spacing-4px-4-16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              fontSize: 'var(--fonts-semantic-xs)',
              color: isEmpty
                ? 'var(--semantic-text-muted)'
                : metric.error
                  ? 'var(--semantic-feedback-error-base)'
                  : 'var(--semantic-text-primary)',
              fontWeight: metric.critical && !isEmpty
                ? 'var(--font-weight-semibold)'
                : 'var(--font-weight-regular)',
              textAlign: 'right',
            }}
          >
            {displayValue}
          </div>
        </div>
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* Sticky Header */}
        <div className="arkem-modal__pane-header">
          <Info className="arkem-modal__pane-header-icon" size={16} />
          <span className="arkem-modal__pane-header-text">Device Information</span>
        </div>

        {/* Content Container */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Tabs */}
          <DeviceInfoStyleTabs 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          {/* Tab Content - Metric rows */}
          <div style={{ 
            background: 'var(--semantic-background-raised)',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}>
            {tabContent[activeTab].map((metric, idx) => 
              renderMetricRow(metric, idx, tabContent[activeTab].length)
            )}
          </div>
        </div>
      </div>
    );
  },
};

