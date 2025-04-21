import React, { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";
import { BusStructure, Seat as SeatType } from "@/types/components/BusSeatsSelection";
import BusGridCell from "../BusGridCell/BusGridCell";
import { SeatsGridProps, TVInfo } from "@/types/components/BusSeatsSelection/SeatsGrid/SeatsGrid";

const SeatsGrid: React.FC<SeatsGridProps> = ({
  isLoading,
  seats,
  busStructure,
  checkIfSelected,
  quantity,
  tripInfo,
  trip,
  handleSeatSelection,
  tvInfo,
}) => {
  // Loading skeleton when data isn't available yet
  if (isLoading || !seats || !busStructure) {
    return (
      <div className="grid grid-cols-12 gap-2">
        {renderLoadingSkeleton(busStructure?.filas || 5)}
      </div>
    );
  }

  const rowCount = busStructure.filas || 5;
  const tvColumnCount = Object.keys(tvInfo.tvColumnMappings).length;
  const expandedColCount = 12 + tvColumnCount;

  // Create the seat grid with TV columns
  const seatGrid = createSeatGrid(seats, rowCount, expandedColCount, tvInfo);

  const currentTrip = tripInfo[trip];
  const selectedSeats = currentTrip?.selectedSeats || [];
  const atMaxCapacity = quantity > 1 && selectedSeats.length >= quantity;

  const gridRows = createGridRows(
    rowCount,
    expandedColCount,
    seatGrid,
    busStructure,
    tvInfo,
    checkIfSelected,
    atMaxCapacity,
    handleSeatSelection
  );

  return <div className="flex flex-col space-y-2">{gridRows}</div>;
};

function renderLoadingSkeleton(rowCount: number): ReactNode[] {
  const elements: ReactNode[] = [];
  const colCount = 10;

  for (let i = 0; i < rowCount * colCount; i++) {
    elements.push(
      <div key={`skeleton-${i}`} className="flex h-[42px] w-[42px] self-center">
        <Skeleton
          className="h-full w-full !rounded-xl"
          baseColor="#E5E7EB"
          highlightColor="#F3F4F6"
        />
      </div>
    );
  }

  return elements;
}

// Create a 2D grid with seats positioned according to the bus structure
function createSeatGrid(
  seats: SeatType[],
  rowCount: number,
  colCount: number,
  tvInfo: TVInfo
): (SeatType | null)[][] {
  // Initialize empty grid
  const grid: (SeatType | null)[][] = Array(rowCount)
    .fill(null)
    .map(() => Array(colCount).fill(null));

  // Place seats in grid
  seats.forEach((seat) => {
    if (!seat.fila || !seat.columna) return;

    // Calculate position with TV column adjustments
    const row = seat.fila - 1;
    let col = seat.columna;

    // Shift for TV columns
    Object.keys(tvInfo.tvColumnMappings).forEach((originalCol) => {
      const origColNum = parseInt(originalCol);
      if (col >= origColNum) {
        col++;
      }
    });

    // Convert to 0-indexed
    col = col - 1;

    // Place seat if in valid range
    if (row >= 0 && row < rowCount && col >= 0 && col < colCount) {
      grid[row][col] = seat;
    }
  });

  return grid;
}

// Create the grid rows with cells
function createGridRows(
  rowCount: number,
  colCount: number,
  seatGrid: (SeatType | null)[][],
  busStructure: BusStructure,
  tvInfo: TVInfo,
  checkIfSelected: (asiento: string) => boolean,
  atMaxCapacity: boolean,
  handleSeatSelection: (seat: SeatType) => void
): ReactNode[] {
  const rows: ReactNode[] = [];

  for (let row = 0; row < rowCount; row++) {
    const cells: ReactNode[] = [];

    for (let col = 0; col < colCount; col++) {
      const key = `grid-${row}-${col}`;

      // Check if this is a TV column
      const { isTV, isTVColumn } = checkIfTVPosition(row, col, tvInfo);

      // Get the seat at this position
      const seat = seatGrid[row][col];

      if (isTVColumn) {
        // Render TV cell
        cells.push(renderTVCell(key, isTV));
      } else {
        // For regular columns, get the original column in bus structure
        const originalCol = mapExpandedToOriginalColumn(col + 1, tvInfo);

        // Check for special cell types
        const isSpace = checkCellType(row, originalCol, "espacio", busStructure);
        const isWC = checkCellType(row, originalCol, "wc", busStructure);
        const isSelected = seat ? checkIfSelected(seat.asiento) : false;

        // Render regular cell
        cells.push(
          renderRegularCell(
            key,
            seat,
            isWC,
            isSpace,
            isSelected,
            atMaxCapacity && !isSelected,
            handleSeatSelection
          )
        );
      }
    }

    // Add the row to the grid
    rows.push(
      <div key={`row-${row}`} className="flex justify-center space-x-2">
        {cells}
      </div>
    );
  }

  return rows;
}

// Check if a position is a TV column/position
function checkIfTVPosition(
  row: number,
  col: number,
  tvInfo: TVInfo
): { isTV: boolean; isTVColumn: boolean } {
  let isTV = false;
  let isTVColumn = false;

  Object.entries(tvInfo.tvPositionsInExpandedGrid).forEach(([tvCol, tvRows]) => {
    const tvColNum = parseInt(tvCol);
    if (col === tvColNum - 1) {
      isTVColumn = true;
      if (tvRows.includes(row + 1)) {
        isTV = true;
      }
    }
  });

  return { isTV, isTVColumn };
}

// Map expanded grid column back to original column
function mapExpandedToOriginalColumn(expandedCol: number, tvInfo: TVInfo): number {
  let originalCol = expandedCol;

  Object.entries(tvInfo.tvColumnMappings).forEach(([, tvCol]) => {
    const tvColNum = parseInt(tvCol.toString());
    if (expandedCol > tvColNum) {
      originalCol--;
    }
  });

  return originalCol;
}

// Check if a cell is of a specific type
function checkCellType(
  row: number,
  col: number,
  tipo: string,
  busStructure: BusStructure
): boolean {
  return busStructure.estructura.some(
    (item) => item.tipo === tipo && item.fila === row + 1 && item.columna === col
  );
}

// Render a TV cell
function renderTVCell(key: string, isTV: boolean): ReactNode {
  return (
    <div key={key} className="w-[42px] h-[42px] flex items-center justify-center">
      <BusGridCell
        seat={null}
        isWC={false}
        isSpace={!isTV}
        isTV={isTV}
        isSelected={false}
        atMaxCapacity={false}
        onSeatSelect={() => {}}
      />
    </div>
  );
}

// Render a regular cell
function renderRegularCell(
  key: string,
  seat: SeatType | null,
  isWC: boolean,
  isSpace: boolean,
  isSelected: boolean,
  atMaxCapacity: boolean,
  handleSeatSelection: (seat: SeatType) => void
): ReactNode {
  return (
    <div key={key} className="w-[42px] h-[42px] flex items-center justify-center">
      <BusGridCell
        seat={seat}
        isWC={isWC}
        isSpace={isSpace}
        isTV={false}
        isSelected={isSelected}
        atMaxCapacity={atMaxCapacity}
        onSeatSelect={handleSeatSelection}
      />
    </div>
  );
}

export default SeatsGrid;
