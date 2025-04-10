import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ReservationSummary from "@/components/ReservationSummary";
import Container from "@/components/Container";

export default async function BookingLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <Container>
          <div className="flex gap-3">
            <div className="flex-1 ">{children}</div>
            {/* Summary Section */}
            <div className="flex-1 hidden md:flex max-w-[356px] lg:max-w-[380px]">
              <ReservationSummary />
            </div>
          </div>
        </Container>
      </body>
    </html>
  );
}
