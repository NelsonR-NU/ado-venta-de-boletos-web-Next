import type { Meta, StoryObj } from "@storybook/react";
import RegisterFormModal from "./index";
import { NextIntlClientProvider } from "next-intl";
import { useState } from "react";
import Button from "@/components/ui/Button";

// Interactive wrapper to control modal open state
const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button buttonText="Open Register Modal" onClick={() => setIsOpen(true)} className="mb-4" />
      <RegisterFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onBackToLogin={() => {
          setIsOpen(false);
          // In a real app, this would open the login modal
        }}
      />
    </div>
  );
};

// Mock translations for the register form
const messages = {
  register: {
    register: "Register",
    enter_details: "Enter your details to create an account",
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    ex_firstName: "John",
    ex_lastName: "Doe",
    ex_email: "example@domain.com",
    receive_promotions: "I would like to receive promotions and special offers",
    agree_terms: "I agree to the",
    terms_conditions: "Terms and Conditions",
    as_well_as_the: "as well as the",
    privacy_notice: "Privacy Notice",
    continue: "Continue",
  },
};

const meta = {
  title: "Forms/RegisterFormModal",
  component: RegisterFormModal,
  parameters: {
    layout: "centered",
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
} satisfies Meta<typeof RegisterFormModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onBackToLogin: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "The registration form modal that allows users to create a new account.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => <ModalWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          "An interactive example of the registration modal. Click the button to open the modal.",
      },
    },
  },
};
