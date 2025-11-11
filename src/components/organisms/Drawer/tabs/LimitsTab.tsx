import React, { useState, useEffect } from "react";

import { Label } from "../../../atoms/Label/Label";
import { Slider } from "../../../atoms/Slider/Slider";
import { Dropdown } from "../../../molecules/Dropdown/Dropdown";

export type LimitsConfig = {
  query: number;
  storage: number;
  window: "Daily" | "Weekly" | "Monthly";
};

export interface LimitsTabProps {
  initialQuery?: number;
  initialStorage?: number;
  initialWindow?: "Daily" | "Weekly" | "Monthly";
  onChange?: (config: LimitsConfig) => void;
}

export const LimitsTab: React.FC<LimitsTabProps> = ({
  initialQuery = 10000,
  initialStorage = 100,
  initialWindow = "Daily",
  onChange,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [storage, setStorage] = useState(initialStorage);
  const [window, setWindow] = useState<"Daily" | "Weekly" | "Monthly">(initialWindow);

  useEffect(() => {
    onChange?.({ query, storage, window });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, storage, window]);

  const timeWindowOptions = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16, 16px)" }}>
      <div
        style={{
          padding: "var(--spacing-16, 16px)",
          borderRadius: "var(--radius-md)",
          border: "var(--border-width-thin, 1px) solid var(--semantic-border-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-8, 8px)",
        }}
      >
        <Label style={{ fontSize: "var(--fonts-semantic-md)" }}>Query Limit per Time Window</Label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-secondary)",
          }}
        >
          <span>{query.toLocaleString()}</span>
        </div>
        <Slider
          value={[query]}
          onValueChange={(v) => setQuery(v[0] ?? query)}
          min={0}
          max={50000}
          step={500}
          ariaLabel="Query limit"
        />
      </div>

      <div
        style={{
          padding: "var(--spacing-16, 16px)",
          borderRadius: "var(--radius-md)",
          border: "var(--border-width-thin, 1px) solid var(--semantic-border-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-8, 8px)",
        }}
      >
        <Label style={{ fontSize: "var(--fonts-semantic-md)" }}>Storage Limit (GB)</Label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-secondary)",
          }}
        >
          <span>{storage} GB</span>
        </div>
        <Slider
          value={[storage]}
          onValueChange={(v) => setStorage(v[0] ?? storage)}
          min={0}
          max={1000}
          step={10}
          ariaLabel="Storage limit"
        />
      </div>

      <div
        style={{
          padding: "var(--spacing-16, 16px)",
          borderRadius: "var(--radius-md)",
          border: "var(--border-width-thin, 1px) solid var(--semantic-border-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-8, 8px)",
        }}
      >
        <Label htmlFor="time-window" style={{ fontSize: "var(--fonts-semantic-md)" }}>
          Time Window
        </Label>
        <Dropdown
          id="time-window"
          options={timeWindowOptions}
          value={window}
          onChange={(v) => setWindow(v as "Daily" | "Weekly" | "Monthly")}
          size="md"
          ariaLabel="Select time window"
        />
      </div>
    </div>
  );
};

