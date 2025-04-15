import * as React from "react";
import { useTranslations } from "next-intl";
import DrawerModal from "@/components/Drawer";

interface PurchaseDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PruchaseDetailsCardProps {
  title: string;
  price: string;
  contentCenter?: boolean;
  items: { label: string; amount: string }[];
}

interface PurchasePriceContent {
  contentCenter?: boolean;
  category: string;
  price: string;
  className: string;
}

const PurchasePriceContent: React.FC<PurchasePriceContent> = ({
  category,
  contentCenter,
  price,
  className,
}) => (
  <div className={className}>
    <span className={`text-sm ${contentCenter ? "min-w-[100px] text-center" : ""}`}>
      {category}
    </span>
    <span>{price}</span>
  </div>
);

const PurchaseDetailsCard: React.FC<PruchaseDetailsCardProps> = ({
  title,
  price,
  items,
  contentCenter,
}) => (
  <div className="bg-ado-white rounded-lg px-6 py-4 w-full">
    <PurchasePriceContent
      category={title}
      price={price}
      className="flex justify-between text-sm font-bold text-ado-charcoal px-2 py-4 border-b border-b-ado-light-blue-gray"
    />

    <div className="flex flex-col  gap-2 px-2 pt-4">
      {items.map((item, index) => (
        <PurchasePriceContent
          key={index}
          contentCenter={contentCenter}
          category={item.label}
          price={item.amount}
          className={"flex justify-between gap-4 text-ado-charcoal"}
        />
      ))}
    </div>
  </div>
);

const PurchaseDetailsDrawer: React.FC<PurchaseDetailsDrawerProps> = ({ isOpen, onClose }) => {
  const t = useTranslations("reservation_summary");

  return (
    <DrawerModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("purchase_details")}
      closeLabel={t("close")}
      className="w-fit sm:w-[560px] shadow-strong-smoke">
      <div className="w-full flex flex-col gap-6 bg-ado-bg-light-gray text-sm p-6 overflow-y-auto scrollbar-hide">
        <PurchaseDetailsCard
          title="Viaje de ida"
          price="$1,000.00 MXN"
          items={[
            { label: "1 Adulto(s)", amount: "$840.00 MXN" },
            { label: "IVA", amount: "$160.00 MXN" },
          ]}
        />
        <PurchaseDetailsCard
          title="Viaje de regreso"
          price="$1,000.00 MXN"
          items={[
            { label: "1 Adulto(s)", amount: "$840.00 MXN" },
            { label: "IVA", amount: "$160.00 MXN" },
          ]}
        />
        <PurchaseDetailsCard
          title="Asistencia total ida"
          price="$15.00 MXN"
          contentCenter={true}
          items={[
            { label: "Asistencia total", amount: "$15.00 MXN" },
            { label: "x1", amount: "$15.00 MXN" },
          ]}
        />
        <PurchaseDetailsCard
          title="Asistencia total regreso"
          price="$15.00 MXN"
          contentCenter={true}
          items={[
            { label: "Asistencia total", amount: "$15.00 MXN" },
            { label: "x1", amount: "$15.00 MXN" },
          ]}
        />
      </div>
    </DrawerModal>
  );
};

export default PurchaseDetailsDrawer;
