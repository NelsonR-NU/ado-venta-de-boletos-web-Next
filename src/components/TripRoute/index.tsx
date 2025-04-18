import Image from "next/image";
import React, { FC } from "react";
import DestinationIcon from "@/assets/svg/destination.svg";
import StopIcon from "@/assets/svg/stop.svg";
import { RouteItem } from "@/types/components/TicketCard";

interface TripRouteProps {
  routes: RouteItem[];
  show: boolean;
}

const TripRoute: FC<TripRouteProps> = ({ routes, show }) => (
  <div className="flex-col ml-4">
    {routes?.map((route, i) => (
      <div className="gap-4" key={i}>
        <div className="h-fit items-center">
          <span className="font-medium whitespace-nowrap min-w-[60px] text-[0.75rem]">
            {route?.hour}
          </span>
          <span className="bg-ado-light-grey h-[1.5px] w-[10px]" />
        </div>
        <div
          className={`${i === 0 && "mt-[2px]"} ${i !== routes.length - 1 && "h-12 bg-ado-purple "} justify-center w-2`}>
          <Image
            alt=""
            className={`${show ? "absolute" : "hidden"} transition-none mt-[-2px]`}
            src={i === 0 || i === routes.length - 1 ? DestinationIcon : StopIcon}
            width={16}
            height={16}
          />
        </div>
        <span className="font-medium ml-2 pb-1 border-b-2 h-fit whitespace-nowrap leading-5 text-[0.75rem] w-[150px]">
          {route?.location}
        </span>
      </div>
    ))}
  </div>
);

export default TripRoute;
