// src/components/atoms/Input/Input.stories.tsx
// Form input stories using native HTML elements styled with ARKEM tokens
// Following Radix UI accessibility patterns

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Search, Mail, Lock, User, Check, Eye, EyeOff, X } from "lucide-react";
import { Label } from "../Label/Label";

const meta: Meta = {
  title: "Atoms/Input",
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Form input fields using native HTML elements styled with ARKEM Design System tokens.

## Approach

These stories demonstrate form inputs using native HTML \`<input>\` and \`<textarea>\` elements styled with ARKEM tokens, following Radix UI accessibility patterns:

- **Native HTML elements**: Use standard \`<input>\` and \`<textarea>\` for maximum compatibility
- **ARKEM tokens**: All styling uses semantic design tokens
- **Accessibility**: Proper label association, ARIA attributes, and keyboard navigation
- **Label component**: Uses the ARKEM Label component for consistent styling

## Token Usage

All inputs use ARKEM semantic tokens:
- Colors: \`var(--semantic-text-primary)\`, \`var(--semantic-background-base)\`, \`var(--semantic-border-subtle)\`
- Typography: \`var(--fonts-semantic-sm/md/lg)\` based on size
- Spacing: \`var(--spacing-8)\`, \`var(--spacing-12)\` for padding
- Focus: \`var(--semantic-focus-ring)\` for focus indicators
- States: \`var(--semantic-feedback-error-base)\`, \`var(--semantic-feedback-success-base)\`

## Accessibility

- Proper label association via \`htmlFor\` and \`id\`
- ARIA labels for inputs without visible labels
- Error states announced to screen readers
- Keyboard navigation support
- Focus indicators visible`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// Base input styles using ARKEM tokens
const inputBaseStyles: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "var(--font-family-base)",
  fontSize: "var(--fonts-semantic-md)",
  fontWeight: "var(--font-weight-regular)",
  lineHeight: "var(--fonts-semantic-md-line-height)",
  color: "var(--semantic-text-primary)",
  background: "var(--semantic-background-base)",
  border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
  borderRadius: "var(--radius-md)",
  padding: "var(--spacing-8)",
  outline: "none",
  transition: "border-color var(--transition-base), box-shadow var(--transition-base), background-color var(--transition-base), font-weight var(--transition-base)",
};

const inputHoverStyles: React.CSSProperties = {
  borderColor: "var(--semantic-border-strong)",
  background: "var(--semantic-background-muted)",
  fontWeight: "var(--font-weight-medium)",
};

const inputFocusStyles: React.CSSProperties = {
  borderColor: "var(--semantic-brand-base)",
  boxShadow: "0 0 0 3px var(--semantic-focus-ring)",
  background: "var(--semantic-background-muted)",
  fontWeight: "var(--font-weight-medium)",
};

const inputErrorStyles: React.CSSProperties = {
  borderColor: "var(--semantic-feedback-error-base)",
};

const inputSuccessStyles: React.CSSProperties = {
  borderColor: "var(--semantic-feedback-success-base)",
};

const inputDisabledStyles: React.CSSProperties = {
  opacity: 0.5,
  cursor: "not-allowed",
  background: "var(--semantic-background-muted)",
};

// Helper function to reset input styles to base
const resetInputStyles = (element: HTMLInputElement | HTMLTextAreaElement) => {
  element.style.borderColor = "var(--semantic-border-subtle)";
  element.style.boxShadow = "";
  element.style.background = inputBaseStyles.background as string;
  element.style.fontWeight = inputBaseStyles.fontWeight as string;
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to experiment with input properties. Use the Controls panel to customize the input.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <input
          type="text"
          placeholder="Enter text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={inputBaseStyles}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, inputHoverStyles)}
          onMouseLeave={(e) => {
            if (document.activeElement !== e.currentTarget) {
              e.currentTarget.style.borderColor = "var(--semantic-border-subtle)";
              e.currentTarget.style.background = inputBaseStyles.background as string;
              e.currentTarget.style.fontWeight = inputBaseStyles.fontWeight as string;
            }
          }}
          onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
          onBlur={(e) => resetInputStyles(e.currentTarget)}
        />
      </div>
    );
  },
};

export const Default: Story = {
  tags: ['!dev'],
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <input
          type="text"
          placeholder="Enter text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={inputBaseStyles}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, inputHoverStyles)}
          onMouseLeave={(e) => {
            if (document.activeElement !== e.currentTarget) {
              e.currentTarget.style.borderColor = "var(--semantic-border-subtle)";
              e.currentTarget.style.background = inputBaseStyles.background as string;
              e.currentTarget.style.fontWeight = inputBaseStyles.fontWeight as string;
            }
          }}
          onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
          onBlur={(e) => resetInputStyles(e.currentTarget)}
        />
      </div>
    );
  },
};

export const WithLabel: Story = {
  tags: ['!dev'],
  render: () => {
    const [email, setEmail] = useState("");
    return (
      <div style={{ width: "300px", display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <Label htmlFor="email-input">Email Address</Label>
        <input
          id="email-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputBaseStyles}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, inputHoverStyles)}
          onMouseLeave={(e) => {
            if (document.activeElement !== e.currentTarget) {
              e.currentTarget.style.borderColor = "var(--semantic-border-subtle)";
              e.currentTarget.style.background = inputBaseStyles.background as string;
              e.currentTarget.style.fontWeight = inputBaseStyles.fontWeight as string;
            }
          }}
          onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
          onBlur={(e) => resetInputStyles(e.currentTarget)}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  tags: ['!dev'],
  render: () => {
    const [smValue, setSmValue] = useState("");
    const [mdValue, setMdValue] = useState("");
    const [lgValue, setLgValue] = useState("");
    
    const smStyles = { ...inputBaseStyles, height: "32px", fontSize: "var(--fonts-semantic-sm)", padding: "var(--spacing-style-spacing-4px-1-5-6px)" };
    const mdStyles = { ...inputBaseStyles, height: "40px", fontSize: "var(--fonts-semantic-md)", padding: "var(--spacing-8)" };
    const lgStyles = { ...inputBaseStyles, height: "48px", fontSize: "var(--fonts-semantic-lg)", padding: "var(--spacing-style-spacing-4px-3-12px)" };
    
    return (
      <div style={{ width: "300px", display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)" }}>
        <div>
          <Label htmlFor="input-sm">Small (32px)</Label>
          <input
            id="input-sm"
            type="text"
            placeholder="Small input"
            value={smValue}
            onChange={(e) => setSmValue(e.target.value)}
            style={smStyles}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
        <div>
          <Label htmlFor="input-md">Medium (40px)</Label>
          <input
            id="input-md"
            type="text"
            placeholder="Medium input"
            value={mdValue}
            onChange={(e) => setMdValue(e.target.value)}
            style={mdStyles}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
        <div>
          <Label htmlFor="input-lg">Large (48px)</Label>
          <input
            id="input-lg"
            type="text"
            placeholder="Large input"
            value={lgValue}
            onChange={(e) => setLgValue(e.target.value)}
            style={lgStyles}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
      </div>
    );
  },
};

export const States: Story = {
  tags: ['!dev'],
  render: () => {
    const [defaultValue, setDefaultValue] = useState("");
    const [errorValue, setErrorValue] = useState("Invalid input");
    const [successValue, setSuccessValue] = useState("Valid input");
    const disabledValue = "Disabled value";
    
    return (
      <div style={{ width: "300px", display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)" }}>
        <div>
          <Label htmlFor="input-default">Default</Label>
          <input
            id="input-default"
            type="text"
            placeholder="Enter text..."
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
            style={inputBaseStyles}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
        <div>
          <Label htmlFor="input-error">Error</Label>
          <input
            id="input-error"
            type="text"
            placeholder="Enter text..."
            value={errorValue}
            onChange={(e) => setErrorValue(e.target.value)}
            style={{ ...inputBaseStyles, ...inputErrorStyles }}
            aria-invalid="true"
            aria-describedby="error-message"
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--semantic-feedback-error-base) 30%, transparent)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "";
            }}
          />
          <p
            id="error-message"
            style={{
              fontSize: "var(--fonts-semantic-xs)",
              color: "var(--semantic-feedback-error-base)",
              marginTop: "var(--spacing-4)",
              marginBottom: 0,
            }}
          >
            This field has an error
          </p>
        </div>
        <div>
          <Label htmlFor="input-success">Success</Label>
          <input
            id="input-success"
            type="text"
            placeholder="Enter text..."
            value={successValue}
            onChange={(e) => setSuccessValue(e.target.value)}
            style={{ ...inputBaseStyles, ...inputSuccessStyles }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--semantic-feedback-success-base) 30%, transparent)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "";
            }}
          />
        </div>
        <div>
          <Label htmlFor="input-disabled">Disabled</Label>
          <input
            id="input-disabled"
            type="text"
            placeholder="Disabled input"
            value={disabledValue}
            disabled
            style={{ ...inputBaseStyles, ...inputDisabledStyles }}
          />
        </div>
      </div>
    );
  },
};

export const InputTypes: Story = {
  tags: ['!dev'],
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tel, setTel] = useState("");
    const [url, setUrl] = useState("");
    const [number, setNumber] = useState("");
    
    return (
      <div style={{ width: "300px", display: "flex", flexDirection: "column", gap: "var(--spacing-style-spacing-4px-4-16px)" }}>
        <div>
          <Label htmlFor="input-email">Email</Label>
          <input
            id="input-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputBaseStyles}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
        <div>
          <Label htmlFor="input-password">Password</Label>
          <input
            id="input-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputBaseStyles}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
        <div>
          <Label htmlFor="input-tel">Phone Number</Label>
          <input
            id="input-tel"
            type="tel"
            placeholder="Enter your phone number"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            style={inputBaseStyles}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
        <div>
          <Label htmlFor="input-url">Website URL</Label>
          <input
            id="input-url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={inputBaseStyles}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
        <div>
          <Label htmlFor="input-number">Number</Label>
          <input
            id="input-number"
            type="number"
            placeholder="Enter a number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            style={inputBaseStyles}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
      </div>
    );
  },
};

export const Textarea: Story = {
  tags: ['!dev'],
  render: () => {
    const [value, setValue] = useState("");
    const textareaStyles: React.CSSProperties = {
      ...inputBaseStyles,
      minHeight: "120px",
      resize: "vertical",
      paddingTop: "var(--spacing-8)",
      paddingBottom: "var(--spacing-8)",
      lineHeight: "var(--fonts-semantic-md-line-height)",
    };
    
    return (
      <div style={{ width: "300px", display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        <Label htmlFor="textarea-input">Description</Label>
        <textarea
          id="textarea-input"
          placeholder="Enter description..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={6}
          style={textareaStyles}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, inputHoverStyles)}
          onMouseLeave={(e) => {
            if (document.activeElement !== e.currentTarget) {
              e.currentTarget.style.borderColor = "var(--semantic-border-subtle)";
              e.currentTarget.style.background = inputBaseStyles.background as string;
              e.currentTarget.style.fontWeight = inputBaseStyles.fontWeight as string;
            }
          }}
          onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
          onBlur={(e) => resetInputStyles(e.currentTarget)}
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Complete form example using native HTML form elements styled with ARKEM tokens. Demonstrates proper form structure, label association, and validation states.",
      },
    },
  },
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      bio: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    
    const handleChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };
    
    return (
      <form
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-16)",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const newErrors: Record<string, string> = {};
          if (!formData.email.includes("@")) {
            newErrors.email = "Please enter a valid email address";
          }
          if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
          }
          setErrors(newErrors);
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          <Label htmlFor="form-name">Full Name</Label>
          <input
            id="form-name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            style={inputBaseStyles}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          <Label htmlFor="form-email">Email</Label>
          <input
            id="form-email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            style={{
              ...inputBaseStyles,
              ...(errors.email ? inputErrorStyles : {}),
            }}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            onFocus={(e) => {
              if (errors.email) {
                e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--semantic-feedback-error-base) 30%, transparent)";
              } else {
                Object.assign(e.currentTarget.style, inputFocusStyles);
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "";
              if (!errors.email) {
                resetInputStyles(e.currentTarget);
              }
            }}
          />
          {errors.email && (
            <p
              id="email-error"
              style={{
                fontSize: "var(--fonts-semantic-xs)",
                color: "var(--semantic-feedback-error-base)",
                margin: 0,
              }}
            >
              {errors.email}
            </p>
          )}
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          <Label htmlFor="form-password">Password</Label>
          <div style={{ position: "relative" }}>
            <input
              id="form-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              style={{
                ...inputBaseStyles,
                paddingRight: "var(--spacing-40)",
                ...(errors.password ? inputErrorStyles : {}),
              }}
              aria-invalid={errors.password ? "true" : undefined}
              aria-describedby={errors.password ? "password-error" : undefined}
              onFocus={(e) => {
                if (errors.password) {
                  e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--semantic-feedback-error-base) 30%, transparent)";
                } else {
                  Object.assign(e.currentTarget.style, inputFocusStyles);
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "";
                if (!errors.password) {
                  resetInputStyles(e.currentTarget);
                }
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "var(--spacing-8)",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                color: "var(--semantic-text-secondary)",
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p
            style={{
              fontSize: "var(--fonts-semantic-xs)",
              color: "var(--semantic-text-secondary)",
              margin: 0,
            }}
          >
            Must be at least 8 characters
          </p>
          {errors.password && (
            <p
              id="password-error"
              style={{
                fontSize: "var(--fonts-semantic-xs)",
                color: "var(--semantic-feedback-error-base)",
                margin: 0,
              }}
            >
              {errors.password}
            </p>
          )}
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Label htmlFor="form-bio">Bio</Label>
            <span
              style={{
                fontSize: "var(--fonts-semantic-xs)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              {formData.bio.length}/200
            </span>
          </div>
          <textarea
            id="form-bio"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={6}
            maxLength={200}
            style={{
              ...inputBaseStyles,
              minHeight: "120px",
              resize: "vertical",
              paddingTop: "var(--spacing-8)",
              paddingBottom: "var(--spacing-8)",
              lineHeight: "var(--fonts-semantic-md-line-height)",
            }}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyles)}
            onBlur={(e) => resetInputStyles(e.currentTarget)}
          />
        </div>
        
        <div style={{ display: "flex", gap: "var(--spacing-12)", marginTop: "var(--spacing-8)" }}>
          <button
            type="button"
            style={{
              flex: 1,
              padding: "var(--spacing-8) var(--spacing-16)",
              fontSize: "var(--fonts-semantic-md)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--semantic-text-primary)",
              background: "var(--semantic-background-muted)",
              border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "var(--spacing-8) var(--spacing-16)",
              fontSize: "var(--fonts-semantic-md)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--semantic-text-inverse)",
              background: "var(--semantic-brand-base)",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </div>
      </form>
    );
  },
};

