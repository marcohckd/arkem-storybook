// src/components/Modal/Modal.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../Button/Button";

import { Modal, MODAL_FORMATS, type ModalFormat } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Modal

Modals are overlay dialogs that focus user attention on specific tasks or information, using standardized layouts with flexible pane configurations.

## Overview

Modals provide a focused interaction space with a fixed 700px height and maximum 1000px width, centered in the viewport with a backdrop overlay. They use Header Secondary for the title bar and support multiple layout formats for content organization.

## Dimensions

- **Width**: 1000px maximum (responsive: max-width 100%)
- **Height**: Fixed 700px
- **Padding**: 12px internal padding around body content
- **Responsive**: Adapts to viewport while maintaining proportions

## Layout Formats

- **single**: One full-height pane (default)
- **1+1-vertical**: Two equal-height panes stacked vertically (8px gap)
- **1+1-horizontal**: Two equal-width panes side-by-side (8px gap)
- **2+1**: Left side: two vertical panes, Right side: one full-height pane
- **1+2**: Left side: one full-height pane, Right side: two vertical panes

## Features

- Header Secondary (XL) with title and close button
- Optional sub-header below main header
- Flexible right slot for header actions
- CSS Grid-based layouts for stable pane widths
- Independent scrolling per pane when content overflows
- Pane visibility controls (showA, showB, showC)
- Focus trap and keyboard navigation (ESC to close)
- Backdrop click to close
- Accessible with ARIA attributes

## Usage

Modals are perfect for:
- Forms and data input
- Confirmations and alerts
- Detail views and inspections
- Multi-pane data comparison
- Settings and configuration

\\\`\\\`\\\`tsx
// Basic modal
<Modal 
  title="Modal Title"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>

// With format and sub-header
<Modal 
  title="Device Information"
  format="2+1"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  subHeader={<Navigation />}
/>

// With custom header actions
<Modal 
  title="Edit Document"
  format="1+1-horizontal"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  rightSlot={<SaveButton />}
  showA={true}
  showB={true}
/>
\\\`\\\`\\\`

## Pane Styling

All panes share consistent styling:
- **Background**: \`var(--semantic-background-base)\`
- **Border**: \`0.5px solid var(--semantic-border-subtle)\`
- **Padding**: 12px internal padding
- **Scrolling**: Independent \`overflow-y: auto\` per pane

## Accessibility

- Focus trap keeps keyboard focus within modal
- ESC key closes modal
- ARIA roles and labels properly configured
- Backdrop click closes modal (when enabled)

Use the **Playground** to explore different formats and configurations.`,
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Modal title (Header Secondary)",
    },
    format: {
      control: "radio",
      options: MODAL_FORMATS,
      description: "Modal layout format",
    },
    rightSlot: {
      control: false,
      description: "Optional right-side slot for header actions",
    },
    subHeader: {
      control: false,
      description: "Optional content below header",
    },
    isOpen: {
      control: "boolean",
      description: "Whether modal is open",
    },
    onClose: {
      action: "closed",
      description: "Callback when modal is closed",
    },
    showA: {
      control: "boolean",
      description: "Show first pane (top/left depending on format)",
    },
    showB: {
      control: "boolean",
      description: "Show second pane (bottom/right depending on format)",
    },
    showC: {
      control: "boolean",
      description: "Show third pane (for 2+1 and 1+2 formats)",
    },
  },
  args: {
    title: "Modal Title",
    format: "single",
    isOpen: true,
    showA: true,
    showB: true,
    showC: true,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Wrapper component to manage isOpen state
const ModalWrapper: React.FC<{
  children: (props: { isOpen: boolean; onClose: () => void }) => React.ReactNode;
  initialOpen?: boolean;
}> = ({ children, initialOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return <>{children({ isOpen, onClose: () => setIsOpen(false) })}</>;
};

export const Single: Story = {
  tags: ['!dev'],
  args: {
    format: "single",
  },
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </ModalWrapper>
  ),
};

export const Format1Plus1Vertical: Story = {
  tags: ['!dev'],
  args: {
    format: "1+1-vertical",
  },
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </ModalWrapper>
  ),
};

export const Format1Plus1Horizontal: Story = {
  tags: ['!dev'],
  args: {
    format: "1+1-horizontal",
  },
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </ModalWrapper>
  ),
};

export const Format2Plus1: Story = {
  tags: ['!dev'],
  args: {
    format: "2+1",
  },
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </ModalWrapper>
  ),
};

export const Format1Plus2: Story = {
  tags: ['!dev'],
  args: {
    format: "1+2",
  },
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </ModalWrapper>
  ),
};

export const Default: Story = {
  tags: ['!dev'],
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </ModalWrapper>
  ),
};


export const WithSubHeader: Story = {
  tags: ['!dev'],
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
          subHeader={
            <div style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
              Additional information or navigation can go here
            </div>
          }
        />
      )}
    </ModalWrapper>
  ),
};

export const WithRightSlot: Story = {
  tags: ['!dev'],
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
          rightSlot={
            <Button
              size="md"
              hierarchy="secondary"
              tone="black"
              function="action"
              trailingIconName="Settings"
              showText={false}
              iconTrailing={true}
              iconLeading={false}
              ariaLabel="Settings"
            />
          }
        />
      )}
    </ModalWrapper>
  ),
};

export const Responsive: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
          title="Responsive Modal"
        />
      )}
    </ModalWrapper>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </ModalWrapper>
  ),
};

export const PaneVisibilityToggle: Story = {
  tags: ['!dev'],
  args: {
    format: "1+1-horizontal",
    title: "Pane Visibility Toggle Demo",
  },
  render: (args) => (
    <ModalWrapper>
      {({ isOpen, onClose }) => (
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </ModalWrapper>
  ),
};

