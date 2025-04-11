import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { fn } from "@storybook/test";
import SearchBox from "./index";
import { NextIntlClientProvider } from "next-intl";

// Mock translations for the SearchBox component
const messages = {
  searchResults: {
    roundTrip: "Round Trip",
    oneWay: "One Way",
    origin: "Origin",
    destination: "Destination",
    ida: "Departure",
    return: "Return",
    passengers: "Passengers",
    adult: "Adult",
    adults: "Adults",
    children: "Children",
    inapam: "INAPAM",
    teacher: "Teacher",
    student: "Student",
    modifyTrip: "Modify Trip",
    dummyValueOne: "Mexico City",
    dummyValueTwo: "Cancun",
    sampleDate: "05/15/2023",
    sampleDate2: "05/20/2023",
    adultDescription: "12+ years old",
    childrenDescription: "3-11 years old",
    inapamDescription: "National Institute for Older Persons",
    teacherDescription: "With valid credential",
    studentDescription: "With valid student ID",
    ready: "Ready",
    recentSearches: "Recent Searches",
    originTerminals: "Origin Terminals",
    dropDownText: "Please select your origin or destination to continue",
    whoTravels: "Who travels?",
  },
};

const meta = {
  title: "Components/SearchBox",
  component: SearchBox,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", background: "#f0f0f0", padding: "20px" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleLoad: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The main search box component for the ADO bus ticket booking flow, allowing users to select origin, destination, dates, and passengers.",
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Verify that the component renders
    const searchBox = canvas.getByTestId("search-box") || canvasElement;
    expect(searchBox).toBeInTheDocument();

    // Test tab options (Round Trip/One Way)
    const roundTripTab = canvas.getByText("Round Trip");
    const oneWayTab = canvas.getByText("One Way");
    expect(roundTripTab).toBeInTheDocument();
    expect(oneWayTab).toBeInTheDocument();

    // Click on One Way and verify the return date field is not visible
    await userEvent.click(oneWayTab);

    // Origin and destination fields should be present
    const originField = canvas.getByText("Origin");
    const destinationField = canvas.getByText("Destination");
    expect(originField).toBeInTheDocument();
    expect(destinationField).toBeInTheDocument();

    // Find and click the submit button
    const submitButton = canvas.getByText("Ready");
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    // Verify the handleLoad function was called
    expect(args.handleLoad).toHaveBeenCalledTimes(1);
  },
};
