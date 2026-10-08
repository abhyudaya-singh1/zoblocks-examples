import { useState } from "react";
import { RecentPatientStack, type OpenChart } from "@/components/zoblocks/recent-patient-stack";

import "@/styles/zoblocks-tokens.css";
import "@/styles/zoblocks-workspace.css";

const NOW = "2026-10-06T18:10:00+05:30";

const INITIAL_CHARTS: OpenChart[] = [
  {
    id: "marsh",
    display: "L. Marsh",
    photo: "https://api.dicebear.com/10.x/lorelei/svg?seed=L-Marsh",
    lastActiveAt: "2026-10-06T17:55:00+05:30",
    work: [
      {
        kind: "unsigned-note",
        since: "2026-10-03T18:10:00+05:30",
      },
    ],
  },
  {
    id: "okonkwo",
    display: "A. Okonkwo",
    photo: "https://api.dicebear.com/10.x/lorelei/svg?seed=A-Okonkwo",
    reason: "Ward round",
    lastActiveAt: "2026-10-06T18:05:00+05:30",
  },
  {
    id: "patient-3",
    display: "M. Patel",
    photo: "https://api.dicebear.com/10.x/lorelei/svg?seed=M-Patel",
    lastActiveAt: "2026-10-06T17:40:00+05:30",
  },
  {
    id: "patient-4",
    display: "R. Thomas",
    lastActiveAt: "2026-10-06T17:20:00+05:30",
  },
];

function App() {
  const [charts, setCharts] = useState<OpenChart[]>(INITIAL_CHARTS);

  const handleActivate = (chart: OpenChart) => {
    setCharts((current) =>
      current.map((item) =>
        item.id === chart.id
          ? {
              ...item,
              lastActiveAt: NOW,
            }
          : item,
      ),
    );
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        background: "var(--zb-bg-subtle)",
        fontFamily: "var(--zb-font-sans)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "28px",
          border: "1px solid var(--zb-border)",
          borderRadius: "var(--zb-radius-lg)",
          background: "var(--zb-surface)",
          boxSizing: "border-box",
        }}
      >
        <RecentPatientStack charts={charts} now={NOW} onActivate={handleActivate} />
      </div>
    </main>
  );
}

export default App;
