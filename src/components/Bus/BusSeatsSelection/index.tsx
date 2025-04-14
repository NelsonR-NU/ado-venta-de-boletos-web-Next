import React from "react";
import { FC, useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { BusSeatsProps, Seat, TripInfo } from "@/types/components/BusSeatsSelection";
import { useTranslations } from "next-intl";
import { convertServerStructureToSeats, findTVPositions } from "@/utils/busStructureHelper";
import BusHeader from "@/components/Bus/BusHeader/BusHeader";
import SeatLegend from "@/components/Bus/SeatsLegend/SeatLegend";
import BusLayout from "@/components/Bus/BusLayout/BusLayout";

const dataMap = {
  salida: "salida",
  regreso: "regreso",
} as const;

const BusSeatsSelection: FC<BusSeatsProps> = ({
  activeTab,
  setActiveTab,
  tripInfo,
  setTripInfo,
  session,
  setSession,
  quantity = 2,
  // New prop to receive the bus structure from server
  busStructure = null,
}) => {
  const [busSeats, setBusSeats] = useState<Record<string, Seat[]>>();
  const [isLoading, setIsLoading] = useState(true);
  const [tvInfo, setTvInfo] = useState<{
    columns: number[];
    positions: Record<number, number[]>;
    tvColumnMappings: Record<number, number>;
    tvPositionsInExpandedGrid: Record<number, number[]>;
  }>({ columns: [], positions: {}, tvColumnMappings: {}, tvPositionsInExpandedGrid: {} });
  const [localSelectedSeats, setLocalSelectedSeats] = useState<
    Record<string, Array<{ seatNumber: number; seatId: string }>>
  >({
    salida: [],
    regreso: [],
  });
  const t = useTranslations("booking");

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
        if (busStructure) {
          // Process the bus structure from server
          const seats = convertServerStructureToSeats(busStructure);
          const { columns, positions, tvColumnMappings, tvPositionsInExpandedGrid } =
            findTVPositions(busStructure);

          setTvInfo({ columns, positions, tvColumnMappings, tvPositionsInExpandedGrid });

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
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!busSeats?.[trip]) fetchBusSeats();
  }, [activeTab, trip, busSeats, localSelectedSeats, busStructure]);

  const handleSeatSelection = (seat: Seat) => {
    if (seat.estatus === "OC") return;

    // Start the timer when a seat is selected
    setSession({ ...session, startTimer: true });

    const currentTrip = tripInfo[trip] || { idCorrida: "" };
    const seatNumber = parseInt(seat.asiento);

    const selectedSeats = [...localSelectedSeats[trip]];

    // Check if the seat is already selected
    const seatIndex = selectedSeats.findIndex((s) => s.seatId === seat.seatId);
    const isSelected = seatIndex !== -1;

    // Initialize the updated selected seats array
    let updatedSelectedSeats: Array<{ seatNumber: number; seatId: string }>;

    if (quantity === 1) {
      if (isSelected) {
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
        updatedSelectedSeats = [...selectedSeats, { seatNumber, seatId: seat.seatId }];
      } else {
        return;
      }
    }

    setLocalSelectedSeats({
      ...localSelectedSeats,
      [trip]: updatedSelectedSeats,
    });

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
    if (localSelectedSeats[trip]?.some((s) => s.seatNumber === parseInt(asiento))) {
      return true;
    }

    const currentTrip = tripInfo[trip];
    if (currentTrip?.selectedSeats?.some((s) => s.seatNumber === parseInt(asiento))) {
      return true;
    }

    return (
      currentTrip?.selectedSeat === parseInt(asiento) ||
      busSeats?.[trip]?.find((s) => s.asiento === asiento)?.estatus === "SE"
    );
  };

  const selectedSeatsCount = localSelectedSeats[trip]?.length || 0;

  return (
    <div className="w-full flex flex-col gap-4 p-5">
      <BusHeader tripDirection={tripDirection} />
      <SeatLegend quantity={quantity} selectedSeatsCount={selectedSeatsCount} />
      <BusLayout
        isLoading={isLoading}
        seats={busSeats?.[trip]}
        busStructure={busStructure}
        checkIfSelected={getSelectedSeat}
        quantity={quantity}
        tripInfo={tripInfo as TripInfo}
        trip={trip as "salida" | "regreso"}
        handleSeatSelection={handleSeatSelection}
        tvInfo={tvInfo}
      />
    </div>
  );
};

export default BusSeatsSelection;
