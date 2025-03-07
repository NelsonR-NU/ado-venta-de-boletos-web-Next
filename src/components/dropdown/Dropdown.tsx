"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CaretDownIcon from "@/assets/svg/caret-down.svg";

interface Option {
    value: string | number;
    label: string;
    icon?: string;
}

interface DropdownProps {
    options: Option[];
    selected: string | number;
    onChange: (value: string | number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (
    //             dropdownRef.current &&
    //             !dropdownRef.current.contains(event.target as Node) &&
    //             buttonRef.current &&
    //             !buttonRef.current.contains(event.target as Node)
    //         ) {
    //             setIsOpen(false);
    //             setHighlightedIndex(null);
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => document.removeEventListener("mousedown", handleClickOutside);
    // }, []);

    const handleSelect = (option: Option) => {
        onChange(option.value);
        setIsOpen(false);
        setHighlightedIndex(null);
        buttonRef.current?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement | HTMLUListElement>) => {
        if (event.key === "Escape") {
            setIsOpen(false);
            setHighlightedIndex(null);
            buttonRef.current?.focus();
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setIsOpen(true);
            setHighlightedIndex((prev) => {
                const nextIndex = prev === null || prev === options.length - 1 ? 0 : prev + 1;
                return nextIndex;
            });
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setIsOpen(true);
            setHighlightedIndex((prev) => {
                const prevIndex = prev === null || prev === 0 ? options.length - 1 : prev - 1;
                return prevIndex;
            });
        }

        if (event.key === "Enter" && highlightedIndex !== null) {
            event.preventDefault();
            handleSelect(options[highlightedIndex]);
        }
    };

    // const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    //     if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget)) {
    //         setIsOpen(false);
    //         setHighlightedIndex(null);
    //     }
    // };

    // useEffect(() => {
    //     if (isOpen && highlightedIndex !== null) {
    //         optionRefs.current[highlightedIndex]?.focus();
    //     }
    // }, [highlightedIndex, isOpen]);

    const selectedOption = options.find((opt) => opt.value === selected);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                ref={buttonRef}
                className="flex items-center gap-2 bg-transparent text-ado-white border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                onKeyDown={handleKeyDown}
            >
                {selectedOption?.icon && (
                    <Image src={selectedOption.icon} alt="" width={16} height={16} />
                )}

                <span className="hidden md:inline text-ado-white">{selectedOption?.label || selected}</span>
                <span className="md:hidden text-ado-white">{selectedOption?.value.toString().split(" ")[0]}</span>

                <Image alt="Dropdown" src={CaretDownIcon} height={10} width={10} />
            </button>

            {isOpen && (
                <ul
                    ref={listRef}
                    className="absolute top-full left-0 mt-[1px] bg-ado-white text-ado-black shadow-md rounded w-[169px] md:w-40"
                    role="listbox"
                    onKeyDown={handleKeyDown}
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            ref={(el) => (optionRefs.current[index] = el)}
                            className={`flex items-center gap-2 px-4 py-2 cursor-pointer
            ${highlightedIndex === index || selected === option.value ? "bg-ado-purple text-white" : "hover:bg-gray-100 text-gray-900"}`}
                            onClick={() => handleSelect(option)}
                            role="option"
                            aria-selected={selected === option.value}
                            tabIndex={0}
                        >
                            {option.icon && (
                                <Image src={option.icon} alt="" width={16} height={16} className="invert" />
                            )}
                            <span className={`font-medium ${highlightedIndex === index || selected === option.value ? "text-white" : "text-gray-900"}`}>
                                {option.label}
                            </span>
                        </li>
                    ))}


                </ul>
            )}
        </div>
    );
};

export default Dropdown;
