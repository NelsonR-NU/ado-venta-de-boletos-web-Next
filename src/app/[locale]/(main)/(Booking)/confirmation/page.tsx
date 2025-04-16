import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TicketList from "@/components/TicketList";
import { useTranslations } from "next-intl";
import { Locale } from "@/types/common/locale";

interface BookingLayoutProps {
  params: {
    locale: string;
  };
}

export default function BookingLayout({ params }: BookingLayoutProps) {
  const { locale } = params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = useTranslations("ticket-confirmation");

  return (
    <div className="flex flex-col gap-2 lg:gap-6">
      <h2 className="text-base font-bold">{t("confirm_details")}</h2>
      <div className="flex flex-col gap-2">
        <p className="text-base font-normal">{t("ticket_share_link")}:</p>
        <p className="text-ado-booking-link text-base font-bold">jimena.vinat@gmail.com</p>
      </div>
      <TicketList />
    </div>
  );
}
