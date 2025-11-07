# UserConfigDrawer Development Plan

## Overview
Create a `UserConfigDrawer` component that provides a tabbed interface for configuring user access settings. The component will use ARKEM design tokens exclusively and follow the existing component patterns in the codebase.

---

## Phase 1: Component Dependencies & Prerequisites

### 1.0 Install Radix UI Packages
**File**: `package.json`

- Install `@radix-ui/react-tabs` (for Tabs component)
- Install `@radix-ui/react-switch` (for Switch component)
- Install `@radix-ui/react-visually-hidden` (for accessibility)
- Follow existing pattern: `@radix-ui/react-slider` is already installed

### 1.1 Create Tabs Component (Using Radix UI)
**File**: `src/components/Tabs/Tabs.tsx`, `Tabs.css`, `Tabs.stories.tsx`

- **Use Radix UI primitives**: `@radix-ui/react-tabs` (Root, List, Trigger, Content)
- **Follow Slider.tsx pattern**: Wrap Radix primitives with ARKEM CSS classes
- **Props**:
  - `defaultValue?: string` - Initial active tab
  - `value?: string` - Controlled active tab
  - `onValueChange?: (value: string) => void` - Tab change handler
  - `children: ReactNode` - Tab content
- **Sub-components**:
  - `TabsList` - Wrapper around `TabsPrimitive.List`
  - `TabsTrigger` - Wrapper around `TabsPrimitive.Trigger`
  - `TabsContent` - Wrapper around `TabsPrimitive.Content`
- **CSS Styling** (using ARKEM tokens):
  - Active state: `border-bottom: 2px solid var(--semantic-brand-base)`, `color: var(--semantic-brand-base)`
  - Inactive state: `color: var(--semantic-text-secondary)`
  - Background: `var(--semantic-background-base)`
  - Use data attributes: `.arkem-tabs__trigger[data-state="active"]`
  - Override Radix defaults: `all: unset` if needed
- **Accessibility**: Radix provides ARIA tabs pattern, keyboard navigation (Arrow keys, Home/End) automatically

### 1.2 Create Switch Component (Using Radix UI)
**File**: `src/components/Switch/Switch.tsx`, `Switch.css`, `Switch.stories.tsx`

- **Use Radix UI primitives**: `@radix-ui/react-switch` (Root, Thumb)
- **Follow Slider.tsx pattern**: Wrap Radix primitives with ARKEM CSS classes
- **Props**:
  - `checked?: boolean`
  - `onCheckedChange?: (checked: boolean) => void`
  - `disabled?: boolean`
  - `ariaLabel?: string`
- **CSS Styling** (using ARKEM tokens):
  - Checked state: `background-color: var(--semantic-brand-base)`
  - Unchecked state: `background-color: var(--semantic-background-muted)`
  - Border: `var(--semantic-border-subtle)`
  - Focus: `box-shadow: 0 0 0 3px var(--semantic-focus-ring)`
- **Accessibility**: Radix provides ARIA switch role, keyboard support (Space/Enter) automatically

### 1.3 Create Label Component
**File**: `src/components/Label/Label.tsx`, `Label.css`, `Label.stories.tsx`

- **Simple wrapper component** (no Radix needed for basic label)
- **Props**:
  - `htmlFor?: string` - Associated input ID
  - `children: ReactNode`
  - `className?: string`
- **CSS Styling** (using ARKEM tokens):
  - Color: `var(--semantic-text-primary)`
  - Font: Use semantic font tokens (`--fonts-semantic-md`, etc.)

### 1.2 Existing Components to Use

- ✅ **Drawer** (`src/components/Drawer/`) - Base drawer container
- ✅ **Button** (`src/components/Button/`) - Save/Cancel actions
- ✅ **Table** (`src/components/Table/`) - Geography table
- ✅ **Checkbox** (`src/components/Table/stubs/Checkbox`) - Row selection
- ✅ **Dropdown** (`src/components/Dropdown/`) - Country selector, Time Window
- ✅ **Slider** (`src/components/SliderFilter/Slider`) - Volume limits
- ✅ **Input** (`src/components/Input/`) - (if needed for future enhancements)

### 1.3 Token Mapping (shadcn → ARKEM)

| shadcn Token | ARKEM Semantic Token | Usage |
|-------------|---------------------|-------|
| `bg-background` | `--semantic-background-base` | Main drawer background |
| `text-foreground` | `--semantic-text-primary` | Primary text |
| `text-muted-foreground` | `--semantic-text-secondary` | Secondary/muted text |
| `bg-muted` | `--semantic-background-muted` | Muted backgrounds |
| `bg-accent` | `--semantic-background-interactive` | Accent backgrounds |
| `border-border` | `--semantic-border-subtle` | Borders |
| `text-primary` | `--semantic-brand-base` | Brand/primary accent |
| `border-primary` | `--semantic-brand-base` | Primary borders |
| `bg-primary` | `--semantic-brand-base` | Primary button background |
| `rounded-[var(--radius)]` | `--radius-md` or `--radius-xs` | Border radius |
| `shadow-[...]` | `--shadow-inner-panel` (if needed) | Shadows |

---

## Phase 2: Component Structure

### 2.1 File Structure
```
src/components/Drawer/
├── Drawer.tsx                    # Replaced with UserConfigDrawer functionality
├── Drawer.css                    # Replaced with new styles (430px, full height)
├── Drawer.stories.tsx            # Replaced with UserConfigDrawer stories
└── tabs/                         # Tab content components
    ├── ModuleAccessTab.tsx       # Modules tab content
    ├── GeographyTab.tsx          # Geography tab content
    ├── LimitsTab.tsx             # Limits tab content
    └── PrivacyTab.tsx            # Privacy tab content

src/components/Tabs/              # New component
├── Tabs.tsx
├── Tabs.css
└── Tabs.stories.tsx

src/components/Switch/            # New component
├── Switch.tsx
├── Switch.css
└── Switch.stories.tsx

src/components/Label/             # New component
├── Label.tsx
├── Label.css
└── Label.stories.tsx
```

### 2.2 Component Props Interface

```typescript
type ModuleKey = "monitor" | "tracer" | "network_graph" | "profile" | "audit_logs";

type GeographyRow = {
  id: string;
  country: string;
  region: string;
  accessType: "Read" | "Write" | "Restricted";
  updatedAt: string;
};

type LimitsConfig = {
  query: number;
  storage: number;
  window: "Daily" | "Weekly" | "Monthly";
};

type PrivacyState = {
  hashEmail: boolean;
  hashPhone: boolean;
  maskIP: boolean;
  maskLocation: boolean;
};

interface UserConfigDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  initialEnabledModules?: ModuleKey[];
  initialGeography?: GeographyRow[];
  initialLimits?: LimitsConfig;
  initialPrivacy?: PrivacyState;
  onSave?: (payload: {
    enabledModules: ModuleKey[];
    geography?: GeographyRow[];
    limits?: LimitsConfig;
    privacy?: PrivacyState;
    userEmail: string;
  }) => void;
}
```

---

## Phase 3: Implementation Steps

### Step 1: Create Missing Prerequisite Components

#### 1.1 Tabs Component
- [ ] Create `src/components/Tabs/Tabs.tsx`
- [ ] Create `src/components/Tabs/Tabs.css` (token-based)
- [ ] Create `src/components/Tabs/Tabs.stories.tsx`
- [ ] Implement keyboard navigation
- [ ] Add ARIA attributes

#### 1.2 Switch Component
- [ ] Create `src/components/Switch/Switch.tsx`
- [ ] Create `src/components/Switch/Switch.css` (token-based)
- [ ] Create `src/components/Switch/Switch.stories.tsx`
- [ ] Implement keyboard support

#### 1.3 Label Component
- [ ] Create `src/components/Label/Label.tsx`
- [ ] Create `src/components/Label/Label.css` (token-based)
- [ ] Create `src/components/Label/Label.stories.tsx`

### Step 2: Create Tab Content Components

#### 2.1 GeographyTab Component
- [ ] Create `src/components/Drawer/tabs/GeographyTab.tsx`
- [ ] Implement country filter dropdown
- [ ] Implement table with row selection
- [ ] Use existing Table, Checkbox, Dropdown components
- [ ] Mock data for geography rows

#### 2.2 LimitsTab Component
- [ ] Create `src/components/Drawer/tabs/LimitsTab.tsx`
- [ ] Implement query limit slider
- [ ] Implement storage limit slider
- [ ] Implement time window dropdown
- [ ] Use existing Slider and Dropdown components

#### 2.3 PrivacyTab Component
- [ ] Create `src/components/Drawer/tabs/PrivacyTab.tsx`
- [ ] Implement privacy setting switches
- [ ] Use Switch component
- [ ] Layout with descriptions

#### 2.4 ModuleAccessTab Component
- [ ] Create `src/components/Drawer/tabs/ModuleAccessTab.tsx`
- [ ] Implement module toggle logic
- [ ] Use Checkbox or Switch components
- [ ] Display module names and descriptions

### Step 3: Replace Drawer Component Completely

#### 3.1 Component Structure
- [ ] **Replace** `src/components/Drawer/Drawer.tsx` completely
- [ ] Remove all existing Drawer props (position, width, height, withInnerShadow, title)
- [ ] New props: `open`, `onOpenChange`, `user`, `initialEnabledModules`, `initialGeography`, `initialLimits`, `initialPrivacy`, `onSave`
- [ ] Import `@radix-ui/react-visually-hidden` for accessibility
- [ ] Use Header component with `hierarchy="secondary"` for header
- [ ] Add close button in Header rightSlot (use Button component)
- [ ] Implement sticky header with user info
- [ ] Implement tab navigation (using Tabs component)
- [ ] Implement sticky footer with Save/Cancel buttons
- [ ] Implement state management for all tabs
- [ ] Implement dirty state tracking
- [ ] Implement save/cancel handlers
- [ ] Use VisuallyHidden.Root for screen reader labels

#### 3.2 Styling
- [ ] **Replace** `src/components/Drawer/Drawer.css` completely
- [ ] Remove all position variants (left, top, bottom)
- [ ] Keep only right-side drawer styles
- [ ] **Fixed width**: `width: 430px` (not responsive)
- [ ] **Full height**: `height: 100%`
- [ ] Minimal border: `border-left: var(--border-width-thin, 1px) solid var(--semantic-border-subtle)`
- [ ] Always use inner shadow: `box-shadow: var(--shadow-inner-panel)` (no conditional)
- [ ] No border-radius (full height drawer)
- [ ] Use only ARKEM semantic tokens
- [ ] Sticky header/footer with proper z-index
- [ ] Scrollable body content
- [ ] Tab active/inactive states
- [ ] Button styles (primary/outline)

#### 3.3 Accessibility
- [ ] Visually hidden title/description for screen readers
- [ ] Proper ARIA labels on all interactive elements
- [ ] Keyboard navigation support
- [ ] Focus management
- [ ] ESC key to close drawer

### Step 4: Storybook Stories

#### 4.1 Main Stories
- [ ] **Default** - Basic drawer with all tabs
- [ ] **WithInitialData** - Pre-populated with initial values
- [ ] **EmptyState** - No initial data
- [ ] **SaveCallback** - Demonstrates onSave callback
- [ ] **AllTabs** - Showcase each tab individually

#### 4.2 Tab-Specific Stories
- [ ] **ModulesTab** - Focus on modules configuration
- [ ] **GeographyTab** - Focus on geography table
- [ ] **LimitsTab** - Focus on limits configuration
- [ ] **PrivacyTab** - Focus on privacy settings

#### 4.3 Interaction Stories
- [ ] **DirtyState** - Show save button enabled/disabled
- [ ] **TabNavigation** - Keyboard and mouse navigation
- [ ] **FormValidation** - (if applicable)

---

## Phase 4: Token Verification & Semantic Tokens

### 4.1 Required Tokens Checklist
- [ ] Verify `--semantic-background-base` exists
- [ ] Verify `--semantic-text-primary` exists
- [ ] Verify `--semantic-text-secondary` exists
- [ ] Verify `--semantic-background-muted` exists
- [ ] Verify `--semantic-border-subtle` exists
- [ ] Verify `--semantic-brand-base` exists
- [ ] Verify `--radius-md` or equivalent exists
- [ ] Verify font size tokens (`--fonts-semantic-lg`, `--fonts-semantic-md`, `--fonts-semantic-sm`)

### 4.2 New Semantic Tokens (if needed)
If any visual patterns don't have tokens:
- [ ] Propose new semantic token
- [ ] Add to `src/styles/tokens-semantic.css`
- [ ] Document usage

---

## Phase 5: Testing & Validation

### 5.1 Visual Testing
- [ ] Verify all tabs render correctly
- [ ] Verify fixed 430px width
- [ ] Verify full height (100%)
- [ ] Verify sticky header/footer
- [ ] Verify scrollable content
- [ ] Verify token-based styling (no hardcoded values)

### 5.2 Interaction Testing
- [ ] Tab switching works
- [ ] Form inputs update state
- [ ] Save button enables/disables based on dirty state
- [ ] Cancel resets to initial values
- [ ] onSave callback receives correct payload

### 5.3 Accessibility Testing
- [ ] Screen reader navigation
- [ ] Keyboard-only navigation
- [ ] Focus management
- [ ] ARIA attributes correct

### 5.4 Storybook Testing
- [ ] All stories render without errors
- [ ] Controls work for all props
- [ ] Docs tab is comprehensive
- [ ] Code examples are accurate

---

## Phase 6: Documentation

### 6.1 Component Documentation
- [ ] JSDoc comments on main component
- [ ] JSDoc comments on all props
- [ ] Usage examples in Storybook
- [ ] Token usage documentation

### 6.2 Storybook Documentation
- [ ] Component description
- [ ] Props table
- [ ] Usage guidelines
- [ ] Accessibility notes
- [ ] Design token reference

---

## Implementation Order

1. **Install Radix UI packages** (`@radix-ui/react-tabs`, `@radix-ui/react-switch`, `@radix-ui/react-visually-hidden`)

2. **Week 1: Prerequisites**
   - Create Tabs component (using Radix UI)
   - Create Switch component (using Radix UI)
   - Create Label component
   - Create stories for each

3. **Week 2: Tab Components**
   - Create GeographyTab
   - Create LimitsTab
   - Create PrivacyTab
   - Create ModuleAccessTab

4. **Week 3: Replace Drawer Component**
   - Replace Drawer.tsx completely
   - Replace Drawer.css completely (430px width, full height)
   - Implement state management
   - Add accessibility features (VisuallyHidden)

5. **Week 4: Stories & Integration**
   - Replace Drawer.stories.tsx completely
   - Integrate with UserManagementTable
   - Test all interactions
   - Verify token usage
   - Documentation

---

## Acceptance Criteria

- [ ] All components use ARKEM tokens exclusively (no hardcoded hex/px)
- [ ] All tabs are functional and match spec
- [ ] Component is fully accessible (keyboard, screen reader)
- [ ] All stories render correctly in Storybook
- [ ] Component follows existing codebase patterns
- [ ] TypeScript types are complete and accurate
- [ ] No console errors or warnings
- [ ] Fixed width works (430px)
- [ ] Sticky header/footer work correctly
- [ ] Save/Cancel buttons work as expected

---

## Notes

- **Radix UI Approach**: Use Radix UI primitives for Tabs, Switch, and VisuallyHidden to reduce development time and improve accessibility
- **Follow Slider Pattern**: Reference `src/components/SliderFilter/Slider.tsx` for Radix UI + ARKEM token integration pattern
- **Fixed Width**: Drawer uses fixed 430px width (not responsive 380px → 420px)
- **Full Height**: Drawer fills 100% height with no border-radius
- **Complete Replacement**: Drawer component is completely replaced (breaking change if used elsewhere)
- **Token-Only Styling**: All styling must use CSS variables from tokens-semantic.css (no hardcoded hex/px values)
- **Accessibility**: Radix UI provides built-in ARIA, keyboard navigation, and focus management
- **Breaking Change**: Existing Drawer usage will break - verify usage before replacement

