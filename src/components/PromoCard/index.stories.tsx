import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { fn } from "@storybook/test";
import PromoCard from "./index";

const meta = {
  title: "Components/PromoCard",
  component: PromoCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    showImage: {
      control: "boolean",
    },
    btnColor: {
      control: "color",
    },
    handlePromotionAction: { action: "clicked" },
  },
} satisfies Meta<typeof PromoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    bannerTitle: "Summer Promotion",
    bannerDescription: "Get 30% off on all tickets for summer destinations.",
    btnText: "View Promotion",
    btnColor: "#FF6633",
    showImage: true,
    handlePromotionAction: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Verify that the card title and description are rendered
    const title = canvas.getByText("Summer Promotion");
    const description = canvas.getByText("Get 30% off on all tickets for summer destinations.");
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    // Check that the image is displayed
    const cardContainer = canvasElement.querySelector("div");
    expect(cardContainer).toHaveStyle("background-image: url");

    // Click the promotion button
    const button = canvas.getByText("View Promotion");
    expect(button).toBeInTheDocument();
    await userEvent.click(button);

    // Verify the handler was called
    expect(args.handlePromotionAction).toHaveBeenCalledTimes(1);

    // Verify button color
    expect(button).toHaveStyle("background-color: #FF6633");
  },
};

export const WithoutImage: Story = {
  args: {
    bannerTitle: "Special Discount",
    bannerDescription: "Limited time offer: 20% discount on selected routes.",
    btnText: "Get Discount",
    btnColor: "#622366",
    showImage: false,
    handlePromotionAction: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Verify that the card title and description are rendered
    const title = canvas.getByText("Special Discount");
    const description = canvas.getByText("Limited time offer: 20% discount on selected routes.");
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    // Check that the image is not displayed
    const cardContainer = canvasElement.querySelector("div");
    expect(cardContainer).not.toHaveStyle("background-image: url");

    // Click the promotion button
    const button = canvas.getByText("Get Discount");
    expect(button).toBeInTheDocument();
    await userEvent.click(button);

    // Verify the handler was called
    expect(args.handlePromotionAction).toHaveBeenCalledTimes(1);

    // Verify button color
    expect(button).toHaveStyle("background-color: #622366");
  },
};

export const LongContent: Story = {
  args: {
    bannerTitle: "Holiday Season Special Package",
    bannerDescription:
      "Join us for the holiday season with special packages including meals, accommodations, and transportation at unbeatable prices. Book now and save more!",
    btnText: "Learn More",
    btnColor: "#E11F2A",
    showImage: true,
    handlePromotionAction: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Verify that the card title and long description are rendered
    const title = canvas.getByText("Holiday Season Special Package");
    const description = canvas.getByText(
      "Join us for the holiday season with special packages including meals, accommodations, and transportation at unbeatable prices. Book now and save more!"
    );
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    // Check that the container can handle long content
    const cardContainer = canvasElement.querySelector("div");
    expect(cardContainer).toBeInTheDocument();

    // Click the promotion button
    const button = canvas.getByText("Learn More");
    expect(button).toBeInTheDocument();
    await userEvent.click(button);

    // Verify the handler was called
    expect(args.handlePromotionAction).toHaveBeenCalledTimes(1);

    // Verify button color
    expect(button).toHaveStyle("background-color: #E11F2A");
  },
};
