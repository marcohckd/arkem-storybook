# Table Component Implementation Plan (v2)

## Overview

Build a two-tier table system: a base reusable `Table` component and a specialized `UserManagementTable` wrapper. All styling must use tokens (no hardcoded values), with proper TypeScript types, ARIA attributes, and Storybook stories.

## Phase 0: Stub Components for External Dependencies

**Location**: `src/components/Table/stubs/`

**Create minimal stub components for Storybook:**

1. **`Checkbox.tsx`** (15-20 lines)
   - Simple checkbox input with controlled state
   - Props: `checked`, `onCheckedChange`, `className`
   - Styled with tokens, accessible

2. **`Badge.tsx`** (20-25 lines)
   - Simple span with variant styling
   - Props: `variant` ("default" | "secondary"), `children`, `className`, `style`
   - Uses semantic tokens for colors

3. **`Avatar.tsx`** and **`AvatarFallback.tsx`** (30-40 lines total)
   - Simple div wrapper and fallback component
   - Props: `children`, `className`
   - Basic styling with tokens

4. **`Tooltip.tsx`**, **`TooltipTrigger.tsx`**, **`TooltipContent.tsx`** (40-50 lines total)
   - Simple hover-based tooltip implementation
   - Props: `delayDuration`, `children`, `side`, `sideOffset`, `className`
   - Basic positioning, styled with tokens

**Implementation Notes:**
- Use native HTML elements where possible
- Style with tokens only
- Include basic accessibility (ARIA where needed)
- These are for Storybook only - document that production should use real components

**Estimated Time**: 1-2 hours

---

## Phase 1: Semantic Tokens for Tables

**File**: `src/styles/tokens-semantic.css`

**Add table-specific semantic tokens:**

```css
/* Table Colors */
--semantic-table-border: var(--semantic-border-subtle);
--semantic-table-header-bg: var(--semantic-background-muted);
--semantic-table-header-text: var(--semantic-text-primary);
--semantic-table-label-text: var(--semantic-text-secondary);
--semantic-table-row-even: var(--color-fill-neutral-500); /* #1e1e1e */
--semantic-table-row-odd: var(--color-fill-neutral-600); /* #181818 */
--semantic-table-row-hover: var(--semantic-background-interactive);
--semantic-table-row-selected: color-mix(in srgb, var(--semantic-brand-base) 10%, var(--semantic-background-base));
--semantic-table-body-text: var(--semantic-text-primary);
--semantic-table-icon-active: var(--semantic-brand-base);
--semantic-table-icon-inactive: #5C5C5C;
--semantic-table-icon-hover: #F3F29E; /* or var(--semantic-brand-hover) if appropriate */
--semantic-table-tooltip-bg: var(--color-fill-neutral-500); /* #1E1E1E */
--semantic-table-batch-toolbar-bg: color-mix(in srgb, var(--semantic-brand-base) 5%, var(--semantic-background-base));
--semantic-table-batch-toolbar-border: color-mix(in srgb, var(--semantic-brand-base) 20%, var(--semantic-border-subtle));
```

**Add component-specific dimension tokens:**

```css
/* Table Dimensions */
--component-table-header-row-height: 40px;
--component-table-body-row-height: 48px;
--component-table-module-column-width: 68px;
--component-table-data-column-width: 120px;
--component-table-sticky-column-width: 280px;
--component-table-checkbox-column-width: 48px;
```

**Document acceptable hardcoded values:**
- `letter-spacing: 0.2%` - Not standardized, acceptable to hardcode
- Transition durations (`0.15s ease-in-out`) - Acceptable to hardcode (motion tokens can be added later)
- Icon sizes in table context - Use existing component pattern

**Value Mapping Reference:**
- `24px` → `var(--spacing-style-spacing-4px-6-24px)`
- `8px` → `var(--spacing-8)`
- `12px` → `var(--spacing-12)`
- `16px` → `var(--spacing-style-spacing-4px-4-16px)`
- `40px` → `var(--component-table-header-row-height)`
- `48px` → `var(--component-table-body-row-height)`
- `68px` → `var(--component-table-module-column-width)`
- `120px` → `var(--component-table-data-column-width)`
- `280px` → `var(--component-table-sticky-column-width)`
- `13px` → `var(--fonts-semantic-md)` (14px - document 1px variance)
- `12px` → `var(--fonts-semantic-sm)`
- `600` → `var(--font-weight-semibold)`
- `0.5px` → `var(--border-widths-mode-1-border-widht-hairline)`
- `8px` radius → `var(--radius-md)`
- `6px` radius → `var(--radius-sm)`

**Estimated Time**: 1-2 hours

---

## Phase 2: Base Table Component

**Files**: 
- `src/components/Table/Table.tsx`
- `src/components/Table/Table.css`
- `src/components/Table/TableHeader.tsx`
- `src/components/Table/TableBody.tsx`
- `src/components/Table/TableRow.tsx`
- `src/components/Table/TableHead.tsx`
- `src/components/Table/TableCell.tsx`

**Implementation Strategy:**

1. **Table.tsx** - Main wrapper component
   - Semantic `<table>` element
   - Props: `children`, `className`, `ariaLabel`
   - Import CSS: `import "./Table.css"`

2. **Table.css** - Base styles
   - Convert all Tailwind classes to CSS
   - Use tokens for all values
   - BEM naming: `.arkem-table`, `.arkem-table__container`, etc.
   - Table structure styles (border, radius, overflow)
   - Row state styles (even/odd, hover, selected)
   - Sticky column base styles

3. **Sub-components** - Individual table elements
   - Each component wraps semantic HTML element
   - Props typed with TypeScript interfaces
   - Support for sticky positioning, colspan/rowspan
   - Accessible by default

**Key Technical Considerations:**

- **Sticky Columns**: 
  - First sticky column: `position: sticky; left: 0; z-index: 10;`
  - Second sticky column: `position: sticky; left: var(--component-table-checkbox-column-width); z-index: 10;`
  - Ensure proper background colors on sticky elements
  - Test cross-browser (especially Safari)

- **Tailwind Conversion Examples**:
  - `flex-1 flex flex-col` → `display: flex; flex: 1; flex-direction: column;`
  - `gap-2` → `gap: var(--spacing-8);`
  - `rounded-[8px]` → `border-radius: var(--radius-md);`
  - `bg-table-header-bg` → `background: var(--semantic-table-header-bg);`
  - `border-[0.5px]` → `border-width: var(--border-widths-mode-1-border-widht-hairline);`

**Component APIs:**

```typescript
// Table.tsx
interface TableProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

// TableRow.tsx
interface TableRowProps {
  children: React.ReactNode;
  isEven?: boolean;
  isSelected?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// TableHead.tsx
interface TableHeadProps {
  children: React.ReactNode;
  sticky?: boolean;
  stickyOffset?: number; // For second sticky column
  sortable?: boolean;
  onClick?: () => void;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  style?: React.CSSProperties;
}

// TableCell.tsx
interface TableCellProps {
  children: React.ReactNode;
  sticky?: boolean;
  stickyOffset?: number;
  className?: string;
  style?: React.CSSProperties;
}
```

**Estimated Time**: 4-5 hours (including Tailwind conversion)

---

## Phase 3: UserManagementTable Component

**Files**:
- `src/components/UserManagementTable/UserManagementTable.tsx`
- `src/components/UserManagementTable/UserManagementTable.css`

**Implementation Strategy - Phased Approach:**

**Priority 1: Core Table Structure** (2-3 hours)
- Basic table rendering with user data
- Column layout (checkbox, user, role, modules, data access, actions)
- Even/odd row styling
- Basic user data display

**Priority 2: Selection** (1-2 hours)
- Individual row checkbox selection
- Select all checkbox in header
- State management with `useState`
- Selection state passed to rows

**Priority 3: Batch Actions Toolbar** (1-2 hours)
- Conditional rendering when items selected
- Selection count display
- Bulk Update, Activate/Deactivate, Export buttons
- Styled with tokens

**Priority 4: Sorting** (1-2 hours)
- Clickable column headers (name, role)
- Sort state management (`useState` for column + direction)
- Visual sort indicators (ArrowUpDown icon)
- Sorted data with `useMemo`

**Priority 5: Sticky Columns** (2-3 hours)
- Checkbox column sticky
- User name column sticky (offset by checkbox width)
- Test scrolling behavior
- Ensure proper z-index and backgrounds

**Priority 6: Module Access Columns** (1-2 hours)
- Dynamic columns based on modules array
- Icon rendering with lucide-react
- Tooltip integration (using stub component)
- Check/uncheck indicators

**Priority 7: Data Access Columns** (1 hour)
- Record Limit, Time Window columns
- Boolean columns (Mask Shodan, Hash Identifiers, AI Assistant)
- Check icon indicators using tokens

**Priority 8: Pagination** (1-2 hours)
- Client-side pagination with `useMemo`
- Page size control (default: 10)
- Page navigation (if needed - may be handled externally)
- Paginated data calculation

**Priority 9: Row Actions** (30 min - 1 hour)
- Edit button per row
- Uses existing Button component
- Click handler calls `onUserEdit` prop

**Priority 10: Empty State** (30 min)
- Conditional rendering when no users
- Styled message
- Uses semantic tokens

**State Management:**

```typescript
// Use React hooks for state
const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
const [sortColumn, setSortColumn] = useState<"name" | "role" | null>(null);
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

// Memoized computations
const sortedUsers = useMemo(() => { /* sorting logic */ }, [users, sortColumn, sortDirection]);
const paginatedUsers = useMemo(() => { /* pagination logic */ }, [sortedUsers, currentPage, pageSize]);
```

**Props Interface:**

```typescript
interface User {
  id: string;
  name: string;
  role: "admin" | "user";
  modules: string[];
  recordLimit: number;
  timeWindowDays: number;
  maskShodan: boolean;
  hashIdentifiers: boolean;
  aiAssistant: boolean;
}

interface Module {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface UserManagementTableProps {
  users: User[];
  modules: Module[];
  onUserEdit?: (user: User) => void;
  onBulkUpdate?: (userIds: string[]) => void;
  onBulkActivate?: (userIds: string[]) => void;
  onBulkExport?: (userIds: string[]) => void;
  pageSize?: number;
  className?: string;
}
```

**CSS Conversion:**
- Convert all Tailwind classes to CSS
- Use tokens for all values
- BEM naming: `.arkem-user-table`, `.arkem-user-table__toolbar`, etc.

**Estimated Time**: 8-11 hours (all priorities)

---

## Phase 4: Storybook Stories

**Files**:
- `src/components/Table/Table.stories.tsx`
- `src/components/UserManagementTable/UserManagementTable.stories.tsx`

**Table.stories.tsx Stories:**

1. **Default** - Basic table with sample data
2. **With Selection** - Table with selectable rows
3. **Sticky Columns** - Demonstrates sticky column behavior
4. **Sortable** - Table with sortable headers
5. **States** - Shows even/odd, hover, selected states

**UserManagementTable.stories.tsx Stories:**

1. **Default** - Full table with sample users and modules
2. **With Selection** - Table with selected users showing batch toolbar
3. **Empty State** - Table with no users
4. **Sorting** - Demonstrates sort functionality
5. **Pagination** - Shows pagination with different page sizes

**Mock Data:**

```typescript
// Sample users for stories
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    role: "admin",
    modules: ["module1", "module2"],
    recordLimit: 1000,
    timeWindowDays: 30,
    maskShodan: true,
    hashIdentifiers: false,
    aiAssistant: true,
  },
  // ... more users
];

// Sample modules for stories
const mockModules: Module[] = [
  { id: "module1", name: "Module One", icon: Settings },
  // ... more modules
];
```

**Story Requirements:**
- All props exposed via Controls
- Comprehensive documentation in Docs tab
- Layout: `fullscreen` for table stories
- Background: `arkem-base`
- Import stub components for external dependencies

**Estimated Time**: 3-4 hours

---

## Phase 5: Accessibility & Polish

**Accessibility Features:**

1. **ARIA Labels**
   - Table: `aria-label` on `<table>`
   - Sortable headers: `aria-sort` attribute
   - Selection: `aria-checked` on checkboxes
   - Batch toolbar: `aria-live` region for selection count

2. **Keyboard Navigation**
   - Arrow keys: Navigate between cells
   - Space/Enter: Toggle selection
   - Tab: Navigate interactive elements
   - Escape: Clear selection (optional)

3. **Focus Management**
   - `:focus-visible` styles on all interactive elements
   - Focus ring using `--semantic-focus-ring`
   - Logical tab order

4. **Screen Reader Support**
   - Proper table semantics (`<thead>`, `<tbody>`, `<th scope>`)
   - Descriptive labels
   - State announcements

**Code Quality:**

1. **TypeScript**
   - Strict mode compliance
   - No `any` types
   - Proper interface definitions

2. **Token Compliance**
   - Grep for hardcoded hex colors: `grep -r "#[0-9A-Fa-f]\{6\}" src/components/Table`
   - Grep for hardcoded px values: `grep -r "[0-9]px" src/components/Table` (exclude documented exceptions)
   - Document any exceptions with rationale

3. **CSS Quality**
   - BEM naming consistency
   - Token usage verified
   - No duplicate styles

4. **Documentation**
   - Component JSDoc comments
   - Props documentation
   - Usage examples in stories

**Testing Checklist:**
- [ ] All hardcoded values replaced (exceptions documented)
- [ ] Stub components work in Storybook
- [ ] Table renders correctly
- [ ] Selection works (individual and select all)
- [ ] Batch toolbar appears/disappears
- [ ] Sorting works
- [ ] Pagination works
- [ ] Sticky columns work (test Chrome, Firefox, Safari)
- [ ] Module columns render correctly
- [ ] Row actions work
- [ ] Empty state displays
- [ ] Keyboard navigation works
- [ ] Focus-visible styles appear
- [ ] Stories render in Storybook
- [ ] Docs tab is usable
- [ ] Screen reader testing (VoiceOver/NVDA)

**Estimated Time**: 2-3 hours

---

## File Structure

```
src/components/
  Table/
    stubs/                    # Stub components for Storybook
      Checkbox.tsx
      Badge.tsx
      Avatar.tsx
      AvatarFallback.tsx
      Tooltip.tsx
      TooltipTrigger.tsx
      TooltipContent.tsx
    Table.tsx
    Table.css
    TableHeader.tsx
    TableBody.tsx
    TableRow.tsx
    TableHead.tsx
    TableCell.tsx
    Table.stories.tsx
  UserManagementTable/
    UserManagementTable.tsx
    UserManagementTable.css
    UserManagementTable.stories.tsx
```

---

## Effort Summary

| Phase | Task | Hours | Risk |
|-------|------|-------|------|
| Phase 0 | Stub Components | 1-2 | Low |
| Phase 1 | Semantic Tokens | 1-2 | Low |
| Phase 2 | Base Table Component | 4-5 | Low |
| Phase 3 | UserManagementTable (All Features) | 8-11 | Medium |
| Phase 4 | Storybook Stories | 3-4 | Low |
| Phase 5 | Accessibility & Polish | 2-3 | Low |
| **Buffer** | Testing & Iteration | 2-3 | - |
| **TOTAL** | | **21-30 hours** | |

---

## Risk Mitigation Strategies

1. **Sticky Columns** - Test early, iterate if needed
2. **Tailwind Conversion** - Systematic approach, verify with grep
3. **State Management** - Use React hooks properly, memoize expensive computations
4. **External Dependencies** - Stub components remove this risk
5. **Token Values** - Extract from design system or use existing tokens

---

## Success Criteria

- ✅ All components use tokens only (documented exceptions)
- ✅ Base Table is reusable and generic
- ✅ UserManagementTable implements all features from reference code
- ✅ All stories render correctly in Storybook
- ✅ Accessibility features implemented and tested
- ✅ TypeScript strict mode compliance
- ✅ Code follows existing patterns (Button, Header, Modal)

---

## Dependencies

- **Stub components**: Created in `Table/stubs/` for Storybook
- **Existing components**: `Button` (from existing Button component)
- **Icons**: `lucide-react` (Check, ArrowUpDown, Settings2, Power, Download, Edit)
- **React hooks**: `useState`, `useMemo`, `useCallback`

---

## Notes

- Stub components are for Storybook only. In production, these should be provided externally or built as part of the design system.
- Acceptable hardcoded values: `letter-spacing: 0.2%`, transition durations, component-specific dimensions (per audit pattern).
- Font size variance: Table code uses `13px`, closest token is `14px` (semantic-md) - document 1px variance.
- Sticky columns require cross-browser testing, especially Safari.

