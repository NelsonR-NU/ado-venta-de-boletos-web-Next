import type { Meta, StoryObj } from "@storybook/react";
import PassengerCard from "./index";
import { useState } from "react";
import { StaticImageData } from "next/image";
import adultIcon from "@/assets/png/adult.png";
import childIcon from "@/assets/png/child.png";
import inapamIcon from "@/assets/png/inapam.png";
import teacherIcon from "@/assets/png/teacher.png";
import studentIcon from "@/assets/png/student.png";

type PassengerType = "Adult" | "Child" | "INAPAM" | "Teacher" | "Student";

interface PassengerCardWrapperProps {
  cardName: string;
  cardDescription: string;
  imageSrc: StaticImageData;
  initialValue?: number;
}

// Interactive wrapper to manage passenger count state
const PassengerCardWrapper = ({
  cardName,
  cardDescription,
  imageSrc,
  initialValue = 0,
}: PassengerCardWrapperProps) => {
  const [value, setValue] = useState(initialValue);

  const updatePassengerCount = (type: PassengerType, delta: number) => {
    setValue((prev) => Math.max(0, prev + delta));
  };

  return (
    <PassengerCard
      cardName={cardName}
      cardDescription={cardDescription}
      imageSrc={imageSrc}
      value={value}
      updatePassengerCount={updatePassengerCount}
    />
  );
};

const meta = {
  title: "Components/PassengerCard",
  component: PassengerCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PassengerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Adult: Story = {
  args: {
    cardName: "Adult",
    cardDescription: "12+ years old",
    imageSrc: adultIcon,
    value: 1,
    updatePassengerCount: () => {},
  },
  render: () => (
    <PassengerCardWrapper
      cardName="Adult"
      cardDescription="12+ years old"
      imageSrc={adultIcon}
      initialValue={1}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Adult passenger card with counter to adjust the number of passengers.",
      },
    },
  },
};

export const Child: Story = {
  args: {
    cardName: "Child",
    cardDescription: "3-11 years old",
    imageSrc: childIcon,
    value: 0,
    updatePassengerCount: () => {},
  },
  render: () => (
    <PassengerCardWrapper
      cardName="Child"
      cardDescription="3-11 years old"
      imageSrc={childIcon}
      initialValue={0}
    />
  ),
};

export const INAPAM: Story = {
  args: {
    cardName: "INAPAM",
    cardDescription: "National Institute for Older Persons",
    imageSrc: inapamIcon,
    value: 0,
    updatePassengerCount: () => {},
  },
  render: () => (
    <PassengerCardWrapper
      cardName="INAPAM"
      cardDescription="National Institute for Older Persons"
      imageSrc={inapamIcon}
      initialValue={0}
    />
  ),
};

export const Teacher: Story = {
  args: {
    cardName: "Teacher",
    cardDescription: "With valid teaching credentials",
    imageSrc: teacherIcon,
    value: 0,
    updatePassengerCount: () => {},
  },
  render: () => (
    <PassengerCardWrapper
      cardName="Teacher"
      cardDescription="With valid teaching credentials"
      imageSrc={teacherIcon}
      initialValue={0}
    />
  ),
};

export const Student: Story = {
  args: {
    cardName: "Student",
    cardDescription: "With valid student ID",
    imageSrc: studentIcon,
    value: 0,
    updatePassengerCount: () => {},
  },
  render: () => (
    <PassengerCardWrapper
      cardName="Student"
      cardDescription="With valid student ID"
      imageSrc={studentIcon}
      initialValue={0}
    />
  ),
};
