import type { Meta, StoryObj } from "@storybook/react";
import Filter from "./index";
import { withNextIntl } from "@/storybook/decorators";

const meta = {
  title: "Components/Filter",
  component: Filter,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [withNextIntl],
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: {
      day: "Mon",
      date: "2023-05-15",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "A filter component that allows users to filter and sort trip results. Includes dropdown for sorting options and a filter drawer.",
      },
    },
  },
};

export const WeekendDay: Story = {
  args: {
    date: {
      day: "Sat",
      date: "2023-05-20",
    },
  },
};
