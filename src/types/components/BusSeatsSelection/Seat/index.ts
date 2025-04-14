import { Seat } from "../index";

export interface SeatProps {
  seat: Seat;
  isSelected: boolean;
  onSeatSelect: (seat: Seat) => void;
}
