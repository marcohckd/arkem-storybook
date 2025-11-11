// src/components/Dropdown/Dropdown.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Molecules/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Dropdown select component for choosing from a list of options, styled with ARKEM Design System tokens to match Button typography and color tokens.

## Features

- **Three sizes**: \`sm\` (32px), \`md\` (40px), \`lg\` (48px) - matching Button sizes
- **Typography**: Uses semantic font scale matching Button component
- **Colors**: Uses semantic color tokens matching Button styling
- **Keyboard Navigation**: Arrow keys, Enter, Escape support
- **States**: Default, hover, focused, disabled, open
- **Accessible**: Full ARIA support and keyboard navigation

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
- **Font Size**: \`var(--fonts-semantic-sm/md/lg)\` based on size
  - \`sm\`: \`var(--fonts-semantic-sm)\` -> \`var(--typography-mode-1-font-size-12)\` -> 12px
  - \`md\`: \`var(--fonts-semantic-md)\` -> \`var(--typography-mode-1-font-size-16)\` -> 16px
  - \`lg\`: \`var(--fonts-semantic-lg)\` -> \`var(--typography-mode-1-font-size-18)\` -> 18px
- **Font Weight**: \`var(--font-weight-regular)\` -> \`var(--typography-mode-1-font-weight-regular)\` -> 400 (default), \`var(--font-weight-medium)\` -> \`var(--typography-mode-1-font-weight-medium)\` -> 500 (on hover/focus/selected)
- **Text Color**: \`var(--semantic-text-primary)\` -> \`var(--color-text-primary)\` -> #E5E5E5
- **Background**: \`var(--semantic-background-interactive)\` -> #5A5A5A
- **Border**: \`var(--semantic-border-subtle)\` -> #2D2D2D with brand focus ring
- **Selected Option**: \`var(--semantic-brand-base)\` -> #E0DD5B text color

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

## Accessibility

- Full keyboard navigation support (Arrow keys, Enter, Escape)
- Focus ring visible on keyboard focus (\`var(--semantic-focus-ring)\`)
- ARIA labels supported via \`ariaLabel\` prop
- Proper ARIA roles and states for dropdown menu
- Disabled state properly announced to screen readers
- Selected option announced when changed

## Design Tokens

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value |
|----------|---------------|-----------------|--------|
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | IBM Plex Sans |
| Font Size (sm) | \`--fonts-semantic-sm\` | \`--typography-mode-1-font-size-12\` | 12px |
| Font Size (md) | \`--fonts-semantic-md\` | \`--typography-mode-1-font-size-16\` | 16px |
| Font Size (lg) | \`--fonts-semantic-lg\` | \`--typography-mode-1-font-size-18\` | 18px |
| Font Weight (regular) | \`--font-weight-regular\` | \`--typography-mode-1-font-weight-regular\` | 400 |
| Font Weight (medium) | \`--font-weight-medium\` | \`--typography-mode-1-font-weight-medium\` | 500 |
| Text | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 |
| Selected Text | \`--semantic-brand-base\` | — | #E0DD5B |
| Background | \`--semantic-background-interactive\` | — | #5A5A5A |
| Border | \`--semantic-border-subtle\` | — | #2D2D2D |
| Focus Ring | \`--semantic-focus-ring\` | — | rgba(224, 221, 91, 0.35) |
| Border Radius | \`--radius-xs\` | \`--radius-mode-1-radius-xs\` | 4px |

### Key Tokens Used

- \`--fonts-semantic-sm/md/lg\`: Dropdown text sizes
- \`--font-weight-regular/medium\`: Text weights
- \`--semantic-text-primary\`: Text color
- \`--semantic-brand-base\`: Selected option color
- \`--semantic-background-interactive\`: Background color
- \`--semantic-border-subtle\`: Border color
- \`--semantic-focus-ring\`: Focus indicator
- \`--spacing-*\`: Internal padding
- \`--radius-xs\`: Border radius

Use the **Playground** to customize all dropdown properties, or view the **States** story to see all interaction states.`,
      },
    },
  },
  tags: ["autodocs"],
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
          <label style={{ display: "block", marginBottom: "var(--spacing-8)", fontSize: "var(--fonts-semantic-xs)", color: "var(--semantic-text-secondary)" }}>
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
          <label style={{ display: "block", marginBottom: "var(--spacing-8)", fontSize: "var(--fonts-semantic-xs)", color: "var(--semantic-text-secondary)" }}>
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
          <label style={{ display: "block", marginBottom: "var(--spacing-8)", fontSize: "var(--fonts-semantic-xs)", color: "var(--semantic-text-secondary)" }}>
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
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-24)", maxWidth: "400px" }}>
        <div>
          <h3 style={{ marginBottom: "var(--spacing-12)", fontSize: "var(--fonts-semantic-sm)", fontWeight: 500, color: "var(--semantic-text-primary)" }}>
            Small (32px)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
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
          <h3 style={{ marginBottom: "var(--spacing-12)", fontSize: "var(--fonts-semantic-sm)", fontWeight: 500, color: "var(--semantic-text-primary)" }}>
            Medium (40px)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
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
          <h3 style={{ marginBottom: "var(--spacing-12)", fontSize: "var(--fonts-semantic-sm)", fontWeight: 500, color: "var(--semantic-text-primary)" }}>
            Large (48px)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
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

