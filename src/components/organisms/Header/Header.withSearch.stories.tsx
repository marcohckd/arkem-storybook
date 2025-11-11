// src/components/Header/Header.withSearch.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Search, Filter } from "lucide-react";

import { Header } from "./Header";
import { Input } from "../../atoms/Input/Input";
import { Dropdown } from "../../molecules/Dropdown/Dropdown";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header/With Search",
  component: Header,
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
        component: `Headers with integrated search input and filter dropdown, ideal for data tables, lists, and content management interfaces.

## Features

- **Search Input**: Integrated search field with leading search icon
- **Filter Dropdown**: Filter options dropdown with customizable options
- **Flexible Layout**: Search and filter positioned in the right slot
- **Responsive**: Adapts to both primary and secondary hierarchies
- **Accessible**: Full keyboard navigation and ARIA support

## Usage

Perfect for:
- Data tables with searchable content
- List views with filtering
- Content management interfaces
- Searchable collections
- Filterable data views

\\\`\\\`\\\`tsx
<Header
  hierarchy="secondary"
  label="Users"
  rightSlot={
    <>
      <Input
        size="md"
        placeholder="Search users..."
        iconLeading={<Search size={16} />}
      />
      <Dropdown
        size="md"
        options={[
          { value: "all", label: "All Users" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        placeholder="Filter"
      />
    </>
  }
/>
\\\`\\\`\\\`

## Size Matching

- **Primary Header**: Use Input/Dropdown size "sm" (32px) to match button size
- **Secondary Header**: Use Input/Dropdown size "md" (40px) to match button size

The search and filter components automatically align with the header's button sizing for visual consistency.

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

- **Header Typography**: Inherits from hierarchy (Primary: semantic-sm -> 12px, Secondary: display-xs -> 24px)
- **Input/Dropdown**: Matches header button sizing
- **Text Color**: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
- **Background**: \`var(--semantic-background-base)\` -> #080808

## Accessibility

- Full keyboard navigation for search and filter
- ARIA labels for all interactive elements
- Screen reader support for search results
- Focus management between header elements

## Design Tokens

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value |
|----------|---------------|-----------------|--------|
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | IBM Plex Sans |
| Text | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 |
| Background | \`--semantic-background-base\` | — | #080808 |
| Header Typography | Inherited from hierarchy | See Primary/Secondary stories | — |

### Key Tokens Used

- Header tokens (inherited from hierarchy - see Primary/Secondary stories)
- Input/Dropdown tokens matching button sizes
- \`--semantic-text-primary\`: Text colors
- \`--semantic-background-base\`: Background color
- \`--spacing-*\`: Spacing between search and filter elements`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    hierarchy: {
      control: "radio",
      options: ["primary", "secondary"],
      description: "Header hierarchy variant",
    },
    label: {
      control: "text",
      description: "Header label text",
    },
    rightSlot: {
      control: false,
      description: "Search and filter components",
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

// Interactive wrapper component for stories
const HeaderWithSearchWrapper = ({
  hierarchy,
  label,
  featureCount,
  functionCount,
  close,
  searchPlaceholder = "Search...",
  filterOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ],
  filterPlaceholder = "Filter",
}: {
  hierarchy?: "primary" | "secondary";
  label: string;
  featureCount?: number;
  functionCount?: number;
  close?: boolean;
  searchPlaceholder?: string;
  filterOptions?: Array<{ value: string; label: string }>;
  filterPlaceholder?: string;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const inputSize = hierarchy === "primary" ? "sm" : "md";
  const dropdownSize = hierarchy === "primary" ? "sm" : "md";

  return (
    <Header
      hierarchy={hierarchy}
      label={label}
      featureCount={featureCount}
      functionCount={functionCount}
      close={close}
      rightSlot={
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8, 8px)", minWidth: "300px" }}>
          <div style={{ flex: "1", minWidth: "200px" }}>
            <Input
              size={inputSize}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              iconLeading={<Search size={16} />}
              ariaLabel="Search"
            />
          </div>
          <div style={{ minWidth: "120px" }}>
            <Dropdown
              size={dropdownSize}
              options={filterOptions}
              value={filterValue}
              onChange={setFilterValue}
              placeholder={filterPlaceholder}
              ariaLabel="Filter"
            />
          </div>
        </div>
      }
    />
  );
};

export const Playground: Story = {
  render: (args) => <HeaderWithSearchWrapper {...args} />,
};

export const SecondaryWithSearch: Story = {
  tags: ['!dev'],
  render: () => (
    <HeaderWithSearchWrapper
      hierarchy="secondary"
      label="Users"
      searchPlaceholder="Search users..."
      filterOptions={[
        { value: "all", label: "All Users" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ]}
      filterPlaceholder="Filter by status"
    />
  ),
};

export const PrimaryWithSearch: Story = {
  tags: ['!dev'],
  render: () => (
    <HeaderWithSearchWrapper
      hierarchy="primary"
      label="Documents"
      searchPlaceholder="Search documents..."
      filterOptions={[
        { value: "all", label: "All" },
        { value: "recent", label: "Recent" },
        { value: "archived", label: "Archived" },
      ]}
      filterPlaceholder="Filter"
    />
  ),
};

export const WithActions: Story = {
  tags: ['!dev'],
  render: () => (
    <HeaderWithSearchWrapper
      hierarchy="secondary"
      label="Products"
      searchPlaceholder="Search products..."
      filterOptions={[
        { value: "all", label: "All Categories" },
        { value: "electronics", label: "Electronics" },
        { value: "clothing", label: "Clothing" },
        { value: "books", label: "Books" },
      ]}
      filterPlaceholder="Category"
      featureCount={1}
      functionCount={1}
      close={true}
    />
  ),
};

export const MinimalSearch: Story = {
  tags: ['!dev'],
  render: () => {
    const [searchValue, setSearchValue] = useState("");
    return (
      <Header
        hierarchy="secondary"
        label="Search"
        rightSlot={
          <div style={{ minWidth: "300px" }}>
            <Input
              size="md"
              placeholder="Search anything..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              iconLeading={<Search size={16} />}
              ariaLabel="Search"
            />
          </div>
        }
      />
    );
  },
};

export const FilterOnly: Story = {
  tags: ['!dev'],
  render: () => {
    const [filterValue, setFilterValue] = useState("");
    return (
      <Header
        hierarchy="secondary"
        label="Content"
        rightSlot={
          <div style={{ minWidth: "200px" }}>
            <Dropdown
              size="md"
              options={[
                { value: "all", label: "All Content" },
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
                { value: "archived", label: "Archived" },
              ]}
              value={filterValue}
              onChange={setFilterValue}
              placeholder="Filter by status"
              ariaLabel="Filter"
            />
          </div>
        }
      />
    );
  },
};

export const States: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0", width: "100%" }}>
      <div style={{ width: "100%" }}>
        <HeaderWithSearchWrapper
          hierarchy="secondary"
          label="Default State"
          searchPlaceholder="Search..."
          filterPlaceholder="Filter"
        />
      </div>
      <div style={{ width: "100%" }}>
        <HeaderWithSearchWrapper
          hierarchy="primary"
          label="Primary Hierarchy"
          searchPlaceholder="Search..."
          filterPlaceholder="Filter"
        />
      </div>
      <div style={{ width: "100%" }}>
        <HeaderWithSearchWrapper
          hierarchy="secondary"
          label="With Actions"
          searchPlaceholder="Search..."
          filterPlaceholder="Filter"
          featureCount={1}
          functionCount={1}
          close={true}
        />
      </div>
    </div>
  ),
};

