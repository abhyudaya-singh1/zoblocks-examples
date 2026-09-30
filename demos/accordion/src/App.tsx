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
                <h3>Risk Assessment</h3>
                <p>Patient screened positive on the Columbia-Suicide Severity Rating Scale.</p>
                <p>Current assessment indicates elevated risk requiring documented follow-up.</p>
              </div>
            ),
          },
          {
            key: "sud",
            label: "Substance use treatment",
            access: {
              kind: "consent",
              policy: "42 CFR Part 2",
              state: "granted",
            },
            children: (
              <div>
                <h3>Substance Use Treatment</h3>
                <p>
                  Substance use treatment information is available under the patients granted
                  consent.
                </p>
                <p>Treatment plan and related clinical notes are displayed here.</p>
              </div>
            ),
          },
          {
            key: "psychotherapy",
            label: "Psychotherapy notes",
            access: {
              kind: "withheld",
              reason: "Kept separately by the author",
            },
          },
        ]}
      />
    </div>
  );
}
