import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { fn } from "@storybook/test";
import LoginFormModal from "./index";
import { NextIntlClientProvider } from "next-intl";

// Mock translations for the login form
const messages = {
  login: {
    login_text: "Login to your account",
    track_trip_history: "Login to track your trip history and manage your profile",
    email: "Email",
    ex_email: "example@mail.com",
    password: "Password",
    enter_password: "Enter your password",
    forgot_password: "Forgot password?",
    continue: "Continue",
    first_time: "First time on our site?",
    register: "Register",
    enter_as_guest: "Enter as guest",
  },
  register: {
    register_text: "Register",
    enter_your_info: "Enter your information to create an account",
    name: "Name",
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    password: "Password",
    confirm_password: "Confirm Password",
    ex_email: "example@mail.com",
    enter_password: "Enter your password",
    continue: "Continue",
    back_to_login: "Back to login",
    terms_1: "By registering, you accept our",
    terms_2: "Terms and Conditions",
    terms_3: "and",
    terms_4: "Privacy Policy",
  },
};

const meta = {
  title: "Components/LoginFormModal",
  component: LoginFormModal,
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
} satisfies Meta<typeof LoginFormModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLogin: fn(),
    onRegister: fn(),
    onContinueAsGuest: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The login form modal that allows users to sign in, register, or continue as a guest.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the initial login form is displayed
    const loginTitle = canvas.getByText("Login to your account");
    expect(loginTitle).toBeInTheDocument();

    // Check that the login form inputs are present
    const emailInput = canvas.getByPlaceholderText("example@mail.com");
    const passwordInput = canvas.getByPlaceholderText("Enter your password");
    const continueButton = canvas.getByText("Continue");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();

    // Enter login credentials
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    // Verify the inputs have the entered values
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");

    // Verify "Forgot password?" link exists
    const forgotPasswordLink = canvas.getByText("Forgot password?");
    expect(forgotPasswordLink).toBeInTheDocument();

    // Verify links to register or enter as guest
    const registerLink = canvas.getByText("Register");
    const guestLink = canvas.getByText("Enter as guest");
    expect(registerLink).toBeInTheDocument();
    expect(guestLink).toBeInTheDocument();

    // Test switching to register form
    await userEvent.click(registerLink);

    // Wait for the register form to appear
    await waitFor(() => {
      const registerTitle = canvas.getByText("Register");
      expect(registerTitle).toBeInTheDocument();
    });

    // Verify register form fields
    const firstNameInput = canvas.getByPlaceholderText("First Name");
    const lastNameInput = canvas.getByPlaceholderText("Last Name");
    const registerEmailInput = canvas.getByPlaceholderText("example@mail.com");
    const registerPasswordInput = canvas.getByPlaceholderText("Enter your password");
    const confirmPasswordInput = canvas.getByPlaceholderText("Confirm Password");

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(registerEmailInput).toBeInTheDocument();
    expect(registerPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();

    // Enter registration information
    await userEvent.type(firstNameInput, "John");
    await userEvent.type(lastNameInput, "Doe");
    await userEvent.type(registerEmailInput, "john.doe@example.com");
    await userEvent.type(registerPasswordInput, "securePassword123");
    await userEvent.type(confirmPasswordInput, "securePassword123");

    // Verify the inputs have the entered values
    expect(firstNameInput).toHaveValue("John");
    expect(lastNameInput).toHaveValue("Doe");
    expect(registerEmailInput).toHaveValue("john.doe@example.com");
    expect(registerPasswordInput).toHaveValue("securePassword123");
    expect(confirmPasswordInput).toHaveValue("securePassword123");

    // Verify terms and conditions references
    const termsText = canvas.getByText("By registering, you accept our");
    const termsLink = canvas.getByText("Terms and Conditions");
    const andText = canvas.getByText("and");
    const privacyLink = canvas.getByText("Privacy Policy");

    expect(termsText).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
    expect(andText).toBeInTheDocument();
    expect(privacyLink).toBeInTheDocument();

    // Test going back to login form
    const backToLoginLink = canvas.getByText("Back to login");
    expect(backToLoginLink).toBeInTheDocument();
    await userEvent.click(backToLoginLink);

    // Verify we're back to the login form
    await waitFor(() => {
      const loginTitleAgain = canvas.getByText("Login to your account");
      expect(loginTitleAgain).toBeInTheDocument();
    });
  },
};
