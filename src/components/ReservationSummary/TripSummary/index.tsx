"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Card from "@/components/Card";
import Button from "@/components/Button";
import rightChevron from "@/assets/svg/right-chevron-purple.svg";
import goldStarPlusBusIcon from "@/assets/svg/gold-star-plus-bus.svg";

interface TripSummaryProps {
  isOneWayTrip?: boolean;
}

const TripSummary: React.FC<TripSummaryProps> = ({ isOneWayTrip = true }) => {
  const t = useTranslations("reservationSummary");

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4 text-black">
          <div className="text-lg font-bold">
            {isOneWayTrip ? t("oneWayTrip") : t("returnTrip")}
          </div>
          <div className="text-sm">Vier. 12 de nov.</div>
        </div>
        <div>
          <Image src={goldStarPlusBusIcon} alt="bus logo" width={100} height={50} />
        </div>
      </div>
      <Button
        onClick={() => {}}
        buttonText={t("tripDetails")}
        icon={<Image src={rightChevron} alt="right chevron" />}
        iconPosition="right"
        buttonStyle="outline"
      />
    </Card>
  );
};

export default TripSummary;
