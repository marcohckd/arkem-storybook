// src/components/Foundations/Typography.tokens.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import "../../styles/tokens.css";
import "../../styles/tokens-semantic.css";

const meta = {
  title: "Foundations/Typography",
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-fill-neutral-600)', minHeight: '100vh', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `ARKEM Design System uses a comprehensive typography system with two scales: Display (for headings and hero text) and Semantic (for UI components and body text).

## Typography Scales

- **Display Scale**: Large typography for headings and hero text (24px-72px)
  - Use for: Page titles, section headings, hero text, large displays
  - Range: Display XS (24px) to Display 2XL (72px)
  
- **Semantic Scale**: Medium typography for UI components and body text (10px-20px)
  - Use for: Button labels, input text, body content, UI component text
  - Range: Semantic XXS (10px) to Semantic 2XL (20px)

## Font Weights

- **Regular (400)**: Default body text and UI components
- **Medium (500)**: Emphasis, labels, and interactive elements
- **Semibold (600)**: Headings and important text
- **Bold (700)**: Strong emphasis and critical information

## Font Family

- **IBM Plex Sans**: Primary font family for all UI components and text
- Token: \`--font-family-base\`

## Usage Guidelines

Always use semantic tokens for UI components. Use display tokens for headings and hero sections.

\`\`\`css
/* Display scale for headings */
.heading {
  font-size: var(--fonts-display-lg);
  line-height: var(--fonts-display-lg-line-height);
  font-weight: var(--font-weight-regular);
}

/* Semantic scale for body text */
.body {
  font-size: var(--fonts-semantic-md);
  line-height: var(--fonts-semantic-md-line-height);
  font-weight: var(--font-weight-regular);
}

/* Button text (semantic scale) */
.button {
  font-size: var(--fonts-semantic-sm);
  line-height: var(--fonts-semantic-sm-line-height);
  font-weight: var(--font-weight-medium);
}
\`\`\`

## Design Tokens

Key typography tokens:
- \`--fonts-display-*\`: Display scale font sizes
- \`--fonts-display-*-line-height\`: Display scale line heights
- \`--fonts-semantic-*\`: Semantic scale font sizes
- \`--fonts-semantic-*-line-height\`: Semantic scale line heights
- \`--font-weight-regular/medium/semibold/bold\`: Font weights
- \`--font-family-base\`: Primary font family (IBM Plex Sans)`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const TypographyExample: React.FC<{
  token: string;
  name: string;
  description?: string;
  lineHeightToken?: string;
}> = ({ token, name, description, lineHeightToken }) => {
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
          fontSize: `var(${token})`,
          lineHeight: lineHeightToken ? `var(${lineHeightToken})` : "1.5",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--semantic-text-primary)",
          fontFamily: "var(--font-family-base)",
          marginBottom: "8px",
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
      <div
        style={{
          fontSize: "var(--fonts-semantic-sm)",
          lineHeight: "var(--fonts-semantic-sm-line-height)",
          fontWeight: "var(--font-weight-regular)",
          fontFamily: "var(--font-family-base)",
          color: "var(--semantic-text-secondary)",
          marginBottom: "4px",
        }}
      >
        {token}
      </div>
      {lineHeightToken && (
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
          {lineHeightToken}
        </div>
      )}
      <div
        style={{
          fontSize: "var(--fonts-semantic-md)",
          lineHeight: "var(--fonts-semantic-md-line-height)",
          fontWeight: "var(--font-weight-medium)",
          fontFamily: "var(--font-family-base)",
          color: "var(--semantic-text-secondary)",
        }}
      >
        {name}
      </div>
      {description && (
        <div
          style={{
            fontSize: "var(--fonts-semantic-md)",
            lineHeight: "var(--fonts-semantic-md-line-height)",
            fontWeight: "var(--font-weight-regular)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-muted)",
            marginTop: "4px",
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export const DisplayScale: Story = {
  render: () => {
    const displaySizes = [
      { token: "--fonts-display-2xl", lineHeight: "--fonts-display-2xl-line-height", name: "Display 2XL", desc: "72px / 90px" },
      { token: "--fonts-display-xl", lineHeight: "--fonts-display-xl-line-height", name: "Display XL", desc: "60px / 72px" },
      { token: "--fonts-display-lg", lineHeight: "--fonts-display-lg-line-height", name: "Display LG", desc: "48px / 60px" },
      { token: "--fonts-display-md", lineHeight: "--fonts-display-md-line-height", name: "Display MD", desc: "36px / 44px" },
      { token: "--fonts-display-sm", lineHeight: "--fonts-display-sm-line-height", name: "Display SM", desc: "30px / 38px" },
      { token: "--fonts-display-xs", lineHeight: "--fonts-display-xs-line-height", name: "Display XS", desc: "24px / 32px" },
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
          Display Scale (Headings & Hero Text)
        </h2>
        {displaySizes.map((size) => (
          <TypographyExample
            key={size.token}
            token={size.token}
            name={size.name}
            description={size.desc}
            lineHeightToken={size.lineHeight}
          />
        ))}
      </div>
    );
  },
};

export const SemanticScale: Story = {
  render: () => {
    const semanticSizes = [
      { token: "--fonts-semantic-2xl", lineHeight: "--fonts-semantic-2xl-line-height", name: "Semantic 2XL", desc: "20px / 28px" },
      { token: "--fonts-semantic-xl", lineHeight: "--fonts-semantic-xl-line-height", name: "Semantic XL", desc: "18px / 24px" },
      { token: "--fonts-semantic-lg", lineHeight: "--fonts-semantic-lg-line-height", name: "Semantic LG", desc: "16px / 24px" },
      { token: "--fonts-semantic-md", lineHeight: "--fonts-semantic-md-line-height", name: "Semantic MD", desc: "14px / 20px" },
      { token: "--fonts-semantic-sm", lineHeight: "--fonts-semantic-sm-line-height", name: "Semantic SM", desc: "12px / 16px" },
      { token: "--fonts-semantic-xs", lineHeight: "--fonts-semantic-xs-line-height", name: "Semantic XS", desc: "11px / 18px" },
      { token: "--fonts-semantic-xxs", lineHeight: "--fonts-semantic-xxs-line-height", name: "Semantic XXS", desc: "10px / 14px" },
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
          Semantic Scale (UI Components & Body Text)
        </h2>
        {semanticSizes.map((size) => (
          <TypographyExample
            key={size.token}
            token={size.token}
            name={size.name}
            description={size.desc}
            lineHeightToken={size.lineHeight}
          />
        ))}
      </div>
    );
  },
};

export const FontWeights: Story = {
  render: () => {
    const weights = [
      { token: "--font-weight-regular", value: "400", name: "Regular" },
      { token: "--font-weight-medium", value: "500", name: "Medium" },
      { token: "--font-weight-semibold", value: "600", name: "Semibold" },
      { token: "--font-weight-bold", value: "700", name: "Bold" },
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
          Font Weights
        </h2>
        {weights.map((weight) => (
          <div
            key={weight.token}
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
                fontSize: "var(--fonts-display-xs)",
                fontWeight: `var(${weight.token})`,
                color: "var(--semantic-text-primary)",
                fontFamily: "var(--font-family-base)",
                marginBottom: "8px",
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
            <div
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                lineHeight: "var(--fonts-semantic-sm-line-height)",
                fontWeight: "var(--font-weight-regular)",
                fontFamily: "var(--font-family-base)",
                color: "var(--semantic-text-secondary)",
                marginBottom: "4px",
              }}
            >
              {weight.token}
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
              {weight.value}
            </div>
            <div
              style={{
                fontSize: "var(--fonts-semantic-md)",
                lineHeight: "var(--fonts-semantic-md-line-height)",
                fontWeight: "var(--font-weight-medium)",
                fontFamily: "var(--font-family-base)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              {weight.name}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const FontFamilies: Story = {
  render: () => {
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
          Font Families
        </h2>
        <div
          style={{
            border: `1px solid var(--semantic-border-subtle)`,
            borderRadius: "var(--radius-md)",
            padding: "16px",
            background: "var(--semantic-background-base)",
          }}
        >
          <div
            style={{
              fontSize: "var(--fonts-display-md)",
              fontFamily: "var(--font-family-base)",
              color: "var(--semantic-text-primary)",
              marginBottom: "16px",
            }}
          >
            The quick brown fox jumps over the lazy dog
          </div>
          <div
            style={{
              fontSize: "var(--fonts-semantic-sm)",
              lineHeight: "var(--fonts-semantic-sm-line-height)",
              fontWeight: "var(--font-weight-regular)",
              fontFamily: "var(--font-family-base)",
              color: "var(--semantic-text-secondary)",
              marginBottom: "4px",
            }}
          >
            --font-family-base
          </div>
          <div
            style={{
              fontSize: "var(--fonts-semantic-md)",
              lineHeight: "var(--fonts-semantic-md-line-height)",
              fontWeight: "var(--font-weight-regular)",
              fontFamily: "var(--font-family-base)",
              color: "var(--semantic-text-muted)",
              marginBottom: "4px",
            }}
          >
            IBM Plex Sans
          </div>
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
            Primary font family for all UI components and text.
          </div>
        </div>
      </div>
    );
  },
};

