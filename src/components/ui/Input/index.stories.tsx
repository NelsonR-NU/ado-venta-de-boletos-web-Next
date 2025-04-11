import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./index";

const meta = {
  title: "UI Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "date"],
    },
    required: {
      control: "boolean",
    },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    label: "Text Input",
    type: "text",
    name: "textInput",
    value: "",
    placeholder: "Enter text...",
    required: false,
    onChange: () => {},
  },
};

export const Email: Story = {
  args: {
    label: "Email Address",
    type: "email",
    name: "email",
    value: "",
    placeholder: "your@email.com",
    required: true,
    onChange: () => {},
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    name: "password",
    value: "",
    placeholder: "Enter your password",
    required: true,
    onChange: () => {},
  },
};

export const WithContent: Story = {
  args: {
    label: "Filled Input",
    type: "text",
    name: "filledInput",
    value: "This input has content",
    placeholder: "Enter text...",
    required: false,
    onChange: () => {},
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: <span className="text-ado-purple font-bold">Custom label</span>,
    type: "text",
    name: "customLabel",
    value: "",
    placeholder: "Input with custom label",
    required: false,
    onChange: () => {},
  },
};
