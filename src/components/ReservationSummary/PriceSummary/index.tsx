"use client";
import React, { FC, useState } from "react";
import { useTranslations } from "next-intl";

import Image from "next/image";
import Card from "@/components/Card";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/CheckBox";
import rightChevron from "@/assets/svg/right-chevron-purple.svg";
import { Link } from "@/i18n/routing";
import PurchaseDetailsDrawer from "@/components/ReservationSummary/PurchaseDetailsDrawer";


const PriceSummary = () => {
  const t = useTranslations("reservation_summary");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [priceSummaryCheckboxChecked, setPriceSummaryCheckboxChecked] = useState(false);

  const handlePurchaseDetails = () => setOpenDrawer(true);
  return (
    <>
      <Card>
        <div className="text-black">{t("purchase_summary")}</div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-sm">{t("one_way_trip")}</div>
            <div>$ 840.00 MXN</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">{t("return_trip")}</div>
            <div>$ 840.00 MXN</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">{t("tax")}</div>
            <div>$ 840.00 MXN</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">
              <b>(2)</b> {t("total_assitance")}
            </div>
            <div>$ 840.00 MXN</div>
          </div>
        </div>
        <div className="border-t border-ado-neutral-light" />
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="">{t("total")}</div>
            <div className="text-xs">({t("includes_tax")})</div>
          </div>
          <div className="text-lg font-bold text-ado-purple">$ 840.00 MXN</div>
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
          onClick={() => { }}
          iconPosition="right"
          buttonText={t("continue")}
        />
        <Button
          onClick={handlePurchaseDetails}
          buttonText={t("purchase_detail")}
          icon={<Image src={rightChevron} alt="right chevron" />}
          iconPosition="right"
          buttonStyle="outline"
        />
      </Card>
      <PurchaseDetailsDrawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)} />
    </>
  );
};

export default PriceSummary;
