import React, { useState } from "react";
import Card from "../Card";
import InputField from "../Input/index";
import InfoIcon from '../../assets/svg/information.svg';
import Image from "next/image";
import { useTranslations } from "next-intl";
import Checkbox from "../CheckBox";
import Link from "next/link";

interface PassengerData {
  email: string;
  confirmEmail: string;
  name: string;
  lastName: string;
  assistanceIda: boolean;
  assistanceRegreso: boolean;
}

const PassengerRegistrationForm: React.FC = () => {
  const t = useTranslations("booking");
  const [formData, setFormData] = useState<PassengerData>({
    email: "",
    confirmEmail: "",
    name: "",
    lastName: "",
    assistanceIda: false,
    assistanceRegreso: false,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:w-[70%] w-full">
      <Card className="bg-ado-ice-blue">
        <h2 className="text-lg font-semibold mb-4">{t('send_tickets_to')}</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label={t("email")}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej: mar.tg@gmail.com"
            required
          />
          <InputField
            label={t("confirm_email")}
            type="email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleChange}
            placeholder="Ej: mar.tg@gmail.com"
            required
          />
        </form>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2">
        <h2 className="text-lg font-bold mb-4">{t("register_passenger")}</h2>
        <Link href="#" className="font-bold text-ado-teal text-sm flex items-center gap-2 mt-2 sm:mt-0">
          {t("what_is_total_assistance")} <Image src={InfoIcon} alt="Info Icon" />
        </Link>
      </div>

      <Card className="bg-ado-ice-blue">
        <div className="flex flex-wrap justify-between mb-3 gap-2 sm:gap-4 text-sm text-black border-b border-ado-frost-gray pb-4">
          <span>{t("passenger")} 1: <strong>Adulto</strong></span>
          <span>{t("seat_departure")} <strong>17</strong></span>
          <span>{t("seat_return")} <strong>16</strong></span>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label={t("first_name")}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: María"
          />
          <InputField
            label={t("last_name")}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Ej: Torres Gómez"
          />
        </form>

        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 border-t pt-4 gap-3 sm:gap-6">
          <label className="text-sm text-black font-bold flex items-center gap-1">
            {t('add_total_assistance')}
          </label>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <Checkbox
              label={<span className="text-sm text-ado-charcoal">{`${t("departure")} $15.00 MXN`}</span>}
              name="assistanceIda"
              checked={formData.assistanceIda}
              onChange={handleChange}
            />
            <Checkbox
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

export default PassengerRegistrationForm;
