import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { fn } from "@storybook/test";
import ReservationSummary from "./index";
import { NextIntlClientProvider } from "next-intl";

// Define message types for the messages object
type ReservationSummaryMessages = {
  reservationSummary: {
    oneWayTrip: string;
    returnTrip: string;
    tripDetails: string;
    purchaseSummary: string;
    total: string;
    includesTax: string;
    accordingTo: string;
    termsAndConditions: string;
    asWellAs: string;
    privacyNotice: string;
    continue: string;
    purchaseDetail: string;
    discountCoupon: string;
    apply: string;
    tax: string;
    totalAssitance: string;
  };
};

// Mock translations needed for nested components
const messages: ReservationSummaryMessages = {
  reservationSummary: {
    oneWayTrip: "One-way Trip",
    returnTrip: "Return Trip",
    tripDetails: "Trip Details",
    purchaseSummary: "Purchase Summary",
    total: "Total",
    includesTax: "Includes Tax",
    accordingTo: "According to ",
    termsAndConditions: "Terms and Conditions",
    asWellAs: " as well as the ",
    privacyNotice: "Privacy Notice",
    continue: "Continue",
    purchaseDetail: "Purchase Details",
    discountCoupon: "Discount Coupon",
    apply: "Apply",
    tax: "Tax",
    totalAssitance: "Total Assistance",
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
