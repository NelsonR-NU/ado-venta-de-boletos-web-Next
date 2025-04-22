import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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
  width?: number;
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
  width = '290px'
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect?.(option);
    setIsOpen(false);
  };

  // 🔹 Handle click outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative" style={{ width: `${width}` }}>
      <button
        className={`flex justify-between items-center w-full p-4 rounded-lg shadow-md ${bgColor} ${textColor} ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate text-sm font-medium">{selected || placeholder}</span>
        <Image
          src={downChevron}
          alt="Dropdown indicator"
          width={15}
          height={15}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute w-full mt-2 bg-white shadow-lg rounded-xl max-h-[200px] overflow-y-auto z-[999] transition-all duration-300 ease-in-out ${
          isOpen
            ? `opacity-100 scale-y-100 origin-top`
            : "opacity-0 scale-y-0 origin-top"
        }`}
      >
        {title && (
          <div className="px-4 py-2 text-sm font-semibold text-gray-700">
            {title}
          </div>
        )}
        <div className={`rounded-xl ${bgColor}`}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className={`px-4 py-3 ${hoverColor} cursor-pointer rounded-xl`}
            >
              <span className={`text-sm font-normal ${textColor} block truncate`}>
                {option}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
