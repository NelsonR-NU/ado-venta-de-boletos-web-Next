"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react"; 
import TemporaryDrawer from "./Drawer";

interface FilterProps {
  date: {
    day: string;
    date: string;
  };
}

const Filter: React.FC<FilterProps> = ({ date }) => {
  const t = useTranslations("home");
  const [selectedSort, setSelectedSort] = useState(t("sortedTrip.First_to_depart"));
  const [draweropen, setDrawerOpen] = useState(false);
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
    setTimeout(() => setDrawerOpen(true), 10);
  };
  const sortedTrip = t.raw("sortedTrip") as Record<string, string>;
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white shadow-md rounded-md space-y-4 sm:space-y-0">
      <p className="flex text-gray-700 text-sm text-center sm:text-left w-full">
        <span className="font-medium">{t('tripType')}</span>
        <span className="ml-2 text-gray-900 font-semibold">
          {t.raw(`days.${date?.day}`)[0]},{new Date(date?.date).toLocaleDateString("es-ES", { day: "2-digit" })} de{" "}
          {new Date(date?.date).toLocaleDateString("es-ES", { month: "short" })}
        </span>
      </p>

      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-3 space-y-2 sm:space-y-0 max-[500px]:flex-row gap-[20px]">
        {/* Filter Button */}
        <div className="relative w-full sm:w-auto" ref={filterRef}>
          <button
            className="border border-purple-500 text-purple-500 px-4 py-2 h-[40px] rounded-md text-sm flex items-center justify-center w-full sm:w-auto hover:bg-purple-100 whitespace-nowrap"
            onClick={handleFilterClick}
            aria-expanded={isFilterDropdownOpen}
          >
            <SlidersHorizontal size={16} className="mr-2" />
            <span>{t('filters')}</span>
            <ChevronDown size={16} className={`ml-2 transition-transform ${isFilterDropdownOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Sort Button */}
        <div className="relative w-full sm:w-auto max-[500px]:!m-0" ref={sortRef}>
          <button
            className="border border-purple-500 text-purple-500 px-4 py-2 h-[40px] rounded-md text-sm flex items-center justify-center w-full sm:w-auto hover:bg-purple-100 whitespace-nowrap"
            onClick={() => {
              setIsSortDropdownOpen(!isSortDropdownOpen);
              setIsFilterDropdownOpen(false);
            }}
            aria-expanded={isSortDropdownOpen}
          >
            <span className="hidden sm:inline">{t('sortedBy')}</span>
            <span className="font-semibold mx-1">{selectedSort}</span>
            <ChevronDown size={16} className={`transition-transform ${isSortDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Sort Dropdown */}
          {isSortDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border rounded-md shadow-md z-10">
              <ul className="text-sm text-gray-700 w-full" role="menu">
                {Object.entries(sortedTrip).map(([key, value]) => (
                  <li
                    key={key}
                    className={`px-4 py-3 m-2 hover:bg-gray-100 cursor-pointer text-center ${selectedSort === value ? "bg-ado-purple rounded-lg text-white font-semibold" : ""
                      }`}
                    role="menuitem"
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
      <TemporaryDrawer isOpen={draweropen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Filter;
