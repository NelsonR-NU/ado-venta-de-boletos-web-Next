import { BusStructure, Seat, TripInfo } from "../index";
import { TVInfo } from "../SeatsGrid/SeatsGrid";

export interface BusLayoutProps {
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
