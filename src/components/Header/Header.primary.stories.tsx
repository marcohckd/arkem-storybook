// src/components/Header/Header.primary.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import { Settings, X } from "lucide-react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header/Primary",
  component: Header,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Header - Primary Hierarchy

Primary headers are compact navigation elements using semantic typography and small button sizing, ideal for secondary navigation and section headers.

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

Use the **Playground** to customize all header properties, or view the **States** story to see all button combination variants.`,
      },
    },
  },
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
        <Settings size={16} />
        <X size={16} />
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
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
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

