import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { fn } from "@storybook/test";
import FilterDrawer from "./index";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { useState } from "react";
import Button from "@/components/ui/Button";

// Wrapper component to control drawer state
const FilterDrawerWrapper = ({ isOpen: initialOpen = false, onClose = () => {} }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div>
      <Button
        buttonText="Open Filter Drawer"
        onClick={() => setIsOpen(true)}
        className="mb-4"
        data-testid="open-drawer-button"
      />
      <FilterDrawer isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

// Mock messages for translations with flattened structure
const messages: AbstractIntlMessages = {
  "searchResults.filter_content.filter_results": "Filter Results",
  "searchResults.filter_content.close": "Close",
  "searchResults.filter_content.filter_by": "Filter by",
  "searchResults.filter_content.by_promotion": "By Promotion",
  "searchResults.filter_content.by_promotion_type.discount": "Discount",
  "searchResults.filter_content.by_departure_time": "By Departure Time",
  "searchResults.filter_content.by_departure_time_type.morning.label": "Morning",
  "searchResults.filter_content.by_departure_time_type.morning.time": "00:01 - 12:00",
  "searchResults.filter_content.by_departure_time_type.afternoon.label": "Afternoon",
  "searchResults.filter_content.by_departure_time_type.afternoon.time": "12:01 - 18:00",
  "searchResults.filter_content.by_departure_time_type.evening.label": "Evening",
  "searchResults.filter_content.by_departure_time_type.evening.time": "18:01 - 23:59",
  "searchResults.filter_content.by_price": "By Price",
  "searchResults.filter_content.by_price_type.from": "From",
  "searchResults.filter_content.by_price_type.to": "To",
  "searchResults.filter_content.by_type_of_trip": "By Type of Trip",
  "searchResults.filter_content.by_type_of_trip_type.direct.label": "Direct",
  "searchResults.filter_content.by_type_of_trip_type.direct.description": "Non-stop trip",
  "searchResults.filter_content.by_type_of_trip_type.economic.label": "Economic",
  "searchResults.filter_content.by_type_of_trip_type.economic.description": "Lowest price",
  "searchResults.filter_content.by_type_of_trip_type.express.label": "Express",
  "searchResults.filter_content.by_type_of_trip_type.express.description": "Faster service",
  "searchResults.filter_content.by_brand": "By Brand",
  "searchResults.filter_content.source_terminal": "Source Terminal",
  "searchResults.filter_content.source_terminal_type.terminal1": "Terminal Central",
  "searchResults.filter_content.source_terminal_type.terminal2": "Terminal Norte",
  "searchResults.filter_content.source_terminal_type.terminal3": "Terminal Sur",
  "searchResults.filter_content.source_terminal_type.terminal4": "Terminal Este",
  "searchResults.filter_content.destination_terminal": "Destination Terminal",
  "searchResults.filter_content.destination_terminal_type.veracruz": "Veracruz",
  "searchResults.filter_content.reset_filters": "Reset Filters",
  "searchResults.filter_content.apply_filters": "Apply Filters",
};

const meta = {
  title: "Components/FilterDrawer",
  component: FilterDrawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <div style={{ padding: "20px" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof FilterDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The drawer should not be visible when closed
    const filterTitle = canvas.queryByText("Filter Results");
    expect(filterTitle).not.toBeInTheDocument();
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // The drawer should be visible when open
    await waitFor(() => {
      const filterTitle = canvas.getByText("Filter Results");
      expect(filterTitle).toBeInTheDocument();
    });

    // Verify drawer content
    const filterByText = canvas.getByText("Filter by:");
    expect(filterByText).toBeInTheDocument();

    // Check filter sections
    const promotionSection = canvas.getByText("By Promotion");
    const departureTimeSection = canvas.getByText("By Departure Time");
    const priceSection = canvas.getByText("By Price");
    const tripTypeSection = canvas.getByText("By Type of Trip");

    expect(promotionSection).toBeInTheDocument();
    expect(departureTimeSection).toBeInTheDocument();
    expect(priceSection).toBeInTheDocument();
    expect(tripTypeSection).toBeInTheDocument();

    // Find the close button and click it
    const closeButton = canvas.getByText("Close");
    expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);

    // Verify onClose was called
    expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};

export const Interactive: Story = {
  render: (args) => <FilterDrawerWrapper onClose={args.onClose} />,
  args: {
    isOpen: false,
    onClose: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "An interactive example of the filter drawer. Click the button to open the drawer.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the button to open the drawer
    const openButton = canvas.getByTestId("open-drawer-button");
    expect(openButton).toBeInTheDocument();
    await userEvent.click(openButton);

    // Wait for the drawer to appear
    await waitFor(() => {
      const filterTitle = canvas.getByText("Filter Results");
      expect(filterTitle).toBeInTheDocument();
    });

    // Test interacting with filters

    // 1. Test checkbox filter
    const discountCheckbox = canvas.getByText("Discount").closest("label");
    expect(discountCheckbox).toBeInTheDocument();
    if (discountCheckbox) {
      await userEvent.click(discountCheckbox);
    }

    // 2. Test departure time filter
    const morningCheckbox = canvas.getByText("Morning").closest("label");
    if (morningCheckbox) {
      await userEvent.click(morningCheckbox);
    }

    // 3. Test trip type filter
    const directTripCheckbox = canvas.getByText("Direct").closest("label");
    if (directTripCheckbox) {
      await userEvent.click(directTripCheckbox);
    }

    // Find and click the Apply Filters button
    const applyButton = canvas.getByText("Apply Filters");
    expect(applyButton).toBeInTheDocument();
    // Note: The button is disabled in the component, so we don't click it

    // Click Reset Filters
    const resetButton = canvas.getByText("Reset Filters");
    expect(resetButton).toBeInTheDocument();
    await userEvent.click(resetButton);

    // Close the drawer
    const closeButton = canvas.getByText("Close");
    await userEvent.click(closeButton);
  },
};
