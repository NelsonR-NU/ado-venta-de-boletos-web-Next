import Button from "@/components/ui/Button";
import { formatHourFromDate } from "@/utils/date";
import { formatPrice } from "@/utils/priceFormatter";
import Image from "next/image";
import React from "react";
import { TripInfoCardProps } from "@/types/components/TicketCard";

const TripInfoCard: React.FC<TripInfoCardProps> = ({
  onCardSelection,
  onClickModify,
  showBorder = false,
  showButton = false,
  ...props
}) => {
  const {
    asientosLibre,
    logo,
    fecHorSal,
    duracion,
    fecHorLlegada,
    descOrigenTerminal,
    descDestinoTerminal,
    precio,
    disabledBtn,
    className = "",
  } = props;

  const onClickSelect = () => onCardSelection && onCardSelection(props);

  const borders =
    showBorder &&
    ((asientosLibre &&
      asientosLibre > 0 &&
      asientosLibre <= 7 &&
      "border-t-4 border-t-ado-golden") ||
      (asientosLibre === 0 && "border-t-4 border-t-ado-red"));

  return (
    <div className={`${className} ${borders || ""} flex px-5 py-5 w-full`}>
      {logo && (
        <Image
          alt="logo"
          src={logo}
          width={60}
          height={40}
          className="pr-5 border-r-[1.5px] border-dashed border-ado-light-grey"
        />
      )}
      <div className="flex-col w-full p-5">
        <div className="gap-3 w-full">
          <span className="text-[0.875rem] font-bold">
            {fecHorSal ? formatHourFromDate(fecHorSal) : "--:--"} pm
          </span>
          <span className="line-through flex-1 bg-ado-light-grey h-[1px] self-center" />
          <span className="text-[0.875rem]">{duracion || "--"}h aprox.</span>
          <span className="line-through flex-1 bg-ado-light-grey h-[1px] self-center" />
          <span className="text-[0.875rem] font-bold">
            {fecHorLlegada ? formatHourFromDate(fecHorLlegada) : "--:--"} pm
          </span>
        </div>
        <div className="justify-between w-full">
          <span className="text-[0.875rem] font-bold text-[#66818D]">
            {descOrigenTerminal || "Origen"}
          </span>
          <span className="text-[0.875rem] font-bold text-[#66818D]">
            {descDestinoTerminal || "Destino"}
          </span>
        </div>
      </div>
      <div className="gap-10 border-l-[1.5px] border-dashed border-ado-light-grey">
        <div className="flex flex-col pl-5 self-center">
          {precio && precio.length >= 2 ? (
            <>
              <span className="text-ado-dark-grey text-[0.875rem] line-through text-nowrap">
                {formatPrice(precio[0]?.precio)}
              </span>
              <span className="font-bold text-[1.125rem] text-nowrap">
                {formatPrice(precio[1]?.precio)}
              </span>
            </>
          ) : (
            <span className="font-bold text-[1.125rem] text-nowrap">
              {precio && precio[0] ? formatPrice(precio[0]?.precio) : "--"}
            </span>
          )}
          {onClickModify && (
            <span
              className="text-ado-red text-[.875rem] text-nowrap cursor-pointer hover:underline"
              onClick={onClickModify}>
              Cambiar boleto
            </span>
          )}
        </div>
        {showButton && (
          <Button
            onClick={onClickSelect}
            buttonText="Seleccionar"
            disabled={disabledBtn}
            variant="primary"
            buttonStyle="filled"
          />
        )}
      </div>
    </div>
  );
};

export default TripInfoCard;
