import React, { ReactNode } from "react";
import Image from "next/image";
import alertIcon from '../../assert/alert.png'
import closeIcon from '../../assert/ado-brand-icon/close.svg' 


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string; 
  content: ReactNode; 
  confirmBtn: string; 
  cancelBtn: string
}

const DateChangeModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, content, confirmBtn, cancelBtn, }) => {

  if (!isOpen) return null;
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as HTMLDivElement).id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div 
      id="modal-overlay" 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10]"
      onClick={handleOutsideClick}
    >
      <div className="flex-col bg-white rounded-lg shadow-lg w-[600px] p-6 max-xs:w-fit max-xs:m-[20px]">

        <div className=" justify-end ">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Image alt="date change close icon" className="w-[20px]" src={closeIcon} />
          </button>
        </div>
        <div className="justify-center">
          <span className="text-yellow-500 text-2xl border border-ado-alert-border bg-ado-sandal rounded-[50%]"><Image alt="date change" src={alertIcon} className="p-4" /></span>
        </div>
        {content} 
        <div className="flex justify-between mt-6 max-xs:flex-col">
          <button
            className="px-4 py-2 border border-ado-purple text-ado-purple rounded-[5px] w-1/2  mr-2 justify-center max-xs:w-full"
            onClick={onClose}
          >
            {cancelBtn}
          </button>
          <button
            className="px-4 py-2 bg-ado-purple text-white rounded-[5px] w-1/2 ml-2   justify-center  max-xs:w-full  max-xs:mt-4 max-xs:ml-0 "
            onClick={onConfirm}
          >
            {confirmBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateChangeModal;
