"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, isBefore, isAfter, isSameDay, addDays } from "date-fns";
import Modal from "@/components/Modal";
import alertIcon from "@/assets/png/alert.png"
import leftArrow from '@/assets/png/leftArrow.png'
import rightArrow from '@/assets/png/rightArrow.png'
import Button from '@/components/Button'

interface DateItem {
  date: string;
  day: string;
  past: boolean;
  current: boolean;
  future: boolean;
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

interface DateSliderProps {
  onDateSelect: Function;
}

interface DateInfo {
  day: string;
  date: number;
  month: number;
}

const DateSlider: React.FC<DateSliderProps> = ({ onDateSelect }) => {
  const dates = generateDates();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateInfo | null>(null);
  const [showArrows, setShowArrows] = useState<boolean>(window.innerWidth > 768);
  const t = useTranslations("home");

  useLayoutEffect(() => {
    const handleResize = () => {
      setShowArrows(window.innerWidth > 768);
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
    <div className="flex items-center justify-center  p-4    w-full max-w-[100vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] mx-auto max-[500px]:p-0 max-[500px]:m-0">
      {showArrows && (
        <Button className="!p-2 border text-gray-600 mr-4 hover:bg-gray-200 rounded-full hidden md:flex" onClick={() => scrollRef.current?.scrollBy({ left: -120, behavior: "smooth" })} icon={<Image src={leftArrow} alt="left arrow" className="w-[15px]" />} />
      )}
      <div className="relative w-full bg-gray-100 border rounded-md p-4 overflow-hidden min-[800px]:max-w-[900px] max-[500px]:max-w-full max-[500px]:p-0 max-[500px]:m-0">
        <div ref={scrollRef} className="flex items-center overflow-x-auto scrollbar-hide" style={{ whiteSpace: "nowrap", scrollSnapType: "x mandatory" }}>
          {dates.map(({ day, date, past }, index) => (<div
            key={date}
            className={`w-[90px] h-[40px] px-4 py-2 flex items-center justify-center text-center transition-all max-[500px]:p-[40px] max-[500px]:w-[33vw] cursor-pointer ${selectedIndex === index ? "border-b-4 rounded-md bg-white border-green-500 font-semibold shadow-md" : "hover:bg-gray-100 opacity-70"
              }`}
            onClick={() => handleSelectDate(index, t.raw(`days.${day}`)[1], new Date(date).getDate())}
            aria-disabled={past}
          >
            <span className={`text-sm capitalize ${past ? "text-gray-300" : "text-gray-600"}`}>
              {t.raw(`days.${day}`)[0]}. {new Date(date).getDate()}
            </span>
          </div>
          ))}
        </div>
      </div>
      {showArrows && (
        <Button className="!p-2 border text-gray-600 ml-4 hover:bg-gray-200 rounded-full hidden md:flex" onClick={() => scrollRef.current?.scrollBy({ left: 120, behavior: "smooth" })} icon={<Image src={rightArrow} alt="right arrow" className="w-[15px]" />} />
      )}
      <style jsx>{`
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <Modal isOpen={open} showCloseIcon={true} onClose={handleModalClose}>
        <div className="flex justify-center">
          <span className="text-yellow-500 text-2xl border border-ado-alert-border bg-ado-sandal rounded-[50%]"><Image alt="date change" src={alertIcon} className="p-4" /></span>
        </div>
        <div className="flex-col justify-center item-center">
          <h2 className="text-lg font-semibold text-center mt-2">{t.raw("date_popup.title")}</h2>
          <p className="flex justify-center text-[14px]">
            {t("date_popup.content")}<span className="font-bold ml-[5px]">{selectedDate?.day} {selectedDate?.date} de {t.raw(`months.${selectedDate?.month || 0}`)} </span>
          </p>
          <p className="flex justify-center  mt-2 text-[14px]">{t("date_popup.continue_link")}</p>
        </div>
        <div className="flex justify-between mt-6 max-xs:flex-col">
          <Button variant="secondary" className={"px-4 py-2 border border-ado-purple text-ado-purple rounded-[5px] w-1/2  mr-2 justify-center max-xs:w-full"} width={"w-1/2"} buttonText={t("date_popup.cancel")} onClick={handleDateChange} />
          <Button variant="primary" className={"px-4 py-2 bg-ado-purple text-white rounded-[5px] w-1/2 ml-2   justify-center  max-xs:w-full  max-xs:mt-4 max-xs:ml-0"} width={"w-1/2"} buttonText={t("date_popup.continue_btn")} onClick={handleDateChange} />
        </div>
      </Modal>
    </div>
  );
};

export default DateSlider;
