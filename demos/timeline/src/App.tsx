"use client";
import { Timeline } from "./components/zoblocks/timeline";

export default function App() {
  return (
    <div>
      <Timeline
        aria-label="Patient care timeline"
        items={[
          {
            title: "0.4.0",
            content: "Timeline.",
          },
          {
            title: "0.3.0",
            content: "Switch, Tabs.",
          },
          {
            title: "0.2.0",
            content: "Signature.",
          },
        ]}
      />
    </div>
  );
}
