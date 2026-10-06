"use client";

import { TrendIndicator } from "@/components/zoblocks/trend-indicator";

const trends = [
  {
    label: "PHQ-9",
    series: {
      id: "phq9",
      label: "PHQ-9",
      unit: "",
      valence: "higher-is-worse" as const,
      points: [
        { at: "2026-07-01", value: 18 },
        { at: "2026-07-15", value: 15 },
        { at: "2026-08-01", value: 12 },
        { at: "2026-08-15", value: 6 },
      ],
    },
  },
  {
    label: "eGFR",
    series: {
      id: "egfr",
      label: "eGFR",
      unit: "",
      valence: "higher-is-better" as const,
      points: [
        { at: "2026-07-01", value: 84 },
        { at: "2026-07-15", value: 78 },
        { at: "2026-08-01", value: 70 },
        { at: "2026-08-15", value: 62 },
      ],
    },
  },
];

export default function App() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {trends.map(({ label, series }) => (
          <div
            key={series.id}
            style={{
              display: "grid",
              gridTemplateColumns: "55px 1fr",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>{label}</span>

            <TrendIndicator series={series} width={160} height={32} />
          </div>
        ))}
      </section>
    </main>
  );
}
