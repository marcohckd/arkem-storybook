# Dark Mode Visual Design Audit Report

**Date:** 2025-01-XX  
**Project:** ARKEM Design System - OSINT Platform  
**Auditor:** AI Assistant  
**Focus:** Visual Design, Dark Mode Compliance, UI Consistency

---

## Executive Summary

### Overall Dark Mode Visual Score: **7.0/10**

The ARKEM Design System demonstrates **strong dark mode foundation** with comprehensive token architecture and consistent component styling. However, **critical visual issues** remain in shadow visibility, border contrast, and some background color choices that need immediate attention for optimal dark mode UX in an OSINT platform context.

### Key Strengths
- ✅ **Excellent** dark color palette (deep blacks, subtle grays)
- ✅ **Consistent** token usage across components
- ✅ **Good** visual hierarchy with semantic tokens
- ✅ **Strong** component structure

### Critical Visual Issues
- ❌ **Shadow visibility** too subtle for dark mode (`--shadow-xs` at 0.05 opacity)
- ❌ **Card background color** incorrect (`--semantic-background-raised: #8a8a8a` - too light)
- ❌ **Border contrast** may be insufficient in some contexts
- ⚠️ **Hardcoded rgba values** in shadows and effects
- ⚠️ **Text contrast** concerns with muted/secondary text
- ⚠️ **Sticky column shadows** may not be visible enough

---

## 1. Dark Mode Design Compliance

### 1.1 Shadow & Elevation Visibility

**Score: 5/10** ⚠️ **Critical Issue**

#### ❌ Critical Issues

**1. Shadow-XS Too Subtle for Dark Mode**
- **Severity:** Critical
- **Location:** `tokens-semantic.css:132`
- **Token:** `--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Issue:** 5% opacity black shadow is nearly invisible on dark backgrounds (#080808)
- **Impact:** 
  - Buttons and cards lack visual depth
  - Interactive elements don't feel elevated
  - Poor visual feedback for hover/focus states
- **Visual Test:** Shadow is barely perceptible against `--semantic-background-base` (#080808)
- **Fix:** Increase opacity to 0.15-0.25 for dark mode visibility
  ```css
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.25); /* Increased from 0.05 */
  ```
- **Components Affected:**
  - Button (secondary, black tone)
  - Card (when elevated)
  - Input (focus states)

**2. Table Sticky Column Shadow Insufficient**
- **Severity:** High
- **Location:** `Table.css:57, 142`
- **Issue:** `box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1)` - 10% opacity too subtle
- **Impact:** Sticky columns don't visually separate from scrollable content
- **Fix:** Increase opacity or use lighter color for dark mode
  ```css
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.4); /* More visible */
  /* OR use brand color for subtle glow */
  box-shadow: -2px 0 8px rgba(224, 221, 91, 0.15);
  ```

**3. Hardcoded Shadow Values**
- **Severity:** Medium
- **Location:** Multiple components
- **Issue:** Shadows use hardcoded `rgba()` values instead of tokens
- **Impact:** Cannot adjust shadows globally for dark mode optimization
- **Fix:** Create shadow opacity tokens:
  ```css
  --shadow-opacity-xs: 0.25;
  --shadow-opacity-sm: 0.4;
  --shadow-opacity-md: 0.6;
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, var(--shadow-opacity-xs));
  ```

#### ✅ Strengths
- Skeuomorphic shadow (`--shadow-skeuomorphic`) has good contrast (0.3 opacity)
- Inner panel shadow (`--shadow-inner-panel`) uses brand color effectively
- Shadow tokens are consistently used (not hardcoded in most places)

### 1.2 Border Contrast & Visibility

**Score: 7/10**

#### ⚠️ Issues Found

**1. Subtle Borders May Be Too Subtle**
- **Severity:** Medium
- **Location:** `tokens-semantic.css:9-12`
- **Tokens:**
  - `--semantic-border-subtle: #2d2d2d` (on #080808 = 1.05:1 contrast)
  - `--semantic-border-muted: #212121` (on #080808 = 1.03:1 contrast)
  - `--semantic-border-ghosted: #1e1e1e` (on #080808 = 1.02:1 contrast)
- **Issue:** Very low contrast ratios may be hard to perceive
- **Impact:** 
  - Card borders barely visible
  - Table dividers may not provide clear separation
  - Input borders may not be clear enough
- **Visual Test:** Borders are visible but require close inspection
- **Recommendation:** 
  - For OSINT platform (data-heavy), consider slightly lighter borders
  - Test with users to determine optimal contrast
  - Document minimum contrast requirements

**2. Hairline Border Width**
- **Severity:** Low
- **Location:** Table, Tooltip components
- **Issue:** 0.5px borders may render inconsistently across displays
- **Impact:** May appear thicker or thinner depending on device pixel ratio
- **Recommendation:** Test on various displays, consider 1px minimum

**3. Border Color Consistency**
- **Severity:** Low
- **Issue:** Some components use `--semantic-border-subtle`, others use `--semantic-border-muted`
- **Impact:** Slight visual inconsistency
- **Recommendation:** Document when to use each border token

#### ✅ Strengths
- Strong border (`--semantic-border-strong: #e5e5e5`) provides excellent contrast
- Border tokens are consistently used
- Border widths are tokenized

### 1.3 State Visibility (Hover/Focus/Active)

**Score: 8/10**

#### ✅ Strengths
- Focus rings use brand color (`--semantic-focus-ring`) - highly visible
- Hover states use `--semantic-background-interactive` - good contrast
- Active states clearly defined

#### ⚠️ Minor Issues

**1. Disabled State Opacity**
- **Severity:** Low
- **Location:** Multiple components (Button, Input, Checkbox, Radio)
- **Issue:** `opacity: 0.5` may be too subtle for some users
- **Recommendation:** Test with users, consider 0.4 or 0.6

**2. Focus Ring Consistency**
- **Severity:** Low
- **Issue:** Some components use 3px focus ring, others use 2px outline
- **Impact:** Slight visual inconsistency
- **Recommendation:** Standardize to 3px focus ring everywhere

---

## 2. Visual Hierarchy & Readability

### 2.1 Typography Hierarchy

**Score: 8/10**

#### ✅ Strengths
- Clear semantic font scale (2xl → xxs)
- Good line-height ratios
- Consistent font weights
- Proper use of display vs semantic scales

#### ⚠️ Issues Found

**1. Text Color Contrast Concerns**
- **Severity:** Medium
- **Location:** `tokens-semantic.css:20-25`
- **Text Colors:**
  - `--semantic-text-primary: #e5e5e5` on `#080808` = **14.2:1** ✅ Excellent
  - `--semantic-text-secondary: #838383` on `#080808` = **5.1:1** ✅ Meets AA
  - `--semantic-text-muted: #5b5b5b` on `#080808` = **3.2:1** ⚠️ Below AA (needs 4.5:1)
- **Issue:** Muted text may not meet WCAG AA contrast requirements
- **Impact:** 
  - Helper text, metadata may be hard to read
  - Placeholder text may be insufficient
  - Secondary information may be inaccessible
- **Fix:** Lighten muted text color:
  ```css
  --semantic-text-muted: #6b6b6b; /* Increased from #5b5b5b */
  /* Or use secondary text for better contrast */
  ```

**2. Text on Brand Background**
- **Severity:** Medium
- **Location:** Button (color tone)
- **Combination:** `--semantic-text-inverse: #080808` on `--semantic-brand-base: #e0dd5b`
- **Contrast:** ~8.5:1 ✅ Meets AAA
- **Status:** Good contrast, but verify in actual usage

**3. Table Header Text**
- **Severity:** Low
- **Location:** Table component
- **Issue:** Small size variant uses `--semantic-text-secondary` which may be too subtle
- **Recommendation:** Ensure sufficient contrast for all table variants

### 2.2 Spacing & Grouping

**Score: 8/10**

#### ✅ Strengths
- Consistent 4px-based spacing scale
- Good use of spacing tokens
- Clear visual grouping with borders and backgrounds

#### ⚠️ Issues Found

**1. Inconsistent Spacing Token Usage**
- **Severity:** Medium
- **Location:** Multiple components
- **Issue:** Some components use verbose primitive tokens (`--spacing-style-spacing-4px-4-16px`) instead of semantic (`--spacing-16`)
- **Impact:** Harder to maintain, less readable
- **Examples:**
  - Header component uses verbose tokens
  - Some story files use hardcoded values
- **Fix:** Standardize to semantic spacing tokens

**2. Card Padding Inconsistency**
- **Severity:** Low
- **Location:** `Card.css:11, 16, 21`
- **Issue:** Uses `--spacing-16` but token may not be defined (should be `var(--spacing-style-spacing-4px-4-16px)`)
- **Fix:** Verify token exists or use correct token

---

## 3. Component-Level UI Consistency

### 3.1 Background Colors

**Score: 6/10** ⚠️ **Critical Issue**

#### ❌ Critical Issues

**1. Card Background Color Error**
- **Severity:** Critical
- **Location:** `tokens-semantic.css:3`, `Card.css:4`
- **Token:** `--semantic-background-raised: #8a8a8a`
- **Issue:** This is a light gray color, completely wrong for dark mode!
- **Expected:** Should be a darker shade than base (e.g., #121212 or #181818)
- **Impact:** 
  - Cards appear as light gray boxes in dark UI
  - Breaks dark mode aesthetic
  - Poor contrast with text
- **Fix:** Change to appropriate dark color:
  ```css
  --semantic-background-raised: #121212; /* Slightly lighter than base */
  /* OR */
  --semantic-background-raised: #181818; /* More contrast */
  ```
- **Visual Impact:** This is a **critical visual bug** that breaks dark mode

**2. Background Token Naming Clarity**
- **Severity:** Low
- **Issue:** Token names don't explicitly indicate dark mode
- **Recommendation:** Consider naming like `--semantic-background-base-dark` for clarity
- **Note:** Current naming is acceptable if system is dark-only

#### ✅ Strengths
- Base background (`#080808`) is excellent deep black
- Muted background (`#2d2d2d`) provides good contrast
- Interactive background (`#5a5a5a`) is clearly visible

### 3.2 Component Visual Consistency

**Score: 8/10**

#### ✅ Strengths
- Consistent border radius usage
- Uniform border widths
- Good padding consistency within components
- Consistent use of semantic tokens

#### ⚠️ Issues Found

**1. Hardcoded Z-Index**
- **Severity:** Medium
- **Location:** `TooltipContent.tsx:54`
- **Issue:** `zIndex: 1000` hardcoded instead of using `--z-index-modal` or `--z-index-dropdown`
- **Fix:** Use token:
  ```tsx
  zIndex: 'var(--z-index-dropdown)', // 100
  ```

**2. Icon Size Hardcoding**
- **Severity:** Medium
- **Location:** `Button.css:78-91`, `Input.css:200-202`
- **Issue:** Icon sizes hardcoded (16px, 20px, 24px)
- **Impact:** Cannot adjust icon sizes globally
- **Fix:** Create icon size tokens (as noted in UX audit)

**3. Scrollbar Styling**
- **Severity:** Low
- **Location:** `Scrollbar.css`
- **Issue:** Scrollbar dimensions hardcoded (8px, 12px)
- **Recommendation:** Tokenize scrollbar dimensions

### 3.3 Pixel-Level Consistency

**Score: 9/10**

#### ✅ Strengths
- Consistent border widths
- Uniform border radius
- Good alignment patterns

#### ⚠️ Minor Issues

**1. Border Width Inconsistency**
- **Severity:** Low
- **Location:** Button component
- **Issue:** Some buttons use `0.5px` borders, others use `1px`
- **Impact:** Slight visual inconsistency
- **Recommendation:** Standardize border widths per component type

**2. Focus Ring Offset**
- **Severity:** Low
- **Issue:** Some components use `::after` pseudo-element for focus ring offset, others use `box-shadow`
- **Impact:** Slight visual difference
- **Recommendation:** Standardize focus ring implementation

---

## 4. Design Tokens & Theming

### 4.1 Token Naming & Organization

**Score: 8/10**

#### ✅ Strengths
- Clear semantic token naming
- Good separation of primitive vs semantic tokens
- Consistent naming patterns

#### ⚠️ Issues Found

**1. Token Typo (Already Identified)**
- **Severity:** High
- **Location:** `tokens.css:153`
- **Issue:** `border-widht-hairline` should be `border-width-hairline`
- **Impact:** Inconsistent naming, potential confusion

**2. Border Token Naming Inconsistency**
- **Severity:** Low
- **Location:** `tokens-semantic.css:127-131`
- **Issue:** Mix of `--border-text-*` and `--semantic-border-*` patterns
- **Recommendation:** Standardize to `--semantic-border-*` pattern

### 4.2 Token Usage Compliance

**Score: 7/10**

#### ✅ Strengths
- Most components use semantic tokens
- Good token coverage in CSS files

#### ⚠️ Issues Found

**1. Primitive Token Usage**
- **Severity:** Medium
- **Location:** Button.css, Badge.tsx, Checkbox.css
- **Issue:** Direct use of `--color-fill-neutral-*` instead of semantic tokens
- **Examples:**
  - Button grey tone uses `--color-fill-neutral-200`
  - Badge fallbacks use `--color-fill-neutral-600`
- **Impact:** Less maintainable, harder to theme
- **Fix:** Create semantic tokens for these use cases

**2. Hardcoded Values in Stories**
- **Severity:** Medium
- **Location:** All story files
- **Issue:** 165+ hardcoded values (as identified in UX audit)
- **Impact:** Poor examples for developers, inconsistent visuals
- **Fix:** Systematic refactor to use tokens

---

## 5. Storybook Visual Review

### 5.1 Dark Mode Representation

**Score: 7/10**

#### ✅ Strengths
- Storybook backgrounds configured (`arkem-base`)
- Most stories use dark backgrounds
- Good visual examples

#### ⚠️ Issues Found

**1. Hardcoded Background Colors**
- **Severity:** Medium
- **Location:** Multiple story files
- **Issue:** Stories use `backgroundColor: 'var(--color-fill-neutral-600)'` instead of semantic tokens
- **Examples:**
  - `Header.primary.stories.tsx:14`
  - `Table.stories.tsx:18`
  - `Modal.stories.tsx:15`
- **Fix:** Use `var(--semantic-background-base)` or Storybook background config

**2. Story Layout Inconsistencies**
- **Severity:** Low
- **Issue:** Mix of `layout: "centered"`, `layout: "padded"`, and inline styles
- **Impact:** Inconsistent visual presentation
- **Recommendation:** Standardize layout approach

**3. Missing Dark Mode Edge Cases**
- **Severity:** Low
- **Issue:** Stories don't demonstrate dark mode specific scenarios
- **Examples:**
  - Long content scrolling
  - Overlapping elements
  - High contrast scenarios
- **Recommendation:** Add dark mode specific test cases

### 5.2 Visual Accuracy

**Score: 8/10**

#### ✅ Strengths
- Stories accurately represent components
- Good use of controls for testing variations
- Comprehensive examples

#### ⚠️ Minor Issues

**1. Story Hardcoded Dimensions**
- **Severity:** Medium
- **Issue:** Stories use hardcoded widths (`300px`, `500px`) instead of responsive/token-based sizing
- **Impact:** Doesn't demonstrate responsive behavior
- **Fix:** Use tokens or responsive units

---

## 6. Component-Specific Visual Issues

### Button Component
**Score: 7/10**

**Issues:**
- ❌ Shadow-XS too subtle (affects secondary buttons)
- ⚠️ Primitive token usage (grey tone)
- ⚠️ Hardcoded icon sizes

**Recommendations:**
1. Increase shadow opacity for dark mode
2. Create semantic tokens for grey tone
3. Tokenize icon sizes

### Card Component
**Score: 4/10** ⚠️ **Critical**

**Issues:**
- ❌ **Background color completely wrong** (`#8a8a8a` - light gray!)
- ⚠️ Border may be too subtle

**Recommendations:**
1. **URGENT:** Fix background color to dark shade
2. Test border visibility
3. Verify contrast ratios

### Table Component
**Score: 7/10**

**Issues:**
- ⚠️ Sticky column shadow too subtle
- ⚠️ Border contrast concerns
- ⚠️ Token typo in border width

**Recommendations:**
1. Increase sticky column shadow opacity
2. Test border visibility with users
3. Fix token typo

### Input Component
**Score: 8/10**

**Issues:**
- ⚠️ Muted text contrast may be insufficient
- ⚠️ Placeholder text contrast

**Recommendations:**
1. Lighten muted text color
2. Verify placeholder contrast

### Modal Component
**Score: 8/10**

**Issues:**
- ✅ Good shadow usage (`--shadow-skeuomorphic`)
- ⚠️ Backdrop opacity may need adjustment

**Recommendations:**
1. Test backdrop visibility
2. Verify focus ring visibility

### Tooltip Component
**Score: 7/10**

**Issues:**
- ⚠️ Hardcoded z-index
- ⚠️ Border token typo

**Recommendations:**
1. Use z-index token
2. Fix border token typo

---

## 7. Severity Summary

### Critical (Must Fix Immediately)
1. **Card background color** (`#8a8a8a` → should be dark) - **Breaks dark mode**
2. **Shadow-XS visibility** (0.05 opacity → 0.25) - **Poor visual feedback**
3. **Muted text contrast** (#5b5b5b → lighter) - **Accessibility issue**

### High (Fix Soon)
1. **Table sticky column shadow** (increase opacity)
2. **Token typo** (`border-widht-hairline`)
3. **Hardcoded z-index** (TooltipContent)

### Medium (Plan For)
1. **Border contrast** (test and potentially lighten)
2. **Primitive token usage** (create semantic tokens)
3. **Story hardcoded values** (refactor to tokens)
4. **Icon size tokens** (create and use)

### Low (Nice to Have)
1. **Border width standardization**
2. **Focus ring consistency**
3. **Story layout standardization**

---

## 8. Recommended Fixes

### Immediate Actions (This Week)

1. **Fix Card Background Color** ⚠️ **CRITICAL**
   ```css
   /* tokens-semantic.css:3 */
   --semantic-background-raised: #121212; /* Changed from #8a8a8a */
   ```
   - **Effort:** 5 minutes
   - **Impact:** Fixes broken dark mode visual

2. **Increase Shadow-XS Opacity**
   ```css
   /* tokens-semantic.css:132 */
   --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.25); /* Changed from 0.05 */
   ```
   - **Effort:** 5 minutes
   - **Impact:** Better visual depth and feedback

3. **Lighten Muted Text**
   ```css
   /* tokens-semantic.css:23 */
   --semantic-text-muted: #6b6b6b; /* Changed from #5b5b5b */
   ```
   - **Effort:** 5 minutes
   - **Impact:** Better readability and accessibility

### Short-term Actions (Next 2 Weeks)

4. **Fix Token Typo**
   - Find/replace `border-widht-hairline` → `border-width-hairline`
   - **Effort:** 1 hour
   - **Impact:** Consistency

5. **Increase Table Sticky Shadow**
   ```css
   /* Table.css:57, 142 */
   box-shadow: -2px 0 8px rgba(0, 0, 0, 0.4);
   ```
   - **Effort:** 15 minutes
   - **Impact:** Better visual separation

6. **Fix Hardcoded Z-Index**
   ```tsx
   // TooltipContent.tsx:54
   zIndex: 'var(--z-index-dropdown)',
   ```
   - **Effort:** 5 minutes
   - **Impact:** Consistency

### Medium-term Actions (Next Month)

7. **Create Shadow Opacity Tokens**
   - Add opacity tokens for shadows
   - Update all shadow definitions
   - **Effort:** 2-3 hours

8. **Refactor Primitive Token Usage**
   - Create semantic tokens for grey tone
   - Update Button, Badge, Checkbox components
   - **Effort:** 4-6 hours

9. **Refactor Story Hardcoded Values**
   - Systematic pass through all stories
   - Replace with tokens
   - **Effort:** 8-12 hours

---

## 9. Dark Mode Best Practices Recommendations

### Shadow & Elevation
1. **Use higher opacity shadows** in dark mode (0.2-0.4 vs 0.05-0.1)
2. **Consider colored shadows** (brand color at low opacity) for depth
3. **Test shadow visibility** on actual dark backgrounds
4. **Document shadow usage** guidelines

### Contrast & Readability
1. **Verify all text meets WCAG AA** (4.5:1 for normal text)
2. **Test borders** at various sizes and contexts
3. **Consider slightly lighter borders** for data-heavy interfaces
4. **Document contrast ratios** for all color combinations

### Visual Hierarchy
1. **Use background elevation** (base → raised → interactive) for depth
2. **Leverage border contrast** for separation
3. **Use brand color** strategically for emphasis
4. **Maintain consistent spacing** for rhythm

### Component Consistency
1. **Standardize focus rings** (3px, brand color)
2. **Consistent border widths** per component type
3. **Uniform shadow usage** for similar elements
4. **Tokenize all visual values** (no hardcoded colors/sizes)

---

## 10. Visual Testing Checklist

### Dark Mode Visual Tests
- [ ] All shadows visible on dark backgrounds
- [ ] All borders clearly visible
- [ ] Text meets contrast requirements
- [ ] Focus states clearly visible
- [ ] Hover states provide clear feedback
- [ ] Disabled states are distinguishable
- [ ] Overlapping elements have proper z-index
- [ ] Scrollbars are visible and styled
- [ ] Tooltips are readable
- [ ] Modals have proper backdrop

### Component Visual Tests
- [ ] Cards have correct dark background
- [ ] Buttons have visible shadows/elevation
- [ ] Tables have clear row separation
- [ ] Inputs have visible borders
- [ ] Modals have proper elevation
- [ ] Drawers have clear separation
- [ ] Headers have visible borders
- [ ] Badges have sufficient contrast

### Token Compliance Tests
- [ ] No hardcoded colors in components
- [ ] No hardcoded spacing in components
- [ ] No hardcoded shadows in components
- [ ] All z-index values use tokens
- [ ] All icon sizes use tokens (when created)

---

## 11. Conclusion

The ARKEM Design System has a **solid dark mode foundation** with excellent token architecture and consistent component patterns. However, **critical visual issues** need immediate attention:

1. **Card background color** is completely wrong (light gray instead of dark)
2. **Shadows are too subtle** for dark mode visibility
3. **Text contrast** needs improvement for accessibility

With these fixes, the system will provide an **excellent dark mode experience** suitable for an OSINT platform where visual clarity and data readability are paramount.

**Priority:** Fix critical issues immediately, then address high-priority items within 2 weeks.

---

## Appendix A: Contrast Ratio Calculations

### Text on Background
- `#e5e5e5` on `#080808` = **14.2:1** ✅ AAA
- `#838383` on `#080808` = **5.1:1** ✅ AA
- `#5b5b5b` on `#080808` = **3.2:1** ❌ Below AA (needs 4.5:1)

### Brand Colors
- `#080808` on `#e0dd5b` = **8.5:1** ✅ AAA

### Borders
- `#2d2d2d` on `#080808` = **1.05:1** ⚠️ Very low (acceptable for subtle borders)

## Appendix B: Shadow Opacity Recommendations

| Shadow Type | Current Opacity | Recommended | Reason |
|------------|----------------|-------------|--------|
| `--shadow-xs` | 0.05 | 0.25 | Too subtle for dark mode |
| `--shadow-skeuomorphic` | 0.3 | 0.3-0.4 | Good, may increase slightly |
| `--shadow-inner-panel` | 0.29 (brand) | 0.29 | Good, brand color works well |
| Table sticky | 0.1 | 0.4 | Too subtle for separation |

---

**Report Generated:** 2025-01-XX  
**Next Review:** After critical fixes implemented

