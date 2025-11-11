import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "./Radio";
import { Label } from "../Label/Label";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Radio button component for form inputs and selections.

## Features

- Custom styled radio button
- Full keyboard accessibility
- Focus ring for accessibility
- Hover and disabled states
- Uses semantic tokens only`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the radio button is checked",
    },
    onCheckedChange: {
      action: "checked changed",
      description: "Callback function called when the checked state changes",
    },
    name: {
      control: "text",
      description: "Name attribute for grouping radio buttons",
    },
    value: {
      control: "text",
      description: "Value attribute for the radio button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio button is disabled",
    },
    className: {
      control: false,
      description: "Additional CSS class name",
    },
    "aria-label": {
      control: "text",
      description: "ARIA label for accessibility",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState("option1");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
          <Radio
            checked={selected === "option1"}
            onCheckedChange={() => setSelected("option1")}
            name="group1"
            value="option1"
          />
          <span>Option 1</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
          <Radio
            checked={selected === "option2"}
            onCheckedChange={() => setSelected("option2")}
            name="group1"
            value="option2"
          />
          <span>Option 2</span>
        </label>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
        <Radio checked={false} />
        <span>Unchecked</span>
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
        <Radio checked={true} />
        <span>Checked</span>
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
        <Radio checked={false} disabled />
        <span>Disabled</span>
      </label>
    </div>
  ),
};

