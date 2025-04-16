import type { Meta, StoryObj } from "@storybook/react";
import TicketList from "./index";
import { withNextIntl } from "@/storybook/decorators";

const meta = {
  title: "Components/TicketList",
  component: TicketList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [withNextIntl],
} satisfies Meta<typeof TicketList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A list of tickets showing passenger information, seat details, and assistance status.",
      },
    },
  },
};
