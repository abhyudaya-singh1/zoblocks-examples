import { useState } from "react";
import {
  createStaticProvider,
  lookUp,
  minimalDisclosure,
  type CopilotEvent,
  type Source,
} from "@zoblocks/copilot-core";
import { Copilot } from "@/components/zoblocks/copilot";

const disclosure = minimalDisclosure("demo-model@1", {
  developer: "Zowork",
  knowledgeCutoff: "2025-10",
});

const guideline: Source = {
  id: "acc-aha-af",
  title: "2023 ACC/AHA/HRS AF Guideline",
  passage:
    "In patients with atrial fibrillation and rapid ventricular response, rate control is a reasonable initial approach for those without severe symptoms.",
  highlight: [40, 106],
  kind: "guideline",
  version: "2023.1",
  retrievedAt: "2026-08-16T09:00:00.000Z",
  score: 0.91,
};

const groundedStream: CopilotEvent[] = [
  {
    type: "delta",
    text: "Rate control is a reasonable initial approach for most patients without severe symptoms.",
  },
  {
    type: "citation",
    marker: 1,
    source: guideline,
  },
  {
    type: "claim",
    claim: {
      span: [0, 86],
      markers: [1],
    },
  },
  {
    type: "done",
    finish: "stop",
  },
];

const provider = createStaticProvider({
  events: groundedStream,
  disclosure,
  phiPermitted: false,
});

export function CopilotDemo() {
  const [insertedText, setInsertedText] = useState("");

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "var(--zb-font-sans)",
        background: "var(--zb-bg-subtle)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "min(100%, 980px)",
          marginInline: "auto",
        }}
      >
        <Copilot
          provider={provider}
          modes={[lookUp]}
          anchor="inline"
          actor={{
            display: "Dr Amara Okafor",
            credential: "MD",
            reference: "Practitioner/7",
          }}
          locale="en-GB"
          onInsert={(text) => setInsertedText(text)}
        />

        {insertedText && (
          <section
            style={{
              marginTop: "24px",
              padding: "16px",
              borderRadius: "12px",
              background: "var(--zb-bg-surface)",
              border: "1px solid var(--zb-border-subtle)",
            }}
          >
            <strong>Inserted into note</strong>
            <p>{insertedText}</p>
          </section>
        )}
      </div>
    </main>
  );
}
