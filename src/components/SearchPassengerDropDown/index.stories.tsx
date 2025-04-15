import type { Meta, StoryObj } from "@storybook/react";
import SearchPassengerDropDown from "./index";
import { NextIntlClientProvider } from "next-intl";
import { useState } from "react";

type PassengerType = "Adult" | "Child" | "INAPAM" | "Teacher" | "Student";

// Wrapper component with state management for passenger counts
const SearchPassengerDropDownWrapper = () => {
  const [passengerValues, setPassengerValues] = useState({
    Adult: 1,
    Child: 0,
    INAPAM: 0,
    Teacher: 0,
    Student: 0,
  });

  const updatePassengerCount = (type: PassengerType, delta: number) => {
    setPassengerValues((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  return (
    <div style={{ height: "600px", position: "relative" }}>
      <SearchPassengerDropDown
        updatePassengerCount={updatePassengerCount}
        passengerValues={passengerValues}
      />
    </div>
  );
};

// Mock translations
const messages = {
  searchResults: {
    who_travels: "Who travels?",
    adults: "Adult",
    adult_description: "12+ years old",
    teacher: "Teacher",
    teacher_description: "With valid credential",
    children: "Child",
    children_description: "3-11 years old",
    student: "Student",
    student_description: "With valid student ID",
    inapam: "INAPAM",
    inapam_description: "National Institute for Older Persons",
    ready: "Ready",
  },
};

const meta = {
  title: "Components/SearchPassengerDropDown",
  component: SearchPassengerDropDown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <div style={{ padding: "40px" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof SearchPassengerDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    passengerValues: {
      Adult: 1,
      Child: 0,
      INAPAM: 0,
      Teacher: 0,
      Student: 0,
    },
    updatePassengerCount: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "A dropdown for selecting passenger types and quantities for booking travel tickets.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => <SearchPassengerDropDownWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          "An interactive version of the passenger dropdown that allows modifying passenger counts.",
      },
    },
  },
};
