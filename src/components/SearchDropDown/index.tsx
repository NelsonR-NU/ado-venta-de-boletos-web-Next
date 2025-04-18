import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import DownArrow from "../../assets/svg/downArrow.svg";

interface SearchDropDownProps {
  recentSearches: string[];
  originTerminals: string[];
  cardName: string;
  onSelect: (cardName: string, value: string) => void;
}

const SearchDropDown: React.FC<SearchDropDownProps> = ({
  recentSearches,
  originTerminals,
  cardName,
  onSelect,
}) => {
  const t = useTranslations("search_results");

  return (
    <div className="absolute left-0 top-full bg-white border border-gray-300 w-[300px] mt-1 rounded-[20px] shadow-lg z-[9999] max-h-120 overflow-auto flex flex-col">
      <div className=" w-full flex flex-col">
        <div className=" w-full p-[16px] flex flex-col ">
          <div className=" w-full flex flex-col ">
            <p className=" text-[14px] font-medium ">{t("recent_searches")}</p>
            <div className=" mt-[8px] bg-[#F6F7FB] w-full h-[100px] p-[8px] flex flex-col justify-between rounded-[8px] ">
              {recentSearches.map((item, index) => (
                <div
                  key={index}
                  className="block text-[14px] w-full px-2 py-2 text-[#1D1F24] hover:bg-gray-100 cursor-pointer"
                  onClick={() => onSelect(cardName, item)}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className=" w-full flex flex-col mt-[8px] ">
            <p className=" text-[14px] font-medium ">{t("origin_terminals")}</p>
            <div className=" mt-[8px] bg-[#F6F7FB] w-full h-[200px] p-[8px] flex flex-col justify-between rounded-[8px] ">
              {originTerminals.map((item, index) => (
                <div className="flex items-center justify-center px-2 " key={index}>
                  <div
                    key={index}
                    className="block text-[14px] w-full py-2 text-[#1D1F24] hover:bg-gray-100 cursor-pointer"
                    onClick={() => onSelect(cardName, item)}>
                    {item}
                  </div>
                  <Image src={DownArrow} alt="Bus Icon" className=" w-[14px] h-[14px] " />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className=" bg-[#FFD898] px-[15px] py-[5px] ">
          <p className=" text-[13px] ">{t("available_terminals_dropdown")}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchDropDown;
