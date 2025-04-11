"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react"; 
import { format, isBefore, isAfter, isSameDay, addDays } from "date-fns";
import Modal from "@/components/Modal";
import alertIcon from "@/assets/png/alert.png"
import leftArrow from '@/assets/png/leftArrow.png'
import rightArrow from '@/assets/png/rightArrow.png'
import Button from '@/components/ui/Button'

type DateItem = {
  date: string;
  day: string;
  past: boolean;
  current: boolean;
  future: boolean;
};

type DateSliderProps = {
  onDateSelect: (date: { date: string; day: string }) => void;
};

type DateInfo = {
  day: string;
  date: number;
  month: number;
};



const generateDates = (): DateItem[] => {
  const dates = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
  const today = new Date();
  const startDate = addDays(today, -5);
  const endDate = addDays(today, 30);
  const daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return Array.from({ length: daysDifference + 1 }, (_, i) => {
    const currentDate = addDays(startDate, i);
    return {
      date: format(currentDate, "yyyy-MM-dd"),
      day: dates[currentDate.getDay()],
      past: isBefore(currentDate, today) && !isSameDay(currentDate, today),
      current: isSameDay(currentDate, today),
      future: isAfter(currentDate, today),
    };
  });
};

const DateSlider: React.FC<DateSliderProps> = ({ onDateSelect }) => {
  const dates = generateDates();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateInfo | null>(null);
  const [showArrows, setShowArrows] = useState<boolean>(window.innerWidth > 640);
  const t = useTranslations("searchResults");

  useLayoutEffect(() => {
    const handleResize = () => {
      setShowArrows(window.innerWidth > 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentIndex = dates.findIndex(({ current }) => current);
    setSelectedIndex(currentIndex);
    if (scrollRef.current) {
      const currentElement = scrollRef.current.children[currentIndex] as HTMLElement;
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, []);

  const handleSelectDate = (index: number, day: string, date: number) => {
    if (dates[index].past) return;
    setSelectedIndex(index);
    onDateSelect({ date: dates[index].date, day: dates[index].day });
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.children[index] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
    const selectedMonth = new Date(dates[index].date).getMonth()
    setSelectedDate({ day, date, month: selectedMonth })
    setOpen(true)
  };

  const handleModalClose = () => setOpen(false)
  const handleDateChange = () => setOpen(false)


  return (
    <div className="flex items-center justify-center mt-0 p-0 w-full  mx-auto sm:justify-between sm:gap-[24px]">
      {showArrows && (
        <Button buttonStyle="outline" className="!p-2 text-gray-600 border !border-ado-gray shadow-green hover:bg-gray-200 !rounded-full hidden md:flex" onClick={() => scrollRef.current?.scrollBy({ left: -120, behavior: "smooth" })} icon={<Image src={leftArrow} alt="left arrow" className="w-[15px]" />} />
      )}
      <div className="relative overflow-hidden  p-0 m-0 w-full   border-0 rounded-md sm:p-4 sm:border sm:border-ado-neutral-light   sm:bg-ado-scroll-background ">


        <div ref={scrollRef} className="flex gap-2 scrollbar-hidden bg-white   items-center overflow-x-auto  sm:gap-0 sm:bg-inherit" style={{ whiteSpace: "nowrap", scrollSnapType: "x mandatory" }}>
          {dates.map(({ day, date, past }, index) => (<div
            key={date}
            className={` px-[8px] py-[16px] sm:px-4 sm:py-2 flex flex-col gap-[8px] items-center justify-center  transition-all bg-ado-gray   cursor-pointer sm:bg-ado-scroll-background   ${selectedIndex === index ? "!bg-ado-date-select  border-b-4 sm:rounded-b-md border-green-500 font-semibold shadow-md !sm:bg-ado-date-background" : "hover:bg-gray-100 opacity-70"
              }`}
            onClick={() => handleSelectDate(index, t.raw(`days.${day}`)[1], new Date(date).getDate())}
            aria-disabled={past}
          >
            <span className={`text-sm capitalize ${past ? "text-gray-300" : "text-gray-600"}`}>
              {t.raw(`days.${day}`)[0]}. {new Date(date).getDate()}
            </span>
            <span className={`text-sm capitalize ${past ? "text-gray-300" : "text-gray-600"} sm:hidden`}>
              $1,000.00 MXN
            </span>
          </div>
          ))}
        </div>
      </div>
      {showArrows && (
        <Button buttonStyle="outline" className="!p-2 border text-gray-600 !border-ado-gray shadow-green hover:bg-gray-200 !rounded-full hidden md:flex" onClick={() => scrollRef.current?.scrollBy({ left: 120, behavior: "smooth" })} icon={<Image src={rightArrow} alt="right arrow" className="w-[15px]" />} />
      )}
      <Modal isOpen={open} showCloseIcon={true} onClose={handleModalClose}   >
        <div className="flex flex-col gap-[16px] p-[16px]">
          <div className="flex flex-col justify-center items-center gap-[16px]">
            <span className="text-yellow-500 w-fit text-2xl border border-ado-alert-border bg-ado-sandal rounded-[50%]"><Image alt="date change" src={alertIcon} className="p-4" /></span>
            <h2 className="font-semibold text-center text-[18px]">{t.raw("date_popup.title")}</h2>
          </div>

          <div className="flex flex-col justify-center item-center">
            <p className="flex justify-center text-[14px]">
              {t("date_popup.content")}<span className="font-bold ml-[5px]">{selectedDate?.day} {selectedDate?.date} de {t.raw(`months.${selectedDate?.month || 0}`)} </span>
            </p>
            <p className="flex justify-center  text-[14px]">{t("date_popup.continue_link")}</p>
          </div>
          <div className="flex justify-between gap-[16px] flex-col w-full sm:flex-row">
            <Button buttonStyle="outline" className={"w-full text-[16px]"} buttonText={t("date_popup.cancel")} onClick={handleDateChange} />
            <Button className={"w-full text-[16px]"} buttonText={t("date_popup.continue_btn")} onClick={handleDateChange} />
          </div>
        </div>

      </Modal>
    </div>
  );
};

export default DateSlider;
