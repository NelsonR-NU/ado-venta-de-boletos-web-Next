export type SeatId = string;

export interface Seat {
  asiento: string;
  estatus: string;
  seatId: SeatId;
}

export interface TripInfo {
  salida?: {
    idCorrida: string;
    selectedSeat?: number;
    seatId?: SeatId;
    selectedSeats?: Array<{
      seatNumber: number;
      seatId: SeatId;
    }>;
  };
  regreso?: {
    idCorrida: string;
    selectedSeat?: number;
    seatId?: SeatId;
    selectedSeats?: Array<{
      seatNumber: number;
      seatId: SeatId;
    }>;
  };
}

export interface Session {
  startTimer: boolean;
}

export interface BusSeatsProps {
  activeTab: "salida" | "regreso";
  setActiveTab: (tab: "salida" | "regreso") => void;
  tripInfo: TripInfo;
  setTripInfo: (info: TripInfo) => void;
  session: Session;
  setSession: (session: Session) => void;
  quantity?: number;
}
