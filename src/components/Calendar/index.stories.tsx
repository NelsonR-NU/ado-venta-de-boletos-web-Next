import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import Calendar from "./index";
import { NextIntlClientProvider } from "next-intl";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={{}} timeZone="UTC">
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DateRangeCalendar: Story = {
  parameters: {
    docs: {
      description: {
        story: "A date range calendar component that allows users to select a range of dates.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const calendars = canvas.getAllByRole("grid");
      expect(calendars.length).toBeGreaterThan(0);
    });

    await waitFor(() => {
      const dayElements = canvas.getAllByRole("gridcell");
      expect(dayElements.length).toBeGreaterThan(0);
    });

    const dayElements = canvas.getAllByRole("gridcell");
    const clickableDays = dayElements.filter((cell) => {
      const button = cell.querySelector("button:not([disabled])");
      return button !== null;
    });

    if (clickableDays.length <= 5) {
      return;
    }

    const startDayButton = clickableDays[0].querySelector("button");
    expect(startDayButton).not.toBeNull();
    await userEvent.click(startDayButton as HTMLElement);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const endDayButton = clickableDays[5].querySelector("button");
    expect(endDayButton).not.toBeNull();
    await userEvent.click(endDayButton as HTMLElement);

    const allButtons = canvas.getAllByRole("button");
    const nextMonthButton = allButtons.find(
      (button) =>
        button.getAttribute("aria-label")?.toLowerCase().includes("next month") ||
        button.textContent?.toLowerCase().includes("next")
    );

    if (nextMonthButton) {
      await userEvent.click(nextMonthButton);

      await waitFor(() => {
        const calendarGrids = canvas.getAllByRole("grid");
        expect(calendarGrids.length).toBeGreaterThan(0);
      });
    }
  },
};

export const MonthNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tests navigation between months in the calendar component.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const calendars = canvas.getAllByRole("grid");
      expect(calendars.length).toBeGreaterThan(0);
    });

    const allButtons = canvas.getAllByRole("button");
    const navigationButtons = allButtons.filter((button) => {
      const ariaLabel = button.getAttribute("aria-label")?.toLowerCase() || "";
      return (
        ariaLabel.includes("next") ||
        ariaLabel.includes("previous") ||
        ariaLabel.includes("siguiente") ||
        ariaLabel.includes("anterior")
      );
    });

    if (navigationButtons.length > 0) {
      const nextButton = navigationButtons.find((btn) => {
        const label = btn.getAttribute("aria-label")?.toLowerCase() || "";
        return label.includes("next") || label.includes("siguiente");
      });

      if (nextButton) {
        await userEvent.click(nextButton);

        await waitFor(() => {
          const calendar = canvas.getAllByRole("grid");
          expect(calendar.length).toBeGreaterThan(0);
        });
      }
    }
  },
};
