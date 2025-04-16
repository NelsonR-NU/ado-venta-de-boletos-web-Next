import type { Meta, StoryObj } from "@storybook/react";
import SearchCard from "./index";
import { useState } from "react";

type PassengerType = "Adult" | "Child" | "INAPAM" | "Teacher" | "Student";

const SearchCardWrapper = (args: any) => {
  const [activeCard, setActiveCard] = useState("");
  const [passengerValues, setPassengerValues] = useState({
    Adult: 1,
    Child: 0,
    INAPAM: 0,
    Teacher: 0,
    Student: 0,
  });

  const toggleDropdown = (cardName: string) => {
    setActiveCard(activeCard === cardName ? "" : cardName);
  };

  const updatePassengerCount = (type: PassengerType, delta: number) => {
    setPassengerValues((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const onSelect = () => {
    //TODO: Selected value handling
  };

  return (
    <div className="p-4 bg-gray-100" style={{ width: "500px" }}>
      <SearchCard
        {...args}
        isOpen={activeCard === args.cardName}
        toggleDropdown={toggleDropdown}
        onSelect={onSelect}
        updatePassengerCount={updatePassengerCount}
        passengerValues={passengerValues}
      />
    </div>
  );
};

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

// Since we're using a wrapper with its own props spread, we don't need
// to provide isOpen and toggleDropdown in the args (they're supplied by the wrapper)
export const Origin: Story = {
  render: (args) => <SearchCardWrapper {...args} />,
  args: {
    width: 100,
    cardName: "Origin",
    value: "Mexico City",
    isPassenger: false,
    dropdownContent: ["Mexico City", "Guadalajara", "Monterrey", "Cancun"],
  },
};

export const Destination: Story = {
  render: (args) => <SearchCardWrapper {...args} />,
  args: {
    width: 100,
    cardName: "Destination",
    value: "Cancun",
    isPassenger: false,
    dropdownContent: ["Mexico City", "Guadalajara", "Monterrey", "Cancun"],
  },
};

export const Passengers: Story = {
  render: (args) => <SearchCardWrapper {...args} />,
  args: {
    width: 100,
    cardName: "Passengers",
    value: "1 Adult",
    isPassenger: true,
    dropdownContent: [],
  },
};
