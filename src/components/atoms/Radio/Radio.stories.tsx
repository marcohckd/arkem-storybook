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

