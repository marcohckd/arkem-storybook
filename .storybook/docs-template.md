# Component Documentation Template

Use this template when adding documentation to component story files.

## Component-Level Documentation

Add to `meta.parameters.docs.description.component`:

```typescript
const meta: Meta<typeof ComponentName> = {
  title: "Components/ComponentName",
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: `Brief description of the component's purpose and primary use case.


## Overview

[Optional: More detailed overview if component needs explanation]


## Features

- Feature 1: Description
- Feature 2: Description
- Feature 3: Description


## Variants/Sizes/States

[If applicable, describe variants, sizes, or states]
- **Variant 1**: Description
- **Variant 2**: Description


## Typography & Colors

- **Font**: \`var(--font-family-base)\` (IBM Plex Sans)
- **Font Size**: \`var(--fonts-semantic-sm/md/lg)\` based on size
- **Font Weight**: \`var(--font-weight-regular/medium/semibold)\`
- **Text Color**: \`var(--semantic-text-primary/secondary/muted)\`
- **Background**: \`var(--semantic-background-base/raised/interactive)\`
- **Border**: \`var(--semantic-border-subtle/muted/strong)\`


## Usage

\`\`\`tsx
// Basic usage
<ComponentName prop="value" />

// Advanced usage
<ComponentName 
  prop1="value1"
  prop2="value2"
  prop3={handler}
/>
\`\`\`


## Accessibility

- ARIA attributes: [list relevant ARIA attributes]
- Keyboard navigation: [describe keyboard support]
- Focus management: [describe focus behavior]
- Screen reader: [describe screen reader support]


## Design Tokens

Key tokens used:
- \`--semantic-text-*\`: Text colors
- \`--semantic-background-*\`: Background colors
- \`--semantic-border-*\`: Border colors
- \`--spacing-*\`: Spacing values
- \`--radius-*\`: Border radius values
- \`--fonts-semantic-*\`: Typography scale`,
      },
    },
  },
  tags: ["autodocs"], // Enable auto-generated docs
};
```

## Story-Level Documentation

Add to individual story `parameters.docs.description.story`:

```typescript
export const StoryName: Story = {
  parameters: {
    docs: {
      description: {
        story: "Brief description of what this story demonstrates and why it's useful.",
      },
    },
  },
  // ... story args and render
};
```

## ArgTypes Documentation

Add descriptions to `argTypes`:

```typescript
argTypes: {
  propName: {
    control: "radio", // or "text", "boolean", "select", etc.
    options: ["option1", "option2"],
    description: "Clear description of what this prop does and when to use it",
  },
  // ... more argTypes
},
```

## Complete Example

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./ComponentName";

const meta: Meta<typeof ComponentName> = {
  title: "Components/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Brief description of the component.


## Features

- Feature 1
- Feature 2


## Usage

\`\`\`tsx
<ComponentName prop="value" />
\`\`\``,
      },
    },
  },
  argTypes: {
    prop: {
      control: "text",
      description: "Description of prop",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    prop: "value",
  },
  parameters: {
    docs: {
      description: {
        story: "Default state of the component.",
      },
    },
  },
};
```

## Documentation Checklist

- [ ] Component-level description added
- [ ] Features list included
- [ ] Typography & Colors section (if applicable)
- [ ] Usage code example(s)
- [ ] Accessibility section
- [ ] Design tokens listed
- [ ] Story-level descriptions for key stories
- [ ] ArgTypes have descriptions
- [ ] `tags: ["autodocs"]` added to meta
- [ ] Code examples use tokens (no hardcoded values)

