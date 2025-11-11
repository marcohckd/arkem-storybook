import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Font Check",
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `A utility component for visually checking font weights and sizes in the ARKEM Design System. Useful for verifying typography implementation and ensuring consistent font rendering.

## Purpose

This component helps developers and designers:
- Verify font weights are loading correctly
- Check font size scales
- Ensure consistent typography rendering
- Debug font-related issues

## Font Weights

Displays all available font weights:
- Regular (400)
- Medium (500)
- Semibold (600)
- Bold (700)

## Font Sizes

Shows the complete font size scale from 10px to 36px with their corresponding line heights.

## Usage

This is primarily a development/debugging tool. Use it to verify that IBM Plex Sans is loading correctly and all font weights and sizes render as expected.

## Design Tokens

Font-related tokens displayed:
- \`--font-family-base\`: IBM Plex Sans
- \`--font-weight-regular/medium/semibold/bold\`: Font weights
- \`--font-size-*\`: Font sizes (10px-36px)
- \`--line-*\`: Line heights`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FontWeights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "600px" }}>
      <div>
        <h2 style={{ 
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-24)",
          fontWeight: "var(--font-weight-regular)",
          lineHeight: "var(--line-32)",
          color: "var(--semantic-text-primary)",
          marginBottom: "16px"
        }}>
          IBM Plex Sans — Font Weight Display
        </h2>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)" }}>
        <div>
          <div style={{
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-regular)",
            lineHeight: "var(--line-20)",
            color: "var(--semantic-text-secondary)",
            marginBottom: "4px"
          }}>
            Regular (400)
          </div>
          <div style={{
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-regular)",
            lineHeight: "var(--line-24)",
            color: "var(--semantic-text-primary)"
          }}>
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
        
        <div>
          <div style={{
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
            lineHeight: "var(--line-20)",
            color: "var(--semantic-text-secondary)",
            marginBottom: "4px"
          }}>
            Medium (500)
          </div>
          <div style={{
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-medium)",
            lineHeight: "var(--line-24)",
            color: "var(--semantic-text-primary)"
          }}>
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
        
        <div>
          <div style={{
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-semibold)",
            lineHeight: "var(--line-20)",
            color: "var(--semantic-text-secondary)",
            marginBottom: "4px"
          }}>
            Semibold (600)
          </div>
          <div style={{
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-semibold)",
            lineHeight: "var(--line-24)",
            color: "var(--semantic-text-primary)"
          }}>
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
        
        <div>
          <div style={{
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-bold)",
            lineHeight: "var(--line-20)",
            color: "var(--semantic-text-secondary)",
            marginBottom: "4px"
          }}>
            Bold (700)
          </div>
          <div style={{
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-bold)",
            lineHeight: "var(--line-24)",
            color: "var(--semantic-text-primary)"
          }}>
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FontSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", maxWidth: "600px" }}>
      <div>
        <h2 style={{ 
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-24)",
          fontWeight: "var(--font-weight-regular)",
          lineHeight: "var(--line-32)",
          color: "var(--semantic-text-primary)",
          marginBottom: "16px"
        }}>
          Font Size Scale
        </h2>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-10)",
          lineHeight: "var(--line-14)",
          color: "var(--semantic-text-primary)"
        }}>
          <strong style={{ color: "var(--semantic-text-secondary)", marginRight: "8px" }}>10px:</strong>
          The quick brown fox jumps over the lazy dog
        </div>
        
        <div style={{
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-12)",
          lineHeight: "var(--line-16)",
          color: "var(--semantic-text-primary)"
        }}>
          <strong style={{ color: "var(--semantic-text-secondary)", marginRight: "8px" }}>12px:</strong>
          The quick brown fox jumps over the lazy dog
        </div>
        
        <div style={{
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-14)",
          lineHeight: "var(--line-20)",
          color: "var(--semantic-text-primary)"
        }}>
          <strong style={{ color: "var(--semantic-text-secondary)", marginRight: "8px" }}>14px:</strong>
          The quick brown fox jumps over the lazy dog
        </div>
        
        <div style={{
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-16)",
          lineHeight: "var(--line-24)",
          color: "var(--semantic-text-primary)"
        }}>
          <strong style={{ color: "var(--semantic-text-secondary)", marginRight: "8px" }}>16px:</strong>
          The quick brown fox jumps over the lazy dog
        </div>
        
        <div style={{
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-18)",
          lineHeight: "var(--line-24)",
          color: "var(--semantic-text-primary)"
        }}>
          <strong style={{ color: "var(--semantic-text-secondary)", marginRight: "8px" }}>18px:</strong>
          The quick brown fox jumps over the lazy dog
        </div>
        
        <div style={{
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-20)",
          lineHeight: "var(--line-28)",
          color: "var(--semantic-text-primary)"
        }}>
          <strong style={{ color: "var(--semantic-text-secondary)", marginRight: "8px" }}>20px:</strong>
          The quick brown fox jumps over the lazy dog
        </div>
        
        <div style={{
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-24)",
          lineHeight: "var(--line-32)",
          color: "var(--semantic-text-primary)"
        }}>
          <strong style={{ color: "var(--semantic-text-secondary)", marginRight: "8px" }}>24px:</strong>
          The quick brown fox jumps over the lazy dog
        </div>
        
        <div style={{
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-30)",
          lineHeight: "var(--line-38)",
          color: "var(--semantic-text-primary)"
        }}>
          <strong style={{ color: "var(--semantic-text-secondary)", marginRight: "8px" }}>30px:</strong>
          The quick brown fox jumps over the lazy dog
        </div>
        
        <div style={{
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-36)",
          lineHeight: "var(--line-44)",
          color: "var(--semantic-text-primary)"
        }}>
          <strong style={{ color: "var(--semantic-text-secondary)", marginRight: "8px" }}>36px:</strong>
          The quick brown fox jumps over the lazy dog
        </div>
      </div>
    </div>
  ),
};

