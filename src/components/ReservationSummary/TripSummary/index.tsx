"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Card from "@/components/Card";
import Button from "@/components/ui/Button";
import rightChevron from "@/assets/svg/right-chevron-purple.svg";
import goldStarPlusBusIcon from "@/assets/svg/gold-star-plus-bus.svg";
import terminal from "@/assets/svg/green-terminal.svg";
import redTerminal from "@/assets/svg/red-terminal.svg";

interface TripSummaryProps {
  isOneWayTrip?: boolean;
  handleClick?: () => void;
}

const TripSummary: React.FC<TripSummaryProps> = ({ isOneWayTrip = true, handleClick }) => {
  const t = useTranslations("reservation_summary");

  const origin = {
    title: "Central México Norte, CDMX",
    subtitle: t("origin_terminal"),
    time: "06:00 h",
  };

  const destination = {
    title: "Acapulco Costera, Gro.",
    subtitle: t("destination_terminal"),
    time: "11:10 h",
  };

  const [originPoint, destinationPoint] = isOneWayTrip
    ? [origin, destination]
    : [destination, origin];

  const renderLocationBlock = (location: typeof origin) => (
    <div className="flex justify-between gap-2">
      <div>
        <p className="text-sm">{location.title}</p>
        <p className="text-xs text-ado-charcoal">{location.subtitle}</p>
      </div>
      <div className="text-sm  text-right whitespace-nowrap">{location.time}</div>
    </div>
  );

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4 text-ado-black">
          <div className="text-lg font-bold">
            {isOneWayTrip ? t("one_way_trip") : t("return_trip")}
          </div>
          <div className="text-sm">Vier. 12 de nov.</div>
        </div>
        <Image src={goldStarPlusBusIcon} alt="bus logo" width={100} height={50} />
      </div>

      <div className="w-full rounded-md p-4 bg-ado-white">
        <div className="flex gap-1">
          <div className="flex flex-col items-center justify-end">
            <Image src={terminal} alt="Terminal" className="mb-[-2px]" width={28} height={28} />
            <div
              className={`w-3 ${isOneWayTrip ? "h-[90px]" : "h-[105px]"} border-y-0 bg-ado-lavendar border-[3px] border-ado-gray`}
            />
            <Image src={redTerminal} alt="Terminal" className="mt-[-2px]" width={28} height={28} />
          </div>
          <div className="flex flex-col justify-around w-full">
            <div className="border-b border-ado-light-blue-gray pb-[10px] rounded-tl-2 rounded-tr-2">
              {renderLocationBlock(originPoint)}
            </div>
            {renderLocationBlock(destinationPoint)}
          </div>
        </div>
      </div>

      <Button
        onClick={handleClick}
        buttonText={t("trip_details")}
        icon={<Image src={rightChevron} alt="right chevron" />}
        iconPosition="right"
        buttonStyle="outline"
      />
    </Card>
  );
};

export default TripSummary;
