// src/components/Foundations/Spacing.tokens.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import "../../styles/tokens.css";
import "../../styles/tokens-semantic.css";

const meta: Meta = {
  title: "Foundations/Spacing & Layout Tokens",
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-fill-neutral-600)', minHeight: '100vh', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `ARKEM Design System uses a 4px-based spacing scale for consistent layout and spacing throughout the design system.

## Spacing Scale

All spacing values are multiples of 4px, ranging from 2px to 128px. This creates a harmonious rhythm throughout the interface and ensures consistent spacing relationships.

### Common Spacing Values

- **2px, 4px**: Tight spacing for icons, badges, small elements
- **8px, 12px**: Standard spacing for form elements, buttons, compact layouts
- **16px, 20px, 24px**: Medium spacing for sections, cards, content blocks
- **32px, 40px, 48px**: Large spacing for major sections, page layouts
- **64px, 80px, 96px, 128px**: Extra large spacing for hero sections, page margins

## Corner Radius

Border radius tokens for rounded corners, ranging from 2px (xss) to 999px (max/pill). Used for buttons, cards, inputs, and other rounded elements.

### Common Radius Values

- **2px (xss)**: Very subtle rounding
- **4px (xs)**: Small elements, badges
- **6px (sm)**: Buttons, small cards
- **8px (md)**: Standard cards, panels, modals
- **10px (lg)**: Large cards, prominent elements
- **16px (xl)**: Extra large cards
- **999px (max)**: Pill-shaped elements, fully rounded

## Border Widths

Border width tokens for consistent stroke weights across all components.

### Border Width Values

- **0.5px (hairline)**: Subtle borders, dividers
- **1px (thin)**: Standard borders for most components
- **2px (medium)**: Emphasized borders
- **4px (thick)**: Heavy borders for strong separation

## Usage

Always use spacing tokens instead of hardcoded pixel values to maintain consistency.

\`\`\`css
/* Spacing between elements */
.container {
  padding: var(--spacing-16);
  gap: var(--spacing-12);
}

/* Border radius */
.card {
  border-radius: var(--radius-md);
}

/* Border width */
.bordered {
  border-width: var(--border-width-thin);
}
\`\`\`

## Design Tokens

Key spacing and layout tokens:
- \`--spacing-*\`: Spacing values (2px to 128px)
- \`--spacing-style-spacing-4px-*\`: Alternative spacing tokens
- \`--radius-*\`: Border radius values (xs, sm, md, lg, xl, max)
- \`--border-width-*\`: Border width values (hairline, thin, medium, thick)`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SpacingExample: React.FC<{ token: string; name: string; value: string }> = ({
  token,
  name,
  value,
}) => {
  // Helper to get computed CSS variable value
  const getCSSVariable = (varName: string): string => {
    if (typeof window === "undefined") return value;
    const computed = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return computed || value;
  };
  
  const spacingValue = getCSSVariable(token);
  
  return (
    <div
      style={{
        border: `1px solid var(--semantic-border-subtle)`,
        borderRadius: "var(--radius-md)",
        padding: "16px",
        background: "var(--semantic-background-base)",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            width: spacingValue,
            height: "40px",
            background: "var(--semantic-brand-base)",
            borderRadius: "var(--radius-xs)",
          }}
        />
        <div style={{ flex: 1 }}>
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
            {spacingValue}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SpacingScale: Story = {
  render: () => {
    const spacingTokens = [
      { token: "--spacing-style-spacing-4px-0-5-2px", name: "2px", value: "2px" },
      { token: "--spacing-style-spacing-4px-1-4px", name: "4px", value: "4px" },
      { token: "--spacing-style-spacing-4px-1-5-6px", name: "6px", value: "6px" },
      { token: "--spacing-8", name: "8px", value: "8px" },
      { token: "--spacing-12", name: "12px", value: "12px" },
      { token: "--spacing-style-spacing-4px-4-16px", name: "16px", value: "16px" },
      { token: "--spacing-style-spacing-4px-5-20px", name: "20px", value: "20px" },
      { token: "--spacing-style-spacing-4px-6-24px", name: "24px", value: "24px" },
      { token: "--spacing-style-spacing-4px-8-32px", name: "32px", value: "32px" },
      { token: "--spacing-style-spacing-4px-10-40px", name: "40px", value: "40px" },
      { token: "--spacing-style-spacing-4px-12-48px", name: "48px", value: "48px" },
      { token: "--spacing-style-spacing-4px-16-64px", name: "64px", value: "64px" },
      { token: "--spacing-style-spacing-4px-20-80px", name: "80px", value: "80px" },
      { token: "--spacing-style-spacing-4px-24-96px", name: "96px", value: "96px" },
      { token: "--spacing-style-spacing-4px-32-128px", name: "128px", value: "128px" },
    ];

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
          Spacing Scale (4px-based)
        </h2>
        {spacingTokens.map((spacing) => (
          <SpacingExample
            key={spacing.token}
            token={spacing.token}
            name={spacing.name}
            value={spacing.value}
          />
        ))}
      </div>
    );
  },
};

export const CornerRadius: Story = {
  render: () => {
    const radiusTokens = [
      { token: "--radius-mode-1-radius-xss", name: "XSS", value: "2px", alias: "--radius-xs (when available)" },
      { token: "--radius-mode-1-radius-xs", name: "XS", value: "4px", alias: "--radius-xs" },
      { token: "--radius-mode-1-radius-sm", name: "SM", value: "6px", alias: "--radius-sm" },
      { token: "--radius-mode-1-radius-md", name: "MD", value: "8px", alias: "--radius-md" },
      { token: "--radius-mode-1-radius-lg", name: "LG", value: "10px", alias: "--radius-lg (when available)" },
      { token: "--radius-mode-1-radius-xl", name: "XL", value: "16px", alias: "--radius-xl (when available)" },
      { token: "--radius-mode-1-radius-xxl", name: "XXL", value: "20px", alias: "--radius-xxl (when available)" },
      { token: "--radius-mode-1-radius-max", name: "MAX", value: "999px", alias: "Pill/Circle" },
    ];

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
          Corner Radius
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "var(--spacing-style-spacing-4px-4-16px)",
          }}
        >
          {radiusTokens.map((radius) => (
            <div
              key={radius.token}
              style={{
                border: `1px solid var(--semantic-border-subtle)`,
                borderRadius: "var(--radius-md)",
                padding: "16px",
                background: "var(--semantic-background-base)",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "var(--semantic-brand-base)",
                  borderRadius: `var(${radius.token})`,
                  marginBottom: "12px",
                  border: `1px solid var(--semantic-border-subtle)`,
                }}
              />
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
                {radius.name}
              </div>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  lineHeight: "var(--fonts-semantic-sm-line-height)",
                  fontWeight: "var(--font-weight-regular)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-secondary)",
                  marginBottom: "2px",
                  wordBreak: "break-word",
                }}
              >
                {radius.token}
              </div>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  lineHeight: "var(--fonts-semantic-sm-line-height)",
                  fontWeight: "var(--font-weight-regular)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-muted)",
                  marginBottom: "4px",
                }}
              >
                {radius.value}
              </div>
              {radius.alias && (
                <div
                  style={{
                    fontSize: "var(--fonts-semantic-md)",
                    lineHeight: "var(--fonts-semantic-md-line-height)",
                    fontWeight: "var(--font-weight-regular)",
                    fontFamily: "var(--font-family-base)",
                    color: "var(--semantic-text-secondary)",
                  }}
                >
                  {radius.alias}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const BorderWidths: Story = {
  render: () => {
    const borderWidths = [
      { token: "--border-widths-mode-1-border-widht-hairline", name: "Hairline", value: "0.5px", desc: "Subtle borders" },
      { token: "--border-width-thin", name: "Thin", value: "1px", desc: "Standard borders" },
      { token: "--border-widths-mode-1-border-width-medium", name: "Medium", value: "2px", desc: "Emphasized borders" },
      { token: "--border-widths-mode-1-border-width-thick", name: "Thick", value: "4px", desc: "Heavy borders" },
    ];

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
          Border Widths
        </h2>
        {borderWidths.map((border) => (
          <div
            key={border.token}
            style={{
              border: `1px solid var(--semantic-border-subtle)`,
              borderRadius: "var(--radius-md)",
              padding: "16px",
              background: "var(--semantic-background-base)",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                height: "60px",
                borderTop: `${border.value} solid var(--semantic-brand-base)`,
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "12px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: border.value,
                  background: "var(--semantic-brand-base)",
                }}
              />
            </div>
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
              {border.name}
            </div>
            <div
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                lineHeight: "var(--fonts-semantic-sm-line-height)",
                fontWeight: "var(--font-weight-regular)",
                fontFamily: "var(--font-family-base)",
                color: "var(--semantic-text-secondary)",
                marginBottom: "2px",
                wordBreak: "break-word",
              }}
            >
              {border.token}
            </div>
            <div
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                lineHeight: "var(--fonts-semantic-sm-line-height)",
                fontWeight: "var(--font-weight-regular)",
                fontFamily: "var(--font-family-base)",
                color: "var(--semantic-text-muted)",
                marginBottom: "4px",
              }}
            >
              {border.value}
            </div>
            {border.desc && (
              <div
                style={{
                  fontSize: "var(--fonts-semantic-md)",
                  lineHeight: "var(--fonts-semantic-md-line-height)",
                  fontWeight: "var(--font-weight-regular)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                {border.desc}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  },
};

