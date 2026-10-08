import { ResultValue, ResultValueData } from "./components/zoblocks/result-value";

export default function App() {
  const potassium: ResultValueData = {
    id: "obs-123",
    versionId: "v2",
    analyte: "Potassium",
    value: 7,
    unit: "mmol/L",
    range: {
      low: 3.5,
      high: 5.1,
    },
    prior: {
      value: 4.0,
      at: "2026-10-07T07:00:00Z",
    },
    status: "final",
    resultedAt: "2026-10-07T08:00:00Z",
    provenance: "lab",
  };

  const hba1c: ResultValueData = {
    id: "obs-hba1c-001",
    analyte: "HbA1c",

    // No numeric result
    value: undefined,

    // The reason there is no result
    absent: "specimen-problem",

    // Extra explanation
    absentDetail: "Haemolysed. Recollection requested.",
  };

  const serverTime = "2026-10-07T17:59:00Z";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2.5">
        <ResultValue value={potassium} now={serverTime} density="compact" hideAnalyte={false} />
        <ResultValue value={hba1c} now={serverTime} density="compact" hideAnalyte={false} />
      </div>
    </div>
  );
}
