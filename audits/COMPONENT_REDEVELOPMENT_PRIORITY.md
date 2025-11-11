# Component Redevelopment Priority Matrix

**Date:** 2025-01-27  
**Project:** ARKEM Design System  
**Purpose:** Prioritized list of components requiring redevelopment for design system consistency

---

## Priority Matrix

| Component | Atomic Level | Token Score | Arch Score | Doc Score | A11y Score | Overall | Priority | Effort (hrs) | Dependencies |
|-----------|--------------|-------------|------------|-----------|------------|---------|----------|--------------|--------------|
| **Foundations Stories** | Foundation | 2/10 | N/A | 8/10 | N/A | 5.0/10 | **Critical** | 8-12 | None |
| **Spinner** | Atom | 5/10 | 7/10 | 4/10 | 6/10 | 6.5/10 | **Critical** | 1 | Create animation token |
| **Input** | Atom | 6/10 | 7/10 | 8/10 | 9/10 | 7.5/10 | **Critical** | 4-6 | None |
| **UserManagementTable** | Page | 4/10 | 7/10 | 7/10 | 6/10 | 6.0/10 | **Critical** | 3-4 | None |
| **Table** | Organism | 6/10 | 9/10 | 8/10 | 8/10 | 7.5/10 | **High** | 1-2 | Create border-width-medium token |
| **Tabs** | Molecule | 6/10 | 8/10 | 8/10 | 8/10 | 7.5/10 | **High** | 2-3 | None |
| **Radio** | Atom | 9/10 | 7/10 | 4/10 | 6/10 | 6.5/10 | **High** | 2-3 | None |
| **Card** | Molecule | 8/10 | 8/10 | 4/10 | 6/10 | 7.0/10 | **High** | 2-3 | None |
| **Textarea** | Atom | 9/10 | 7/10 | 4/10 | 6/10 | 6.5/10 | **High** | 2-3 | None |
| **Divider** | Atom | 9/10 | 7/10 | 4/10 | 6/10 | 6.5/10 | **High** | 2-3 | None |
| **Link** | Atom | 9/10 | 7/10 | 4/10 | 6/10 | 6.5/10 | **High** | 2-3 | None |
| **Avatar** | Atom | 9/10 | 8/10 | 6/10 | 7/10 | 7.5/10 | **High** | 2-3 | None |
| **Tooltip** | Atom | 9/10 | 8/10 | 4/10 | 7/10 | 7.0/10 | **High** | 2-3 | None |
| **SearchBox** | Molecule | 8/10 | 8/10 | 4/10 | 6/10 | 6.5/10 | **High** | 2-3 | None |
| **Modal** | Organism | 8/10 | 7/10 | 9/10 | 9/10 | 8.0/10 | **Medium** | 2-3 | None |
| **Drawer** | Organism | 8/10 | 7/10 | 8/10 | 9/10 | 7.5/10 | **Medium** | 2-3 | None |
| **Switch** | Atom | 9/10 | 7/10 | 4/10 | 6/10 | 6.5/10 | **Medium** | 2-3 | None |
| **Label** | Atom | 9/10 | 8/10 | 5/10 | 6/10 | 7.0/10 | **Medium** | 2-3 | None |
| **Slider** | Atom | 8/10 | 8/10 | 7/10 | 7/10 | 7.5/10 | **Medium** | 2-3 | None |
| **Scrollbar** | Atom | 8/10 | 8/10 | 6/10 | 6/10 | 7.0/10 | **Medium** | 2-3 | None |
| **Button** | Atom | 9/10 | 9/10 | 9/10 | 9/10 | 9.0/10 | **Low** | 1 | None |
| **Badge** | Atom | 9/10 | 8/10 | 7/10 | 8/10 | 8.0/10 | **Low** | 1 | None |
| **Checkbox** | Atom | 9/10 | 8/10 | 7/10 | 8/10 | 8.0/10 | **Low** | 1 | None |
| **Dropdown** | Molecule | 7/10 | 8/10 | 8/10 | 9/10 | 8.0/10 | **Low** | 1-2 | None |
| **FormField** | Molecule | 9/10 | 8/10 | 7/10 | 8/10 | 8.0/10 | **Low** | 1 | None |
| **Panel** | Molecule | 9/10 | 8/10 | 8/10 | 9/10 | 8.5/10 | **Low** | 1 | None |
| **Header** | Organism | 9/10 | 8/10 | 9/10 | 8/10 | 8.5/10 | **Low** | 1 | None |
| **DataTable** | Template | 8/10 | 8/10 | 7/10 | 7/10 | 7.5/10 | **Low** | 1-2 | None |

---

## Priority Breakdown

### Critical Priority (4 components/issues)
**Total Effort:** 16-23 hours

1. **Foundations Stories** - 8-12 hours
   - Refactor 125+ hardcoded values to tokens
   - Affects: Colors, Spacing, Typography, Effects, Icons stories

2. **Spinner** - 1 hour
   - Create animation token, replace hardcoded 0.8s
   - Dependencies: Create `--animation-spinner` token

3. **Input** - 4-6 hours
   - Refactor 20+ hardcoded values in stories
   - Simplify component (remove label functionality)

4. **UserManagementTable** - 3-4 hours
   - Refactor 10+ hardcoded values in stories

### High Priority (11 components)
**Total Effort:** 25-38 hours

5. **Table** - 1-2 hours
   - Replace hardcoded border-width (2px)
   - Consider tokenizing rgba in shadows

6. **Tabs** - 2-3 hours
   - Replace hardcoded border-width (2px)
   - Refactor hardcoded widths in stories

7-15. **Components Missing argTypes** - 2-3 hours each (18-27 hours total)
   - Radio, Card, Textarea, Divider, Link, Avatar, Tooltip, SearchBox
   - Add complete argTypes with descriptions

### Medium Priority (5 components)
**Total Effort:** 10-15 hours

16. **Modal** - 2-3 hours
   - Move inline styles to CSS
   - Remove default Header import

17. **Drawer** - 2-3 hours
   - Move inline styles to CSS
   - Remove default Header import

18. **Switch** - 2-3 hours
   - Add comprehensive stories
   - Add argTypes

19. **Label** - 2-3 hours
   - Expand documentation
   - Add more examples

20. **Slider** - 2-3 hours
   - Create dedicated stories file
   - Add argTypes

21. **Scrollbar** - 2-3 hours
   - Expand documentation
   - Add accessibility examples

### Low Priority (7 components)
**Total Effort:** 7-10 hours

22-28. **Well-performing Components** - 1 hour each
   - Button, Badge, Checkbox, Dropdown, FormField, Panel, Header, DataTable
   - Add JSDoc comments only

---

## Cross-Cutting Issues

### All Components (30+ components)
**Issue:** Missing JSDoc comments on prop interfaces  
**Priority:** Medium  
**Effort:** 4-6 hours total  
**Impact:** Improved IDE support, better developer experience

### Most Components (20+ components)
**Issue:** Missing edge case examples  
**Priority:** Medium  
**Effort:** 1-2 hours per component  
**Impact:** Better developer guidance

### Story Files (All story files)
**Issue:** Hardcoded values in inline styles  
**Priority:** Critical (Foundations), Medium (others)  
**Effort:** Variable  
**Impact:** Token consistency, better examples

---

## Dependencies

### Token Creation Required

1. **Animation Token**
   - Name: `--animation-spinner`
   - Value: `0.8s linear infinite`
   - Used by: Spinner component
   - Priority: Critical

2. **Border Width Token** (Optional)
   - Name: `--border-width-medium`
   - Value: `2px`
   - Used by: Table, Tabs
   - Priority: Medium (if standardizing)

3. **Container Width Tokens** (Optional Enhancement)
   - Names: `--container-sm`, `--container-md`, `--container-lg`
   - Values: `300px`, `500px`, `800px`
   - Used by: Story files
   - Priority: Low (nice-to-have)

---

## Effort Summary

| Priority | Components | Effort Range | Average |
|----------|------------|--------------|---------|
| Critical | 4 | 16-23 hours | 19.5 hours |
| High | 11 | 25-38 hours | 31.5 hours |
| Medium | 6 | 10-15 hours | 12.5 hours |
| Low | 7 | 7-10 hours | 8.5 hours |
| **Total** | **28** | **58-86 hours** | **72 hours** |

---

## Recommended Execution Order

### Phase 1: Critical Fixes (Week 1)
1. Spinner animation token (1 hour) - Quick win
2. Foundations stories refactor (8-12 hours) - High impact
3. Input stories refactor (4-6 hours)
4. UserManagementTable stories refactor (3-4 hours)

**Total:** 16-23 hours

### Phase 2: High Priority Components (Week 2-3)
1. Add argTypes to 9 components (18-27 hours)
2. Table border-width fix (1-2 hours)
3. Tabs border-width and stories fix (2-3 hours)

**Total:** 21-32 hours

### Phase 3: Architectural Improvements (Week 4)
1. Modal/Drawer inline styles and Header dependency (4-6 hours)
2. Input component simplification (2-3 hours)
3. Add JSDoc comments to all components (4-6 hours)

**Total:** 10-15 hours

### Phase 4: Documentation Enhancements (Week 5)
1. Expand Switch, Label, Slider, Scrollbar documentation (8-12 hours)
2. Add edge case examples to key components (10-15 hours)
3. Add composition examples (5-8 hours)

**Total:** 23-35 hours

### Phase 5: Polish (Week 6)
1. Low priority components JSDoc (7-10 hours)
2. Story file naming standardization (documentation or refactor) (0-4 hours)

**Total:** 7-14 hours

---

## Risk Assessment

### High Risk
- **Foundations Stories Refactor:** Large scope, many files affected
- **Mitigation:** Break into smaller chunks, test incrementally

### Medium Risk
- **argTypes Addition:** Time-consuming but straightforward
- **Mitigation:** Create template/checklist for consistency

### Low Risk
- **JSDoc Comments:** Straightforward, low risk
- **Token Creation:** Simple additions

---

## Success Metrics

### Completion Criteria

- [ ] All critical priority components fixed
- [ ] All high priority components fixed
- [ ] 100% of components have argTypes
- [ ] 100% of components have JSDoc comments
- [ ] 0 hardcoded values in Foundations stories
- [ ] 0 hardcoded animation values
- [ ] All inline styles moved to CSS

### Quality Metrics

- Tokenization compliance: 95% → 98%+
- Documentation completeness: 70% → 90%+
- Architectural consistency: 85% → 95%+
- Accessibility compliance: 85% → 90%+

---

**Matrix Generated:** 2025-01-27  
**Next Update:** After Phase 1 completion

