"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import FilterDrawer from "@/components/FilterDrawer";
import Button from "../ui/Button";
import filterIcon from "@/assets/png/filter.png";
import bottomArrow from "@/assets/png/bottomarrow.png";

type FilterProps = {
  date: {
    day: string;
    date: string;
  };
};

const Filter: React.FC<FilterProps> = ({ date }) => {
  const t = useTranslations("home");
  const daysTrans = useTranslations("searchResults");
  const [selectedSort, setSelectedSort] = useState<string>(daysTrans("sortedTrip.First_to_depart"));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
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
    setDrawerOpen(true);
  };

  const sortedTrip: Record<string, string> = daysTrans.raw("sortedTrip");

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center max-sm:p-4">
      <p className="flex text-gray-700 text-[18px] text-center sm:text-left w-full">
        <span className="text-[16px] sm:text-[18px] font-normal">{t("tripType")}</span>
        <span className="ml-1 text-[16px] sm:text-[18px] text-gray-900 font-bold">
          {daysTrans.raw(`days.${date.day}`)[0]},
          {new Date(date.date).toLocaleDateString("es-ES", { day: "2-digit" })} de{" "}
          {new Date(date.date).toLocaleDateString("es-ES", { month: "short" })}
        </span>
      </p>

      <div className="flex flex-row w-full sm:w-auto gap-4">
        <div className="w-[49%] sm:w-auto" ref={filterRef}>
          <Button
            buttonStyle="outline"
            className="text-ado-purple w-full sm:w-max"
            onClick={handleFilterClick}
            aria-expanded={isFilterDropdownOpen}
            buttonText={t("filters")}
            iconPosition="right"
            icon={<Image src={filterIcon} alt="Filter icon" className="ml-2 w-4" />}
          />
        </div>

        <div className="relative w-[49%] sm:w-auto" ref={sortRef}>
          <Button
            buttonStyle="outline"
            className="text-ado-purple w-full sm:w-max whitespace-nowrap"
            onClick={() => {
              setIsSortDropdownOpen((prev) => !prev);
              setIsFilterDropdownOpen(false);
            }}
            aria-expanded={isSortDropdownOpen}
            buttonText={
              <>
                <span className="hidden sm:inline font-light">{t("sortedBy")}</span>
                <span className="font-semibold mx-1">{selectedSort}</span>
              </>
            }
            iconPosition="right"
            icon={<Image src={bottomArrow} alt="Dropdown icon" className="ml-2 w-4" />}
          />

          {isSortDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border rounded-md shadow-md z-10">
              <ul className="text-sm text-gray-700 w-full">
                {Object.entries(sortedTrip).map(([key, value]) => (
                  <li
                    key={key}
                    className={`px-4 py-3 m-2 text-center cursor-pointer ${
                      selectedSort === value
                        ? "bg-ado-purple rounded-lg text-white font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedSort(value);
                      setIsSortDropdownOpen(false);
                    }}>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <FilterDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Filter;
