# Story File Naming Standard

**Last Updated:** 2025-01-27  
**Project:** ARKEM Design System  
**Purpose:** Document the standard for organizing Storybook story files

---

## Overview

The ARKEM Design System uses two approaches for organizing Storybook story files:

1. **Single File Approach** (Default) - All stories in one file: `ComponentName.stories.tsx`
2. **Split File Approach** (For Complex Components) - Stories split by major variant: `ComponentName.variant.stories.tsx`

---

## Standard: Single File Approach (Default)

**Use this approach for most components.**

### Naming Convention

```
ComponentName.stories.tsx
```

### Examples

- `Input.stories.tsx`
- `Table.stories.tsx`
- `Modal.stories.tsx`
- `Card.stories.tsx`
- `Tabs.stories.tsx`
- `FormField.stories.tsx`
- `Dropdown.stories.tsx`
- `Switch.stories.tsx`
- `Slider.stories.tsx`

### When to Use

✅ Use single file approach when:
- Component has fewer than 10-15 stories
- Stories are logically related and easy to navigate
- Component variants are manageable in one file
- Most common use case

### Story Organization in Single Files

Stories should be organized in this order:

1. **Default** - Basic usage example
2. **Playground** - Interactive controls (if applicable)
3. **States** - All interaction states (default, hover, focused, disabled)
4. **Sizes** - Size variants (if applicable)
5. **Variants** - Visual variants (if applicable)
6. **With[Feature]** - Feature-specific examples (e.g., `WithIcons`, `WithLabel`)
7. **Edge Cases** - Empty states, long content, error handling
8. **Composition** - Examples showing component composition
9. **Accessibility** - Accessibility examples (if applicable)

### Example Structure

```tsx
// ComponentName.stories.tsx
export const Default: Story = { ... };
export const States: Story = { ... };
export const Sizes: Story = { ... };
export const WithIcons: Story = { ... };
export const EmptyState: Story = { ... };
export const LongContent: Story = { ... };
```

---

## Standard: Split File Approach (For Complex Components)

**Use this approach only for components with many distinct variants or complex hierarchies.**

### Naming Convention

```
ComponentName.variant.stories.tsx
```

Where `variant` is a descriptive name for the major variant or use case.

### Examples

- `Button.primary.stories.tsx` - Primary hierarchy stories
- `Button.secondary.stories.tsx` - Secondary hierarchy stories
- `Button.actions.stories.tsx` - Action button variants
- `Button.mode.stories.tsx` - Mode hierarchy stories
- `Header.primary.stories.tsx` - Primary header stories
- `Header.secondary.stories.tsx` - Secondary header stories
- `Header.withSearch.stories.tsx` - Header with search functionality

### When to Use

✅ Use split file approach when:
- Component has 15+ stories
- Component has distinct major variants/hierarchies that warrant separate documentation
- Stories would be difficult to navigate in a single file
- Each variant has its own comprehensive documentation needs

### Current Usage

**Components Using Split Files:**
- **Button** - Split by hierarchy (primary, secondary, actions, mode)
- **Header** - Split by hierarchy and features (primary, secondary, withSearch)

**All Other Components** - Use single file approach

### Story Organization in Split Files

Each split file should follow the same organization pattern as single files:

1. **Default** - Basic usage for this variant
2. **States** - Interaction states
3. **Variations** - Sub-variants within this variant
4. **Examples** - Real-world usage examples

### Storybook Title Structure

Split files should use nested titles in Storybook:

```tsx
const meta: Meta<typeof Component> = {
  title: "Atoms/Button/Primary",  // Nested under component
  // or
  title: "Organisms/Header/Secondary",  // Nested under component
  // ...
};
```

This creates a clear hierarchy in Storybook:
```
Atoms/
  └── Button/
      ├── Primary
      ├── Secondary
      ├── Actions
      └── Mode
```

---

## Story Naming Conventions

### Standard Story Names

Use these consistent names across all story files:

| Story Name | Purpose | Example |
|------------|---------|---------|
| `Default` | Basic usage example | `<Component />` |
| `Playground` | Interactive controls for all props | Full argTypes controls |
| `States` | All interaction states | Default, hover, focused, disabled |
| `Sizes` | Size variants | sm, md, lg |
| `Variants` | Visual variants | primary, secondary, mode |
| `With[Feature]` | Feature-specific examples | `WithIcons`, `WithLabel`, `WithError` |
| `EmptyState` | Empty state handling | No data, no options |
| `LongContent` | Long content handling | Truncation, scrolling |
| `[Feature]Example` | Specific feature demo | `AccessibilityExample`, `CompositionExample` |

### Story Naming Best Practices

✅ **Do:**
- Use descriptive, consistent names
- Use PascalCase for story names
- Use `With[Feature]` pattern for feature-specific stories
- Use `[Feature]Example` for comprehensive examples
- Group related stories together

❌ **Don't:**
- Use generic names like `Story1`, `Story2`
- Mix naming patterns within the same component
- Use abbreviations unless widely understood
- Create stories with similar names that are hard to distinguish

### Examples

```tsx
// ✅ Good naming
export const Default: Story = { ... };
export const States: Story = { ... };
export const WithIcons: Story = { ... };
export const EmptyState: Story = { ... };
export const AccessibilityExample: Story = { ... };

// ❌ Avoid
export const Story1: Story = { ... };
export const Test: Story = { ... };
export const Example: Story = { ... };
```

---

## File Structure

### Component Folder Structure

```
src/components/
  └── [atomic-level]/
      └── [ComponentName]/
          ├── ComponentName.tsx
          ├── ComponentName.css
          ├── ComponentName.stories.tsx          # Single file (default)
          # OR
          ├── ComponentName.variant1.stories.tsx  # Split files (complex components)
          ├── ComponentName.variant2.stories.tsx
          └── index.ts                           # Re-exports
```

### Story File Location

✅ **Always co-locate story files with components:**
- Same directory as component
- Same base name as component
- `.stories.tsx` extension

---

## Migration Guidelines

### When to Migrate from Single to Split

Consider migrating to split files when:

1. **File Size** - Story file exceeds 500-600 lines
2. **Story Count** - More than 15 stories in one file
3. **Navigation** - Stories become difficult to find
4. **Documentation** - Variants need separate comprehensive docs

### When to Migrate from Split to Single

Consider consolidating to single file when:

1. **Simplification** - Component variants are simplified
2. **Story Count** - Each split file has fewer than 5 stories
3. **Maintenance** - Split files become harder to maintain

### Migration Process

1. **Document Decision** - Update this document with rationale
2. **Refactor Files** - Move stories to new structure
3. **Update Titles** - Adjust Storybook titles if needed
4. **Test Stories** - Verify all stories render correctly
5. **Update Imports** - Ensure no broken imports

---

## Story Tags

### Standard Tags

Use Storybook tags consistently:

| Tag | Purpose | Usage |
|-----|---------|-------|
| `['autodocs']` | Enable auto-generated docs | Add to meta object |
| `['!dev']` | Hide from production build | Add to individual stories |

### Tag Usage

```tsx
const meta: Meta<typeof Component> = {
  tags: ["autodocs"],  // Enable auto-docs
  // ...
};

export const Default: Story = {
  // No tags - visible in production
};

export const States: Story = {
  tags: ['!dev'],  // Hidden from production
  // ...
};
```

---

## Best Practices

### ✅ Do

- **Use single file approach by default** - Simpler and more maintainable
- **Use consistent story names** - Follow the standard naming conventions
- **Organize stories logically** - Group related stories together
- **Use descriptive story names** - Make it clear what each story demonstrates
- **Co-locate story files** - Keep stories with their components
- **Use tags appropriately** - Mark dev-only stories with `['!dev']`

### ❌ Don't

- **Don't split files unnecessarily** - Only split when truly needed
- **Don't mix naming patterns** - Be consistent within a component
- **Don't create overly generic names** - Be specific about what the story shows
- **Don't put stories in separate directories** - Keep them co-located
- **Don't skip the Default story** - Always include a basic usage example

---

## Examples

### Single File Example

```tsx
// Input.stories.tsx
const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
};

export const Default: Story = { ... };
export const States: Story = { ... };
export const Sizes: Story = { ... };
export const WithIcons: Story = { ... };
export const LongContent: Story = { ... };
```

### Split File Example

```tsx
// Button.primary.stories.tsx
const meta: Meta<typeof Button> = {
  title: "Atoms/Button/Primary",  // Nested title
  component: Button,
  tags: ["autodocs"],
};

export const Default: Story = { ... };
export const States: Story = { ... };
export const WithIcons: Story = { ... };
```

---

## Decision Matrix

Use this matrix to decide which approach to use:

| Criteria | Single File | Split Files |
|----------|-------------|-------------|
| Number of stories | < 15 | ≥ 15 |
| File size | < 500 lines | ≥ 500 lines |
| Distinct variants | Few | Many |
| Documentation needs | Standard | Comprehensive per variant |
| Navigation ease | Easy | Difficult in single file |

**Default:** Use single file unless criteria clearly favor split files.

---

## Summary

- **Default Approach:** Single file (`ComponentName.stories.tsx`)
- **Complex Components:** Split files (`ComponentName.variant.stories.tsx`)
- **Current Split Files:** Button (4 files), Header (3 files)
- **All Other Components:** Single file approach
- **Story Names:** Use consistent naming conventions
- **File Location:** Co-locate with components

---

**Document Maintained By:** Design System Team  
**Questions?** Refer to existing Button or Header components for examples of split file approach.

