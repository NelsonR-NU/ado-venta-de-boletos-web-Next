import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import Card from "./index";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Basic card content</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByText("Basic card content").closest("section");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("bg-ado-background-secondary");
    expect(card).toHaveClass("rounded-2xl");
    expect(card).toHaveClass("border-ado-neutral-light");
  },
};

/**
 * Card with various content elements
 */
export const WithContent: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Card Title</h2>
        <p>This is a card with multiple content elements including text and other components.</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Additional info</span>
          <button className="bg-ado-purple text-white px-4 py-2 rounded">Action</button>
        </div>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Card Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-xl");
    expect(title).toHaveClass("font-bold");

    const paragraph = canvas.getByText(/This is a card with multiple content elements/);
    expect(paragraph).toBeInTheDocument();

    const additionalInfo = canvas.getByText("Additional info");
    expect(additionalInfo).toBeInTheDocument();
    expect(additionalInfo).toHaveClass("text-sm");
    expect(additionalInfo).toHaveClass("text-gray-500");

    const button = canvas.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-ado-purple");
    expect(button).toHaveClass("text-white");
  },
};

/**
 * Card with custom styling through className prop
 */
export const WithCustomClassName: Story = {
  args: {
    children: <div>Custom styled card</div>,
    className: "bg-ado-purple text-white border-none",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByText("Custom styled card").closest("section");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("bg-ado-purple");
    expect(card).toHaveClass("text-white");
    expect(card).toHaveClass("border-none");
    expect(card).toHaveClass("rounded-2xl");
  },
};

/**
 * Card with another card nested inside
 */
export const Nested: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Parent Card</h2>
        <p>This card contains another card inside it.</p>
        <Card className="bg-white shadow-sm">
          <div>
            <h3 className="text-lg font-medium">Nested Card</h3>
            <p>This is a card nested inside another card.</p>
          </div>
        </Card>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const parentTitle = canvas.getByText("Parent Card");
    expect(parentTitle).toBeInTheDocument();

    const parentDescription = canvas.getByText("This card contains another card inside it.");
    expect(parentDescription).toBeInTheDocument();

    const nestedTitle = canvas.getByText("Nested Card");
    expect(nestedTitle).toBeInTheDocument();

    const nestedDescription = canvas.getByText("This is a card nested inside another card.");
    expect(nestedDescription).toBeInTheDocument();

    const nestedCard = nestedTitle.closest("section");
    expect(nestedCard).toBeInTheDocument();
    expect(nestedCard).toHaveClass("bg-white");
    expect(nestedCard).toHaveClass("shadow-sm");
  },
};
