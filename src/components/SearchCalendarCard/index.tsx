"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import CalendarPromo from "../../assets/svg/calendarPromo.svg";
import Image from "next/image";
import Tick from "../../assets/svg/tick.svg";
import Button from "@/components/ui/Button";
import Calendar from "../Calendar";

function SearchCalendarCard({
  width,
  ida,
  returnTrip,
  startDate,
  returnDate,
  cardName,
  isOpen,
  toggleDropdown,
}: {
  width: number;
  ida: string;
  returnTrip: string;
  startDate: string;
  returnDate: string;
  cardName: string;
  isOpen: boolean;
  toggleDropdown: (cardName: string) => void;
}) {
  const t = useTranslations("searchResults");

  const [selected, setSelected] = useState(false);

  return (
    <div className=" relative flex flex-col justify-start z-10 " style={{ width: `${width}%` }}>
      <div
        className=" w-full bg-white border-2 border-ado-search-border  px-2 py-1 rounded-[4px] "
        onClick={() => toggleDropdown(cardName)}>
        <div className="w-full bg-white flex items-center justify-between ">
          <div className={`w-[49%] flex flex-col justify-start cursor-pointer `}>
            <div className={` text-[12px] font-gotham-pro text-[#1D1F24] `}>{ida}</div>
            <p className="text-[14px] font-medium ">{startDate}</p>
          </div>
          <div className="h-[30px] border-l-2 border-[#E3E7F2]"></div>
          <div className={`w-[49%] flex flex-col justify-start cursor-pointer `}>
            <div className={` text-[12px] ml-[8px] font-gotham-pro text-[#1D1F24] `}>
              {returnTrip}
            </div>
            <p className="text-[14px] font-medium ml-[8px] ">{returnDate}</p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-[-90] top-full bg-[#FAFAFA] mt-2 p-[24px] w-[700px] flex flex-col rounded-[8px] ">
          <p className=" text-[#26282F] text-[16px] font-medium ">{t("calendarTitle")}</p>
          <div className=" w-full p-[10px] bg-[#EBF7F6] border-[1px] border-[#B9E9E4] mt-2 rounded-[10px] flex items-center ">
            <Image src={CalendarPromo} alt="Promo Icon" />
            <div className="ml-[10px]">
              <span className=" text-[16px] font-medium text-[#26282F] ">
                {t("calendarPromo1")}
              </span>
              <span className=" text-[14px] text-[#1D1F24] ml-[3px] "> {t("calendarPromo2")}</span>
              <span className=" text-[14px] font-medium text-[#1D1F24] ml-[3px] ">
                {" "}
                {t("calendarPromo3")}
              </span>
              <span className=" text-[14px] text-[#1D1F24] ml-[3px] "> {t("calendarPromo4")}</span>
            </div>
          </div>
          <hr className=" mt-4 border-t border-[#E3E7F2]" />

          <Calendar />

          <hr className=" mt-4 border-t border-[#E3E7F2]" />
          <div className=" w-full flex items-center justify-between mt-4 ">
            <div className=" flex items-center ">
              <div
                className=" w-[18px] h-[18px] rounded-[4px] cursor-pointer flex justify-center items-center "
                style={{
                  backgroundColor: `${selected ? "#5F2167" : "#FAFAFA"}`,
                  border: `${!selected && "1px solid #808391"}`,
                }}
                onClick={() => setSelected(!selected)}>
                {selected && <Image src={Tick} alt="Promo Icon" />}
              </div>
              <p className=" text-[16px] text-[#1D1F24] ml-2 ">{t("calendarCheckBox")}</p>
            </div>

            <Button variant="primary" buttonText={t("ready")} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchCalendarCard;
