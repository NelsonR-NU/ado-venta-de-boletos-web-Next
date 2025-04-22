'use client';

import React, { useEffect, useRef, useState } from 'react';
import Container from '../Container/Container';
import Image from 'next/image';
import AtencionIcon from '@/assets/svg/atencion.svg';
import EspanolIcon from '@/assets/svg/espanol.svg';
import MxnIcon from '@/assets/svg/mxn.svg';
import TamanoIcon from '@/assets/svg/tamano.svg';
import DownArrow from '@/assets/svg/downArrowWhite.svg';

const AccessibilityBar: React.FC = () =>{

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDropdownToggle = (id: string) => {
        setActiveDropdown(prev => (prev === id ? null : id));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className=' w-full h-[32px] bg-ado-accessibility-bar-bg ' >
            <Container className='h-full flex items-center !py-0 ' >
                <div className=' w-full h-full flex items-center justify-between ' ref={dropdownRef} >
                    <div className=" flex items-center justify-center gap-[4px] " >
                        <Image src={AtencionIcon} alt="ADO Logo" class="w-[16px] mt-1 " />
                        <a href="#" className=" text-[12px] cursor-pointer text-[#FAFAFA] " >Atención a clientes HOLA</a>
                    </div>
                    <div className=' flex items-center justify-center gap-[32px] ' >
                        <div className=" flex items-center justify-center gap-[4px] " >
                            <Image src={TamanoIcon} alt="Tamano Icon" class="w-[16px] " />
                            <a href="#" className=" text-[12px] cursor-pointer text-[#FAFAFA] " >Tamaño</a>
                        </div>
                        <div className="relative flex items-center gap-[4px] cursor-pointer" onClick={() => handleDropdownToggle('currency')}>
                            <Image src={MxnIcon} alt="Mxn Icon" className="w-[16px]" />
                            <span className="text-[12px] text-[#FAFAFA]">MXN</span>
                            <Image src={DownArrow} alt="Currency Dropdown" className="w-[12px]" />
                            {activeDropdown === 'currency' && (
                                <div className="absolute top-full mt-2 left-0 bg-white rounded shadow z-50">
                                    {['MXN', 'USD', 'EUR'].map(currency => (
                                        <div
                                            key={currency}
                                            className="px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setActiveDropdown(null);
                                            }}
                                        >
                                            {currency}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="relative flex items-center gap-[4px] cursor-pointer" onClick={() => handleDropdownToggle('language')}>
                            <Image src={EspanolIcon} alt="Espanol Icon" className="w-[16px]" />
                            <span className="text-[12px] text-[#FAFAFA]">Español</span>
                            <Image src={DownArrow} alt="Language Dropdown" className="w-[12px]" />
                            {activeDropdown === 'language' && (
                                <div className="absolute top-full mt-2 left-0 bg-white rounded shadow z-50">
                                    {['Español', 'English', 'Français'].map(lang => (
                                        <div
                                            key={lang}
                                            className="px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setActiveDropdown(null);
                                            }}
                                        >
                                            {lang}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AccessibilityBar;
