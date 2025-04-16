import type { Meta, StoryObj } from "@storybook/react";
import SearchCard from "./index";

const passengerValues = {
  Adult: 1,
  Child: 0,
  INAPAM: 0,
  Teacher: 0,
  Student: 0,
};

const mockDropdownContent = ["Mexico City", "Guadalajara", "Monterrey", "Cancun"];

const meta = {
  title: "Components/SearchCard",
  component: SearchCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Origin: Story = {
  args: {
    width: 100,
    cardName: "Origin",
    value: "Mexico City",
    isOpen: false,
    isPassenger: false,
    toggleDropdown: () => {},
    dropdownContent: mockDropdownContent,
    onSelect: () => {},
  },
};

export const OriginOpen: Story = {
  args: {
    ...Origin.args,
    isOpen: true,
  },
};

export const Destination: Story = {
  args: {
    width: 100,
    cardName: "Destination",
    value: "Cancun",
    isOpen: false,
    isPassenger: false,
    toggleDropdown: () => {},
    dropdownContent: mockDropdownContent,
    onSelect: () => {},
  },
};

export const DestinationOpen: Story = {
  args: {
    ...Destination.args,
    isOpen: true,
  },
};

export const Passengers: Story = {
  args: {
    width: 100,
    cardName: "Passengers",
    value: "1 Adult",
    isOpen: false,
    isPassenger: true,
    toggleDropdown: () => {},
    dropdownContent: [],
    updatePassengerCount: () => {},
    passengerValues,
  },
};

export const PassengersOpen: Story = {
  args: {
    ...Passengers.args,
    isOpen: true,
  },
};
