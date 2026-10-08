import { ChartHeader } from "./components/zoblocks/chart-header";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div>
        <ChartHeader
          patient={{
            id: "patient-001",
            name: [{ given: ["John"], family: "Doe" }],
          }}
          identifiers={[{ kind: "mrn" }, { kind: "nhs" }]}
          surface="overview"
          encounters={[
            {
              id: "enc-001",
              label: "Emenrgency",
            },
            {
              id: "enc-002",
              label: "Visit",
            },
            {
              id: "enc-003",
              label: "Doctor visit",
            },
          ]}
          selectedEncounterId="enc-003"
          safety={{
            allergies: {
              label: "Penicillin",
              tone: "critical",
              detail: "Anaphylaxis",
            },

            codeStatus: {
              label: "Full Code",
              tone: "info",
            },

            fallRisk: {
              label: "High",
              tone: "warn",
            },
          }}
          program={{
            name: "Diabetes control",
            week: 2,
            of: 5,
          }}
          ward="3C"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold">Patient Chart</h2>
            <p className="mt-2">This is the content below the ChartHeader.</p>
          </div>
        </ChartHeader>
      </div>
    </div>
  );
}
