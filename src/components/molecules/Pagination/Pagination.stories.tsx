import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Pagination component for navigating through multiple pages of data. Extracted from UserManagementTable.

## Features

- Previous/Next navigation buttons
- Page information display (Page X of Y)
- Disabled states for first/last page
- Token-based styling
- Full accessibility support

## Usage

\`\`\`tsx
const [currentPage, setCurrentPage] = useState(1);
const totalPages = 5;

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
\`\`\`

## Token Usage

All styling uses semantic design tokens:
- Spacing: \`var(--spacing-12)\`, \`var(--spacing-16)\`
- Typography: \`var(--fonts-semantic-sm)\`
- Colors: \`var(--semantic-text-secondary)\`
- Buttons: Uses Button component with ARKEM tokens`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "Current page number (1-indexed)",
    },
    totalPages: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "Total number of pages",
    },
    onPageChange: {
      action: "page changed",
      description: "Callback when page changes",
    },
    className: {
      control: false,
      description: "Additional CSS class name",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility",
    },
  },
  args: {
    currentPage: 1,
    totalPages: 5,
    ariaLabel: "Pagination",
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    return (
      <div style={{ width: "500px", padding: "var(--spacing-24)" }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    return (
      <div style={{ width: "500px", padding: "var(--spacing-24)" }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <p
          style={{
            marginTop: "var(--spacing-16)",
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-secondary)",
            textAlign: "center",
          }}
        >
          (Pagination is hidden when totalPages ≤ 1)
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination component automatically hides when there is only one page or less.",
      },
    },
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 5);
    return (
      <div style={{ width: "500px", padding: "var(--spacing-24)" }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination with many pages. Previous button is enabled when not on first page, Next button is enabled when not on last page.",
      },
    },
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    return (
      <div style={{ width: "500px", padding: "var(--spacing-24)" }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <p
          style={{
            marginTop: "var(--spacing-16)",
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-secondary)",
            textAlign: "center",
          }}
        >
          Previous button is disabled on first page
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination on the first page. Previous button is disabled.",
      },
    },
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 5);
    return (
      <div style={{ width: "500px", padding: "var(--spacing-24)" }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <p
          style={{
            marginTop: "var(--spacing-16)",
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-secondary)",
            textAlign: "center",
          }}
        >
          Next button is disabled on last page
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination on the last page. Next button is disabled.",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    currentPage: 3,
    totalPages: 7,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 3);
    return (
      <div style={{ width: "500px", padding: "var(--spacing-24)" }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div
          style={{
            marginTop: "var(--spacing-24)",
            padding: "var(--spacing-16)",
            background: "var(--semantic-background-raised)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-primary)",
            textAlign: "center",
          }}
        >
          Current Page: {currentPage} of {args.totalPages}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive pagination example. Click Previous/Next buttons to navigate between pages.",
      },
    },
  },
};

