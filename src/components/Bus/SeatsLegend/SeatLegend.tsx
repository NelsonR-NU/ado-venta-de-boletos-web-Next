import React from "react";
import { useTranslations } from "next-intl";
import { SeatLegendProps } from "@/types/components/BusSeatsSelection/SeatLegend";

const SeatLegend: React.FC<SeatLegendProps> = ({ quantity = 1, selectedSeatsCount }) => {
  const t = useTranslations("booking");

  return (
    <div className="flex gap-5">
      <div className="flex gap-2 items-center">
        <span className="rounded-full w-[10px] h-[10px] border border-ado-purple" />
        <span className="text-[0.875rem]">{t("available")}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="rounded-full bg-[#949596] w-[10px] h-[10px]" />
        <span className="text-[0.875rem]">{t("not_available")}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="rounded-full bg-ado-purple w-[10px] h-[10px]" />
        <span className="text-[0.875rem]">{t("selected")}</span>
      </div>
      {quantity > 1 && (
        <div className="flex gap-2 items-center ml-auto">
          <span className="text-[0.875rem] font-medium">
            {selectedSeatsCount}/{quantity} {t("seats_selected")}
          </span>
        </div>
      )}
    </div>
  );
};

export default SeatLegend;
