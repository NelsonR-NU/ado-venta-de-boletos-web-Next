import { StaticImageData } from "next/image";

// Route item used in TripRoute
export interface RouteItem {
  hour: string;
  location: string;
}

// Trip info props
export interface TripInfoCardProps {
  onCardSelection?: (props: TripInfoCardProps) => void;
  onClickModify?: () => void;
  showBorder?: boolean;
  showButton?: boolean;
  asientosLibre?: number;
  logo?: StaticImageData;
  fecHorSal?: string;
  duracion?: string;
  fecHorLlegada?: string;
  descOrigenTerminal?: string;
  descDestinoTerminal?: string;
  precio?: { precio: number }[];
  isSelected?: boolean;
  disabledBtn?: boolean;
  className?: string;
}

// Amenity item used in Amenities component
export interface AmenityItem {
  icon: StaticImageData;
  title: string;
}

// Main TicketCard props
export interface TicketCardProps {
  onCardSelection: (props: TripInfoCardProps) => void;
  displayDetails?: boolean;
  asientosLibre?: number;
  logo?: StaticImageData;
  fecHorSal?: string;
  duracion?: string;
  fecHorLlegada?: string;
  descOrigenTerminal?: string;
  descDestinoTerminal?: string;
  precio?: { precio: number }[];
  isSelected?: boolean;
  className?: string;
  // Explicitly define common function types instead of using index signature for function
}
