// src/components/Foundations/Colors.tokens.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import "../../styles/tokens.css";
import "../../styles/tokens-semantic.css";

const meta: Meta = {
  title: "Foundations/Color Tokens",
  parameters: {
    layout: "padded",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `# Color Tokens

ARKEM Design System uses a comprehensive color token system organized into semantic, neutral, and brand palettes. All colors are available as CSS custom properties.

## Token Categories

- **Semantic Colors**: Context-aware colors for backgrounds, text, borders, brand, and feedback
- **Neutral Colors**: Grayscale palette from lightest (25) to darkest (950)
- **Brand Palette**: Yellow-green brand colors from lightest (25) to darkest (950)

## Usage

Always use semantic tokens for UI components. Use raw color tokens only for specific design needs.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to get computed CSS variable value
const getCSSVariable = (varName: string): string => {
  if (typeof window === "undefined") return "";
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || "N/A";
};

const ColorSwatch: React.FC<{ token: string; name: string; description?: string }> = ({
  token,
  name,
  description,
}) => {
  const value = getCSSVariable(token);
  const isDark = value && value.length > 0 && value !== "var(--semantic-background-base)";
  
  return (
    <div
      style={{
        border: `1px solid var(--semantic-border-subtle)`,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--semantic-background-base)",
      }}
    >
      <div
        style={{
          height: "80px",
          background: `var(${token})`,
          borderBottom: `1px solid var(--semantic-border-subtle)`,
        }}
      />
      <div style={{ padding: "12px" }}>
        <div
          style={{
            fontSize: "var(--fonts-semantic-md)",
            fontWeight: "var(--font-weight-medium)",
            lineHeight: "var(--fonts-semantic-md-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-primary)",
            marginBottom: "4px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "var(--fonts-semantic-sm)",
            lineHeight: "var(--fonts-semantic-sm-line-height)",
            fontWeight: "var(--font-weight-regular)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-secondary)",
            marginBottom: "2px",
          }}
        >
          {token}
        </div>
        <div
          style={{
            fontSize: "var(--fonts-semantic-sm)",
            lineHeight: "var(--fonts-semantic-sm-line-height)",
            fontWeight: "var(--font-weight-regular)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-muted)",
          }}
        >
          {value || "N/A"}
        </div>
        {description && (
          <div
            style={{
              fontSize: "var(--fonts-semantic-md)",
              lineHeight: "var(--fonts-semantic-md-line-height)",
              fontWeight: "var(--font-weight-regular)",
              fontFamily: "var(--font-family-base)",
              color: "var(--semantic-text-secondary)",
              marginTop: "8px",
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export const SemanticColors: Story = {
  render: () => {
    const semanticColors = {
      Background: [
        { token: "--semantic-background-base", name: "Base", desc: "Primary background color" },
        { token: "--semantic-background-raised", name: "Raised", desc: "Elevated surfaces" },
        { token: "--semantic-background-interactive", name: "Interactive", desc: "Interactive elements" },
        { token: "--semantic-background-overlay", name: "Overlay", desc: "Overlays and modals" },
        { token: "--semantic-background-muted", name: "Muted", desc: "Subtle backgrounds" },
        { token: "--semantic-background-backdrop", name: "Backdrop", desc: "Modal backdrops" },
      ],
      Text: [
        { token: "--semantic-text-primary", name: "Primary", desc: "Main text color" },
        { token: "--semantic-text-secondary", name: "Secondary", desc: "Secondary text" },
        { token: "--semantic-text-subtle", name: "Subtle", desc: "Subtle text" },
        { token: "--semantic-text-muted", name: "Muted", desc: "Muted text" },
        { token: "--semantic-text-inverse", name: "Inverse", desc: "Text on dark backgrounds" },
        { token: "--semantic-text-hover", name: "Hover", desc: "Hover state text" },
      ],
      Border: [
        { token: "--semantic-border-subtle", name: "Subtle", desc: "Subtle borders" },
        { token: "--semantic-border-muted", name: "Muted", desc: "Muted borders" },
        { token: "--semantic-border-ghosted", name: "Ghosted", desc: "Very subtle borders (darker than muted)" },
        { token: "--semantic-border-strong", name: "Strong", desc: "Prominent borders" },
      ],
      Brand: [
        { token: "--semantic-brand-base", name: "Base", desc: "Primary brand color" },
        { token: "--semantic-brand-hover", name: "Hover", desc: "Hover state" },
        { token: "--semantic-brand-active", name: "Active", desc: "Active state" },
        { token: "--semantic-brand-pressed", name: "Pressed", desc: "Pressed state" },
        { token: "--semantic-brand-muted", name: "Muted", desc: "Muted brand color" },
        { token: "--semantic-brand-mode", name: "Mode", desc: "Mode hierarchy variant" },
      ],
      Feedback: [
        { token: "--semantic-feedback-success-base", name: "Success", desc: "Success states" },
        { token: "--semantic-feedback-warning-base", name: "Warning", desc: "Warning states" },
        { token: "--semantic-feedback-error-base", name: "Error", desc: "Error states" },
      ],
    };

    return (
      <div style={{ padding: "24px", background: "var(--semantic-background-base)" }}>
        {Object.entries(semanticColors).map(([category, colors]) => (
          <div key={category} style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "var(--fonts-display-xl)",
                fontWeight: "400",
                lineHeight: "var(--fonts-display-xl-line-height)",
                fontFamily: "var(--font-family-base)",
                color: "var(--semantic-text-primary)",
                marginBottom: "24px",
                borderBottom: "1px solid var(--semantic-border-subtle)",
                paddingBottom: "8px",
                background: "var(--semantic-background-base)",
              }}
            >
              {category}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "var(--spacing-style-spacing-4px-4-16px)",
              }}
            >
              {colors.map((color) => (
                <ColorSwatch
                  key={color.token}
                  token={color.token}
                  name={color.name}
                  description={color.desc}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const NeutralColors: Story = {
  render: () => {
    const neutralScale = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    return (
      <div style={{ padding: "24px", background: "var(--semantic-background-base)" }}>
        <h2
          style={{
            fontSize: "var(--fonts-display-xl)",
            fontWeight: "400",
            lineHeight: "var(--fonts-display-xl-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-primary)",
            marginBottom: "24px",
            borderBottom: "1px solid var(--semantic-border-subtle)",
            paddingBottom: "8px",
            background: "var(--semantic-background-base)",
          }}
        >
          Neutral Color Scale
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "var(--spacing-style-spacing-4px-4-16px)",
          }}
        >
          {neutralScale.map((level) => (
            <ColorSwatch
              key={level}
              token={`--color-fill-neutral-${level}`}
              name={`Neutral ${level}`}
              description={`Fill, stroke, and icon variant`}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const BrandPalette: Story = {
  render: () => {
    const brandScale = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    return (
      <div style={{ padding: "24px", background: "var(--semantic-background-base)" }}>
        <h2
          style={{
            fontSize: "var(--fonts-display-xl)",
            fontWeight: "400",
            lineHeight: "var(--fonts-display-xl-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-primary)",
            marginBottom: "24px",
            borderBottom: "1px solid var(--semantic-border-subtle)",
            paddingBottom: "8px",
            background: "var(--semantic-background-base)",
          }}
        >
          Brand Color Scale
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "var(--spacing-style-spacing-4px-4-16px)",
          }}
        >
          {brandScale.map((level) => (
            <ColorSwatch
              key={level}
              token={`--color-fill-brand-${level}`}
              name={`Brand ${level}`}
              description={`Fill, stroke, and icon variant`}
            />
          ))}
        </div>
      </div>
    );
  },
};

