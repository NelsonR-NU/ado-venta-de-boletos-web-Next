"use client";
import { useState } from "react";
import Container from "@/components/Container";
import Filter from "@/components/Filter";
import DateSlider from "@/components/HorizantalScrollBar"; 
import PromoCard from "@/components/promoCard/PromoCard";
import { useTranslations } from "next-intl";

interface FilterData {
  day: string,
  date: string
}

export default function HomePage() {
   const t = useTranslations("home");
  const [selectedDate, setSelectedDate] = useState<FilterData>({ day: new Date().toLocaleDateString("en-US", { weekday: "short" }), date: new Date().toISOString().split("T")[0] });

  const handleDateChange = (date: FilterData) => {
    setSelectedDate(date);
  };
 
  const handlePromotionAction = () => {
    console.log("promotion interested")
   };
  return (<>
    <Container className={"max-[500px]:p-0 max-[500px]:m-0"}>
      <div className="flex-col w-full">
        <DateSlider onDateSelect={handleDateChange} />
        <Filter date={selectedDate} />
        <PromoCard imageUrl={""} bannerTitle={t('promotion.title')} bannerDescription={t('promotion.description')} btnText={t('promotion.btnText')} btnColor={"ado-btn-red"} showImage={true} handlePromotionAction={handlePromotionAction} />
      </div>
    </Container> 
  </>
  );
}
