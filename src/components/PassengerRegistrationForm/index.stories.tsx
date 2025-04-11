import type { Meta, StoryObj } from "@storybook/react";
import PassengerRegistrationForm from "./index";
import { NextIntlClientProvider } from "next-intl";

// Mock translations for the passenger registration form
const messages = {
  booking: {
    send_tickets_to: "Send tickets to",
    email: "Email",
    confirm_email: "Confirm Email",
    ticket_sent_to: "Your tickets will be sent to:",
    register_passenger: "Register Passenger",
    what_is_total_assistance: "What is Total Assistance?",
    passenger: "Passenger",
    adult: "Adult",
    seat_departure: "Departure Seat:",
    seat_return: "Return Seat:",
    Select_an_passenger: "Select a passenger",
    select: "Select",
    first_name: "First Name",
    last_name: "Last Name",
    add_total_assistance: "Add Total Assistance:",
    departure: "Departure",
    return: "Return",
  },
};

const meta = {
  title: "Components/PassengerRegistrationForm",
  component: PassengerRegistrationForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof PassengerRegistrationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A form for registering passenger information during the booking process, including name, contact details, and assistance options.",
      },
    },
  },
};
