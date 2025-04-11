import type { Meta, StoryObj } from "@storybook/react";
import DrawerModal from "./index";
import { useState } from "react";
import Button from "@/components/ui/Button";

// Wrapper component with state management to control the drawer
const DrawerWrapper = ({ title, content }: { title: string; content: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button buttonText="Open Drawer" onClick={() => setIsOpen(true)} className="mb-4" />
      <DrawerModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        {content}
      </DrawerModal>
    </div>
  );
};

const meta = {
  title: "Components/Drawer",
  component: DrawerModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DrawerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Drawer Title",
    children: (
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Drawer Content</h3>
        <p className="text-gray-600">
          This is the content of the drawer. You can place any components or content here.
        </p>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>Additional content or examples can go here.</p>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "A drawer component that slides in from the right side of the screen.",
      },
    },
  },
};

export const WithCustomTitle: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Custom Title",
    closeLabel: "Dismiss",
    children: (
      <div className="p-6">
        <p>Drawer with a custom title and close label.</p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "",
    children: <></>,
  },
  render: () => (
    <DrawerWrapper
      title="Interactive Drawer"
      content={
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Interactive Example</h3>
          <p className="mb-4">This drawer can be opened and closed using the button above.</p>
          <div className="p-4 bg-gray-100 rounded">
            <p>Click the close button in the header to close this drawer.</p>
          </div>
        </div>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "An interactive example of the drawer component. Click the button to open the drawer.",
      },
    },
  },
};
