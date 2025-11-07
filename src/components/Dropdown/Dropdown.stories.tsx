// src/components/Dropdown/Dropdown.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Dropdown

Dropdown select component for choosing from a list of options, styled with ARKEM Design System tokens to match Button typography and color tokens.

## Features

- **Three sizes**: \`sm\` (32px), \`md\` (40px), \`lg\` (48px) - matching Button sizes
- **Typography**: Uses semantic font scale matching Button component
- **Colors**: Uses semantic color tokens matching Button styling
- **Keyboard Navigation**: Arrow keys, Enter, Escape support
- **States**: Default, hover, focused, disabled, open
- **Accessible**: Full ARIA support and keyboard navigation

## Typography & Colors

- **Font**: \`var(--font-family-base)\` (IBM Plex Sans)
- **Font Size**: \`var(--fonts-semantic-sm/md/lg)\` based on size
- **Font Weight**: \`var(--font-weight-regular)\` default, \`var(--font-weight-medium)\` on hover/focus/selected
- **Text Color**: \`var(--semantic-text-primary)\`
- **Background**: \`var(--semantic-background-interactive)\`
- **Border**: \`var(--semantic-border-subtle)\` with brand focus ring
- **Selected Option**: \`var(--semantic-brand-base)\` text color

## Usage

\\\`\\\`\\\`tsx
// Basic dropdown
<Dropdown
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]}
  placeholder="Select an option..."
/>

// Controlled dropdown
<Dropdown
  options={options}
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  placeholder="Choose..."
/>

// With disabled options
<Dropdown
  options={[
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive", disabled: true },
  ]}
/>
\\\`\\\`\\\`

Use the **Playground** to customize all dropdown properties, or view the **States** story to see all interaction states.`,
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Dropdown size (matches Button sizes)",
    },
    options: {
      control: "object",
      description: "Array of dropdown options",
    },
    value: {
      control: "text",
      description: "Selected value (controlled)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
    },
    disabled: {
      control: "boolean",
      description: "Disable the dropdown",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility",
    },
  },
  args: {
    size: "md",
    placeholder: "Select...",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <Dropdown {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Default: Story = {
  tags: ['!dev'],
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <Dropdown
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
          value={value}
          onChange={setValue}
          placeholder="Select an option..."
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  tags: ['!dev'],
  render: () => {
    const [smValue, setSmValue] = useState("");
    const [mdValue, setMdValue] = useState("");
    const [lgValue, setLgValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", width: "300px" }}>
        <Dropdown
          size="sm"
          options={[
            { value: "sm1", label: "Small Option 1" },
            { value: "sm2", label: "Small Option 2" },
          ]}
          value={smValue}
          onChange={setSmValue}
          placeholder="Small (32px)"
        />
        <Dropdown
          size="md"
          options={[
            { value: "md1", label: "Medium Option 1" },
            { value: "md2", label: "Medium Option 2" },
          ]}
          value={mdValue}
          onChange={setMdValue}
          placeholder="Medium (40px)"
        />
        <Dropdown
          size="lg"
          options={[
            { value: "lg1", label: "Large Option 1" },
            { value: "lg2", label: "Large Option 2" },
          ]}
          value={lgValue}
          onChange={setLgValue}
          placeholder="Large (48px)"
        />
      </div>
    );
  },
};

export const WithManyOptions: Story = {
  tags: ['!dev'],
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <Dropdown
          options={[
            { value: "1", label: "First Option" },
            { value: "2", label: "Second Option" },
            { value: "3", label: "Third Option" },
            { value: "4", label: "Fourth Option" },
            { value: "5", label: "Fifth Option" },
            { value: "6", label: "Sixth Option" },
            { value: "7", label: "Seventh Option" },
            { value: "8", label: "Eighth Option" },
            { value: "9", label: "Ninth Option" },
            { value: "10", label: "Tenth Option" },
          ]}
          value={value}
          onChange={setValue}
          placeholder="Select from many options..."
        />
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  tags: ['!dev'],
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <Dropdown
          options={[
            { value: "active", label: "Active" },
            { value: "pending", label: "Pending", disabled: true },
            { value: "inactive", label: "Inactive", disabled: true },
            { value: "archived", label: "Archived" },
          ]}
          value={value}
          onChange={setValue}
          placeholder="Select status..."
        />
      </div>
    );
  },
};

export const States: Story = {
  tags: ['!dev'],
  render: () => {
    const [defaultValue, setDefaultValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("option2");
    const [disabledValue] = useState("option1");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", width: "300px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--semantic-text-secondary)" }}>
            Default (no selection)
          </label>
          <Dropdown
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
            ]}
            value={defaultValue}
            onChange={setDefaultValue}
            placeholder="Select..."
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--semantic-text-secondary)" }}>
            With Selection
          </label>
          <Dropdown
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
            ]}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Select..."
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--semantic-text-secondary)" }}>
            Disabled
          </label>
          <Dropdown
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
            ]}
            value={disabledValue}
            disabled
            placeholder="Select..."
          />
        </div>
      </div>
    );
  },
};

export const FilterExamples: Story = {
  tags: ['!dev'],
  render: () => {
    const [statusValue, setStatusValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", width: "300px" }}>
        <Dropdown
          options={[
            { value: "all", label: "All Status" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          value={statusValue}
          onChange={setStatusValue}
          placeholder="Filter by status"
          ariaLabel="Status filter"
        />
        <Dropdown
          options={[
            { value: "all", label: "All Categories" },
            { value: "electronics", label: "Electronics" },
            { value: "clothing", label: "Clothing" },
            { value: "books", label: "Books" },
            { value: "food", label: "Food" },
          ]}
          value={categoryValue}
          onChange={setCategoryValue}
          placeholder="Filter by category"
          ariaLabel="Category filter"
        />
        <Dropdown
          options={[
            { value: "newest", label: "Newest First" },
            { value: "oldest", label: "Oldest First" },
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
          ]}
          value={sortValue}
          onChange={setSortValue}
          placeholder="Sort by"
          ariaLabel="Sort order"
        />
      </div>
    );
  },
};

export const AllVariations: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
  render: () => {
    const [smValue, setSmValue] = useState("");
    const [mdValue, setMdValue] = useState("");
    const [lgValue, setLgValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px" }}>
        <div>
          <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 500, color: "var(--semantic-text-primary)" }}>
            Small (32px)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Dropdown
              size="sm"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]}
              value={smValue}
              onChange={setSmValue}
              placeholder="Small dropdown"
            />
            <Dropdown
              size="sm"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]}
              value="1"
              disabled
              placeholder="Disabled"
            />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 500, color: "var(--semantic-text-primary)" }}>
            Medium (40px)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Dropdown
              size="md"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]}
              value={mdValue}
              onChange={setMdValue}
              placeholder="Medium dropdown"
            />
            <Dropdown
              size="md"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]}
              value="1"
              disabled
              placeholder="Disabled"
            />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 500, color: "var(--semantic-text-primary)" }}>
            Large (48px)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Dropdown
              size="lg"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]}
              value={lgValue}
              onChange={setLgValue}
              placeholder="Large dropdown"
            />
            <Dropdown
              size="lg"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]}
              value="1"
              disabled
              placeholder="Disabled"
            />
          </div>
        </div>
      </div>
    );
  },
};

