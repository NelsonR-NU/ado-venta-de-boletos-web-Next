import React, { FC, useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import {
  BusSeatsProps,
  BusStructure,
  Seat,
  Session,
  TripInfo,
} from "@/types/components/BusSeatsSelection";
import { useTranslations } from "next-intl";
import { convertServerStructureToSeats, findTVPositions } from "@/utils/busStructure";
import BusHeader from "@/components/Bus/BusHeader/BusHeader";
import SeatLegend from "@/components/Bus/SeatsLegend/SeatLegend";
import BusLayout from "@/components/Bus/BusLayout/BusLayout";
import { TVInfo } from "@/types/components/BusSeatsSelection/SeatsGrid/SeatsGrid";

export const visualReferenceMock: BusStructure = {
  filas: 5,
  estructura: [
    // Column 1 - R4, R3, X, R2, T1
    { tipo: "regular", estatus: "DP", asiento: 4, columna: 1, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 3, columna: 1, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 1, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 2, columna: 1, fila: 4 },
    { tipo: "regularTV", estatus: "DP", asiento: 1, columna: 1, fila: 5 },

    // Column 2 - R8, R7, X, R6, R5
    { tipo: "regular", estatus: "OC", asiento: 8, columna: 2, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 7, columna: 2, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 2, fila: 3 },
    { tipo: "regular", estatus: "OC", asiento: 6, columna: 2, fila: 4 },
    { tipo: "regular", estatus: "OC", asiento: 5, columna: 2, fila: 5 },

    // Column 3 - R12, O11, X, R10, R9
    { tipo: "regular", estatus: "DP", asiento: 12, columna: 3, fila: 1 },
    { tipo: "regular", estatus: "OC", asiento: 11, columna: 3, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 3, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 10, columna: 3, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 9, columna: 3, fila: 5 },

    // Column 4 - R16, R15, X, R14, R13
    { tipo: "regular", estatus: "DP", asiento: 16, columna: 4, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 15, columna: 4, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 4, fila: 3 },
    { tipo: "regular", estatus: "OC", asiento: 14, columna: 4, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 13, columna: 4, fila: 5 },

    // Column 5 - T20, R19, X, R18, R17
    { tipo: "regularTV", estatus: "DP", asiento: 20, columna: 5, fila: 1 },
    { tipo: "regular", estatus: "OC", asiento: 19, columna: 5, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 5, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 18, columna: 5, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 17, columna: 5, fila: 5 },

    // Column 6 - R24, R23, X, R22, R21
    { tipo: "regular", estatus: "DP", asiento: 24, columna: 6, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 23, columna: 6, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 6, fila: 3 },
    { tipo: "regular", estatus: "OC", asiento: 22, columna: 6, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 21, columna: 6, fila: 5 },

    // Column 7 - R28, R27, X, R26, R25
    { tipo: "regular", estatus: "DP", asiento: 28, columna: 7, fila: 1 },
    { tipo: "regular", estatus: "OC", asiento: 27, columna: 7, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 7, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 26, columna: 7, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 25, columna: 7, fila: 5 },

    // Column 8 - R32, R31, X, R30, R29
    { tipo: "regular", estatus: "DP", asiento: 32, columna: 8, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 31, columna: 8, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 8, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 30, columna: 8, fila: 4 },
    { tipo: "regular", estatus: "OC", asiento: 29, columna: 8, fila: 5 },

    // Column 9 - R36, R35, X, R34, T33
    { tipo: "regular", estatus: "OC", asiento: 36, columna: 9, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 35, columna: 9, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 9, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 34, columna: 9, fila: 4 },
    { tipo: "regularTV", estatus: "DP", asiento: 33, columna: 9, fila: 5 },

    // Column 10 - R40, R39, X, R38, R37
    { tipo: "regular", estatus: "DP", asiento: 40, columna: 10, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 39, columna: 10, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 10, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 38, columna: 10, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 37, columna: 10, fila: 5 },

    // Column 11 - R44, R43, X, R42, R41
    { tipo: "regular", estatus: "DP", asiento: 44, columna: 11, fila: 1 },
    { tipo: "regular", estatus: "DP", asiento: 43, columna: 11, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 11, fila: 3 },
    { tipo: "regular", estatus: "DP", asiento: 42, columna: 11, fila: 4 },
    { tipo: "regular", estatus: "DP", asiento: 41, columna: 11, fila: 5 },

    // Column 12 - WC and empty spaces
    { tipo: "wc", estatus: "OC", asiento: null, columna: 12, fila: 1 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 2 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 3 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 4 },
    { tipo: "espacio", estatus: "OC", asiento: null, columna: 12, fila: 5 },
  ],
};
const mockSession: Session = {
  startTimer: false,
};

export const mockTripInfo: TripInfo = {
  salida: {
    idCorrida: "mock-corrida-id-salida",
    selectedSeat: undefined,
    seatId: undefined,
    selectedSeats: [],
  },
  regreso: {
    idCorrida: "mock-corrida-id-regreso",
    selectedSeat: undefined,
    seatId: undefined,
    selectedSeats: [],
  },
};

const BusSeatsSelection: FC<BusSeatsProps> = ({
  activeTab = "salida",
  setActiveTab,
  tripInfo = mockTripInfo,
  setTripInfo,
  session = mockSession,
  setSession,
  quantity = 2,
  busStructure = visualReferenceMock,
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
