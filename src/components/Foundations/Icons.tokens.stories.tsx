// src/components/Foundations/Icons.tokens.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState, useMemo, useEffect, Suspense } from "react";
import React from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import "../../styles/tokens.css";
import "../../styles/tokens-semantic.css";

// Get all icon names from dynamicIconImports
const ALL_ICON_NAMES = Object.keys(dynamicIconImports).sort();
const ICONS_PER_PAGE = 200;

type IconsGalleryProps = {
  size?: number;
  strokeWidth?: number;
  colorToken?: string;
};

const IconsGallery: React.FC<IconsGalleryProps> = ({
  size = 24,
  strokeWidth = 2,
  colorToken = "--semantic-text-secondary",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAZ, setSortAZ] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort icons
  const filteredIcons = useMemo(() => {
    let icons = [...ALL_ICON_NAMES];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      icons = icons.filter((icon) => icon.toLowerCase().includes(query));
    }
    
    // Apply sorting
    if (sortAZ) {
      icons.sort();
    }
    
    return icons;
  }, [searchQuery, sortAZ]);

  // Pagination
  const totalPages = Math.ceil(filteredIcons.length / ICONS_PER_PAGE);
  const startIndex = (currentPage - 1) * ICONS_PER_PAGE;
  const endIndex = startIndex + ICONS_PER_PAGE;
  const currentIcons = filteredIcons.slice(startIndex, endIndex);

  // Reset to page 1 when search/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortAZ]);


  return (
    <div style={{ padding: "var(--spacing-24)", background: "var(--semantic-background-base)", minHeight: "100vh" }}>
      <style>{`
        input[type="text"]::placeholder {
          color: var(--semantic-text-secondary) !important;
          opacity: 1;
        }
      `}</style>
      {/* Header with total count */}
      <div
        style={{
          marginBottom: "var(--spacing-8)",
          padding: "var(--spacing-16)",
          background: "var(--semantic-background-muted)",
          borderRadius: "var(--radius-md)",
          border: `0.5px solid var(--semantic-border-subtle)`,
        }}
      >
        <div
          style={{
            fontSize: "var(--fonts-semantic-lg)",
            fontWeight: "var(--font-weight-semibold)",
            lineHeight: "var(--fonts-semantic-lg-line-height)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-primary)",
            marginBottom: "var(--spacing-style-spacing-4px-0-5-2px)",
          }}
        >
          Total icons available: <strong style={{ color: "var(--semantic-brand-base)" }}>{ALL_ICON_NAMES.length}</strong>
        </div>
        {filteredIcons.length !== ALL_ICON_NAMES.length && (
          <div
            style={{
              fontSize: "var(--fonts-semantic-sm)",
              lineHeight: "var(--fonts-semantic-sm-line-height)",
              fontFamily: "var(--font-family-base)",
              color: "var(--semantic-text-muted)",
            }}
          >
            Showing {filteredIcons.length} of {ALL_ICON_NAMES.length} icons
          </div>
        )}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: "var(--spacing-8)",
          marginBottom: "var(--spacing-8)",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: "1",
            minWidth: "200px",
            padding: "var(--spacing-8) var(--spacing-12)",
            fontSize: "var(--fonts-semantic-md)",
            lineHeight: "var(--fonts-semantic-md-line-height)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--semantic-text-primary)",
            background: "var(--semantic-background-muted)",
            border: `0.5px solid var(--semantic-border-subtle)`,
            borderRadius: "var(--radius-sm)",
            fontFamily: "var(--font-family-base)",
            transition: "all 0.15s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 2px var(--semantic-brand-base)";
            e.currentTarget.style.background = "var(--color-fill-neutral-700)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "var(--color-fill-neutral-700)";
          }}
          onMouseEnter={(e) => {
            if (document.activeElement !== e.currentTarget) {
              e.currentTarget.style.background = "var(--semantic-background-interactive)";
            }
          }}
          onMouseLeave={(e) => {
            if (document.activeElement !== e.currentTarget) {
              e.currentTarget.style.background = "var(--color-fill-neutral-700)";
            }
          }}
        />
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-8)",
            fontSize: "var(--fonts-semantic-md)",
            lineHeight: "var(--fonts-semantic-md-line-height)",
            fontWeight: "var(--font-weight-medium)",
            fontFamily: "var(--font-family-base)",
            color: "var(--semantic-text-secondary)",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={sortAZ}
            onChange={(e) => setSortAZ(e.target.checked)}
            style={{ cursor: "pointer" }}
          />
          A-Z Sort
        </label>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--spacing-8)",
            padding: "var(--spacing-12)",
            background: "var(--semantic-background-muted)",
            borderRadius: "var(--radius-sm)",
            border: `0.5px solid var(--semantic-border-subtle)`,
          }}
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "var(--spacing-8) var(--spacing-16)",
              fontSize: "var(--fonts-semantic-md)",
              lineHeight: "var(--fonts-semantic-md-line-height)",
              fontWeight: "var(--font-weight-regular)",
              fontFamily: "var(--font-family-base)",
              color: currentPage === 1 ? "var(--semantic-text-muted)" : "var(--semantic-text-primary)",
              background: currentPage === 1 ? "var(--color-fill-neutral-700)" : "var(--color-fill-neutral-600)",
              border: `0.5px solid var(--semantic-border-subtle)`,
              borderRadius: "var(--radius-sm)",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = "var(--semantic-background-interactive)";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = currentPage === 1 ? "var(--color-fill-neutral-700)" : "var(--color-fill-neutral-600)";
              }
            }}
            onFocus={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.boxShadow = "0 0 0 2px var(--semantic-brand-base)";
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Previous
          </button>
          <div
            style={{
              fontSize: "var(--fonts-semantic-sm)",
              lineHeight: "var(--fonts-semantic-sm-line-height)",
              fontWeight: "var(--font-weight-regular)",
              fontFamily: "var(--font-family-base)",
              color: "var(--semantic-text-muted)",
            }}
          >
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: "var(--spacing-8) var(--spacing-16)",
              fontSize: "var(--fonts-semantic-sm)",
              color: currentPage === totalPages ? "var(--semantic-text-muted)" : "var(--semantic-text-primary)",
              background: currentPage === totalPages ? "var(--color-fill-neutral-700)" : "var(--color-fill-neutral-600)",
              border: `0.5px solid var(--semantic-border-subtle)`,
              borderRadius: "var(--radius-sm)",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = "var(--semantic-background-interactive)";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = currentPage === totalPages ? "var(--color-fill-neutral-700)" : "var(--color-fill-neutral-600)";
              }
            }}
            onFocus={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.boxShadow = "0 0 0 2px var(--semantic-brand-base)";
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* Icon grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
          gap: "var(--spacing-12)",
        }}
      >
        {currentIcons.map((iconName) => {
          const iconImport = dynamicIconImports[iconName as keyof typeof dynamicIconImports];
          if (!iconImport) return null;

          const LazyIcon = React.lazy(iconImport);

          return (
            <div
              key={iconName}
              style={{
                border: `1px solid var(--semantic-border-subtle)`,
                borderRadius: "var(--radius-md)",
                padding: "var(--spacing-12)",
                background: "var(--semantic-background-base)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--spacing-8)",
                transition: "all 0.15s ease",
                minHeight: "100px",
                color: `var(${colorToken})`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--semantic-background-overlay)";
                e.currentTarget.style.borderColor = "var(--semantic-brand-base)";
                e.currentTarget.style.color = "var(--semantic-text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--semantic-background-base)";
                e.currentTarget.style.borderColor = "var(--semantic-border-subtle)";
                e.currentTarget.style.color = `var(${colorToken})`;
              }}
            >
              <Suspense fallback={<div style={{ width: size, height: size }} />}>
                <LazyIcon
                  size={size}
                  strokeWidth={strokeWidth}
                  style={{ color: "currentColor" }}
                />
              </Suspense>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  lineHeight: "var(--fonts-semantic-sm-line-height)",
                  fontWeight: "var(--font-weight-regular)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-secondary)",
                  textAlign: "center",
                  wordBreak: "break-word",
                }}
              >
                {iconName}
              </div>
            </div>
          );
        })}
      </div>

      {/* No results message */}
      {filteredIcons.length === 0 && (
        <div
          style={{
            padding: "var(--spacing-style-spacing-4px-12-48px)",
            textAlign: "center",
            color: "var(--semantic-text-secondary)",
            fontSize: "var(--fonts-semantic-md)",
          }}
        >
          No icons found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

const meta: Meta<IconsGalleryProps> = {
  title: "Foundations/Icons",
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
        component: `ARKEM Design System uses **Lucide React** for all iconography. Lucide provides a comprehensive set of beautiful, consistent icons with over ${ALL_ICON_NAMES.length} icons available.

## Icon Library

Icons are loaded via \`lucide-react/dynamicIconImports\` to prevent tree-shaking in Storybook/Vite builds. Each icon is lazy-loaded for optimal performance.

## Usage

Icons are imported from lucide-react and can be used directly in components or passed as props to the Button component.

\`\`\`tsx
import { Settings, X, ArrowRight } from "lucide-react";

// Direct usage
<Settings size={16} color="currentColor" />

// With Button component
<Button trailingIconName="Settings" />

// With semantic color tokens
<Settings 
  size={16} 
  style={{ color: "var(--semantic-text-primary)" }} 
/>
\`\`\`

## Icon Sizing

Icons automatically scale with their container. Button components handle icon sizing automatically:
- **Small buttons (sm)**: 16px icons
- **Medium buttons (md)**: 20px icons  
- **Large buttons (lg)**: 24px icons

For standalone icons, use sizes that match your typography scale (12px, 16px, 20px, 24px).

## Icon Colors

Icons use semantic color tokens for consistent theming:
- \`--semantic-text-primary\`: Default icon color
- \`--semantic-text-secondary\`: Secondary icon color
- \`--semantic-text-muted\`: Muted icon color
- \`--semantic-brand-base\`: Brand-colored icons
- \`currentColor\`: Inherits text color from parent

## Accessibility

Always provide meaningful labels for icon-only buttons:
- Use \`aria-label\` for icon buttons
- Use \`aria-hidden="true"\` for decorative icons
- Ensure sufficient color contrast

## Design Tokens

Icon-related tokens:
- Icon colors use semantic text tokens: \`--semantic-text-*\`
- Icon sizes typically match button sizes or semantic font sizes
- Stroke width: 2px default (adjustable via \`strokeWidth\` prop)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "range", min: 12, max: 64, step: 1 },
      description: "Icon size in pixels",
    },
    strokeWidth: {
      control: { type: "range", min: 1, max: 2.5, step: 0.1 },
      description: "Icon stroke width",
    },
    colorToken: {
      control: "select",
      options: [
        "--semantic-text-primary",
        "--semantic-text-secondary",
        "--semantic-text-muted",
        "--semantic-text-subtle",
        "--semantic-text-inverse",
        "--semantic-brand-base",
        "--semantic-brand-hover",
      ],
      description: "Color token for icon color",
    },
  },
  args: {
    size: 24,
    strokeWidth: 2,
    colorToken: "--semantic-text-secondary",
  },
};

export default meta;
type Story = StoryObj<IconsGalleryProps>;

// Filter and sort Lucide icons (for backward compatibility with old stories)
const iconOptions = ALL_ICON_NAMES;

// Group icons by category (common prefixes)
const groupIcons = (icons: string[]) => {
  const groups: Record<string, string[]> = {
    Common: [],
    Arrow: [],
    File: [],
    Edit: [],
    Media: [],
    Navigation: [],
    Communication: [],
    Other: [],
  };

  icons.forEach((icon) => {
    if (["Settings", "X", "Check", "Plus", "Minus", "Search", "Filter", "More", "Menu"].includes(icon)) {
      groups.Common.push(icon);
    } else if (icon.startsWith("Arrow") || icon.startsWith("Chevron")) {
      groups.Arrow.push(icon);
    } else if (icon.startsWith("File") || icon.startsWith("Folder") || icon.startsWith("Image") || icon.startsWith("Download") || icon.startsWith("Upload")) {
      groups.File.push(icon);
    } else if (icon.startsWith("Edit") || icon.startsWith("Copy") || icon.startsWith("Cut") || icon.startsWith("Trash") || icon.startsWith("Pencil")) {
      groups.Edit.push(icon);
    } else if (icon.startsWith("Play") || icon.startsWith("Pause") || icon.startsWith("Volume") || icon.startsWith("Music") || icon.startsWith("Video")) {
      groups.Media.push(icon);
    } else if (icon.startsWith("Home") || icon.startsWith("Map") || icon.startsWith("Navigation") || icon.startsWith("Compass")) {
      groups.Navigation.push(icon);
    } else if (icon.startsWith("Mail") || icon.startsWith("Message") || icon.startsWith("Phone") || icon.startsWith("Notification")) {
      groups.Communication.push(icon);
    } else {
      groups.Other.push(icon);
    }
  });

  return groups;
};

const IconGrid: React.FC<{ icons: string[]; title: string }> = ({ icons, title }) => {
  return (
    <div style={{ marginBottom: "48px" }}>
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
        {title} ({icons.length} icons)
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "var(--spacing-style-spacing-4px-4-16px)",
        }}
      >
        {icons.map((iconName) => {
          const iconImport = dynamicIconImports[iconName as keyof typeof dynamicIconImports];
          if (!iconImport) return null;

          const LazyIcon = React.lazy(iconImport);

          return (
            <div
              key={iconName}
              style={{
                border: `1px solid var(--semantic-border-subtle)`,
                borderRadius: "var(--radius-md)",
                padding: "var(--spacing-16)",
                background: "var(--semantic-background-base)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--spacing-8)",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--semantic-background-overlay)";
                e.currentTarget.style.borderColor = "var(--semantic-brand-base)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--semantic-background-base)";
                e.currentTarget.style.borderColor = "var(--semantic-border-subtle)";
              }}
            >
              <Suspense fallback={<div style={{ width: 24, height: 24 }} />}>
                <LazyIcon
                  size={24}
                  style={{ color: "var(--semantic-text-primary)" }}
                />
              </Suspense>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  lineHeight: "var(--fonts-semantic-sm-line-height)",
                  fontWeight: "var(--font-weight-regular)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-secondary)",
                  textAlign: "center",
                  wordBreak: "break-word",
                }}
              >
                {iconName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const All: Story = {
  render: (args) => <IconsGallery {...args} />,
};

export const CommonIcons: Story = {
  render: () => {
    const commonIcons = ["Settings", "X", "Check", "Plus", "Minus", "Search", "Filter", "MoreVertical", "Menu", "ArrowRight", "ArrowLeft", "ChevronDown", "ChevronUp", "ChevronLeft", "ChevronRight"];

    return (
      <div style={{ padding: "var(--spacing-24)", background: "var(--semantic-background-base)" }}>
        <IconGrid icons={commonIcons} title="Commonly Used Icons" />
      </div>
    );
  },
};

