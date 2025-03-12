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
import { useTranslations } from "next-intl";

interface TemporaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemporaryDrawer({ isOpen, onClose }: TemporaryDrawerProps) {
  const [price, setPrice] = React.useState<number[]>([280, 2120]);
  const t = useTranslations("home");

  const handleClose = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };
  const sourceTerminal = t.raw("filter_content.source_terminal_type") as Record<string, string>;
  const tripTypes = t.raw("filter_content.by_type_of_trip_type") as Record<string, { label: string; description: string }>;
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className="w-[500px]   bg-white h-full flex flex-col">
        <div className="flex  bg-ado-purple justify-between items-center border-b p-6">
          <h2 className="text-lg  text-ado-white">
            {t("filter_content.filter_results")}
          </h2>
          <span className="cursor-pointer  text-ado-white" onClick={onClose}>{t("filter_content.close")}<X /></span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-5  bg-ado-bg-light-gray p-6 flex-col">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold">{t("filter_content.filter_by")}:</h2>
            <div className=" flex flex-col bg-white  rounded-lg shadow-md ">
              <div className="flex flex-col p-5 gap-4">
                <div className="flex flex-col ">
                  <div className="bg-[#F3F4F6] p-5 rounded-lg shadow-md  border rounded-xs flex-col">
                    <h2 className="text-lg font-semibold pb-2">{t("filter_content.by_promotion")}</h2>
                    <FormControlLabel
                      control={<Checkbox sx={{ color: "#6B7280" }} />}
                      label={t("filter_content.by_promotion_type.discount")}
                      className="text-gray-700 rounded-lg border bg-white w-fit px-3 pl-1 py-2  "
                    />
                  </div>
                </div>
                <div className="flex flex-col bg-ado-bg-light-gray p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-gray-700">{t("filter_content.by_departure_time")}</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {Object.values(t.raw("filter_content.by_departure_time_type") as Record<string, { label: string; time: string }>).map((item, index) => (
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
                  <h3 className="font-semibold text-gray-700">{t("filter_content.by_price")}</h3>

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
                      <span className="text-xs text-gray-500">{t("filter_content.by_price_type.from")}</span>
                      <span className="font-semibold">${price[0].toFixed(2)} MXN</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500">{t("filter_content.by_price_type.to")}</span>
                      <span className="font-semibold">${price[1].toFixed(2)} MXN</span>
                    </div>
                  </div>
                </div>



                <div className="flex flex-col bg-ado-bg-light-gray p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-gray-700">{t("filter_content.by_type_of_trip")}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(tripTypes).map((type, index) => (
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
                </div>;

                <div className="flex flex-col  bg-ado-bg-light-gray
            p-4 rounded-lg shadow-md ">
                  <h3 className="font-semibold text-gray-700">{t("filter_content.by_brand")}</h3>

                  <div className="border rounded-lg p-3 w-[90px] flex justify-center items-center bg-white w-fit">
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
                  <h3 className="font-semibold text-gray-700">{t("filter_content.source_terminal")}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(sourceTerminal).map((terminal, index) => (
                      <div key={index} className="border rounded-lg bg-white px-3 py-2 w-full">
                        <FormControlLabel
                          control={<Checkbox sx={{ color: "#6B7280" }} />}
                          label={
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">{terminal}</span>
                            </div>
                          }
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>;
                <div className="flex flex-col  bg-ado-bg-light-gray
            p-4 rounded-lg shadow-md  ">
                  <h3 className="font-semibold text-gray-700">{t("filter_content.destination_terminal")}</h3>
                  <div className="border rounded-lg bg-white px-3 py-2  w-fit">
                    <FormControlLabel
                      control={<Checkbox sx={{ color: "#6B7280" }} />}
                      label={
                        <div className="flex flex-col ">
                          <span className="text-xs text-gray-500"> {t("filter_content.destination_terminal_type.veracruz")}</span>
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
            {t("filter_content.reset_filters")}
          </Button>
          <Button variant="contained" className="!bg-ado-purple text-white">
            {t("filter_content.apply_filters")}
          </Button>
        </div>
      </div>
    </Drawer>
  );
}