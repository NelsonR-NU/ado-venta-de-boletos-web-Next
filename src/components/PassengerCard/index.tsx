import Image, { StaticImageData } from 'next/image'
import React from 'react'
import Info from '../../assets/svg/info.svg';
import DisabledMinus from '../../assets/svg/disabledMinus.svg';
import Add from '../../assets/svg/add.svg';

type PassengerType = 'Adult' | 'Child' | 'INAPAM' | 'Teacher' | 'Student';

interface PassengerCard {
    imageSrc: StaticImageData;
    cardName: string;
    cardDescription: string;
    value: number;
    updatePassengerCount?: (type: PassengerType, delta: number) => void;
  }

function PassengerCard({imageSrc, cardName, cardDescription, value, updatePassengerCount}: PassengerCard) {


  return (
    <div className=' w-[350px] flex justify-between '>
        <div className=' w-[50%] flex ' >
            <div className=' bg-[#F1F3F9] h-[45px] w-[45px] flex justify-center items-center rounded-[4px] ' >
                <Image src={imageSrc} alt="Adult Icon" />
            </div>
            <div className=' flex flex-col ml-[8px] justify-center ' >
                <p className=' text-[14px] font-medium ' >{cardName}</p>
                <div className=' flex ' >
                    <p className=' text-[12px] text-[#808391] truncate w-full ' title={cardDescription} >{cardDescription}</p>
                    <Image src={Info} alt="Adult Icon" className=' ml-[3px] w-[12px] h-[12px] ' />
                </div>
            </div>
        </div>

        <div className=' flex justify-end items-center w-[50%] ' >
            <div 
                className=' w-[45px] h-[45px] flex justify-center items-center bg-[#FAFAFA] border rounded-[4px] cursor-pointer ' 
                onClick={() => updatePassengerCount && updatePassengerCount(cardName as PassengerType, -1)}  
            >
                <Image src={DisabledMinus} alt="Minus Icon" className=' w-[20px] h-[20px] ' />
            </div>
            <p className=' text-[18px] font-medium ml-[15px] mr-[15px] ' >{value}</p>
            <div 
                className=' w-[45px] h-[45px] flex justify-center items-center bg-[#FAFAFA] border rounded-[4px] cursor-pointer ' 
                onClick={() => updatePassengerCount && updatePassengerCount(cardName as PassengerType, 1)} 
            >
                <Image src={Add} alt="Minus Icon" className=' w-[20px] h-[20px] ' />
            </div>
        </div>
    </div>
  )
}

export default PassengerCard