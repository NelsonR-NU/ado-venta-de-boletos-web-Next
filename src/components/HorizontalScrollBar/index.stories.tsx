import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { fn } from "@storybook/test";
import DateSlider from "./index";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";

// Flatten the messages for storybook to match AbstractIntlMessages requirements
const messages: AbstractIntlMessages = {
  "searchResults.days.Sun.0": "Sun",
  "searchResults.days.Sun.1": "Sunday",
  "searchResults.days.Mon.0": "Mon",
  "searchResults.days.Mon.1": "Monday",
  "searchResults.days.Tue.0": "Tue",
  "searchResults.days.Tue.1": "Tuesday",
  "searchResults.days.Wed.0": "Wed",
  "searchResults.days.Wed.1": "Wednesday",
  "searchResults.days.Thur.0": "Thur",
  "searchResults.days.Thur.1": "Thursday",
  "searchResults.days.Fri.0": "Fri",
  "searchResults.days.Fri.1": "Friday",
  "searchResults.days.Sat.0": "Sat",
  "searchResults.days.Sat.1": "Saturday",
  "searchResults.months.0": "January",
  "searchResults.months.1": "February",
  "searchResults.months.2": "March",
  "searchResults.months.3": "April",
  "searchResults.months.4": "May",
  "searchResults.months.5": "June",
  "searchResults.months.6": "July",
  "searchResults.months.7": "August",
  "searchResults.months.8": "September",
  "searchResults.months.9": "October",
  "searchResults.months.10": "November",
  "searchResults.months.11": "December",
  "searchResults.date_popup.title": "Date Change",
  "searchResults.date_popup.content": "You are about to change your travel date to",
  "searchResults.date_popup.continue_link": "Do you want to continue?",
  "searchResults.date_popup.cancel": "Cancel",
  "searchResults.date_popup.continue_btn": "Continue",
};

const meta = {
  title: "Components/DateSlider",
  component: DateSlider,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <div style={{ width: "100%", maxWidth: "100%" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof DateSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onDateSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A horizontal date slider that allows users to select travel dates. Shows past, current, and future dates with visual distinctions.",
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Wait for the date slider to fully render
    await waitFor(() => {
      // Find any clickable date elements
      const dateElements = canvas.getAllByRole("button");
      expect(dateElements.length).toBeGreaterThan(0);
    });

    // Find date items
    const dateItems = canvas.getAllByRole("button");

    // Find the first date item that's not disabled - based on aria-disabled attribute
    const activeDateItem = dateItems.find((item) => item.getAttribute("aria-disabled") !== "true");

    expect(activeDateItem).toBeDefined();

    if (activeDateItem) {
      // Click on a selectable date
      await userEvent.click(activeDateItem);

      // Wait for date change confirmation modal to appear
      await waitFor(() => {
        const dateChangeModal = canvas.getByText("Date Change");
        expect(dateChangeModal).toBeInTheDocument();
      });

      // Verify modal content
      const modalContent = canvas.getByText("You are about to change your travel date to");
      expect(modalContent).toBeInTheDocument();

      const continueQuestion = canvas.getByText("Do you want to continue?");
      expect(continueQuestion).toBeInTheDocument();

      // Find modal buttons
      const cancelButton = canvas.getByText("Cancel");
      const continueButton = canvas.getByText("Continue");

      expect(cancelButton).toBeInTheDocument();
      expect(continueButton).toBeInTheDocument();

      // Click continue button to confirm date selection
      await userEvent.click(continueButton);

      // Verify the modal is closed (either by waiting for it to disappear or checking visibility)
      await waitFor(
        () => {
          const dateChangeModal = canvas.queryByText("Date Change");
          expect(dateChangeModal).toBeNull();
        },
        { timeout: 1000 }
      );

      // Verify that the onDateSelect callback was called
      expect(args.onDateSelect).toHaveBeenCalled();
    }

    // Test the navigation arrows if they are visible
    const leftArrow = canvas.queryByAltText("left arrow");
    const rightArrow = canvas.queryByAltText("right arrow");

    if (leftArrow && rightArrow) {
      // Click right arrow to scroll forward
      await userEvent.click(rightArrow);

      // Click left arrow to scroll back
      await userEvent.click(leftArrow);
    }
  },
};
