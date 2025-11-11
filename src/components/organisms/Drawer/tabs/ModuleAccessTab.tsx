import React, { useState, useEffect } from "react";

import { Switch } from "../../../atoms/Switch/Switch";

export type ModuleKey = "monitor" | "tracer" | "network_graph" | "profile" | "audit_logs";

export interface ModuleAccessTabProps {
  enabledModules?: ModuleKey[];
  onModulesChange?: (modules: ModuleKey[]) => void;
  availableModules?: Array<{
    id: ModuleKey;
    name: string;
    description?: string;
  }>;
}

const DEFAULT_MODULES: Array<{ id: ModuleKey; name: string; description?: string }> = [
  { id: "monitor", name: "Monitor", description: "Real-time monitoring and alerts" },
  { id: "tracer", name: "Tracer", description: "Request tracing and debugging" },
  { id: "network_graph", name: "Network Graph", description: "Network visualization and analysis" },
  { id: "profile", name: "Profile", description: "User profile management" },
  { id: "audit_logs", name: "Audit Logs", description: "Access audit logs and history" },
];

export const ModuleAccessTab: React.FC<ModuleAccessTabProps> = ({
  enabledModules: controlledEnabledModules,
  onModulesChange,
  availableModules = DEFAULT_MODULES,
}) => {
  const [internalEnabled, setInternalEnabled] = useState<ModuleKey[]>(controlledEnabledModules || []);

  const isControlled = controlledEnabledModules !== undefined;
  const enabledModules = isControlled ? controlledEnabledModules : internalEnabled;

  useEffect(() => {
    if (controlledEnabledModules !== undefined) {
      setInternalEnabled(controlledEnabledModules);
    }
  }, [controlledEnabledModules]);

  const toggleModule = (moduleId: ModuleKey, checked: boolean) => {
    if (isControlled) {
      const updated = checked
        ? [...enabledModules, moduleId]
        : enabledModules.filter((id) => id !== moduleId);
      onModulesChange?.(updated);
    } else {
      const updated = checked
        ? [...enabledModules, moduleId]
        : enabledModules.filter((id) => id !== moduleId);
      setInternalEnabled(updated);
      onModulesChange?.(updated);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12, 12px)" }}>
      {availableModules.map((module) => {
        const isEnabled = enabledModules.includes(module.id);
        return (
          <div
            key={module.id}
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
                {module.name}
              </div>
              {module.description && (
                <div
                  style={{
                    fontSize: "var(--fonts-semantic-sm)",
                    color: "var(--semantic-text-secondary)",
                  }}
                >
                  {module.description}
                </div>
              )}
            </div>
            <Switch
              checked={isEnabled}
              onCheckedChange={(v) => toggleModule(module.id, Boolean(v))}
              ariaLabel={`Enable ${module.name} module`}
            />
          </div>
        );
      })}
    </div>
  );
};

