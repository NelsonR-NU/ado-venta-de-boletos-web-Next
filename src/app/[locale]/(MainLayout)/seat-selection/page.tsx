import Container from "@/components/Container";
import ReservationSummary from "@/components/ReservationSummary";

export default function SeatSelection() {
  return (
    <Container>
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <h1>Seat Selection</h1>
        </div>
        {/* Summary Section */}
        <div className="flex-1 max-w-[380px]">
          <ReservationSummary />
        </div>
      </div>
    </Container>
  );
}
