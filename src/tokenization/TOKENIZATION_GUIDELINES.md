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
<div style={{ 
  display: "flex", 
  gap: "var(--spacing-style-spacing-4px-4-16px)",
  padding: "var(--spacing-12)"
}}>
```

### ❌ Bad - Hardcoded Values in Stories

```tsx
<div style={{ 
  display: "flex", 
  gap: "16px",
  padding: "12px"
}}>
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

## Questions?

If you're unsure whether a value should be tokenized:
1. Check if it appears in multiple components
2. Check if it represents a design system concept
3. When in doubt, tokenize it - it's easier to remove a token than to add one later



