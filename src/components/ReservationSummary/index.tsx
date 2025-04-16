"use client";
import { FC, useState } from "react";
import AddCouponCard from "@/components/ReservationSummary/AddCouponCard";
import PriceSummary from "@/components/ReservationSummary/PriceSummary";
import TripSummary from "@/components/ReservationSummary/TripSummary";
import PurchaseDetailsDrawer from "@/components/ReservationSummary/PurchaseDetailsDrawer";
import TicketDetailsDrawer from "@/components/ReservationSummary/TicketDetailsDrawer";

const ReservationSummary: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const showApplyCouponSection = true;

  const handleTripDetails = () => setOpenDrawer(true);

  const handlePurchaseDetails = () => setOpen(true);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Trip Summary - oneway trip */}
      <TripSummary handleClick={handleTripDetails} />
      {/* Trip Summary - return trip */}
      <TripSummary isOneWayTrip={false} handleClick={handleTripDetails} />
      {/* Price Summary */}
      <PriceSummary handleClick={handlePurchaseDetails} />
      {/* Add Coupon Section */}
      {showApplyCouponSection && <AddCouponCard />}
      {/* Trip Details Drawer */}
      <PurchaseDetailsDrawer isOpen={open} onClose={() => setOpen(false)} />
      <TicketDetailsDrawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)} />
    </div>
  );
};

export default ReservationSummary;
