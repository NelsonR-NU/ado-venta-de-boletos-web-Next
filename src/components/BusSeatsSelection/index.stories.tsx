import type { Meta } from "@storybook/react";
import BusSeatsSelection from "./index";
import { Session, TripInfo } from "@/types/components/BusSeatsSelection";
import { Story } from "@/types/common/storybook";
import { withNextIntl } from "@/storybook/decorators";
import { fn } from "@storybook/test";

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

const mockTripInfo: TripInfo = {
  salida: {
    idCorrida: "mock-corrida-id-salida",
    selectedSeat: undefined,
    seatId: undefined,
    selectedSeats: [],
  },
  regreso: {
    idCorrida: "mock-corrida-id-regreso",
    selectedSeat: undefined,
    seatId: undefined,
    selectedSeats: [],
  },
};

const mockSession: Session = {
  startTimer: false,
};

export const SingleSeat: Story = {
  args: {
    activeTab: "salida",
    setActiveTab: fn(),
    tripInfo: mockTripInfo,
    setTripInfo: fn(),
    session: mockSession,
    setSession: fn(),
    quantity: 1,
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
