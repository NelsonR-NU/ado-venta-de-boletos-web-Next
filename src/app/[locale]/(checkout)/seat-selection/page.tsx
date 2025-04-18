import Container from "@/components/Container/Container";
import PassengerRegistrationForm from "@/components/PassengerRegistrationForm";
import ReservationSummary from "@/components/ReservationSummary";

export default function SeatSelection() {
  return (
    <div>
      <Container>
        <div className="flex gap-3">
          <div className="flex-1 ">
            <PassengerRegistrationForm />
          </div>
          <div className="flex-1 hidden md:flex max-w-[356px] lg:max-w-[380px]">
            <ReservationSummary />
          </div>
        </div>
      </Container>
    </div>
  );
}
