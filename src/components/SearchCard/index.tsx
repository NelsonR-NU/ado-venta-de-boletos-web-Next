import React from "react";
import SearchDropDown from "../SearchDropDown";
import SearchPassengerDropDown from "../SearchPassengerDropDown";

type PassengerType = "Adult" | "Child" | "INAPAM" | "Teacher" | "Student";

interface SearchCardProps {
  width: number;
  cardName: string;
  value: string;
  isOpen: boolean;
  isPassenger: boolean;
  toggleDropdown: (cardName: string) => void;
  dropdownContent: string[];
  onSelect?: (cardName: string, value: string) => void;
  updatePassengerCount?: (type: PassengerType, delta: number) => void;
  passengerValues?: {
    Adult: number;
    Child: number;
    INAPAM: number;
    Teacher: number;
    Student: number;
  };
  handlePassengersSelection?: () => void;
}

const SearchCard: React.FC<SearchCardProps> = ({
  width,
  cardName,
  value,
  isOpen,
  isPassenger,
  toggleDropdown,
  dropdownContent,
  onSelect,
  updatePassengerCount,
  passengerValues,
  handlePassengersSelection,
}) => {
  const recentearches = ["Mérida Centro Histórico, Mér.", "Oaxaca de Juárez, Oax."];
  const originTerminals = ["Campeche", "Chiapas", "Ciudad de México", "Guerrero"];

  const handleSelection = (cardName: string, value: string) => onSelect?.(cardName, value);

  return (
    <div className="relative" style={{ width: `${width}%` }}>
      {/* Search Card */}
      <div
        className="w-full bg-white border-2 border-ado-search-border flex flex-col justify-start px-2 py-1 rounded-[4px] cursor-pointer"
        onClick={() => toggleDropdown(cardName)}>
        <p className="text-[12px] text-[#1D1F24]">{cardName}</p>
        <p className="text-[14px] font-medium truncate w-full " title={value}>
          {value}
        </p>
      </div>

      {/* Dropdown */}
      {isOpen && !isPassenger && (
        <SearchDropDown
          recentSearches={recentearches}
          originTerminals={originTerminals}
          cardName={cardName}
          onSelect={handleSelection}
        />
      )}

      {isOpen && isPassenger && (
        <SearchPassengerDropDown
          updatePassengerCount={updatePassengerCount}
          passengerValues={passengerValues}
          handlePassengersSelection={handlePassengersSelection}
        />
      )}
    </div>
  );
};

export default SearchCard;
