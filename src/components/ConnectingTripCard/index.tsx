"use client";
import Card from "@/components/Card";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import TripCardIda from "../TripCardIda";
import TripCardRegreso from "../TripCardRegreso";

interface TripCardProps {
  title: string;
  date: string;
  passengers: number;
  routes: string[];
  type: "ida" | "regreso";
}

const TripCard: React.FC<TripCardProps> = ({ title, date, passengers, routes, type }) => {
  const t = useTranslations("additional_services");
  const time = ["04:30 h", "05:30 h"];
  const isRegresso = type === "regreso";
  const displayRoutes = isRegresso ? [...routes].reverse() : routes;

  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const isBothSelected = selectedPlace && selectedTime;

  return (
    <div className="flex flex-col gap-6 md:w-[100%] w-full">
      <Card className="w-[744px] !gap-2 mx-auto !bg-ado-text-white">
        <div className="justify-between items-center mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">{title}</h3>
          <div className="flex justify-between">
            <span className="text-sm">
              {type === "ida" ? t("origin_time") : t("destination_time")}
            </span>
            <button
              className={`${isBothSelected ? "text-ado-red" : "text-ado-slate-gray"} font-bold text-base`}>
              {t("eliminate")}
            </button>
          </div>
        </div>

        <div className="flex border-none h-[74px] w-full items-center bg-ado-white p-2 rounded-lg gap-24">
          <div className="flex flex-col">
            <span className="text-sm text-ado-text-gray">{t("date")}</span>
            <span className="font-bold text-ado-text-gray text-base">{date}</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm text-ado-text-gray">{t("passengers")}</span>
            <span className="font-bold text-ado-text-gray text-base">{passengers}</span>
          </div>
        </div>

        <div>
          {type === "ida" && (
            <TripCardIda
              displayRoutes={displayRoutes}
              time={time}
              onPlaceSelect={setSelectedPlace}
              onTimeSelect={setSelectedTime}
            />
          )}

          {type === "regreso" && (
            <TripCardRegreso
              displayRoutes={displayRoutes}
              time={time}
              onPlaceSelect={setSelectedPlace}
              onTimeSelect={setSelectedTime}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default TripCard;