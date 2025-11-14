import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "./index";
import { Button } from "../../atoms/Button/Button";
import { FormField } from "../FormField/FormField";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../organisms/Table";

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
  argTypes: {
    children: {
      control: false,
      description: "Card content, typically CardHeader, CardBody, and/or CardFooter components",
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
    },
  },
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
          <h3 style={{ margin: "var(--spacing-0)", fontSize: "var(--fonts-semantic-md)", fontWeight: "var(--font-weight-semibold)" }}>
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
  tags: ['!dev'],
  render: () => (
    <div style={{ width: "400px" }}>
      <Card>
        <CardHeader>
          <h3 style={{ margin: "var(--spacing-0)", fontSize: "var(--fonts-semantic-md)", fontWeight: "var(--font-weight-semibold)" }}>
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

export const EmptyState: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story: "Empty state example showing how to handle cards with no content. Provides a user-friendly message when content is unavailable.",
      },
    },
  },
  render: () => (
    <div style={{ width: "400px" }}>
      <Card>
        <CardHeader>
          <h3 style={{ margin: "var(--spacing-0)", fontSize: "var(--fonts-semantic-md)", fontWeight: "var(--font-weight-semibold)" }}>
            Empty Card
          </h3>
        </CardHeader>
        <CardBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--spacing-24)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
                margin: "0 0 var(--spacing-8) 0",
              }}
            >
              No content available
            </p>
            <p
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-muted)",
                margin: "var(--spacing-0)",
              }}
            >
              This card is currently empty.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  ),
};

export const WithForm: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story: "Card containing a form with multiple FormField components. Demonstrates how Card can be used as a container for form content.",
      },
    },
  },
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    
    return (
      <div style={{ width: "400px" }}>
        <Card>
          <CardHeader>
            <h3 style={{ margin: "var(--spacing-0)", fontSize: "var(--fonts-semantic-md)", fontWeight: "var(--font-weight-semibold)" }}>
              User Registration
            </h3>
          </CardHeader>
          <CardBody>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)" }}>
              <FormField
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormField
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormField
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={password.length > 0 && password.length < 8 ? "Password must be at least 8 characters" : undefined}
                helpText="Must be at least 8 characters"
              />
            </div>
          </CardBody>
          <CardFooter>
            <div style={{ display: "flex", gap: "var(--spacing-8)", justifyContent: "flex-end" }}>
              <Button size="sm" hierarchy="secondary" tone="grey">Cancel</Button>
              <Button size="sm" hierarchy="secondary" tone="color">Register</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  },
};

export const WithTable: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Card containing a table. Demonstrates how Card can be used as a container for tabular data.",
      },
    },
  },
  render: () => {
    const tableData = [
      { id: "1", name: "John Doe", role: "Admin", email: "john@example.com" },
      { id: "2", name: "Jane Smith", role: "User", email: "jane@example.com" },
      { id: "3", name: "Bob Johnson", role: "User", email: "bob@example.com" },
    ];
    
    return (
      <>
        <style>{`
          .arkem-card__header--no-padding {
            padding: var(--spacing-0) !important;
          }
          .arkem-card__body--no-padding {
            padding: var(--spacing-0) !important;
          }
        `}</style>
        <div style={{ width: "600px" }}>
          <Card>
            <CardHeader className="arkem-card__header--no-padding">
              <h3
                style={{
                  margin: "var(--spacing-0)",
                  padding: "var(--spacing-16)",
                  fontSize: "var(--fonts-semantic-md)",
                  lineHeight: "var(--fonts-semantic-lg-line-height)",
                  fontWeight: "var(--font-weight-semibold)",
                  fontFamily: "var(--font-family-base)",
                  color: "var(--semantic-text-primary)",
                }}
              >
                Team Members
              </h3>
            </CardHeader>
            <CardBody className="arkem-card__body--no-padding">
              <Table ariaLabel="Team members table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={row.id} isEven={index % 2 === 0}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </>
    );
  },
};

