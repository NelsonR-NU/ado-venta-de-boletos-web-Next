import React from "react";
import Seat from "@/components/Bus/Seats/Seat";
import Tv from "@/assets/svg/tv.svg";
import Image from "next/image";
import { BusGridCellProps, EmptyCellProps } from "@/types/components/BusSeatsSelection/BusGridCell";

const BusGridCell: React.FC<BusGridCellProps> = ({
  seat,
  isWC,
  isSpace,
  isSelected,
  onSeatSelect,
  isTV = false,
}) => {
  if (seat) {
    return <Seat seat={seat} isSelected={isSelected} onSeatSelect={onSeatSelect} />;
  }

  if (isWC) return <WCCell />;
  if (isTV) return <TVCell />;

  return <EmptyCell isSpace={isSpace} />;
};

// Bathroom cell
const WCCell = () => (
  <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm">
    <div className="text-xs font-bold text-ado-purple">WC</div>
  </div>
);

const TVCell = () => (
  <div className="w-8 h-8 rounded-md flex items-center justify-center">
    <Image src={Tv} alt="TV" width={20} height={20} />
  </div>
);

const EmptyCell = ({ isSpace }: EmptyCellProps) => (
  <div className="w-10 h-10 flex items-center justify-center">{isSpace ? null : ""}</div>
);

export default BusGridCell;
