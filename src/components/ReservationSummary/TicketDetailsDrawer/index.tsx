import Image from "next/image";
import * as React from "react";
import { useTranslations } from "next-intl";
import DrawerModal from "@/components/Drawer";
import passangerIcon from "@/assets/png/passangerIcon.png";
import clockIcon from "@/assets/png/clockIcon.png";
import upArrow from "@/assets/svg/upArrow.svg";
import downArrow from "@/assets/png/bottomarrow.png";
import adoBus from "@/assets/png/adobrand.png";
import originStop from "@/assets/png/originStop.png";
import indermediateStop from "@/assets/png/intermidateStops.png";
import destinationStop from "@/assets/png/destinationStop.png";

interface TicketDetailsDrawer {
  isOpen: boolean;
  onClose: () => void;
}

interface TripPlaceProps {
  title: string;
  content: string;
  className?: string;
}

const TripPlace: React.FC<TripPlaceProps> = ({ title, content, className }) => (
  <div className="flex items-center gap-2">
    <span className="font-bold">{title}</span>
    <span className={className}>{content}</span>
  </div>
);

const TicketDetailsDrawer: React.FC<TicketDetailsDrawer> = ({
  isOpen,
  onClose,
}: TicketDetailsDrawer) => {
  const t = useTranslations("reservation_summary");
  const [showStops, setShowStops] = React.useState<boolean>(false);

  const stops = [
    "Cuernavaca",
    "San Miguel de las Palmas",
    "Chilpancingo de Bravo",
    "Ciudad San Agustín",
  ];

  return (
    <DrawerModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("ticket_details")}
      closeLabel={t("close")}
      className="w-full sm:w-[560px] shadow-strong-smoke">
      <div className="w-full flex flex-col gap-6 ">
        <div className="bg-ado-bg-light-gray text-base text-ado-text-gray p-6 flex flex-col gap-4">
          <div className="flex gap-2 text-ado-black">
            <TripPlace title="Viaje de ida:" content="Vier. 12 de nov." />
          </div>
          <hr className="border-ado-neutral-light" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex flex-col gap-3">
                <TripPlace
                  title={t("origen")}
                  content="Central México Norte, CDMX"
                  className={"text-xs"}
                />
                <TripPlace
                  title={t("destination")}
                  content="Acapulco Costera, Gro."
                  className={"text-xs"}
                />
              </div>
              <div className="flex  gap-1">
                <Image src={passangerIcon} alt="passanger icon" className="w-4 h-4" />
                <span className="text-xs ">x{"1"}</span>
              </div>
            </div>
            <hr className="border-ado-neutral-light" />
            <div className="flex items-center gap-2">
              <Image src={clockIcon} alt="clock icon" className="w-4 h-4" />
              <span className="text-xs text-ado-text-gray"> 5 h 10 min. aprox.</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-ado-white px-6 py-4 rounded-lg ">
            <h2 className="px-2 py-4 text-sm text-ado-text-gray font-bold border-b border-ado-light-blue-gray">
              Detalles del viaje
            </h2>
            <div className="flex flex-col">
              <div className="flex ">
                <div className="text-ado-black text-center leading-[1] w-[60px]">
                  <p className="text-[10px]">10 min</p>
                  <p className="text-[10px]">Aprox.</p>
                </div>
                <div className="w-10 flex flex-col justify-end items-center">
                  <div className="border border-ado-gray rounded-md bg-ado-text-white p-1">
                    <Image src={clockIcon} alt="clock icon " width={14} height={14} />
                  </div>
                  <div className="flex flex-col w-fit p-[3px] items-center gap-1 bg-ado-gray ">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <span
                        key={index}
                        className="w-[5px] h-[5px] rounded-full bg-[#9999B3]"></span>
                    ))}
                  </div>
                </div>
                <div className="flex-1 ">
                  <div className="flex justify-between items-center gap-4 border-b border-ado-gray pl-2 py-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm">Central México Norte, CDMX</h3>
                      <p className="text-xs">
                        Tiempo libre en la sala de espera de Autobuses para abordar.
                      </p>
                    </div>
                    <div className="flex-1 min-w-12 text-sm">05:50 h</div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex w-[60px] items-center flex-col justify-between">
                  <Image src={adoBus} alt="origin bus icon " width={40} height={14} />
                  <div className="leading-[1]">
                    <p className="text-[10px]">5hrs 10min</p>
                    <p className="text-[10px]">Aprox.</p>
                  </div>
                </div>
                <div className="w-10 flex flex-col justify-center items-center">
                  <Image src={originStop} alt="origin bus icon " className="w-5 h-5" />
                  <div className="flex flex-col  px-[3px] items-center gap-1 bg-ado-gray ">
                    <div className="h-[100px] w-[5px] bg-ado-light-purple"></div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col  gap-2">
                  <div className="flex justify-between items-center gap-4 border-b border-ado-gray pl-2 pb-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm">Central México Norte, CDMX</h3>
                      <p className="text-xs">Terminal origen</p>
                    </div>
                    <div className="text-end min-w-12 text-sm">06:00 h</div>
                  </div>
                  <div
                    role="button"
                    onClick={() => setShowStops((show) => !show)}
                    className="flex border-b border-ado-gray pl-2 py-3 cursor-pointer">
                    <div className="flex items-center gap-2 ">
                      <Image
                        src={showStops ? upArrow : downArrow}
                        alt="up arrow icon "
                        className="w-2 h-2"
                      />
                      <h3 className="text-sm">4 paradas</h3>
                    </div>
                  </div>
                </div>
              </div>
              {showStops &&
                stops.map((item, key) => (
                  <div className="flex" key={key}>
                    <div className="w-[60px]"></div>
                    <div className="w-10 flex flex-col justify-center items-center">
                      <Image src={indermediateStop} alt="origin bus icon " className="w-5 h-5" />
                      <div className="flex flex-col w-fit px-[3px] items-center gap-1 bg-ado-gray ">
                        <div className="h-[60px] w-[5px] bg-ado-light-purple"></div>
                      </div>
                    </div>
                    <div className="flex-1 w-full flex justify-between gap-2  ">
                      <div className="flex h-fit w-full justify-between border-b border-ado-gray pl-2 pb-3">
                        <h3 className="text-sm">{item}</h3>
                        <div></div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="flex">
                <div className="w-[60px]"></div>

                <div className="w-10 flex justify-center">
                  <Image src={destinationStop} alt="clock icon " className="w-5 h-5" />
                </div>
                <div className="flex-1 flex justify-between border-b gap-2 pl-2 pb-3">
                  <div className="">
                    <h3 className="text-sm">Acapulco Costera, Gro.</h3>
                    <p className="text-xs">Terminal destino</p>
                  </div>
                  <p className="text-sm">05:50 h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-ado-footer-gray text-ado-white text-[10px] py-4 px-6 flex justify-center items-center gap-6  ">
        <span>
          La duración del viaje puede variar según las condiciones climáticas o de tránsito.
        </span>
        <div className="min-h-10 border-l border-ado-neutral-light"></div>
        <span>
          Las mascotas o animales que viajen deberán ir asegurados en una caja transportadora.
        </span>
      </div>
    </DrawerModal>
  );
};
export default TicketDetailsDrawer;
