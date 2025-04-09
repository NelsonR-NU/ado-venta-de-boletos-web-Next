import React from "react";
import banner from "@/assets/png/banner.png";
import Image from "next/image";
import Button from "../Button";

type PromoCardProps = {
  imageUrl?: string;
  bannerTitle: string;
  bannerDescription: string;
  btnText: string;
  btnColor: string;
  showImage?: boolean;
  handlePromotionAction: () => void;
};

const PromoCard: React.FC<PromoCardProps> = ({
  imageUrl,
  bannerTitle,
  bannerDescription,
  btnText,
  btnColor,
  showImage = true,
  handlePromotionAction,
}) => (
  <div className="flex flex-col sm:flex-row mt-5 mx-4 sm:mx-0 bg-white rounded-lg shadow-lg overflow-hidden">
    {showImage && (
      <div className="w-full h-[180px] sm:w-[320px]  sm:h-[200px] ">
        <Image src={banner} alt="Promo" className="w-full h-full object-cover" />
      </div>
    )}
    <div className="flex-1  border-0 flex flex-col justify-center px-4 py-6  gap-3 sm:border rounded-r-lg   sm:border-l-0 sm:border-[#FF6633]">
      <h2 className="text-[20px] font-bold sm:text-[24px]">{bannerTitle}</h2>
      <p className="text-gray-700 text-[14px] sm:text-[16px]">{bannerDescription}</p>
      <Button
        buttonStyle="filled"
        className="bg-ado-purple sm:bg-[#FF6633] w-full sm:w-fit px-4 text-white py-2 rounded-md text-[14px] sm:text-[16px] justify-center"
        onClick={handlePromotionAction}
        buttonText={btnText}
      />
    </div>
  </div>
);

export default PromoCard;
