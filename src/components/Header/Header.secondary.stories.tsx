// src/components/Header/Header.secondary.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import { Settings, X } from "lucide-react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header/Secondary",
  component: Header,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Header - Secondary Hierarchy

Secondary headers are prominent navigation elements using display typography and medium button sizing, ideal for main page headers and modal headers.

## Hierarchy

- **Secondary**: Uses Display/xs typography (24px) with 16px padding
- **Button size**: Medium (md, 40px height)
- **Height**: Derived from button height + 2×16px padding (72px total)
- **Ideal for**: Main page headers, modal headers, primary navigation, prominent sections

## Features

- Flexible action buttons: feature (0-2), function (0-2), close (boolean)
- Custom right slot support for additional content
- Full-width layout with consistent spacing
- 2px gap between grouped action buttons
- Accessible with proper ARIA labels
- Responsive to viewport changes

## Usage

Secondary headers are perfect for:
- Main page headers
- Modal and dialog headers
- Primary section navigation
- Prominent interface sections
- Application-level headers

\\\`\\\`\\\`tsx
// Basic header
<Header hierarchy="secondary" label="Page Title" />

// Modal header with actions
<Header 
  hierarchy="secondary" 
  label="Edit Document" 
  featureCount={1}
  functionCount={1}
  close={true}
/>

// With custom right slot
<Header 
  hierarchy="secondary" 
  label="Dashboard"
  rightSlot={<SearchBar />}
  close={true}
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
      options: ["secondary"],
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
    hierarchy: "secondary",
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

export const HeaderSecondary: Story = {
  tags: ['!dev'],
  args: {
    hierarchy: "secondary",
    label: "Secondary Header",
  },
};

export const WithRightSlot: Story = {
  tags: ['!dev'],
  args: {
    hierarchy: "secondary",
    label: "Secondary Header with Actions",
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
    hierarchy: "secondary",
    label: "Secondary Header with Feature",
    featureCount: 1,
  },
};

export const WithFunctionButtons: Story = {
  tags: ['!dev'],
  args: {
    hierarchy: "secondary",
    label: "Secondary Header with Function",
    functionCount: 1,
  },
};

export const WithCloseButton: Story = {
  tags: ['!dev'],
  args: {
    hierarchy: "secondary",
    label: "Secondary Header with Close",
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
      <Header hierarchy="secondary" label="Feature only" featureCount={1} />
      <Header hierarchy="secondary" label="Function only" functionCount={1} />
      <Header hierarchy="secondary" label="Close only" close={true} />
      <Header hierarchy="secondary" label="Feature + Function" featureCount={1} functionCount={1} />
      <Header hierarchy="secondary" label="Feature + Close" featureCount={1} close={true} />
      <Header hierarchy="secondary" label="Function + Close" functionCount={1} close={true} />
      <Header hierarchy="secondary" label="All types (max)" featureCount={2} functionCount={2} close={true} />
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
        <Header hierarchy="secondary" label="Default" />
      </div>
      <div style={{ width: "100%" }}>
        <Header hierarchy="secondary" label="1 Feature" featureCount={1} />
      </div>
      <div style={{ width: "100%" }}>
        <Header hierarchy="secondary" label="1 Function" functionCount={1} />
      </div>
      <div style={{ width: "100%" }}>
        <Header hierarchy="secondary" label="Close" close={true} />
      </div>
      <div style={{ width: "100%" }}>
        <Header hierarchy="secondary" label="All" featureCount={2} functionCount={2} close={true} />
      </div>
    </div>
  ),
};

