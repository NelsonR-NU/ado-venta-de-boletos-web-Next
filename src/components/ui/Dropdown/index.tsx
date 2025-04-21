import Image from "next/image";
import { ReactNode, useState } from "react";
import downChevron from "@/assets/svg/downArrow.svg";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  customHeader?: ReactNode;
  customIcon?: string;
  onSelect?: (option: string) => void;
  bgColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  hoverColor?: string;
  activeColor?: string;
  title?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "",
  customHeader,
  customIcon,
  onSelect,
  bgColor = "bg-ado-snow-gray",
  textColor = "text-black",
  hoverColor = "hover:bg-ado-light-blue-gray",
  hoverTextColor = "hover:text-black",
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
        {customHeader ? customHeader : selected || placeholder}
        <Image
          src={customIcon || downChevron}
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
              className={`p-2 ${hoverColor} cursor-pointer rounded ${hoverTextColor}`}>
              <span className={`text-sm cursor-pointer ${textColor}`}>{option}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
