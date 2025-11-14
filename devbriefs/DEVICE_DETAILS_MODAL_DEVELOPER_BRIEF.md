# Device Details Modal — Developer Brief

## Overview

The Device Details Modal is a complex, multi-pane modal component that displays comprehensive device information, timeline data, and enrichment metrics. It uses a **2+1 layout format** with conditional visibility/N/A handling for all data points, ensuring a clean presentation even when enrichment data is incomplete.

**Reference Implementation:** `src/components/organisms/Modal/Modal.stories.tsx` (DeviceDetails story)

---

## Architecture

### Layout Structure

The modal uses the `Modal` component with `format="2+1"`:

- **Left Column (2 panes, stacked vertically):**
  - **Pane A (Top):** Device Information — Tabbed interface with device metadata
  - **Pane B (Bottom):** Device Timeline — Scrollable list of device observations

- **Right Column (1 pane, full height):**
  - **Pane C:** Device Infrastructure — Collapsible sections with enrichment data

### Modal Props

```tsx
<Modal
  format="2+1"
  title="Device Details"
  isOpen={isOpen}
  onClose={onClose}
  showA={true}  // Device Information
  showB={true}  // Device Timeline
  showC={true}  // Device Infrastructure
  header={<CustomHeader />}
  footer={<FooterWithTimestamp />}
>
  {/* Content populated via DOM manipulation */}
</Modal>
```

---

## Core Patterns

### 1. Conditional Visibility / N/A Handling

Every metric that can be missing or unavailable must implement conditional visibility using **enrichment flags** and the **renderMetricRow** pattern.

#### Enrichment Flags Object

Create a flags object that mirrors your database `uts_raw` boolean columns:

```typescript
const enrichmentFlags = {
  geo_country: true,
  geo_city: true,
  threat_score: true,
  honeypot: true,
  malware_samples: true,
  // ... add all enrichment flags
} as const;
```

**Source:** Flags should come from your API response, matching the `uts_raw` boolean columns that indicate data availability.

#### Metric Type Definition

```typescript
type Metric = {
  key?: string;           // Required for conditional visibility
  label: string;          // Display label (e.g., "COUNTRY:")
  value?: string;         // Display value (e.g., "Iran")
  error?: boolean;        // Show in error color
  critical?: boolean;     // Show in critical color with bold weight
};
```

#### renderMetricRow Function

This function handles N/A display and styling:

```typescript
const renderMetricRow = (
  metric: Metric,
  idx: number,
  total: number,
) => {
  const isLast = idx === total - 1;
  const key = metric.key;
  const isAvailable = key 
    ? enrichmentFlags[key as keyof typeof enrichmentFlags] 
    : true; // Metrics without keys always show

  const displayValue = isAvailable && metric.value ? metric.value : 'N/A';
  const isEmpty = !isAvailable || !metric.value;

  return (
    <div
      key={idx}
      className={`arkem-modal__metric-row${isEmpty ? ' arkem-modal__metric-row--empty' : ''}`}
      style={{
        display: 'flex',
        height: '42px',
        background: 'var(--semantic-background-raised)',
        borderBottom: !isLast
          ? 'var(--border-widths-mode-1-border-width-hairline) solid var(--semantic-border-muted)'
          : 'none',
      }}
    >
      {/* Label cell */}
      <div style={{
        width: '180px', // Use '100px' for Device Information pane
        padding: 'var(--spacing-style-spacing-4px-3-12px) var(--spacing-style-spacing-4px-4-16px)',
        display: 'flex',
        alignItems: 'center',
        fontSize: 'var(--fonts-semantic-xs)',
        color: 'var(--semantic-text-secondary)',
        textTransform: 'uppercase',
      }}>
        {metric.label}
      </div>
      
      {/* Value cell */}
      <div style={{
        flex: 1,
        padding: 'var(--spacing-style-spacing-4px-3-12px) var(--spacing-style-spacing-4px-4-16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: 'var(--fonts-semantic-xs)',
        color: isEmpty
          ? 'var(--semantic-text-muted)'  // N/A styling
          : metric.error
            ? 'var(--semantic-feedback-error-base)'
            : metric.critical
              ? 'var(--semantic-feedback-error-base)'
              : 'var(--semantic-text-primary)',
        fontWeight: metric.critical && !isEmpty
          ? 'var(--font-weight-semibold)'
          : 'var(--font-weight-regular)',
        textAlign: 'right',
      }}>
        {displayValue}
      </div>
    </div>
  );
};
```

**Key Points:**
- Metrics with `key` property use enrichment flags for conditional visibility
- Metrics without `key` always display (no conditional logic)
- Empty metrics show "N/A" in muted, italic text
- CSS class `arkem-modal__metric-row--empty` provides additional styling

---

## Implementation Guide

### Step 1: Device Information Pane

**Location:** Left column, top pane

**Structure:**
- Sticky header with icon and title
- Tab navigation (Identity, Specs, Geolocation, Observations)
- Tab content with metric rows

**Key Requirements:**
- Use `renderMetricRow` for all metrics
- Label width: `100px` (narrower than enrichment pane)
- Add `key` property to metrics that need conditional visibility
- Geolocation tab should only show AV (AlienVault) data — no source names in labels

**Example Metric Definition:**

```typescript
const tabContent: Record<string, Array<Metric>> = {
  Identity: [
    { label: 'DEVICE ID:', value: deviceId },
    { label: 'USER ID:', value: userId },
    { label: 'IP ADDRESS:', value: ipAddress }
  ],
  Geolocation: [
    { key: 'geo_country', label: 'COUNTRY:', value: avCountry },
    { key: 'geo_city', label: 'CITY:', value: avCity }
  ],
  // ... other tabs
};
```

**Important:** Do not include "Consent" row — it's removed from the design.

---

### Step 2: Device Timeline Pane

**Location:** Left column, bottom pane

**Structure:**
- Sticky header with icon, title, and observation count
- Scrollable list of timeline entries

**Timeline Entry Format:**

```typescript
{
  date: 'Aug 1, 2025 • 08:11 PM • 75d ago',
  location: 'Phoenix, USA',
  id: '1207472156',
  coords: '33.3366, -111.7307'
}
```

**Styling:**
- Each entry: `56px` height
- Background: `var(--color-fill-neutral-800)`
- Date: `var(--fonts-semantic-xxs)`, secondary color
- Location line: `var(--fonts-semantic-xs)`, primary color

---

### Step 3: Device Infrastructure Pane (Enrichment Data)

**Location:** Right column, full height

**Structure:**
- Sticky header with icon and title
- Collapsible sections with expand/collapse functionality
- Each section contains metric rows

**Section Structure:**

```typescript
const sections = [
  {
    id: 'threat',
    title: 'Threat Assessment',
    count: 3, // Number of metrics
    icon: 'AlertTriangle', // Icon name from lucide-react
    metrics: [
      { 
        key: 'threat_score',
        label: 'THREAT SCORE:', 
        value: '87/100 [HIGH]', 
        critical: true 
      },
      // ... more metrics
    ]
  },
  // ... more sections
];
```

**Key Requirements:**
- Use `renderMetricRow` for all metrics
- Label width: `180px` (wider than Device Information pane)
- All metrics must have `key` property for conditional visibility
- Sections are collapsible with expand/collapse state management
- Default expanded section: `'threat'`

**Section Organization:**

1. **Threat Assessment** — Threat scores, honeypot detection, probabilities
2. **Threat Intelligence** — Pulse counts, DNS data, tags, malware samples, geolocation
3. **Network Infrastructure** — Organization, hostname, ASN, ISP, registration status
4. **Services & Exposure** — Open ports, services, vulnerabilities, discovered domains/URLs

**Important:**
- **Malware Samples** belongs in **Threat Intelligence**, not Threat Assessment
- Remove all source names from labels (no "AV", "WHOIS", "Shodan" prefixes)
- Use generic labels: `COUNTRY:`, `CITY:`, `ASN:`, `REGISTRATION STATUS:`

---

### Step 4: Footer

**Single Timestamp Display:**

```tsx
<footer>
  <div className="arkem-modal__footer-item">
    <span className="arkem-modal__footer-label">IP UPDATED:</span>
    <span className="arkem-modal__footer-value">{mostRecentTimestamp}</span>
  </div>
</footer>
```

**Requirements:**
- Single "IP UPDATED:" label (no source-specific labels)
- Use the most recent timestamp from all enrichment sources
- Format: `YYYY-MM-DD HH:mm` (e.g., "2025-02-10 14:32")

---

## Data Mapping

### API Response → Modal Data

**Enrichment Flags:**
Map your `uts_raw` boolean columns to the enrichment flags object:

```typescript
const enrichmentFlags = {
  geo_country: apiResponse.uts_raw?.geo_country ?? false,
  geo_city: apiResponse.uts_raw?.geo_city ?? false,
  threat_score: apiResponse.uts_raw?.threat_score ?? false,
  // ... map all boolean flags
};
```

**Geolocation Data:**
- Use **AlienVault (AV)** as the canonical source for country and city
- Do not display WHOIS or Shodan country data separately
- Only show: `COUNTRY:` and `CITY:` from AV

**Metric Values:**
- Map API response fields to metric `value` properties
- Handle null/undefined values — they will show as "N/A" if flag is false
- Format values appropriately (e.g., threat scores, percentages, lists)

---

## Styling Guidelines

### Design Tokens (Always Use)

**Colors:**
- Background: `var(--semantic-background-raised)`
- Text Primary: `var(--semantic-text-primary)`
- Text Secondary: `var(--semantic-text-secondary)`
- Text Muted: `var(--semantic-text-muted)` (for N/A values)
- Error/Critical: `var(--semantic-feedback-error-base)`
- Border: `var(--semantic-border-muted)`

**Typography:**
- Labels/Values: `var(--fonts-semantic-xs)` (12px)
- Font Weight Regular: `var(--font-weight-regular)`
- Font Weight Semibold: `var(--font-weight-semibold)` (for critical metrics)

**Spacing:**
- Row Height: `42px`
- Label Padding: `var(--spacing-style-spacing-4px-3-12px) var(--spacing-style-spacing-4px-4-16px)`
- Border Width: `var(--border-widths-mode-1-border-width-hairline)`

**Never hardcode values** — always use semantic tokens.

---

## CSS Classes

### Empty Row Styling

The CSS file includes styling for empty/N/A rows:

```css
.arkem-modal__metric-row--empty .arkem-modal__footer-value,
.arkem-modal__metric-row--empty div:last-child {
  color: var(--semantic-text-muted);
  font-style: italic;
}
```

This is automatically applied when `isEmpty` is true in `renderMetricRow`.

---

## Implementation Checklist

- [ ] Create enrichment flags object from API `uts_raw` booleans
- [ ] Implement `renderMetricRow` function with conditional visibility
- [ ] Build Device Information pane with tabs and metrics
- [ ] Add `key` property to all metrics requiring conditional visibility
- [ ] Implement Device Timeline pane with scrollable entries
- [ ] Build Device Infrastructure pane with collapsible sections
- [ ] Move "Malware Samples" to Threat Intelligence section
- [ ] Remove all source names from labels (AV, WHOIS, Shodan)
- [ ] Use only AV data for geolocation (Country, City)
- [ ] Implement single "IP UPDATED:" footer timestamp
- [ ] Test N/A display when enrichment flags are false
- [ ] Verify all styling uses semantic tokens
- [ ] Test expand/collapse functionality for sections
- [ ] Verify tab switching in Device Information pane

---

## Common Pitfalls

1. **Forgetting the `key` property** — Metrics without `key` won't use conditional visibility
2. **Hardcoding source names** — Labels should be generic (e.g., "COUNTRY:" not "AV COUNTRY:")
3. **Wrong label width** — Device Information uses `100px`, Enrichment uses `180px`
4. **Missing enrichment flags** — All metrics with `key` need corresponding flags
5. **Not handling empty values** — Always check `isAvailable && metric.value` before displaying
6. **Using raw CSS values** — Always use semantic tokens, never hardcode colors/spacing

---

## Testing

### Test Cases

1. **Conditional Visibility:**
   - Set enrichment flag to `false` → metric should show "N/A"
   - Set enrichment flag to `true` with value → metric should show value
   - Set enrichment flag to `true` without value → metric should show "N/A"

2. **Critical Metrics:**
   - Metrics with `critical: true` should show in error color with semibold weight
   - Critical metrics with N/A should not show error color

3. **Section Expand/Collapse:**
   - Click section header → section should expand/collapse
   - Default state: Threat Assessment expanded

4. **Tab Navigation:**
   - Click tab → content should switch
   - Active tab should be highlighted

5. **Footer Timestamp:**
   - Should show single "IP UPDATED:" with most recent timestamp

---

## Reference Files

- **Story Implementation:** `src/components/organisms/Modal/Modal.stories.tsx` (DeviceDetails story)
- **Modal Component:** `src/components/organisms/Modal/Modal.tsx`
- **Modal Styles:** `src/components/organisms/Modal/Modal.css`
- **Design Tokens:** `src/styles/tokens-semantic.css`

---

## Questions?

Refer to the DeviceDetails story implementation for a complete working example. All patterns, styling, and conditional visibility logic are demonstrated there.

