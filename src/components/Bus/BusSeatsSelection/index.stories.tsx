import type { Meta } from "@storybook/react";
import BusSeatsSelection from "./index";
import { BusStructure, Session, TripInfo } from "@/types/components/BusSeatsSelection";
import { Story } from "@/types/common/storybook";
import { withNextIntl } from "@/storybook/decorators";
import { fn } from "@storybook/test";
import { findTVPositions } from "@/utils/busStructureHelper";

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

// Visual reference mock that matches the provided layout
const visualReferenceMock: BusStructure = {
  filas: 5,
  estructura: [
    // Column 1 - R4, R3, X, R2, T1
    { tipo: "regular", estatus: "DP", asiento: 4, columna: 1, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 3, columna: 1, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 1, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 2, columna: 1, fila: 4 },
    { tipo: "regularTV", estatus: "DP", asiento: 1, columna: 1, fila: 5 },

    // Column 2 - R8, R7, X, R6, R5
    { tipo: "regular", estatus: "OC", asiento: 8, columna: 2, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 7, columna: 2, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 2, fila: 3 },
    { tipo: "regular", estatus: "OC", asiento: 6, columna: 2, fila: 4 },
    { tipo: "regular", estatus: "OC", asiento: 5, columna: 2, fila: 5 },

    // Column 3 - R12, O11, X, R10, R9
    { tipo: "regular", estatus: "DP", asiento: 12, columna: 3, fila: 1 },
    { tipo: "regular", estatus: "OC", asiento: 11, columna: 3, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 3, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 10, columna: 3, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 9, columna: 3, fila: 5 },

    // Column 4 - R16, R15, X, R14, R13
    { tipo: "regular", estatus: "DP", asiento: 16, columna: 4, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 15, columna: 4, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 4, fila: 3 },
    { tipo: "regular", estatus: "OC", asiento: 14, columna: 4, fila: 4 },
    { tipo: "regularTV", estatus: "DP", asiento: 13, columna: 4, fila: 5 },

    // Column 5 - T20, R19, X, R18, R17
    { tipo: "regularTV", estatus: "DP", asiento: 20, columna: 5, fila: 1 },
    { tipo: "regular", estatus: "OC", asiento: 19, columna: 5, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 5, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 18, columna: 5, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 17, columna: 5, fila: 5 },

    // Column 6 - R24, R23, X, R22, R21
    { tipo: "regular", estatus: "DP", asiento: 24, columna: 6, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 23, columna: 6, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 6, fila: 3 },
    { tipo: "regular", estatus: "OC", asiento: 22, columna: 6, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 21, columna: 6, fila: 5 },

    // Column 7 - R28, R27, X, R26, R25
    { tipo: "regular", estatus: "DP", asiento: 28, columna: 7, fila: 1 },
    { tipo: "regular", estatus: "OC", asiento: 27, columna: 7, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 7, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 26, columna: 7, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 25, columna: 7, fila: 5 },

    // Column 8 - R32, R31, X, R30, R29
    { tipo: "regular", estatus: "DP", asiento: 32, columna: 8, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 31, columna: 8, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 8, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 30, columna: 8, fila: 4 },
    { tipo: "regular", estatus: "OC", asiento: 29, columna: 8, fila: 5 },

    // Column 9 - R36, R35, X, R34, T33
    { tipo: "regular", estatus: "OC", asiento: 36, columna: 9, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 35, columna: 9, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 9, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 34, columna: 9, fila: 4 },
    { tipo: "regularTV", estatus: "DP", asiento: 33, columna: 9, fila: 5 },

    // Column 10 - R40, R39, X, R38, R37
    { tipo: "regular", estatus: "DP", asiento: 40, columna: 10, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 39, columna: 10, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 10, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 38, columna: 10, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 37, columna: 10, fila: 5 },

    // Column 11 - R44, R43, X, R42, R41
    { tipo: "regular", estatus: "DP", asiento: 44, columna: 11, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 43, columna: 11, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 11, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 42, columna: 11, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 41, columna: 11, fila: 5 },

    // Column 12 - WC and empty spaces
    { tipo: "wc", estatus: "OC", asiento: null, columna: 12, fila: 1 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 3 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 4 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 5 },
  ],
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
