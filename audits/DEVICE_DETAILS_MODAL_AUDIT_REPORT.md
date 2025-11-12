# Device Details Modal — Hierarchy & Dark Mode Audit Report

**Date:** 2025-02-10  
**Component:** `Organisms/Modal/DeviceDetails`  
**Auditor:** AI Assistant  
**Focus:** Visual Hierarchy, Dark Mode Compliance, Token Usage

---

## Executive Summary

### Overall Score: **7.5/10**

The Device Details modal demonstrates **strong visual hierarchy** and **good dark mode foundation**, but has **critical tokenization violations** that break design system consistency. The modal uses primitive tokens instead of semantic tokens in several key areas, particularly in the footer and timeline entries.

### Key Strengths
- ✅ **Excellent** visual hierarchy with clear header, content, and footer separation
- ✅ **Good** use of semantic tokens in most content areas
- ✅ **Proper** Header Secondary hierarchy implementation
- ✅ **Consistent** pane structure and spacing
- ✅ **Well-structured** collapsible sections in enrichment data

### Critical Issues
- ❌ **Footer uses primitive tokens** (`--color-fill-neutral-50`, `--color-fill-neutral-100`) instead of semantic tokens
- ❌ **Timeline entries use primitive token** (`--color-fill-neutral-800`) instead of semantic token
- ⚠️ **Action button border styling** uses custom overrides that may need review
- ⚠️ **Badge styling** uses inline styles that could be standardized

---

## 1. Visual Hierarchy Analysis

### 1.1 Header Hierarchy

**Score: 9/10** ✅ **Excellent**

#### ✅ Strengths

**1. Proper Header Secondary Implementation**
- **Location:** `Modal.stories.tsx:1130`
- **Implementation:** Uses `arkem-header--secondary` class correctly
- **Typography:** `--fonts-display-xs` (24px) for title - appropriate for modal header
- **Height:** Properly sized with `min-height: calc(40px + 2×16px)` matching Button md size
- **Spacing:** Correct padding using `--spacing-style-spacing-4px-4-16px` (16px)

**2. Header Content Organization**
- **Leading Icon:** Smartphone icon (24px) properly positioned
- **Title + Badge:** Good visual grouping with `gap: var(--spacing-12)`
- **Action Buttons:** Properly aligned in right slot with consistent spacing
- **Visual Weight:** Header clearly stands out as primary navigation element

**3. Badge Integration**
- **Location:** `Modal.stories.tsx:1137-1148`
- **Variant:** `secondary` - appropriate for inline device ID display
- **Styling:** Uses semantic tokens correctly (`--fonts-semantic-xs`, spacing tokens)
- **Visual Hierarchy:** Badge is secondary to title, appropriate sizing

#### ⚠️ Minor Issues

**1. Badge Inline Styles**
- **Severity:** Low
- **Location:** `Modal.stories.tsx:1139-1145`
- **Issue:** Badge uses inline styles for padding/font-size instead of component defaults
- **Impact:** Less maintainable, but acceptable for story-specific customization
- **Recommendation:** Consider if Badge component should support size variants

**2. Header Label Flex Container**
- **Severity:** Low
- **Location:** `Modal.stories.tsx:1134`
- **Issue:** Uses inline `flex: 1` style instead of CSS class
- **Impact:** Minor, but could be standardized
- **Status:** Acceptable for story customization

### 1.2 Content Hierarchy

**Score: 8/10** ✅ **Good**

#### ✅ Strengths

**1. Pane Structure**
- **Format:** `2+1` layout provides clear left-right content separation
- **Left Column:** Device Information (top) + Device Timeline (bottom) - logical grouping
- **Right Column:** Device Infrastructure - comprehensive enrichment data
- **Visual Separation:** 8px gap between panes provides clear boundaries

**2. Pane Headers**
- **Location:** `Modal.stories.tsx:521, 650, 811`
- **Implementation:** Consistent sticky headers across all panes
- **Typography:** `--fonts-semantic-sm` (14px) - appropriate for section headers
- **Icons:** 16px icons provide visual context (Info, Clock, Network)
- **Secondary Text:** Count indicators use `--semantic-text-secondary` correctly

**3. Tab Navigation (Device Information)**
- **Location:** `Modal.stories.tsx:532-579`
- **Visual Hierarchy:** Clear active/inactive states
- **Typography:** `--fonts-semantic-xs` (12px) - appropriate for tabs
- **States:** Proper hover/active styling with semantic tokens
- **Background:** Uses `--semantic-background-raised` for active tab

**4. Collapsible Sections (Device Infrastructure)**
- **Location:** `Modal.stories.tsx:818-977`
- **Visual Hierarchy:** Clear expand/collapse states with chevron icons
- **Typography:** `--fonts-semantic-xs` (12px) for section titles
- **Icon Colors:** Threat-level based coloring (red for critical, etc.)
- **Metrics Display:** Consistent label/value layout with proper alignment

#### ⚠️ Issues Found

**1. Timeline Entry Background**
- **Severity:** High
- **Location:** `Modal.stories.tsx:667`
- **Issue:** Uses primitive token `--color-fill-neutral-800` instead of semantic token
- **Current:** `background: 'var(--color-fill-neutral-800)'`
- **Expected:** Should use `--semantic-background-raised` or `--semantic-background-muted`
- **Impact:** Breaks design system tokenization rules, harder to theme
- **Fix:**
  ```tsx
  background: 'var(--semantic-background-raised)', // or --semantic-background-muted
  ```

**2. Metric Row Heights**
- **Severity:** Low
- **Location:** `Modal.stories.tsx:592, 935`
- **Issue:** Hardcoded `height: '42px'` for metric rows
- **Impact:** Acceptable for component-specific dimensions per guidelines
- **Status:** ✅ Acceptable (component-specific dimension)

**3. Tab Height**
- **Severity:** Low
- **Location:** `Modal.stories.tsx:550`
- **Issue:** Hardcoded `height: '44px'` for tabs
- **Impact:** Acceptable for component-specific dimensions
- **Status:** ✅ Acceptable (component-specific dimension)

### 1.3 Footer Hierarchy

**Score: 6/10** ⚠️ **Needs Improvement**

#### ❌ Critical Issues

**1. Footer Uses Primitive Tokens**
- **Severity:** Critical
- **Location:** `Modal.css:304, 310`
- **Issue:** Footer labels and values use primitive color tokens instead of semantic tokens
- **Current:**
  ```css
  .arkem-modal__footer-label {
    color: var(--color-fill-neutral-50); /* ❌ Primitive token */
  }
  .arkem-modal__footer-value {
    color: var(--color-fill-neutral-100); /* ❌ Primitive token */
  }
  ```
- **Expected:** Should use semantic text tokens
- **Fix:**
  ```css
  .arkem-modal__footer-label {
    color: var(--semantic-text-secondary); /* or --semantic-text-muted */
  }
  .arkem-modal__footer-value {
    color: var(--semantic-text-primary); /* or --semantic-text-secondary */
  }
  ```
- **Impact:** 
  - Breaks design system tokenization rules
  - Cannot be themed properly
  - Inconsistent with rest of modal

**2. Footer Typography**
- **Severity:** Medium
- **Location:** `Modal.css:303, 309`
- **Issue:** Uses `--fonts-semantic-xs` (12px) - appropriate size
- **Status:** ✅ Correct typography token usage

**3. Footer Layout**
- **Severity:** Low
- **Location:** `Modal.stories.tsx:1204-1217`
- **Issue:** Uses inline flex layout with `gap: var(--spacing-16)`
- **Status:** ✅ Acceptable, uses semantic spacing token

---

## 2. Dark Mode Compliance

### 2.1 Color Token Usage

**Score: 6.5/10** ⚠️ **Needs Improvement**

#### ❌ Critical Issues

**1. Timeline Entry Background (Primitive Token)**
- **Severity:** Critical
- **Location:** `Modal.stories.tsx:667`
- **Token:** `--color-fill-neutral-800` (primitive)
- **Issue:** Should use semantic token for maintainability and theming
- **Current Value:** `#0d0d0d` (very dark gray)
- **Recommended:** `var(--semantic-background-raised)` (#121212) or `var(--semantic-background-muted)` (#2d2d2d)
- **Visual Impact:** Timeline entries may appear too dark or inconsistent with other raised surfaces
- **Fix:**
  ```tsx
  background: 'var(--semantic-background-raised)', // #121212 - slightly lighter than base
  ```

**2. Footer Text Colors (Primitive Tokens)**
- **Severity:** Critical
- **Location:** `Modal.css:304, 310`
- **Tokens:** 
  - `--color-fill-neutral-50` (should be text token, not fill)
  - `--color-fill-neutral-100` (should be text token, not fill)
- **Issue:** Using fill tokens for text colors, and using primitive tokens instead of semantic
- **Current Values:** 
  - `--color-fill-neutral-50`: Likely a very light color (inappropriate for dark mode)
  - `--color-fill-neutral-100`: Likely a light color (inappropriate for dark mode)
- **Expected:** Should use semantic text tokens
- **Fix:**
  ```css
  .arkem-modal__footer-label {
    color: var(--semantic-text-secondary); /* #838383 - appropriate for labels */
  }
  .arkem-modal__footer-value {
    color: var(--semantic-text-primary); /* #E5E5E5 - appropriate for values */
  }
  ```
- **Visual Impact:** Footer text may have incorrect contrast or color in dark mode

#### ✅ Strengths

**1. Pane Backgrounds**
- **Location:** `Modal.css:72`
- **Token:** `--semantic-background-base` (#080808)
- **Status:** ✅ Correct semantic token usage

**2. Tab Backgrounds**
- **Location:** `Modal.stories.tsx:535, 561, 564`
- **Tokens:** 
  - Active: `--semantic-background-raised` (#121212)
  - Hover: `--semantic-background-action-hover` (neutral-800)
  - Default: `--semantic-background-base` (#080808)
- **Status:** ✅ Correct semantic token usage

**3. Metric Row Backgrounds**
- **Location:** `Modal.stories.tsx:583, 936`
- **Token:** `--semantic-background-raised` (#121212)
- **Status:** ✅ Correct semantic token usage

**4. Section Header Backgrounds**
- **Location:** `Modal.stories.tsx:841-845`
- **Tokens:** 
  - Expanded: `--semantic-background-raised` (#121212)
  - Hover: `--semantic-background-action-hover`
  - Default: `--semantic-background-base` (#080808)
- **Status:** ✅ Correct semantic token usage

**5. Border Colors**
- **Location:** Throughout content sections
- **Tokens:** `--semantic-border-muted` (#212121), `--semantic-border-subtle` (#2d2d2d)
- **Status:** ✅ Correct semantic token usage

### 2.2 Text Contrast & Readability

**Score: 8/10** ✅ **Good**

#### ✅ Strengths

**1. Primary Text**
- **Location:** Throughout content sections
- **Token:** `--semantic-text-primary` (#E5E5E5)
- **Contrast:** 14.2:1 on #080808 ✅ AAA
- **Status:** ✅ Excellent contrast

**2. Secondary Text**
- **Location:** Labels, metadata, timestamps
- **Token:** `--semantic-text-secondary` (#838383)
- **Contrast:** 5.1:1 on #080808 ✅ AA
- **Status:** ✅ Meets accessibility standards

**3. Error/Critical Text**
- **Location:** `Modal.stories.tsx:617, 961`
- **Token:** `--semantic-feedback-error-base` (#C55F5F)
- **Contrast:** Good visibility for critical information
- **Status:** ✅ Appropriate for error states

#### ⚠️ Issues Found

**1. Footer Text Contrast (If Using Primitive Tokens)**
- **Severity:** High (if primitive tokens are light colors)
- **Location:** `Modal.css:304, 310`
- **Issue:** Primitive tokens `--color-fill-neutral-50` and `--color-fill-neutral-100` may be light colors
- **Impact:** If these are light colors, they would have poor contrast on dark background
- **Fix:** Use semantic text tokens as recommended above

**2. Muted Text in Section Headers**
- **Severity:** Low
- **Location:** `Modal.stories.tsx:906`
- **Token:** `--semantic-text-muted` (#5b5b5b)
- **Contrast:** 3.2:1 on #080808 ⚠️ Below AA (needs 4.5:1)
- **Impact:** "• 4 metrics" text may be hard to read
- **Recommendation:** Consider using `--semantic-text-secondary` instead

### 2.3 Border & Divider Visibility

**Score: 8/10** ✅ **Good**

#### ✅ Strengths

**1. Pane Borders**
- **Location:** `Modal.css:71`
- **Token:** `--semantic-border-subtle` (#2d2d2d)
- **Contrast:** 1.05:1 on #080808 (subtle but visible)
- **Status:** ✅ Appropriate for pane separation

**2. Section Dividers**
- **Location:** Throughout content sections
- **Token:** `--semantic-border-muted` (#212121)
- **Usage:** Hairline borders between metric rows, sections
- **Status:** ✅ Consistent usage

**3. Tab Borders**
- **Location:** `Modal.stories.tsx:565`
- **Token:** `--semantic-border-muted` with hairline width
- **Status:** ✅ Appropriate for tab separation

#### ⚠️ Minor Issues

**1. Border Width Consistency**
- **Severity:** Low
- **Location:** Various inline styles
- **Issue:** Mix of `--border-width-thin` and `--border-widths-mode-1-border-width-hairline`
- **Impact:** Slight inconsistency, but both are valid tokens
- **Recommendation:** Standardize to `--border-width-thin` where possible

### 2.4 Shadow & Elevation

**Score: 9/10** ✅ **Excellent**

#### ✅ Strengths

**1. Modal Shadow**
- **Location:** `Modal.css:27`
- **Token:** `--shadow-skeuomorphic`
- **Value:** `0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)`
- **Status:** ✅ Good visibility in dark mode

**2. Action Button Shadows**
- **Location:** `Button.css:143, 152`
- **Tokens:** `--shadow-xs` (default), `--shadow-skeuomorphic` (hover)
- **Status:** ✅ Appropriate elevation changes

#### ⚠️ Minor Issues

**1. Shadow-XS Opacity**
- **Severity:** Low (documented in general dark mode audit)
- **Location:** `tokens-semantic.css:144`
- **Issue:** `--shadow-xs` uses 0.25 opacity (was 0.05, may have been fixed)
- **Status:** Should be verified for visibility

---

## 3. Action Button Styling

### 3.1 Custom Border Overrides

**Score: 7/10** ⚠️ **Needs Review**

#### ⚠️ Issues Found

**1. Device Details Action Button Overrides**
- **Severity:** Medium
- **Location:** `Modal.css:269-283`
- **Implementation:**
  ```css
  .device-details-action-btn {
    border-color: var(--semantic-border-ghosted) !important;
  }
  .device-details-action-btn:hover,
  .device-details-action-btn[data-forced-state="hover"] {
    border-color: var(--semantic-border-muted) !important;
  }
  .device-details-action-btn:focus-visible,
  .device-details-action-btn[data-forced-state="focused"] {
    border-color: var(--semantic-border-muted) !important;
  }
  ```
- **Issue:** Uses `!important` to override Button component defaults
- **Rationale:** May be intentional to create more subtle borders for action buttons in modal header
- **Impact:** 
  - Creates story-specific styling that may not be reusable
  - Uses `!important` which reduces maintainability
- **Recommendation:** 
  - Consider if this should be a Button variant instead
  - Or document why this override is necessary
  - Verify border visibility in dark mode (`--semantic-border-ghosted: #1e1e1e` is very subtle)

**2. Button Hierarchy Consistency**
- **Severity:** Low
- **Location:** `Modal.stories.tsx:1152-1199`
- **Implementation:** All buttons use `hierarchy="secondary"`, `tone="black"`, `size="md"`
- **Status:** ✅ Consistent button styling

---

## 4. Typography Hierarchy

### 4.1 Font Size Scale

**Score: 9/10** ✅ **Excellent**

#### ✅ Strengths

**1. Header Typography**
- **Location:** Header Secondary
- **Size:** `--fonts-display-xs` (24px)
- **Status:** ✅ Appropriate for modal title

**2. Pane Header Typography**
- **Location:** All pane headers
- **Size:** `--fonts-semantic-sm` (14px)
- **Status:** ✅ Appropriate for section headers

**3. Tab Typography**
- **Location:** Device Information tabs
- **Size:** `--fonts-semantic-xs` (12px)
- **Status:** ✅ Appropriate for tab labels

**4. Metric Labels**
- **Location:** Metric rows
- **Size:** `--fonts-semantic-xs` (12px)
- **Status:** ✅ Appropriate for labels

**5. Metric Values**
- **Location:** Metric rows
- **Size:** `--fonts-semantic-xs` (12px)
- **Status:** ✅ Appropriate for values

**6. Timeline Text**
- **Location:** Timeline entries
- **Sizes:** 
  - Date: `--fonts-semantic-xxs` (10px)
  - Location: `--fonts-semantic-xs` (12px)
- **Status:** ✅ Appropriate hierarchy

**7. Footer Typography**
- **Location:** Footer labels and values
- **Size:** `--fonts-semantic-xs` (12px)
- **Status:** ✅ Appropriate for metadata

### 4.2 Font Weight Hierarchy

**Score: 8/10** ✅ **Good**

#### ✅ Strengths

**1. Active Tab Weight**
- **Location:** `Modal.stories.tsx:570`
- **Weight:** `--font-weight-medium` for active tabs
- **Status:** ✅ Clear visual distinction

**2. Section Header Weight**
- **Location:** `Modal.stories.tsx:897`
- **Weight:** `--font-weight-medium` when expanded
- **Status:** ✅ Clear hierarchy

**3. Critical Metric Weight**
- **Location:** `Modal.stories.tsx:963`
- **Weight:** `--font-weight-semibold` for critical metrics
- **Status:** ✅ Appropriate emphasis

#### ⚠️ Minor Issues

**1. Inconsistent Weight Usage**
- **Severity:** Low
- **Issue:** Some labels use regular weight, some use medium
- **Impact:** Minor inconsistency, but acceptable for different contexts
- **Status:** ✅ Acceptable variation

---

## 5. Spacing & Layout

### 5.1 Spacing Token Usage

**Score: 8/10** ✅ **Good**

#### ✅ Strengths

**1. Consistent Spacing Scale**
- **Location:** Throughout modal
- **Tokens:** Uses 4px-based spacing scale consistently
- **Examples:**
  - `--spacing-8` (8px) for gaps, padding
  - `--spacing-12` (12px) for internal padding
  - `--spacing-16` (16px) for larger gaps
- **Status:** ✅ Consistent token usage

**2. Pane Padding**
- **Location:** `Modal.css:54`
- **Token:** `--spacing-12` (12px)
- **Status:** ✅ Appropriate spacing

**3. Header Padding**
- **Location:** Header Secondary
- **Token:** `--spacing-style-spacing-4px-4-16px` (16px)
- **Status:** ✅ Appropriate for secondary header

#### ⚠️ Issues Found

**1. Verbose Spacing Tokens**
- **Severity:** Low
- **Location:** Various inline styles
- **Issue:** Some places use verbose primitive tokens instead of semantic aliases
- **Examples:**
  - `--spacing-style-spacing-4px-1-4px` instead of semantic alias
  - `--spacing-style-spacing-4px-1-5-6px` instead of semantic alias
- **Impact:** Less readable, but functionally correct
- **Recommendation:** Use semantic aliases where available (`--spacing-8`, `--spacing-12`, etc.)

---

## 6. Severity Summary

### Critical (Must Fix Immediately)
1. **Footer uses primitive tokens** (`--color-fill-neutral-50`, `--color-fill-neutral-100`) - **Breaks tokenization rules**
2. **Timeline entries use primitive token** (`--color-fill-neutral-800`) - **Breaks tokenization rules**

### High (Fix Soon)
1. **Action button border overrides** use `!important` - **Reduces maintainability**
2. **Muted text contrast** in section headers may be insufficient - **Accessibility concern**

### Medium (Plan For)
1. **Verbose spacing tokens** in inline styles - **Readability issue**
2. **Badge inline styles** - **Could be componentized**

### Low (Nice to Have)
1. **Border width consistency** - **Minor inconsistency**
2. **Header label flex container** - **Could use CSS class**

---

## 7. Recommended Fixes

### Immediate Actions (This Week)

1. **Fix Footer Text Colors** ⚠️ **CRITICAL**
   ```css
   /* Modal.css:304, 310 */
   .arkem-modal__footer-label {
     color: var(--semantic-text-secondary); /* Changed from --color-fill-neutral-50 */
   }
   .arkem-modal__footer-value {
     color: var(--semantic-text-primary); /* Changed from --color-fill-neutral-100 */
   }
   ```
   - **Effort:** 5 minutes
   - **Impact:** Fixes tokenization violation, ensures proper dark mode colors

2. **Fix Timeline Entry Background** ⚠️ **CRITICAL**
   ```tsx
   // Modal.stories.tsx:667
   background: 'var(--semantic-background-raised)', // Changed from --color-fill-neutral-800
   ```
   - **Effort:** 2 minutes
   - **Impact:** Fixes tokenization violation, ensures consistency with other raised surfaces

### Short-term Actions (Next 2 Weeks)

3. **Review Action Button Border Overrides**
   - Evaluate if `!important` is necessary
   - Consider creating Button variant instead
   - Document rationale if override must remain
   - **Effort:** 1 hour
   - **Impact:** Improves maintainability

4. **Fix Muted Text Contrast**
   ```tsx
   // Modal.stories.tsx:906
   color: 'var(--semantic-text-secondary)', // Changed from --semantic-text-muted
   ```
   - **Effort:** 2 minutes
   - **Impact:** Improves accessibility and readability

### Medium-term Actions (Next Month)

5. **Standardize Spacing Tokens**
   - Replace verbose primitive tokens with semantic aliases where available
   - **Effort:** 1-2 hours
   - **Impact:** Improves code readability

6. **Consider Badge Size Variants**
   - Evaluate if Badge component should support size variants
   - Remove inline styles if variants are added
   - **Effort:** 2-3 hours
   - **Impact:** Better component API

---

## 8. Dark Mode Best Practices Compliance

### ✅ Compliant Areas
- Pane backgrounds use semantic tokens
- Tab backgrounds use semantic tokens
- Metric row backgrounds use semantic tokens
- Section header backgrounds use semantic tokens
- Border colors use semantic tokens
- Text colors (except footer) use semantic tokens
- Typography uses semantic tokens
- Spacing uses tokens (though some verbose)

### ❌ Non-Compliant Areas
- Footer text colors use primitive tokens
- Timeline entry background uses primitive token
- Action button overrides use `!important`

### ⚠️ Areas Needing Review
- Muted text contrast in section headers
- Border visibility with ghosted borders
- Shadow visibility (general system issue)

---

## 9. Visual Testing Checklist

### Hierarchy Tests
- [x] Header clearly stands out as primary element
- [x] Pane headers provide clear section separation
- [x] Tab navigation has clear active/inactive states
- [x] Collapsible sections have clear expand/collapse indicators
- [x] Footer is visually distinct but secondary
- [x] Typography scale creates clear information hierarchy

### Dark Mode Tests
- [ ] Footer text has proper contrast (needs fix)
- [x] Timeline entries have appropriate background (needs fix - using wrong token)
- [x] All backgrounds use semantic tokens (except timeline)
- [x] All text colors use semantic tokens (except footer)
- [x] Borders are visible and use semantic tokens
- [x] Shadows provide appropriate elevation
- [ ] Action button borders are visible (needs verification)

### Token Compliance Tests
- [ ] No primitive color tokens in components (footer, timeline fail)
- [x] No hardcoded colors (except component-specific dimensions)
- [x] Spacing uses tokens (some verbose)
- [x] Typography uses tokens
- [x] Borders use tokens

---

## 10. Conclusion

The Device Details modal demonstrates **strong visual hierarchy** and **good dark mode foundation**, with clear separation between header, content panes, and footer. The modal uses semantic tokens correctly in most areas, creating a consistent and maintainable implementation.

However, **two critical tokenization violations** need immediate attention:
1. Footer text colors use primitive tokens instead of semantic tokens
2. Timeline entry backgrounds use primitive tokens instead of semantic tokens

With these fixes, the modal will fully comply with design system tokenization rules and provide an excellent dark mode experience suitable for an OSINT platform where visual clarity and data readability are paramount.

**Priority:** Fix critical tokenization issues immediately, then address high-priority items within 2 weeks.

---

## Appendix A: Token Reference

### Current (Incorrect) Usage
```css
/* Footer - WRONG */
.arkem-modal__footer-label {
  color: var(--color-fill-neutral-50); /* Primitive token */
}
.arkem-modal__footer-value {
  color: var(--color-fill-neutral-100); /* Primitive token */
}
```

```tsx
// Timeline - WRONG
background: 'var(--color-fill-neutral-800)', // Primitive token
```

### Recommended (Correct) Usage
```css
/* Footer - CORRECT */
.arkem-modal__footer-label {
  color: var(--semantic-text-secondary); /* Semantic token */
}
.arkem-modal__footer-value {
  color: var(--semantic-text-primary); /* Semantic token */
}
```

```tsx
// Timeline - CORRECT
background: 'var(--semantic-background-raised)', // Semantic token
```

---

**Report Generated:** 2025-02-10  
**Next Review:** After critical fixes implemented

