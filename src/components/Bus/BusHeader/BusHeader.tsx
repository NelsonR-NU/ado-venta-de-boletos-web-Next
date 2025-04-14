import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { formatCurrentDate } from "@/utils/date";
import { BusHeaderProps } from "@/types/components/BusSeatsSelection/BusHeader";

const BusHeader: React.FC<BusHeaderProps> = ({ tripDirection }) => {
  const t = useTranslations("booking");
  const locale = useLocale();
  const formattedDate = formatCurrentDate(locale);

  return (
    <div className="flex justify-between items-center">
      <span className="font-bold text-[1rem]">
        {t("choose_seats", { direction: tripDirection })}
      </span>
      <span className="text-[1rem]">{formattedDate}</span>
    </div>
  );
};

export default BusHeader;
