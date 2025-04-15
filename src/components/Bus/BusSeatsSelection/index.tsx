import React, { FC, useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { BusSeatsProps, Seat } from "@/types/components/BusSeatsSelection";
import { useTranslations } from "next-intl";
import { convertServerStructureToSeats, findTVPositions } from "@/utils/busStructure";
import BusHeader from "@/components/Bus/BusHeader/BusHeader";
import SeatLegend from "@/components/Bus/SeatsLegend/SeatLegend";
import BusLayout from "@/components/Bus/BusLayout/BusLayout";
import { TVInfo } from "@/types/components/BusSeatsSelection/SeatsGrid/SeatsGrid";

const BusSeatsSelection: FC<BusSeatsProps> = ({
  activeTab,
  setActiveTab,
  tripInfo,
  setTripInfo,
  session,
  setSession,
  quantity = 2,
  busStructure = null,
}) => {
  const [busSeats, setBusSeats] = useState<Record<string, Seat[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [tvInfo, setTvInfo] = useState<TVInfo>({
    columns: [],
    positions: {},
    tvColumnMappings: {},
    tvPositionsInExpandedGrid: {},
  });

  const [localSelectedSeats, setLocalSelectedSeats] = useState<
    Record<string, Array<{ seatNumber: number; seatId: string }>>
  >({
    salida: [],
    regreso: [],
  });

  const t = useTranslations("booking");
  const trip = activeTab;
  const tripDirection = activeTab === "salida" ? t("departure") : t("return");

  // Sync selected seats with tripInfo
  useEffect(() => {
    setLocalSelectedSeats({
      salida: tripInfo?.salida?.selectedSeats || [],
      regreso: tripInfo?.regreso?.selectedSeats || [],
    });
  }, [tripInfo]);

  // Process bus structure and load seats
  useEffect(() => {
    const loadBusSeats = async () => {
      if (!busStructure || busSeats[trip]) return;

      setIsLoading(true);
      try {
        // Process the bus structure
        const seats = convertServerStructureToSeats(busStructure);
        const tvPositions = findTVPositions(busStructure);
        setTvInfo(tvPositions);

        // Mark seats that are already selected
        const updatedSeats = seats.map((seat) => ({
          ...seat,
          estatus: localSelectedSeats[trip]?.some((s) => s.seatNumber === parseInt(seat.asiento))
            ? "SE"
            : seat.estatus,
        }));

        setBusSeats((prev) => ({ ...prev, [trip]: updatedSeats }));
      } catch {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadBusSeats();
  }, [trip, busStructure, busSeats, localSelectedSeats]);

  const handleSeatSelection = (seat: Seat) => {
    if (seat.estatus === "OC") return;

    setSession({ ...session, startTimer: true });

    const currentTrip = tripInfo[trip] || { idCorrida: "" };
    const seatNumber = parseInt(seat.asiento);
    const selectedSeats = [...localSelectedSeats[trip]];
    const seatIndex = selectedSeats.findIndex((s) => s.seatId === seat.seatId);
    const isSelected = seatIndex !== -1;

    let updatedSelectedSeats: Array<{ seatNumber: number; seatId: string }>;

    if (quantity === 1) {
      updatedSelectedSeats = isSelected ? [] : [{ seatNumber, seatId: seat.seatId }];
    } else {
      if (isSelected) {
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

    const selectedSeat = updatedSelectedSeats[0]?.seatNumber;
    const seatId = updatedSelectedSeats[0]?.seatId;

    setTripInfo({
      ...tripInfo,
      [trip]: {
        ...currentTrip,
        selectedSeat,
        seatId,
        selectedSeats: updatedSelectedSeats,
      },
    });

    if (trip === "salida" && !tripInfo.regreso?.selectedSeat && updatedSelectedSeats.length > 0) {
      setActiveTab("regreso");
    }

    if (busSeats[trip]) {
      const updatedSeats = busSeats[trip].map((s) => {
        const isSeatSelected = updatedSelectedSeats.some(
          (selected) => selected.seatId === s.seatId
        );

        return {
          ...s,
          estatus: isSeatSelected ? "SE" : s.estatus === "SE" ? "DI" : s.estatus,
        };
      });

      setBusSeats({
        ...busSeats,
        [trip]: updatedSeats,
      });
    }
  };

  const getSelectedSeat = (asiento: string) =>
    localSelectedSeats[trip]?.some((s) => s.seatNumber === parseInt(asiento)) || false;

  const selectedSeatsCount = localSelectedSeats[trip]?.length || 0;

  return (
    <div className="w-full flex flex-col gap-4">
      <BusHeader tripInfo={tripInfo} tripDirection={tripDirection} />
      <SeatLegend quantity={quantity} selectedSeatsCount={selectedSeatsCount} />
      <BusLayout
        isLoading={isLoading}
        seats={busSeats[trip]}
        busStructure={busStructure}
        checkIfSelected={getSelectedSeat}
        quantity={quantity}
        tripInfo={tripInfo}
        trip={trip}
        handleSeatSelection={handleSeatSelection}
        tvInfo={tvInfo}
      />
    </div>
  );
};

export default BusSeatsSelection;
