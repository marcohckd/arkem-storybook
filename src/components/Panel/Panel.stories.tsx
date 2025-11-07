// src/components/Panel/Panel.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import { Panel } from "./Panel";

const meta: Meta<typeof Panel> = {
  title: "Components/Panel",
  component: Panel,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Panel

Panels are container components that provide a structured surface for content with optional inner shadow effects.

## Overview

Panels offer a clean, bordered container with consistent padding and styling. The inner shadow variant creates a subtle depth effect using the brand color, perfect for creating visual hierarchy and emphasis.

## Inner Shadow

The inner shadow effect uses a brand-colored shadow (E0DD5B at 29% opacity) with:
- **X offset**: 4px
- **Y offset**: 4px
- **Blur**: 28px
- **Spread**: 1px

This creates a subtle, warm glow effect that adds depth without overwhelming the content.`,
      },
    },
  },
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

