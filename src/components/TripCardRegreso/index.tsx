"use client";
import Image from "next/image";
import Dropdown from "@/components/ui/Dropdown";
import React from "react";
import adoConnecta from "@/assets/svg/adoConnecta.svg";
import adoVector from "@/assets/svg/vector.svg";
import busIcon from "@/assets/svg/bus.svg";
import busRoute from "@/assets/svg/SolidLine.svg";
import intermediateStop from "@/assets/svg/intermediate-stop.svg";
import dottedRoute from "@/assets/svg/dottedRoute.svg";
import terminal from "@/assets/svg/terminal.svg";
import { useTranslations } from "next-intl";

interface Props {
  displayRoutes: string[];
  time: string[];
  onPlaceSelect?: (place: string) => void;
  onTimeSelect?: (time: string) => void;
}



const TripCardRegreso: React.FC<Props> = ({ displayRoutes, time, onPlaceSelect, onTimeSelect }) => {
  const t = useTranslations("additional_services");
  return (
    <div className="mt-4 w-full h-auto bg-ado-white p-4 rounded-lg flex">
      <div className="flex flex-col items-center justify-between gap-0">
        {displayRoutes.map((route, index) => (
          <div key={`${route}-${index}`} className="flex items-center gap-2 w-[50px]">
            {index === 0 && (
              <Image src={adoConnecta} alt="Start Brand" width={60} height={30} />
            )}
            {index === displayRoutes.length - 2 && (
              <Image src={adoVector} alt="End Brand" width={60} height={30} className="relative top-[-10px]" />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full ml-2">
        <div className="flex gap-4 justify-between h-[57px]">
          <div className="flex flex-col items-center">
            <Image src={terminal} alt="Intermediate Stop Icon" />
            <Image src={busRoute} alt="Connector" className="h-[67px]" />
          </div>
          <p className="w-[500px] text-sm text-gray-600 h-[41px] border-b border-ado-light-blue-gray">
            {displayRoutes[0]}
          </p>
        </div>

        {displayRoutes.slice(1, -1).map((route, index) => (
          <div key={`${route}-${index}`} className="flex gap-4 h-[60px]">
            <div className="flex flex-col items-center">
              <Image src={terminal} alt="Intermediate Stop Icon" />
              <Image src={dottedRoute} alt="Connector" className="h-[60px]" />
            </div>
            <p className="w-[500px] text-sm text-gray-600  h-[41px] border-b border-ado-light-blue-gray">
              {route}
            </p>
          </div>
        ))}

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col items-center pl-[2px]">
            <Image src={busIcon} alt="Bus Icon" className='relative top-[31px]' width={24} height={24} />
          </div>
          <div className="flex flex-col gap-[12px] w-[500px] h-[102px]">
            <p className="text-sm font-medium text-ado-steel-gray">
              {displayRoutes[1]}
            </p>
            <div className="flex gap-4 border-b border-ado-light-blue-gray pb-[10px] ">
              <Dropdown
                options={displayRoutes}
                placeholder={t('origin')}
                title={t('select_origin')}
                className="text-sm w-full h-[45px] border border-ado-gray rounded-md"
                bgColor="bg-ado-date-background"
                textColor="text-ado-steel-gray"
                hoverColor="hover:bg-ado-light-blue-gray"
                onSelect={onPlaceSelect}
                width={228}
              />
              <Dropdown
                options={time}
                placeholder={t('time')}
                title={t('select_time')}
                className="text-sm w-[235px] h-[45px] border border-ado-gray rounded-md"
                bgColor="bg-ado-date-background"
                textColor="text-ado-steel-gray"
                hoverColor="hover:bg-ado-light-blue-gray"
                onSelect={onTimeSelect}
                width={228}
              />
            </div>
          </div>

        </div>
        <div className="flex gap-5">
          <div className="flex flex-col items-center pl-[1px] relative top-[-53px]">
            <Image src={busRoute} alt="Connector" className="h-[60px]" />
            <Image src={intermediateStop} alt="Terminal Icon" />
          </div>
          <div className=" w-full">
            <p className="text-sm text-ado-text-gray font-semibold pb-[4px]">
              {t('no_destination_selected')}
            </p>
            <p className="text-xs text-ado-text-gray pb-5 border-b border-ado-light-blue-gray w-full">
              {t('destination_location_connect')}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TripCardRegreso;
