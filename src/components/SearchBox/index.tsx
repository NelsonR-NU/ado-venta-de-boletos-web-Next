"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "../Container/Container";
import SelectedBus from "../../assets/svg/selectedBus.svg";
import UnSelectedBus from "../../assets/svg/unSelectedBus.svg";
import Image from "next/image";
import SearchCard from "../SearchCard";
import Button from "@/components/ui/Button";
import SearchCalendarCard from "../SearchCalendarCard";

interface SearchBoxProps {
  handleLoad: () => void;
}

interface FormatDateOptions {
  weekday: "short";
  month: "short";
  day: "numeric";
}

const SearchBox: React.FC<SearchBoxProps> = ({ handleLoad }) => {
  const t = useTranslations("search_results");

  const [roundTrip, setRoundTrip] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [passengers, setPassengers] = useState("1 adultos");

  const formatDate = (date: Date): string => (
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    } as FormatDateOptions));

  const generatePassengerText = (values: typeof passengerValues): string => {
    const labels: Record<string, string> = {
      Adult: "adultos",
      Child: "niños",
      INAPAM: "INAPAM",
      Teacher: "maestros",
      Student: "estudiantes",
    };

    const parts = Object.entries(values)
      .filter(([_, count]) => count > 0)
      .map(([key, count]) => `${count} ${labels[key]}`);

    return parts.join(", ");
  };

  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [returnDate, setReturnDate] = useState(formatDate(new Date()));

  const handleDateSelection = (sDate: Date, eDate: Date): void => {
    setStartDate(formatDate(sDate));
    setReturnDate(formatDate(eDate));
  };

  const [searchValues, setSearchValues] = useState({
    Origin: t("dummy_value_one"),
    Destination: t("dummy_value_two"),
    Passengers: t("adult"),
  });

  const [passengerValues, setPassengerValues] = useState({
    Adult: 1,
    Child: 0,
    INAPAM: 0,
    Teacher: 0,
    Student: 0,
  });

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleTripClick = () => {
    setRoundTrip(!roundTrip);
    setOpenDropdown(null);
    setPassengers("1 adultos");
    setStartDate(formatDate(new Date()));
    setReturnDate(formatDate(new Date()));
    setSearchValues({
      Origin: t("dummy_value_one"),
      Destination: t("dummy_value_two"),
      Passengers: t("adult"),
    });
    setPassengerValues({
      Adult: 1,
      Child: 0,
      INAPAM: 0,
      Teacher: 0,
      Student: 0,
    });
  };

  const toggleDropdown = (cardName: string) => {
    setOpenDropdown(openDropdown === cardName ? null : cardName);
  };

  const handleSelectValue = (cardName: string, value: string) => {
    // Map translated keys to original English state keys
    const keyMap: Record<string, string> = {
      [t("origin")]: "Origin",
      [t("destination")]: "Destination",
      [t("passengers")]: "Passengers",
    };

    const mappedKey = keyMap[cardName] || cardName;

    setSearchValues((prev) => ({ ...prev, [mappedKey]: value }));
    setOpenDropdown(null);
  };

  type PassengerType = "Adult" | "Child" | "INAPAM" | "Teacher" | "Student";

  const updatePassengerCount = (type: PassengerType, delta: number) => {
    const passengerKeyMap: Record<string, keyof typeof passengerValues> = {
      [t("adults")]: "Adult",
      [t("children")]: "Child",
      [t("inapam")]: "INAPAM",
      [t("teacher")]: "Teacher",
      [t("student")]: "Student",
    };

    const mappedKey = passengerKeyMap[type] || type;

    setPassengerValues((prev) => ({
      ...prev,
      [mappedKey]: Math.max(0, prev[mappedKey] + delta),
    }));
  }
  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const handlePassengersSelection = () => {
    setPassengers(generatePassengerText(passengerValues));
    closeDropdown();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container className="w-full">
      <div ref={dropdownRef} className="w-full bg-white/90 px-4 py-4 rounded-[8px] flex flex-col">
        {/* Round Trip / One Way Selection */}
        <div className="w-full bg-white border-2 border-ado-search-border flex items-center justify-between">
          <div
            className={`w-[49%] ${roundTrip && "border-b-2 border-ado-selected"} flex justify-center items-center py-2 cursor-pointer`}
            onClick={handleTripClick}>
            <Image src={SelectedBus} alt="Bus Icon" />
            <div
              className={`${roundTrip ? "text-ado-selected" : "text-[#959DB6]"} text-[12px] font-medium font-gotham-pro ml-[10px]`}>
              {t("round_trip")}
            </div>
          </div>
          <div className="h-[20px] border-l-2 border-[#E3E7F2]"></div>
          <div
            className={`w-[49%] ${!roundTrip && "border-b-2 border-ado-selected"} flex justify-center items-center py-2 cursor-pointer`}
            onClick={handleTripClick}>
            <Image src={UnSelectedBus} alt="Bus Icon" />
            <div
              className={`${!roundTrip ? "text-ado-selected" : "text-[#959DB6]"} text-[12px] font-medium font-gotham-pro ml-[10px]`}>
              {t("one_way")}
            </div>
          </div>
        </div>

        {/* Detail Search Card Filter */}
        <div className="flex justify-between mt-1 items-end md:flex-wrap lg:flex-nowrap">
          <div className=" flex justify-between lg:w-[39%] md:w-[100%] ">
            <SearchCard
              width={49.5}
              cardName={t("origin")}
              value={searchValues.Origin}
              isOpen={openDropdown === "Origin" || openDropdown === "Origen"}
              isPassenger={false}
              toggleDropdown={toggleDropdown}
              dropdownContent={["New York", "Los Angeles", "Chicago"]}
              onSelect={handleSelectValue}
            />
            <SearchCard
              width={49.5}
              cardName={t("destination")}
              value={searchValues.Destination}
              isOpen={openDropdown === "Destination" || openDropdown === "Destino"}
              isPassenger={false}
              toggleDropdown={toggleDropdown}
              dropdownContent={["Miami", "San Francisco", "Houston"]}
              onSelect={handleSelectValue}
            />
          </div>

          <div className=" lg:w-[60.5%] md:w-[100%] flex justify-between items-end md:mt-[5px]">
            <SearchCalendarCard
              width={42}
              ida={t("ida")}
              returnTrip={t("return")}
              startDate={startDate}
              returnDate={returnDate}
              cardName={t("ida")}
              isOpen={openDropdown === "Ida"}
              toggleDropdown={toggleDropdown}
              handleDateSelection={handleDateSelection}
              closeDropdown={closeDropdown}
            />
            <SearchCard
              width={34}
              cardName={t("passengers")}
              value={passengers}
              isOpen={openDropdown === "Passengers" || openDropdown === "Pasajeros"}
              isPassenger={true}
              toggleDropdown={toggleDropdown}
              dropdownContent={["1 Adult", "2 Adults", "3 Adults"]}
              // onSelect={updatePassengerCount}
              passengerValues={passengerValues}
              updatePassengerCount={updatePassengerCount}
              handlePassengersSelection={handlePassengersSelection}
            />
            <Button
              variant="primary"
              className="border border-ado-purple"
              buttonText={t("modify_trip")}
              onClick={handleLoad}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SearchBox;