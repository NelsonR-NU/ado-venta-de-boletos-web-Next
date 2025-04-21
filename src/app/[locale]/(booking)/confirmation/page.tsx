import TicketList from "@/components/TicketList";
import { useTranslations } from "next-intl";

export default function BookingLayout() {
  const t = useTranslations("ticket_confirmation");

  return (
    <div className="flex flex-1 flex-col gap-2 lg:gap-6">
      <h2 className="text-base font-bold">{t("confirm_details")}</h2>
      <div className="flex flex-col gap-2">
        <p className="text-base font-normal">{t("ticket_share_link")}:</p>
        <p className="text-ado-booking-link text-base font-bold">jimena.vinat@gmail.com</p>
      </div>
      <TicketList />
    </div>
  );
}
