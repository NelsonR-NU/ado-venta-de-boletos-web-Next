import type { Meta, StoryObj } from "@storybook/react";
import SearchDropDown from "./index";
import { NextIntlClientProvider } from "next-intl";

// Mock translations
const messages = {
  searchResults: {
    recentSearches: "Recent Searches",
    originTerminals: "Origin Terminals",
    dropDownText: "Please select your origin or destination to continue",
  },
};

const meta = {
  title: "Components/SearchDropDown",
  component: SearchDropDown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <div style={{ height: "500px", padding: "40px", position: "relative" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof SearchDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    recentSearches: ["Mexico City", "Guadalajara", "Cancun"],
    originTerminals: ["Terminal Central", "Terminal Norte", "Terminal Sur", "Terminal Este"],
    cardName: "origin",
    onSelect: () => {
      // Selection handler
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "A dropdown component for selecting origins and destinations with recent searches and terminal options.",
      },
    },
  },
};

export const WithMoreOptions: Story = {
  args: {
    recentSearches: ["Mexico City", "Guadalajara", "Monterrey", "Cancun", "Tijuana"],
    originTerminals: [
      "Terminal Central",
      "Terminal Norte",
      "Terminal Sur",
      "Terminal Este",
      "Terminal Oeste",
      "Terminal Aeropuerto",
      "Terminal Centro Histórico",
    ],
    cardName: "destination",
    onSelect: () => {},
  },
};

export const EmptyRecent: Story = {
  args: {
    recentSearches: [],
    originTerminals: ["Terminal Central", "Terminal Norte", "Terminal Sur", "Terminal Este"],
    cardName: "origin",
    onSelect: () => {},
  },
};
