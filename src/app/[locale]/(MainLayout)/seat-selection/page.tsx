import Container from "@/components/Container";
import PassengerRegistrationForm from "@/components/PassengerRegistrationForm";
import ReservationSummary from "@/components/ReservationSummary";

export default function SeatSelection() {
  return (
    <Container>
      <div className="flex gap-3">
        <div className="flex-1">
        <PassengerRegistrationForm />
        </div>
        {/* Summary Section */}
        <div className="flex-1 max-w-[380px]">
          <ReservationSummary />
        </div>
      </div>
    </Container>
  );
}
