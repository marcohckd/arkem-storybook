import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./index";
import { Button } from "../../atoms/Button/Button";

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Card molecule component with header, body, and footer slots.

## Features

- Flexible composition with header, body, footer
- Token-based styling
- Semantic structure`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Card>
        <CardBody>
          <p>Card content goes here</p>
        </CardBody>
      </Card>
    </div>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Card>
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: "var(--fonts-semantic-lg)", fontWeight: "var(--font-weight-semibold)" }}>
            Card Title
          </h3>
        </CardHeader>
        <CardBody>
          <p>Card content goes here</p>
        </CardBody>
      </Card>
    </div>
  ),
};

export const Complete: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Card>
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: "var(--fonts-semantic-lg)", fontWeight: "var(--font-weight-semibold)" }}>
            Card Title
          </h3>
        </CardHeader>
        <CardBody>
          <p>Card content goes here. This is the main body of the card.</p>
        </CardBody>
        <CardFooter>
          <div style={{ display: "flex", gap: "var(--spacing-8)", justifyContent: "flex-end" }}>
            <Button size="sm" hierarchy="secondary" tone="grey">Cancel</Button>
            <Button size="sm" hierarchy="secondary" tone="color">Save</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  ),
};

