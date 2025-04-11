import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { fn } from "@storybook/test";
import { userEvent, within } from "@storybook/testing-library";
import Checkbox from "./index";

const meta = {
  title: "UI Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default checkbox",
    checked: false,
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    const label = canvas.getByText("Default checkbox");

    // Assert
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    label: "Checked checkbox",
    checked: true,
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Assert
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: <span className="text-ado-purple font-bold">Custom styled label</span>,
    checked: false,
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    const label = canvas.getByText("Custom styled label");

    // Assert
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label.className).toContain("text-ado-purple");
    expect(label.className).toContain("font-bold");
    expect(checkbox).not.toBeChecked();
  },
};

export const WithClassName: Story = {
  args: {
    label: "Checkbox with custom class",
    checked: false,
    className: "bg-gray-100 p-2 rounded-md",
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    const formControlLabel = checkbox.closest(".MuiFormControlLabel-root");

    // Assert
    expect(checkbox).toBeInTheDocument();
    expect(formControlLabel).toHaveClass("bg-gray-100");
    expect(formControlLabel).toHaveClass("p-2");
    expect(formControlLabel).toHaveClass("rounded-md");
  },
};

export const WithClickHandler: Story = {
  args: {
    label: "Interactive checkbox",
    checked: false,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    // Arrange
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Act - click the checkbox
    await userEvent.click(checkbox);

    // Assert
    expect(args.onChange).toHaveBeenCalledTimes(1);
  },
};
