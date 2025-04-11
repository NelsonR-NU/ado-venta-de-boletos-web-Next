import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, waitFor } from "@storybook/testing-library";
import { fn } from "@storybook/test";
import Dropdown from "./index";

const meta = {
  title: "UI Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: { control: "object" },
    placeholder: { control: "text" },
    bgColor: { control: "text" },
    textColor: { control: "text" },
    hoverColor: { control: "text" },
    activeColor: { control: "text" },
    title: { control: "text" },
    className: { control: "text" },
    onSelect: { action: "selected" },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    placeholder: "Select an option",
    bgColor: "bg-ado-snow-gray",
    textColor: "text-black",
    hoverColor: "hover:bg-ado-light-blue-gray",
    activeColor: "bg-gray-300",
    onSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "A dropdown component that allows users to select from a list of options.",
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const container = canvasElement.querySelector(".relative.w-\\[258px\\]");

    expect(container).not.toBeNull();

    if (!container) return;

    const dropdownButton = container.querySelector("button");
    expect(dropdownButton).not.toBeNull();

    if (!dropdownButton) return;

    expect(dropdownButton.textContent).toContain("Select an option");

    await userEvent.click(dropdownButton);

    await waitFor(() => {
      const optionsContainer = container.querySelector(".absolute.w-full");
      expect(optionsContainer).not.toBeNull();
    });

    const optionDivs = Array.from(
      container.querySelectorAll('.absolute.w-full div[class*="cursor-pointer"]')
    );
    expect(optionDivs.length).toBeGreaterThanOrEqual(4);

    if (optionDivs.length >= 2) {
      await userEvent.click(optionDivs[1]);
      expect(args.onSelect).toHaveBeenCalled();
    }
  },
};

export const WithTitle: Story = {
  args: {
    options: ["Mexico City", "Cancun", "Guadalajara", "Monterrey", "Tijuana"],
    placeholder: "Select a city",
    title: "Destinations",
    bgColor: "bg-ado-snow-gray",
    textColor: "text-black",
    hoverColor: "hover:bg-ado-light-blue-gray",
    onSelect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const container = canvasElement.querySelector(".relative.w-\\[258px\\]");

    expect(container).not.toBeNull();

    if (!container) return;

    const dropdownButton = container.querySelector("button");
    expect(dropdownButton).not.toBeNull();

    if (!dropdownButton) return;

    expect(dropdownButton.textContent).toContain("Select a city");

    await userEvent.click(dropdownButton);

    await waitFor(() => {
      const titleElement = container.querySelector(".absolute.w-full span");
      expect(titleElement).not.toBeNull();
      expect(titleElement?.textContent).toBe("Destinations");
    });

    const optionDivs = Array.from(
      container.querySelectorAll('.absolute.w-full div[class*="cursor-pointer"]')
    );
    expect(optionDivs.length).toBeGreaterThanOrEqual(5);

    if (optionDivs.length >= 2) {
      await userEvent.click(optionDivs[1]);
      expect(args.onSelect).toHaveBeenCalled();
    }
  },
};

export const CustomStyle: Story = {
  args: {
    options: ["Economy", "Business", "First Class"],
    placeholder: "Select class",
    bgColor: "bg-ado-purple",
    textColor: "text-white",
    hoverColor: "hover:bg-ado-teal",
    className: "rounded-full",
    onSelect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const container = canvasElement.querySelector(".relative.w-\\[258px\\]");

    expect(container).not.toBeNull();

    if (!container) return;

    const dropdownButton = container.querySelector("button");
    expect(dropdownButton).not.toBeNull();

    if (!dropdownButton) return;

    expect(dropdownButton.textContent).toContain("Select class");
    expect(dropdownButton.className).toContain("bg-ado-purple");
    expect(dropdownButton.className).toContain("text-white");
    expect(dropdownButton.className).toContain("rounded-full");

    await userEvent.click(dropdownButton);

    await waitFor(() => {
      const optionsContainer = container.querySelector(".absolute.w-full");
      expect(optionsContainer).not.toBeNull();
    });

    const optionDivs = Array.from(
      container.querySelectorAll('.absolute.w-full div[class*="cursor-pointer"]')
    );
    expect(optionDivs.length).toBeGreaterThanOrEqual(3);

    if (optionDivs.length >= 3) {
      await userEvent.click(optionDivs[2]);
      expect(args.onSelect).toHaveBeenCalled();
    }
  },
};
