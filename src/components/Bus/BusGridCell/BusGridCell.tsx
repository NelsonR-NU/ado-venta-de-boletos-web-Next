import React from "react";
import Seat from "@/components/Bus/Seats/Seat";
import Tv from "@/assets/svg/tv.svg";
import Image from "next/image";
import { BusGridCellProps } from "@/types/components/BusSeatsSelection/BusGridCell";

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

  if (isWC) {
    return (
      <div className="bg-gray-300 w-10 h-10 rounded-md flex items-center justify-center text-xs font-bold">
        WC
      </div>
    );
  }

  if (isTV) {
    return (
      <div className="w-8 h-8 rounded-md flex items-center justify-center">
        <Image src={Tv} alt="TV" width={20} height={20} />
      </div>
    );
  }

  // Empty space or aisle
  return <div className="w-10 h-10 flex items-center justify-center">{isSpace ? null : ""}</div>;
};

export default BusGridCell;
