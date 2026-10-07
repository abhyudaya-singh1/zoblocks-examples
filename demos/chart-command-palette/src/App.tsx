"use client";

import * as React from "react";
import { ChartCommandPalette } from "@/components/zoblocks/chart-command-palette";
import type { PaletteItem } from "@/components/zoblocks/chart-command-palette";

const items: readonly PaletteItem[] = [
  {
    id: "patient-emily",
    kind: "patient",
    label: "Emily Johnson",
    detail: "PT-10245 · 32 years",
  },
  {
    id: "patient-james",
    kind: "patient",
    label: "James Wilson",
    detail: "PT-10418 · 47 years",
  },
  {
    id: "start-encounter",
    kind: "action",
    label: "Start encounter",
    detail: "Begin a new patient encounter",
  },
  {
    id: "open-medications",
    kind: "action",
    label: "Open medications",
    detail: "View the patient's current medications",
  },
  {
    id: "order-labs",
    kind: "action",
    label: "Order labs",
    detail: "Create a new laboratory order",
    significant: true,
  },
];

export default function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center ">
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "10px 16px",
          borderRadius: 6,
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer",
        }}
      >
        Open Command Palette
      </button>

      <ChartCommandPalette
        open={open}
        items={items}
        placeholder="Search patients or run a command…"
        onRun={(item) => {
          console.log("Command executed:", item);
        }}
        onSearchAudit={(audit) => {
          console.log("Search audit:", audit);
        }}
        onClose={() => setOpen(false)}
      />
    </main>
  );
}
