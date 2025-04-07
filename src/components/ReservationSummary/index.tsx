"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CheckBox from "@/components/CheckBox";
import rightChevron from "@/assets/svg/right-chevron-purple.svg";
import AddCouponCard from "@/components/AddCouponCard";

interface ReservationSummaryProps { }

const ReservationSummary: React.FC<ReservationSummaryProps> = () => {
  const t = useTranslations("reservationSummary");
  const [priceSummaryCheckboxChecked, setPriceSummaryCheckboxChecked] = useState(false);

  const showApplyCouponSection = true;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Price Summary */}
      <Card>
        <div className="text-black">{t("purchaseSummary")}</div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-sm">{t("oneWayTrip")}</div>
            <div>$ 840.00 MXN</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">{t("returnTrip")}</div>
            <div>$ 840.00 MXN</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">{t("tax")}</div>
            <div>$ 840.00 MXN</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">
              <b>(2)</b> {t("totalAssitance")}
            </div>
            <div>$ 840.00 MXN</div>
          </div>
        </div>
        <div className="border-t border-ado-neutral-light" />
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="">{t("total")}</div>
            <div className="text-xs">({t("includesTax")})</div>
          </div>
          <div className="text-lg font-bold text-ado-purple">$ 840.00 MXN</div>
        </div>
        <CheckBox
          label={
            <p className="text-sm">
              {t("accordingTo")}
              <Link href="/terminos-y-condiciones" className="text-ado-purple font-bold">
                {` ${t("termsAndConditions")} `}
              </Link>
              {t("asWellAs")}
              <Link href="/aviso-de-privacidad" className="text-ado-purple font-bold">
                {` ${t("privacyNotice")}`}
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
          onClick={() => { }}
          buttonText={t("purchaseDetail")}
          icon={<Image src={rightChevron} alt="right chevron" />}
          iconPosition="right"
          buttonStyle="outline"
        />
      </Card>
      {/* Add Coupon Section */}
      {showApplyCouponSection && <AddCouponCard />}
    </div>
  );
};

export default ReservationSummary;
