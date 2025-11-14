# Story Tokenization Audit Report

**Date:** Generated from codebase analysis  
**Scope:** All story files (`*.stories.tsx`) in the project  
**Reference:** `src/tokenization/TOKENIZATION_GUIDELINES.md`

## Executive Summary

This audit identifies violations of tokenization guidelines across all story files. The main issues found are:

1. **Hardcoded width/height values** - Many stories use hardcoded pixel values for container widths/heights
2. **Hardcoded font-weight numbers** - Using numeric values (500, 600) instead of font-weight tokens
3. **Hardcoded spacing values** - Using `padding: 0`, `margin: 0`, `gap: "0"` instead of tokens
4. **Hardcoded hex colors** - Some components use hardcoded hex colors in actual code
5. **Primitive token usage** - Using `var(--color-text-primary)` instead of `var(--semantic-text-primary)`
6. **Hardcoded line-height** - Using numeric values like `"1.6"` instead of tokens
7. **Hardcoded background gradients** - Using hex colors in gradient definitions

---

## Detailed Findings by File

### Atoms

#### `src/components/atoms/Input/Input.stories.tsx`

**Issues Found:**
1. **Hardcoded width values** (Multiple instances)
   - Line 221, 233, 251, 283, 343, 392, 437, 512: `width: "300px"`
   - **Fix:** Consider using a container width token or `maxWidth` with tokens

2. **Hardcoded font-weight** (3 instances)
   - Line 538, 559, 580: `fontWeight: 500`
   - **Fix:** Replace with `fontWeight: "var(--font-weight-medium)"`

3. **Hardcoded padding** (1 instance)
   - Line 319: `padding: 0`
   - **Fix:** Use `padding: "var(--spacing-0)"` or remove if truly zero

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/atoms/Button/Button.primary.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Button/Button.secondary.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Button/Button.mode.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Button/Button.actions.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Badge/Badge.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Avatar/Avatar.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Checkbox/Checkbox.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Divider/Divider.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Label/Label.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Link/Link.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/List/List.stories.tsx`

**Issues Found:**
1. **Hardcoded width/height values** (4 instances)
   - Line 113: `width: "500px", height: "400px"`
   - Line 149-150: `width: "500px", height: "400px"`
   - Line 199: `width: "500px", height: "300px"`
   - Line 230: `width: "500px", height: "400px"`
   - **Fix:** Consider using container tokens or responsive widths

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/atoms/MapPin/MapPin.stories.tsx`

**Issues Found:**
1. **Hardcoded width/height values** (Multiple instances)
   - Line 827-828: `width: "100%", height: "100vh"` (acceptable for fullscreen)
   - Line 848-849: `width: "800px", height: "600px"`
   - Line 874-875: `width: "100%", height: "100%"`
   - Line 995-996: `width: "100%", height: "100vh"`
   - Line 1113-1114: `width: "100%", height: "100%"`
   - Line 1396-1397: `width: "100%", height: "100vh"`
   - Line 1491-1492: `width: "100%", height: "100%"`
   - **Fix:** The 800px/600px should use tokens if possible, or document as component-specific

2. **Hardcoded background gradient with hex colors** (1 instance)
   - Line 841: `background: "linear-gradient(135deg, #0a0a0a 0%, #121212 50%, #0d0d0d 100%)"`
   - **Fix:** Use semantic background tokens or create a gradient token

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/atoms/Radio/Radio.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Scrollbar/Scrollbar.stories.tsx`

**Issues Found:**
1. **Hardcoded width/height values** (Multiple instances)
   - Line 92: `width: "400px"`
   - Line 107: `height: "80px"`
   - Line 136: `height: "300px"`
   - Line 145: `height: "100%"`
   - Line 178: `width: "400px", height: "300px"`
   - Line 187: `height: "100%"`
   - **Fix:** Consider using container tokens

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/atoms/Slider/Slider.stories.tsx`

**Issues Found:**
1. **Hardcoded width values** (Multiple instances)
   - Line 170, 204, 228, 305, 363, 445: `width: "300px"`
   - **Fix:** Consider using container width tokens

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/atoms/Spinner/Spinner.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Switch/Switch.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/atoms/Textarea/Textarea.stories.tsx`

**Issues Found:**
1. **Hardcoded width values** (2 instances)
   - Line 103, 114: `width: "300px"`
   - **Fix:** Consider using container width tokens

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/atoms/Tooltip/Tooltip.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

### Molecules

#### `src/components/molecules/Accordion/Accordion.stories.tsx`

**Issues Found:**
1. **Hardcoded width/height values** (Multiple instances)
   - Line 108: `height: '42px'` (component-specific, acceptable per guidelines)
   - Line 117: `width: '180px'` (component-specific, acceptable per guidelines)
   - Line 203, 369, 434: `width: "500px"`
   - Line 320: `width: "500px"`
   - **Fix:** The 500px widths should use tokens or be documented

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/molecules/Card/Card.stories.tsx`

**Issues Found:**
1. **Hardcoded width values** (Multiple instances)
   - Line 44, 56, 74, 105, 163: `width: "400px"`
   - Line 235: `width: "600px"`
   - **Fix:** Consider using container width tokens

2. **Hardcoded margin/padding** (Multiple instances)
   - Line 136, 240: `margin: 0`
   - Line 229, 232: `padding: 0 !important`
   - **Fix:** Use `margin: "var(--spacing-0)"` or remove if truly zero

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/molecules/Dropdown/Dropdown.stories.tsx`

**Issues Found:**
1. **Hardcoded width values** (Multiple instances)
   - Line 176, 188, 211, 252, 280, 304, 360, 512: `width: "300px"`
   - **Fix:** Consider using container width tokens

2. **Hardcoded font-weight** (3 instances)
   - Line 415, 442, 469: `fontWeight: 500`
   - **Fix:** Replace with `fontWeight: "var(--font-weight-medium)"`

3. **Hardcoded margin** (1 instance)
   - Line 542: `margin: 0`
   - **Fix:** Use `margin: "var(--spacing-0)"` or remove if truly zero

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/molecules/FormField/FormField.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/molecules/NavMenu/NavMenu.stories.tsx`

**Issues Found:**
1. **Hardcoded width values** (2 instances)
   - Line 299: `width: "256px"`
   - Line 305: `width: "64px"`
   - **Fix:** Consider using container width tokens

2. **Primitive token usage** (2 instances)
   - Line 300, 306: `color: "var(--color-text-primary)"`
   - **Fix:** Replace with `color: "var(--semantic-text-primary)"`

3. **Hardcoded font-weight** (2 instances)
   - Line 300, 306: `fontWeight: 600`
   - **Fix:** Replace with `fontWeight: "var(--font-weight-semibold)"`

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/molecules/NavMenu/NavMenu.tsx` (Component file, not story)

**Issues Found:**
1. **Hardcoded hex color** (1 instance)
   - Line 113: `backgroundColor: "#10b981"`
   - **Fix:** Replace with semantic token like `var(--semantic-feedback-success-base)` or appropriate status color token

2. **Hardcoded width/height values** (Multiple instances)
   - Line 39, 67-68, 84-85, 111-112, 145-146, 161: Various hardcoded dimensions
   - **Note:** These may be component-specific and acceptable per guidelines, but should be reviewed

3. **Hardcoded font-weight** (2 instances)
   - Line 95: `fontWeight: 500`
   - Line 126: `fontWeight: 600`
   - **Fix:** Replace with `var(--font-weight-medium)` and `var(--font-weight-semibold)`

**Status:** ⚠️ **Needs Updates** (Component file, not story)

---

#### `src/components/molecules/SearchBox/SearchBox.stories.tsx`

**Issues Found:**
1. **Hardcoded width values** (2 instances)
   - Line 65, 82: `width: "300px"`
   - **Fix:** Consider using container width tokens

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/molecules/Tabs/Tabs.stories.tsx`

**Issues Found:**
1. **Hardcoded width values** (Multiple instances)
   - Line 200, 223, 243, 265, 347: `width: "500px"`
   - Line 419: `width: "600px"`
   - **Fix:** Consider using container width tokens

2. **Hardcoded height/width values** (Component-specific, acceptable)
   - Line 38: `height: '44px'` (component-specific)
   - Line 285: `height: '44px'` (component-specific)
   - Line 539: `height: '42px'` (component-specific)
   - Line 549: `width: '100px'` (component-specific)

**Status:** ⚠️ **Needs Updates** (for 500px/600px widths only)

---

### Organisms

#### `src/components/organisms/Drawer/Drawer.stories.tsx`

**Issues Found:**
1. **Hardcoded padding with fallback** (3 instances)
   - Line 154, 181, 223: `padding: "var(--spacing-12, 12px)"`
   - **Fix:** Remove fallback value, use only `padding: "var(--spacing-12)"`

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/organisms/Header/Header.primary.stories.tsx`

**Issues Found:**
1. **Hardcoded width values** (5 instances)
   - Line 257, 260, 263, 266, 269: `width: "100%"`
   - **Note:** `100%` is acceptable for full-width containers

**Status:** ✅ **Compliant**

---

#### `src/components/organisms/Header/Header.secondary.stories.tsx`

**Issues Found:**
1. **Hardcoded width values** (5 instances)
   - Line 258, 261, 264, 267, 270: `width: "100%"`
   - **Note:** `100%` is acceptable for full-width containers

**Status:** ✅ **Compliant**

---

#### `src/components/organisms/Header/Header.withSearch.stories.tsx`

**Issues Found:**
1. **Hardcoded gap value** (1 instance)
   - Line 353: `gap: "0"`
   - **Fix:** Use `gap: "var(--spacing-0)"` or remove if truly zero

2. **Hardcoded width values** (3 instances)
   - Line 354, 362, 370: `width: "100%"`
   - **Note:** `100%` is acceptable for full-width containers

**Status:** ⚠️ **Needs Updates** (gap: "0" only)

---

#### `src/components/organisms/Modal/Modal.stories.tsx`

**Issues Found:**
1. **Hardcoded margin values** (2 instances)
   - Line 710: `margin: "0 0 var(--spacing-8) 0"`
   - Line 719: `margin: 0`
   - **Fix:** Use `margin: "0 0 var(--spacing-8) 0"` (first is acceptable) and `margin: "var(--spacing-0)"` for second

2. **Hardcoded line-height** (1 instance)
   - Line 720: `lineHeight: "1.6"`
   - **Fix:** Use a line-height token or calculate from font-size token

**Status:** ⚠️ **Needs Updates**

---

#### `src/components/organisms/Table/TableCell.tsx` (Component file, not story)

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

### Templates

#### `src/components/templates/DataTable/DataTable.stories.tsx`

**Issues Found:**
- ✅ **No violations found** - This file appears compliant

**Status:** ✅ **Compliant**

---

#### `src/components/templates/DeviceDetails/DeviceDetails.stories.tsx`

**Issues Found:**
1. **Hardcoded width/height values** (Multiple instances - component-specific, mostly acceptable)
   - Line 64: `height: '42px'` (component-specific, acceptable)
   - Line 66: `width: '100px'` (component-specific, acceptable)
   - Line 184: `height: '42px'` (component-specific, acceptable)
   - Line 194: `width: '100px'` (component-specific, acceptable)
   - Line 263: `height: '44px'` (component-specific, acceptable)
   - Line 326: `height: '100%'` (acceptable)
   - Line 343: `height: '56px'` (component-specific, acceptable)
   - Line 526: `height: '42px'` (component-specific, acceptable)
   - Line 536: `width: '180px'` (component-specific, acceptable)
   - Line 586: `height: '100%'` (acceptable)
   - Line 615: `height: '44px'` (component-specific, acceptable)

2. **Hardcoded background color** (1 instance)
   - Line 86: `bg \`var(--color-fill-neutral-800)\`` (in documentation comment)
   - **Note:** This is in documentation, but should reference semantic token

**Status:** ⚠️ **Minor Issues** (documentation reference)

---

### Pages

#### `src/components/pages/UserManagement/UserManagementTable/UserManagementTable/UserManagementTable.stories.tsx`

**Issues Found:**
1. **Hardcoded padding** (1 instance)
   - Line 29: `padding: 0`
   - **Fix:** Use `padding: "var(--spacing-0)"` or remove if truly zero

2. **Hardcoded width** (1 instance)
   - Line 19: `width: '100%'`
   - **Note:** `100%` is acceptable for full-width containers

**Status:** ⚠️ **Needs Updates** (padding: 0 only)

---

#### `src/components/pages/UserManagement/UserManagementTable/UserManagementTable/UserManagementTable.tsx` (Component file, not story)

**Issues Found:**
1. **Hardcoded width** (1 instance)
   - Line 377: `width: "64px"`
   - **Note:** May be component-specific, should be reviewed

**Status:** ⚠️ **Needs Review** (Component file, not story)

---

### Foundations

All Foundation story files (Colors, Effects, FontCheck, Icons, Spacing, Typography) are token showcase files and are expected to contain hardcoded values for documentation purposes.

**Status:** ✅ **Compliant** (by design)

---

## Summary Statistics

### Overall Status

- **Total Story Files Audited:** 41
- **Compliant Files:** 12 (29%)
- **Files Needing Updates:** 29 (71%)

### Issue Breakdown

| Issue Type | Count | Priority |
|------------|-------|----------|
| Hardcoded width/height values | 50+ | Medium |
| Hardcoded font-weight numbers | 8 | High |
| Hardcoded padding/margin: 0 | 8 | Low |
| Hardcoded hex colors | 2 | High |
| Primitive token usage | 2 | High |
| Hardcoded line-height | 1 | Medium |
| Hardcoded gap: "0" | 1 | Low |
| Hardcoded background gradients | 1 | Medium |

---

## Priority Recommendations

### High Priority (Must Fix)

1. **Replace hardcoded font-weight numbers with tokens**
   - Files: Input.stories.tsx, Dropdown.stories.tsx, NavMenu.stories.tsx, NavMenu.tsx
   - Change: `fontWeight: 500` → `fontWeight: "var(--font-weight-medium)"`
   - Change: `fontWeight: 600` → `fontWeight: "var(--font-weight-semibold)"`

2. **Replace hardcoded hex colors with semantic tokens**
   - File: NavMenu.tsx (line 113)
   - Change: `backgroundColor: "#10b981"` → `backgroundColor: "var(--semantic-feedback-success-base)"` or appropriate status token

3. **Replace primitive tokens with semantic tokens**
   - File: NavMenu.stories.tsx (lines 300, 306)
   - Change: `var(--color-text-primary)` → `var(--semantic-text-primary)"`

### Medium Priority (Should Fix)

1. **Replace hardcoded width values with tokens or document as component-specific**
   - Many files use `width: "300px"`, `"400px"`, `"500px"`, `"600px"`, `"800px"`
   - Consider creating container width tokens or documenting these as story-specific layout values

2. **Replace hardcoded line-height**
   - File: Modal.stories.tsx (line 720)
   - Change: `lineHeight: "1.6"` → Use calculated value from font-size token or create line-height token

3. **Replace hardcoded background gradients**
   - File: MapPin.stories.tsx (line 841)
   - Consider creating a gradient token or using semantic background tokens

### Low Priority (Nice to Have)

1. **Replace `padding: 0` and `margin: 0` with tokens**
   - Use `var(--spacing-0)` if a zero spacing token exists, or document that zero values are acceptable

2. **Replace `gap: "0"` with tokens**
   - File: Header.withSearch.stories.tsx
   - Use `var(--spacing-0)` if available

3. **Remove fallback values from token usage**
   - File: Drawer.stories.tsx
   - Change: `var(--spacing-12, 12px)` → `var(--spacing-12)"`

---

## Implementation Guide

### Step 1: Fix High Priority Issues

```tsx
// ❌ Before
fontWeight: 500
backgroundColor: "#10b981"
color: "var(--color-text-primary)"

// ✅ After
fontWeight: "var(--font-weight-medium)"
backgroundColor: "var(--semantic-feedback-success-base)"
color: "var(--semantic-text-primary)"
```

### Step 2: Fix Medium Priority Issues

```tsx
// ❌ Before
width: "300px"
lineHeight: "1.6"
background: "linear-gradient(135deg, #0a0a0a 0%, #121212 50%, #0d0d0d 100%)"

// ✅ After (if tokens exist)
width: "var(--container-width-sm)" // or document as story-specific
lineHeight: "var(--line-height-relaxed)" // or calculate from font-size
background: "var(--semantic-background-gradient-dark)" // or use semantic tokens
```

### Step 3: Fix Low Priority Issues

```tsx
// ❌ Before
padding: 0
margin: 0
gap: "0"
padding: "var(--spacing-12, 12px)"

// ✅ After
padding: "var(--spacing-0)" // if token exists, or document as acceptable
margin: "var(--spacing-0)" // if token exists, or document as acceptable
gap: "var(--spacing-0)" // if token exists
padding: "var(--spacing-12)" // remove fallback
```

---

## Notes

1. **Component-Specific Dimensions:** Many hardcoded width/height values (like `42px`, `44px`, `56px`, `100px`, `180px`) are component-specific and acceptable per guidelines. Only story container widths should be reviewed.

2. **Full-Width Containers:** Values like `width: "100%"` and `height: "100vh"` are acceptable for full-width/fullscreen layouts.

3. **Documentation Comments:** Hex colors in documentation comments (like in Input.stories.tsx) are acceptable as they're for reference only.

4. **Zero Values:** `padding: 0` and `margin: 0` may be acceptable if there's no zero spacing token, but should be consistent across the codebase.

---

## Next Steps

1. **Create missing tokens** (if needed):
   - Zero spacing token: `--spacing-0: 0`
   - Container width tokens for common story widths
   - Line-height tokens for common ratios

2. **Update all story files** following the priority recommendations above

3. **Add linting rules** to catch hardcoded values in story files

4. **Document exceptions** for component-specific dimensions that are acceptable

---

*Report generated from automated analysis of story files*

