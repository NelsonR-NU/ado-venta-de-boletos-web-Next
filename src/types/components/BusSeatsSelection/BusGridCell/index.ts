import { Seat } from "../index";

export interface BusGridCellProps {
  seat: Seat | null;
  isWC: boolean;
  isSpace: boolean;
  isSelected: boolean;
  atMaxCapacity: boolean;
  onSeatSelect: (seat: Seat) => void;
  isTV?: boolean;
}

export interface EmptyCellProps {
  isSpace: boolean;
}
