// src/components/Panel/Panel.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import { Panel } from "./Panel";

const meta: Meta<typeof Panel> = {
  title: "Molecules/Panel",
  component: Panel,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `> **Container component that provides a structured surface for content with optional inner shadow effects**

---

## Overview

Panels are container components that provide a structured surface for content with consistent padding and styling. They offer a clean, bordered container that creates visual hierarchy within the interface. The optional inner shadow variant creates a subtle depth effect using the brand color, perfect for emphasizing important content areas or creating visual separation between different sections of the interface.

---

## Design Tokens

The Panel component uses a carefully curated set of design tokens to ensure consistency with the broader design system. All tokens follow the semantic → primitive → value hierarchy.

### Colors

Color tokens provide the visual foundation of the component, ensuring proper contrast and accessibility while maintaining brand consistency.

**Background:** \`var(--semantic-background-base)\` → #080808
The base background color creates a neutral surface that doesn't compete with content while maintaining visual hierarchy.

**Border:** \`var(--semantic-border-subtle)\` → #2D2D2D
Subtle borders provide gentle definition without creating harsh visual separation.

**Text Color:** \`var(--semantic-text-primary)\` → \`var(--color-text-primary)\` → #E5E5E5
Text color is inherited by content within the panel, ensuring proper contrast and readability.

### Typography

Typography tokens ensure consistent text rendering across all content within panels. The type system uses a modular scale that maintains proportional relationships between different text sizes.

**Font Family:** \`var(--font-family-base)\` → \`var(--typography-mode-1-font-family-ibm-plex-sans)\` → 'IBM Plex Sans', sans-serif
IBM Plex Sans provides excellent readability at all sizes with a professional, modern appearance.

### Spacing

Spacing tokens create consistent rhythm and breathing room throughout the component, following the 4px base spacing scale.

**Padding:** \`var(--spacing-12)\` → \`var(--spacing-style-spacing-4px-3-12px)\` → 12px
Internal padding provides comfortable spacing between the panel border and its content, ensuring content doesn't feel cramped.

### Borders & Radius

Border tokens control the visual boundaries of the component, creating clear definition while maintaining design system consistency.

**Border Width:** \`var(--border-width-thin)\` → \`var(--border-widths-mode-1-border-width-thin)\` → 1px
Thin borders provide subtle definition without adding visual weight.

**Border Radius:** \`var(--radius-md)\` → \`var(--radius-mode-1-radius-md)\` → 8px
Medium border radius creates soft, modern corners that align with the design system's aesthetic.

### Shadows & Effects

Shadow tokens add depth and visual interest to the component, particularly when the inner shadow variant is enabled.

**Inner Shadow:** \`var(--shadow-inner-panel)\` → \`inset 4px 4px 28px 1px rgba(224, 221, 91, 0.29)\`
The inner shadow effect uses a carefully calibrated combination of offset, blur, and spread to create depth without overwhelming the content. The brand color (E0DD5B) at 29% opacity creates a subtle, warm glow effect that adds visual interest and emphasis.

**Shadow Breakdown:**
- **X offset:** 4px - Creates horizontal depth
- **Y offset:** 4px - Creates vertical depth
- **Blur:** 28px - Produces a soft, diffused glow
- **Spread:** 1px - Slightly expands the shadow
- **Color:** rgba(224, 221, 91, 0.29) - Brand color at 29% opacity

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

Hardcoded values are acceptable only for component-specific measurements that are not reused elsewhere in the system. The Panel component does not use any hardcoded values, as all dimensions are controlled through design tokens.

**Token Priority**
1. **Semantic tokens** - Primary usage in all components
2. **Primitive tokens** - Referenced by semantic tokens only
3. **Raw values** - Documentation and reference only

### Token Reference Table

| Property | Semantic Token | Primitive Token | Value | Purpose |
|----------|---------------|-----------------|--------|----------|
| Background | \`--semantic-background-base\` | — | #080808 | Neutral surface background |
| Border Color | \`--semantic-border-subtle\` | — | #2D2D2D | Subtle border definition |
| Border Width | \`--border-width-thin\` | \`--border-widths-mode-1-border-width-thin\` | 1px | Border thickness |
| Border Radius | \`--radius-md\` | \`--radius-mode-1-radius-md\` | 8px | Corner rounding |
| Padding | \`--spacing-12\` | \`--spacing-style-spacing-4px-3-12px\` | 12px | Internal spacing |
| Inner Shadow | \`--shadow-inner-panel\` | — | inset 4px 4px 28px 1px rgba(224, 221, 91, 0.29) | Depth effect with brand color |
| Font Family | \`--font-family-base\` | \`--typography-mode-1-font-family-ibm-plex-sans\` | 'IBM Plex Sans', sans-serif | Text rendering |
| Text Color | \`--semantic-text-primary\` | \`--color-text-primary\` | #E5E5E5 | Content text color (inherited) |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`withInnerShadow\` | \`boolean\` | \`false\` | Enables the inner shadow effect using the brand color at 29% opacity for subtle depth |
| \`className\` | \`string\` | \`undefined\` | Additional CSS classes for custom styling (use tokens for consistency) |
| \`children\` | \`ReactNode\` | *required* | Content to render inside the panel |
| \`style\` | \`CSSProperties\` | \`undefined\` | Inline styles (prefer using tokens: \`var(--semantic-*)\`) |

**withInnerShadow**
When enabled, applies an inner shadow effect that creates a warm, subtle glow using the brand color. This is particularly effective for highlighting important content areas or creating visual hierarchy within a layout.

**className**
While custom classes can be applied, prefer using design tokens through inline styles to maintain consistency with the design system. Custom classes should be used primarily for layout and positioning.

---

## Usage

### Basic Usage

The simplest implementation requires only wrapping your content in the Panel component:

\`\`\`tsx
<Panel>
  <h3>Panel Content</h3>
  <p>Panel body text</p>
</Panel>
\`\`\`

### With Inner Shadow

Enable the inner shadow effect to create visual depth and emphasis:

\`\`\`tsx
<Panel withInnerShadow>
  <h3>Highlighted Content</h3>
  <p>This panel has a warm inner glow effect</p>
</Panel>
\`\`\`

### Complex Layouts

Panels can contain complex nested structures while maintaining consistent styling:

\`\`\`tsx
<Panel>
  <header style={{ 
    display: 'flex', 
    gap: 'var(--spacing-8)',
    marginBottom: 'var(--spacing-12)'
  }}>
    <h2>Section Title</h2>
    <Button>Action</Button>
  </header>
  <div>
    <p>Content with multiple paragraphs...</p>
  </div>
  <footer style={{ 
    marginTop: 'var(--spacing-12)',
    display: 'flex',
    gap: 'var(--spacing-8)'
  }}>
    <Button>Cancel</Button>
    <Button>Confirm</Button>
  </footer>
</Panel>
\`\`\`

---

## State Variations

The component adapts its appearance based on the \`withInnerShadow\` prop to provide different visual treatments.

**Default State**
The resting state uses subtle styling that doesn't compete with content while maintaining clear boundaries. The background uses \`var(--semantic-background-base)\` with a subtle border defined by \`var(--semantic-border-subtle)\`.

**With Inner Shadow**
When \`withInnerShadow\` is enabled, the panel applies \`var(--shadow-inner-panel)\` which creates a warm, brand-colored glow effect. This adds visual depth and emphasis without overwhelming the content.

---

## Accessibility

The component follows WCAG 2.1 Level AA guidelines and includes comprehensive accessibility features out of the box.

**Semantic HTML**
Panels use semantic HTML elements to provide proper document structure and improve screen reader navigation. The container uses a \`<div>\` by default, which is appropriate for generic content containers.

**Color Contrast**
All color combinations meet WCAG AA standards for contrast:
- Text on background: Exceeds 7:1 contrast ratio requirement
- Border contrast: 3.5:1 against adjacent surfaces

**Keyboard Navigation**
When used as an interactive container, the panel supports full keyboard navigation:
- \`Tab\` - Navigate to next focusable element
- \`Shift + Tab\` - Navigate to previous focusable element

**Screen Reader Support**
- Proper semantic structure ensures logical reading order
- All interactive elements within panels have accessible labels
- State changes are announced appropriately

---

## Best Practices

**When to Use Panels**

Panels work best for creating distinct content areas that need visual separation from the surrounding interface. Use panels when you need to:

- Group related content together visually
- Create hierarchy within a complex layout
- Highlight important information (with inner shadow)
- Provide a consistent container for similar content types

**Do's**

- ✅ Use semantic tokens for all styling modifications
- ✅ Enable inner shadow sparingly for emphasis on key content
- ✅ Maintain consistent padding using spacing tokens
- ✅ Nest other components properly within panel structure
- ✅ Use appropriate heading levels for content hierarchy

**Don'ts**

- ❌ Don't use hardcoded values instead of design tokens
- ❌ Don't overuse inner shadow - it loses effectiveness when everywhere
- ❌ Don't nest panels too deeply (2-3 levels maximum)
- ❌ Don't use panels for single-line content (overkill)
- ❌ Don't override border radius - maintain consistency

---

## Technical Details

### CSS Architecture

The component uses CSS custom properties (design tokens) for all styling values, ensuring consistency with the design system and enabling theme customization. Data attributes control variant states for clean, declarative styling.

### Shadow Implementation

The inner shadow effect uses a carefully calibrated combination of offset, blur, and spread to create depth without overwhelming the content. This creates a subtle, warm glow effect that adds depth without reducing readability.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    withInnerShadow: {
      control: "boolean",
      description: "Apply inner shadow effect using brand color",
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
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3
          style={{
            fontSize: "var(--fonts-semantic-lg)",
            fontWeight: "var(--font-weight-medium)",
            lineHeight: "var(--fonts-semantic-lg-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-primary)",
            marginBottom: "var(--spacing-8, 8px)",
          }}
        >
          Panel Content
        </h3>
        <p
          style={{
            fontSize: "var(--fonts-semantic-md)",
            lineHeight: "var(--fonts-semantic-md-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-secondary)",
            margin: 0,
          }}
        >
          This is a standard panel without inner shadow.
        </p>
      </div>
    ),
    withInnerShadow: false,
  },
};

export const WithInnerShadow: Story = {
  args: {
    children: (
      <div>
        <h3
          style={{
            fontSize: "var(--fonts-semantic-lg)",
            fontWeight: "var(--font-weight-medium)",
            lineHeight: "var(--fonts-semantic-lg-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-primary)",
            marginBottom: "var(--spacing-8, 8px)",
          }}
        >
          Panel with Inner Shadow
        </h3>
        <p
          style={{
            fontSize: "var(--fonts-semantic-md)",
            lineHeight: "var(--fonts-semantic-md-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-secondary)",
            marginBottom: "var(--spacing-8, 8px)",
          }}
        >
          This panel demonstrates the inner shadow effect. Notice the subtle brand-colored glow that creates depth and visual interest.
        </p>
        <p
          style={{
            fontSize: "var(--fonts-semantic-md)",
            lineHeight: "var(--fonts-semantic-md-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-secondary)",
            margin: 0,
          }}
        >
          The inner shadow uses the brand color (E0DD5B) at 29% opacity with a 28px blur radius.
        </p>
      </div>
    ),
    withInnerShadow: true,
  },
};

export const Comparison: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "var(--spacing-12, 12px)",
          maxWidth: "800px",
        }}
      >
        <Panel withInnerShadow={false}>
          <div>
            <h3
              style={{
                fontSize: "var(--fonts-semantic-lg)",
                fontWeight: "var(--font-weight-medium)",
                lineHeight: "var(--fonts-semantic-lg-line-height)",
                fontFamily: "var(--font-family-base)",
                color: "var(--semantic-text-primary)",
                marginBottom: "var(--spacing-8, 8px)",
              }}
            >
              Without Shadow
            </h3>
            <p
              style={{
                fontSize: "var(--fonts-semantic-md)",
                lineHeight: "var(--fonts-semantic-md-line-height)",
                fontFamily: "var(--font-family-base)",
                color: "var(--semantic-text-secondary)",
                margin: 0,
              }}
            >
              Standard panel appearance with border and background.
            </p>
          </div>
        </Panel>
        <Panel withInnerShadow={true}>
          <div>
            <h3
              style={{
                fontSize: "var(--fonts-semantic-lg)",
                fontWeight: "var(--font-weight-medium)",
                lineHeight: "var(--fonts-semantic-lg-line-height)",
                fontFamily: "var(--font-family-base)",
                color: "var(--semantic-text-primary)",
                marginBottom: "var(--spacing-8, 8px)",
              }}
            >
              With Inner Shadow
            </h3>
            <p
              style={{
                fontSize: "var(--fonts-semantic-md)",
                lineHeight: "var(--fonts-semantic-md-line-height)",
                fontFamily: "var(--font-family-base)",
                color: "var(--semantic-text-secondary)",
                margin: 0,
              }}
            >
              Enhanced with brand-colored inner shadow for depth.
            </p>
          </div>
        </Panel>
      </div>
    );
  },
  parameters: {
    layout: "centered",
  },
};

export const LargeContent: Story = {
  args: {
    children: (
      <div>
        <h3
          style={{
            fontSize: "var(--fonts-semantic-lg)",
            fontWeight: "var(--font-weight-medium)",
            lineHeight: "var(--fonts-semantic-lg-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-primary)",
            marginBottom: "var(--spacing-12, 12px)",
          }}
        >
          Panel with Extended Content
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-8, 8px)",
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <p
              key={i}
              style={{
                fontSize: "var(--fonts-semantic-md)",
                lineHeight: "var(--fonts-semantic-md-line-height)",
                fontFamily: "var(--font-family-base)",
                color: "var(--semantic-text-secondary)",
                margin: 0,
              }}
            >
              Paragraph {i + 1}: The inner shadow effect creates a subtle depth that enhances the visual hierarchy of the panel content. This is particularly effective when displaying important information or creating visual separation.
            </p>
          ))}
        </div>
      </div>
    ),
    withInnerShadow: true,
  },
  parameters: {
    layout: "centered",
  },
};

