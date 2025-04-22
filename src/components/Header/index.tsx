'use client';

import React, { useEffect, useRef, useState } from 'react';
import Container from '../Container/Container';
import Image from 'next/image';
import AdoLogo from '@/assets/svg/adoLogo.svg';
import downChevron from "@/assets/svg/downArrowBlack.svg";
import ProfileIcon from '@/assets/svg/profile.svg';
import Button from '../ui/Button';

const Header: React.FC = () =>{
    const response = [
        {
            id: '1',
            name: 'Inicio',
            link: '/',
            children: []
        },
        {
            id: '2',
            name: 'Mis viajes',
            link: '/',
            children: [
                {
                    id: '21',
                    name: 'Option One',
                    link: '/',
                    children: []
                },
                {
                    id: '22',
                    name: 'Option Two',
                    link: '/',
                    children: []
                },
                {
                    id: '23',
                    name: 'Option Tjree',
                    link: '/',
                    children: []
                },
            ]
        },
        {
            id: '3',
            name: 'SALDO MAX',
            link: '/',
            children: []
        },
        {
            id: '4',
            name: 'Ayuda',
            link: '/',
            children: [
                {
                    id: '41',
                    name: 'Option One',
                    link: '/',
                    children: []
                },
                {
                    id: '42',
                    name: 'Option Two',
                    link: '/',
                    children: []
                },
                {
                    id: '43',
                    name: 'Option Tjree',
                    link: '/',
                    children: []
                },
            ]
        },
    ];

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleDropdownToggle = (id: string, hasChildren: boolean) => {
        if (!hasChildren) return;
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
        <div className=' w-full h-[72px] bg-ado-date-background ' >
            <Container className='h-full flex items-center' >
                <div className=' w-full flex items-center justify-between ' ref={dropdownRef} >
                    <Image src={AdoLogo} alt="ADO Logo" />
                    <div className='flex gap-[24px] items-center' >
                        {response.map((item, index) => {
                            const hasChildren = item.children.length > 0;
                            const isLastItem = index === response.length - 1;
                            return (
                                <div key={item.id} className='relative flex items-center gap-[24px] '>
                                    <span
                                        onClick={() => handleDropdownToggle(item.id, hasChildren)}
                                        className='text-[12px] flex items-center gap-[8px] text-ado-text-gray cursor-pointer transition'
                                    >
                                        {item.name}
                                        { hasChildren && <Image src={downChevron} alt="Down Arrow" className=' w-[12px] h-[12px] mt-[1px] ' />}
                                    </span>

                                    {hasChildren && activeDropdown === item.id && (
                                        <div className='absolute top-full left-0 mt-2 w-max bg-white shadow-lg rounded-lg z-50 py-2'>
                                            {item.children.map((child) => (
                                                <a key={child.id} href={child.link}>
                                                    <span className='block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer'>
                                                        {child.name}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                    { !isLastItem && <span className="border-l border-gray-400 h-[24px]"></span>}
                                </div>
                            );
                        })}

                        {
                            isLoggedIn ?
                                <div id="profileIcon" className="w-[40px] h-[40px] bg-[#5F2167] rounded-[16px] flex items-center justify-center">
                                    <Image src={ProfileIcon} alt="Profile Icon" class="w-[14px]" />
                                </div>
                                : <>
                                    <Button
                                        variant="primary"
                                        className="border border-ado-purple !text-[14px] !px-2 "
                                        buttonText="Iniciar sesión"
                                    />
                                    <Button
                                        variant="primary"
                                        className="border border-ado-purple !text-[14px] !px-2 "
                                        buttonText="Registrarme"
                                        buttonStyle='outline'
                                    />
                                </>
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
