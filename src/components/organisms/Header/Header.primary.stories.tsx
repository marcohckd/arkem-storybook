// src/components/Header/Header.primary.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import { Settings, X } from "lucide-react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header/Primary",
  component: Header,
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
        component: `Primary headers are compact navigation elements using semantic typography and small button sizing, ideal for secondary navigation and section headers.

## Hierarchy

- **Primary**: Uses Semantic/sm typography (12px) with 8px padding
- **Button size**: Small (sm, 32px height)
- **Height**: Derived from button height + 2×8px padding (48px total)
- **Ideal for**: Secondary navigation, section headers, compact interfaces, modal sub-headers

## Features

- Flexible action buttons: feature (0-2), function (0-2), close (boolean)
- Custom right slot support for additional content
- Full-width layout with consistent spacing
- 2px gap between grouped action buttons
- Accessible with proper ARIA labels
- Responsive to viewport changes

## Usage

Primary headers are perfect for:
- Sub-navigation within sections
- Table or list headers
- Modal sub-headers
- Compact interface sections
- Section dividers with actions

\\\`\\\`\\\`tsx
// Basic header
<Header hierarchy="primary" label="Section Title" />

// With action buttons
<Header 
  hierarchy="primary" 
  label="Documents" 
  featureCount={1}
  functionCount={1}
  close={true}
/>

// With custom right slot
<Header 
  hierarchy="primary" 
  label="Settings"
  rightSlot={<CustomComponent />}
/>
\\\`\\\`\\\`

## Action Button Rules

- **featureCount**: 0-2 feature buttons (brand-colored icons)
- **functionCount**: 0-2 function buttons (neutral icons)
- **close**: Single close button (always "X" icon)
- Maximum 5 buttons total (2 feature + 2 function + 1 close)
- All buttons use 2px spacing between them

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
- **Font Size**: \`var(--fonts-semantic-sm)\` -> \`var(--typography-mode-1-font-size-12)\` -> 12px
- **Font Weight**: \`var(--font-weight-medium)\` -> \`var(--typography-mode-1-font-weight-medium)\` -> 500
- **Text Color**: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
- **Background**: \`var(--semantic-background-base)\` -> #080808
- **Border**: \`var(--semantic-border-subtle)\` -> #2D2D2D (bottom border)
- **Button Size**: Small (sm, 32px height)

## Accessibility

- Proper ARIA labels for all action buttons
- Keyboard navigation support
- Screen reader announcements for header content
- Focus management for action buttons

## Design Tokens

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value |
|----------|---------------|-----------------|--------|
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | IBM Plex Sans |
| Font Size | \`--fonts-semantic-sm\` | \`--typography-mode-1-font-size-12\` | 12px |
| Font Weight | \`--font-weight-medium\` | \`--typography-mode-1-font-weight-medium\` | 500 |
| Text | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 |
| Background | \`--semantic-background-base\` | — | #080808 |
| Border | \`--semantic-border-subtle\` | — | #2D2D2D |
| Padding | \`--spacing-8\` | \`--spacing-style-spacing-4px-2-8px\` | 8px |

### Key Tokens Used

- \`--fonts-semantic-sm\`: Header label text size
- \`--font-weight-medium\`: Header label weight
- \`--semantic-text-primary\`: Label text color
- \`--semantic-background-base\`: Background color
- \`--semantic-border-subtle\`: Border color
- \`--spacing-8\`: Internal padding (8px)

Use the **Playground** to customize all header properties, or view the **States** story to see all button combination variants.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    hierarchy: {
      control: "radio",
      options: ["primary"],
      description: "Header hierarchy variant",
    },
    label: {
      control: "text",
      description: "Header label text",
    },
    rightSlot: {
      control: false,
      description: "Optional right-side slot for icons or actions",
    },
    featureCount: {
      control: { type: "number", min: 0, max: 2, step: 1 },
      description: "Number of feature buttons (0-2)",
    },
    functionCount: {
      control: { type: "number", min: 0, max: 2, step: 1 },
      description: "Number of function buttons (0-2)",
    },
    close: {
      control: "boolean",
      description: "Show close button",
    },
  },
  args: {
    hierarchy: "primary",
    label: "Header Label",
    featureCount: 0,
    functionCount: 0,
    close: false,
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Playground: Story = {
  render: (args) => <Header {...args} />,
};

export const HeaderPrimary: Story = {
  tags: ['!dev'],
  args: {
    hierarchy: "primary",
    label: "Primary Header",
  },
};

export const WithRightSlot: Story = {
  tags: ['!dev'],
  args: {
    hierarchy: "primary",
    label: "Primary Header with Actions",
    rightSlot: (
      <>
        <Settings />
        <X />
      </>
    ),
  },
};

export const WithFeatureButtons: Story = {
  tags: ['!dev'],
  args: {
    hierarchy: "primary",
    label: "Primary Header with Feature",
    featureCount: 1,
  },
};

export const WithFunctionButtons: Story = {
  tags: ['!dev'],
  args: {
    hierarchy: "primary",
    label: "Primary Header with Function",
    functionCount: 1,
  },
};

export const WithCloseButton: Story = {
  tags: ['!dev'],
  args: {
    hierarchy: "primary",
    label: "Primary Header with Close",
    close: true,
  },
};

export const AllButtonTypes: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-0)" }}>
      <Header hierarchy="primary" label="Feature only" featureCount={1} />
      <Header hierarchy="primary" label="Function only" functionCount={1} />
      <Header hierarchy="primary" label="Close only" close={true} />
      <Header hierarchy="primary" label="Feature + Function" featureCount={1} functionCount={1} />
      <Header hierarchy="primary" label="Feature + Close" featureCount={1} close={true} />
      <Header hierarchy="primary" label="Function + Close" functionCount={1} close={true} />
      <Header hierarchy="primary" label="All types (max)" featureCount={2} functionCount={2} close={true} />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", width: "100%" }}>
      <div style={{ width: "100%" }}>
        <Header hierarchy="primary" label="Default" />
      </div>
      <div style={{ width: "100%" }}>
        <Header hierarchy="primary" label="1 Feature" featureCount={1} />
      </div>
      <div style={{ width: "100%" }}>
        <Header hierarchy="primary" label="1 Function" functionCount={1} />
      </div>
      <div style={{ width: "100%" }}>
        <Header hierarchy="primary" label="Close" close={true} />
      </div>
      <div style={{ width: "100%" }}>
        <Header hierarchy="primary" label="All" featureCount={2} functionCount={2} close={true} />
      </div>
    </div>
  ),
};

