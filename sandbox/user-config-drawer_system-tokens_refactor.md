# Refactor Prompt — Adopt **System Tokens** + Scoped Tabs (Modules/Geography/Limits/Privacy)

Use this prompt in **Cursor** to update `UserConfigDrawer` so it adopts our **system tokens** (Arkem → shadcn/Tailwind tokens) and applies new scope rules per tab.

---

## ✅ Prompt (copy–paste into Cursor)

Refactor `UserConfigDrawer` to adopt **system tokens** and scope each tab as follows. Use only token classes, **no hardcoded hex**. Keep the drawer layout (sticky header/footer, scrollable body), a11y semantics, and responsive width.

### Token adoption
- Replace all color styles with design tokens:
  - `bg-background`, `text-foreground`, `text-muted-foreground`
  - `bg-muted`, `bg-accent`, `border-border`
  - `text-primary`, `border-primary`, `bg-primary` (brand accent)
- Use `rounded-[var(--radius)]`, `shadow-[...]` only when needed.
- Retain keyboard/focus states from shadcn defaults.

### Tabs scope
1) **Modules** — include **only** the Feature Modules logic/component (no presets).
2) **Geography** — show a **table** story with a **country selector** that filters datapoints from the available countries (mock or live). Columns: `Country`, `Region`, `Access Type`, `Last Updated`. Support row selection via checkbox.
3) **Limits** — include **Volume Limits** (query/storage sliders) and **Time Window** (dropdown). Remove any usage calculators/advanced sections.
4) **Privacy** — include only **Privacy Settings** toggles (hash/mask options). **Exclude** Data Preview.

### Structure
- Keep visually-hidden `SheetTitle`/`SheetDescription` for accessibility.
- Drawer width: `w-[380px] md:w-[420px]`.
- Header: `text-[18px] font-semibold`; subtext `text-[13px] text-muted-foreground`.
- Tabs: active = `border-b-2 border-primary text-primary`; inactive = `text-muted-foreground`.
- Footer: primary action uses `bg-primary text-black hover:bg-primary/90`; cancel is `variant="outline" border-border hover:bg-muted`.
- Do not introduce new global styles; stick to component-level token classes.

Update the code to include minimal, local tab contents for **Geography**, **Limits**, and **Privacy** (tokenized), while keeping the existing **ModuleAccessTab**.

---

## Updated `UserConfigDrawer.tsx` (tokenized + scoped)

```tsx
import { useEffect, useMemo, useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Layers, Map, Gauge, Shield, X } from "lucide-react";

import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";

// shadcn pieces for the simplified tabs
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";

// Keep your existing Feature Modules implementation
import { ModuleAccessTab } from "./module-access-tab";

type ModuleKey =
  | "monitor"
  | "tracer"
  | "network_graph"
  | "profile"
  | "audit_logs";

interface UserConfigDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  initialEnabledModules?: ModuleKey[];
  onSave?: (payload: {
    enabledModules: ModuleKey[];
    // Optional: include payloads from other tabs as you wire them
    geography?: GeographyRow[];
    limits?: { query: number; storage: number; window: "Daily" | "Weekly" | "Monthly" };
    privacy?: PrivacyState;
    userEmail: string;
  }) => void;
}

/* -------------------- Geography (table) -------------------- */
type GeographyRow = {
  id: string;
  country: string;
  region: string;
  accessType: "Read" | "Write" | "Restricted";
  updatedAt: string;
};

const MOCK_GEO: GeographyRow[] = [
  { id: "na-1", country: "United States", region: "North America", accessType: "Read", updatedAt: "2025-10-01" },
  { id: "eu-1", country: "Portugal", region: "Western Europe", accessType: "Write", updatedAt: "2025-10-03" },
  { id: "eu-2", country: "Germany", region: "Central Europe", accessType: "Read", updatedAt: "2025-10-04" },
  { id: "apac-1", country: "Japan", region: "East Asia", accessType: "Restricted", updatedAt: "2025-10-05" },
];

function GeographyTable() {
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const countries = Array.from(new Set(MOCK_GEO.map(r => r.country)));
  const rows = MOCK_GEO.filter(
    r => countryFilter === "all" || r.country === countryFilter
  );

  const toggleRow = (id: string, checked: boolean) => {
    setSelected(prev => ({ ...prev, [id]: checked }));
  };

  const allOnPage = rows.length > 0 && rows.every(r => selected[r.id]);
  const someOnPage = rows.some(r => selected[r.id]) && !allOnPage;

  const toggleAll = (checked: boolean) => {
    const next = { ...selected };
    rows.forEach(r => (next[r.id] = checked));
    setSelected(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Label htmlFor="country" className="text-[13px] text-foreground">Country</Label>
        <Select
          value={countryFilter}
          onValueChange={v => setCountryFilter(v)}
        >
          <SelectTrigger id="country" className="w-[220px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {countries.map(c => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border border-border bg-muted/30">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[48px]">
                <Checkbox
                  checked={allOnPage}
                  onCheckedChange={(v) => toggleAll(Boolean(v))}
                  aria-checked={allOnPage ? "true" : someOnPage ? "mixed" : "false"}
                />
              </TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Access Type</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.id}>
                <TableCell className="w-[48px]">
                  <Checkbox
                    checked={Boolean(selected[r.id])}
                    onCheckedChange={(v) => toggleRow(r.id, Boolean(v))}
                    aria-label={`Select ${r.country}`}
                  />
                </TableCell>
                <TableCell className="text-foreground">{r.country}</TableCell>
                <TableCell className="text-muted-foreground">{r.region}</TableCell>
                <TableCell className="text-foreground">{r.accessType}</TableCell>
                <TableCell className="text-muted-foreground">{r.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/* -------------------- Limits (volume + time window) -------------------- */
function LimitsSimple({
  initialQuery = 10000,
  initialStorage = 100,
  initialWindow = "Daily",
  onChange,
}: {
  initialQuery?: number;
  initialStorage?: number;
  initialWindow?: "Daily" | "Weekly" | "Monthly";
  onChange?: (v: { query: number; storage: number; window: "Daily" | "Weekly" | "Monthly" }) => void;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [storage, setStorage] = useState(initialStorage);
  const [window, setWindow] = useState<"Daily" | "Weekly" | "Monthly">(initialWindow);

  useEffect(() => {
    onChange?.({ query, storage, window });
  }, [query, storage, window, onChange]);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-md border border-border space-y-2">
        <Label className="text-[13px] text-foreground">Query Limit per Time Window</Label>
        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
          <span>{query.toLocaleString()}</span>
        </div>
        <Slider
          value={[query]}
          onValueChange={(v) => setQuery(v[0] ?? query)}
          min={0}
          max={50000}
          step={500}
          className="[&_.range]:bg-primary"
        />
      </div>

      <div className="p-4 bg-muted rounded-md border border-border space-y-2">
        <Label className="text-[13px] text-foreground">Storage Limit (GB)</Label>
        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
          <span>{storage} GB</span>
        </div>
        <Slider
          value={[storage]}
          onValueChange={(v) => setStorage(v[0] ?? storage)}
          min={0}
          max={1000}
          step={10}
          className="[&_.range]:bg-primary"
        />
      </div>

      <div className="p-4 bg-muted rounded-md border border-border space-y-2">
        <Label className="text-[13px] text-foreground">Time Window</Label>
        <Select value={window} onValueChange={(v) => setWindow(v as any)}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select window" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Daily">Daily</SelectItem>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/* -------------------- Privacy (settings only, no preview) -------------------- */
type PrivacyState = {
  hashEmail: boolean;
  hashPhone: boolean;
  maskIP: boolean;
  maskLocation: boolean;
};

function PrivacySettings({
  initial = { hashEmail: false, hashPhone: false, maskIP: false, maskLocation: false },
  onChange,
}: {
  initial?: PrivacyState;
  onChange?: (v: PrivacyState) => void;
}) {
  const [state, setState] = useState<PrivacyState>(initial);

  useEffect(() => onChange?.(state), [state, onChange]);

  const Row = ({
    title,
    description,
    checked,
    onCheckedChange,
  }: {
    title: string;
    description: string;
    checked: boolean;
    onCheckedChange: (v: boolean) => void;
  }) => (
    <div className="flex items-center justify-between p-3 bg-muted border border-border rounded-md">
      <div className="pr-4">
        <div className="text-[13px] font-medium text-foreground">{title}</div>
        <div className="text-[12px] text-muted-foreground">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );

  return (
    <div className="space-y-3">
      <Row
        title="Hash Email Addresses"
        description="Display emails as one-way hashed values"
        checked={state.hashEmail}
        onCheckedChange={(v) => setState(s => ({ ...s, hashEmail: v }))}
      />
      <Row
        title="Hash Phone Numbers"
        description="Display phone numbers as one-way hashed values"
        checked={state.hashPhone}
        onCheckedChange={(v) => setState(s => ({ ...s, hashPhone: v }))}
      />
      <Row
        title="Mask IP Addresses"
        description="Partially hide IP addresses for privacy"
        checked={state.maskIP}
        onCheckedChange={(v) => setState(s => ({ ...s, maskIP: v }))}
      />
      <Row
        title="Mask Physical Locations"
        description="Show only city/state instead of full addresses"
        checked={state.maskLocation}
        onCheckedChange={(v) => setState(s => ({ ...s, maskLocation: v }))}
      />
    </div>
  );
}

/* -------------------- Main Drawer -------------------- */
export function UserConfigDrawer({
  open,
  onOpenChange,
  user,
  initialEnabledModules = ["monitor", "tracer", "network_graph", "profile", "audit_logs"],
  onSave,
}: UserConfigDrawerProps) {
  const [enabledModules, setEnabledModules] = useState<ModuleKey[]>(initialEnabledModules);

  // Optional: wire limits/privacy outputs
  const [limits, setLimits] = useState<{ query: number; storage: number; window: "Daily" | "Weekly" | "Monthly" } | undefined>();
  const [privacy, setPrivacy] = useState<PrivacyState | undefined>();

  useEffect(() => {
    if (!user) return;
    setEnabledModules(initialEnabledModules);
  }, [user, open, initialEnabledModules]);

  if (!user) return null;

  const baseModules = useMemo<ModuleKey[]>(() => initialEnabledModules, [initialEnabledModules]);

  const isDirty = useMemo(() => {
    if (enabledModules.length !== baseModules.length) return true;
    const a = [...enabledModules].sort();
    const b = [...baseModules].sort();
    return a.some((v, i) => v !== b[i]);
  }, [enabledModules, baseModules]);

  const handleSave = () => {
    onSave?.({
      enabledModules,
      limits,
      privacy,
      userEmail: user.email,
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    setEnabledModules(baseModules);
    onOpenChange(false);
  };

  const tabs = [
    {
      value: "modules",
      label: "Modules",
      icon: Layers,
      content: (
        <div className="space-y-3">
          {/* Feature Modules ONLY */}
          <ModuleAccessTab
            enabledModules={enabledModules}
            onModulesChange={(mods: string[]) =>
              setEnabledModules(mods as ModuleKey[])
            }
          />
        </div>
      ),
    },
    {
      value: "geography",
      label: "Geography",
      icon: Map,
      content: <GeographyTable />,
    },
    {
      value: "limits",
      label: "Limits",
      icon: Gauge,
      content: (
        <LimitsSimple onChange={setLimits} />
      ),
    },
    {
      value: "privacy",
      label: "Privacy",
      icon: Shield,
      content: <PrivacySettings onChange={setPrivacy} />,
    },
  ] as const;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="overflow-y-auto bg-background border-l border-border p-0 w-[380px] md:w-[420px]"
      >
        {/* a11y labels */}
        <VisuallyHidden.Root>
          <SheetTitle>Configure User Access</SheetTitle>
          <SheetDescription>Configure access settings for {user.name}</SheetDescription>
        </VisuallyHidden.Root>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-background px-8 pt-6 pb-4">
          <div className="mb-2 flex items-start justify-between">
            <h2 className="text-foreground text-[18px] font-semibold">Configure User Access</h2>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close user access configuration"
              className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p aria-live="polite" className="text-muted-foreground text-[13px] mb-4">
            {user.name} ({user.email}) – {user.role}
          </p>
          <div className="h-px bg-border/60" />
        </div>

        {/* Body */}
        <div className="px-8 pb-6">
          <Tabs defaultValue="modules" className="mt-4">
            <TabsList
              aria-label="User configuration sections"
              className="grid w-full grid-cols-4 gap-2 bg-transparent p-0 h-auto"
            >
              {tabs.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="rounded-none h-8 text-[13px] gap-1.5
                             data-[state=active]:text-primary
                             data-[state=inactive]:text-muted-foreground
                             data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map(({ value, content }) => (
              <TabsContent key={value} value={value} className="mt-4">
                {content}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.4)] px-8 pt-4 pb-6">
          <div className="flex flex-col gap-2">
            <Button
              className="w-full rounded-[var(--radius)] min-h-10 bg-primary text-black hover:bg-primary/90"
              disabled={!isDirty}
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-[var(--radius)] min-h-10 border-border hover:bg-muted"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

---

### Notes
- The **Modules** tab preserves your existing `ModuleAccessTab` logic and styling, but the rest is fully tokenized.
- The **Geography** tab demonstrates a lightweight table story with a country selector and row selection.
- The **Limits** tab keeps only **Volume Limits** and **Time Window**.
- The **Privacy** tab keeps only **Privacy Settings** (no data preview).

You can now wire real data and callbacks (e.g., `onSave`) to persist the geography, limits, and privacy selections.

