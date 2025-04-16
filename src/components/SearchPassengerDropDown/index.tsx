import React from "react";
import { useTranslations } from "next-intl";
import Adult from "../../assets/svg/adult.svg";
import Child from "../../assets/svg/child.svg";
import Inapam from "../../assets/svg/inapam.svg";
import Teacher from "../../assets/svg/teacher.svg";
import Student from "../../assets/svg/student.svg";
import PassengerCard from "../PassengerCard";
import Button from "@/components/ui/Button";

type PassengerType = "Adult" | "Child" | "INAPAM" | "Teacher" | "Student";

interface SearchPassengerDropDownProps {
  updatePassengerCount?: (type: PassengerType, delta: number) => void;
  passengerValues?: {
    Adult: number;
    Child: number;
    INAPAM: number;
    Teacher: number;
    Student: number;
  };
  handlePassengersSelection?: () => void;
}

const SearchPassengerDropDown: React.FC<SearchPassengerDropDownProps> = ({
  updatePassengerCount,
  passengerValues,
  handlePassengersSelection,
}) => {
  const t = useTranslations("search_results");

  return (
    <div className="absolute right-0 top-full bg-[#FAFAFA] border border-gray-300 w-[800px] mt-1 rounded-[8px] shadow-lg z-[9999] max-h-120 overflow-auto flex flex-col p-[16px]">
      <p className=" text-[16px] font-medium font-gotham-pro ">{t("who_travels")}</p>
      <hr className="border-t border-[#E3E7F2] mt-[10px] " />

      <div className=" mt-[10px] flex justify-between items-center ">
        <PassengerCard
          imageSrc={Adult}
          cardName={t("adults")}
          cardDescription={t("adult_description")}
          value={passengerValues?.Adult || 0}
          updatePassengerCount={updatePassengerCount}
        />
        <PassengerCard
          imageSrc={Teacher}
          cardName={t("teacher")}
          cardDescription={t("teacher_description")}
          value={passengerValues?.Teacher || 0}
          updatePassengerCount={updatePassengerCount}
        />
      </div>

      <div className=" mt-[20px] flex justify-between items-center ">
        <PassengerCard
          imageSrc={Child}
          cardName={t("children")}
          cardDescription={t("children_description")}
          value={passengerValues?.Child || 0}
          updatePassengerCount={updatePassengerCount}
        />
        <PassengerCard
          imageSrc={Student}
          cardName={t("student")}
          cardDescription={t("student_description")}
          value={passengerValues?.Student || 0}
          updatePassengerCount={updatePassengerCount}
        />
      </div>

      <div className=" mt-[20px] flex justify-between items-center ">
        <PassengerCard
          imageSrc={Inapam}
          cardName={t("inapam")}
          cardDescription={t("inapam_description")}
          value={passengerValues?.INAPAM || 0}
          updatePassengerCount={updatePassengerCount}
        />
        <Button variant="primary" buttonText={t("ready")} onClick={handlePassengersSelection} />
      </div>
    </div>
  );
};

export default SearchPassengerDropDown;
