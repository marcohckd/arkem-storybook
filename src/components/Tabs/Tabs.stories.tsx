// src/components/Tabs/Tabs.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Tabs

Tab navigation component built with Radix UI primitives and styled with ARKEM Design System tokens.

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

Use the **Playground** to customize all tab properties.`,
      },
    },
  },
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
          <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
            Modules tab content
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
            Geography tab content
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
            Limits tab content
          </div>
        </TabsContent>
        <TabsContent value="tab4">
          <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
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
            <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
              Content for Tab 1 (Current: {value})
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
              Content for Tab 2 (Current: {value})
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
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
          <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
            Modules content
          </div>
        </TabsContent>
        <TabsContent value="geography">
          <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
            Geography content
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const DisabledTab: Story = {
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
          <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
            Enabled tab content
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
            This tab is disabled
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div style={{ padding: "var(--spacing-12, 12px)", color: "var(--semantic-text-primary)" }}>
            Another enabled tab content
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

