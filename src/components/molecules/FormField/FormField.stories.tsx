import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FormField } from "./FormField";
import { Search } from "lucide-react";
import { Button } from "../../atoms/Button/Button";
import { Card, CardHeader, CardBody, CardFooter } from "../Card";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `FormField molecule that composes Label + Input + Error message + Character count.

## Features

- Composes Label and Input atoms
- Error message display
- Character count display
- Help text support
- Token-based styling

## Usage

\`\`\`tsx
<FormField
  label="Email"
  placeholder="Enter your email"
  error="Invalid email address"
  helpText="We'll never share your email"
/>
\`\`\``,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: "Invalid email address",
  },
};

export const WithHelpText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    helpText: "Must be at least 8 characters",
    type: "password",
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description",
    maxLength: 100,
    showCharacterCount: true,
    multiline: true,
    rows: 4,
  },
};

export const WithIcon: Story = {
  tags: ['!dev'],
  args: {
    label: "Search",
    placeholder: "Search...",
    iconLeading: <Search size={16} />,
  },
};

export const FormComposition: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Example showing multiple FormField components working together in a complete form. Demonstrates proper form composition patterns.",
      },
    },
  },
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      description: "",
    });
    
    return (
      <div style={{ maxWidth: "400px" }}>
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0, fontSize: "var(--fonts-semantic-lg)", fontWeight: "var(--font-weight-semibold)" }}>
              Create Account
            </h3>
          </CardHeader>
          <CardBody>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)" }}>
              <FormField
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <FormField
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={formData.email && !formData.email.includes("@") ? "Please enter a valid email" : undefined}
              />
              <FormField
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={formData.password && formData.password.length < 8 ? "Password must be at least 8 characters" : undefined}
                helpText="Must be at least 8 characters"
              />
              <FormField
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={formData.confirmPassword && formData.password !== formData.confirmPassword ? "Passwords do not match" : undefined}
              />
              <FormField
                label="Bio"
                placeholder="Tell us about yourself"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                maxLength={200}
                showCharacterCount
              />
            </div>
          </CardBody>
          <CardFooter>
            <div style={{ display: "flex", gap: "var(--spacing-8)", justifyContent: "flex-end" }}>
              <Button size="sm" hierarchy="secondary" tone="grey">Cancel</Button>
              <Button size="sm" hierarchy="secondary" tone="color">Create Account</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  },
};

