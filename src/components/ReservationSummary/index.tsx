"use client";
import React from "react";
import AddCouponCard from "@/components/ReservationSummary/AddCouponCard";
import PriceSummary from "@/components/ReservationSummary/PriceSummary";
import TripSummary from "@/components/ReservationSummary/TripSummary";

interface ReservationSummaryProps {}

const ReservationSummary: React.FC<ReservationSummaryProps> = () => {
  const showApplyCouponSection = true;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Trip Summary - oneway trip */}
      <TripSummary />
      {/* Trip Summary - return trip */}
      <TripSummary isOneWayTrip={false} />
      {/* Price Summary */}
      <PriceSummary />
      {/* Add Coupon Section */}
      {showApplyCouponSection && <AddCouponCard />}
    </div>
  );
};

export default ReservationSummary;
