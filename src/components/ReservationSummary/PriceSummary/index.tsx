"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

import Image from "next/image";
import Card from "@/components/Card";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/CheckBox";
import rightChevron from "@/assets/svg/right-chevron-purple.svg";
import { Link } from "@/i18n/routing";

interface PriceSummaryProps {
  handleClick: () => void;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ handleClick }) => {
  const t = useTranslations("reservationSummary");
  const [priceSummaryCheckboxChecked, setPriceSummaryCheckboxChecked] = useState(false);

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div className="text-black">{t("purchase_summary")}</div>
      </div>
      <div className="flex justify-between mb-1">
        <div className="text-sm">{t("one_way_trip")}</div>
        <div className="text-sm">$1,092.00</div>
      </div>
      <div className="flex justify-between mb-2">
        <div className="text-sm">{t("return_trip")}</div>
        <div className="text-sm">$1,092.00</div>
      </div>
      <hr className="border-t border-dashed border-gray-300 mb-2" />
      <div className="flex justify-between mb-1">
        <div className="text-sm">{t("tax")}</div>
        <div className="text-sm">$196.00</div>
      </div>
      <div className="flex justify-between mb-4">
        <div className="text-sm">
          <b>(2)</b> {t("total_assitance")}
        </div>
        <div className="text-sm">$1,000.00</div>
      </div>
      <hr className="border-t border-gray-300 mb-4" />
      <div className="flex justify-between mb-1">
        <div className="font-bold">TOTAL</div>
        <div className="flex flex-col items-end">
          <div className="font-bold">$3,380.00</div>
          <div className="text-xs">({t("includes_tax")})</div>
        </div>
      </div>
      <Checkbox
        label={
          <p className="text-sm">
            {t("according_to")}
            <Link href="/terminos-y-condiciones" className="text-ado-purple font-bold">
              {` ${t("terms_and_conditions")} `}
            </Link>
            {t("as_well_as")}
            <Link href="/aviso-de-privacidad" className="text-ado-purple font-bold">
              {` ${t("privacy_notice")}`}
            </Link>
          </p>
        }
        checked={priceSummaryCheckboxChecked}
        onChange={(e) => setPriceSummaryCheckboxChecked(e.target.checked)}
        name="priceSummaryCheckbox"
      />
      <Button
        variant="primary"
        disabled={!priceSummaryCheckboxChecked}
        onClick={() => {}}
        iconPosition="right"
        buttonText={t("continue")}
      />
      <Button
        onClick={handleClick}
        buttonText={t("purchase_detail")}
        icon={<Image src={rightChevron} alt="right chevron" />}
        iconPosition="right"
        buttonStyle="outline"
      />
    </Card>
  );
};

export default PriceSummary;
