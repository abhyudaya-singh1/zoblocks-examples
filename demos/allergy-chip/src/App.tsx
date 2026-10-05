"use client";
import { AllergyChip } from "./components/zoblocks/allergy-chip";
import type { AllergyRecord } from "@/lib/zoblocks-allergy";

const allergies: AllergyRecord[] = [
  {
    id: "allergy-penicillin",
    substance: "Penicillin G",
    kind: "allergy",
    criticality: "high",
    verification: "confirmed",
    reactions: [{ manifestation: "Urticaria", severity: "mild", onset: "1998" }],
    note: "Documented during childhood.",
  },
  {
    id: "allergy-amoxicillin",
    substance: "Amoxicillin",
    kind: "allergy",
    criticality: "low",
    verification: "unconfirmed",
    reactions: [{ manifestation: "Urticaria", severity: "mild", onset: "2019" }],
  },
];
export default function App() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <section>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 16,
          }}
        >
          {allergies.map((record) => (
            <AllergyChip key={record.id} record={record} />
          ))}
        </div>
      </section>
    </main>
  );
}
