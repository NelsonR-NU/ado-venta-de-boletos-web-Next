import * as React from "react";
import Image from "next/image";
import Slider from "@mui/material/Slider";
import { useTranslations } from "next-intl";
import DrawerModal from "@/components/Drawer";
import adoBrandImage from "@/assets/png/adoBrandImage.png";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/CheckBox";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
  const [price, setPrice] = React.useState<{ minPrice: number; maxPrice: number }>({
    minPrice: 280,
    maxPrice: 2120,
  });

  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, boolean>>({});

  const t = useTranslations("searchResults");

  const sourceTerminal = t.raw("filter_content.source_terminal_type") as Record<string, string>;
  const tripTypes = t.raw("filter_content.by_type_of_trip_type") as Record<
    string,
    { label: string; description: string }
  >;

  const handleCheckboxChange = (key: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleApplyFilters = () => {
    console.log("Selected Filters:", selectedFilters);
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPrice({ minPrice: newValue[0], maxPrice: newValue[1] });
    }
  };

  return (
    <DrawerModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("filter_content.filter_results")}
      closeLabel={t("filter_content.close")}
      className="w-fit sm:w-[560px]">
      <div className="flex-1 overflow-y-auto space-y-5 bg-ado-bg-light-gray p-6 flex-col">
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold">{t("filter_content.filter_by")}:</h2>
          <div className="flex flex-col bg-white rounded-lg shadow-md">
            <div className="flex flex-col p-5 gap-4">
              <div className="bg-ado-bg-gray p-5 rounded-lg shadow-md border flex-col">
                <h2 className="text-lg font-semibold pb-2">{t("filter_content.by_promotion")}</h2>
                <Checkbox
                  onChange={(e) => handleCheckboxChange("discount")}
                  label={t("filter_content.by_promotion_type.discount")}
                />
              </div>

              <div className="flex flex-col bg-ado-bg-light-gray p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-700">
                  {t("filter_content.by_departure_time")}
                </h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.values(
                    t.raw("filter_content.by_departure_time_type") as Record<
                      string,
                      { label: string; time: string }
                    >
                  ).map((item, index) => (
                    <div key={index} className="border rounded-lg bg-white px-3 py-2 w-full">
                      <Checkbox
                        label={
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-700">{item.label}</span>
                            <span className="text-xs text-gray-500">{item.time}</span>
                          </div>
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col p-4">
                <h3 className="font-semibold text-gray-700">{t("filter_content.by_price")}</h3>
                <Slider
                  value={[price.minPrice, price.maxPrice]}
                  onChange={handlePriceChange}
                  min={280}
                  max={2120}
                  sx={{
                    color: "#6B21A8",
                    "& .MuiSlider-thumb": { backgroundColor: "#6B21A8" },
                    "& .MuiSlider-rail": { backgroundColor: "#E5D4F3" },
                    "& .MuiSlider-track": { backgroundColor: "#6B21A8" },
                  }}
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500">
                      {t("filter_content.by_price_type.from")}
                    </span>
                    <span className="font-semibold">${price.minPrice.toFixed(2)} MXN</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500">
                      {t("filter_content.by_price_type.to")}
                    </span>
                    <span className="font-semibold">${price.maxPrice.toFixed(2)} MXN</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-ado-bg-light-gray p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-700">
                  {t("filter_content.by_type_of_trip")}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(tripTypes).map((type, index) => (
                    <div key={index} className="border rounded-lg p-3 w-full bg-white">
                      <Checkbox
                        label={
                          <div className="flex flex-col">
                            <span className="font-semibold">{type.label}</span>
                            <span className="text-xs text-gray-500">{type.description}</span>
                          </div>
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col bg-ado-bg-light-gray p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-700">{t("filter_content.by_brand")}</h3>
                <div className="border rounded-lg p-3 w-fit flex justify-center items-center bg-white">
                  <Checkbox
                    label={<Image src={adoBrandImage} alt="ado brand image" className="w-[50px]" />}
                  />
                </div>
              </div>

              <div className="flex flex-col bg-ado-bg-light-gray p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-700">
                  {t("filter_content.source_terminal")}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(sourceTerminal).map((terminal, index) => (
                    <div key={index} className="border rounded-lg bg-white px-3 py-2 w-full">
                      <Checkbox label={<span className="text-xs text-gray-500">{terminal}</span>} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col bg-ado-bg-light-gray p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-700">
                  {t("filter_content.destination_terminal")}
                </h3>
                <div className="border rounded-lg bg-white px-3 py-2 w-fit">
                  <Checkbox
                    label={
                      <span className="text-xs text-gray-500">
                        {t("filter_content.destination_terminal_type.veracruz")}
                      </span>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between p-6 gap-4">
        <Button
          buttonStyle="outline"
          className="border-none "
          buttonText={t("filter_content.reset_filters")}
        />
        <Button
          disabled={true}
          buttonStyle="filled"
          className="text-white"
          buttonText={t("filter_content.apply_filters")}
          onClick={handleApplyFilters}
        />
      </div>
    </DrawerModal>
  );
}
