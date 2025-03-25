import React from "react";
import banner from '@/assets/png/banner.png'
import Image from "next/image";
import Button from "../Button";

interface PromoCardProps {
    imageUrl?: string;
    bannerTitle: string;
    bannerDescription: string;
    btnText: string;
    btnColor: string;
    showImage?: boolean;
    handlePromotionAction: () => void
}

const PromoCard: React.FC<PromoCardProps> = ({
    imageUrl,
    bannerTitle,
    bannerDescription,
    btnText,
    btnColor,
    showImage = true,
    handlePromotionAction
}) => {
    return (
        <div className="flex max-xs:items-start mt-[20px] items-center bg-white rounded-lg shadow-[0px_18px_30px_rgba(13,14,15,0.12)] overflow-hidden w-full max-xs:flex-col">
            {showImage && (
                <div className="w-1/4 h-full max-xs:w-full">
                    <Image
                        src={banner}
                        alt="Promo"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="w-3/4 p-6 flex-col gap-[10px] max-xs:w-full border-l-0 border border-[#FF6633] rounded-r-lg flex h-full">
                <h2 className="text-[24px] font-bold max-xs:text-[28px]">{bannerTitle}</h2>
                <p className="text-ado-text-black text-[14px] max-xs:text-[18px]">{bannerDescription}</p>
                <button
                    className="bg-[#FF6633] w-fit px-4 text-white py-2 rounded-[5px] text-[14px] max-xs:text-[18px] justify-center max-xs:w-full"
                    onClick={handlePromotionAction}
                >
                    {btnText}
                </button>
            </div>
        </div>
    );
};

export default PromoCard;
