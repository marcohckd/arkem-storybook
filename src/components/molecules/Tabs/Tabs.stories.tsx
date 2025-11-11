// src/components/Tabs/Tabs.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

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

