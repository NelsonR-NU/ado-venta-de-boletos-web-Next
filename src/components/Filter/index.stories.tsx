import type { Meta, StoryObj } from "@storybook/react";
import Filter from "./index";
import { NextIntlClientProvider } from "next-intl";

// Mock translation messages for the component
const messages = {
  home: {
    tripType: "Trip date:",
    filters: "Filters",
    sortedBy: "Sorted by:",
  },
  searchResults: {
    days: {
      Sun: ["Sun", "Sunday"],
      Mon: ["Mon", "Monday"],
      Tue: ["Tue", "Tuesday"],
      Wed: ["Wed", "Wednesday"],
      Thur: ["Thur", "Thursday"],
      Fri: ["Fri", "Friday"],
      Sat: ["Sat", "Saturday"],
    },
    sortedTrip: {
      First_to_depart: "First to depart",
      Last_to_depart: "Last to depart",
      Lowest_price: "Lowest price",
      Highest_price: "Highest price",
      Shortest_trip: "Shortest trip",
      Longest_trip: "Longest trip",
    },
  },
};

const meta = {
  title: "Components/Filter",
  component: Filter,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages as any} timeZone="UTC">
        <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: {
      day: "Mon",
      date: "2023-05-15",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "A filter component that allows users to filter and sort trip results. Includes dropdown for sorting options and a filter drawer.",
      },
    },
  },
};

export const WeekendDay: Story = {
  args: {
    date: {
      day: "Sat",
      date: "2023-05-20",
    },
  },
};
