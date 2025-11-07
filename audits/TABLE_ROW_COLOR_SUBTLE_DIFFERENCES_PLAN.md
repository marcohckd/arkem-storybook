# Table Row Color Subtle Differences Plan

**Date:** 2024  
**Scope:** Update table row colors to use more subtle differences between even and odd rows  
**Status:** Implementation plan — ready for execution

---

## Current State

**Current Row Colors:**
- Even rows: `--semantic-table-row-even: var(--color-fill-neutral-500)` (#1e1e1e)
- Odd rows: `--semantic-table-row-odd: var(--color-fill-neutral-600)` (#181818)
- Difference: ~6 hex units (from #1e1e1e to #181818)

**Location:**
- `src/styles/tokens-semantic.css` (lines 134-135)

---

## Available Neutral Color Tokens

Based on the design system tokens, the following neutral colors are available:

- `--color-fill-neutral-500`: #1e1e1e (currently used for even rows)
- `--color-fill-neutral-600`: #181818 (currently used for odd rows)
- `--color-fill-neutral-700`: #121212 (available, darker)
- `--color-fill-neutral-800`: #0d0d0d (available, darkest)

**Color Progression:**
- 500 → 600: difference of 6 hex units (#1e1e1e → #181818)
- 600 → 700: difference of 6 hex units (#181818 → #121212)
- 700 → 800: difference of 5 hex units (#121212 → #0d0d0d)

---

## Proposed Options

### Option 1: Use Neutral 600 and 700 (Recommended)
**More subtle than current, maintains good contrast**

- Even rows: `var(--color-fill-neutral-600)` (#181818)
- Odd rows: `var(--color-fill-neutral-700)` (#121212)
- Difference: 6 hex units (same as current, but darker overall)

**Pros:**
- More subtle visual difference
- Maintains readability
- Darker overall tone aligns with design system

**Cons:**
- Slightly darker than current implementation

---

### Option 2: Use Neutral 700 and 800 (Most Subtle)
**Very subtle difference, darkest option**

- Even rows: `var(--color-fill-neutral-700)` (#121212)
- Odd rows: `var(--color-fill-neutral-800)` (#0d0d0d)
- Difference: 5 hex units (most subtle)

**Pros:**
- Most subtle difference
- Very dark, consistent with dark theme

**Cons:**
- May be too subtle to distinguish rows
- Very dark, may impact readability

---

### Option 3: Use Neutral 500 and 600 (Current - Keep)
**Current implementation**

- Even rows: `var(--color-fill-neutral-500)` (#1e1e1e)
- Odd rows: `var(--color-fill-neutral-600)` (#181818)
- Difference: 6 hex units

**Pros:**
- Already implemented
- Good contrast

**Cons:**
- Less subtle than desired

---

## Recommended Implementation: Option 1

**Update row color tokens to use Neutral 600 and 700 for more subtle differences while maintaining readability.**

---

## Implementation Steps

### Step 1: Update Semantic Tokens

**File:** `src/styles/tokens-semantic.css`

**Location:** Lines 134-135

**Current:**
```css
--semantic-table-row-even: var(--color-fill-neutral-500); /* #1e1e1e */
--semantic-table-row-odd: var(--color-fill-neutral-600); /* #181818 */
```

**Updated:**
```css
--semantic-table-row-even: var(--color-fill-neutral-600); /* #181818 */
--semantic-table-row-odd: var(--color-fill-neutral-700); /* #121212 */
```

**Rationale:**
- Uses adjacent tokens (600 and 700) for subtle difference
- Maintains 6 hex unit difference (same as current)
- Darker overall tone aligns with dark theme aesthetic
- Still provides enough contrast for row distinction

---

## Testing Checklist

- [ ] Verify even rows use neutral-600 (#181818)
- [ ] Verify odd rows use neutral-700 (#121212)
- [ ] Check row distinction is visible but subtle
- [ ] Verify readability of text on both row colors
- [ ] Test with all row states (hover, selected)
- [ ] Verify accessibility (contrast ratios meet WCAG standards)
- [ ] Test with different screen sizes and display settings
- [ ] Compare visual result with design system requirements

---

## Alternative: If Option 1 is Too Subtle

If Option 1 (600/700) proves too subtle, consider:

**Option 1B: Use Neutral 500 and 700**
- Even rows: `var(--color-fill-neutral-500)` (#1e1e1e)
- Odd rows: `var(--color-fill-neutral-700)` (#121212)
- Difference: 12 hex units (more noticeable than current)

This provides a middle ground between current and Option 1.

---

## Files to Modify

1. `src/styles/tokens-semantic.css` - Update row color token values (lines 134-135)

---

## Notes

- All changes use tokens only (no hardcoded hex values)
- Maintains token-based architecture
- Changes are semantic and can be easily adjusted if needed
- Consider testing with actual users to determine optimal subtlety level

---

## Acceptance Criteria

✅ Row colors use neutral-600 and neutral-700 tokens  
✅ Visual difference is more subtle than current implementation  
✅ Readability maintained on both row colors  
✅ All styling uses tokens (no hardcoded values)  
✅ Accessibility standards maintained (contrast ratios)  
✅ Row states (hover, selected) continue to work correctly  

---

**End of Plan**

