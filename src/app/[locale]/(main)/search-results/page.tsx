"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import SearchBox from "@/components/SearchBox";
import Container from "@/components/Container/Container";
import Filter from "@/components/Filter";
import PromoCard from "@/components/PromoCard";
import DateSlider from "@/components/HorizontalScrollBar";
import RegisterFormModal from "@/components/Forms/RegisterFormModal";
import AdoBus from "@/assets/png/adoBus.png";
import Banner from "@/assets/png/searchBanner.png";
import TicketCard from "@/components/TicketCard";
import adoLogo from "@/assets/svg/ado-logo-purple.svg";

interface FilterData {
  day: string;
  date: string;
}

const SearchResults: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<FilterData>({
    day: new Date().toLocaleDateString("en-US", { weekday: "short" }),
    date: new Date().toISOString().split("T")[0],
  });

  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const tHome = useTranslations("search_results");
  const tSearchResults = useTranslations("search_results");

  const handleDateChange = (date: FilterData) => setSelectedDate(date);

  const handlePromotionAction = () => {};

  const handleLoad = () => setIsLoaded(true);

  return (
    <div className="bg-ado-background w-full">
      <div className="w-full h-[210px] relative">
        <Image src={Banner} alt="Banner Image" layout="fill" objectFit="cover" priority />
        <div className="absolute bottom-4 rounded-lg w-full">
          <SearchBox handleLoad={handleLoad} />
        </div>
      </div>

      {isLoaded ? (
        <>
          <div className="bg-[#FAFAFA]">
            <Container className="max-[500px]:p-0 max-[500px]:m-0">
              <div className="flex-col my-3">
                <DateSlider onDateSelect={handleDateChange} />
              </div>
            </Container>
          </div>
          <Container className="max-[500px]:p-0 max-[500px]:m-0">
            <div className="flex flex-col gap-10">
              <Filter date={selectedDate} />
              <TicketCard logo={adoLogo} onClickMoreInfo={() => {}} onCardSelection={() => {}} />
              <TicketCard logo={adoLogo} onClickMoreInfo={() => {}} onCardSelection={() => {}} />
              <TicketCard logo={adoLogo} onClickMoreInfo={() => {}} onCardSelection={() => {}} />
              <PromoCard
                imageUrl=""
                bannerTitle={tHome("promotion.title")}
                bannerDescription={tHome("promotion.description")}
                btnText={tHome("promotion.btn_text")}
                btnColor="ado-btn-red"
                showImage={true}
                handlePromotionAction={handlePromotionAction}
              />
            </div>
          </Container>
        </>
      ) : (
        <div>
          <Container>
            <p className="text-[24px] text-[#222222] font-[700]">
              {tSearchResults("search_results.search_results_title")}
            </p>
            <div className="mt-[20px] p-[40px] bg-[#F1F3F9] rounded-[8px] flex flex-col justify-center items-center">
              <p className="text-[#474A56] font-[400] text-[16px] text-center">
                {tSearchResults("your_search")}
                <span className="font-[600] text-black">{tSearchResults("your_search_on")}</span>
                {tSearchResults("your_search_on_2")}
                <span className="font-[600] text-black">{tSearchResults("your_search_from")}</span>
                {tSearchResults("your_search_on_3")}
                <span className="font-[600] text-black">{tSearchResults("your_search_to")}</span>
                <br />
                {tSearchResults("no_seat_availability")}
              </p>
              <p className="text-[18px] text-[#222222] font-[700] mt-[30px]">
                {tSearchResults("try_another_date")}
              </p>
              <Image src={AdoBus} alt="Ado Bus" />
            </div>
          </Container>
        </div>
      )}

      <Container className="justify-start max-[500px]:p-0 max-[500px]:m-0">
        <RegisterFormModal />
      </Container>
    </div>
  );
};

export default SearchResults;
