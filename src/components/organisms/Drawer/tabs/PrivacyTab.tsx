import React, { useState, useEffect } from "react";

import { Switch } from "../../../atoms/Switch/Switch";

export type PrivacyState = {
  hashEmail: boolean;
  hashPhone: boolean;
  maskIP: boolean;
  maskLocation: boolean;
};

export interface PrivacyTabProps {
  initial?: PrivacyState;
  onChange?: (state: PrivacyState) => void;
}

export const PrivacyTab: React.FC<PrivacyTabProps> = ({
  initial = { hashEmail: false, hashPhone: false, maskIP: false, maskLocation: false },
  onChange,
}) => {
  const [state, setState] = useState<PrivacyState>(initial);

  useEffect(() => {
    onChange?.(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const Row: React.FC<{
    title: string;
    description: string;
    checked: boolean;
    onCheckedChange: (v: boolean) => void;
  }> = ({ title, description, checked, onCheckedChange }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--spacing-12, 12px)",
        border: "var(--border-width-thin, 1px) solid var(--semantic-border-subtle)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <div style={{ paddingRight: "var(--spacing-16, 16px)", flex: 1 }}>
        <div
          style={{
            fontSize: "var(--fonts-semantic-md)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--semantic-text-primary)",
            marginBottom: "var(--spacing-4, 4px)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-secondary)",
          }}
        >
          {description}
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} ariaLabel={title} />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12, 12px)" }}>
      <Row
        title="Hash Email Addresses"
        description="Display emails as one-way hashed values"
        checked={state.hashEmail}
        onCheckedChange={(v) => setState((s) => ({ ...s, hashEmail: v }))}
      />
      <Row
        title="Hash Phone Numbers"
        description="Display phone numbers as one-way hashed values"
        checked={state.hashPhone}
        onCheckedChange={(v) => setState((s) => ({ ...s, hashPhone: v }))}
      />
      <Row
        title="Mask IP Addresses"
        description="Partially hide IP addresses for privacy"
        checked={state.maskIP}
        onCheckedChange={(v) => setState((s) => ({ ...s, maskIP: v }))}
      />
      <Row
        title="Mask Physical Locations"
        description="Show only city/state instead of full addresses"
        checked={state.maskLocation}
        onCheckedChange={(v) => setState((s) => ({ ...s, maskLocation: v }))}
      />
    </div>
  );
};

