import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchBox } from "./SearchBox";

const meta: Meta<typeof SearchBox> = {
  title: "Molecules/SearchBox",
  component: SearchBox,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `SearchBox molecule that composes Input + Search Icon + Clear button.

## Features

- Search icon on the left
- Clear button appears when there's text
- Token-based styling
- Full accessibility support`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant of the search box",
    },
    value: {
      control: "text",
      description: "Current value of the search box (controlled)",
    },
    onChange: {
      action: "value changed",
      description: "Callback function called when the value changes",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text displayed when search box is empty",
    },
    disabled: {
      control: "boolean",
      description: "Whether the search box is disabled",
    },
    onClear: {
      action: "cleared",
      description: "Callback function called when the clear button is clicked",
    },
    className: {
      control: false,
      description: "Additional CSS class name",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <SearchBox
          value={value}
          onChange={setValue}
          placeholder="Search..."
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", width: "300px" }}>
        <SearchBox value={value1} onChange={setValue1} size="sm" />
        <SearchBox value={value2} onChange={setValue2} size="md" />
        <SearchBox value={value3} onChange={setValue3} size="lg" />
      </div>
    );
  },
};

