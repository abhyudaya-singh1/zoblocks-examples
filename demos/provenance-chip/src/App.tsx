import { ProvenanceChip } from "./components/zoblocks/provenance-chip";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-start">
        <ProvenanceChip
          record={{
            source: "clinic",
            observedAt: "2026-10-05T10:00:00Z",
            performer: {
              display: "Dr. Smith",
              role: "Physician",
            },
          }}
          now="2026-10-05T10:00:00Z"
        />

        <ProvenanceChip
          record={{
            source: "device",
            observedAt: "2026-10-01T10:00:00Z",
            device: "Omron BP7450",
          }}
          now="2026-10-05T10:00:00Z"
        />
      </div>
    </div>
  );
}
