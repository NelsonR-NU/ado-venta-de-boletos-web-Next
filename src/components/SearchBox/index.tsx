"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Container from '../Container';
import SelectedBus from '../../assets/svg/selectedBus.svg';
import UnSelectedBus from '../../assets/svg/unSelectedBus.svg';
import Image from 'next/image';
import SearchCard from '../SearchCard';
import AdoButton from '../Button';
import SearchCalendarCard from '../SearchCalendarCard';

function SearchBox() {
  const t = useTranslations("searchResults");

  const [roundTrip, setRoundTrip] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // State to manage selected values for each SearchCard
  const [searchValues, setSearchValues] = useState({
    Origin: t("dummyValueOne"),
    Destination: t("dummyValueTwo"),
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
  
    const mappedKey = keyMap[cardName] || cardName; // Fallback to original if not found
    
    setSearchValues(prev => ({ ...prev, [mappedKey]: value }));
    setOpenDropdown(null);
  };

  type PassengerType = 'Adult' | 'Child' | 'INAPAM' | 'Teacher' | 'Student';

  const updatePassengerCount = (type: PassengerType, delta: number) => {

    const passengerKeyMap: Record<string, keyof typeof passengerValues> = {
      [t("adults")]: "Adult",
      [t("children")]: "Child",
      [t("inapam")]: "INAPAM",
      [t("teacher")]: "Teacher",
      [t("student")]: "Student",
    };

    const mappedKey = passengerKeyMap[type] || type;

    setPassengerValues(prev => ({
      ...prev,
      [mappedKey]: Math.max(0, prev[mappedKey] + delta) // Ensure count doesn't go below 0
    }));

    // setPassengerValues(prev => ({
    //     ...prev,
    //     [type]: Math.max(0, prev[mappedKey] + delta) // Ensure count doesn't go below 0
    // }));
  };
  

  // Close dropdown when clicking outside
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
    <Container className='w-full'>
      <div ref={dropdownRef} className='w-full bg-white/90 px-4 py-4 rounded-[8px] flex flex-col'>
        {/* Round Trip / One Way Selection */}
        <div className='w-full bg-white border-2 border-ado-search-border flex items-center justify-between'>
          <div className={`w-[49%] ${roundTrip && 'border-b-2 border-ado-selected'} flex justify-center items-center py-2 cursor-pointer`} onClick={handleTripClick}>
            <Image src={SelectedBus} alt="Bus Icon" />
            <div className={`${roundTrip ? 'text-ado-selected' : 'text-[#959DB6]'} text-[12px] font-medium font-gotham-pro ml-[10px]`}>{t("roundTrip")}</div>
          </div>
          <div className="h-[20px] border-l-2 border-[#E3E7F2]"></div>
          <div className={`w-[49%] ${!roundTrip && 'border-b-2 border-ado-selected'} flex justify-center items-center py-2 cursor-pointer`} onClick={handleTripClick}>
            <Image src={UnSelectedBus} alt="Bus Icon" />
            <div className={`${!roundTrip ? 'text-ado-selected' : 'text-[#959DB6]'} text-[12px] font-medium font-gotham-pro ml-[10px]`}>{t("oneWay")}</div>
          </div>
        </div>

        {/* Detail Search Card Filter */}
        <div className='flex justify-between mt-1 items-end'>
          <SearchCard 
            width={18} 
            cardName={t("origin")} 
            value={searchValues.Origin} 
            isOpen={openDropdown === "Origin" || openDropdown === "Origen"} 
            isPassenger={false}
            toggleDropdown={toggleDropdown} 
            dropdownContent={["New York", "Los Angeles", "Chicago"]} 
            onSelect={handleSelectValue}
          />
          <SearchCard 
            width={18} 
            cardName={t("destination")} 
            value={searchValues.Destination} 
            isOpen={openDropdown === "Destination" || openDropdown === "Destino"} 
            isPassenger={false}
            toggleDropdown={toggleDropdown} 
            dropdownContent={["Miami", "San Francisco", "Houston"]} 
            onSelect={handleSelectValue}
          />
          <SearchCalendarCard 
            width={28}
            ida={t("ida")}
            returnTrip={t("return")}
            startDate={t("sampleDate")}
            returnDate={t("sampleDate2")} 
            cardName={t("ida")}
            isOpen={openDropdown === "Ida"} 
            toggleDropdown={toggleDropdown}
          />
          <SearchCard 
            width={18} 
            cardName={t("passengers")} 
            value={"1 adultos"} 
            isOpen={openDropdown === "Passengers" || openDropdown === "Pasajeros"} 
            isPassenger={true}
            toggleDropdown={toggleDropdown} 
            dropdownContent={["1 Adult", "2 Adults", "3 Adults"]} 
            // onSelect={updatePassengerCount}
            passengerValues={passengerValues} 
            updatePassengerCount={updatePassengerCount} 
          />
          <AdoButton width={14} backgroundColor='' borderColor='#5F2167' buttonText={t("modifyTrip")} textColor='#5F2167' />
        </div>
      </div>
    </Container>
  )
}

export default SearchBox;
