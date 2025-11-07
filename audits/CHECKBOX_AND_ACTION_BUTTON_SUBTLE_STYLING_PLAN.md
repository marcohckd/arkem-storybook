# Checkbox, Action Button, and Badge Subtle Styling Plan

## Executive Summary

This plan outlines the implementation of more subtle styling for checkboxes, action buttons, and role tags (badges) in the ARKEM Design System, along with creating dedicated Storybook stories for Checkbox and Badge components, and a new table-specific action button variant.

## Current State Analysis

### Checkbox Component
- **Location**: `src/components/Table/stubs/Checkbox.tsx`
- **Current Implementation**: 
  - Native HTML `<input type="checkbox">` with inline styles
  - Uses `accentColor: var(--semantic-brand-base)` (bright yellow brand color)
  - Size: 16px × 16px
  - No Storybook story exists
- **Issues**: 
  - Brand color is too prominent for table contexts
  - No visual customization beyond native browser styling
  - Limited control over checked/unchecked states

### Action Buttons
- **Location**: `src/components/Button/Button.tsx` and `Button.css`
- **Current Implementation**:
  - Uses `function="action"` prop
  - Border: `var(--border-width-thin) solid var(--semantic-border-subtle)`
  - Icon-only design (no text)
  - Used in `UserManagementTable` for edit actions
- **Issues**:
  - Border may be too visible in table contexts
  - No table-specific variant for more subtle appearance

### Badge Component (Role Tags)
- **Location**: `src/components/Table/stubs/Badge.tsx`
- **Current Implementation**:
  - Two variants: `default` (brand color) and `secondary` (muted background)
  - Default variant: `background: var(--semantic-brand-base)` (bright yellow)
  - Secondary variant: `background: var(--semantic-background-muted)` with border
  - Used in `UserManagementTable` for role tags (admin/user)
  - No Storybook story exists
- **Issues**:
  - Default variant uses bright brand color which is too prominent for table contexts
  - Secondary variant may need more subtle styling
  - No documentation or story for component

## Goals

1. **Restyle Checkboxes**: Make them more subtle using muted colors and custom styling
2. **Restyle Action Buttons**: Create a more subtle appearance for table contexts
3. **Restyle Badges (Role Tags)**: Make them more subtle using muted colors
4. **Create Checkbox Story**: Document checkbox component with all states
5. **Create Badge Story**: Document badge component with all variants and states
6. **Create Table Action Button Variant**: New variant specifically for table actions

## Implementation Plan

### Phase 1: Restyle Checkbox Component

**File**: `src/components/Table/stubs/Checkbox.tsx`

**Changes**:
1. Replace native checkbox with custom-styled checkbox using CSS
2. Use semantic tokens for colors:
   - Unchecked border: `var(--semantic-border-subtle)` or `var(--semantic-border-muted)`
   - Checked background: `var(--color-fill-neutral-600)` or `var(--color-fill-neutral-700)` (more subtle than brand)
   - Checked checkmark: `var(--semantic-text-primary)` or `var(--semantic-text-secondary)`
   - Hover state: Slightly lighter border or background
   - Focus state: Focus ring using `var(--semantic-focus-ring)`
3. Maintain 16px × 16px size
4. Add CSS class for styling
5. Ensure accessibility (ARIA labels, keyboard support)

**New CSS File**: `src/components/Table/stubs/Checkbox.css`

**Token Recommendations**:
- Consider adding `--semantic-checkbox-border` token if needed
- Consider adding `--semantic-checkbox-bg-checked` token
- Consider adding `--semantic-checkbox-checkmark` token

### Phase 2: Create Checkbox Storybook Story

**File**: `src/components/Table/stubs/Checkbox.stories.tsx`

**Story Structure**:
- **Default**: Basic checkbox states (unchecked, checked)
- **States**: Default, hover, focused, disabled
- **Interactive**: With state management
- **In Table Context**: Show checkbox in table row
- **Accessibility**: Demonstrate ARIA labels

**Controls**:
- `checked`: boolean
- `disabled`: boolean
- `aria-label`: string

### Phase 3: Restyle Action Buttons for Subtle Appearance

**File**: `src/components/Button/Button.css`

**Changes**:
1. Update existing `[data-function="action"]` styles to be more subtle:
   - Option A: Remove border entirely, use only background on hover
   - Option B: Use more muted border color (`var(--semantic-border-muted)`)
   - Option C: Reduce border width to 0.5px
2. Use more muted colors:
   - Default: Transparent background, subtle icon color
   - Hover: Very subtle background (`var(--color-fill-neutral-700)` or `var(--color-fill-neutral-800)`)
   - Icon color: `var(--semantic-text-secondary)` or `var(--semantic-text-subtle)` instead of primary

**Recommendation**: Option A (no border) with subtle hover background for maximum subtlety.

### Phase 4: Create Table Action Button Variant

**Option 1: New Function Variant**
- Add `function="table-action"` to Button component
- More subtle than `function="action"`
- No border, very subtle hover, muted icon color

**Option 2: New Tone Variant**
- Add `tone="subtle"` or `tone="ghost"` to Button component
- Can be combined with `function="action"`

**Option 3: New Hierarchy Variant**
- Add `hierarchy="ghost"` or `hierarchy="minimal"` to Button component
- Most flexible approach

**Recommendation**: Option 1 (new function variant) for clarity and specificity.

**Implementation**:
1. Add `function="table-action"` to `ButtonProps` interface
2. Add CSS styles for `[data-function="table-action"]`:
   - No border
   - Transparent background
   - Icon color: `var(--semantic-text-subtle)`
   - Hover: Very subtle background (`var(--color-fill-neutral-800)`)
   - Hover icon color: `var(--semantic-text-secondary)`
   - Focus: Focus ring only
3. Update `UserManagementTable.tsx` to use new variant

### Phase 5: Restyle Badge Component (Role Tags)

**File**: `src/components/Table/stubs/Badge.tsx`

**Changes**:
1. Update `default` variant to use more subtle colors:
   - Replace `var(--semantic-brand-base)` with muted neutral color
   - Use `var(--color-fill-neutral-600)` or `var(--color-fill-neutral-700)` for background
   - Use `var(--semantic-text-secondary)` or `var(--semantic-text-subtle)` for text
2. Update `secondary` variant for more subtle appearance:
   - Use more muted background color
   - Use more subtle border color
   - Ensure good contrast for readability
3. Consider adding a `subtle` variant if needed
4. Maintain accessibility (contrast ratios)

**Token Recommendations**:
- Consider adding `--semantic-badge-default-bg` token
- Consider adding `--semantic-badge-default-text` token
- Consider adding `--semantic-badge-secondary-bg` token
- Consider adding `--semantic-badge-secondary-border` token

### Phase 6: Create Badge Storybook Story

**File**: `src/components/Table/stubs/Badge.stories.tsx`

**Story Structure**:
- **Default**: Basic badge with default variant
- **Variants**: Show all variants (default, secondary, and subtle if added)
- **In Table Context**: Show badges in table row (role tags)
- **Sizes**: If size variants exist or are needed
- **Accessibility**: Demonstrate proper usage

**Controls**:
- `variant`: "default" | "secondary" | "subtle" (if added)
- `children`: string (text content)
- `style`: object (for custom styling)

### Phase 7: Update UserManagementTable

**File**: `src/components/UserManagementTable/UserManagementTable.tsx`

**Changes**:
1. Update edit button to use new `function="table-action"` variant
2. Verify checkbox styling works correctly in table context
3. Verify badge styling works correctly in table context
4. Test all states (hover, focus, disabled)

## Design Specifications

### Checkbox Subtle Styling

**Unchecked State**:
- Border: `1px solid var(--semantic-border-subtle)` or `var(--semantic-border-muted)`
- Background: Transparent
- Size: 16px × 16px
- Border radius: `var(--radius-xs)` or `2px`

**Checked State**:
- Border: `1px solid var(--color-fill-neutral-600)` or `var(--color-fill-neutral-700)`
- Background: `var(--color-fill-neutral-600)` or `var(--color-fill-neutral-700)`
- Checkmark: `var(--semantic-text-primary)` or white
- Checkmark size: 12px × 12px

**Hover State**:
- Border: Slightly lighter or same as default
- Background: Very subtle (`var(--color-fill-neutral-800)`)

**Focus State**:
- Focus ring: `var(--semantic-focus-ring)`
- Border: Maintained

**Disabled State**:
- Opacity: 0.5
- Pointer events: none

### Action Button Subtle Styling (Table Action Variant)

**Default State**:
- Border: None
- Background: Transparent
- Icon color: `var(--semantic-text-subtle)`
- Size: Maintain existing (md: 40px)

**Hover State**:
- Border: None
- Background: `var(--color-fill-neutral-800)` (very subtle)
- Icon color: `var(--semantic-text-secondary)`

**Focus State**:
- Focus ring: `var(--semantic-focus-ring)`
- Background: Transparent (or same as hover)

**Disabled State**:
- Opacity: 0.5
- Pointer events: none

### Badge Subtle Styling (Role Tags)

**Default Variant** (for admin role):
- Background: `var(--color-fill-neutral-600)` or `var(--color-fill-neutral-700)` (muted, not brand)
- Text color: `var(--semantic-text-secondary)` or `var(--semantic-text-primary)`
- Border: None (or very subtle if needed)
- Padding: Maintain existing (`var(--spacing-8) var(--spacing-12)`)
- Border radius: Maintain existing (`var(--radius-sm)`)
- Font size: Maintain existing (`var(--fonts-semantic-sm)`)
- Font weight: Maintain existing (`var(--font-weight-medium)`)

**Secondary Variant** (for user role):
- Background: `var(--color-fill-neutral-800)` or `var(--semantic-background-muted)` (very subtle)
- Text color: `var(--semantic-text-secondary)` or `var(--semantic-text-subtle)`
- Border: `var(--border-width-thin) solid var(--semantic-border-muted)` (more subtle than current)
- Padding: Maintain existing
- Border radius: Maintain existing
- Font size: Maintain existing
- Font weight: Maintain existing

**Hover State** (if interactive):
- Slightly lighter background
- Maintain text contrast

**Focus State** (if interactive):
- Focus ring: `var(--semantic-focus-ring)`
- Maintain background

## Token Additions (if needed)

**File**: `src/styles/tokens-semantic.css`

Consider adding:
```css
/* Checkbox tokens */
--semantic-checkbox-border: var(--semantic-border-subtle);
--semantic-checkbox-border-checked: var(--color-fill-neutral-600);
--semantic-checkbox-bg-checked: var(--color-fill-neutral-600);
--semantic-checkbox-checkmark: var(--semantic-text-primary);
--semantic-checkbox-hover-bg: var(--color-fill-neutral-800);

/* Badge tokens */
--semantic-badge-default-bg: var(--color-fill-neutral-600);
--semantic-badge-default-text: var(--semantic-text-secondary);
--semantic-badge-secondary-bg: var(--color-fill-neutral-800);
--semantic-badge-secondary-text: var(--semantic-text-secondary);
--semantic-badge-secondary-border: var(--semantic-border-muted);
```

## Implementation Checklist

### Checkbox Restyling
- [ ] Create `Checkbox.css` file with custom checkbox styles
- [ ] Update `Checkbox.tsx` to use custom styling instead of native
- [ ] Add checked/unchecked visual states
- [ ] Add hover state
- [ ] Add focus state with focus ring
- [ ] Add disabled state
- [ ] Test accessibility (keyboard navigation, screen readers)
- [ ] Verify in table context

### Checkbox Story
- [ ] Create `Checkbox.stories.tsx` file
- [ ] Add Default story
- [ ] Add States story (default, hover, focused, disabled)
- [ ] Add Interactive story with state management
- [ ] Add In Table Context story
- [ ] Add Controls for all props
- [ ] Add accessibility documentation

### Action Button Restyling
- [ ] Update `[data-function="action"]` styles for more subtle appearance
- [ ] Remove or reduce border visibility
- [ ] Use more muted colors
- [ ] Test in table context

### Table Action Button Variant
- [ ] Add `function="table-action"` to `ButtonProps` interface
- [ ] Add CSS styles for `[data-function="table-action"]`
- [ ] Add default, hover, focus, disabled states
- [ ] Update `UserManagementTable.tsx` to use new variant
- [ ] Test all states

### Badge Restyling
- [ ] Update `default` variant to use muted colors instead of brand
- [ ] Update `secondary` variant for more subtle appearance
- [ ] Ensure good contrast ratios for accessibility
- [ ] Test in table context (role tags)

### Badge Story
- [ ] Create `Badge.stories.tsx` file
- [ ] Add Default story
- [ ] Add Variants story (default, secondary)
- [ ] Add In Table Context story (role tags)
- [ ] Add Controls for all props
- [ ] Add accessibility documentation

### Documentation
- [ ] Update Button stories to include table-action variant
- [ ] Document checkbox component usage
- [ ] Document badge component usage
- [ ] Add examples in table context

## Acceptance Criteria

1. ✅ Checkboxes use muted colors instead of brand color
2. ✅ Checkboxes have custom styling (not native browser default)
3. ✅ Checkboxes are accessible (keyboard, screen reader)
4. ✅ Checkbox Storybook story exists with all states
5. ✅ Action buttons are more subtle (no border or very muted)
6. ✅ Table action button variant exists and is more subtle than regular action
7. ✅ Badges use muted colors instead of brand color for default variant
8. ✅ Badge secondary variant is more subtle
9. ✅ Badge Storybook story exists with all variants
10. ✅ All changes use tokens only (no hardcoded values)
11. ✅ All components maintain accessibility standards
12. ✅ Components work correctly in table context
13. ✅ All states (default, hover, focus, disabled) are styled appropriately
14. ✅ Badge contrast ratios meet WCAG AA standards

## Testing Checklist

- [ ] Checkbox renders correctly in all states
- [ ] Checkbox is keyboard accessible
- [ ] Checkbox works with screen readers
- [ ] Checkbox looks good in table rows
- [ ] Action buttons are visually more subtle
- [ ] Table action buttons are even more subtle
- [ ] All button states work correctly
- [ ] Storybook stories render correctly
- [ ] Controls work in Storybook

## Notes

- Consider creating a dedicated Checkbox component outside of stubs if it becomes more complex
- The table action variant can be used in other table contexts beyond UserManagementTable
- Subtle styling should maintain usability - don't make components too hard to see or interact with
- Ensure contrast ratios meet WCAG AA standards for accessibility

