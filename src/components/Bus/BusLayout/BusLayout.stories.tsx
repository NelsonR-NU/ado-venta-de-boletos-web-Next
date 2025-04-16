import type { Meta } from "@storybook/react";
import BusLayout from "./BusLayout";
import { BusStructure, TripInfo } from "@/types/components/BusSeatsSelection";
import { Story } from "@/types/common/storybook";
import { withNextIntl } from "@/storybook/decorators";
import { fn } from "@storybook/test";
import { convertServerStructureToSeats, findTVPositions } from "@/utils/busStructure";

const meta = {
  title: "Components/Bus Seats Selection/BusLayout",
  component: BusLayout,
  decorators: [withNextIntl],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BusLayout>;

export default meta;

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

    // Column 12 - WC and empty spaces
    { tipo: "wc", estatus: "OC", asiento: null, columna: 12, fila: 1 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 3 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 4 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 5 },
  ],
};

const seats = convertServerStructureToSeats(visualReferenceMock);

// Calculate TV information from the structure
const { columns, positions, tvColumnMappings, tvPositionsInExpandedGrid } =
  findTVPositions(visualReferenceMock);

// Create the TV info object for story props
const tvInfo = {
  columns,
  positions,
  tvColumnMappings,
  tvPositionsInExpandedGrid,
};

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

export const Default: Story = {
  args: {
    isLoading: false,
    seats: seats,
    busStructure: visualReferenceMock,
    checkIfSelected: () => false,
    quantity: 2,
    tripInfo: mockTripInfo,
    trip: "salida",
    handleSeatSelection: fn(),
    tvInfo,
  },
  parameters: {
    docs: {
      description: {
        story: "Default bus layout with seats, wheel and gender indicators",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    busStructure: visualReferenceMock,
    checkIfSelected: () => false,
    quantity: 2,
    tripInfo: mockTripInfo,
    trip: "salida",
    handleSeatSelection: fn(),
    tvInfo,
  },
  parameters: {
    docs: {
      description: {
        story: "Bus layout in loading state",
      },
    },
  },
};

export const WithSelectedSeats: Story = {
  args: {
    isLoading: false,
    seats: seats,
    busStructure: visualReferenceMock,
    checkIfSelected: (asiento: string) => ["01", "03"].includes(asiento),
    quantity: 2,
    tripInfo: {
      ...mockTripInfo,
      salida: {
        ...mockTripInfo.salida,
        selectedSeats: [
          { seatNumber: 1, seatId: "seat-id-1" },
          { seatNumber: 3, seatId: "seat-id-3" },
        ],
      },
    },
    trip: "salida",
    handleSeatSelection: fn(),
    tvInfo,
  },
  parameters: {
    docs: {
      description: {
        story: "Bus layout with selected seats",
      },
    },
  },
};
