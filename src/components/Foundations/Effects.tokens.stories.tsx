// src/components/Foundations/Effects.tokens.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";

import "../../styles/tokens.css";
import "../../styles/tokens-semantic.css";

const meta: Meta = {
  title: "Foundations/Effects Tokens",
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--semantic-background-base)', minHeight: '100vh', padding: 'var(--spacing-20)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `ARKEM Design System provides tokens for visual effects including shadows, focus rings, and animations to create depth, hierarchy, and accessibility.

## Shadow Tokens

Elevation and depth effects for components. Shadows help create visual hierarchy and indicate interactive elements.

### Available Shadows

- **Extra Small (\`--shadow-xs\`)**: Subtle elevation for small elements, cards, and raised surfaces
- **Skeuomorphic (\`--shadow-skeuomorphic\`)**: Material-style shadow with border for modals and raised surfaces
- **Inner Panel (\`--shadow-inner-panel\`)**: Brand-colored inner shadow for panels and drawers, creating depth with a warm glow effect

## Focus Ring Tokens

Accessibility-focused visual indicators for keyboard navigation. Focus rings ensure users can see which element has keyboard focus.

### Focus Ring

- **Focus Ring (\`--semantic-focus-ring\`)**: Brand-colored focus indicator using brand color with 60% opacity
  - Used for: Buttons, inputs, links, and all interactive elements
  - Ensures WCAG contrast requirements for accessibility

## Animation Tokens

Motion and transition timing tokens (coming soon). Currently, components use inline transition values for smooth interactions.

## Usage

Apply effects using CSS custom properties:

\`\`\`css
/* Shadow for elevation */
.card {
  box-shadow: var(--shadow-xs);
}

.modal {
  box-shadow: var(--shadow-skeuomorphic);
}

.panel {
  box-shadow: var(--shadow-inner-panel);
}

/* Focus ring for accessibility */
.button:focus-visible {
  outline: 2px solid var(--semantic-focus-ring);
  outline-offset: 2px;
}
\`\`\`

## Design Tokens

Key effects tokens:
- \`--shadow-xs\`: Extra small shadow
- \`--shadow-skeuomorphic\`: Material-style shadow with border
- \`--shadow-inner-panel\`: Inner panel shadow with brand color
- \`--semantic-focus-ring\`: Focus ring color for accessibility`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Shadows: Story = {
  render: () => {
    const shadows = [
      {
        token: "--shadow-xs",
        name: "Extra Small",
        value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        desc: "Subtle elevation for small elements",
      },
      {
        token: "--shadow-skeuomorphic",
        name: "Skeuomorphic",
        value: "0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)",
        desc: "Material-style shadow with border for modals and raised surfaces",
      },
      {
        token: "--shadow-inner-panel",
        name: "Inner Panel Shadow",
        value: "inset 4px 4px 28px 1px rgba(224, 221, 91, 0.29)",
        desc: "Brand-colored inner shadow for panels and drawers, creating depth with a warm glow effect",
      },
    ];

    return (
      <div style={{ padding: "var(--spacing-24)", background: "var(--semantic-background-base)" }}>
        <h2
          style={{
            fontSize: "var(--fonts-display-xl)",
            fontWeight: "400",
            lineHeight: "var(--fonts-display-xl-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-primary)",
            marginBottom: "var(--spacing-24)",
            borderBottom: "1px solid var(--semantic-border-subtle)",
            paddingBottom: "var(--spacing-8)",
            background: "var(--semantic-background-base)",
          }}
        >
          Shadow Tokens
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "var(--spacing-24)",
          }}
        >
          {shadows.map((shadow) => (
            <div
              key={shadow.token}
              style={{
                border: `1px solid var(--semantic-border-subtle)`,
                borderRadius: "var(--radius-md)",
                padding: "var(--spacing-24)",
                background: "var(--semantic-background-base)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  background: shadow.token === "--shadow-inner-panel" 
                    ? "var(--semantic-background-base)" 
                    : "var(--semantic-background-overlay)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: `var(${shadow.token})`,
                  marginBottom: "var(--spacing-16)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid var(--semantic-border-subtle)`,
                }}
              >
                <div
                  style={{
                    fontSize: "var(--fonts-semantic-md)",
                    lineHeight: "var(--fonts-semantic-md-line-height)",
                    fontWeight: "var(--font-weight-regular)",
                    fontFamily: "var(--font-family-base)",
                    color: "var(--semantic-text-secondary)",
                  }}
                >
                  Preview
                </div>
              </div>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-medium)",
                  lineHeight: "var(--fonts-semantic-md-line-height)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-primary)",
                  marginBottom: "var(--spacing-8)",
                }}
              >
                {shadow.name}
              </div>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  lineHeight: "var(--fonts-semantic-sm-line-height)",
                  fontWeight: "var(--font-weight-regular)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-secondary)",
                  marginBottom: "var(--spacing-style-spacing-4px-0-5-2px)",
                  wordBreak: "break-word",
                }}
              >
                {shadow.token}
              </div>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  lineHeight: "var(--fonts-semantic-sm-line-height)",
                  fontWeight: "var(--font-weight-regular)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-muted)",
                  marginBottom: "var(--spacing-8)",
                  wordBreak: "break-word",
                }}
              >
                {shadow.value}
              </div>
              {shadow.desc && (
                <div
                  style={{
                    fontSize: "var(--fonts-semantic-md)",
                    lineHeight: "var(--fonts-semantic-md-line-height)",
                    fontWeight: "var(--font-weight-regular)",
                    fontFamily: "var(--font-family-base)",
                    color: "var(--semantic-text-secondary)",
                  }}
                >
                  {shadow.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const FocusRings: Story = {
  render: () => {
    const focusRings = [
      {
        token: "--semantic-focus-ring",
        name: "Focus Ring",
        value: "#e0dd5b59 (brand color with 60% opacity)",
        desc: "Accessibility focus indicator using brand color",
      },
    ];

    return (
      <div style={{ padding: "var(--spacing-24)", background: "var(--semantic-background-base)" }}>
        <h2
          style={{
            fontSize: "var(--fonts-display-xl)",
            fontWeight: "400",
            lineHeight: "var(--fonts-display-xl-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-primary)",
            marginBottom: "var(--spacing-24)",
            borderBottom: "1px solid var(--semantic-border-subtle)",
            paddingBottom: "var(--spacing-8)",
            background: "var(--semantic-background-base)",
          }}
        >
          Focus Ring Tokens
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "var(--spacing-24)",
          }}
        >
          {focusRings.map((ring) => (
            <div
              key={ring.token}
              style={{
                border: `1px solid var(--semantic-border-subtle)`,
                borderRadius: "var(--radius-md)",
                padding: "var(--spacing-24)",
                background: "var(--semantic-background-base)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  background: "var(--semantic-background-overlay)",
                  borderRadius: "var(--radius-md)",
                  border: `1px solid var(--semantic-border-subtle)`,
                  marginBottom: "var(--spacing-16)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <button
                  style={{
                    padding: "var(--spacing-12) var(--spacing-24)",
                    background: "var(--semantic-background-base)",
                    border: `1px solid var(--semantic-border-subtle)`,
                    borderRadius: "var(--radius-xs)",
                    color: "var(--semantic-text-primary)",
                    fontSize: "var(--fonts-semantic-md)",
                    lineHeight: "var(--fonts-semantic-md-line-height)",
                    fontWeight: "var(--font-weight-regular)",
                    fontFamily: "var(--font-family-base)",
                    cursor: "pointer",
                    outline: "none",
                    boxShadow: `0 0 0 3px var(${ring.token})`,
                  }}
                >
                  Focused Button
                </button>
              </div>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-medium)",
                  lineHeight: "var(--fonts-semantic-md-line-height)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-primary)",
                  marginBottom: "var(--spacing-8)",
                }}
              >
                {ring.name}
              </div>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  lineHeight: "var(--fonts-semantic-sm-line-height)",
                  fontWeight: "var(--font-weight-regular)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-secondary)",
                  marginBottom: "var(--spacing-style-spacing-4px-0-5-2px)",
                  wordBreak: "break-word",
                }}
              >
                {ring.token}
              </div>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  lineHeight: "var(--fonts-semantic-sm-line-height)",
                  fontWeight: "var(--font-weight-regular)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-muted)",
                  marginBottom: "var(--spacing-8)",
                  wordBreak: "break-word",
                }}
              >
                {ring.value}
              </div>
              {ring.desc && (
                <div
                  style={{
                    fontSize: "var(--fonts-semantic-md)",
                    lineHeight: "var(--fonts-semantic-md-line-height)",
                    fontWeight: "var(--font-weight-regular)",
                    fontFamily: "var(--font-family-base)",
                    color: "var(--semantic-text-secondary)",
                  }}
                >
                  {ring.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const Animations: Story = {
  render: () => {
    return (
      <div style={{ padding: "var(--spacing-24)", background: "var(--semantic-background-base)" }}>
        <h2
          style={{
            fontSize: "var(--fonts-display-xl)",
            fontWeight: "400",
            lineHeight: "var(--fonts-display-xl-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-primary)",
            marginBottom: "var(--spacing-24)",
            borderBottom: "1px solid var(--semantic-border-subtle)",
            paddingBottom: "var(--spacing-8)",
            background: "var(--semantic-background-base)",
          }}
        >
          Animation Tokens
        </h2>
        <div
          style={{
            border: `1px solid var(--semantic-border-subtle)`,
            borderRadius: "var(--radius-md)",
            padding: "24px",
            background: "var(--semantic-background-base)",
          }}
        >
          <div
            style={{
              fontSize: "var(--fonts-semantic-md)",
              lineHeight: "var(--fonts-semantic-md-line-height)",
              fontWeight: "var(--font-weight-regular)",
              fontFamily: "var(--font-family-base)",
              color: "var(--semantic-text-secondary)",
              fontStyle: "italic",
            }}
          >
            Animation tokens coming soon. Current components use inline transition values.
          </div>
        </div>
      </div>
    );
  },
};

