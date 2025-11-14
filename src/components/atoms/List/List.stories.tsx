// src/components/atoms/List/List.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { Clock } from "lucide-react";

import { List, ListItem } from "./List";

const meta: Meta<typeof List> = {
  title: "Atoms/List",
  component: List,
  parameters: {
    layout: "padded",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `List component for displaying chronological lists of events with timestamps and location data. Built with ARKEM Design System tokens.

## Features

- **Chronological Display**: Shows events in a timeline format
- **Header Support**: Optional header with icon, title, and secondary text
- **Flexible Content**: Supports date, location, ID, and coordinates
- **Scrollable**: Content area is scrollable when items exceed container height
- **Accessibility**: Full ARIA support for lists

## Usage

\`\`\`tsx
<List
  header={{
    icon: Clock,
    title: "Timeline",
    secondary: "7 Events"
  }}
  items={[
    {
      date: "Aug 1, 2025 • 08:11 PM • 75d ago",
      location: "Phoenix, USA",
      id: "1207472156",
      coords: "33.3366, -111.7307"
    }
  ]}
  ariaLabel="Event timeline"
/>
\`\`\`

## Token Usage

All styling uses semantic design tokens:
- Colors: \`var(--semantic-background-base)\`, \`var(--semantic-text-primary)\`, etc.
- Spacing: \`var(--spacing-8)\`, \`var(--spacing-12)\`, etc.
- Typography: \`var(--fonts-semantic-xs)\`, \`var(--fonts-semantic-xxs)\`, etc.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: false,
      description: "Array of list items",
    },
    header: {
      control: false,
      description: "Optional header with icon, title, and secondary text",
    },
    className: {
      control: false,
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for the list",
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default list with header and timeline items. Each item displays date, location, ID, and coordinates.",
      },
    },
  },
  render: () => {
    const items: ListItem[] = [
      {
        id: "1",
        date: "Aug 1, 2025 • 08:11 PM • 75d ago",
        location: "Phoenix, USA",
        observationId: "1207472156",
        coords: "33.3366, -111.7307",
      },
      {
        id: "2",
        date: "Jul 28, 2025 • 02:45 PM • 80d ago",
        location: "Los Angeles, USA",
        observationId: "1207472155",
        coords: "34.0522, -118.2437",
      },
      {
        id: "3",
        date: "Jul 25, 2025 • 10:30 AM • 83d ago",
        location: "New York, USA",
        observationId: "1207472154",
        coords: "40.7128, -74.0060",
      },
    ];

    return (
      <div style={{ width: "500px", height: "400px" }}>
        <List
          header={{
            icon: Clock,
            title: "Event Timeline",
            secondary: "3 Events",
          }}
          items={items}
          ariaLabel="Event timeline"
        />
      </div>
    );
  },
};

export const DeviceTimeline: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Device Timeline variant extracted from the Device Details modal. Displays a chronological list of device observations with timestamps and location data (e.g., 'Phoenix, USA • 1207472156 • 33.3366, -111.7307'). Shows a header with icon, title, and observation count.",
      },
    },
  },
  render: () => {
    const items: ListItem[] = Array.from({ length: 7 }, (_, i) => ({
      id: `obs-${i + 1}`,
      date: "Aug 1, 2025 • 08:11 PM • 75d ago",
      location: "Phoenix, USA",
      observationId: "1207472156",
      coords: "33.3366, -111.7307",
    }));

    return (
      <div style={{ 
        width: "500px", 
        height: "400px",
        border: 'var(--border-width-thin) solid var(--semantic-border-subtle)',
        background: 'var(--semantic-background-base)',
      }}>
        <List
          header={{
            icon: Clock,
            title: "Device Timeline",
            secondary: "7 Observations",
          }}
          items={items}
          ariaLabel="Device timeline observations"
        />
      </div>
    );
  },
};

export const WithoutHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: "List without a header. Useful when the list is embedded in a larger component that provides its own header.",
      },
    },
  },
  render: () => {
    const items: ListItem[] = [
      {
        id: "1",
        date: "Aug 1, 2025 • 08:11 PM",
        location: "Phoenix, USA",
        coords: "33.3366, -111.7307",
      },
      {
        id: "2",
        date: "Jul 28, 2025 • 02:45 PM",
        location: "Los Angeles, USA",
        coords: "34.0522, -118.2437",
      },
      {
        id: "3",
        date: "Jul 25, 2025 • 10:30 AM",
        location: "New York, USA",
        coords: "40.7128, -74.0060",
      },
    ];

    return (
      <div style={{ width: "500px", height: "300px" }}>
        <List items={items} ariaLabel="Event list" />
      </div>
    );
  },
};

export const LongList: Story = {
  parameters: {
    docs: {
      description: {
        story: "List with many items demonstrating scrollable behavior. The content area scrolls when items exceed the container height.",
      },
    },
  },
  render: () => {
    const items: ListItem[] = Array.from({ length: 20 }, (_, i) => ({
      id: `item-${i + 1}`,
      date: `Aug ${20 - i}, 2025 • ${8 + (i % 12)}:${String(i % 60).padStart(2, '0')} PM • ${75 + i}d ago`,
      location: ["Phoenix, USA", "Los Angeles, USA", "New York, USA", "Chicago, USA", "Houston, USA"][i % 5],
      observationId: `1207472${String(156 - i).padStart(3, '0')}`,
      coords: [
        "33.3366, -111.7307",
        "34.0522, -118.2437",
        "40.7128, -74.0060",
        "41.8781, -87.6298",
        "29.7604, -95.3698",
      ][i % 5],
    }));

    return (
      <div style={{ width: "500px", height: "400px" }}>
        <List
          header={{
            icon: Clock,
            title: "Event Timeline",
            secondary: `${items.length} Events`,
          }}
          items={items}
          ariaLabel="Event timeline"
        />
      </div>
    );
  },
};

