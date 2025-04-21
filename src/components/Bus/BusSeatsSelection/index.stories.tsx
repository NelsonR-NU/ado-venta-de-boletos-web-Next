import type { Meta } from "@storybook/react";
import BusSeatsSelection, { mockTripInfo, visualReferenceMock } from "./index";
import { BusStructure, Session } from "@/types/components/BusSeatsSelection";
import { Story } from "@/types/common/storybook";
import { withNextIntl } from "@/storybook/decorators";
import { fn } from "@storybook/test";
import { findTVPositions } from "@/utils/busStructure";

const meta = {
  title: "Components/Bus Seats Selection",
  component: BusSeatsSelection,
  decorators: [withNextIntl],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    quantity: {
      control: { type: "number", min: 1, max: 5 },
      description: "Number of seats a user can select",
      defaultValue: 1,
    },
    activeTab: {
      control: "radio",
      options: ["salida", "regreso"],
      description: "The currently active trip tab",
    },
  },
} satisfies Meta<typeof BusSeatsSelection>;

export default meta;

const mockSession: Session = {
  startTimer: false,
};

// Storybook initializers to properly set TVs for the mock structure
const getStorybookInitializers = (structure: BusStructure) => {
  // Use the real implementation to get TV positions
  const { columns, positions, tvColumnMappings, tvPositionsInExpandedGrid } =
    findTVPositions(structure);

  return {
    // These props will be overridden by the component's internal useState
    // on initialization, but they allow Storybook to render correctly
    tvInfo: {
      columns,
      positions,
      tvColumnMappings,
      tvPositionsInExpandedGrid,
    },
  };
};

// Prepare the TV info for all stories to use
const mockTvInfo = getStorybookInitializers(visualReferenceMock).tvInfo;

export const SingleSeat: Story = {
  args: {
    activeTab: "salida",
    setActiveTab: fn(),
    tripInfo: mockTripInfo,
    setTripInfo: fn(),
    session: mockSession,
    setSession: fn(),
    quantity: 1,
    busStructure: visualReferenceMock,
    // Add the mock TV info for proper storybook rendering
    _storybook_tvInfo: mockTvInfo,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single seat selection mode allows only one seat to be selected at a time. Clicking an already selected seat unselects it.",
      },
    },
  },
};

export const MultiSeat: Story = {
  args: {
    activeTab: "salida",
    setActiveTab: fn(),
    tripInfo: mockTripInfo,
    setTripInfo: fn(),
    session: mockSession,
    setSession: fn(),
    quantity: 3,
    busStructure: visualReferenceMock,
    // Add the mock TV info for proper storybook rendering
    _storybook_tvInfo: mockTvInfo,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multi-seat selection mode allows up to quantity (3) seats to be selected. Users can unselect seats individually by clicking them.",
      },
    },
  },
};

// Add a story for dynamic bus layout based on server response
export const DynamicBusLayout: Story = {
  args: {
    activeTab: "salida",
    setActiveTab: fn(),
    tripInfo: mockTripInfo,
    setTripInfo: fn(),
    session: mockSession,
    setSession: fn(),
    quantity: 2,
    busStructure: visualReferenceMock,
    // Add the mock TV info for proper storybook rendering
    _storybook_tvInfo: mockTvInfo,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the dynamic bus layout using the exact structure from the visual reference. It includes TV positions (T1, T20, T33), occupied seats (8, 11, 14, 19, 22, 27, 29, 36), bathroom (WC), and proper seat arrangement.",
      },
    },
  },
};
