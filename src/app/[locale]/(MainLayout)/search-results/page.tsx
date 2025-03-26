"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Banner from '../../../../assets/png/searchBanner.png';
import SearchBox from '@/components/SearchBox';
import Container from '@/components/Container';
import DateSlider from '@/components/HorizontalScrollBar';
import Filter from '@/components/Filter';
import AdoBus from '@/assets/svg/adoBus.svg';

interface FilterData {
  day: string,
  date: string
}

function SearchResults() {

  const t = useTranslations("searchResults");

  const [selectedDate, setSelectedDate] = useState<FilterData>({ day: new Date().toLocaleDateString("en-US", { weekday: "short" }), date: new Date().toISOString().split("T")[0] });
  const [isLoaded, setIsLoaded] = useState(true);

  const handleDateChange = (date: FilterData) => {
    setSelectedDate(date);
  };

  const handleLoad = () => {
    setIsLoaded(!isLoaded);
  }

  return (
    <div className='bg-ado-background w-full'>
      <div className="w-full lg:h-[210px] md:h-[320px] relative mt-4 sm:display-none">
        <Image
          src={Banner}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute bottom-4 rounded-lg w-full">
          <SearchBox handleLoad={handleLoad} />
        </div>
      </div>

      { isLoaded && <><div className=' bg-[#FAFAFA] ' >
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
      </Container></>}

      { !isLoaded && <div>
        <Container>
            <p className=' text-[24px] text-[#222222] font-[700] ' >{t("searchResultsTitle")}</p>
            <div className=' mt-[20px] p-[40px] bg-[#F1F3F9] rounded-[8px] flex flex-col justify-center items-center ' >
              <p className=' text-[#474A56] font-[400] text-[16px] text-center ' >
                {t("yourSearch")} 
                <span className=' font-[600] text-black ' >{t("yourSearchOn")}</span> 
                {t("yourSearchOn2")} 
                <span className=' font-[600] text-black ' >{t("yourSearchFrom")}</span> 
                {t("yourSearchOn3")} 
                <span className=' font-[600] text-black ' >{t("yourSearchTo")}</span> 
                <br /> 
                {t("noSeatAvailability")}
              </p>
              <p className=' text-[18px] text-[#222222] font-[700] mt-[30px] ' >{t("tryAnotherDate")}</p>
              <Image src={AdoBus} alt="Banner Image" />
            </div>
        </Container>
      </div>}

    </div>
  );
}

export default SearchResults;
