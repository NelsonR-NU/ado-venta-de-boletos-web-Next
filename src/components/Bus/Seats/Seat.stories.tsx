import type { Meta } from "@storybook/react";
import Seat from "./Seat";
import { Seat as SeatType } from "@/types/components/BusSeatsSelection";
import { Story } from "@/types/common/storybook";
import { withNextIntl } from "@/storybook/decorators";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Bus Seats Selection/Seat",
  component: Seat,
  decorators: [withNextIntl],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isSelected: {
      control: "boolean",
      description: "Whether the seat is selected",
    },
  },
} satisfies Meta<typeof Seat>;

export default meta;

const mockSeat: SeatType = {
  asiento: "01",
  estatus: "DI",
  seatId: "seat-id-1",
  tipo: "regular",
  columna: 1,
  fila: 1,
};

export const Available: Story = {
  args: {
    seat: { ...mockSeat, estatus: "DI" },
    isSelected: false,
    atMaxCapacity: false,
    onSeatSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "Available seat that can be selected",
      },
    },
  },
};

export const Selected: Story = {
  args: {
    seat: { ...mockSeat, estatus: "SE" },
    isSelected: true,
    atMaxCapacity: false,
    onSeatSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "Selected seat",
      },
    },
  },
};

export const Occupied: Story = {
  args: {
    seat: { ...mockSeat, estatus: "OC" },
    isSelected: false,
    atMaxCapacity: false,
    onSeatSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "Occupied seat that cannot be selected",
      },
    },
  },
};

export const WithTV: Story = {
  args: {
    seat: { ...mockSeat, tipo: "regularTV" },
    isSelected: false,
    atMaxCapacity: false,
    onSeatSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "Seat with TV indicator",
      },
    },
  },
};
