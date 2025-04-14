import React from "react";
import ticketData from '@/mock/ticketList.json'
import TicketDetailsCard from "./TicketDetailsCard";

const TicketList: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            {ticketData.map((ticket, index) => (
                <TicketDetailsCard index={index} ticket={ticket} />
            ))}
        </div>
    );
};

export default TicketList;
