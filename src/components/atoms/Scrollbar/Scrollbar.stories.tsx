import type { Meta, StoryObj } from "@storybook/react";
import { Scrollbar } from "./Scrollbar";

const meta: Meta<typeof Scrollbar> = {
  title: "Atoms/Scrollbar",
  component: Scrollbar,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `A scrollbar styling component that applies token-based scrollbar styles to its children.

## Features

- **8px thin scrollbar** for minimal visual footprint
- **Token-based colors** that adapt to theme
- **Interactive states**: hover and active/drag states
- **Cross-browser support** with fallbacks
- **Size variants**: thin (8px) and medium (12px)
- **Orientation variants**: horizontal, vertical, or both

## Implementation

The scrollbar uses semantic design tokens for consistent theming:

\`\`\`css
.arkem-scrollbar {
  scrollbar-color: var(--semantic-border-muted) var(--semantic-background-base);
  scrollbar-width: thin;
}

.arkem-scrollbar::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.arkem-scrollbar::-webkit-scrollbar-thumb {
  background: var(--semantic-border-muted);
}

.arkem-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--semantic-border-subtle);
}

.arkem-scrollbar::-webkit-scrollbar-thumb:active {
  background: var(--semantic-border-strong);
}
\`\`\`

## Design Tokens

- \`--semantic-background-base\`: Scrollbar track background (#080808)
- \`--semantic-border-muted\`: Default scrollbar thumb color (#212121)
- \`--semantic-border-subtle\`: Hover state color (#2d2d2d)
- \`--semantic-border-strong\`: Active/dragging state color (#e5e5e5)
- \`--radius-sm\`: Border radius for rounded scrollbar

## Browser Compatibility

- ✅ Chrome/Edge: Full support via \`::-webkit-scrollbar\`
- ✅ Safari: Full support via \`::-webkit-scrollbar\`
- ✅ Firefox: Uses \`scrollbar-color\` and \`scrollbar-width\`
- ✅ All browsers: Fallback to default scrollbar if custom styling not supported`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["thin", "medium"],
      description: "Scrollbar size variant",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical", "both"],
      description: "Scrollbar orientation",
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Scrollbar>;

export const HorizontalScroll: Story = {
  render: () => (
    <div style={{ width: "400px", padding: "var(--spacing-16)" }}>
      <Scrollbar orientation="horizontal">
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-16)",
            overflowX: "auto",
            padding: "var(--spacing-8)",
          }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                minWidth: "120px",
                height: "80px",
                background: "var(--semantic-background-raised)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--semantic-border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--semantic-text-primary)",
                fontSize: "var(--fonts-semantic-sm)",
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Horizontal scrolling container with custom scrollbar styling. Scroll horizontally to see the scrollbar.",
      },
    },
  },
};

export const VerticalScroll: Story = {
  render: () => (
    <div style={{ height: "300px", padding: "var(--spacing-16)" }}>
      <Scrollbar orientation="vertical">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-8)",
            overflowY: "auto",
            padding: "var(--spacing-8)",
            height: "100%",
          }}
        >
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              style={{
                padding: "var(--spacing-12)",
                background: "var(--semantic-background-raised)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--semantic-border-subtle)",
                color: "var(--semantic-text-primary)",
                fontSize: "var(--fonts-semantic-sm)",
              }}
            >
              List item {i + 1}
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical scrolling container with custom scrollbar styling. Scroll vertically to see the scrollbar.",
      },
    },
  },
};

export const BothDirections: Story = {
  render: () => (
    <div style={{ width: "400px", height: "300px", padding: "var(--spacing-16)" }}>
      <Scrollbar orientation="both">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 150px)",
            gap: "var(--spacing-8)",
            overflow: "auto",
            padding: "var(--spacing-8)",
            height: "100%",
          }}
        >
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              style={{
                padding: "var(--spacing-8)",
                background: "var(--semantic-background-raised)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--semantic-border-subtle)",
                color: "var(--semantic-text-primary)",
                fontSize: "var(--fonts-semantic-xs)",
                textAlign: "center",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Container with both horizontal and vertical scrolling. Scroll in both directions to see both scrollbars.",
      },
    },
  },
};

export const MediumSize: Story = {
  render: () => (
    <div style={{ width: "400px", padding: "var(--spacing-16)" }}>
      <Scrollbar size="medium" orientation="horizontal">
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-16)",
            overflowX: "auto",
            padding: "var(--spacing-8)",
          }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                minWidth: "120px",
                height: "80px",
                background: "var(--semantic-background-raised)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--semantic-border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--semantic-text-primary)",
                fontSize: "var(--fonts-semantic-sm)",
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Medium-sized scrollbar (12px) for better visibility. Compare with the thin variant.",
      },
    },
  },
};

export const InteractiveStates: Story = {
  render: () => (
    <div style={{ width: "400px", padding: "var(--spacing-16)" }}>
      <div
        style={{
          marginBottom: "var(--spacing-16)",
          padding: "var(--spacing-12)",
          background: "var(--semantic-background-raised)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--semantic-border-subtle)",
        }}
      >
        <h3
          style={{
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-lg)",
            fontWeight: "var(--font-weight-semibold)",
            margin: "0 0 var(--spacing-8) 0",
          }}
        >
          Scrollbar Interactive States
        </h3>
        <ul
          style={{
            color: "var(--semantic-text-secondary)",
            fontSize: "var(--fonts-semantic-sm)",
            margin: 0,
            paddingLeft: "var(--spacing-20)",
            lineHeight: "1.6",
          }}
        >
          <li>
            <strong>Default:</strong> Scrollbar thumb uses{" "}
            <code>var(--semantic-border-muted)</code>
          </li>
          <li>
            <strong>Hover:</strong> Scrollbar thumb becomes{" "}
            <code>var(--semantic-border-subtle)</code>
          </li>
          <li>
            <strong>Active/Drag:</strong> Scrollbar thumb becomes{" "}
            <code>var(--semantic-border-strong)</code>
          </li>
        </ul>
      </div>
      <Scrollbar orientation="horizontal">
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-16)",
            overflowX: "auto",
            padding: "var(--spacing-8)",
          }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                minWidth: "120px",
                height: "80px",
                background: "var(--semantic-background-raised)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--semantic-border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--semantic-text-primary)",
                fontSize: "var(--fonts-semantic-sm)",
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </Scrollbar>
      <p
        style={{
          color: "var(--semantic-text-muted)",
          fontSize: "var(--fonts-semantic-xs)",
          marginTop: "var(--spacing-12)",
          textAlign: "center",
        }}
      >
        Hover over and drag the scrollbar to see the state changes
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the interactive states of the scrollbar: default, hover, and active/drag states.",
      },
    },
  },
};

