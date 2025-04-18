import Image from "next/image";
import { useState } from "react";
import downChevron from "@/assets/svg/downArrow.svg";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  onSelect?: (option: string) => void;
  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
  activeColor?: string;
  title?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "",
  onSelect,
  bgColor = "bg-ado-snow-gray",
  textColor = "text-black",
  hoverColor = "hover:bg-ado-light-blue-gray",
  title,
  className = "",
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect?.(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-[258px]`}>
      <button
        className={`flex justify-between items-center w-full p-4 rounded-lg shadow-md ${bgColor} ${textColor}  ${className}`}
        onClick={() => setIsOpen(!isOpen)}>
        {selected || placeholder}
        <Image
          src={downChevron}
          alt="Dropdown indicator"
          width={15}
          height={15}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute w-full mt-2 bg-white shadow-lg rounded-lg max-h-[326px] overflow-y-auto z-[999] transition-all duration-300 ease-in-out ${
          isOpen
            ? `opacity-100 transform scale-y-100 origin-top`
            : "opacity-0 transform scale-y-0 origin-top"
        }`}>
        <span className="text-sm font-bold">{title}</span>
        <div className={`p-2 rounded-lg ${bgColor} ${title ? "mt-5" : ""}`}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className={`p-2 ${hoverColor} cursor-pointer rounded`}>
              <span className={`text-sm ${textColor}`}>{option}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
