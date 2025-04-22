import Image from "next/image";
import React from "react";
import ticketAvator from "@/assets/png/ticketAvator.png";
import { useTranslations } from "next-intl";

interface Ticket {
  passenger_name: string;
  ticket_type: string;
  departure_seat: string;
  return_seat: string;
  assistance: string;
}

const TicketFieldInfo: React.FC<{
  label: string;
  value: string;
  className?: string;
  mdLabel?: string;
}> = ({ label, value, className, mdLabel }) => (
  <div className={`flex flex-col gap-2   ${className}`}>
    <p className="text-[14px] sm:text-sm text-ado-text-gray max-lg:hidden">{label}</p>
    <p className="text-[14px] sm:text-sm text-ado-text-gray lg:hidden">{mdLabel}</p>
    <p className={"font-bold"}>{value}</p>
  </div>
);

const TicketDetailsCard: React.FC<{ ticket: Ticket; index: number }> = ({ ticket, index }) => {
  const t = useTranslations("ticket_confirmation");
  const bgColor = index % 2 === 0 ? "lg:bg-ado-scroll-background" : "lg:bg-ado-ice-blue";

  return (
    <div className="max-lg:rounded-[10px] overflow-hidden lg:first:rounded-t-[10px] lg:last:rounded-b-[10px] flex flex-col gap-y-5 lg:gap-2 lg:flex-row max-lg:bg-ado-scroll-background ">
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-2 max-lg:p-6 lg:gap-y-5 lg:py-6 lg:px-10 lg:bg-ado-scroll-background lg:flex-1 max-lg:pb-0 ${bgColor}`}>
        <TicketFieldInfo
          label={t("passenger_name")}
          value={ticket.passenger_name}
          mdLabel={t("passenger_name")}
          className="order-2 lg:order-none"
        />
        <TicketFieldInfo
          label={t("departure_seat")}
          value={ticket.departure_seat}
          mdLabel={t("departure_seat")}
          className="order-3 lg:order-none"
        />
        <TicketFieldInfo
          label={t("ticket_type")}
          value={ticket.ticket_type}
          mdLabel={t("ticket_type")}
          className="order-1 lg:order-none"
        />
        <div className="md:border-r md:border-dashed md:border-gray-400 lg:border-none order-4 lg:order-none">
          <TicketFieldInfo
            label={t("return_seat")}
            mdLabel={t("return_seat")}
            value={ticket.return_seat}
          />
        </div>
      </div>
      <div
        className={`flex gap-10 py-6 px-6 lg:bg-ado-scroll-background   lg:flex-col lg:flex-1 lg:max-w-[230px] lg:items-center max-lg:pt-0  ${bgColor} lg:gap-2`}>
        <div>
          <TicketFieldInfo
            label={t("total_assistance")}
            mdLabel={t("total_assistance")}
            value={ticket.assistance}
          />
        </div>
        <div>
          <Image src={ticketAvator} alt="ticket image" className="w-[47] height-[56px]" />
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsCard;
