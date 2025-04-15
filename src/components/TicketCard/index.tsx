import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/Button";
import TripInfoCard from "@/components/TripInfoCard";
import TripRoute from "@/components/TripRoute";
import Amenities from "@/components/Amenities";
import { RouteItem, TicketCardProps, TripInfoCardProps } from "@/types/components/TicketCard";

// Import SVG icons
// Note: Update these paths to match your project's asset structure
import FavoriteIcon from "@/assets/svg/favorite.svg";
import ShareIcon from "@/assets/svg/share.svg";
import CartIcon from "@/assets/svg/cart.svg";
import CaretDownRedIcon from "@/assets/svg/caret-down-red.svg";

const tripItinerary: RouteItem[] = [
  {
    hour: "10:00 am",
    location: "Central México Norte",
  },
  {
    hour: "10:30 am",
    location: "Mexico Tapo Norte",
  },
  {
    hour: "12:40 am",
    location: "Puebla Capu",
  },
  {
    hour: "13:15 pm",
    location: "Córdoba",
  },
  {
    hour: "14:30 pm",
    location: "La Tinaja",
  },
  {
    hour: "15:10 pm",
    location: "Acayucán",
  },
  {
    hour: "15:50 pm",
    location: "Tuxtla Gutierrez",
  },
  {
    hour: "16:30 pm",
    location: "Huehutla de Reyes",
  },
];

const TicketCard: React.FC<TicketCardProps> = ({
  onCardSelection,
  displayDetails = false,
  ...props
}) => {
  const [showDetails, setShowDetails] = useState(displayDetails);
  const { asientosLibre } = props;

  const onClickDetails = () => setShowDetails(!showDetails);

  // Create a handler for TripInfoCard selection
  const handleTripInfoCardClick = () => {
    // We can create a TripInfoCardProps object from the current props
    const tripInfoCardProps: TripInfoCardProps = {
      ...props,
    };
    onCardSelection(tripInfoCardProps);
  };

  return (
    <div className="flex-col rounded-xl bg-ado-white overflow-hidden shadow global-transition">
      <TripInfoCard
        {...props}
        showButton
        showBorder
        disabledBtn={asientosLibre === 0}
        onCardSelection={handleTripInfoCardClick}
      />
      <div className="flex-col px-5 py-2 bg-ado-blueish-grey border-t-[1px] h-auto border-ado-light-grey transition-all ease-in-out duration-500">
        <div className="justify-between w-full">
          <div className="gap-2">
            <Image alt="" src={FavoriteIcon} height={24} width={24} className="cursor-pointer" />
            <Image alt="" src={ShareIcon} height={24} width={24} className="cursor-pointer" />
            <Image alt="" src={CartIcon} height={24} width={24} className="cursor-pointer" />
          </div>
          <div className="w-[380px]">
            <span className="text-[0.875rem] px-5 min-w-fit">Viaje Local</span>
            <span
              className={`
                text-[0.875rem] px-5 min-w-fit border-x-[1.5px] border-dashed border-ado-light-grey 
                ${asientosLibre && asientosLibre > 0 && asientosLibre <= 7 && "text-ado-golden font-medium"}
                ${asientosLibre === 0 && "text-ado-red font-medium"}
              `}>
              {asientosLibre === 0 ? "Corrida agotada" : `Quedan ${asientosLibre || 0} asientos`}
            </span>
            <span className="text-[0.875rem] px-5 min-w-fit">8 paradas</span>
          </div>
          <span
            className="flex gap-1 text-[1rem] text-ado-red font-medium cursor-pointer"
            onClick={onClickDetails}
            data-collapse-target="collapse">
            {showDetails ? "Ocultar" : "Ver"} detalle
            <Image
              alt=""
              src={CaretDownRedIcon}
              height={8}
              width={8}
              className={showDetails ? "rotate-180" : ""}
            />
          </span>
        </div>
        <div
          className={`flex-col ${showDetails ? `h-[467px] pt-10 snap-center` : "h-0 opacity-0"}`}>
          <div className="gap-14">
            <TripRoute routes={tripItinerary} show={showDetails} />
            <div className="flex-col gap-5 w-full">
              <span className="text-[1rem] font-bold">Mapa</span>
              <div className="justify-between">
                <div className="">
                  <div className="flex-col max-w-[220px]">
                    <span className="text-[0.75rem] font-medium">Salida:</span>
                    <span className="text-[0.625rem]">
                      Central México Norte. Eje Central Lázaro Cárdenas No. 271
                    </span>
                  </div>
                  <div className="flex-col max-w-[220px]">
                    <span className="text-[0.75rem] font-medium">Llegada:</span>
                    <span className="text-[0.625rem]">
                      Ixtaltepec 70140, Independencia 62, 3ra, 70140 Asunción Ixtaltepec, Oax.
                    </span>
                  </div>
                </div>
                <Button
                  className="border-[#C3D7E0] border-[1px] font-medium text-[0.75rem]"
                  variant="primary"
                  buttonStyle="outline"
                  buttonText="Ver Mapa"
                />
              </div>
              <Amenities />
            </div>
          </div>
          <div className="justify-between p-2 mt-8 bg-[#EAEDF5] rounded-md">
            <span className="text-[0.625rem] font-medium">
              La duración del viaje puede variar según las condiciones climáticas o de tránsito.
            </span>
            <span className="text-[0.625rem] font-medium">
              Las mascotas o animales que viajen deberán ir asegurados en una caja transportadora.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
