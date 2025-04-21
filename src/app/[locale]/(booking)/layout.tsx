"use client";

import { ReactNode } from "react";
import Container from "@/components/Container/Container";
import ReservationSummary from "@/components/ReservationSummary";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {/* <BookingHeader /> */}
      <Container>
        <div className="flex gap-6">
          <div className="flex-1">{children}</div>
          <div className="flex-1 hidden md:flex max-w-[356px] lg:max-w-[380px]">
            <ReservationSummary />
          </div>
        </div>
      </Container>
      {/* <BookingFooter /> */}
    </>
  );
}
