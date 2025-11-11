import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider, type SliderProps } from "./Slider";
import { Label } from "../Label/Label";

const meta: Meta<typeof Slider> = {
  title: "Atoms/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `A range slider component for selecting numeric values, built with Radix UI primitives.

## Features

- Range slider with two thumbs (min and max values)
- Controlled and uncontrolled modes
- Customizable min, max, and step values
- Full keyboard accessibility (Arrow keys to adjust)
- Focus ring for accessibility
- Disabled state support
- Uses semantic tokens only

## Token Hierarchy

Tokens follow a three-tier hierarchy:

**Semantic Tokens (Usage level)** - \`var(--semantic-*)\`
- Describe the purpose: \`--semantic-text-primary\`, \`--semantic-background-base\`
- Should always be used in components

**Primitive Tokens (System level)** - \`var(--color-*)\`, \`var(--spacing-*)\`
- Define the actual values: \`--color-neutral-100\`, \`--spacing-4\`
- Referenced by semantic tokens

**Raw Values (Reference only)\`
- Actual CSS values: \`#FFFFFF\`, \`16px\`, \`rgba(224, 13, 91, 0.29)\`
- Never used directly in components

## Usage

\`\`\`tsx
// Controlled
const [value, setValue] = useState([25, 75]);
<Slider
  value={value}
  onValueChange={setValue}
  min={0}
  max={100}
  step={1}
  ariaLabel="Select range"
/>

// Uncontrolled
<Slider
  defaultValue={[20, 80]}
  min={0}
  max={100}
  step={5}
  ariaLabel="Select range"
/>

// With label and value display (like LimitsTab)
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
  <Label>Storage Limit (GB)</Label>
  <div style={{ fontSize: "var(--fonts-semantic-md)", color: "var(--semantic-text-secondary)" }}>
    {value[0]} - {value[1]} GB
  </div>
  <Slider
    value={value}
    onValueChange={setValue}
    min={0}
    max={1000}
    step={10}
    ariaLabel="Storage limit"
  />
</div>
\`\`\`

## Accessibility

- Full keyboard navigation support (Arrow keys to adjust values)
- Focus ring visible on keyboard focus
- **Required**: \`ariaLabel\` prop for all sliders
- Value changes announced to screen readers
- Disabled state properly announced
- Two thumbs have separate ARIA labels (minimum and maximum)

## Design Tokens

### Key Tokens Used

- \`--semantic-background-base\`: Slider track background
- \`--semantic-background-interactive\`: Slider range (selected area)
- \`--semantic-text-primary\`: Slider thumb color
- \`--semantic-focus-ring\`: Focus indicator
- \`--semantic-border-subtle\`: Border color

**Note**: Always provide an \`ariaLabel\` for accessibility.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "object",
      description: "Controlled value of the slider (array with [min, max])",
    },
    defaultValue: {
      control: "object",
      description: "Default value for uncontrolled slider (array with [min, max])",
    },
    onValueChange: {
      action: "value changed",
      description: "Callback function called when the value changes",
    },
    onValueCommit: {
      action: "value committed",
      description: "Callback function called when the user commits the value (e.g., on mouse up)",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    step: {
      control: "number",
      description: "Step increment",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility",
    },
    className: {
      control: false,
      description: "Additional CSS class name",
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [25, 75],
    disabled: false,
    ariaLabel: "Select range",
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args: SliderProps) => <Slider {...args} />,
};

export const States: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-6-24px)", alignItems: "flex-start", width: "300px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", width: "100%" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Default (25-75)
        </label>
        <Slider defaultValue={[25, 75]} min={0} max={100} ariaLabel="Default range" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", width: "100%" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Disabled
        </label>
        <Slider defaultValue={[30, 70]} min={0} max={100} disabled ariaLabel="Disabled range" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", width: "100%" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Full Range (0-100)
        </label>
        <Slider defaultValue={[0, 100]} min={0} max={100} ariaLabel="Full range" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", width: "100%" }}>
        <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Narrow Range (40-60)
        </label>
        <Slider defaultValue={[40, 60]} min={0} max={100} ariaLabel="Narrow range" />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  tags: ['!dev'],
  render: () => {
    const [value, setValue] = useState([25, 75]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)", alignItems: "flex-start", width: "300px" }}>
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={1}
          ariaLabel="Interactive range"
        />
        <p style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
          Range: {value[0]} - {value[1]}
        </p>
      </div>
    );
  },
};

export const WithLabel: Story = {
  tags: ['!dev'],
  render: () => {
    const [queryLimit, setQueryLimit] = useState([10000]);
    const [storageLimit, setStorageLimit] = useState([100]);
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", width: "300px" }}>
        <div
          style={{
            padding: "var(--spacing-16)",
            borderRadius: "var(--radius-md)",
            border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-8)",
          }}
        >
          <Label>Query Limit per Time Window</Label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "var(--fonts-semantic-md)",
              color: "var(--semantic-text-secondary)",
            }}
          >
            <span>{queryLimit[0].toLocaleString()}</span>
          </div>
          <Slider
            value={queryLimit}
            onValueChange={(v) => setQueryLimit(v)}
            min={0}
            max={50000}
            step={500}
            ariaLabel="Query limit"
          />
        </div>

        <div
          style={{
            padding: "var(--spacing-16)",
            borderRadius: "var(--radius-md)",
            border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-8)",
          }}
        >
          <Label>Storage Limit (GB)</Label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "var(--fonts-semantic-md)",
              color: "var(--semantic-text-secondary)",
            }}
          >
            <span>{storageLimit[0]} GB</span>
          </div>
          <Slider
            value={storageLimit}
            onValueChange={(v) => setStorageLimit(v)}
            min={0}
            max={1000}
            step={10}
            ariaLabel="Storage limit"
          />
        </div>
      </div>
    );
  },
};

export const CustomRange: Story = {
  tags: ['!dev'],
  render: () => {
    const [percentage, setPercentage] = useState([20, 80]);
    const [temperature, setTemperature] = useState([18, 24]);
    const [priceRange, setPriceRange] = useState([50, 200]);
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", width: "300px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          <Label>Percentage Range (0-100%)</Label>
          <div style={{ fontSize: "var(--fonts-semantic-md)", color: "var(--semantic-text-secondary)" }}>
            {percentage[0]}% - {percentage[1]}%
          </div>
          <Slider
            value={percentage}
            onValueChange={setPercentage}
            min={0}
            max={100}
            step={1}
            ariaLabel="Percentage range"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          <Label>Temperature Range (°C)</Label>
          <div style={{ fontSize: "var(--fonts-semantic-md)", color: "var(--semantic-text-secondary)" }}>
            {temperature[0]}°C - {temperature[1]}°C
          </div>
          <Slider
            value={temperature}
            onValueChange={setTemperature}
            min={-10}
            max={40}
            step={1}
            ariaLabel="Temperature range"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          <Label>Price Range ($)</Label>
          <div style={{ fontSize: "var(--fonts-semantic-md)", color: "var(--semantic-text-secondary)" }}>
            ${priceRange[0]} - ${priceRange[1]}
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={500}
            step={10}
            ariaLabel="Price range"
          />
        </div>
      </div>
    );
  },
};

export const DifferentSteps: Story = {
  tags: ['!dev'],
  render: () => {
    const [step1, setStep1] = useState([25, 75]);
    const [step5, setStep5] = useState([20, 80]);
    const [step10, setStep10] = useState([30, 70]);
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-6-24px)", alignItems: "flex-start", width: "300px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", width: "100%" }}>
          <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
            Step: 1 (Smooth)
          </label>
          <Slider
            value={step1}
            onValueChange={setStep1}
            min={0}
            max={100}
            step={1}
            ariaLabel="Step 1 range"
          />
          <div style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
            {step1[0]} - {step1[1]}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", width: "100%" }}>
          <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
            Step: 5 (Coarse)
          </label>
          <Slider
            value={step5}
            onValueChange={setStep5}
            min={0}
            max={100}
            step={5}
            ariaLabel="Step 5 range"
          />
          <div style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
            {step5[0]} - {step5[1]}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", width: "100%" }}>
          <label style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
            Step: 10 (Very Coarse)
          </label>
          <Slider
            value={step10}
            onValueChange={setStep10}
            min={0}
            max={100}
            step={10}
            ariaLabel="Step 10 range"
          />
          <div style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
            {step10[0]} - {step10[1]}
          </div>
        </div>
      </div>
    );
  },
};

export const AccessibilityExample: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story: `This example demonstrates proper accessibility practices:

1. **ARIA Labels**: The \`ariaLabel\` prop provides context for screen readers
2. **Value Display**: Current values are displayed and updated in real-time
3. **Keyboard Navigation**: Use Arrow keys to adjust values
4. **Focus Management**: Focus ring visible on keyboard focus
5. **Screen Reader Support**: Value changes are announced

**Best Practices:**
- Always provide an \`ariaLabel\` that describes what the slider controls
- Display current values for better UX
- Use appropriate min/max/step values for your use case
- Consider using \`onValueCommit\` for expensive operations (only commit on mouse up)`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState([30, 70]);
    const [committedValue, setCommittedValue] = useState([30, 70]);
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", width: "300px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          <Label>Accessible Range Slider</Label>
          <div style={{ fontSize: "var(--fonts-semantic-md)", color: "var(--semantic-text-secondary)" }}>
            Current: {value[0]} - {value[1]}
          </div>
          <div style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
            Committed: {committedValue[0]} - {committedValue[1]}
          </div>
          <Slider
            value={value}
            onValueChange={setValue}
            onValueCommit={setCommittedValue}
            min={0}
            max={100}
            step={1}
            ariaLabel="Select value range"
          />
          <p style={{ fontSize: "var(--fonts-semantic-sm)", color: "var(--semantic-text-secondary)" }}>
            Use Arrow keys to adjust. Current value updates as you drag, committed value updates on release.
          </p>
        </div>
      </div>
    );
  },
};

