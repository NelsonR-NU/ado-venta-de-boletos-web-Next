import type { Meta, StoryObj } from "@storybook/react";
import TripCard from "./index";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { withNextIntl } from "@/storybook/decorators";

const meta: Meta<typeof TripCard> = {
  title: "Components/ConnectingTripCard",
  component: TripCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [withNextIntl],
};

export default meta;
type Story = StoryObj<typeof TripCard>;

export const OneWayTrip: Story = {
  args: {
    title: "One Way Trip",
    date: "2024-03-20",
    passengers: 2,
    routes: ["Mexico City", "Guadalajara", "Puerto Vallarta"],
    type: "ida",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("One Way Trip");
    expect(title).toBeInTheDocument();
    const date = canvas.getByText("2024-03-20");
    expect(date).toBeInTheDocument();
    const passengers = canvas.getByText("2");
    expect(passengers).toBeInTheDocument();
    const routes = ["Mexico City", "Guadalajara", "Puerto Vallarta"];
    routes.forEach((route) => {
      expect(canvas.getByText(route)).toBeInTheDocument();
    });
  },
};

export const RoundTrip: Story = {
  args: {
    title: "Round Trip",
    date: "2024-03-25",
    passengers: 1,
    routes: ["Puerto Vallarta", "Guadalajara", "Mexico City"],
    type: "regreso",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const routes = ["Puerto Vallarta", "Guadalajara", "Mexico City"];
    routes.forEach((route) => {
      expect(canvas.getByText(route)).toBeInTheDocument();
    });
    const typeText = canvas.getByText("regreso");
    expect(typeText).toBeInTheDocument();
  },
};

export const MultiplePassengers: Story = {
  args: {
    title: "Family Trip",
    date: "2024-04-01",
    passengers: 4,
    routes: ["Mexico City", "Queretaro", "San Miguel de Allende"],
    type: "ida",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const passengers = canvas.getByText("4");
    expect(passengers).toBeInTheDocument();
    const routes = ["Mexico City", "Queretaro", "San Miguel de Allende"];
    routes.forEach((route) => {
      expect(canvas.getByText(route)).toBeInTheDocument();
    });
  },
};

export const LongRoute: Story = {
  args: {
    title: "Long Distance Trip",
    date: "2024-04-15",
    passengers: 1,
    routes: ["Tijuana", "Hermosillo", "Mazatlan", "Guadalajara", "Mexico City"],
    type: "ida",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const routes = ["Tijuana", "Hermosillo", "Mazatlan", "Guadalajara", "Mexico City"];
    routes.forEach((route) => {
      expect(canvas.getByText(route)).toBeInTheDocument();
    });
  },
};

export const SinglePassenger: Story = {
  args: {
    title: "Single Passenger",
    date: "2024-03-28",
    passengers: 1,
    routes: ["Monterrey", "Saltillo"],
    type: "ida",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const passengers = canvas.getByText("1");
    expect(passengers).toBeInTheDocument();
    const routes = ["Monterrey", "Saltillo"];
    routes.forEach((route) => {
      expect(canvas.getByText(route)).toBeInTheDocument();
    });
  },
};

export const FutureDate: Story = {
  args: {
    title: "Future Trip",
    date: "2024-12-25",
    passengers: 2,
    routes: ["Mexico City", "Acapulco"],
    type: "regreso",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const date = canvas.getByText("2024-12-25");
    expect(date).toBeInTheDocument();
    const routes = ["Mexico City", "Acapulco"];
    routes.forEach((route) => {
      expect(canvas.getByText(route)).toBeInTheDocument();
    });
  },
};

export const SpecialTitle: Story = {
  args: {
    title: "¡Vacaciones de Verano!",
    date: "2024-07-15",
    passengers: 3,
    routes: ["Cancun", "Playa del Carmen", "Tulum"],
    type: "ida",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("¡Vacaciones de Verano!");
    expect(title).toBeInTheDocument();
    const routes = ["Cancun", "Playa del Carmen", "Tulum"];
    routes.forEach((route) => {
      expect(canvas.getByText(route)).toBeInTheDocument();
    });
  },
};
