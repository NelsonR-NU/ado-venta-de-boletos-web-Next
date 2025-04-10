'use client';
import Image from 'next/image';
import Dropdown from '../dropdown';
import React from 'react';
import adoConnecta from "@/assets/svg/adoConnecta.svg";
import adoVector from "@/assets/svg/vector.svg";
import busIcon from "@/assets/svg/bus.svg";
import busRoute from "@/assets/svg/SolidLine.svg";
import intermediateStop from "@/assets/svg/intermediate-stop.svg";
import dottedRoute from "@/assets/svg/dottedRoute.svg";
import terminal from "@/assets/svg/terminal.svg";

interface Props {
    displayRoutes: string[];
    time: string[];
    t: any;
}

const TripCardIda: React.FC<Props> = ({ displayRoutes, time, t }) => {
    return (
        <div className="mt-4 w-[696px] h-auto bg-ado-white p-4 rounded-lg flex">
            <div className="flex flex-col items-center justify-between gap-0">
                {displayRoutes.map((route, index) => (
                    <div key={`${route}-${index}`} className="flex items-center gap-2">
                        {index === 0 && <Image src={adoConnecta} alt="Start Brand" className="w-[60px] h-[30px]" />}
                        {index === displayRoutes.length - 2 && (
                            <Image src={adoVector} alt="End Brand" className="w-[60px] h-[30px] relative top-[19px]" />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex flex-col w-full ml-4">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col items-center pl-[2px]">
                        <Image src={busIcon} alt="Bus Icon" />
                        <Image src={busRoute} alt="Connector" className="h-[60px]" />
                    </div>
                    <div className="flex gap-8 w-[548px] border-b border-ado-light-blue-gray pb-5">
                        <Dropdown
                            options={displayRoutes}
                            placeholder={t('origin')}
                            title={t('select_origin')}
                            className="text-sm w-[258px] h-[45px] border border-ado-gray rounded-md"
                            bgColor="bg-ado-date-background"
                            textColor="text-ado-steel-gray"
                            hoverColor="hover:bg-ado-light-blue-gray"
                        />
                        <Dropdown
                            options={time}
                            placeholder={t('time')}
                            title={t('select_time')}
                            className="text-sm w-[258px] h-[45px] border border-ado-gray rounded-md border-b-2 border-ado-primary"
                            bgColor="bg-ado-date-background"
                            textColor="text-ado-steel-gray"
                            hoverColor="hover:bg-ado-light-blue-gray"
                        />
                    </div>
                </div>

                <div className="flex gap-4 justify-between">
                    <div className="flex flex-col items-center">
                        <Image src={intermediateStop} alt="Intermediate Stop Icon" />
                        <Image src={dottedRoute} alt="Connector" className="h-[40px]" />
                    </div>
                    <p className="w-[548px] text-sm text-gray-600 pl-[4px] h-[41px] border-b border-ado-light-blue-gray">
                        {displayRoutes[0]}
                    </p>
                </div>

                {displayRoutes.slice(1, -1).map((route, index) => (
                    <div key={`${route}-${index}`} className="flex gap-4 h-[60px]">
                        <div className="flex flex-col items-center">
                            <Image src={intermediateStop} alt="Intermediate Stop Icon" />
                            <Image src={busRoute} alt="Connector" className="h-[60px]" />
                        </div>
                        <p className="w-[548px] text-sm text-gray-600 pl-[12px] h-[41px] border-b border-ado-light-blue-gray">
                            {route}
                        </p>
                    </div>
                ))}

                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <Image src={terminal} alt="Terminal Icon" />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-sm text-gray-600 pl-[12px] pb-5 border-b border-ado-light-blue-gray w-full">
                            {displayRoutes[displayRoutes.length - 1]}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripCardIda;
