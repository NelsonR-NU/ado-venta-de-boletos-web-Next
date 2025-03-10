"use client";
import { useTranslations } from "next-intl";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, isBefore, isAfter, isSameDay, addDays } from "date-fns";

type DateItem = {
  date: string;
  day: string;
  past: boolean;
  current: boolean;
  future: boolean;
};

const getSpanishDay = (dayIndex: number): string => {
  const daysInSpanish = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  return daysInSpanish[dayIndex] || "";
};

const generateDates = (): DateItem[] => {
  const dates=["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
  const today = new Date();
  const startDate = addDays(today, -5);
  const endDate = addDays(today, 30);
  const daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return Array.from({ length: daysDifference + 1 }, (_, i) => {
    const currentDate = addDays(startDate, i);
    return {
      date: format(currentDate, "yyyy-MM-dd"),
      day:dates[currentDate.getDay()],
      past: isBefore(currentDate, today) && !isSameDay(currentDate, today),
      current: isSameDay(currentDate, today),
      future: isAfter(currentDate, today),
    };
  });
};

interface DateSliderProps {
  onDateSelect: Function;
}

const DateSlider: React.FC<DateSliderProps> = ({ onDateSelect }) => {
  const dates = generateDates();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showArrows, setShowArrows] = useState<boolean>(window.innerWidth > 768);
  const t = useTranslations("days");
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

  const handleSelectDate = (index: number) => {
    if (dates[index].past) return;
    setSelectedIndex(index);
    onDateSelect({date:dates[index].date,day:dates[index].day});
    console.log("dates[index]",dates[index])
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.children[index] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  };

  return (
    <div className="flex items-center justify-center  p-4 bg-white rounded-lg shadow-md w-full max-w-[100vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] mx-auto max-[500px]:p-0 max-[500px]:m-0">
      {showArrows && (
        <button className="p-2 text-gray-600 mr-1 hover:bg-gray-200 rounded-full hidden md:flex" onClick={() => scrollRef.current?.scrollBy({ left: -120, behavior: "smooth" })}>
          <ChevronLeft size={20} />
        </button>
      )}
      <div className="relative w-full bg-gray-100 border rounded-md p-4 overflow-hidden min-[800px]:max-w-[900px] max-[500px]:max-w-full max-[500px]:p-0 max-[500px]:m-0">
        <div ref={scrollRef} className="flex items-center overflow-x-auto scrollbar-hide" style={{ whiteSpace: "nowrap", scrollSnapType: "x mandatory" }}>
          {dates.map(({ day, date, past }, index) => ( 
              <button
              key={date}
              className={`w-[90px] h-[40px] px-4 py-2 flex items-center justify-center text-center transition-all max-[500px]:p-[40px] max-[500px]:w-[33vw] ${selectedIndex === index ? "border-b-4 rounded-md bg-white border-green-500 font-semibold shadow-md" : "hover:bg-gray-100 opacity-70"
                }`}
              onClick={() => handleSelectDate(index)}
              disabled={past}
            >
              <span className={`text-sm capitalize ${past ? "text-gray-300" : "text-gray-600"}`}>{t(day)}. {new Date(date).getDate()}</span>
            </button> 
          ))}
        </div>
      </div>
      {showArrows && (
        <button className="p-2 text-gray-600 ml-1 hover:bg-gray-200 rounded-full hidden md:flex" onClick={() => scrollRef.current?.scrollBy({ left: 120, behavior: "smooth" })}>
          <ChevronRight size={20} />
        </button>
      )}
      <style jsx>{`
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default DateSlider;
