import React from "react";
import Image from "next/image";
import SeatsGrid from "@/components/Bus/SeatsGrid/SeatsGrid";
import Wheel from "@/assets/svg/wheel.svg";
import GenderMan from "@/assets/svg/gender-man.svg";
import GenderWoman from "@/assets/svg/gender-woman.svg";
import { BusLayoutProps } from "@/types/components/BusSeatsSelection/BusLayout";

const BusLayout: React.FC<BusLayoutProps> = ({
  isLoading,
  seats,
  busStructure,
  checkIfSelected,
  quantity,
  tripInfo,
  trip,
  handleSeatSelection,
  tvInfo,
}) => (
  <div className="bg-ado-gray w-full py-6 px-6 rounded-[35px]">
    <div className="flex">
      <div className="flex items-end mr-4 px-1 py-3 rounded-l-2xl bg-black bg-opacity-10">
        <Image alt="" src={Wheel} width={42} height={42} />
      </div>
      <div className="flex-1 overflow-x-auto">
        <div className="min-w-max">
          <SeatsGrid
            isLoading={isLoading}
            seats={seats}
            busStructure={busStructure}
            checkIfSelected={checkIfSelected}
            quantity={quantity}
            tripInfo={tripInfo}
            trip={trip}
            handleSeatSelection={handleSeatSelection}
            tvInfo={tvInfo}
          />
        </div>
      </div>
      <div className="flex flex-col rounded-r-2xl px-2 py-3 items-center justify-between ml-4 bg-black bg-opacity-10">
        <div className="bg-white p-2 rounded-lg w-[48px] h-[48px] flex items-center justify-center">
          <Image
            alt="gender-man"
            src={GenderMan}
            width={28}
            height={28}
            className="text-ado-purple"
          />
        </div>
        <div className="bg-white p-2 rounded-lg w-[48px] h-[48px] flex items-center justify-center">
          <Image
            alt="gender-woman"
            src={GenderWoman}
            width={28}
            height={28}
            className="text-ado-purple"
          />
        </div>
      </div>
    </div>
  </div>
);

export default BusLayout;
