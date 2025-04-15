import { Meta, StoryObj } from "@storybook/react";
import TicketCard from "./index";
import { TicketCardProps } from "@/types/components/TicketCard";
import { StaticImageData } from "next/image";
import adoLogo from "@/assets/svg/ado-logo-purple.svg";

const meta: Meta<typeof TicketCard> = {
  title: "Components/TicketCard",
  component: TicketCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TicketCard>;

// Handler function for card selection - using void to avoid console.log
const handleCardSelection = () => {
  void 0;
};

const mockCardData: TicketCardProps = {
  onCardSelection: handleCardSelection,
  displayDetails: false,
  asientosLibre: 10,
  logo: adoLogo as StaticImageData,
  fecHorSal: "2023-10-15T10:00:00",
  duracion: "4.5",
  fecHorLlegada: "2023-10-15T14:30:00",
  descOrigenTerminal: "Central México Norte",
  descDestinoTerminal: "Puebla CAPU",
  precio: [{ precio: 350 }, { precio: 299 }],
  isSelected: false,
};

export const Default: Story = {
  args: {
    ...mockCardData,
  },
};

export const WithDetails: Story = {
  args: {
    ...mockCardData,
    displayDetails: true,
  },
};

export const LimitedSeats: Story = {
  args: {
    ...mockCardData,
    asientosLibre: 5,
  },
};

export const NoSeats: Story = {
  args: {
    ...mockCardData,
    asientosLibre: 0,
  },
};

export const Selected: Story = {
  args: {
    ...mockCardData,
    isSelected: true,
  },
};
