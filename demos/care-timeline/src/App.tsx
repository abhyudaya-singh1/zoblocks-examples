import { CareTimeline } from "@/components/zoblocks/care-timeline";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <CareTimeline
        aria-label="Care timeline for Ada Lovelace"
        events={[]}
        now={"2025-07-01"}
        coverage={{
          window: { from: "2025-07-01" },
          order: "newest-first",
          total: 43,
          hidden: [{ reason: "access", count: 2 }],
          sources: [
            { id: "ehr", label: "Northside EHR", status: "ok" },
            {
              id: "hie",
              label: "Northside Regional Exchange",
              status: "unavailable",
              detail: "Timed out after 8s.",
            },
          ],
        }}
        group="auto"
        cluster={{ kinds: ["observation"], within: "P3D", min: 3 }}
        seenThrough="2026-08-12T14:02:00+05:30"
        lateEntryAfter="P2D"
        onLoadOlder={() => console.log("onLoadOlder called")}
      />
    </div>
  );
}
