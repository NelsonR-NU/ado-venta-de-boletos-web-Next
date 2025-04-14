import React, { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";
import { Seat as SeatType } from "@/types/components/BusSeatsSelection";
import BusGridCell from "../BusGridCell/BusGridCell";
import { SeatsGridProps } from "@/types/components/BusSeatsSelection/SeatsGrid/SeatsGrid";

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
  const renderSeatSkeleton = (index: number) => (
    <div key={`skeleton-${index}`} className="flex h-[42px] w-[42px] self-center">
      <Skeleton
        className="h-full w-full !rounded-xl"
        baseColor="#E5E7EB"
        highlightColor="#F3F4F6"
      />
    </div>
  );

  const renderSkeletonGrid = () => {
    const elements: React.ReactNode[] = [];
    const rowCount = busStructure?.filas || 5;
    // Calculate expanded column count (regular columns + TV columns)
    const colCount = 12 + (tvInfo.columns.length || 0);

    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        const index = row + col * rowCount;
        elements.push(renderSeatSkeleton(index));
      }
    }

    return elements;
  };

  // If we're loading or don't have data yet, render a skeleton
  if (isLoading || !seats || !busStructure) {
    return <div className="grid grid-cols-12 gap-2">{renderSkeletonGrid()}</div>;
  }

  const rowCount = busStructure.filas || 5;
  // Calculate the number of TV columns that will be added
  const tvColumnCount = Object.keys(tvInfo.tvColumnMappings).length;
  // Total columns in expanded grid = original columns + TV columns
  const expandedColCount = 12 + tvColumnCount;

  // Create a 2D grid representation for the expanded grid
  const seatGrid: (SeatType | null)[][] = Array(rowCount)
    .fill(null)
    .map(() => Array(expandedColCount).fill(null));

  // Place seats in the grid, adjusting for TV columns
  seats.forEach((seat) => {
    if (seat.fila && seat.columna) {
      // Adjust for 0-indexed array
      const row = seat.fila - 1;

      // Calculate expanded column position
      // If the column has TV seats or comes after a TV column, we need to shift it
      let expandedCol = seat.columna;

      // Apply shift for each TV column that comes before this seat's column
      Object.entries(tvInfo.tvColumnMappings).forEach(([originalCol]) => {
        const originalColNum = parseInt(originalCol);
        // Only apply shift if seat column is defined and affected by this TV column
        if (seat.columna && seat.columna >= originalColNum) {
          // This TV column affects our seat position, shift it right
          expandedCol++;
        }
      });

      // Adjust for 0-indexed array after expansion calculation
      expandedCol = expandedCol - 1;

      if (row >= 0 && row < rowCount && expandedCol >= 0 && expandedCol < expandedColCount) {
        seatGrid[row][expandedCol] = seat;
      }
    }
  });

  // Get current selections to determine if we're at max capacity
  const currentTrip = tripInfo[trip];
  const selectedSeats = currentTrip?.selectedSeats || [];
  const atMaxCapacity = quantity > 1 && selectedSeats.length >= quantity;

  // Create grid cells for rendering
  const gridRows: ReactNode[] = [];

  // Render the grid row by row
  for (let row = 0; row < rowCount; row++) {
    const rowCells: ReactNode[] = [];

    for (let col = 0; col < expandedColCount; col++) {
      const key = `grid-${row}-${col}`;

      // Check if this is a TV column
      let isTV = false;
      let isTVColumn = false;

      // Check each TV column mapping to see if this is a TV column
      Object.entries(tvInfo.tvPositionsInExpandedGrid).forEach(([tvCol, tvRows]) => {
        const tvColNum = parseInt(tvCol);
        if (col === tvColNum - 1) {
          // Convert to 0-indexed
          isTVColumn = true;
          // Is this a position where a TV should be placed?
          if (tvRows.includes(row + 1)) {
            // Convert to 1-indexed for comparison
            isTV = true;
          }
        }
      });

      // Get the seat at this position (if any)
      const seat = seatGrid[row][col];

      // If this is a TV column, handle accordingly
      if (isTVColumn) {
        // For TV columns, we only render TV or empty space
        rowCells.push(
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
        continue;
      }

      // For regular columns, proceed as before
      // Check if this is a space or WC position
      const originalCol = col + 1;
      let adjustedOriginalCol = originalCol;

      // Convert expanded column back to original column for structure lookup
      Object.entries(tvInfo.tvColumnMappings).forEach(([, tvCol]) => {
        const tvColNum = parseInt(tvCol.toString());
        if (originalCol > tvColNum) {
          adjustedOriginalCol--;
        }
      });

      const isSpace = busStructure.estructura.some(
        (item) =>
          item.tipo === "espacio" && item.fila === row + 1 && item.columna === adjustedOriginalCol
      );

      const isWC = busStructure.estructura.some(
        (item) =>
          item.tipo === "wc" && item.fila === row + 1 && item.columna === adjustedOriginalCol
      );

      const isSelected = seat ? checkIfSelected(seat.asiento) : false;

      rowCells.push(
        <div key={key} className="w-[42px] h-[42px] flex items-center justify-center">
          <BusGridCell
            seat={seat}
            isWC={isWC}
            isSpace={isSpace}
            isTV={false}
            isSelected={isSelected}
            atMaxCapacity={atMaxCapacity && !isSelected}
            onSeatSelect={handleSeatSelection}
          />
        </div>
      );
    }

    // Add the completed row to the grid
    gridRows.push(
      <div key={`row-${row}`} className="flex justify-center space-x-2">
        {rowCells}
      </div>
    );
  }

  // Return the grid as rows of cells
  return <div className="flex flex-col space-y-2">{gridRows}</div>;
};

export default SeatsGrid;
