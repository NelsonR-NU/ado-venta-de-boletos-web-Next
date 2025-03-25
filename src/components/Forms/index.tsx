import React, { useState } from "react";
import FormCard from "../FormCard";
import InputField from "../Input/index";
import InfoIcon from '../../assets/svg/information.svg';
import Image from "next/image";
import { useTranslations } from "next-intl";

const Forms: React.FC = () => {
  const t = useTranslations("booking");
  const [formData, setFormData] = useState({
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
      setError("Error.");
      return;
    }
    setError("");
    console.log("Email submitted:", formData.email);
  };

  return (
    <div className="flex flex-col gap-6 items-center p-4 w-full max-w-3xl mx-auto">

      <FormCard title={t('send_tickets_to')}>
        <form onSubmit={handleEmailSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["email", "confirmEmail"].map((field, index) => (
            <InputField
              key={index}
              label={field === "email" ? t("email") : t("confirm_email")}
              type="email"
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              placeholder="Ej: mar.tg@gmail.com"
              required
            />
          ))}
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </FormCard>
      <FormCard
        primaryTitle={
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2">
            <span>{t("register_passenger")}</span>
            <a href="#" className="text-ado-teal text-sm flex items-center gap-2 mt-2 sm:mt-0">
              {t("what_is_total_assistance")} <Image src={InfoIcon} alt="Info Icon" />
            </a>
          </div>
        }
      >
        <div className="flex flex-wrap justify-between mb-3 gap-2 sm:gap-4 text-sm text-black border-b border-ado-frost-gray pb-4">
          <span>{t("passenger")} 1: <strong>Adulto</strong></span>
          <span>{t("seat_departure")} <strong>17</strong></span>
          <span>{t("seat_return")} <strong>16</strong></span>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["name", "lastName"].map((field, index) => (
            <InputField
              key={index}
              label={field === "name" ? t("first_name") : t("last_name")}
              type="text"
              name={field}
              value={formData[field as keyof typeof formData]}
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
            <label className="text-sm flex items-center gap-1 text-ado-charcoal">
              <input
                type="checkbox"
                name="assistanceIda"
                checked={formData.assistanceIda}
                onChange={handleChange}
                className="w-4 h-4 accent-ado-purple"
              />
              {`${t("departure")} $15.00 MXN`}
            </label>
            <label className="text-sm flex items-center gap-1 text-ado-charcoal">
              <input
                type="checkbox"
                name="assistanceRegreso"
                checked={formData.assistanceRegreso}
                onChange={handleChange}
                className="w-4 h-4 accent-ado-purple"
              />
              {`${t("return")} $15.00 MXN`}
            </label>
          </div>
        </div>
      </FormCard>
    </div>
  );
};

export default Forms;
