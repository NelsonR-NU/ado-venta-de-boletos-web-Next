import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import Container from "./Container";

const meta = {
  title: "Components/Container",
  component: Container,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fullWidth: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-gray-100 p-4 border border-dashed border-gray-400 text-center">
        Default container content
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvas.getByText("Default container content").closest("div");
    expect(container).toBeInTheDocument();
    expect(container?.parentElement).toHaveClass("max-w-[1150px]");
    expect(container?.parentElement).toHaveClass("mx-auto");
    expect(container?.parentElement).not.toHaveClass("w-full");
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <div className="bg-gray-100 p-4 border border-dashed border-gray-400 text-center">
        Full width container content
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvas.getByText("Full width container content").closest("div");
    expect(container).toBeInTheDocument();
    expect(container?.parentElement).toHaveClass("w-full");
    expect(container?.parentElement).not.toHaveClass("max-w-[1150px]");
    expect(container?.parentElement).not.toHaveClass("mx-auto");
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: "bg-ado-purple text-white p-6 rounded-lg",
    children: <div>Container with custom styling</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvas.getByText("Container with custom styling").closest("div");
    expect(container).toBeInTheDocument();
    expect(container?.parentElement).toHaveClass("bg-ado-purple");
    expect(container?.parentElement).toHaveClass("text-white");
    expect(container?.parentElement).toHaveClass("p-6");
    expect(container?.parentElement).toHaveClass("rounded-lg");
  },
};

export const WithNestedContent: Story = {
  args: {
    children: (
      <div className="bg-gray-100 border space-y-4 border-dashed border-gray-400 p-4">
        <h2 className="text-xl font-bold">Container Title</h2>
        <p>This is a container with nested content elements.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded">Column 1</div>
          <div className="bg-gray-100 p-4 rounded">Column 2</div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-ado-purple text-white px-4 py-2 rounded">Action Button</button>
        </div>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByText("Container Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-xl");
    expect(title).toHaveClass("font-bold");

    const paragraph = canvas.getByText("This is a container with nested content elements.");
    expect(paragraph).toBeInTheDocument();

    const column1 = canvas.getByText("Column 1");
    expect(column1).toBeInTheDocument();
    expect(column1).toHaveClass("bg-gray-100");
    expect(column1).toHaveClass("p-4");
    expect(column1).toHaveClass("rounded");

    const column2 = canvas.getByText("Column 2");
    expect(column2).toBeInTheDocument();

    const button = canvas.getByRole("button", { name: "Action Button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-ado-purple");
    expect(button).toHaveClass("text-white");
  },
};
