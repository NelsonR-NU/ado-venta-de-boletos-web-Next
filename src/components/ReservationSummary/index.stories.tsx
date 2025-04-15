import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { fn } from "@storybook/test";
import ReservationSummary from "./index";
import { NextIntlClientProvider } from "next-intl";

// Define message types for the messages object
type ReservationSummaryMessages = {
  reservation_summary: {
    one_way_trip: string;
    return_trip: string;
    tax: string;
    purchase_summary: string;
    total: string;
    includes_tax: string;
    according_to: string;
    as_well_as: string;
    terms_and_conditions: string;
    privacy_notice: string;
    purchase_detail: string;
    trip_details: string;
    discount_coupon: string;
    apply: string;
    continue: string;
    total_assitance: string;
    origin_terminal: string;
    destination_terminal: string;
    close: string;
  };
};

// Mock translations needed for nested components
const messages: ReservationSummaryMessages = {
  reservation_summary: {
    one_way_trip: "One-way Trip",
    return_trip: "Return Trip",
    tax: "Tax",
    purchase_summary: "Purchase Summary",
    total: "Total",
    includes_tax: "Includes Tax",
    according_to: "According to the",
    as_well_as: "as well as the",
    terms_and_conditions: "Terms and Conditions",
    privacy_notice: "Privacy Notice",
    purchase_detail: "Purchase details",
    trip_details: "Trip details",
    discount_coupon: "Discount coupon",
    apply: "Apply",
    continue: "Continue",
    total_assitance: "Total Assistance",
    origin_terminal: "Origin terminal",
    destination_terminal: "Destination terminal",
    close: "Close",
  },
};

const meta = {
  title: "Components/ReservationSummary",
  component: ReservationSummary,
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
} satisfies Meta<typeof ReservationSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCouponApply: fn(),
    onContinue: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "A summary of the reservation including trip details, pricing, and coupon option.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that the component renders the main sections

    // Trip Summaries
    const oneWayTitle = canvas.getByText("One-way Trip");
    expect(oneWayTitle).toBeInTheDocument();

    const returnTripTitle = canvas.getByText("Return Trip");
    expect(returnTripTitle).toBeInTheDocument();

    // Price Summary
    const priceSummary = canvas.getByText("Purchase Summary");
    expect(priceSummary).toBeInTheDocument();

    // Discount Coupon section
    const couponSection = canvas.getByText("Discount Coupon");
    expect(couponSection).toBeInTheDocument();

    // Test coupon input and apply button
    const couponInput = canvas.getByPlaceholderText(/enter coupon/i) || canvas.getByRole("textbox");
    expect(couponInput).toBeInTheDocument();

    // Enter a coupon code
    await userEvent.type(couponInput, "TESTCOUPON");
    expect(couponInput).toHaveValue("TESTCOUPON");

    // Find and click apply button
    const applyButton = canvas.getByText("Apply");
    expect(applyButton).toBeInTheDocument();
    await userEvent.click(applyButton);

    // Test the total section
    const totalText = canvas.getByText("Total");
    expect(totalText).toBeInTheDocument();

    // Verify the tax disclaimer
    const taxDisclaimer = canvas.getByText("Includes Tax");
    expect(taxDisclaimer).toBeInTheDocument();

    // Verify terms and conditions links
    const termsLink = canvas.getByText("Terms and Conditions");
    expect(termsLink).toBeInTheDocument();

    const privacyLink = canvas.getByText("Privacy Notice");
    expect(privacyLink).toBeInTheDocument();

    // Test the continue button
    const continueButton = canvas.getByText("Continue");
    expect(continueButton).toBeInTheDocument();
    await userEvent.click(continueButton);
  },
};
