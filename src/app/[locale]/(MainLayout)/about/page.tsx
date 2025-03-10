"use client";
import { useState } from "react";
import Container from "@/components/Container";
import Filter from "@/components/Filter";
import DateSlider from "@/components/HorizantalScrollBar"; 
import CustomDrawer from "@/components/CustomDrawer";

interface FilterData { 
    day:string,
    date:string 
}

export default function HomePage() { 
  const [selectedDate, setSelectedDate] = useState<FilterData>({day:new Date().toLocaleDateString("en-US", { weekday: "short" }),date:new Date().toISOString().split("T")[0]});
 
  const handleDateChange = (date: FilterData) => {
    setSelectedDate(date);
  };

  const handleFilterAction=()=>{};
  return (
    <Container className={"max-[500px]:p-0 max-[500px]:m-0"}>
      <div className="flex-col"> 
        <DateSlider onDateSelect={handleDateChange} /> 
        <Filter date={selectedDate}   />
        
      </div>
    </Container>
  );
}
