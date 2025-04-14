import { BusStructure, Seat, TripInfo } from "../index";

export interface TVInfo {
  columns: number[];
  positions: Record<number, number[]>;
  tvColumnMappings: Record<number, number>;
  tvPositionsInExpandedGrid: Record<number, number[]>;
}

export interface SeatsGridProps {
  isLoading: boolean;
  seats?: Seat[];
  busStructure?: BusStructure | null;
  checkIfSelected: (asiento: string) => boolean;
  quantity: number;
  tripInfo: TripInfo;
  trip: "salida" | "regreso";
  handleSeatSelection: (seat: Seat) => void;
  tvInfo: TVInfo;
}
