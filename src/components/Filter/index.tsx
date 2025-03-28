"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import FilterDrawer from "@/components/FilterDrawer";
import Button from "../Button";
import filterIcon from '@/assets/png/filter.png'
import bottomArrow from '@/assets/png/bottomarrow.png'


interface FilterProps {
  date: {
    day: string;
    date: string;
  };
}

const Filter: React.FC<FilterProps> = ({ date }) => {
  const t = useTranslations("home");
  const daysTrans = useTranslations("searchResults");
  const [selectedSort, setSelectedSort] = useState(daysTrans("sortedTrip.First_to_depart"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterClick = () => {
    setDrawerOpen(false);
    setDrawerOpen(true)
  };

  const sortedTrip = daysTrans.raw("sortedTrip") as Record<string, string>;
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center max-sm:p-4  space-y-4 sm:space-y-0">
      <p className="flex text-gray-700 text-sm text-center sm:text-left w-full">
        <span className="font-medium">{t('tripType')}</span>
        <span className="ml-2 text-gray-900 font-semibold">
          {daysTrans.raw(`days.${date?.day}`)[0]},{new Date(date?.date).toLocaleDateString("es-ES", { day: "2-digit" })} de{" "}
          {new Date(date?.date).toLocaleDateString("es-ES", { month: "short" })}
        </span>
      </p>

      <div className="flex flex-row   w-full sm:w-auto sm:space-x-3 space-y-2 sm:space-y-0  gap-[20px]">

        <div className="relative w-[48%] sm:w-auto" ref={filterRef}>
          <Button
            buttonStyle="outline"
            className="text-ado-purple w-full sm:w-max"
            onClick={handleFilterClick}
            aria-expanded={isFilterDropdownOpen}
            buttonText={t('filters')}
            iconPosition="right"
            icon={<Image src={filterIcon} alt={"filter icon"} className={`ml-2 transition-transform w-4`} />}
          />
        </div>

        <div className="relative w-[48%] !m-0 sm:w-auto" ref={sortRef}>
          <Button
            buttonStyle="outline"
            className="text-ado-purple w-full sm:w-max  whitespace-nowrap"
            onClick={() => {
              setIsSortDropdownOpen(!isSortDropdownOpen);
              setIsFilterDropdownOpen(false);
            }}
            aria-expanded={isSortDropdownOpen}
            buttonText={<>
              <span className="hidden sm:inline">{t('sortedBy')}</span>
              <span className="font-semibold mx-1">{selectedSort}</span></>}
            iconPosition="right"
            icon={<Image src={bottomArrow} alt={"dropdown icon"} className={`ml-2 transition-transform w-4 `} />}
          />


          {/* Sort Dropdown */}
          {isSortDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border rounded-md shadow-md z-10">
              <ul className="text-sm text-gray-700 w-full" >
                {Object.entries(sortedTrip).map(([key, value]) => (
                  <li
                    key={key}
                    className={`px-4 py-3 m-2 hover:bg-gray-100 cursor-pointer text-center ${selectedSort === value ? "bg-ado-purple rounded-lg text-white font-semibold" : ""
                      }`}
                    onClick={() => {
                      setSelectedSort(value);
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <FilterDrawer  isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Filter;
