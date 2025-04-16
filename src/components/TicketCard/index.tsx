import Image from "next/image";
import { FC, useState } from "react";
import Button from "@/components/ui/Button";
import { RouteItem, TicketCardProps, TripInfoCardProps } from "@/types/components/TicketCard";
import FavoriteIcon from "@/assets/svg/favorite.svg";
import ShareIcon from "@/assets/svg/share.svg";
import rightArrow from "@/assets/svg/right-arrow.svg";
import InfoIcon from "@/assets/svg/information.svg";
import TripRoute from "@/components/TripRoute";
import Amenities from "@/components/Amenities";
import { formatHourFromDate } from "@/utils/date";
import { formatPrice } from "@/utils/price";
import DrawerModal from "@/components/Drawer";

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

const TicketCard: FC<TicketCardProps> = ({ onCardSelection, displayDetails = false, ...props }) => {
  const [showDetails, setShowDetails] = useState(displayDetails);
  const {
    asientosLibre,
    logo,
    fecHorSal,
    duracion,
    fecHorLlegada,
    descOrigenTerminal,
    descDestinoTerminal,
    precio,
  } = props;

  const onClickDetails = () => {};

  const handleTripInfoCardClick = () => {
    const tripInfoCardProps: TripInfoCardProps = {
      ...props,
    };
    onCardSelection(tripInfoCardProps);
  };

  return (
    <div className="flex-col rounded-xl shadow-[0px_4px_10px_2px_#e2e8f0] bg-ado-white overflow-hidden global-transition">
      <DrawerModal isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <div className="flex flex-col gap-10">
          <TripRoute routes={tripItinerary} show={showDetails} />
          <Amenities />
        </div>
      </DrawerModal>
      {/* Main trip information section */}
      <div className="flex items-center justify-between px-5 py-5 w-full bg-white">
        {/* Logo */}
        {logo && (
          <div className="pr-5 border-r-[1.5px] border-dashed border-ado-light-grey">
            <Image alt="logo" src={logo} width={60} height={40} />
          </div>
        )}

        {/* Time and location information */}
        <div className="flex-col flex-1 px-5">
          <div className="flex items-center gap-3 w-full">
            <div className="flex-col items-start">
              <span className="text-[1.25rem] font-bold">
                {fecHorSal ? formatHourFromDate(fecHorSal) : "08:00"} h
              </span>
              <span className="text-[0.875rem] text-ado-dark-grey">
                {descOrigenTerminal || "Central México Norte, CDMX"}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="h-[1px] flex-1 border-t border-dashed border-ado-light-grey"></span>
              <span className="text-[0.875rem] whitespace-nowrap text-ado-dark-grey">
                {duracion || "5 h 10 min."} aprox.
              </span>
              <span className="h-[1px] flex-1 border-t border-dashed border-ado-light-grey"></span>
            </div>

            <div className="flex-col items-end">
              <span className="text-[1.25rem] font-bold text-right">
                {fecHorLlegada ? formatHourFromDate(fecHorLlegada) : "13:10"} h
              </span>
              <span className="text-[0.875rem] text-ado-dark-grey text-right">
                {descDestinoTerminal || "Acapulco Costera, Gro."}
              </span>
            </div>
          </div>
        </div>

        {/* Price and select button */}
        <div className="flex items-center gap-5 border-l-[1.5px] border-dashed border-ado-light-grey pl-5">
          <div className="flex-col items-end">
            {precio && precio.length >= 2 ? (
              <>
                <span className="text-ado-dark-grey text-[0.875rem] line-through text-nowrap">
                  {formatPrice(precio[0]?.precio)}
                </span>
                <span className="font-bold text-[1.5rem] text-nowrap">
                  {formatPrice(precio[1]?.precio)} <span className="text-[1rem]">MXN</span>
                </span>
              </>
            ) : (
              <span className="font-bold text-[1.5rem] text-nowrap">
                {precio && precio[0] ? `${formatPrice(precio[0]?.precio)} MXN` : "$1,200.00 MXN"}
              </span>
            )}
          </div>
          <Button
            onClick={handleTripInfoCardClick}
            buttonText="Seleccionar"
            disabled={asientosLibre === 0}
            variant="primary"
            buttonStyle="filled"
            className="min-w-[140px]"
          />
        </div>
      </div>

      {/* Footer section with icons and details */}
      <div className="flex items-center justify-between px-5 py-3 bg-ado-blueish-grey border-t-[1px] border-ado-light-grey">
        <div className="flex items-center gap-3">
          <Image alt="" src={FavoriteIcon} height={24} width={24} className="cursor-pointer" />
          <Image alt="" src={ShareIcon} height={24} width={24} className="cursor-pointer" />
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1">
            <span className="text-[0.75rem]">Viaje local</span>
            <Image alt="" src={InfoIcon} height={16} width={16} className="cursor-pointer" />
          </div>
          <span className="text-[0.75rem] px-4 border-x-[1.5px] border-dashed border-ado-light-grey">
            Servicio Lujo
          </span>
          <span
            className={`text-[0.75rem] ${asientosLibre && asientosLibre > 0 && asientosLibre <= 7 ? "text-ado-golden font-medium" : ""} ${asientosLibre === 0 ? "text-ado-red font-medium" : ""}`}>
            {asientosLibre === 0 ? "Corrida agotada" : `Quedan ${asientosLibre || 25} asientos`}
          </span>
        </div>
        <div
          className="flex items-center gap-2 text-[1rem] text-ado-red font-medium cursor-pointer"
          onClick={onClickDetails}
          data-collapse-target="collapse">
          <span className="text-[1rem] text-ado-purple font-semibold">Más información</span>
          <Image src={rightArrow} alt="right arrow" width={12} height={12} />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
