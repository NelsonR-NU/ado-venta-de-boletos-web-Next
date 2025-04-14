import React from "react";
import Image from "next/image";
import SeatOccupied from "@/assets/svg/seat-occupied.svg";
import SeatSelected from "@/assets/svg/seat-selected.svg";
import SeatAvailable from "@/assets/svg/seat-available.svg";
import { SeatProps } from "@/types/components/BusSeatsSelection/Seat";

const Seat: React.FC<SeatProps> = ({ seat, isSelected, onSeatSelect }) => {
  const isOccupied = seat.estatus === "OC";

  return (
    <div
      onClick={() => !isOccupied && onSeatSelect(seat)}
      className={`
        relative flex items-center justify-center
        ${isOccupied ? "cursor-default" : "cursor-pointer group"}
        transition-all duration-300 ease-in-out
        w-10 h-10
      `}>
      <Image
        className="select-none transition-all duration-500 ease-in-out"
        alt={`seat-${seat.asiento}`}
        src={isOccupied ? SeatOccupied : isSelected ? SeatSelected : SeatAvailable}
        width={38}
        height={38}
      />
      <span
        className={`
        ${isSelected || isOccupied ? "text-ado-white group-hover:text-ado-white" : "text-ado-purple"}
        absolute text-[0.766rem] font-medium
        transition-colors duration-500 ease-in-out
        z-10
      `}>
        {seat.asiento}
      </span>
    </div>
  );
};

export default Seat;
