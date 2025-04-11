import type { Meta, StoryObj } from "@storybook/react";
import TicketList from "./index";
import { NextIntlClientProvider } from "next-intl";

// Mock translations
const messages = {
  "ticket-confirmation": {
    passsager_name: "Passenger Name",
    passsager_name_tab: "Passenger",
    one_way: "Departure Seat",
    one_way_tab: "Departure",
    ticket_type: "Ticket Type",
    ticket_type_tab: "Type",
    return_seat: "Return Seat",
    return_seat_tab: "Return",
    totalAssitance: "Assistance",
  },
};

const meta = {
  title: "Components/TicketList",
  component: TicketList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider
        locale="en"
        messages={messages as unknown as Record<string, unknown>}
        timeZone="UTC">
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof TicketList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A list of tickets showing passenger information, seat details, and assistance status.",
      },
    },
  },
};
