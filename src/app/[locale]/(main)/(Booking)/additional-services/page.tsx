import ConnectingTripCard from "@/components/ConnectingTripCard";

export default function AdditionalServices() {
  return (
    <div className="space-y-[46px]">
      <ConnectingTripCard
        title="Conecta de ida"
        date="Vie. 12 de nov."
        passengers={1}
        routes={[
          "Central México Norte, CDMX",
          "Central México Norte, CDMX",
          "Acapulco Costera, Gro.",
        ]}
        type="ida"
      />
      <ConnectingTripCard
        title="Conecta de regreso"
        date="Dom. 14 de nov."
        passengers={1}
        routes={[
          "Central México Norte, CDMX",
          "Central México Norte, CDMX",
          "Acapulco Costera, Gro.",
        ]}
        type="regreso"
      />
    </div>
  );
}
