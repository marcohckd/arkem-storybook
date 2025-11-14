import type { Meta, StoryObj } from "@storybook/react";
import { MapPin, type MapPinProps, type MapPinType, type MapPinState } from "./MapPin";
import { useState } from "react";

const meta: Meta<typeof MapPin> = {
  title: "Atoms/MapPin",
  component: MapPin,
  parameters: {
    layout: "centered",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `MapPin component for geospatial intelligence map visualizations. Displays a fixed 4px pin with optional label and pulse animation for active/live items.

## Features

- **Fixed 4px pin size** across all zoom levels and states
- **Four primary data categories**: Device, POI (Points of Interest), Event, and Incident pins
- **Five states**: default, hover, active, selected, and dimmed
- **Pulse animations** for active/live items (expanding from 4px core)
- **Color coding** using design system tokens
- **Opacity variations** for filtered/inactive states
- **Small typography token** for all pin labels positioned below pins
- **Accessibility** support with ARIA labels and keyboard navigation

## Pin Types

### Device Pins
- Use brand color as default pin color
- Label below pin using small typography token

### POI (Points of Interest) Pins
- **Infrastructure**: bars, bus stations, marketplaces, community centres
- **Government facilities**: courthouses, government offices
- **Critical infrastructure**: communications towers, internet exchanges
- **Military facilities**: airfields, bunkers, naval bases, general facilities
- **Casinos and entertainment venues**
- Apply specific color token for each POI type
- Label below pin using small typography token

### Event Pins
- Apply white color token
- Label below pin using small typography token

### Incident Pins
- **Crime data**
- **Emergency incidents**
- **Security alerts**
- Apply white color token
- Label below pin using small typography token

## Token Reference

| Property | Token | Value |
|----------|-------|-------|
| Pin Size | Fixed | 4px |
| Label Font Size | \`--fonts-semantic-xs\` | 12px |
| Label Line Height | \`--fonts-semantic-xs-line-height\` | 16px |
| Label Color | \`--semantic-text-primary\` | #E5E5E5 |
| Device Pin Color | \`--semantic-brand-base\` | #E0DD5B |
| Event/Incident Pin Color | \`--semantic-text-primary\` | #E5E5E5 |
| POI Bar Color | \`--poi-bar\` | #F2A65A |
| POI Courthouse Color | \`--poi-courthouse\` | #F25F5C |
| POI Casino Color | \`--poi-casino\` | #8BD17C |
| POI Generic Color | \`--poi-point-generic\` | #C3A5DF |
| Focus Ring | \`--semantic-focus-ring\` | #E0DD5B59 |
| Transition | \`--transition-base\` | 0.15s ease |

## Accessibility

- ARIA labels for screen readers
- Keyboard navigation support (Enter/Space to activate)
- Focus-visible styles for keyboard users
- Semantic HTML structure`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "device",
        "poi-prison",
        "poi-police",
        "poi-courthouse",
        "poi-nightclub",
        "poi-bar",
        "poi-stripclub",
        "poi-marketplace",
        "poi-casino",
        "poi-bus-station",
        "poi-community-centre",
        "poi-shelter",
        "poi-place-of-worship",
        "poi-point-generic",
        "event",
        "incident-crime",
        "incident-emergency",
        "incident-security",
      ],
      description: "Type of map pin",
    },
    state: {
      control: "select",
      options: ["default", "hover", "active", "selected", "dimmed"],
      description: "Current state of the pin",
    },
    label: {
      control: "text",
      description: "Label text displayed below the pin",
    },
    pulse: {
      control: "boolean",
      description: "Whether the pin should pulse (for active/live items)",
    },
    showLabel: {
      control: "boolean",
      description: "Whether to show the label (default: false for non-POI pins, true for POI pins)",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility",
    },
  },
  args: {
    type: "device",
    state: "default",
    label: "Device-001",
    showLabel: true,
    pulse: false,
  },
};

export default meta;
type Story = StoryObj<typeof MapPin>;

export const Default: Story = {
  render: (args: MapPinProps) => <MapPin {...args} />,
};

export const DevicePins: Story = {
  tags: ["!dev"],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-20)",
        alignItems: "center",
        padding: "var(--spacing-20)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-12)",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-primary)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          Device Pins
        </label>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-24)",
            alignItems: "flex-end",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
              <MapPin type="device" state="default" label="Device-001" showLabel />
              <MapPin type="device" state="hover" label="Device-002" showLabel />
              <MapPin type="device" state="active" label="Device-003" pulse showLabel />
              <MapPin type="device" state="selected" label="Device-004" showLabel />
              <MapPin type="device" state="dimmed" label="Device-005" showLabel />
        </div>
      </div>
    </div>
  ),
};

export const POIPins: Story = {
  tags: ["!dev"],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-20)",
        alignItems: "center",
        padding: "var(--spacing-20)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-16)",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-primary)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          POI (Points of Interest) Pins
        </label>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-16)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Reddish-Orange (#F25F5C) - Prison, Police, Courthouse
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="poi-prison" state="default" label="Prison" showLabel />
              <MapPin type="poi-police" state="hover" label="Police" showLabel />
              <MapPin type="poi-courthouse" state="active" label="Courthouse" pulse showLabel />
              <MapPin type="poi-police" state="selected" label="Police Station" showLabel />
              <MapPin type="poi-courthouse" state="dimmed" label="Court" showLabel />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Orange (#F2A65A) - Nightclub, Bar, Stripclub
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="poi-nightclub" state="default" label="Nightclub" showLabel />
              <MapPin type="poi-bar" state="hover" label="Bar" showLabel />
              <MapPin type="poi-stripclub" state="active" label="Stripclub" pulse showLabel />
              <MapPin type="poi-bar" state="selected" label="Bar" showLabel />
              <MapPin type="poi-nightclub" state="dimmed" label="Club" showLabel />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Light Green (#8BD17C) - Marketplace, Casino, Bus Station
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="poi-marketplace" state="default" label="Marketplace" showLabel />
              <MapPin type="poi-casino" state="hover" label="Casino" showLabel />
              <MapPin type="poi-bus-station" state="active" label="Bus Station" pulse showLabel />
              <MapPin type="poi-marketplace" state="selected" label="Market" showLabel />
              <MapPin type="poi-casino" state="dimmed" label="Casino" showLabel />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Light Blue/Grey (#AEB9C9) - Community Centre, Shelter, Place of Worship
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="poi-community-centre" state="default" label="Community Centre" showLabel />
              <MapPin type="poi-shelter" state="hover" label="Shelter" showLabel />
              <MapPin type="poi-place-of-worship" state="active" label="Place of Worship" pulse showLabel />
              <MapPin type="poi-community-centre" state="selected" label="Centre" showLabel />
              <MapPin type="poi-shelter" state="dimmed" label="Shelter" showLabel />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Light Purple (#C3A5DF) - Generic Point
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="poi-point-generic" state="default" label="Generic" showLabel />
              <MapPin type="poi-point-generic" state="hover" label="Point" showLabel />
              <MapPin type="poi-point-generic" state="active" label="Generic Point" pulse showLabel />
              <MapPin type="poi-point-generic" state="selected" label="Point" showLabel />
              <MapPin type="poi-point-generic" state="dimmed" label="Generic" showLabel />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Casinos and Entertainment Venues
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="poi-casino" state="default" label="Casino" showLabel />
              <MapPin type="poi-casino" state="hover" label="Nightclub" showLabel />
              <MapPin type="poi-casino" state="active" label="Entertainment" pulse showLabel />
              <MapPin type="poi-casino" state="selected" label="Venue" showLabel />
              <MapPin type="poi-casino" state="dimmed" label="Club" showLabel />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const EventPins: Story = {
  tags: ["!dev"],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-20)",
        alignItems: "center",
        padding: "var(--spacing-20)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-12)",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-primary)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          Event Pins
        </label>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-24)",
            alignItems: "flex-end",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <MapPin type="event" state="default" label="Event-001" showLabel />
          <MapPin type="event" state="hover" label="Event-002" showLabel />
          <MapPin type="event" state="active" label="Event-003" pulse showLabel />
          <MapPin type="event" state="selected" label="Event-004" showLabel />
          <MapPin type="event" state="dimmed" label="Event-005" showLabel />
        </div>
      </div>
    </div>
  ),
};

export const IncidentPins: Story = {
  tags: ["!dev"],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-20)",
        alignItems: "center",
        padding: "var(--spacing-20)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-16)",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-primary)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          Incident Pins
        </label>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-16)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Crime Data
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="incident-crime" state="default" label="Crime-001" showLabel />
              <MapPin type="incident-crime" state="hover" label="Crime-002" showLabel />
              <MapPin type="incident-crime" state="active" label="Crime-003" pulse showLabel />
              <MapPin type="incident-crime" state="selected" label="Crime-004" showLabel />
              <MapPin type="incident-crime" state="dimmed" label="Crime-005" showLabel />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Emergency Incidents
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="incident-emergency" state="default" label="Emergency-001" showLabel />
              <MapPin type="incident-emergency" state="hover" label="Emergency-002" showLabel />
              <MapPin type="incident-emergency" state="active" label="Emergency-003" pulse showLabel />
              <MapPin type="incident-emergency" state="selected" label="Emergency-004" showLabel />
              <MapPin type="incident-emergency" state="dimmed" label="Emergency-005" showLabel />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Security Alerts
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="incident-security" state="default" label="Alert-001" showLabel />
              <MapPin type="incident-security" state="hover" label="Alert-002" showLabel />
              <MapPin type="incident-security" state="active" label="Alert-003" pulse showLabel />
              <MapPin type="incident-security" state="selected" label="Alert-004" showLabel />
              <MapPin type="incident-security" state="dimmed" label="Alert-005" showLabel />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  tags: ["!dev"],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-20)",
        alignItems: "center",
        padding: "var(--spacing-20)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-12)",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-primary)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          All States
        </label>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-24)",
            alignItems: "flex-end",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-xs)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Default
            </label>
            <MapPin type="device" state="default" label="Device" showLabel />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-xs)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Hover
            </label>
            <MapPin type="device" state="hover" label="Device" showLabel />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-xs)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Active (Pulse)
            </label>
            <MapPin type="device" state="active" label="Device" pulse showLabel />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-xs)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Selected
            </label>
            <MapPin type="device" state="selected" label="Device" showLabel />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-xs)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Dimmed
            </label>
            <MapPin type="device" state="dimmed" label="Device" showLabel />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const PulseAnimation: Story = {
  tags: ["!dev"],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-20)",
        alignItems: "center",
        padding: "var(--spacing-20)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-12)",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-primary)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          Pulse Animation (Active/Live Items)
        </label>
        <p
          style={{
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-secondary)",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          Pins with pulse animation expand from the 4px core, indicating active or live items
          that require attention.
        </p>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-24)",
            alignItems: "flex-end",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <MapPin type="device" state="active" label="Live Device" pulse showLabel />
          <MapPin type="event" state="active" label="Active Event" pulse showLabel />
          <MapPin type="incident-emergency" state="active" label="Ongoing Emergency" pulse showLabel />
          <MapPin type="poi-point-generic" state="active" label="Active Tower" pulse showLabel />
        </div>
      </div>
    </div>
  ),
};

export const MapContext: Story = {
  tags: ["!dev"],
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [selectedPin, setSelectedPin] = useState<string | null>(null);

    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "var(--semantic-background-base)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Simulated dark map background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, var(--semantic-background-base) 0%, var(--semantic-background-raised) 50%, var(--semantic-background-base) 100%)",
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: "relative",
            width: "800px",
            height: "600px",
            background: "var(--semantic-background-base)",
            border: "var(--border-width-thin) solid var(--semantic-border-subtle)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Grid pattern to simulate map */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(var(--semantic-border-ghosted) 1px, transparent 1px), linear-gradient(90deg, var(--semantic-border-ghosted) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.3,
            }}
          />

          {/* Pins positioned on map */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Device pins */}
            <div style={{ position: "absolute", top: "20%", left: "30%" }}>
              <MapPin
                type="device"
                state={selectedPin === "device-1" ? "selected" : "default"}
                label="Device-001"
                showLabel
                pulse={selectedPin === "device-1"}
                onClick={() => setSelectedPin(selectedPin === "device-1" ? null : "device-1")}
                ariaLabel="Device 001"
              />
            </div>
            <div style={{ position: "absolute", top: "35%", left: "45%" }}>
              <MapPin
                type="device"
                state={selectedPin === "device-2" ? "selected" : "default"}
                label="Device-002"
                showLabel
                pulse={selectedPin === "device-2"}
                onClick={() => setSelectedPin(selectedPin === "device-2" ? null : "device-2")}
                ariaLabel="Device 002"
              />
            </div>

            {/* POI pins */}
            <div style={{ position: "absolute", top: "50%", left: "25%" }}>
              <MapPin
                type="poi-bar"
                state={selectedPin === "poi-1" ? "selected" : "default"}
                label="Bar"
                showLabel
                onClick={() => setSelectedPin(selectedPin === "poi-1" ? null : "poi-1")}
                ariaLabel="Bar"
              />
            </div>
            <div style={{ position: "absolute", top: "60%", left: "50%" }}>
              <MapPin
                type="poi-courthouse"
                state={selectedPin === "poi-2" ? "selected" : "default"}
                label="Courthouse"
                showLabel
                onClick={() => setSelectedPin(selectedPin === "poi-2" ? null : "poi-2")}
                ariaLabel="Courthouse"
              />
            </div>
            <div style={{ position: "absolute", top: "40%", left: "65%" }}>
              <MapPin
                type="poi-point-generic"
                state={selectedPin === "poi-3" ? "selected" : "default"}
                label="Comm Tower"
                showLabel
                onClick={() => setSelectedPin(selectedPin === "poi-3" ? null : "poi-3")}
                ariaLabel="Communications Tower"
              />
            </div>

            {/* Event pins */}
            <div style={{ position: "absolute", top: "25%", left: "60%" }}>
              <MapPin
                type="event"
                state={selectedPin === "event-1" ? "selected" : "default"}
                label="Event-001"
                showLabel
                pulse={selectedPin === "event-1"}
                onClick={() => setSelectedPin(selectedPin === "event-1" ? null : "event-1")}
                ariaLabel="Event 001"
              />
            </div>

            {/* Incident pins */}
            <div style={{ position: "absolute", top: "70%", left: "40%" }}>
              <MapPin
                type="incident-crime"
                state={selectedPin === "incident-1" ? "selected" : "default"}
                label="Crime-001"
                showLabel
                onClick={() => setSelectedPin(selectedPin === "incident-1" ? null : "incident-1")}
                ariaLabel="Crime Incident 001"
              />
            </div>
            <div style={{ position: "absolute", top: "55%", left: "70%" }}>
              <MapPin
                type="incident-emergency"
                state={selectedPin === "incident-2" ? "selected" : "active"}
                label="Emergency"
                showLabel
                pulse
                onClick={() => setSelectedPin(selectedPin === "incident-2" ? null : "incident-2")}
                ariaLabel="Emergency Incident"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const MultiLayerVisualization: Story = {
  tags: ["!dev"],
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [visibleLayers, setVisibleLayers] = useState({
      devices: true,
      pois: true,
      events: true,
      incidents: true,
    });

    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "var(--semantic-background-base)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Layer controls */}
        <div
          style={{
            padding: "var(--spacing-16)",
            borderBottom: "var(--border-width-thin) solid var(--semantic-border-subtle)",
            display: "flex",
            gap: "var(--spacing-16)",
            flexWrap: "wrap",
          }}
        >
          <label
            style={{
              fontSize: "var(--fonts-semantic-sm)",
              color: "var(--semantic-text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-8)",
            }}
          >
            <input
              type="checkbox"
              checked={visibleLayers.devices}
              onChange={(e) =>
                setVisibleLayers({ ...visibleLayers, devices: e.target.checked })
              }
              style={{ cursor: "pointer" }}
            />
            Devices
          </label>
          <label
            style={{
              fontSize: "var(--fonts-semantic-sm)",
              color: "var(--semantic-text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-8)",
            }}
          >
            <input
              type="checkbox"
              checked={visibleLayers.pois}
              onChange={(e) => setVisibleLayers({ ...visibleLayers, pois: e.target.checked })}
              style={{ cursor: "pointer" }}
            />
            POIs
          </label>
          <label
            style={{
              fontSize: "var(--fonts-semantic-sm)",
              color: "var(--semantic-text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-8)",
            }}
          >
            <input
              type="checkbox"
              checked={visibleLayers.events}
              onChange={(e) => setVisibleLayers({ ...visibleLayers, events: e.target.checked })}
              style={{ cursor: "pointer" }}
            />
            Events
          </label>
          <label
            style={{
              fontSize: "var(--fonts-semantic-sm)",
              color: "var(--semantic-text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-8)",
            }}
          >
            <input
              type="checkbox"
              checked={visibleLayers.incidents}
              onChange={(e) =>
                setVisibleLayers({ ...visibleLayers, incidents: e.target.checked })
              }
              style={{ cursor: "pointer" }}
            />
            Incidents
          </label>
        </div>

        {/* Map area */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--semantic-background-base)",
          }}
        >
          {/* Grid pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(var(--semantic-border-ghosted) 1px, transparent 1px), linear-gradient(90deg, var(--semantic-border-ghosted) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.3,
            }}
          />

          {/* Pins */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {/* Device pins */}
            {visibleLayers.devices && (
              <>
                <div style={{ position: "absolute", top: "15%", left: "20%" }}>
                  <MapPin type="device" state="default" label="Device-001" showLabel />
                </div>
                <div style={{ position: "absolute", top: "30%", left: "35%" }}>
                  <MapPin type="device" state="active" label="Device-002" pulse showLabel />
                </div>
                <div style={{ position: "absolute", top: "45%", left: "25%" }}>
                  <MapPin type="device" state="default" label="Device-003" showLabel />
                </div>
              </>
            )}

            {/* POI pins */}
            {visibleLayers.pois && (
              <>
                <div style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <MapPin type="poi-bar" state="default" label="Bar" showLabel />
                </div>
                <div style={{ position: "absolute", top: "40%", left: "60%" }}>
                  <MapPin type="poi-courthouse" state="default" label="Courthouse" showLabel />
                </div>
                <div style={{ position: "absolute", top: "55%", left: "45%" }}>
                  <MapPin type="poi-point-generic" state="default" label="Comm Tower" showLabel />
                </div>
                <div style={{ position: "absolute", top: "35%", left: "70%" }}>
                  <MapPin type="poi-casino" state="default" label="Casino" showLabel />
                </div>
              </>
            )}

            {/* Event pins */}
            {visibleLayers.events && (
              <>
                <div style={{ position: "absolute", top: "20%", left: "65%" }}>
                  <MapPin type="event" state="active" label="Event-001" pulse showLabel />
                </div>
                <div style={{ position: "absolute", top: "50%", left: "55%" }}>
                  <MapPin type="event" state="default" label="Event-002" showLabel />
                </div>
              </>
            )}

            {/* Incident pins */}
            {visibleLayers.incidents && (
              <>
                <div style={{ position: "absolute", top: "60%", left: "30%" }}>
                  <MapPin type="incident-crime" state="default" label="Crime-001" showLabel />
                </div>
                <div style={{ position: "absolute", top: "70%", left: "50%" }}>
                  <MapPin type="incident-emergency" state="active" label="Emergency" pulse showLabel />
                </div>
                <div style={{ position: "absolute", top: "65%", left: "65%" }}>
                  <MapPin type="incident-security" state="default" label="Alert-001" showLabel />
                </div>
              </>
            )}

            {/* Dimmed pins for filtered layers */}
            {!visibleLayers.devices && (
              <div style={{ position: "absolute", top: "15%", left: "20%" }}>
                <MapPin type="device" state="dimmed" label="Device-001" showLabel />
              </div>
            )}
            {!visibleLayers.pois && (
              <div style={{ position: "absolute", top: "25%", left: "50%" }}>
                <MapPin type="poi-bar" state="dimmed" label="Bar" showLabel />
              </div>
            )}
            {!visibleLayers.events && (
              <div style={{ position: "absolute", top: "20%", left: "65%" }}>
                <MapPin type="event" state="dimmed" label="Event-001" showLabel />
              </div>
            )}
            {!visibleLayers.incidents && (
              <div style={{ position: "absolute", top: "60%", left: "30%" }}>
                <MapPin type="incident-crime" state="dimmed" label="Crime-001" showLabel />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const FilteringStates: Story = {
  tags: ["!dev"],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-20)",
        alignItems: "center",
        padding: "var(--spacing-20)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-16)",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-primary)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          Filtering States
        </label>
        <p
          style={{
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-secondary)",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          When layers are filtered or inactive, pins use the dimmed state with reduced opacity
          (30%) to indicate they are not currently active in the view.
        </p>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-24)",
            alignItems: "flex-end",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-xs)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Active (Normal)
            </label>
            <MapPin type="device" state="default" label="Device" showLabel />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-xs)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Filtered (Dimmed)
            </label>
            <MapPin type="device" state="dimmed" label="Device" showLabel />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-12)",
            alignItems: "center",
            marginTop: "var(--spacing-8)",
          }}
        >
          <label
            style={{
              fontSize: "var(--fonts-semantic-sm)",
              color: "var(--semantic-text-secondary)",
            }}
          >
            All Pin Types - Dimmed State
          </label>
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-16)",
              alignItems: "flex-end",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <MapPin type="device" state="dimmed" label="Device" showLabel />
            <MapPin type="poi-bar" state="dimmed" label="POI" showLabel />
            <MapPin type="event" state="dimmed" label="Event" showLabel />
            <MapPin type="incident-crime" state="dimmed" label="Incident" showLabel />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const IntelligenceWorkflow: Story = {
  tags: ["!dev"],
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [selectedPin, setSelectedPin] = useState<string | null>(null);
    const [timeFilter, setTimeFilter] = useState<"all" | "recent" | "active">("all");

    const pins = [
      {
        id: "device-1",
        type: "device" as MapPinType,
        label: "Device-001",
        position: { top: "20%", left: "25%" },
        isActive: true,
        lastSeen: "2 min ago",
      },
      {
        id: "device-2",
        type: "device" as MapPinType,
        label: "Device-002",
        position: { top: "35%", left: "40%" },
        isActive: false,
        lastSeen: "1 hour ago",
      },
      {
        id: "poi-1",
        type: "poi-bar" as MapPinType,
        label: "Bar",
        position: { top: "50%", left: "30%" },
        isActive: false,
      },
      {
        id: "poi-2",
        type: "poi-courthouse" as MapPinType,
        label: "Courthouse",
        position: { top: "45%", left: "55%" },
        isActive: false,
      },
      {
        id: "event-1",
        type: "event" as MapPinType,
        label: "Event-001",
        position: { top: "25%", left: "60%" },
        isActive: true,
        timestamp: "5 min ago",
      },
      {
        id: "incident-1",
        type: "incident-emergency" as MapPinType,
        label: "Emergency",
        position: { top: "65%", left: "45%" },
        isActive: true,
        timestamp: "Just now",
      },
    ];

    const filteredPins = pins.filter((pin) => {
      if (timeFilter === "all") return true;
      if (timeFilter === "active") return pin.isActive;
      if (timeFilter === "recent") return pin.isActive || pin.lastSeen?.includes("min");
      return true;
    });

    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "var(--semantic-background-base)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Intelligence panel */}
        <div
          style={{
            padding: "var(--spacing-16)",
            borderBottom: "var(--border-width-thin) solid var(--semantic-border-subtle)",
            display: "flex",
            gap: "var(--spacing-16)",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <label
            style={{
              fontSize: "var(--fonts-semantic-sm)",
              color: "var(--semantic-text-primary)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            Time Filter:
          </label>
          <div style={{ display: "flex", gap: "var(--spacing-8)" }}>
            {(["all", "recent", "active"] as const).map((filter) => (
              <label
                key={filter}
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  color: "var(--semantic-text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-8)",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="timeFilter"
                  value={filter}
                  checked={timeFilter === filter}
                  onChange={(e) => setTimeFilter(e.target.value as typeof timeFilter)}
                  style={{ cursor: "pointer" }}
                />
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </label>
            ))}
          </div>
          {selectedPin && (
            <div
              style={{
                marginLeft: "auto",
                padding: "var(--spacing-8) var(--spacing-12)",
                background: "var(--semantic-background-muted)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-primary)",
              }}
            >
              Selected: {pins.find((p) => p.id === selectedPin)?.label}
            </div>
          )}
        </div>

        {/* Map area */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--semantic-background-base)",
          }}
        >
          {/* Grid pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(var(--semantic-border-ghosted) 1px, transparent 1px), linear-gradient(90deg, var(--semantic-border-ghosted) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.3,
            }}
          />

          {/* Pins */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {pins.map((pin) => {
              const isVisible = filteredPins.some((p) => p.id === pin.id);
              const isSelected = selectedPin === pin.id;
              const state: MapPinState = isSelected
                ? "selected"
                : !isVisible
                  ? "dimmed"
                  : pin.isActive
                    ? "active"
                    : "default";

              return (
                <div key={pin.id} style={{ position: "absolute", ...pin.position }}>
                  <MapPin
                    type={pin.type}
                    state={state}
                    label={pin.label}
                    showLabel
                    pulse={pin.isActive && isVisible}
                    onClick={() => setSelectedPin(isSelected ? null : pin.id)}
                    ariaLabel={`${pin.label}${pin.lastSeen ? `, last seen ${pin.lastSeen}` : ""}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
};

export const DeviceTruncation: Story = {
  tags: ["!dev"],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-20)",
        alignItems: "center",
        padding: "var(--spacing-20)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-12)",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-primary)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          Device ID Truncation (Non-Interactive)
        </label>
        <p
          style={{
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-secondary)",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          Device pins automatically truncate long device IDs in default state, showing only the first 4 and last 4 characters with ellipsis. This view demonstrates the truncated state without hover interaction.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-16)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Truncated Device IDs (Default State)
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-24)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin
                type="device"
                state="default"
                label="0251E342-6E4D-4207-A1AD-DD0C3D9BF553"
                showLabel
              />
              <MapPin
                type="device"
                state="default"
                label="A3F2B891-4C5D-6E7F-8A9B-0C1D2E3F4A5B"
                showLabel
              />
              <MapPin
                type="device"
                state="default"
                label="FEDCBA98-7654-3210-FEDC-BA9876543210"
                showLabel
              />
              <MapPin
                type="device"
                state="active"
                label="12345678-90AB-CDEF-1234-567890ABCDEF"
                pulse
                showLabel
              />
              <MapPin
                type="device"
                state="selected"
                label="ABCDEF12-3456-7890-ABCD-EF1234567890"
                showLabel
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Full Device IDs (Hover State - For Reference)
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-24)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin
                type="device"
                state="hover"
                label="0251E342-6E4D-4207-A1AD-DD0C3D9BF553"
                showLabel
              />
              <MapPin
                type="device"
                state="hover"
                label="A3F2B891-4C5D-6E7F-8A9B-0C1D2E3F4A5B"
                showLabel
              />
              <MapPin
                type="device"
                state="hover"
                label="FEDCBA98-7654-3210-FEDC-BA9876543210"
                showLabel
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const NoLabels: Story = {
  tags: ["!dev"],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-20)",
        alignItems: "center",
        padding: "var(--spacing-20)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-12)",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "var(--fonts-semantic-md)",
            color: "var(--semantic-text-primary)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          Map Pins Without Labels
        </label>
        <p
          style={{
            fontSize: "var(--fonts-semantic-sm)",
            color: "var(--semantic-text-secondary)",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          All pin types displayed without labels, showing only the 4px colored markers. Useful for dense map visualizations where labels would cause clutter.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-16)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Device Pins
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="device" state="default" />
              <MapPin type="device" state="hover" />
              <MapPin type="device" state="active" pulse />
              <MapPin type="device" state="selected" />
              <MapPin type="device" state="dimmed" />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              POI Pins
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="poi-prison" state="default" />
              <MapPin type="poi-police" state="default" />
              <MapPin type="poi-courthouse" state="default" />
              <MapPin type="poi-nightclub" state="default" />
              <MapPin type="poi-bar" state="default" />
              <MapPin type="poi-stripclub" state="default" />
              <MapPin type="poi-marketplace" state="default" />
              <MapPin type="poi-casino" state="default" />
              <MapPin type="poi-bus-station" state="default" />
              <MapPin type="poi-community-centre" state="default" />
              <MapPin type="poi-shelter" state="default" />
              <MapPin type="poi-place-of-worship" state="default" />
              <MapPin type="poi-point-generic" state="default" />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Event Pins
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="event" state="default" />
              <MapPin type="event" state="hover" />
              <MapPin type="event" state="active" pulse />
              <MapPin type="event" state="selected" />
              <MapPin type="event" state="dimmed" />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "var(--fonts-semantic-sm)",
                color: "var(--semantic-text-secondary)",
              }}
            >
              Incident Pins
            </label>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-16)",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MapPin type="incident-crime" state="default" />
              <MapPin type="incident-emergency" state="default" />
              <MapPin type="incident-security" state="default" />
              <MapPin type="incident-emergency" state="active" pulse />
              <MapPin type="incident-crime" state="dimmed" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

