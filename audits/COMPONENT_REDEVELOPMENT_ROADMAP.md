# Component Redevelopment Roadmap

**Date:** 2025-01-27  
**Project:** ARKEM Design System  
**Purpose:** Detailed remediation roadmap for component consistency improvements

---

## Overview

This roadmap provides a phased approach to addressing component consistency issues identified in the Component Consistency Audit Report. The roadmap is organized into 5 phases, prioritized by impact and dependencies.

**Total Estimated Effort:** 58-86 hours  
**Timeline:** 6 weeks (assuming part-time work)

---

## Phase 1: Critical Fixes

**Duration:** Week 1  
**Effort:** 16-23 hours  
**Priority:** Critical - Blocks production readiness

### Objectives
- Fix critical tokenization violations
- Establish token consistency foundation
- Remove blockers for production handoff

### Tasks

#### 1.1 Create Spinner Animation Token (1 hour)
**Component:** Spinner  
**Issue:** Hardcoded animation duration `0.8s linear infinite`

**Actions:**
1. Add `--animation-spinner: 0.8s linear infinite;` to `tokens-semantic.css`
2. Update `Spinner.css:11` to use `var(--animation-spinner)`
3. Verify animation still works correctly

**Acceptance Criteria:**
- [ ] Token created in tokens-semantic.css
- [ ] Spinner.css uses token
- [ ] Animation works correctly
- [ ] No hardcoded animation values remain

---

#### 1.2 Refactor Foundations Stories (8-12 hours)
**Components:** Colors, Spacing, Typography, Effects, Icons stories  
**Issue:** 125+ hardcoded values total across all Foundations story files

**Actions:**
1. **Colors.tokens.stories.tsx** (2-3 hours)
   - Replace `padding: "12px"` → `var(--spacing-12)`
   - Replace `padding: "24px"` → `var(--spacing-style-spacing-4px-6-24px)`
   - Replace hardcoded widths with tokens or container tokens

2. **Spacing.tokens.stories.tsx** (2-3 hours)
   - Replace `padding: "16px"` → `var(--spacing-style-spacing-4px-4-16px)`
   - Replace `gap: "12px"` → `var(--spacing-12)`
   - Replace `gap: "20px"` → `var(--spacing-style-spacing-4px-5-20px)`
   - Replace `gap: "24px"` → `var(--spacing-style-spacing-4px-6-24px)`
   - Replace `width: "100px"` → Consider container token or keep if component-specific

3. **Typography.tokens.stories.tsx** (2-3 hours)
   - Replace `padding: "16px"` → `var(--spacing-style-spacing-4px-4-16px)`
   - Replace `padding: "24px"` → `var(--spacing-style-spacing-4px-6-24px)`
   - Replace hardcoded font sizes if any

4. **Effects.tokens.stories.tsx** (1-2 hours)
   - Replace `padding: "24px"` → `var(--spacing-style-spacing-4px-6-24px)`
   - Replace `gap: "24px"` → `var(--spacing-style-spacing-4px-6-24px)`
   - Replace `padding: "12px 24px"` → Use spacing tokens

5. **Icons.tokens.stories.tsx** (1-2 hours)
   - Replace `padding: "16px"` → `var(--spacing-style-spacing-4px-4-16px)`
   - Replace `padding: "24px"` → `var(--spacing-style-spacing-4px-6-24px)`
   - Replace `gap: "8px"` → `var(--spacing-8)`
   - Replace `gap: "12px"` → `var(--spacing-12)`

**Optional Enhancement:**
- Consider creating container width tokens: `--container-sm: 300px`, `--container-md: 500px`, `--container-lg: 800px`
- Use these for consistent story container sizing

**Acceptance Criteria:**
- [ ] All hardcoded spacing values replaced with tokens
- [ ] All hardcoded width values replaced with tokens or container tokens
- [ ] All hardcoded padding values replaced with tokens
- [ ] All hardcoded gap values replaced with tokens
- [ ] Stories still render correctly
- [ ] No hardcoded pixel values remain (except component-specific dimensions)

---

#### 1.3 Refactor Input Stories (4-6 hours)
**Component:** Input  
**Issue:** 20+ hardcoded values in Input.stories.tsx

**Actions:**
1. Replace `width: "300px"` → Use container token or `var(--container-sm)` if created
2. Replace `gap: "var(--spacing-style-spacing-4px-4-16px)"` → Already using tokens (good)
3. Replace any remaining hardcoded spacing values
4. Review all inline styles for hardcoded values

**Acceptance Criteria:**
- [ ] All hardcoded width values replaced
- [ ] All hardcoded spacing values replaced
- [ ] Stories still render correctly
- [ ] No hardcoded pixel values remain

---

#### 1.4 Refactor UserManagementTable Stories (3-4 hours)
**Component:** UserManagementTable  
**Issue:** 10+ hardcoded values in UserManagementTable.stories.tsx

**Actions:**
1. Replace `width: "600px"` → Use container token
2. Replace `padding: "20px"` → `var(--spacing-style-spacing-4px-5-20px)`
3. Replace `width: "500px"` → Use container token
4. Review all inline styles for hardcoded values

**Acceptance Criteria:**
- [ ] All hardcoded values replaced with tokens
- [ ] Stories still render correctly
- [ ] No hardcoded pixel values remain

---

### Phase 1 Deliverables
- [ ] Spinner animation tokenized
- [ ] All Foundations stories use tokens
- [ ] Input stories use tokens
- [ ] UserManagementTable stories use tokens
- [ ] Zero critical tokenization violations

---

## Phase 2: High Priority Components

**Duration:** Week 2-3  
**Effort:** 25-38 hours  
**Priority:** High - Major consistency issues

### Objectives
- Fix high-priority tokenization issues
- Add missing argTypes to 9 components
- Improve developer experience in Storybook

### Tasks

#### 2.1 Fix Table Border-Width (1-2 hours)
**Component:** Table  
**Issue:** Hardcoded `border-width: 2px` in Table.css:106

**Actions:**
1. Check if `--border-width-medium` token exists
2. If not, create token: `--border-width-medium: 2px;` in tokens-semantic.css
3. Replace `border-left: var(--border-width-medium)` in Table.css:106
4. Consider tokenizing rgba in shadows (optional, acceptable per guidelines)

**Acceptance Criteria:**
- [ ] Border-width token created (if needed)
- [ ] Table.css uses token
- [ ] Visual appearance unchanged
- [ ] No hardcoded border-width values remain

---

#### 2.2 Fix Tabs Border-Width and Stories (2-3 hours)
**Component:** Tabs  
**Issue:** Hardcoded `border-width: 2px` and hardcoded widths in stories

**Actions:**
1. Replace `border-bottom: var(--border-width-medium)` in Tabs.css:32
2. Replace `width: "500px"` in Tabs.stories.tsx with container token
3. Review all inline styles for hardcoded values

**Acceptance Criteria:**
- [ ] Border-width uses token
- [ ] Story widths use tokens
- [ ] Stories still render correctly

---

#### 2.3 Add argTypes to Radio (2-3 hours)
**Component:** Radio  
**Issue:** Missing all argTypes

**Actions:**
1. Add argTypes for:
   - `checked` (boolean, control: "boolean")
   - `onCheckedChange` (function, control: false)
   - `name` (string, control: "text")
   - `value` (string, control: "text")
   - `disabled` (boolean, control: "boolean")
2. Add descriptions for each prop
3. Update stories to use args where appropriate

**Acceptance Criteria:**
- [ ] All props have argTypes
- [ ] All argTypes have descriptions
- [ ] Controls work correctly in Storybook
- [ ] Stories still render correctly

---

#### 2.4 Add argTypes to Card (2-3 hours)
**Component:** Card  
**Issue:** Missing argTypes for `children`, `className`

**Actions:**
1. Add argTypes for:
   - `children` (ReactNode, control: false)
   - `className` (string, control: "text")
2. Add descriptions
3. Consider adding argTypes for CardHeader, CardBody, CardFooter if needed

**Acceptance Criteria:**
- [ ] All props have argTypes
- [ ] All argTypes have descriptions
- [ ] Controls work correctly

---

#### 2.5 Add argTypes to Textarea (2-3 hours)
**Component:** Textarea  
**Issue:** Missing all argTypes

**Actions:**
1. Add argTypes for:
   - `size` (select: "sm" | "md" | "lg")
   - `state` (select: "default" | "error" | "success")
   - `disabled` (boolean)
   - `value` (string, control: "text")
   - `onChange` (function, control: false)
   - `rows` (number, control: "number")
   - `placeholder` (string, control: "text")
2. Add descriptions
3. Update stories to use args

**Acceptance Criteria:**
- [ ] All props have argTypes
- [ ] All argTypes have descriptions
- [ ] Controls work correctly

---

#### 2.6 Add argTypes to Spinner (2-3 hours)
**Component:** Spinner  
**Issue:** Missing argTypes for `size`, `ariaLabel`

**Actions:**
1. Add argTypes for:
   - `size` (select: "sm" | "md" | "lg")
   - `ariaLabel` (string, control: "text")
2. Add descriptions
3. Update stories to use args

**Acceptance Criteria:**
- [ ] All props have argTypes
- [ ] All argTypes have descriptions
- [ ] Controls work correctly

---

#### 2.7 Add argTypes to Divider (2-3 hours)
**Component:** Divider  
**Issue:** Missing argTypes for `orientation`

**Actions:**
1. Add argTypes for:
   - `orientation` (select: "horizontal" | "vertical")
2. Add description
3. Update stories to use args

**Acceptance Criteria:**
- [ ] All props have argTypes
- [ ] All argTypes have descriptions
- [ ] Controls work correctly

---

#### 2.8 Add argTypes to Link (2-3 hours)
**Component:** Link  
**Issue:** Missing argTypes for `variant`, `size`, `disabled`, `href`

**Actions:**
1. Add argTypes for:
   - `variant` (select: "default" | "subtle" | "underline")
   - `size` (select: "sm" | "md" | "lg")
   - `disabled` (boolean)
   - `href` (string, control: "text")
2. Add descriptions
3. Update stories to use args

**Acceptance Criteria:**
- [ ] All props have argTypes
- [ ] All argTypes have descriptions
- [ ] Controls work correctly

---

#### 2.9 Add argTypes to Avatar (2-3 hours)
**Component:** Avatar  
**Issue:** Missing argTypes for `size`, `className`

**Actions:**
1. Add argTypes for:
   - `size` (select: available sizes)
   - `className` (string, control: "text")
2. Add descriptions
3. Update stories to use args

**Acceptance Criteria:**
- [ ] All props have argTypes
- [ ] All argTypes have descriptions
- [ ] Controls work correctly

---

#### 2.10 Add argTypes to Tooltip (2-3 hours)
**Component:** Tooltip  
**Issue:** Missing argTypes for `side`, `children`

**Actions:**
1. Add argTypes for:
   - `side` (select: "top" | "bottom" | "left" | "right")
   - `children` (ReactNode, control: false)
2. Add descriptions
3. Consider adding argTypes for TooltipTrigger and TooltipContent

**Acceptance Criteria:**
- [ ] All props have argTypes
- [ ] All argTypes have descriptions
- [ ] Controls work correctly

---

#### 2.11 Add argTypes to SearchBox (2-3 hours)
**Component:** SearchBox  
**Issue:** Missing argTypes for `size`, `value`, `onChange`, `placeholder`

**Actions:**
1. Add argTypes for:
   - `size` (select: "sm" | "md" | "lg")
   - `value` (string, control: "text")
   - `onChange` (function, control: false)
   - `placeholder` (string, control: "text")
2. Add descriptions
3. Update stories to use args

**Acceptance Criteria:**
- [ ] All props have argTypes
- [ ] All argTypes have descriptions
- [ ] Controls work correctly

---

### Phase 2 Deliverables
- [ ] Table border-width tokenized
- [ ] Tabs border-width and stories tokenized
- [ ] All 9 components have complete argTypes
- [ ] All argTypes have descriptions
- [ ] Storybook Controls fully functional for all components

---

## Phase 3: Architectural Improvements

**Duration:** Week 4  
**Effort:** 10-15 hours  
**Priority:** Medium - Architectural consistency

### Objectives
- Fix architectural violations
- Remove inline styles
- Improve component boundaries
- Add JSDoc comments

### Tasks

#### 3.1 Fix Modal Inline Styles and Header Dependency (2-3 hours)
**Component:** Modal  
**Issue:** Inline style for gap, still imports Header by default

**Actions:**
1. Move inline style from Modal.tsx:111 to Modal.css
2. Create CSS class for gap styling
3. Remove default Header import
4. Make `header` prop required OR provide better default handling
5. Update stories to explicitly pass header when needed

**Acceptance Criteria:**
- [ ] No inline styles in Modal.tsx
- [ ] Header dependency properly handled
- [ ] Stories still work correctly
- [ ] Component is more flexible

---

#### 3.2 Fix Drawer Inline Styles and Header Dependency (2-3 hours)
**Component:** Drawer  
**Issue:** Inline styles for user info, still imports Header by default

**Actions:**
1. Move inline styles from Drawer.tsx:220-235 to Drawer.css
2. Create CSS classes for user info styling
3. Remove default Header import
4. Make `header` prop required OR provide better default handling
5. Update stories

**Acceptance Criteria:**
- [ ] No inline styles in Drawer.tsx
- [ ] Header dependency properly handled
- [ ] Stories still work correctly
- [ ] Component is more flexible

---

#### 3.3 Simplify Input Component (2-3 hours)
**Component:** Input  
**Issue:** Blurs atom/molecule boundary (includes label functionality)

**Actions:**
1. Review Input component for label-related functionality
2. Remove label functionality (FormField molecule exists separately)
3. Ensure Input is pure atom
4. Update documentation to clarify Input is atom-only
5. Update stories if needed

**Acceptance Criteria:**
- [ ] Input is pure atom (no label functionality)
- [ ] FormField molecule handles label composition
- [ ] Documentation clarifies boundaries
- [ ] No breaking changes to API

---

#### 3.4 Add JSDoc Comments to All Components (4-6 hours)
**Components:** All 30+ components  
**Issue:** Missing JSDoc comments on prop interfaces

**Actions:**
1. Create JSDoc template/standard
2. Add JSDoc comments to all prop interfaces:
   ```typescript
   /**
    * Component description
    */
   export interface ComponentProps {
     /**
      * Prop description
      */
     propName: string;
   }
   ```
3. Ensure all props have descriptions
4. Include examples where helpful

**Template:**
- Component-level description
- Each prop with description
- Type information
- Default values if applicable
- Examples for complex props

**Acceptance Criteria:**
- [ ] 100% of components have JSDoc comments
- [ ] All props have descriptions
- [ ] IDE autocomplete shows descriptions
- [ ] Documentation is consistent

---

### Phase 3 Deliverables
- [ ] Modal/Drawer inline styles removed
- [ ] Modal/Drawer Header dependency fixed
- [ ] Input component simplified
- [ ] All components have JSDoc comments
- [ ] Architectural consistency improved

---

## Phase 4: Documentation Enhancements

**Duration:** Week 5  
**Effort:** 23-35 hours  
**Priority:** Medium - Developer guidance

### Objectives
- Expand documentation for components with gaps
- Add edge case examples
- Add composition examples
- Improve accessibility documentation

### Tasks

#### 4.1 Expand Switch Documentation (2-3 hours)
**Component:** Switch  
**Issue:** Minimal stories, no dedicated stories file

**Actions:**
1. Create Switch.stories.tsx if missing
2. Add comprehensive stories:
   - Default
   - States (checked, unchecked, disabled)
   - Sizes (if applicable)
   - With label examples
3. Add argTypes
4. Add accessibility examples

**Acceptance Criteria:**
- [ ] Comprehensive stories file exists
- [ ] All states documented
- [ ] argTypes complete
- [ ] Accessibility examples included

---

#### 4.2 Expand Label Documentation (2-3 hours)
**Component:** Label  
**Issue:** Basic stories, limited examples

**Actions:**
1. Expand stories:
   - Default
   - With form inputs
   - Required indicators
   - Error states
   - Accessibility examples
2. Add more composition examples
3. Add argTypes if missing

**Acceptance Criteria:**
- [ ] Comprehensive stories
- [ ] Composition examples added
- [ ] Accessibility examples included

---

#### 4.3 Expand Slider Documentation (2-3 hours)
**Component:** Slider  
**Issue:** No dedicated stories file

**Actions:**
1. Create Slider.stories.tsx
2. Add comprehensive stories:
   - Default
   - States
   - Sizes
   - With labels
   - Accessibility examples
3. Add argTypes

**Acceptance Criteria:**
- [ ] Stories file created
- [ ] Comprehensive examples
- [ ] argTypes complete

---

#### 4.4 Expand Scrollbar Documentation (2-3 hours)
**Component:** Scrollbar  
**Issue:** Documentation gaps

**Actions:**
1. Expand existing stories:
   - Add more examples
   - Add accessibility examples
   - Add edge cases
2. Improve documentation quality

**Acceptance Criteria:**
- [ ] More comprehensive examples
- [ ] Accessibility examples added
- [ ] Edge cases documented

---

#### 4.5 Add Edge Case Examples (10-15 hours)
**Components:** Key components (Button, Input, Table, Modal, Dropdown, etc.)  
**Issue:** Missing empty states, error boundaries, long content examples

**Actions:**
1. Add empty state examples to:
   - Table (empty table)
   - Dropdown (no options)
   - Card (empty card)
2. Add error boundary examples
3. Add long content handling examples:
   - Table (long text, overflow)
   - Modal (long content, scrolling)
   - Input (long text, truncation)
4. Add loading state examples where applicable

**Acceptance Criteria:**
- [ ] Empty states documented for key components
- [ ] Error handling examples added
- [ ] Long content examples added
- [ ] Loading states documented

---

#### 4.6 Add Composition Examples (5-8 hours)
**Components:** Card, Tabs, FormField, Panel  
**Issue:** Limited examples of components working together

**Actions:**
1. Card composition examples:
   - Card with form inside
   - Card with table inside
   - Card with buttons
2. Tabs composition examples:
   - Tabs with forms
   - Tabs with tables
   - Tabs with complex content
3. FormField composition examples:
   - Multiple FormFields
   - FormField with validation
   - FormField with error messages
4. Panel composition examples:
   - Panel with various content types

**Acceptance Criteria:**
- [ ] Composition examples added
- [ ] Examples show real-world patterns
- [ ] Examples are well-documented

---

### Phase 4 Deliverables
- [ ] Switch, Label, Slider, Scrollbar documentation expanded
- [ ] Edge case examples added to key components
- [ ] Composition examples added
- [ ] Accessibility examples improved
- [ ] Developer guidance significantly improved

---

## Phase 5: Polish

**Duration:** Week 6  
**Effort:** 7-14 hours  
**Priority:** Low - Nice to have

### Objectives
- Final polish and consistency
- Standardize patterns
- Create documentation standards

### Tasks

#### 5.1 Add JSDoc to Low Priority Components (7-10 hours)
**Components:** Button, Badge, Checkbox, Dropdown, FormField, Panel, Header, DataTable  
**Issue:** Missing JSDoc comments

**Actions:**
1. Add JSDoc comments following established pattern
2. Ensure consistency with Phase 3 work
3. Review for quality

**Acceptance Criteria:**
- [ ] All components have JSDoc
- [ ] Consistent format
- [ ] High quality descriptions

---

#### 5.2 Document Story File Naming Standard (0-4 hours)
**Issue:** Inconsistent split vs single file approach

**Actions:**
1. **Option A:** Document current approach (split for variants, single for others)
2. **Option B:** Refactor to single standard (all single files OR all split)
3. Create documentation in `.storybook/` or project docs
4. Update contributing guidelines if needed

**Recommendation:** Option A (document current approach) - less disruptive

**Acceptance Criteria:**
- [ ] Naming standard documented
- [ ] Guidelines clear for new components
- [ ] Contributing guidelines updated (if applicable)

---

### Phase 5 Deliverables
- [ ] All components have JSDoc comments
- [ ] Story file naming standard documented
- [ ] Project documentation updated
- [ ] Consistency achieved across codebase

---

## Success Metrics

### Quantitative Metrics

- **Tokenization Compliance:** 95% → 98%+
- **Documentation Completeness:** 70% → 90%+
- **Architectural Consistency:** 85% → 95%+
- **Accessibility Compliance:** 85% → 90%+
- **Components with argTypes:** 60% → 100%
- **Components with JSDoc:** 0% → 100%
- **Hardcoded Values in Stories:** 165+ → 0

### Qualitative Metrics

- **Developer Experience:** Improved IDE support, better Storybook exploration
- **Code Quality:** More consistent patterns, better maintainability
- **Documentation Quality:** Comprehensive examples, clear guidance
- **System Cohesion:** Better architectural boundaries, clearer patterns

---

## Risk Mitigation

### Risks

1. **Breaking Changes**
   - **Risk:** Refactoring may break existing usage
   - **Mitigation:** Test thoroughly, maintain backward compatibility where possible

2. **Scope Creep**
   - **Risk:** Additional issues discovered during work
   - **Mitigation:** Document new issues, prioritize separately

3. **Time Overruns**
   - **Risk:** Estimates may be optimistic
   - **Mitigation:** Buffer time in schedule, prioritize critical items

4. **Inconsistency**
   - **Risk:** Different approaches taken by different developers
   - **Mitigation:** Clear standards, code reviews, templates

---

## Dependencies

### External Dependencies
- None - all work is internal

### Internal Dependencies
- Phase 1.1 (Spinner token) → Can be done independently
- Phase 1.2-1.4 (Story refactors) → Can be done in parallel
- Phase 2.1 (Table border-width) → May need token creation
- Phase 3.4 (JSDoc) → Can be done in parallel with other work

### Blocking Dependencies
- None identified

---

## Timeline Summary

| Phase | Duration | Effort | Priority |
|-------|----------|--------|----------|
| Phase 1 | Week 1 | 16-23 hours | Critical |
| Phase 2 | Week 2-3 | 25-38 hours | High |
| Phase 3 | Week 4 | 10-15 hours | Medium |
| Phase 4 | Week 5 | 23-35 hours | Medium |
| Phase 5 | Week 6 | 7-14 hours | Low |
| **Total** | **6 weeks** | **81-125 hours** | |

---

## Next Steps

1. **Review and Approve Roadmap**
   - Review with team
   - Adjust priorities if needed
   - Confirm timeline

2. **Set Up Tracking**
   - Create tickets/tasks for each phase
   - Set up progress tracking
   - Schedule regular check-ins

3. **Begin Phase 1**
   - Start with Spinner token (quick win)
   - Proceed with Foundations stories refactor
   - Complete Phase 1 within Week 1

4. **Iterate and Adjust**
   - Review progress weekly
   - Adjust plan as needed
   - Document learnings

---

**Roadmap Generated:** 2025-01-27  
**Next Review:** After Phase 1 completion

