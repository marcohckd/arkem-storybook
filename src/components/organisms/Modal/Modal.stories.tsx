// src/components/Modal/Modal.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import * as React from "react";
import { createRoot } from "react-dom/client";

import { Button } from "../../atoms/Button/Button";

import { Modal, MODAL_FORMATS, type ModalFormat } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Organisms/Modal",
  component: Modal,
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
        component: `> **Overlay dialogs that focus user attention on specific tasks or information, using standardized layouts with flexible pane configurations**

---

## Overview

Modals are overlay dialogs that provide a focused interaction space for users to complete specific tasks or view important information. They create a clear separation from the main interface by using a backdrop overlay and a centered dialog container. Modals use Header Secondary for the title bar and support multiple layout formats for organizing complex content across one, two, or three panes. The component includes comprehensive accessibility features including focus trapping, keyboard navigation, and proper ARIA attributes.

---

## Design Tokens

The Modal component uses a carefully curated set of design tokens to ensure consistency with the broader design system. All tokens follow the semantic → primitive → value hierarchy.

### Colors

Color tokens provide the visual foundation of the component, ensuring proper contrast and accessibility while maintaining brand consistency.

**Pane Background:** \`var(--semantic-background-base)\` → #080808
The base background color creates a neutral surface for modal content that doesn't compete with the information being displayed.

**Backdrop:** \`var(--semantic-background-backdrop)\` → rgba(0, 0, 0, 0.5)
The backdrop overlay creates visual separation between the modal and the underlying content, helping users focus on the modal's task.

**Border:** \`var(--semantic-border-subtle)\` → #2D2D2D
Subtle borders provide gentle definition for panes and the modal container without creating harsh visual separation.

**Text Color:** \`var(--semantic-text-primary)\` → \`var(--color-text-primary)\` → #E5E5E5
Primary text color ensures optimal contrast against dark backgrounds, maintaining readability throughout the modal.

### Typography

Typography tokens ensure consistent text rendering across all modal content. The type system uses a modular scale that maintains proportional relationships between different text sizes.

**Font Family:** \`var(--font-family-base)\` → \`var(--typography-mode-1-font-family-ibm-plex-sans)\` → 'IBM Plex Sans', sans-serif
IBM Plex Sans provides excellent readability at all sizes with a professional, modern appearance.

**Header Font Size:** \`var(--fonts-display-xs)\` → \`var(--typography-mode-1-font-size-24)\` → 24px
The display extra-small size is used for modal titles, providing clear hierarchy and prominence.

**Body Font Size:** \`var(--fonts-semantic-md)\` → \`var(--typography-mode-1-font-size-16)\` → 16px
The medium semantic font size serves as the base for body text within modal panes, optimized for comfortable reading.

### Spacing

Spacing tokens create consistent rhythm and breathing room throughout the component, following the 4px base spacing scale.

**Internal Padding:** \`var(--spacing-12)\` → \`var(--spacing-style-spacing-4px-3-12px)\` → 12px
Internal padding provides comfortable spacing between pane borders and their content, ensuring content doesn't feel cramped.

**Pane Gap:** \`var(--spacing-8)\` → \`var(--spacing-style-spacing-4px-2-8px)\` → 8px
Gap spacing between panes creates clear visual separation while maintaining a cohesive layout.

**Overlay Padding:** \`var(--spacing-12)\` → \`var(--spacing-style-spacing-4px-3-12px)\` → 12px
Padding around the modal container ensures the modal doesn't touch viewport edges on smaller screens.

### Borders & Radius

Border tokens control the visual boundaries of the component, creating clear definition while maintaining design system consistency.

**Border Width:** \`var(--border-width-thin)\` → \`var(--border-widths-mode-1-border-width-thin)\` → 1px
Thin borders provide subtle definition without adding visual weight.

**Border Radius:** \`var(--radius-md)\` → \`var(--radius-mode-1-radius-md)\` → 8px
Medium border radius creates soft, modern corners that align with the design system's aesthetic.

### Shadows & Effects

Shadow tokens add depth and visual interest to the component, helping the modal appear elevated above the backdrop.

**Modal Shadow:** \`var(--shadow-skeuomorphic)\` → \`0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)\`
The skeuomorphic shadow combines a soft drop shadow with a subtle border effect, creating depth and definition that makes the modal appear elevated above the backdrop.

### Z-Index

Z-index tokens control the layering of the modal relative to other interface elements.

**Modal Z-Index:** \`var(--z-index-modal)\` → 1000
The modal z-index ensures it appears above all other interface elements, including dropdowns and sticky headers.

### Animations

Animation tokens control transition timing for smooth modal appearance and dismissal.

**Transition:** \`var(--transition-base)\` → 0.15s ease
Standard transition timing provides smooth animations for modal state changes without feeling sluggish.

---

## Token Usage Guidelines

The design system follows a three-tier token hierarchy to ensure consistency and maintainability.

**Semantic Tokens (Always Use)**
Semantic tokens describe the purpose of a style, not its value. They automatically adapt to theme changes and ensure consistency across the application.

- ✅ **Correct:** \`var(--semantic-background-base)\`
- ❌ **Avoid:** \`var(--color-fill-neutral-900)\`
- ❌ **Never:** \`#080808\`

**Primitive Tokens (Referenced by Semantic)**
Primitive tokens define actual values and are referenced by semantic tokens. They should not be used directly in components.

**Raw Values (Documentation Only)**
Raw CSS values are shown for reference but should never be used directly in production code.

**When Hardcoded Values Are Acceptable**

Hardcoded values are acceptable only for component-specific measurements that are not reused elsewhere in the system. The Modal component uses hardcoded values for:

- **Width:** 1000px maximum (component-specific layout constraint)
- **Height:** 700px fixed (component-specific layout constraint)

These values are unique to the Modal component and represent specific design requirements rather than reusable design system values.

**Token Priority**
1. **Semantic tokens** - Primary usage in all components
2. **Primitive tokens** - Referenced by semantic tokens only
3. **Raw values** - Documentation and reference only

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value | Purpose |
|----------|---------------|-----------------|--------|----------|
| Pane Background | \`--semantic-background-base\` | — | #080808 | Content surface background |
| Backdrop | \`--semantic-background-backdrop\` | — | rgba(0, 0, 0, 0.5) | Overlay background |
| Border Color | \`--semantic-border-subtle\` | — | #2D2D2D | Subtle border definition |
| Border Width | \`--border-width-thin\` | \`--border-widths-mode-1-border-width-thin\` | 1px | Border thickness |
| Border Radius | \`--radius-md\` | \`--radius-mode-1-radius-md\` | 8px | Corner rounding |
| Padding | \`--spacing-12\` | \`--spacing-style-spacing-4px-3-12px\` | 12px | Internal spacing |
| Pane Gap | \`--spacing-8\` | \`--spacing-style-spacing-4px-2-8px\` | 8px | Space between panes |
| Shadow | \`--shadow-skeuomorphic\` | — | 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1) | Elevation effect |
| Z-Index | \`--z-index-modal\` | — | 1000 | Layering priority |
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | 'IBM Plex Sans', sans-serif | Text rendering |
| Header Font Size | \`--fonts-display-xs\` | \`--typography-mode-1-font-size-24\` | 24px | Title text size |
| Body Font Size | \`--fonts-semantic-md\` | \`--typography-mode-1-font-size-16\` | 16px | Content text size |
| Text Color | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 | Content text color |
| Transition | \`--transition-base\` | — | 0.15s ease | Animation timing |

---

## Dimensions

The Modal component uses fixed dimensions optimized for content display and user interaction.

**Width:** 1000px maximum (responsive: max-width 100%)
The maximum width provides ample space for content while remaining readable. On smaller screens, the modal adapts to the viewport width with 12px padding on each side.

**Height:** Fixed 700px
The fixed height ensures consistent modal appearance and prevents excessive vertical scrolling. Individual panes scroll independently when content overflows.

**Padding:** 12px internal padding around body content
Internal padding provides comfortable spacing between pane borders and content, ensuring readability and visual breathing room.

**Responsive Behavior:** Adapts to viewport while maintaining proportions
The modal maintains its aspect ratio and usability across different screen sizes, with the overlay padding ensuring it never touches viewport edges.

---

## Layout Formats

The Modal component supports multiple layout formats to accommodate different content organization needs.

**single:** One full-height pane (default)
The simplest layout format, ideal for single-column content, forms, or simple information display.

**1+1-vertical:** Two equal-height panes stacked vertically (8px gap)
Two panes arranged vertically, perfect for displaying related content in a top-bottom relationship or for sequential workflows.

**1+1-horizontal:** Two equal-width panes side-by-side (8px gap)
Two panes arranged horizontally, ideal for side-by-side comparisons, master-detail views, or split content display.

**2+1:** Left side: two vertical panes, Right side: one full-height pane
Three-pane layout with two stacked panes on the left and one full-height pane on the right. Useful for complex data relationships or multi-level information hierarchies.

**1+2:** Left side: one full-height pane, Right side: two vertical panes
Three-pane layout with one full-height pane on the left and two stacked panes on the right. Mirrors the 2+1 layout for different content priorities.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`title\` | \`string\` | *required* | Modal title displayed in Header Secondary |
| \`isOpen\` | \`boolean\` | *required* | Controls modal visibility |
| \`onClose\` | \`() => void\` | *required* | Callback when modal is closed (ESC key, backdrop click, or close button) |
| \`format\` | \`ModalFormat\` | \`"single"\` | Layout format: "single", "1+1-vertical", "1+1-horizontal", "2+1", "1+2" |
| \`subHeader\` | \`ReactNode\` | \`undefined\` | Optional content below main header (navigation, breadcrumbs, etc.) |
| \`rightSlot\` | \`ReactNode\` | \`undefined\` | Optional right-side slot for header actions (buttons, controls) |
| \`showA\` | \`boolean\` | \`true\` | Show first pane (top/left depending on format) |
| \`showB\` | \`boolean\` | \`true\` | Show second pane (bottom/right depending on format) |
| \`showC\` | \`boolean\` | \`true\` | Show third pane (for 2+1 and 1+2 formats) |
| \`children\` | \`ReactNode\` | *required* | Content to render in modal panes |

**format**
The layout format determines how panes are arranged within the modal. Each format is optimized for specific content organization patterns and user workflows.

**subHeader**
The sub-header appears below the main header and is useful for navigation, breadcrumbs, or additional contextual information that doesn't belong in the main title.

**rightSlot**
The right slot provides space for header actions such as settings buttons, additional controls, or secondary actions that should be accessible from the header.

**showA, showB, showC**
Pane visibility controls allow dynamic showing and hiding of panes based on application state or user preferences. This enables flexible modal layouts that adapt to different use cases.

---

## Usage

### Basic Usage

The simplest implementation requires only the essential props:

\`\`\`tsx
<Modal 
  title="Modal Title"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
>
  <div>Modal content goes here</div>
</Modal>
\`\`\`

### With Format and Sub-Header

Use layout formats and sub-headers for more complex content organization:

\`\`\`tsx
<Modal 
  title="Device Information"
  format="2+1"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  subHeader={<Navigation />}
>
  <div>Pane A content</div>
  <div>Pane B content</div>
  <div>Pane C content</div>
</Modal>
\`\`\`

### With Custom Header Actions

Add header actions using the right slot:

\`\`\`tsx
<Modal 
  title="Edit Document"
  format="1+1-horizontal"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  rightSlot={<Button>Settings</Button>}
  showA={true}
  showB={true}
>
  <div>Left pane content</div>
  <div>Right pane content</div>
</Modal>
\`\`\`

### Pane Styling

All panes share consistent styling using design tokens:

- **Background:** \`var(--semantic-background-base)\` → #080808
- **Border:** \`var(--border-width-thin)\` solid \`var(--semantic-border-subtle)\` → 1px solid #2D2D2D
- **Padding:** \`var(--spacing-12)\` → 12px internal padding
- **Scrolling:** Independent \`overflow-y: auto\` per pane when content overflows

---

## State Variations

The component adapts its appearance and behavior based on interaction states and visibility.

**Closed State**
When \`isOpen\` is false, the modal is not rendered in the DOM, ensuring no accessibility or performance overhead when not in use.

**Open State**
When \`isOpen\` is true, the modal appears with a backdrop overlay and the modal container centered in the viewport. Focus is automatically trapped within the modal.

**Pane Visibility**
Individual panes can be shown or hidden using the \`showA\`, \`showB\`, and \`showC\` props, allowing dynamic layout adaptation based on content or user preferences.

---

## Accessibility

The component follows WCAG 2.1 Level AA guidelines and includes comprehensive accessibility features out of the box.

**Focus Management**
Focus is automatically trapped within the modal when it opens, ensuring keyboard users can only interact with modal content. When the modal closes, focus returns to the element that triggered it.

**Keyboard Navigation**
- \`ESC\` key closes the modal
- \`Tab\` navigates through focusable elements within the modal
- \`Shift + Tab\` navigates backwards through focusable elements
- Focus remains trapped within modal boundaries

**ARIA Attributes**
The modal includes proper ARIA roles and labels:
- \`role="dialog"\` identifies the modal as a dialog
- \`aria-modal="true"\` indicates the modal blocks interaction with background content
- \`aria-labelledby\` associates the title with the modal
- Proper labeling for all interactive elements

**Screen Reader Support**
- Modal title is announced when modal opens
- Focus trap ensures screen reader focus stays within modal
- State changes are announced appropriately
- All interactive elements have accessible labels

**Backdrop Interaction**
Clicking the backdrop closes the modal, providing an intuitive way to dismiss the modal. This behavior can be customized if needed.

---

## Best Practices

**When to Use Modals**

Modals work best for focused tasks that require user attention and should be completed before returning to the main interface. Use modals for:

- Forms and data input that require completion
- Confirmations and alerts that need immediate attention
- Detail views and inspections of specific items
- Multi-pane data comparison and analysis
- Settings and configuration that benefit from focused interaction

**Do's**

- ✅ Use semantic tokens for all styling modifications
- ✅ Choose layout formats that match your content structure
- ✅ Provide clear, descriptive titles for modal context
- ✅ Use sub-headers for navigation or additional context
- ✅ Implement proper focus management and keyboard navigation
- ✅ Test modal behavior with screen readers
- ✅ Ensure modal content is accessible and properly labeled

**Don'ts**

- ❌ Don't use hardcoded values instead of design tokens
- ❌ Don't nest modals (creates accessibility and UX issues)
- ❌ Don't use modals for simple notifications (use toasts instead)
- ❌ Don't create modals that are too large or complex
- ❌ Don't forget to handle focus restoration when modal closes
- ❌ Don't use modals for content that should be part of the main flow

---

## Technical Details

### CSS Architecture

The component uses CSS custom properties (design tokens) for all styling values, ensuring consistency with the design system and enabling theme customization. CSS Grid is used for pane layouts, providing stable column widths and flexible row heights.

### Focus Trap Implementation

Focus trapping ensures keyboard users can only interact with modal content. When the modal opens, focus moves to the first focusable element. Tab navigation cycles through focusable elements within the modal, and ESC key closes the modal and restores focus to the triggering element.

### Pane Scrolling

Each pane has independent scrolling when content overflows. This allows users to scroll through long content in one pane while keeping other panes visible, improving content comparison and navigation efficiency.

Use the **Playground** to explore different formats and configurations.`,
      },
    },
  },
  tags: ["autodocs"],
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
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to customize all modal properties. Use the Controls panel to experiment with different formats and configurations.",
      },
    },
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

export const LongContent: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story: "Example showing how Modal handles long content. The modal body scrolls independently while the header remains fixed, ensuring the close button and title are always accessible.",
      },
    },
  },
  render: () => {
    const LongContentModal = () => {
      const [isOpen, setIsOpen] = useState(true);

      React.useEffect(() => {
        if (isOpen) {
          const timer = setTimeout(() => {
            const pane = document.querySelector('.arkem-modal__pane');
            if (pane) {
              const content = Array.from({ length: 50 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    padding: "var(--spacing-12)",
                    marginBottom: "var(--spacing-8)",
                    background: "var(--semantic-background-raised)",
                    borderRadius: "var(--radius-md)",
                    border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "var(--fonts-semantic-md)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--semantic-text-primary)",
                      margin: "0 0 var(--spacing-8) 0",
                    }}
                  >
                    Section {i + 1}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--fonts-semantic-sm)",
                      color: "var(--semantic-text-secondary)",
                      margin: 0,
                      lineHeight: "1.6",
                    }}
                  >
                    This is section {i + 1} of a long content modal. The modal body scrolls independently while the header remains fixed at the top. This ensures that the close button and title are always accessible, even when scrolling through extensive content.
                  </p>
                </div>
              ));
              const container = document.createElement('div');
              container.style.padding = "var(--spacing-12)";
              pane.appendChild(container);
              const root = createRoot(container);
              root.render(<>{content}</>);
            }
          }, 100);
          return () => clearTimeout(timer);
        }
      }, [isOpen]);

      return (
        <ModalWrapper>
          {({ isOpen, onClose }) => (
            <Modal
              title="Modal with Long Content"
              isOpen={isOpen}
              onClose={onClose}
              format="single"
            />
          )}
        </ModalWrapper>
      );
    };

    return <LongContentModal />;
  },
};

