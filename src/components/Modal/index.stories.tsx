import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { fn } from "@storybook/test";
import Modal from "./index";
import { ReactNode, useState } from "react";
import Button from "@/components/ui/Button";

// Wrapper component to control modal state for storybook
const ModalWrapper = ({
  children,
  showCloseIcon = true,
  initialState = false,
}: {
  children: ReactNode;
  showCloseIcon?: boolean;
  initialState?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(initialState);

  return (
    <div>
      <Button
        buttonText="Open Modal"
        onClick={() => setIsOpen(true)}
        variant="primary"
        data-testid="open-modal-button"
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} showCloseIcon={showCloseIcon}>
        {children}
      </Modal>
    </div>
  );
};

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
    },
    showCloseIcon: {
      control: "boolean",
    },
    onClose: { action: "closed" },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "300px", padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type StoryType = StoryObj<typeof meta>;

// Using a render function to allow for state in the story
export const Default: StoryType = {
  args: {
    isOpen: true,
    showCloseIcon: true,
    children: <div>Modal content</div>,
    onClose: fn(),
  },
  render: () => (
    <ModalWrapper initialState={false}>
      <div className="p-4" data-testid="modal-content">
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="mb-4">This is a default modal with some content.</p>
        <div className="flex justify-end">
          <Button
            buttonText="Close"
            onClick={() => {}}
            variant="secondary"
            data-testid="close-button"
          />
        </div>
      </div>
    </ModalWrapper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The modal should be initially closed
    const modalButton = canvas.getByTestId("open-modal-button");
    expect(modalButton).toBeInTheDocument();

    // Click to open the modal
    await userEvent.click(modalButton);

    // The modal should now be visible
    const modalContent = canvas.getByTestId("modal-content");
    expect(modalContent).toBeInTheDocument();

    // Verify modal title and content
    const modalTitle = canvas.getByText("Modal Title");
    const modalBody = canvas.getByText("This is a default modal with some content.");
    expect(modalTitle).toBeInTheDocument();
    expect(modalBody).toBeInTheDocument();

    // Close button should be present
    const closeButton = canvas.getByTestId("close-button");
    expect(closeButton).toBeInTheDocument();

    // Close icon should be present (default behavior)
    const closeIcon = document.querySelector('[aria-label="Close"]');
    expect(closeIcon).toBeInTheDocument();

    // Click the close icon to close the modal
    await userEvent.click(closeIcon!);

    // The modal should no longer be visible
    expect(modalContent).not.toBeVisible();
  },
};

export const WithoutCloseIcon: StoryType = {
  args: {
    isOpen: true,
    showCloseIcon: false,
    children: <div>Modal without close icon</div>,
    onClose: fn(),
  },
  render: () => (
    <ModalWrapper showCloseIcon={false} initialState={false}>
      <div className="p-4" data-testid="modal-without-close-icon">
        <h2 className="text-xl font-bold mb-4">No Close Icon</h2>
        <p className="mb-4">This modal doesn&apos;t show the close icon in the corner.</p>
        <div className="flex justify-end">
          <Button
            buttonText="Close Modal"
            onClick={() => {}}
            variant="primary"
            data-testid="custom-close-button"
          />
        </div>
      </div>
    </ModalWrapper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The modal should be initially closed
    const modalButton = canvas.getByTestId("open-modal-button");
    expect(modalButton).toBeInTheDocument();

    // Click to open the modal
    await userEvent.click(modalButton);

    // The modal should now be visible
    const modalContent = canvas.getByTestId("modal-without-close-icon");
    expect(modalContent).toBeInTheDocument();

    // Verify modal title
    const modalTitle = canvas.getByText("No Close Icon");
    expect(modalTitle).toBeInTheDocument();

    // Close icon should not be present
    const closeIcon = document.querySelector('[aria-label="Close"]');
    expect(closeIcon).not.toBeInTheDocument();

    // Custom close button should be present
    const closeButton = canvas.getByTestId("custom-close-button");
    expect(closeButton).toBeInTheDocument();
  },
};

export const WithForm: StoryType = {
  args: {
    isOpen: true,
    showCloseIcon: true,
    children: <div>Form content</div>,
    onClose: fn(),
  },
  render: () => (
    <ModalWrapper initialState={false}>
      <div className="p-4" data-testid="form-modal-content">
        <h2 className="text-xl font-bold mb-4">Form Modal</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              data-testid="name-input"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              data-testid="email-input"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              buttonText="Cancel"
              onClick={() => {}}
              variant="secondary"
              data-testid="cancel-button"
            />
            <Button
              buttonText="Submit"
              onClick={() => {}}
              variant="primary"
              data-testid="submit-button"
            />
          </div>
        </form>
      </div>
    </ModalWrapper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the modal
    const modalButton = canvas.getByTestId("open-modal-button");
    await userEvent.click(modalButton);

    // Verify the form modal is displayed
    const formModal = canvas.getByTestId("form-modal-content");
    expect(formModal).toBeInTheDocument();

    // Test form inputs
    const nameInput = canvas.getByTestId("name-input");
    const emailInput = canvas.getByTestId("email-input");
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    // Fill out the form
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");

    // Verify input values
    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");

    // Submit and cancel buttons should be present
    const submitButton = canvas.getByTestId("submit-button");
    const cancelButton = canvas.getByTestId("cancel-button");
    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  },
};
