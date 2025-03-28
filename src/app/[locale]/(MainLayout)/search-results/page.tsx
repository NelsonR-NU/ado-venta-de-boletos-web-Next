"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import Banner from '../../../../assets/png/searchBanner.png';
import SearchBox from '@/components/SearchBox';
import Container from '@/components/Container';
import DateSlider from '@/components/HorizontalScrollBar';
import Filter from '@/components/Filter';
import BookingForm from '@/components/PassengerRegistrationForm';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import LoginFormModal from '@/components/LoginFormModal';
import RegisterFormModal from '@/components/RegisterFormModal';

interface FilterData {
  day: string,
  date: string
}

function SearchResults() {

  const [selectedDate, setSelectedDate] = useState<FilterData>({ day: new Date().toLocaleDateString("en-US", { weekday: "short" }), date: new Date().toISOString().split("T")[0] });

  const handleDateChange = (date: FilterData) => {
    setSelectedDate(date);
  };


  return (
    <div className='bg-ado-background w-full'>
      <div className="w-full h-[210px] relative">
        <Image
          src={Banner}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute bottom-4 rounded-lg w-full">
          <SearchBox />
        </div>
      </div>
      <div className=' bg-[#FAFAFA] ' >
        <Container className={"max-[500px]:p-0 max-[500px]:m-0"}>
          <div className="flex-col">
            <DateSlider onDateSelect={handleDateChange} />
          </div>
        </Container>
      </div>
      <Container className={"max-[500px]:p-0 max-[500px]:m-0"}>
        <div className="flex-col">
          <Filter date={selectedDate} />
        </div>
        <BookingForm />
        <LoginFormModal />
      </Container>
    </div>
  );
}

export default SearchResults;
