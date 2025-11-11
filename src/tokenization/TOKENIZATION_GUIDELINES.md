# Tokenization Guidelines

This document outlines the ARKEM Design System's approach to tokenization and which hardcoded values are acceptable vs should be tokenized.

## Principles

1. **All visual values should use tokens** - Colors, spacing, typography, borders, shadows, etc. should reference tokens from `tokens.css` or `tokens-semantic.css`
2. **Component-specific dimensions may be hardcoded** - If a value is unique to a single component and not reused, it may be acceptable to hardcode
3. **Reusable values must be tokenized** - If a value appears in multiple components or contexts, it should be a token

## Acceptable Hardcoded Values

### Component-Specific Dimensions

These values are acceptable to hardcode because they are specific to individual components and not reused:

- **Button heights**: `32px` (sm), `40px` (md), `48px` (lg) - Component-specific sizing
- **Icon sizes**: `16px` (sm), `20px` (md), `24px` (lg) - Component-specific sizing
- **Modal dimensions**: `max-width: 1000px`, `height: 700px` - Component-specific layout
- **Table row heights**: `40px` (header), `48px` (body) - Component-specific sizing
- **Table column widths**: `68px`, `120px`, `280px`, `48px` - Component-specific layout

**Note**: If these values become standardized across multiple components, they should be moved to tokens (e.g., `--component-button-height-sm`, `--component-icon-size-md`).

### Token Source Files

Hardcoded values in token definition files are **required** and acceptable:
- `src/styles/tokens.css` - Raw token values (hex colors, pixel values, etc.)
- `src/styles/tokens-semantic.css` - Semantic token definitions (may reference raw tokens)

## Values That Must Be Tokenized

### Colors
- All colors must use semantic tokens (e.g., `var(--semantic-background-base)`, `var(--semantic-text-primary)`)
- Never use hex values directly in component CSS or stories

### Spacing
- All spacing values must use spacing tokens (e.g., `var(--spacing-style-spacing-4px-4-16px)`)
- Gap values in flex/grid layouts should use tokens
- Padding and margin should use tokens

### Typography
- Font sizes, line heights, and font weights must use typography tokens
- Never hardcode font sizes like `16px` or `14px` directly

### Borders
- Border colors, widths, and radii must use tokens
- Use semantic border tokens (e.g., `var(--semantic-border-subtle)`, `var(--border-width-thin)`, `var(--border-width-medium)`)

### Shadows
- All shadow values must use shadow tokens (e.g., `var(--shadow-xs)`, `var(--shadow-skeuomorphic)`)

### Focus Rings
- Focus ring colors and styles must use tokens (e.g., `var(--semantic-focus-ring)`)

### Z-Index
- All z-index values must use z-index tokens
- Use semantic z-index tokens (e.g., `var(--z-index-base)`, `var(--z-index-modal)`)
- Never hardcode z-index values like `1000` or `10` directly

### Animations & Transitions
- All transition durations and easing functions must use animation tokens
- Use transition tokens (e.g., `var(--transition-base)`, `var(--transition-fast)`, `var(--transition-slow)`)
- Never hardcode transition durations like `0.15s ease` or `0.3s cubic-bezier(...)` directly

### Letter Spacing
- All letter-spacing values must use typography tokens
- Use letter-spacing tokens (e.g., `var(--letter-spacing-tight)`, `var(--letter-spacing-normal)`)
- Never hardcode letter-spacing values like `0.2%` or `0.5px` directly

## Examples

### ✅ Good - Using Tokens

```css
.button {
  background: var(--semantic-brand-base);
  color: var(--semantic-text-inverse);
  padding: var(--spacing-8);
  border-radius: var(--radius-md);
  font-size: var(--fonts-semantic-md);
  box-shadow: var(--shadow-xs);
  transition: background-color var(--transition-base), color var(--transition-base);
  z-index: var(--z-index-base);
  letter-spacing: var(--letter-spacing-normal);
}
```

### ❌ Bad - Hardcoded Values

```css
.button {
  background: #e0dd5b;
  color: #080808;
  padding: 8px;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
```

### ✅ Acceptable - Component-Specific Dimensions

```css
.button[data-size="md"] {
  height: 40px; /* Component-specific, not reused elsewhere */
  padding: var(--spacing-8); /* Uses token */
}
```

### ❌ Should Be Tokenized - Reusable Values

```css
/* If this appears in multiple components, create a token */
.card {
  border-radius: 8px; /* Should be var(--radius-md) */
  padding: 16px; /* Should be var(--spacing-style-spacing-4px-4-16px) */
}
```

## Story Files

Story files should also use tokens for consistency:

### ✅ Good - Using Tokens in Stories

```tsx
// Standard container spacing
<div style={{ 
  display: "flex", 
  gap: "var(--spacing-style-spacing-4px-4-16px)",
  padding: "var(--spacing-12)"
}}>

// Navigation menu pattern (see Standard Component Patterns section)
<div style={{ 
  display: "flex", 
  flexDirection: "column",
  gap: "var(--spacing-style-spacing-4px-1-4px)" // 4px between items
}}>
  {items.map(item => (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--spacing-12)", // 12px between icon and text
      padding: "var(--spacing-8) var(--spacing-12)", // 8px vertical, 12px horizontal
      borderRadius: "var(--radius-md)" // 8px rounded corners
    }}>
      {item.icon}
      {item.label}
    </div>
  ))}
</div>
```

### ❌ Bad - Hardcoded Values in Stories

```tsx
// ❌ Bad - Hardcoded spacing
<div style={{ 
  display: "flex", 
  gap: "16px",
  padding: "12px"
}}>

// ❌ Bad - Hardcoded navigation menu pattern
<div style={{ 
  display: "flex", 
  flexDirection: "column",
  gap: "4px" // Should use token
}}>
  {items.map(item => (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px", // Should use token
      padding: "8px 12px", // Should use tokens
      borderRadius: "8px" // Should use token
    }}>
      {item.icon}
      {item.label}
    </div>
  ))}
</div>
```

## When to Create New Tokens

Create a new token when:
1. A value is used in 2+ components
2. A value represents a design system concept (e.g., "standard card padding")
3. A value might need to change globally (e.g., theme updates)

Do NOT create a token when:
1. A value is truly component-specific and unique
2. A value is a one-off layout adjustment
3. A value is in a token source file (tokens.css, tokens-semantic.css)

## Migration Checklist

When reviewing code for tokenization:

- [ ] All colors use semantic tokens
- [ ] All spacing uses spacing tokens
- [ ] All typography uses typography tokens
- [ ] All borders use border tokens
- [ ] All shadows use shadow tokens
- [ ] All z-index values use z-index tokens
- [ ] All animations/transitions use animation tokens
- [ ] All letter-spacing uses letter-spacing tokens
- [ ] Component-specific dimensions are documented
- [ ] Story files use tokens for layout values

## Available Token Categories

### Z-Index Tokens
- `--z-index-base`: Base z-index (1) - for focus rings, overlays within components
- `--z-index-sticky`: Sticky elements (10) - for sticky headers/footers
- `--z-index-dropdown`: Dropdown menus (100) - for dropdown overlays
- `--z-index-modal`: Modals and drawers (1000) - for modal overlays

### Animation Tokens
- `--transition-fast`: Fast transitions (0.1s ease) - for slider interactions
- `--transition-base`: Standard transitions (0.15s ease) - for most UI interactions
- `--transition-slow`: Slow transitions (0.3s cubic-bezier) - for drawer/modal animations
- `--easing-base`: Base easing function (ease)
- `--easing-smooth`: Smooth easing function (cubic-bezier(0.4, 0, 0.2, 1))

### Letter Spacing Tokens
- `--letter-spacing-tight`: Tight letter spacing (0.2%) - for table headers, uppercase text
- `--letter-spacing-normal`: Normal letter spacing (0.5px) - for labels, filters

## Standard Component Patterns

### Navigation Menu / List Item Pattern

For navigation menus, list items, and similar components with icons and text, use these standardized spacing patterns:

**Container Spacing:**
- **Gap between items**: `var(--spacing-style-spacing-4px-1-4px)` (4px) - Creates tight vertical rhythm between menu items

**Item Spacing:**
- **Gap between icon and text**: `var(--spacing-12)` (12px) - Standard spacing when expanded
- **Gap when collapsed**: `0` - No gap when showing icons only

**Item Padding:**
- **Vertical padding**: `var(--spacing-8)` (8px) - Top and bottom padding for clickable area
- **Horizontal padding**: `var(--spacing-12)` (12px) - Left and right padding for comfortable touch targets
- **Combined**: `var(--spacing-8) var(--spacing-12)` (8px vertical, 12px horizontal)

**Border Radius:**
- **Item border radius**: `var(--radius-md)` (8px) - Standard rounded corners for interactive items

**Example Usage:**

```css
/* Navigation menu container */
.nav-menu {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-style-spacing-4px-1-4px); /* 4px between items */
}

/* Navigation menu item */
.nav-menu__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-12); /* 12px between icon and text */
  padding: var(--spacing-8) var(--spacing-12); /* 8px vertical, 12px horizontal */
  border-radius: var(--radius-md); /* 8px rounded corners */
}

/* Collapsed state */
.nav-menu__item--collapsed {
  gap: 0; /* No gap when showing icons only */
}
```

**In Story Files:**

```tsx
// ✅ Good - Using tokens
<div style={{ 
  display: "flex", 
  flexDirection: "column",
  gap: "var(--spacing-style-spacing-4px-1-4px)" // 4px between items
}}>
  {items.map(item => (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--spacing-12)", // 12px between icon and text
      padding: "var(--spacing-8) var(--spacing-12)", // 8px vertical, 12px horizontal
      borderRadius: "var(--radius-md)" // 8px rounded corners
    }}>
      {item.icon}
      {item.label}
    </div>
  ))}
</div>

// ❌ Bad - Hardcoded values
<div style={{ 
  display: "flex", 
  flexDirection: "column",
  gap: "4px" // Should use token
}}>
  {items.map(item => (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px", // Should use token
      padding: "8px 12px", // Should use tokens
      borderRadius: "8px" // Should use token
    }}>
      {item.icon}
      {item.label}
    </div>
  ))}
</div>
```

**When to Use This Pattern:**
- Navigation menus (sidebar, top nav, etc.)
- List items with icons
- Menu items with icons and labels
- Any component displaying a vertical list of interactive items with icons

### Standard Font Size Patterns for Stories

For consistent typography in story files, use these standardized font size tokens:

**Headings:**
- **Section headings (h3)**: `var(--fonts-semantic-md)` (16px) - For main section titles in stories
- **Subsection headings**: `var(--fonts-semantic-sm)` (14px) - For subsections within stories

**Body Text:**
- **Body text**: `var(--fonts-semantic-sm)` (14px) - Standard body text in stories
- **Labels**: `var(--fonts-semantic-xs)` (12px) - Form labels, field labels
- **Metadata/Captions**: `var(--fonts-semantic-xs)` (12px) - Helper text, captions, metadata

**Component Titles:**
- **Card titles**: `var(--fonts-semantic-md)` (16px) - Titles within card components
- **Panel titles**: `var(--fonts-semantic-md)` (16px) - Titles within panel components

**Example Usage:**

```tsx
// ✅ Good - Using standardized smaller tokens
<h3 style={{ fontSize: "var(--fonts-semantic-md)", fontWeight: 600 }}>
  Section Title
</h3>

<p style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
  Body text content
</p>

<label style={{ fontSize: "var(--fonts-semantic-xs)", color: "var(--semantic-text-muted)" }}>
  Form Label
</label>

// ❌ Bad - Using larger tokens or hardcoded values
<h3 style={{ fontSize: "var(--fonts-semantic-lg)" }}> // Too large, use md
<h3 style={{ fontSize: "18px" }}> // Hardcoded, use token
<p style={{ fontSize: "var(--fonts-semantic-md)" }}> // Too large for body, use sm
```

**Font Size Token Reference:**
- `--fonts-semantic-xs`: 12px - Labels, metadata, captions
- `--fonts-semantic-sm`: 14px - Body text, subsection headings
- `--fonts-semantic-md`: 16px - Section headings, card/panel titles
- `--fonts-semantic-lg`: 18px - Reserved for component content, not story UI
- `--fonts-semantic-xl`: 20px - Reserved for component content, not story UI

## Avoid Grey Backgrounds

**Never use grey/neutral backgrounds in components** (except buttons which have a grey tone option). Always use semantic background tokens instead of `--color-fill-neutral-*` tokens for component backgrounds.

### When to Use Semantic Background Tokens

- **Base backgrounds**: Use `--semantic-background-base` for default component backgrounds
- **Muted backgrounds**: Use `--semantic-background-muted` for secondary/subtle backgrounds
- **Interactive backgrounds**: Use `--semantic-background-interactive` for hover/active states
- **Raised surfaces**: Use `--semantic-background-raised` for elevated surfaces

### Anti-Patterns

```css
/* ❌ Bad - Using neutral color tokens for backgrounds */
.component {
  background: var(--color-fill-neutral-200);
  background: var(--color-fill-neutral-600);
  background: var(--color-fill-neutral-800);
}

/* ✅ Good - Using semantic background tokens */
.component {
  background: var(--semantic-background-muted);
  background: var(--semantic-background-interactive);
  background: var(--semantic-background-base);
}
```

### Exception

Buttons are an exception - they have a `tone="grey"` option which uses `--semantic-background-grey-*` tokens. This is acceptable as it's a design system feature.

## Questions?

If you're unsure whether a value should be tokenized:
1. Check if it appears in multiple components
2. Check if it represents a design system concept
3. When in doubt, tokenize it - it's easier to remove a token than to add one later



