# Atomic Design System Audit Report

## ARKEM Design System

---

### Executive Summary

**Overall Atomic Design Score:** 7.5/10

**Key Findings:**
- **Total components analyzed:** 20 components (excluding Foundations)
- **Correctly classified atoms:** 6/9 (67%)
- **Correctly classified molecules:** 2/3 (67%)
- **Correctly classified organisms:** 3/5 (60%)
- **Misclassifications found:** 4 critical issues
- **Dependency violations:** 2 high-severity violations
- **Missing essential components:** 12+ critical atoms, 8+ molecules, 6+ organisms

**Critical Issues:**
1. **Organism → Organism dependencies:** Modal and Drawer both depend on Header organism
2. **Stub components not extracted:** Checkbox, Badge, Avatar, Tooltip remain in Table/stubs/ instead of shared atoms
3. **Overly specific component:** UserManagementTable is too context-specific (should be template/page)
4. **Input component complexity:** Input includes label functionality, blurring atom/molecule boundary

**Strengths:**
1. **Strong token usage:** Excellent adherence to design tokens throughout components
2. **Good compound patterns:** Table uses excellent compound component pattern
3. **Accessibility focus:** Strong ARIA and keyboard support across components
4. **Type safety:** Excellent TypeScript usage with proper interfaces

---

### 1. Component Classification

#### Atoms (9 components)

| Component | Current Location | Proposed Classification | Current Classification | Issues/Notes |
|-----------|-----------------|------------------------|----------------------|--------------|
| Button | `src/components/Button/` | ✅ Atom | ✅ Atom | Correctly classified, highly reusable |
| Input | `src/components/Input/` | ⚠️ Molecule | ⚠️ Atom | Includes label + character count (should be FormField molecule) |
| Label | `src/components/Label/` | ✅ Atom | ✅ Atom | Correctly classified |
| Switch | `src/components/Switch/` | ✅ Atom | ✅ Atom | Correctly classified |
| Slider | `src/components/SliderFilter/` | ✅ Atom | ✅ Atom | Correctly classified |
| Checkbox | `src/components/Table/stubs/` | ✅ Atom | ❌ Stub | Should be extracted to `src/components/Checkbox/` |
| Badge | `src/components/Table/stubs/` | ✅ Atom | ❌ Stub | Should be extracted to `src/components/Badge/` |
| Avatar | `src/components/Table/stubs/` | ✅ Atom | ❌ Stub | Should be extracted to `src/components/Avatar/` |
| Tooltip | `src/components/Table/stubs/` | ✅ Atom | ❌ Stub | Should be extracted to `src/components/Tooltip/` |

**Atom Classification Summary:**
- ✅ **Correctly classified:** 5 components (Button, Label, Switch, Slider)
- ⚠️ **Boundary issue:** 1 component (Input - includes label functionality)
- ❌ **Stub components:** 4 components need extraction (Checkbox, Badge, Avatar, Tooltip)

#### Molecules (3 components)

| Component | Current Location | Proposed Classification | Current Classification | Issues/Notes |
|-----------|-----------------|------------------------|----------------------|--------------|
| Dropdown | `src/components/Dropdown/` | ✅ Molecule | ✅ Molecule | Correctly classified (Input-like + menu) |
| Tabs | `src/components/Tabs/` | ✅ Molecule | ✅ Molecule | Correctly classified (compound component pattern) |
| Panel | `src/components/Panel/` | ⚠️ Atom | ⚠️ Molecule | Simple container, could be atom or molecule (borderline) |

**Molecule Classification Summary:**
- ✅ **Correctly classified:** 2 components (Dropdown, Tabs)
- ⚠️ **Borderline:** 1 component (Panel - simple container, could be atom)

#### Organisms (5 components)

| Component | Current Location | Proposed Classification | Current Classification | Issues/Notes |
|-----------|-----------------|------------------------|----------------------|--------------|
| Table | `src/components/Table/` | ✅ Organism | ✅ Organism | Correctly classified, excellent compound pattern |
| Modal | `src/components/Modal/` | ⚠️ Organism | ✅ Organism | Correct classification but depends on Header organism |
| Drawer | `src/components/Drawer/` | ⚠️ Organism | ✅ Organism | Correct classification but depends on Header organism |
| Header | `src/components/Header/` | ✅ Organism | ✅ Organism | Correctly classified |
| UserManagementTable | `src/components/UserManagementTable/` | ❌ Template/Page | ❌ Organism | Too specific, should be template or page instance |

**Organism Classification Summary:**
- ✅ **Correctly classified:** 3 components (Table, Header)
- ⚠️ **Dependency issues:** 2 components (Modal, Drawer - depend on Header)
- ❌ **Too specific:** 1 component (UserManagementTable - should be template/page)

#### Misclassifications

**Atoms that should be Molecules:**
- **Input:** Includes label rendering, character count, and wrapper functionality. Should be split into:
  - `Input` (atom) - basic input element
  - `FormField` (molecule) - Label + Input + Error message + Character count

**Components that should be Templates/Pages:**
- **UserManagementTable:** Highly specific to user management use case with hardcoded columns, business logic, and specific data structures. Should be:
  - Template: `DataTable` (generic table with configurable columns)
  - Page: `UserManagementTable` (specific instance using DataTable template)

**Stub Components (Should be Atoms):**
- **Checkbox, Badge, Avatar, Tooltip:** Currently in `Table/stubs/` but are reusable atoms that should be in `src/components/`

---

### 2. Dependency Architecture

#### Dependency Graph

```
ATOMS (No dependencies on other components)
├── Button ✅
├── Label ✅
├── Switch ✅
├── Slider ✅
└── [Stubs] Checkbox, Badge, Avatar, Tooltip ✅

MOLECULES (Depend on Atoms only)
├── Dropdown ✅ (no component dependencies, uses lucide-react icons)
├── Tabs ✅ (uses @radix-ui/react-tabs, no component dependencies)
└── Panel ✅ (no dependencies)

ORGANISMS (Depend on Atoms and Molecules)
├── Header
│   └── Button (Atom) ✅
├── Table
│   └── [Uses stubs: Checkbox, Badge, Avatar, Tooltip] ⚠️
├── Modal
│   ├── Button (Atom) ✅
│   └── Header (Organism) ❌ VIOLATION: Organism → Organism
├── Drawer
│   ├── Button (Atom) ✅
│   ├── Header (Organism) ❌ VIOLATION: Organism → Organism
│   ├── Tabs (Molecule) ✅
│   └── [Tab components use: Switch, Label, Slider, Dropdown, Table] ✅
└── UserManagementTable
    ├── Button (Atom) ✅
    ├── Table (Organism) ✅
    └── [Uses stubs: Checkbox, Badge, Avatar, Tooltip] ⚠️
```

#### Dependency Violations

| Component | Depends On | Issue | Severity | Recommendation |
|-----------|-----------|--------|----------|----------------|
| Modal | Header (Organism) | Organism → Organism | **High** | Extract Header functionality to molecule or make Modal header configurable |
| Drawer | Header (Organism) | Organism → Organism | **High** | Extract Header functionality to molecule or make Drawer header configurable |
| Table | Checkbox (Stub) | Using internal stub | **Medium** | Extract Checkbox to shared atom |
| Table | Badge (Stub) | Using internal stub | **Medium** | Extract Badge to shared atom |
| Table | Avatar (Stub) | Using internal stub | **Medium** | Extract Avatar to shared atom |
| Table | Tooltip (Stub) | Using internal stub | **Medium** | Extract Tooltip to shared atom |
| UserManagementTable | Checkbox (Stub) | Using internal stub | **Medium** | Extract Checkbox to shared atom |
| UserManagementTable | Badge (Stub) | Using internal stub | **Medium** | Extract Badge to shared atom |
| UserManagementTable | Avatar (Stub) | Using internal stub | **Medium** | Extract Avatar to shared atom |
| UserManagementTable | Tooltip (Stub) | Using internal stub | **Medium** | Extract Tooltip to shared atom |

#### Valid Dependencies

✅ **Molecules depending on Atoms:**
- All molecules correctly depend only on atoms or external libraries

✅ **Organisms depending on Atoms:**
- Header → Button ✅
- Modal → Button ✅
- Drawer → Button ✅
- UserManagementTable → Button ✅

✅ **Organisms depending on Molecules:**
- Drawer → Tabs ✅
- Drawer tabs → Dropdown, Label, Slider ✅

✅ **No Circular Dependencies:**
- No circular dependency chains detected

#### Recommendations

1. **Extract Header to Molecule or Make Configurable:**
   - Option A: Create `HeaderContent` molecule (label + actions) that both Header and Modal/Drawer can use
   - Option B: Make Modal/Drawer header configurable via props (accept header as ReactNode)
   - **Effort:** 4-6 hours

2. **Extract Stub Components:**
   - Move Checkbox, Badge, Avatar, Tooltip from `Table/stubs/` to `src/components/`
   - Update all imports
   - **Effort:** 2-3 hours per component (8-12 hours total)

---

### 3. Reusability Analysis

#### High Reusability Components ✅

| Component | Used By Count | Reusability Score | Notes |
|-----------|--------------|-------------------|-------|
| Button | 5+ components | **High** ✅ | Used in Header, Modal, Drawer, UserManagementTable, stories |
| Input | 1 component | **Medium** ⚠️ | Only used in Header.withSearch story, but should be more widely used |
| Label | 2 components | **Medium** ⚠️ | Used in Drawer tabs (LimitsTab, GeographyTab) |
| Switch | 3 components | **Medium** ⚠️ | Used in Drawer tabs (ModuleAccessTab, PrivacyTab, GeographyTab) |
| Dropdown | 2 components | **Medium** ⚠️ | Used in Drawer tabs (LimitsTab, GeographyTab) and Header.withSearch |
| Table | 2 components | **Medium** ⚠️ | Used in UserManagementTable and GeographyTab |

#### Low Reusability Components ❌

| Component | Used By Count | Reusability Score | Issues |
|-----------|--------------|-------------------|--------|
| Checkbox | 2 components | **Low** ❌ | Only used in Table and UserManagementTable, but is a stub |
| Badge | 2 components | **Low** ❌ | Only used in Table and UserManagementTable, but is a stub |
| Avatar | 2 components | **Low** ❌ | Only used in Table and UserManagementTable, but is a stub |
| Tooltip | 2 components | **Low** ❌ | Only used in Table and UserManagementTable, but is a stub |
| Panel | 0 components | **Very Low** ❌ | Not used anywhere in codebase (only in stories) |
| Slider | 1 component | **Low** ❌ | Only used in LimitsTab |

#### Stub Component Analysis

| Stub Component | Location | Should Be | Action Required | Priority |
|---------------|----------|-----------|----------------|----------|
| Checkbox | `Table/stubs/` | Shared Atom | Extract to `src/components/Checkbox/` | **High** |
| Badge | `Table/stubs/` | Shared Atom | Extract to `src/components/Badge/` | **High** |
| Avatar | `Table/stubs/` | Shared Atom | Extract to `src/components/Avatar/` | **High** |
| Tooltip | `Table/stubs/` | Shared Atom | Extract to `src/components/Tooltip/` | **High** |

**Impact of Extraction:**
- ✅ Improves discoverability
- ✅ Enables reuse across codebase
- ✅ Follows atomic design principles
- ✅ Reduces code duplication

#### Code Duplication Analysis

**Duplicated Patterns:**
1. **Icon sizing logic:** Appears in Button, Input (handled via lucide-react props)
2. **Focus ring styles:** Should be standardized via tokens (already using tokens ✅)
3. **Hover state transitions:** Should be standardized via tokens (already using tokens ✅)
4. **Stub components:** Checkbox, Badge, Avatar, Tooltip duplicated in Table/stubs/

**Recommendation:** Extract duplicated patterns into shared atoms or utilities.

---

### 4. Composition Patterns

#### Excellent Composition Patterns ✅

**Table - Compound Component Pattern:**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```
✅ **Strengths:**
- Flexible composition
- Clear component hierarchy
- Type-safe props
- Excellent for complex table structures

**Tabs - Compound Component Pattern:**
```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="modules">Modules</TabsTrigger>
  </TabsList>
  <TabsContent value="modules">Content</TabsContent>
</Tabs>
```
✅ **Strengths:**
- Clear parent-child relationship
- Flexible content placement
- Good separation of concerns

#### Problematic Composition Patterns ❌

**Modal depending on Header organism:**
```tsx
<Modal>
  <Header /> {/* Should use atoms/molecules instead */}
</Modal>
```
❌ **Issues:**
- Organism → Organism dependency
- Tight coupling
- Limits reusability

**Drawer depending on Header organism:**
```tsx
<Drawer>
  <Header /> {/* Should use atoms/molecules instead */}
</Drawer>
```
❌ **Issues:**
- Organism → Organism dependency
- Tight coupling
- Limits reusability

#### Prop Drilling Analysis

**Acceptable Prop Drilling ✅:**
- Table components: Props passed 1-2 levels deep (Table → TableRow → TableCell) ✅
- Tabs components: Props passed 1 level deep (Tabs → TabsContent) ✅

**No Problematic Prop Drilling Detected:**
- All components use appropriate prop passing
- No excessive prop tunneling (3+ levels) found

#### Component Coupling Analysis

**Tight Coupling Issues:**
1. **Modal ↔ Header:** Modal hard-codes Header component usage
2. **Drawer ↔ Header:** Drawer hard-codes Header component usage
3. **Table ↔ Stubs:** Table imports stubs directly, creating coupling

**Loose Coupling Goals:**
- ✅ Most components work independently
- ✅ Dependencies are through props/imports (not shared state)
- ⚠️ Some hard-coded component dependencies (Modal/Drawer → Header)

**Recommendations:**
1. Make Modal/Drawer header configurable via props (accept ReactNode)
2. Extract Header functionality to reusable molecule
3. Extract stub components to reduce coupling

---

### 5. Missing Components

#### Critical Missing Atoms

**Form Elements:**
- [ ] **Radio button** - Essential for form groups
- [ ] **Textarea** - Currently Input supports multiline, but separate component would be clearer
- [ ] **Select/Dropdown trigger** - Dropdown exists but is custom; native select wrapper may be needed
- [ ] **Toggle** - Switch exists, but toggle variant may be needed
- [ ] **File upload input** - Essential for file uploads
- [ ] **Date picker input** - Essential for date selection
- [ ] **Time picker input** - Essential for time selection

**Content Elements:**
- [ ] **Text/Typography** - Typography component for consistent text rendering
- [ ] **Heading** - Heading component (H1-H6) with consistent styling
- [ ] **Link** - Link component with proper styling and states
- [ ] **Image** - Image component with loading states
- [ ] **Icon** - Icon wrapper component (currently using lucide-react directly)
- [ ] **Divider** - Horizontal/vertical divider component
- [ ] **Spinner/Loader** - Loading indicator component
- [ ] **Progress bar** - Progress indicator component
- [ ] **Skeleton** - Loading skeleton component

**Interactive Elements:**
- [ ] **Tag** - Tag component (similar to Badge but different use case)
- [ ] **Chip** - Chip component for selections
- [ ] **Rating stars** - Rating component

**Priority:**
- **Critical:** Radio, Textarea, Link, Divider, Spinner
- **High:** File upload, Date picker, Heading, Image
- **Medium:** Tag, Chip, Progress bar, Skeleton
- **Low:** Time picker, Rating stars

#### Critical Missing Molecules

**Form Molecules:**
- [ ] **FormField** - Label + Input + Error message (Input currently includes label)
- [ ] **SearchBox** - Input + Icon + Clear button
- [ ] **Password input** - Input + Toggle visibility button
- [ ] **Date picker input** - Input + Calendar picker
- [ ] **Number input** - Input with number formatting and steppers

**Navigation Molecules:**
- [ ] **Breadcrumb** - Breadcrumb navigation component
- [ ] **Pagination** - Pagination controls
- [ ] **Menu item** - Menu item component
- [ ] **Tab item** - Already exists as TabsTrigger, but could be standalone

**Content Molecules:**
- [ ] **Card header** - Card header component
- [ ] **Card footer** - Card footer component
- [ ] **Card** - Complete card component (header + body + footer)
- [ ] **List item** - List item component
- [ ] **Media object** - Image + Text layout component

**Priority:**
- **Critical:** FormField, SearchBox, Card, Pagination
- **High:** Breadcrumb, Password input, List item
- **Medium:** Card header/footer, Media object, Number input
- **Low:** Menu item, Date picker input

#### Critical Missing Organisms

**Layout Organisms:**
- [ ] **Sidebar** - Sidebar navigation component
- [ ] **Footer** - Footer component
- [ ] **Navigation bar** - Main navigation bar
- [ ] **Toolbar** - Toolbar component (different from Header)

**Content Organisms:**
- [ ] **Card** - Card component (if not molecule)
- [ ] **List** - List component with items
- [ ] **Feed** - Feed/timeline component
- [ ] **Grid** - Grid layout component

**Overlay Organisms:**
- [ ] **Dialog** - Dialog component (Modal exists, but Dialog may be different)
- [ ] **Popover** - Popover component
- [ ] **Toast/Notification** - Toast notification component
- [ ] **Dropdown menu** - Dropdown menu component (Dropdown exists but is select-like)

**Priority:**
- **Critical:** Sidebar, Footer, Navigation bar, Toast/Notification
- **High:** List, Card, Popover
- **Medium:** Grid, Feed, Toolbar
- **Low:** Dialog (Modal may suffice)

---

### 6. Complexity Analysis

#### Atom Complexity Analysis

| Atom | Lines of Code | State Management | Sub-components | Props Count | Complexity Score |
|------|--------------|------------------|----------------|-------------|------------------|
| Button | 131 | None | 0 | 15 | **Low** ✅ |
| Input | 120 | Internal focus | 1 (icon wrapper) | 12 | **Medium** ⚠️ |
| Label | 22 | None | 0 | 3 | **Low** ✅ |
| Switch | 36 | None | 0 | 6 | **Low** ✅ |
| Slider | 70 | None | 0 | 8 | **Low** ✅ |
| Checkbox (stub) | 45 | None | 0 | 5 | **Low** ✅ |
| Badge (stub) | 51 | None | 0 | 4 | **Low** ✅ |
| Avatar (stub) | 30 | None | 0 | 2 | **Low** ✅ |
| Tooltip (stub) | 19 | None | 0 | 2 | **Low** ✅ |

**Atom Complexity Issues:**
- ⚠️ **Input:** 120 lines, includes label rendering and character count (should be split into Input atom + FormField molecule)

**Acceptable Complexity:**
- ✅ All other atoms are simple and focused
- ✅ No atoms exceed 150 lines
- ✅ No atoms have complex state management
- ✅ No atoms have multiple sub-components

#### Molecule Complexity Analysis

| Molecule | Lines of Code | State Management | Sub-components | Props Count | Complexity Score |
|----------|--------------|------------------|----------------|-------------|------------------|
| Dropdown | 154 | useState (isOpen, selectedValue) | 0 | 10 | **Medium** ✅ |
| Tabs | 93 | None (controlled) | 4 (TabsList, TabsTrigger, TabsContent) | 4 | **Low** ✅ |
| Panel | 30 | None | 0 | 3 | **Low** ✅ |

**Molecule Complexity Assessment:**
- ✅ All molecules are appropriately complex
- ✅ Dropdown has reasonable state management (open/close, selection)
- ✅ Tabs uses compound component pattern (appropriate for molecule)
- ✅ No molecules exceed 300 lines
- ✅ No molecules have excessive sub-components

#### Organism Complexity Analysis

| Organism | Lines of Code | State Management | Sub-components | Props Count | Complexity Score |
|----------|--------------|------------------|----------------|-------------|------------------|
| Table | 27 | None | 6 (TableHeader, TableBody, TableRow, TableHead, TableCell) | 4 | **Low** ✅ |
| Modal | 298 | useState, useEffect (focus trap, ESC, body scroll) | 0 | 9 | **High** ⚠️ |
| Drawer | 313 | useState, useEffect (multiple state, focus, ESC, body scroll) | 4 (tab components) | 8 | **High** ⚠️ |
| Header | 90 | None | 0 | 6 | **Low** ✅ |
| UserManagementTable | 566 | useState, useMemo, useCallback (selection, sorting, pagination) | 0 | 7 | **Very High** ❌ |

**Organism Complexity Issues:**

1. **UserManagementTable (566 lines):**
   - ❌ Too complex for a single component
   - ❌ Contains business logic (user management specific)
   - ❌ Should be split into:
     - Template: `DataTable` (generic table with sorting, pagination, selection)
     - Page: `UserManagementTable` (specific instance)
   - **Recommendation:** Refactor into template + page

2. **Modal (298 lines):**
   - ⚠️ Complex but acceptable for organism
   - ⚠️ Contains focus trap, ESC handling, body scroll prevention
   - ✅ Well-structured with clear responsibilities
   - **Recommendation:** Consider extracting focus trap logic to hook

3. **Drawer (313 lines):**
   - ⚠️ Complex but acceptable for organism
   - ⚠️ Similar complexity to Modal
   - ✅ Well-structured with clear responsibilities
   - **Recommendation:** Consider extracting shared overlay logic to hook

**Acceptable Complexity:**
- ✅ Table: Simple container with compound components (appropriate)
- ✅ Header: Simple organism with button composition (appropriate)

#### Recommendations

1. **Split UserManagementTable:**
   - Create `DataTable` template (generic)
   - Create `UserManagementTable` page (specific instance)
   - **Effort:** 8-12 hours

2. **Extract Shared Overlay Logic:**
   - Create `useOverlay` hook for focus trap, ESC, body scroll
   - Use in both Modal and Drawer
   - **Effort:** 4-6 hours

3. **Split Input Component:**
   - Create `Input` atom (basic input)
   - Create `FormField` molecule (Label + Input + Error + Count)
   - **Effort:** 4-6 hours

---

### 7. Naming Conventions

#### Component Naming Analysis

**Atom Naming:**
- ✅ **Good:** Button, Input, Label, Switch, Slider (simple nouns)
- ✅ **Good:** Checkbox, Badge, Avatar, Tooltip (simple nouns)
- ❌ **Issue:** None found

**Molecule Naming:**
- ✅ **Good:** Dropdown, Tabs, Panel (descriptive compound nouns)
- ✅ **Good:** No context-specific names found

**Organism Naming:**
- ✅ **Good:** Table, Modal, Drawer, Header (describe UI section)
- ❌ **Violation:** UserManagementTable (includes context "UserManagement")

#### Naming Violations

| Component | Current Name | Issue | Suggested Name | Priority |
|-----------|-------------|--------|----------------|----------|
| UserManagementTable | Too specific | Context in name | `DataTable` (template) or keep as page-specific | **High** |
| SliderFilter | Folder name | Unclear naming | `Slider` (component is already named correctly) | **Low** |

#### File Structure Analysis

**Current Structure:**
```
src/components/
├── Button/
├── Input/
├── Label/
├── Switch/
├── SliderFilter/  ⚠️ (folder name doesn't match component name)
├── Table/
│   └── stubs/  ❌ (stubs should be in main components)
├── Modal/
├── Drawer/
├── Header/
├── Dropdown/
├── Tabs/
├── Panel/
└── UserManagementTable/
```

**Recommended Atomic Structure:**
```
src/components/
├── atoms/
│   ├── Button/
│   ├── Input/
│   ├── Label/
│   ├── Switch/
│   ├── Slider/
│   ├── Checkbox/  (extracted from Table/stubs)
│   ├── Badge/     (extracted from Table/stubs)
│   ├── Avatar/    (extracted from Table/stubs)
│   └── Tooltip/   (extracted from Table/stubs)
├── molecules/
│   ├── Dropdown/
│   ├── Tabs/
│   ├── Panel/
│   └── FormField/ (new, extracted from Input)
├── organisms/
│   ├── Header/
│   ├── Modal/
│   ├── Drawer/
│   └── Table/
├── templates/
│   └── DataTable/ (extracted from UserManagementTable)
└── pages/
    └── UserManagementTable/ (specific instance)
```

**Benefits of Atomic Structure:**
- ✅ Clear component level at a glance
- ✅ Easier navigation and discovery
- ✅ Better scalability
- ✅ Enforces atomic design principles
- ✅ Easier to enforce dependency rules

**Migration Path:**
1. Create atomic folder structure
2. Move components to appropriate folders
3. Update all imports
4. Update Storybook titles
5. Update documentation
6. **Effort:** 8-12 hours

---

### 8. Storybook Organization

#### Current Storybook Structure

**Current Title Structure:**
```
Components/
├── Button/
│   ├── Primary/
│   ├── Secondary/
│   ├── Mode/
│   └── Actions/
├── Header/
│   ├── Primary/
│   ├── Secondary/
│   └── WithSearch/
├── Input/
├── Label/
├── Switch/
├── Dropdown/
├── Tabs/
├── Panel/
├── Table/
├── Modal/
├── Drawer/
├── UserManagementTable/
└── Foundations/
    ├── Colors
    ├── Typography
    ├── Spacing
    ├── Effects
    └── Icons
```

**Analysis:**
- ⚠️ **No atomic hierarchy:** Stories don't reflect atomic design levels
- ⚠️ **Inconsistent organization:** Some components split by variant (Button, Header), others single file
- ✅ **Foundations separate:** Good separation of foundations
- ⚠️ **Stub components:** Checkbox, Badge stories in Table/stubs/ (should be separate)

#### Recommended Storybook Structure

```
Storybook/
├── Foundation/
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Effects
│   └── Icons
├── Atoms/
│   ├── Button/
│   │   ├── Primary/
│   │   ├── Secondary/
│   │   ├── Mode/
│   │   └── Actions/
│   ├── Input/
│   ├── Label/
│   ├── Switch/
│   ├── Slider/
│   ├── Checkbox/
│   ├── Badge/
│   ├── Avatar/
│   └── Tooltip/
├── Molecules/
│   ├── Dropdown/
│   ├── Tabs/
│   ├── Panel/
│   └── FormField/
├── Organisms/
│   ├── Header/
│   │   ├── Primary/
│   │   ├── Secondary/
│   │   └── WithSearch/
│   ├── Modal/
│   ├── Drawer/
│   └── Table/
├── Templates/
│   └── DataTable/
└── Pages/
    └── UserManagementTable/
```

**Benefits:**
- ✅ Clear atomic hierarchy in navigation
- ✅ Easier to understand component relationships
- ✅ Better organization for large design systems
- ✅ Enforces atomic design principles

**Migration Steps:**
1. Update Storybook titles to include atomic level
2. Reorganize stories to match atomic structure
3. Update navigation/grouping
4. **Effort:** 4-6 hours

---

### 9. Priority Recommendations

#### Critical (Do Immediately)

1. **Extract Stub Components to Shared Atoms**
   - **Action:** Move Checkbox, Badge, Avatar, Tooltip from `Table/stubs/` to `src/components/`
   - **Impact:** High - Improves reusability, follows atomic design
   - **Effort:** 8-12 hours
   - **Dependencies:** None

2. **Fix Organism → Organism Dependencies**
   - **Action:** Make Modal and Drawer header configurable (accept ReactNode) or extract Header to molecule
   - **Impact:** High - Fixes architectural violation
   - **Effort:** 4-6 hours
   - **Dependencies:** None

3. **Refactor UserManagementTable to Template/Page**
   - **Action:** Extract generic `DataTable` template, keep `UserManagementTable` as page instance
   - **Impact:** High - Reduces complexity, improves reusability
   - **Effort:** 8-12 hours
   - **Dependencies:** None

#### High Priority (Do Soon)

4. **Split Input into Atom + Molecule**
   - **Action:** Create `Input` atom (basic) and `FormField` molecule (Label + Input + Error + Count)
   - **Impact:** Medium - Clarifies atomic boundaries
   - **Effort:** 4-6 hours
   - **Dependencies:** None

5. **Create Missing Critical Atoms**
   - **Action:** Create Radio, Textarea, Link, Divider, Spinner components
   - **Impact:** High - Fills essential gaps
   - **Effort:** 3-4 hours per component (15-20 hours total)
   - **Dependencies:** None

6. **Reorganize File Structure to Atomic Hierarchy**
   - **Action:** Create atoms/, molecules/, organisms/, templates/, pages/ folders
   - **Impact:** Medium - Improves organization and discoverability
   - **Effort:** 8-12 hours
   - **Dependencies:** Extract stub components first

#### Medium Priority (Plan For)

7. **Update Storybook Organization**
   - **Action:** Reorganize Storybook titles to reflect atomic hierarchy
   - **Impact:** Medium - Improves navigation and understanding
   - **Effort:** 4-6 hours
   - **Dependencies:** File structure reorganization

8. **Create Missing Critical Molecules**
   - **Action:** Create FormField, SearchBox, Card, Pagination components
   - **Impact:** Medium - Fills essential gaps
   - **Effort:** 4-6 hours per component (16-24 hours total)
   - **Dependencies:** Input split (for FormField)

9. **Extract Shared Overlay Logic**
   - **Action:** Create `useOverlay` hook for focus trap, ESC, body scroll
   - **Impact:** Low - Reduces duplication
   - **Effort:** 4-6 hours
   - **Dependencies:** None

#### Low Priority (Nice to Have)

10. **Create Missing Organisms**
    - **Action:** Create Sidebar, Footer, Navigation bar, Toast components
    - **Impact:** Low - Fills gaps but not critical
    - **Effort:** 6-8 hours per component (24-32 hours total)
    - **Dependencies:** None

11. **Rename SliderFilter Folder**
    - **Action:** Rename `SliderFilter/` to `Slider/` for consistency
    - **Impact:** Low - Minor improvement
    - **Effort:** 1 hour
    - **Dependencies:** None

---

### 10. Estimated Effort

**Total Effort:** 100-150 hours

**Breakdown:**

| Category | Effort | Priority |
|----------|--------|----------|
| Extract stub components | 8-12 hours | Critical |
| Fix organism dependencies | 4-6 hours | Critical |
| Refactor UserManagementTable | 8-12 hours | Critical |
| Split Input component | 4-6 hours | High |
| Create critical atoms | 15-20 hours | High |
| Reorganize file structure | 8-12 hours | High |
| Update Storybook organization | 4-6 hours | Medium |
| Create critical molecules | 16-24 hours | Medium |
| Extract shared overlay logic | 4-6 hours | Medium |
| Create missing organisms | 24-32 hours | Low |
| Minor fixes | 1-2 hours | Low |

**Recommended Phases:**

**Phase 1 (Critical - 20-30 hours):**
- Extract stub components
- Fix organism dependencies
- Refactor UserManagementTable

**Phase 2 (High Priority - 27-38 hours):**
- Split Input component
- Create critical atoms (Radio, Textarea, Link, Divider, Spinner)
- Reorganize file structure

**Phase 3 (Medium Priority - 24-36 hours):**
- Update Storybook organization
- Create critical molecules (FormField, SearchBox, Card, Pagination)
- Extract shared overlay logic

**Phase 4 (Low Priority - 25-34 hours):**
- Create missing organisms
- Minor fixes and polish

---

### 11. Dependency Graph Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                        ATOMS                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │Button│  │Label │  │Switch│  │Slider│  │Input │         │
│  └──┬───┘  └──────┘  └──────┘  └──────┘  └──┬───┘         │
│     │                                         │              │
└─────┼─────────────────────────────────────────┼──────────────┘
      │                                         │
      │                                         │
┌─────┼─────────────────────────────────────────┼──────────────┐
│     │              MOLECULES                  │              │
│     │  ┌────────┐  ┌──────┐  ┌──────┐       │              │
│     │  │Dropdown│  │ Tabs │  │ Panel│       │              │
│     │  └────────┘  └──┬───┘  └──────┘       │              │
│     │                 │                      │              │
└─────┼─────────────────┼──────────────────────┼──────────────┘
      │                 │                      │
      │                 │                      │
┌─────┼─────────────────┼──────────────────────┼──────────────┐
│     │                 │      ORGANISMS       │              │
│     │                 │  ┌──────────┐        │              │
│     │                 │  │  Drawer  │        │              │
│     │                 │  └────┬─────┘        │              │
│     │                 │       │              │              │
│     │  ┌──────────┐   │  ┌────▼─────┐       │              │
│     └─►│  Header  │◄──┼──│  Modal   │       │              │
│        └────┬─────┘   │  └──────────┘       │              │
│             │         │                      │              │
│        ┌────▼─────┐   │  ┌──────────┐       │              │
│        │  Table   │   │  │UserMgmt  │       │              │
│        └──────────┘   │  │  Table   │       │              │
│                       │  └──────────┘       │              │
└───────────────────────┼──────────────────────┼──────────────┘
                        │                      │
                        │ ❌ VIOLATION         │
                        │ Organism → Organism  │
                        └──────────────────────┘
```

**Legend:**
- ✅ Green: Valid dependencies
- ❌ Red: Dependency violations
- ⚠️ Yellow: Stub components (should be extracted)

---

### 12. Conclusion

The ARKEM Design System demonstrates **strong foundational principles** with excellent token usage, accessibility focus, and type safety. However, there are **architectural improvements needed** to fully align with atomic design principles.

**Key Strengths:**
- ✅ Excellent token usage throughout
- ✅ Strong accessibility and keyboard support
- ✅ Good TypeScript usage
- ✅ Well-structured compound components (Table, Tabs)

**Key Areas for Improvement:**
- ❌ Organism → Organism dependencies (Modal, Drawer → Header)
- ❌ Stub components not extracted (Checkbox, Badge, Avatar, Tooltip)
- ❌ Overly specific component (UserManagementTable)
- ❌ Input component blurs atom/molecule boundary

**Recommended Next Steps:**
1. **Immediate:** Extract stub components and fix organism dependencies
2. **Short-term:** Refactor UserManagementTable and split Input component
3. **Medium-term:** Reorganize file structure and update Storybook
4. **Long-term:** Create missing components and polish

With the recommended changes, the design system will achieve a **9/10 atomic design score** and provide a solid foundation for scalable component development.

---

**Report Generated:** 2025-01-27

**Next Review:** After implementing critical recommendations (Phase 1)

---

