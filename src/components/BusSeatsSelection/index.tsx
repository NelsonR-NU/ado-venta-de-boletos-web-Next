import React, { ReactNode } from "react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BusSeatsProps, Seat } from "@/types/components/BusSeatsSelection";
import { useLocale, useTranslations } from "next-intl";
import GenderMan from "@/assets/svg/gender-man.svg";
import GenderWoman from "@/assets/svg/gender-woman.svg";
import SeatOccupied from "@/assets/svg/seat-occupied.svg";
import SeatSelected from "@/assets/svg/seat-selected.svg";
import SeatAvailable from "@/assets/svg/seat-available.svg";
import Wheel from "@/assets/svg/wheel.svg";
import Tv from "@/assets/svg/tv.svg";
import { formatCurrentDate } from "@/utils/date";

const dataMap = {
  salida: "salida",
  regreso: "regreso",
} as const;

// Generate random TV column positions ensuring they're not adjacent
const generateTVColumns = () => {
  const availableColumns = Array.from({ length: 10 }, (_, i) => i);
  const tvColumns: number[] = [];

  // Select first random column
  const firstIndex = Math.floor(Math.random() * availableColumns.length);
  const firstColumn = availableColumns[firstIndex];
  tvColumns.push(firstColumn);

  // Remove selected column and adjacent columns from available positions
  availableColumns.splice(
    Math.max(0, firstIndex - 1),
    Math.min(3, availableColumns.length - firstIndex + 1)
  );
  // Select second random column from remaining positions
  if (availableColumns.length > 0) {
    const secondIndex = Math.floor(Math.random() * availableColumns.length);
    tvColumns.push(availableColumns[secondIndex]);
  }

  return tvColumns.sort((a, b) => a - b);
};

// Check if a number is divisible by 2 but not by 4
const needsSpacing = (num: number) => num % 2 === 0 && num % 4 !== 0;

// Reorganize seats to go from top to bottom, then left to right
const populateSeats = (tvColumns: number[]) => {
  const seats: Seat[] = [];
  const ROWS = 4;
  const COLS = 9;
  const TV_COLS = 2;
  const TOTAL_COLS = COLS + TV_COLS;

  // Create array of seat numbers first
  const seatNumbers: number[] = [];
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      const seatNumber = row + 1 + col * ROWS;
      if (seatNumber <= 36) {
        seatNumbers.push(seatNumber);
      }
    }
  }

  // Insert seats into final array with TV column gaps
  let seatIndex = 0;
  for (let col = 0; col < TOTAL_COLS; col++) {
    if (!tvColumns.includes(col)) {
      for (let row = 0; row < ROWS; row++) {
        if (seatIndex < seatNumbers.length) {
          seats.push({
            asiento: seatNumbers[seatIndex].toString().padStart(2, "0"),
            estatus: Math.random() > 0.7 ? "OC" : "DI",
            seatId: `mock-seat-id-${seatNumbers[seatIndex]}`,
          });
          seatIndex++;
        }
      }
    }
  }

  return seats;
};

const BusSeatsSelection: FC<BusSeatsProps> = ({
  activeTab,
  setActiveTab,
  tripInfo,
  setTripInfo,
  session,
  setSession,
  quantity = 2,
}) => {
  const [busSeats, setBusSeats] = useState<Record<string, Seat[]>>();
  const [isLoading, setIsLoading] = useState(true);
  const [tvPositions, setTvPositions] = useState<Record<number, number>>({});
  const [tvColumns, setTvColumns] = useState<number[]>([]);
  const [localSelectedSeats, setLocalSelectedSeats] = useState<
    Record<string, Array<{ seatNumber: number; seatId: string }>>
  >({
    salida: [],
    regreso: [],
  });
  const t = useTranslations("booking");
  const locale = useLocale();
  const formattedDate = formatCurrentDate(locale);

  const trip = dataMap[activeTab];
  // Get the translation key for the direction based on activeTab
  const tripDirection = activeTab === "salida" ? t("departure") : t("return");

  useEffect(() => {
    const salidaSeats = tripInfo?.salida?.selectedSeats;
    const regresoSeats = tripInfo?.regreso?.selectedSeats;

    setLocalSelectedSeats({
      salida: salidaSeats || [],
      regreso: regresoSeats || [],
    });
  }, [tripInfo]);

  useEffect(() => {
    const fetchBusSeats = async () => {
      setIsLoading(true);
      try {
        // Generate random TV column positions first
        const newTvColumns = generateTVColumns();
        setTvColumns(newTvColumns);

        // Generate seats with the new TV column positions
        const seats = populateSeats(newTvColumns);

        // Mark seats that are already selected as "SE"
        const updatedSeats = seats.map((seat) => {
          const isSelected = localSelectedSeats[trip]?.some(
            (s) => s.seatNumber === parseInt(seat.asiento)
          );
          return {
            ...seat,
            estatus: isSelected ? "SE" : seat.estatus,
          };
        });

        setBusSeats({ ...busSeats, [trip]: updatedSeats });

        // Generate random TV positions within columns
        const positions: Record<number, number> = {};
        newTvColumns.forEach((col) => {
          positions[col] = Math.floor(Math.random() * 4);
        });
        setTvPositions(positions);
      } catch {
        // Error handling silently
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (!busSeats?.[trip]) fetchBusSeats();
  }, [activeTab, trip, busSeats, localSelectedSeats]);

  const handleSeatSelection = (seat: Seat) => {
    if (seat.estatus === "OC") return;

    // Start the timer when a seat is selected
    setSession({ ...session, startTimer: true });

    const currentTrip = tripInfo[trip] || { idCorrida: "" };
    const seatNumber = parseInt(seat.asiento);

    // Use the local state for current seat selection
    const selectedSeats = [...localSelectedSeats[trip]];

    // Check if the seat is already selected
    const seatIndex = selectedSeats.findIndex((s) => s.seatId === seat.seatId);
    const isSelected = seatIndex !== -1;

    // Initialize the updated selected seats array
    let updatedSelectedSeats: Array<{ seatNumber: number; seatId: string }>;

    if (quantity === 1) {
      // Single seat selection mode
      if (isSelected) {
        // If clicking the already selected seat, unselect it
        updatedSelectedSeats = [];
      } else {
        // If clicking a different seat, select it and unselect any previous seat
        updatedSelectedSeats = [{ seatNumber, seatId: seat.seatId }];
      }
    } else {
      // Multiple seat selection mode
      if (isSelected) {
        // If clicking an already selected seat, unselect it
        updatedSelectedSeats = selectedSeats.filter((s) => s.seatId !== seat.seatId);
      } else if (selectedSeats.length < quantity) {
        // If not at max capacity, add the new seat
        updatedSelectedSeats = [...selectedSeats, { seatNumber, seatId: seat.seatId }];
      } else {
        // If at max capacity, no changes (can't select more seats)
        updatedSelectedSeats = [...selectedSeats];
        return;
      }
    }

    // Update local state
    setLocalSelectedSeats({
      ...localSelectedSeats,
      [trip]: updatedSelectedSeats,
    });

    // For backward compatibility with the existing code
    const selectedSeat =
      updatedSelectedSeats.length > 0 ? updatedSelectedSeats[0].seatNumber : undefined;
    const seatId = updatedSelectedSeats.length > 0 ? updatedSelectedSeats[0].seatId : undefined;

    // Update tripInfo with the selected seat(s)
    const updatedTripInfo = {
      ...tripInfo,
      [trip]: {
        ...currentTrip,
        selectedSeat,
        seatId,
        selectedSeats: updatedSelectedSeats,
      },
    };

    setTripInfo(updatedTripInfo);

    // If we're on salida tab and regreso is not set, move to regreso tab
    if (
      activeTab === "salida" &&
      !tripInfo.regreso?.selectedSeat &&
      updatedSelectedSeats.length > 0
    ) {
      setActiveTab("regreso");
    }

    // Update the seat status in busSeats
    if (busSeats?.[trip]) {
      const updatedSeats = busSeats[trip].map((s) => {
        // Create a copy of the seat
        const seatCopy = { ...s };

        // Check if this seat is in the updated selection
        const isSeatSelected = updatedSelectedSeats.some(
          (selected) => selected.seatId === s.seatId
        );

        // Update the status accordingly
        if (isSeatSelected) {
          seatCopy.estatus = "SE";
        } else if (seatCopy.estatus === "SE") {
          // Only reset if it was previously selected
          seatCopy.estatus = "DI";
        }

        return seatCopy;
      });

      setBusSeats({
        ...busSeats,
        [trip]: updatedSeats,
      });
    }
  };

  const getSelectedSeat = (asiento: string) => {
    // First check our local state which is more reliable
    if (localSelectedSeats[trip]?.some((s) => s.seatNumber === parseInt(asiento))) {
      return true;
    }

    // Then check the tripInfo state
    const currentTrip = tripInfo[trip];
    if (currentTrip?.selectedSeats?.some((s) => s.seatNumber === parseInt(asiento))) {
      return true;
    }

    // Finally check the seat status directly
    return (
      currentTrip?.selectedSeat === parseInt(asiento) ||
      busSeats?.[trip]?.find((s) => s.asiento === asiento)?.estatus === "SE"
    );
  };

  const renderSeatSkeleton = (index: number) => (
    <div
      key={`skeleton-${index}`}
      className={`flex h-[42px] w-[38px] self-center ${needsSpacing(index + 1) ? "mb-4" : ""}`}>
      <Skeleton
        className="h-full w-full !rounded-xl"
        baseColor="#E5E7EB"
        highlightColor="#F3F4F6"
      />
    </div>
  );

  const renderSkeletonGrid = () => {
    const elements: React.ReactNode[] = [];
    const ROWS = 4;
    const TOTAL_COLS = 11;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < TOTAL_COLS; col++) {
        const index = row + col * ROWS;
        elements.push(renderSeatSkeleton(index));
      }
    }

    return elements;
  };

  const renderSeat = (seat: Seat) => {
    const isOccupied = seat.estatus === "OC";
    const isSelected = getSelectedSeat(seat.asiento);
    const icon = isOccupied ? SeatOccupied : isSelected ? SeatSelected : SeatAvailable;

    // Check if at maximum selection capacity
    const currentTrip = tripInfo[trip];
    const selectedSeats = currentTrip?.selectedSeats || [];
    const atMaxCapacity = quantity > 1 && selectedSeats.length >= quantity && !isSelected;

    return (
      <div
        key={seat.asiento}
        className={`flex items-center justify-center ${needsSpacing(parseInt(seat.asiento)) ? "mb-4" : ""}`}>
        <div
          onClick={() => !isOccupied && !atMaxCapacity && handleSeatSelection(seat)}
          className={`
            relative flex items-center justify-center 
            ${isOccupied || atMaxCapacity ? "cursor-default" : "cursor-pointer group"}
            transition-all duration-300 ease-in-out
            transform ${isSelected ? "scale-105" : "scale-100"}
          `}>
          <Image
            className={`
              select-none
              transition-all duration-500 ease-in-out
              ${isSelected ? "scale-105" : "scale-100"}
              ${!isOccupied && !isSelected && !atMaxCapacity ? "group-hover:opacity-0" : ""}
              ${atMaxCapacity ? "opacity-50" : ""}
            `}
            alt={`seat-${seat.asiento}`}
            src={icon}
            width={42}
            height={42}
          />
          {!isOccupied && !isSelected && !atMaxCapacity && (
            <Image
              className={`
                select-none absolute top-0 left-0
                transition-all duration-500 ease-in-out
                opacity-0 group-hover:opacity-50
              `}
              alt={`seat-hover-${seat.asiento}`}
              src={SeatSelected}
              width={42}
              height={42}
            />
          )}
          <span
            className={`
              ${isSelected || isOccupied ? "text-ado-white" : "text-ado-purple group-hover:text-ado-white"}
              absolute -ml-1 text-[0.766rem] font-medium
              transition-colors duration-500 ease-in-out
              z-10
            `}>
            {seat.asiento}
          </span>
        </div>
      </div>
    );
  };

  const renderSeatsGrid = () => {
    if (isLoading || !busSeats?.[trip]) {
      return <div className="grid grid-cols-11 gap-2">{renderSkeletonGrid()}</div>;
    }

    const seats = busSeats[trip];
    const ROWS = 4;
    const elements: ReactNode[] = [];
    let seatIndex = 0;

    // First, organize seats into columns
    const seatColumns: (Seat | null)[][] = [];
    for (let col = 0; col < 11; col++) {
      if (!tvColumns.includes(col)) {
        const column: Seat[] = [];
        for (let row = 0; row < ROWS; row++) {
          if (seatIndex < seats.length) {
            column.push(seats[seatIndex]);
            seatIndex++;
          }
        }
        seatColumns.push(column);
      } else {
        seatColumns.push([null, null, null, null]);
      }
    }

    // Then render by rows to maintain proper grid layout
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < seatColumns.length; col++) {
        const seat = seatColumns[col][row];
        if (tvColumns.includes(col)) {
          elements.push(
            <div
              key={`tv-${col}-${row}`}
              className={`flex items-center justify-center h-[42px] ${needsSpacing(row + 1 + col * ROWS) ? "mb-4" : ""}`}>
              {tvPositions[col] === row && <Image alt="tv" src={Tv} width={24} height={24} />}
            </div>
          );
        } else if (seat) {
          elements.push(renderSeat(seat));
        }
      }
    }

    return elements;
  };

  // Get count of selected seats for display
  const selectedSeatsCount = localSelectedSeats[trip]?.length || 0;

  return (
    <div className="w-full flex flex-col gap-4 p-5">
      <div className="flex justify-between items-center">
        <span className="font-bold text-[1rem]">
          {t("choose_seats", { direction: tripDirection })}
        </span>
        <span className="text-[1rem]">{formattedDate}</span>
      </div>
      <div className="flex gap-5">
        <div className="flex gap-2 items-center">
          <span className="rounded-full w-[10px] h-[10px] border border-ado-purple" />
          <span className="text-[0.875rem]">{t("available")}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="rounded-full bg-[#949596] w-[10px] h-[10px]" />
          <span className="text-[0.875rem]">{t("not_available")}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="rounded-full bg-ado-purple w-[10px] h-[10px]" />
          <span className="text-[0.875rem]">{t("selected")}</span>
        </div>
        {quantity > 1 && (
          <div className="flex gap-2 items-center ml-auto">
            <span className="text-[0.875rem] font-medium">
              {selectedSeatsCount}/{quantity} {t("seats_selected")}
            </span>
          </div>
        )}
      </div>
      <div className="bg-ado-gray w-full py-6 px-6 rounded-[35px]">
        <div className="flex">
          <div className="flex items-end mr-4 px-1 py-3 rounded-l-2xl bg-black bg-opacity-10">
            <Image alt="" src={Wheel} width={42} height={42} />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-11 gap-y-2 gap-x-4">{renderSeatsGrid()}</div>
          </div>
          <div className="flex flex-col rounded-r-2xl px-2 py-3 items-center justify-between ml-4 bg-black bg-opacity-10">
            <Image alt="gender-man" src={GenderMan} width={42} height={42} />
            <Image alt="gender-woman" src={GenderWoman} width={42} height={42} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSeatsSelection;
