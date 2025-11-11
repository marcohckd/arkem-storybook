import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch, type SwitchProps } from "./Switch";
import { Label } from "../Label/Label";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `A toggle switch component for binary on/off states, built with Radix UI primitives.

## Features

- Two size variants: \`default\` and \`sm\`
- Full keyboard accessibility (Space to toggle)
- Focus ring for accessibility
- Hover and disabled states
- Uses semantic tokens only
- Controlled and uncontrolled modes

## Token Hierarchy

Tokens follow a three-tier hierarchy:

**Semantic Tokens (Usage level)** - \`var(--semantic-*)\`
- Describe the purpose: \`--semantic-text-primary\`, \`--semantic-background-base\`
- Should always be used in components

**Primitive Tokens (System level)** - \`var(--color-*)\`, \`var(--spacing-*)\`
- Define the actual values: \`--color-neutral-100\`, \`--spacing-4\`
- Referenced by semantic tokens

**Raw Values (Reference only)**
- Actual CSS values: \`#FFFFFF\`, \`16px\`, \`rgba(224, 13, 91, 0.29)\`
- Never used directly in components

## Usage

\`\`\`tsx
// Controlled
const [enabled, setEnabled] = useState(false);
<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
  ariaLabel="Enable notifications"
/>

// With label
<div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-12)" }}>
  <Label htmlFor="notifications">Enable notifications</Label>
  <Switch
    checked={enabled}
    onCheckedChange={setEnabled}
    ariaLabel="Enable notifications"
  />
</div>

// In settings context (like ModuleAccessTab)
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <div>
    <div style={{ fontSize: "var(--fonts-semantic-md)", fontWeight: "var(--font-weight-medium)" }}>
      Module Name
    </div>
    <div style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
      Module description
    </div>
  </div>
  <Switch
    checked={isEnabled}
    onCheckedChange={(v) => setIsEnabled(Boolean(v))}
    ariaLabel="Enable module"
  />
</div>
\`\`\`

## Accessibility

- Full keyboard navigation support (Space to toggle)
- Focus ring visible on keyboard focus
- **Required**: \`ariaLabel\` prop for all switches
- Checked state announced to screen readers
- Disabled state properly announced
- Use descriptive labels that indicate what the switch controls

## Design Tokens

### Key Tokens Used

- \`--semantic-background-base\`: Switch track background
- \`--semantic-background-interactive\`: Switch track when checked
- \`--semantic-text-primary\`: Switch thumb color
- \`--semantic-focus-ring\`: Focus indicator
- \`--semantic-border-subtle\`: Border color

**Note**: Always provide an \`ariaLabel\` for accessibility.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is checked",
    },
    onCheckedChange: {
      action: "checked changed",
      description: "Callback function called when the checked state changes",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility",
    },
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Size variant of the switch",
    },
    className: {
      control: false,
      description: "Additional CSS class name",
    },
  },
  args: {
    checked: false,
    disabled: false,
    ariaLabel: "Toggle switch",
    size: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args: SwitchProps) => <Switch {...args} />,
};

export const States: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-6-24px)", alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Unchecked
        </label>
        <Switch checked={false} ariaLabel="Unchecked switch" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Checked
        </label>
        <Switch checked={true} ariaLabel="Checked switch" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Disabled Unchecked
        </label>
        <Switch checked={false} disabled ariaLabel="Disabled unchecked switch" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Disabled Checked
        </label>
        <Switch checked={true} disabled ariaLabel="Disabled checked switch" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-6-24px)", alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Default Size
        </label>
        <Switch checked={true} size="default" ariaLabel="Default size switch" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Small Size
        </label>
        <Switch checked={true} size="sm" ariaLabel="Small size switch" />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  tags: ['!dev'],
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", alignItems: "flex-start" }}>
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          ariaLabel="Interactive switch"
        />
        <p style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Checked: {checked ? "Yes" : "No"}
        </p>
      </div>
    );
  },
};

export const WithLabel: Story = {
  tags: ['!dev'],
  render: () => {
    const [notifications, setNotifications] = useState(false);
    const [updates, setUpdates] = useState(true);
    const [marketing, setMarketing] = useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-16)" }}>
          <Label htmlFor="notifications">Email notifications</Label>
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            ariaLabel="Enable email notifications"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-16)" }}>
          <Label htmlFor="updates">Product updates</Label>
          <Switch
            checked={updates}
            onCheckedChange={setUpdates}
            ariaLabel="Enable product updates"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-16)" }}>
          <Label htmlFor="marketing">Marketing emails</Label>
          <Switch
            checked={marketing}
            onCheckedChange={setMarketing}
            ariaLabel="Enable marketing emails"
          />
        </div>
      </div>
    );
  },
};

export const InSettingsContext: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
  render: () => {
    const [monitorEnabled, setMonitorEnabled] = useState(true);
    const [tracerEnabled, setTracerEnabled] = useState(false);
    const [networkGraphEnabled, setNetworkGraphEnabled] = useState(true);

    const settings = [
      {
        id: "monitor",
        name: "Monitor",
        description: "Real-time monitoring and alerts",
        enabled: monitorEnabled,
        onChange: setMonitorEnabled,
      },
      {
        id: "tracer",
        name: "Tracer",
        description: "Request tracing and debugging",
        enabled: tracerEnabled,
        onChange: setTracerEnabled,
      },
      {
        id: "network_graph",
        name: "Network Graph",
        description: "Network visualization and analysis",
        enabled: networkGraphEnabled,
        onChange: setNetworkGraphEnabled,
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
        {settings.map((setting) => (
          <div
            key={setting.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "var(--spacing-12)",
              border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ paddingRight: "var(--spacing-16)", flex: 1 }}>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--semantic-text-primary)",
                  marginBottom: "var(--spacing-style-spacing-4px-0-5-2px)",
                }}
              >
                {setting.name}
              </div>
              <div
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                {setting.description}
              </div>
            </div>
            <Switch
              checked={setting.enabled}
              onCheckedChange={(v) => setting.onChange(Boolean(v))}
              ariaLabel={`Enable ${setting.name} module`}
            />
          </div>
        ))}
      </div>
    );
  },
};

