import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { fn } from "@storybook/test";
import { userEvent, within } from "@storybook/testing-library";
import Button from "./index";

const meta = {
  title: "UI Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    buttonStyle: {
      control: { type: "select" },
      options: ["filled", "outline", "none"],
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    buttonStyle: "filled",
    buttonText: "Primary Button",
    disabled: false,
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    // Arrange - setup by finding the button in the DOM
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /Primary Button/i });

    // Assert - verify button is rendered correctly
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button.className).toContain("bg-ado-purple");
    expect(button.className).toContain("text-white");

    // Act - simulate a click
    await userEvent.click(button);
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    buttonStyle: "filled",
    buttonText: "Secondary Button",
    disabled: false,
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /Secondary Button/i });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button.className).toContain("bg-gray-200");

    await userEvent.click(button);
  },
};

export const Outline: Story = {
  args: {
    variant: "primary",
    buttonStyle: "outline",
    buttonText: "Outline Button",
    disabled: false,
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /Outline Button/i });

    expect(button).toBeInTheDocument();
    expect(button.className).toContain("border-ado-purple");
    expect(button.className).toContain("!text-ado-purple");
    expect(button.className).toContain("bg-transparent");

    await userEvent.click(button);
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    buttonStyle: "filled",
    buttonText: "Disabled Button",
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /Disabled Button/i });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button.className).toContain("bg-gray-300");
    expect(button.className).toContain("text-gray-500");
    expect(button.className).toContain("cursor-not-allowed");

    // This click should have no effect because the button is disabled
    await userEvent.click(button);
  },
};

export const WithClickHandler: Story = {
  args: {
    variant: "primary",
    buttonStyle: "filled",
    buttonText: "Clickable Button",
    disabled: false,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /Clickable Button/i });

    // Click the button
    await userEvent.click(button);

    // Verify that the click handler was called
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
