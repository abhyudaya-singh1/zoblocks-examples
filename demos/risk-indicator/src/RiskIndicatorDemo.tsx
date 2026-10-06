import { RiskIndicator, type RiskAssessment } from "@/components/zoblocks/risk-indicator";

const readmission: RiskAssessment = {
  id: "readmission-001",
  outcome: "30-day readmission",
  band: "high",
  probability: 0.31,
  percentile: 94,
  cohort: "adult medicine",
  computedAt: "2026-10-04T06:00:00.000Z",
  drivers: [
    {
      label: "3 admissions / 6 mo",
      weight: 11.2,
    },
    {
      label: "Lives alone",
      weight: 4.8,
    },
    {
      label: "Adherent to statin",
      weight: -2.1,
    },
  ],
  model: {
    name: "Readmit-v4",
    auc: 0.71,
  },
};

const now = "2026-10-04T12:00:00.000Z";

export function RiskIndicatorDemo() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        background: "var(--zb-bg-subtle, #f8fafc)",
        fontFamily: "var(--zb-font-sans, sans-serif)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "320px" }}>
        <RiskIndicator
          assessment={readmission}
          now={now}
          notADiagnosis="A statistical estimate. Not a diagnosis."
          driverCount={3}
        />
      </div>
    </main>
  );
}
