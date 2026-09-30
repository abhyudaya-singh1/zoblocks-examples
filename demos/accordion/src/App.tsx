"use client";

import { Accordion } from "@/components/zoblocks/accordion";

export default function App() {
  return (
    <div>
      <Accordion
        headingLevel={2}
        density="clinical"
        onDisclose={async (event) => {
          console.log("Disclosure requested:", {
            section: event.key,
            reason: event.reasonCode,
            at: event.at,
          });
          return true;
        }}
        items={[
          {
            key: "risk",
            label: "Risk & suicidality",
            severity: "critical",
            summary: "C-SSRS positive · 13 Aug",
            children: (
              <div>
                {" "}
                <p>
                  {" "}
                  Ideation 3 — active thoughts, no plan, no intent, no preparatory behaviour.{" "}
                </p>{" "}
              </div>
            ),
          },
          {
            key: "medications",
            label: "Medications",
            severity: "high",
            summary: "Clozapine ANC due 18 Aug",
            children: (
              <div>
                {" "}
                <p> Clozapine 300 mg nightly. Lithium carbonate 900 mg nightly. </p>{" "}
              </div>
            ),
          },
          {
            key: "safety-plan",
            label: "Safety plan",
            severity: "normal",
            summary: "Current · revised 11 Aug",
            children: (
              <div>
                {" "}
                <p> Six steps complete. Means restriction reviewed on 11 September. </p>{" "}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
