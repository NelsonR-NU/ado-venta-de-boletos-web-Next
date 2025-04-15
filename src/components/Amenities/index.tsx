import Image from "next/image";
import React from "react";
import { AmenityItem } from "@/types/components/TicketCard";
// Update these paths to match your project's asset structure
import Amenities1 from "@/assets/svg/amenities1.svg";
import Amenities2 from "@/assets/svg/amenities2.svg";
import Amenities3 from "@/assets/svg/amenities3.svg";
import Amenities4 from "@/assets/svg/amenities4.svg";
import Amenities5 from "@/assets/svg/amenities5.svg";
import Amenities6 from "@/assets/svg/amenities6.svg";
import Amenities7 from "@/assets/svg/amenities7.svg";
import Amenities8 from "@/assets/svg/amenities8.svg";
import Amenities9 from "@/assets/svg/amenities9.svg";

const amenitiesList: AmenityItem[] = [
  {
    icon: Amenities1,
    title: "Pantalla",
  },
  {
    icon: Amenities2,
    title: "Sanitario",
  },
  {
    icon: Amenities3,
    title: "Audio Individual",
  },
  {
    icon: Amenities4,
    title: "Aire acondicionado",
  },
  {
    icon: Amenities5,
    title: "Conexión USB/ Eléctrica",
  },
  {
    icon: Amenities6,
    title: "Viajar con mascotas",
  },
  {
    icon: Amenities7,
    title: "Hasta 25kg de equipaje sin costo",
  },
  {
    icon: Amenities8,
    title: "Bebida/Refrigerio",
  },
  {
    icon: Amenities9,
    title: "Venta de transportadoras",
  },
];

const Amenities: React.FC = () => (
  <div className="flex-col">
    <span className="text-[1rem] font-medium">Amenidades de viaje en ADO</span>
    <div className="flex w-full flex-wrap gap-y-5 pt-4 pr-20">
      {amenitiesList.map((item, i) => (
        <div key={i} className="flex gap-y-5 gap-x-5 items-center w-1/3 flex-3">
          <Image alt="" src={item.icon} width={24} height={24} />
          <span className="max-w-[90px] text-[0.75rem] leading-[1rem] font-medium">
            {item.title}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default Amenities;
