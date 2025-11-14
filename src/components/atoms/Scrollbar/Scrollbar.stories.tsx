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
                border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
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
                border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
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
                border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
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
                border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
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
  tags: ['!dev'],
  render: () => (
    <div style={{ width: "400px", padding: "var(--spacing-16)" }}>
      <div
        style={{
          marginBottom: "var(--spacing-16)",
          padding: "var(--spacing-12)",
          background: "var(--semantic-background-raised)",
          borderRadius: "var(--radius-md)",
          border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
        }}
      >
        <h3
          style={{
            color: "var(--semantic-text-primary)",
            fontSize: "var(--fonts-semantic-md)",
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
            margin: "var(--spacing-0)",
            paddingLeft: "var(--spacing-20)",
            lineHeight: "var(--fonts-semantic-sm-line-height)",
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
                border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
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

export const LongContent: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ width: "400px", height: "300px", padding: "var(--spacing-16)" }}>
      <Scrollbar orientation="vertical">
        <div
          style={{
            overflowY: "auto",
            padding: "var(--spacing-8)",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-12)",
            }}
          >
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: "var(--spacing-12)",
                  background: "var(--semantic-background-raised)",
                  borderRadius: "var(--radius-md)",
                  border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
                }}
              >
                <h4
                  style={{
                    color: "var(--semantic-text-primary)",
                    fontSize: "var(--fonts-semantic-sm)",
                    fontWeight: "var(--font-weight-medium)",
                    margin: "0 0 var(--spacing-8) 0",
                  }}
                >
                  Section {i + 1}
                </h4>
                <p
                  style={{
                    color: "var(--semantic-text-secondary)",
                    fontSize: "var(--fonts-semantic-sm)",
                    margin: "var(--spacing-0)",
                    lineHeight: "var(--fonts-semantic-sm-line-height)",
                  }}
                >
                  This is a longer content section to demonstrate vertical scrolling with the custom scrollbar.
                  The scrollbar provides a consistent visual style that matches the design system tokens.
                </p>
              </div>
            ))}
          </div>
        </div>
      </Scrollbar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Long content example showing vertical scrolling with many items. Demonstrates how the scrollbar handles extended content.",
      },
    },
  },
};

export const TableWithScrollbar: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ width: "500px", height: "300px", padding: "var(--spacing-16)" }}>
      <Scrollbar orientation="both">
        <div
          style={{
            overflow: "auto",
            height: "100%",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {Array.from({ length: 8 }, (_, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "var(--spacing-12)",
                      background: "var(--semantic-background-raised)",
                      border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
                      color: "var(--semantic-text-primary)",
                      fontSize: "var(--fonts-semantic-sm)",
                      fontWeight: "var(--font-weight-medium)",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Column {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 8 }, (_, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        padding: "var(--spacing-12)",
                        border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
                        color: "var(--semantic-text-secondary)",
                        fontSize: "var(--fonts-semantic-sm)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Row {rowIndex + 1}, Col {colIndex + 1}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Scrollbar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Table with scrollbar for both horizontal and vertical scrolling. Useful for large data tables that need to fit in a constrained space.",
      },
    },
  },
};

export const AccessibilityExample: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story: `This example demonstrates accessibility best practices for scrollable content:

1. **Keyboard Navigation**: Users can navigate scrollable content using:
   - Arrow keys (up/down for vertical, left/right for horizontal)
   - Page Up/Page Down keys
   - Home/End keys
   - Tab to navigate between scrollable regions

2. **Focus Indicators**: Ensure scrollable content has proper focus management

3. **Screen Reader Support**: 
   - Use semantic HTML (lists, tables, etc.)
   - Provide descriptive labels for scrollable regions
   - Announce scroll position changes when appropriate

4. **Visual Indicators**:
   - Scrollbar provides visual feedback about scroll position
   - Hover states indicate interactivity
   - Active states show when dragging

**Best Practices:**
- Always provide keyboard alternatives to scrolling
- Use semantic HTML structures inside scrollable containers
- Consider adding ARIA labels for complex scrollable regions
- Test with keyboard-only navigation
- Ensure scrollbars are visible and accessible`,
      },
    },
  },
  render: () => (
    <div style={{ width: "400px", height: "300px", padding: "var(--spacing-16)" }}>
      <Scrollbar orientation="vertical">
        <div
          role="region"
          aria-label="Accessible scrollable content"
          tabIndex={0}
          style={{
            overflowY: "auto",
            padding: "var(--spacing-8)",
            height: "100%",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = "2px solid var(--semantic-focus-ring)";
            e.currentTarget.style.outlineOffset = "2px";
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = "none";
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-12)",
            }}
          >
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: "var(--spacing-12)",
                  background: "var(--semantic-background-raised)",
                  borderRadius: "var(--radius-md)",
                  border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
                }}
              >
                <h4
                  style={{
                    color: "var(--semantic-text-primary)",
                    fontSize: "var(--fonts-semantic-sm)",
                    fontWeight: "var(--font-weight-medium)",
                    margin: "0 0 var(--spacing-8) 0",
                  }}
                >
                  Accessible Item {i + 1}
                </h4>
                <p
                  style={{
                    color: "var(--semantic-text-secondary)",
                    fontSize: "var(--fonts-semantic-sm)",
                    margin: "var(--spacing-0)",
                    lineHeight: "var(--fonts-semantic-sm-line-height)",
                  }}
                >
                  This scrollable region supports keyboard navigation. Use Arrow keys, Page Up/Down, or Home/End to navigate.
                </p>
              </div>
            ))}
          </div>
        </div>
      </Scrollbar>
    </div>
  ),
};

