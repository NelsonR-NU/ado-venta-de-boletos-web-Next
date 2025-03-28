"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import Banner from '../../../../assets/png/searchBanner.png';
import SearchBox from '@/components/SearchBox';
import Container from '@/components/Container';
import Filter from '@/components/Filter';
import BookingForm from '@/components/PassengerRegistrationForm';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import RegisterFormModal from '@/components/RegisterFormModal';
import PromoCard from '@/components/PromoCard';
import filterIcon from '@/assets/png/filter.png'
import infoIcon from "@/assets/png/info.png"
import AdoBus from '@/assets/png/adoBus.png';
import { useTranslations } from 'next-intl';
import DateSlider from '@/components/HorizontalScrollBar';

interface FilterData {
  day: string,
  date: string
}

function SearchResults() {

  const [selectedDate, setSelectedDate] = useState<FilterData>({
    day: new Date().toLocaleDateString("en-US", { weekday: "short" }),
    date: new Date().toISOString().split("T")[0]
  });

  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const tHome = useTranslations("searchResults");
  const tbooking = useTranslations("booking");
  const tSearchResults = useTranslations("searchResults");

  const handleDateChange = (date: FilterData) => {
    setSelectedDate(date);
  };

  const handlePromotionAction = () => {
    console.log("promotion interested");
    setOpen(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleModalClose = () => {
    setOpen(false);
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
          <SearchBox handleLoad={handleLoad} />
        </div>
      </div>

      {isLoaded ? (
        <>
          <div className='bg-[#FAFAFA]'>
            <Container className={"max-[500px]:p-0 max-[500px]:m-0"}>
              <div className="flex-col">
                <DateSlider onDateSelect={handleDateChange} />
              </div>
            </Container>
          </div>
          <Container className={"max-[500px]:p-0 max-[500px]:m-0"}>
            <div className="flex-col">
              <Filter date={selectedDate} />
              <PromoCard
                imageUrl={""}
                bannerTitle={tHome('promotion.title')}
                bannerDescription={tHome('promotion.description')}
                btnText={tHome('promotion.btnText')}
                btnColor={"ado-btn-red"}
                showImage={true}
                handlePromotionAction={handlePromotionAction}
              />
            </div>

          </Container>
        </>
      ) : (
        <div>
          <Container>
            <p className='text-[24px] text-[#222222] font-[700]'>{tSearchResults("searchResultsTitle")}</p>
            <div className='mt-[20px] p-[40px] bg-[#F1F3F9] rounded-[8px] flex flex-col justify-center items-center'>
              <p className='text-[#474A56] font-[400] text-[16px] text-center'>
                {tSearchResults("yourSearch")}
                <span className='font-[600] text-black'>{tSearchResults("yourSearchOn")}</span>
                {tSearchResults("yourSearchOn2")}
                <span className='font-[600] text-black'>{tSearchResults("yourSearchFrom")}</span>
                {tSearchResults("yourSearchOn3")}
                <span className='font-[600] text-black'>{tSearchResults("yourSearchTo")}</span>
                <br />
                {tSearchResults("noSeatAvailability")}
              </p>
              <p className='text-[18px] text-[#222222] font-[700] mt-[30px]'>{tSearchResults("tryAnotherDate")}</p>
              <Image src={AdoBus} alt="Ado Bus" />
            </div>
          </Container>
        </div>
      )}

      <Modal isOpen={open} onClose={handleModalClose} showCloseIcon={true}>
        <div className="flex flex-col justify-center gap-y-2">
          <div className="flex flex-col justify-center items-center">
            <span className="text-yellow-500 w-fit text-2xl border border-ado-alert-border bg-ado-sandal rounded-[50%]">
              <Image alt="date change" src={infoIcon} className="p-4" />
            </span>
          </div>

          <h2 className="text-lg font-semibold text-center mt-2">{tbooking("authpopup.title")}</h2>
          <p className="flex justify-center text-[14px]">{tbooking("authpopup.content")}</p>
        </div>
        <div className="flex justify-between mt-6 max-xs:flex-col pb-3">
          <Button buttonStyle="outline" className={"w-[48%] max-xs:w-full"} buttonText={tbooking("authpopup.guest_btn")} onClick={() => { }} />
          <Button className={"w-[48%] max-xs:w-full max-xs:mt-4 max-xs:ml-0"} buttonText={tbooking("authpopup.login_btn")} onClick={() => { }} />
        </div>
      </Modal>

      <Container className={"max-[500px]:p-0 max-[500px]:m-0"}>
        <h1>hello</h1>
        {/* <BookingForm /> */}
        <RegisterFormModal />
      </Container>
    </div>
  );
}

export default SearchResults;
