import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { X } from "lucide-react";
import ado from "../assert/ado-brand-icon/ado.svg"

interface TemporaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemporaryDrawer({ isOpen, onClose }: TemporaryDrawerProps) {
  const [price, setPrice] = React.useState<number[]>([280, 2120]);
  const handleClose = () => {
    setTimeout(() => {
      onClose(); // Delay closing slightly
    }, 200);
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className="w-[500px]   bg-white h-full flex flex-col">
        <div className="flex  bg-ado-purple justify-between items-center border-b p-6">
          <h2 className="text-lg  text-ado-white">
            Filtrar resultados
          </h2>
          <span className="cursor-pointer  text-ado-white" onClick={onClose}>Cerrar<X /></span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-5  bg-ado-bg-light-gray p-6 flex-col">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold">Filtrar por:</h2>
            <div className=" flex flex-col bg-white  rounded-lg shadow-md ">
              <div className="flex flex-col p-5 gap-4">
                <div className="flex flex-col ">
                  <div className="bg-[#F3F4F6] p-5 rounded-lg shadow-md  border rounded-xs flex-col">
                    <h2 className="text-lg font-semibold pb-2">Por promoción</h2>
                    <FormControlLabel
                      control={<Checkbox sx={{ color: "#6B7280" }} />}
                      label="Descuento"
                      className="text-gray-700 rounded-lg border bg-white w-fit px-3 pl-1 py-2  "
                    />
                  </div>
                </div>
                <div className="flex flex-col bg-ado-bg-light-gray p-4 rounded-lg shadow-md ">
                  <h3 className="font-semibold text-gray-700">Por horario de salida</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      { label: "Madrugada", time: "00:00 - 06:59" },
                      { label: "Mañana", time: "07:00 - 11:59" },
                      { label: "Tarde", time: "12:00 - 18:59" },
                      { label: "Noche", time: "19:00 - 23:59" },
                    ].map((item, index) => (
                      <div key={index} className="border rounded-lg bg-white px-3 py-2 w-full">
                        <FormControlLabel
                          control={<Checkbox sx={{ color: "#6B7280" }} />}
                          label={
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-700">{item.label}</span>
                              <span className="text-xs text-gray-500">{item.time}</span>
                            </div>
                          }
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col p-4 ">
                  <h3 className="font-semibold text-gray-700">Por precio</h3>

                  <Slider
                    value={price}
                    onChange={(e, newValue) => setPrice(newValue as number[])}
                    min={280}
                    max={2120}
                    className="text-purple-600"
                  />

                  {/* Price Labels with Desde & Hasta */}
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500">Desde</span>
                      <span className="font-semibold">${price[0].toFixed(2)} MXN</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500">Hasta</span>
                      <span className="font-semibold">${price[1].toFixed(2)} MXN</span>
                    </div>
                  </div>
                </div>



                <div className="flex flex-col bg-ado-bg-light-gray p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-gray-700">Por tipo de viaje</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Local", description: "La ruta del viaje comienza en este origen." },
                      { label: "Paso", description: "La ruta del viaje comenzó en otra terminal." },
                    ].map((type, index) => (
                      <div key={index} className="border rounded-lg p-3 w-full bg-white">
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{
                                color: "#6B7280",
                                "&.Mui-checked": { color: "#6B21A8" }, // Custom color for selected
                              }}
                            />
                          }
                          label={
                            <div className="flex flex-col">
                              <span className="font-semibold">{type.label}</span>
                              <span className="text-xs text-gray-500">{type.description}</span>
                            </div>
                          }
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col  bg-ado-bg-light-gray
            p-4 rounded-lg shadow-md ">
                  <h3 className="font-semibold text-gray-700">Por marca</h3>
                  
                    <div  className="border rounded-lg p-3 w-[90px] flex justify-center items-center bg-white w-fit">
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              color: "#6B7280",
                              "&.Mui-checked": { color: "#6B21A8" },
                            }}
                          />
                        }
                        label={
                          <img 
                            alt={"brand.name"}  
                            className="w-[50px] h-[50px]"
                            onError={(e) => (e.currentTarget.src = "/images/empty.png")}
                          />
                        }
                        className="w-full"
                      />
                    </div> 
                </div>
                <div className="flex flex-col bg-ado-bg-light-gray p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-gray-700">Terminal de origen</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Aeropuerto llegadas nacionales",
                      "Central México Norte",
                      "Ejectutiva del sur",
                      "Temporales del Ángel",
                      "México TAPO",
                      "Santa Martha Acatitla",
                    ].map((terminal, index) => (
                      <div key={index} className="border rounded-lg bg-white px-3 py-2 w-full">
                        <FormControlLabel
                          control={<Checkbox sx={{ color: "#6B7280" }} />}
                          label={
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">{terminal}</span>
                              {/* <span className="text-xs text-gray-500">{item.time}</span> */}
                            </div>
                          }
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col  bg-ado-bg-light-gray
            p-4 rounded-lg shadow-md  ">
                  <h3 className="font-semibold text-gray-700">Terminal de destino</h3>
                  <div   className="border rounded-lg bg-white px-3 py-2  w-fit">
                        <FormControlLabel
                          control={<Checkbox sx={{ color: "#6B7280" }} />}
                          label={
                            <div className="flex flex-col ">
                              <span className="text-xs text-gray-500">Veracrus</span> 
                            </div>
                          } 
                        />
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 p-6 gap-4">
        <Button className="!text-black">
            Restablecer filtros
          </Button>
          <Button variant="contained" className="!bg-ado-purple text-white">
            Aplicar filtros
          </Button>
        </div>
      </div>
    </Drawer>
  );
}


