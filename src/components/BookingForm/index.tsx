import React, { useState } from "react";
import Card from "../Card";
import InputField from "../Input/index";
import InfoIcon from '../../assets/svg/information.svg';
import Image from "next/image";
import { useTranslations } from "next-intl";
import AdoCheckbox from "../CheckBox";

interface PassengerData {
  email: string;
  confirmEmail: string;
  name: string;
  lastName: string;
  assistanceIda: boolean;
  assistanceRegreso: boolean;
}

const BookingForm: React.FC = () => {
  const t = useTranslations("booking");
  const [formData, setFormData] = useState<PassengerData>({
    email: "",
    confirmEmail: "",
    name: "",
    lastName: "",
    assistanceIda: false,
    assistanceRegreso: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email !== formData.confirmEmail) {
      setError(t("email_mismatch_error"));
      return;
    }
    setError("");
    console.log("Email submitted:", formData.email);
  };

  return (
    <div className="flex flex-col gap-6 items-center p-4 md:w-[70%] w-full">
      <Card
        title={t('send_tickets_to')}
        width="full"
      >
        <form onSubmit={handleEmailSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["email", "confirmEmail"].map((field) => (
            <InputField
              key={field}
              label={field === "email" ? t("email") : t("confirm_email")}
              type="email"
              name={field}
              value={formData[field as keyof PassengerData] as string}
              onChange={handleChange}
              placeholder="Ej: mar.tg@gmail.com"
              required
            />
          ))}
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </Card>

      <Card
        primaryTitle={
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2">
            <span>{t("register_passenger")}</span>
            <a href="#" className="text-ado-teal text-sm flex items-center gap-2 mt-2 sm:mt-0">
              {t("what_is_total_assistance")} <Image src={InfoIcon} alt="Info Icon" />
            </a>
          </div>
        }
        width="full"
        className="w-full"
      >
        <div className="flex flex-wrap justify-between mb-3 gap-2 sm:gap-4 text-sm text-black border-b border-ado-frost-gray pb-4">
          <span>{t("passenger")} 1: <strong>Adulto</strong></span>
          <span>{t("seat_departure")} <strong>17</strong></span>
          <span>{t("seat_return")} <strong>16</strong></span>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["name", "lastName"].map((field) => (
            <InputField
              key={field}
              label={field === "name" ? t("first_name") : t("last_name")}
              type="text"
              name={field}
              value={formData[field as keyof PassengerData] as string}
              onChange={handleChange}
              placeholder={field === "name" ? "Ej: María" : "Ej: Torres Gómez"}
            />
          ))}
        </form>

        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 border-t pt-4 gap-3 sm:gap-6">
          <label className="text-sm text-black font-bold flex items-center gap-1">
            {t('add_total_assistance')}
          </label>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <AdoCheckbox
              label={<span className="text-sm text-ado-charcoal">{`${t("departure")} $15.00 MXN`}</span>}
              name="assistanceIda"
              checked={formData.assistanceIda}
              onChange={handleChange}
            />

            <AdoCheckbox
              label={<span className="text-sm text-ado-charcoal">{`${t("return")} $15.00 MXN`}</span>}
              name="assistanceRegreso"
              checked={formData.assistanceRegreso}
              onChange={handleChange}
            />
          </div>

        </div>
      </Card>
    </div>
  );
};

export default BookingForm;