import { BusStructure, Seat } from "@/types/components/BusSeatsSelection";

export const convertServerStructureToSeats = (busStructure: BusStructure): Seat[] => {
  if (!busStructure?.estructura?.length) {
    return [];
  }

  return busStructure.estructura
    .filter((item) => item.asiento !== null)
    .map((item) => ({
      asiento: item.asiento?.toString().padStart(2, "0") || "",
      estatus: item.estatus === "DP" ? "DI" : "OC",
      seatId: `seat-id-${item.asiento}`,
      tipo: item.tipo,
      columna: item.columna,
      fila: item.fila,
    }));
};

export const findTVPositions = (
  busStructure: BusStructure
): {
  columns: number[];
  positions: Record<number, number[]>;
  tvColumnMappings: Record<number, number>;
  tvPositionsInExpandedGrid: Record<number, number[]>;
} => {
  const tvColumns: number[] = [];
  const positions: Record<number, number[]> = {};
  const tvColumnMappings: Record<number, number> = {};
  const tvPositionsInExpandedGrid: Record<number, number[]> = {};

  if (!busStructure?.estructura?.length) {
    return {
      columns: [],
      positions: {},
      tvColumnMappings: {},
      tvPositionsInExpandedGrid: {},
    };
  }

  busStructure.estructura.forEach((item) => {
    if (item.tipo === "regularTV") {
      const column = item.columna;
      if (!tvColumns.includes(column)) {
        tvColumns.push(column);
        positions[column] = [];
      }
      positions[column].push(item.fila);
    }
  });

  const sortedTvColumns = tvColumns.sort((a, b) => a - b);

  let columnShift = 0;
  for (let i = 1; i <= busStructure.filas * 2; i++) {
    if (sortedTvColumns.includes(i)) {
      // This column has TVs, so insert a TV column before it
      // The TV column will be at position i + columnShift
      // The original column will be shifted to i + columnShift + 1
      tvColumnMappings[i] = i + columnShift;

      tvPositionsInExpandedGrid[i + columnShift] = positions[i];

      columnShift++;
    }
  }

  return {
    columns: sortedTvColumns,
    positions,
    tvColumnMappings,
    tvPositionsInExpandedGrid,
  };
};
