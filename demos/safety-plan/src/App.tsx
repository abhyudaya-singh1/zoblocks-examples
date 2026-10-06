"use client";

import { SafetyPlan } from "@/components/zoblocks/safety-plan";

export default function App() {
  return (
    <main
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      <SafetyPlan
        steps={{
          warningSigns: {
            entries: [
              "I start feeling hopeless or overwhelmed.",
              "I stop answering messages and want to be alone.",
              "I begin thinking that things will never get better.",
            ],
          },

          internalCoping: {
            entries: [
              "Take a short walk outside.",
              "Listen to calming music.",
              "Practice slow breathing for five minutes.",
            ],
          },

          distractions: {
            contacts: [
              {
                name: "Local coffee shop",
                detail: "Spend some time in a public place.",
              },
              {
                name: "Community park",
                detail: "Take a walk or sit somewhere around other people.",
              },
            ],
          },

          supportContacts: {
            contacts: [
              {
                name: "Alex",
                detail: "Friend",
                availability: "Usually available in the evening",
              },
              {
                name: "Jordan",
                detail: "Family member",
                availability: "Available most days",
              },
            ],
          },

          professionals: {
            contacts: [
              {
                name: "988 Suicide & Crisis Lifeline",
                availability: "24 hours",
              },
            ],
          },

          environment: {
            entries: [
              "Ask a trusted person to hold medications when I am struggling.",
              "Keep potentially dangerous items out of easy reach.",
              "Stay with someone I trust if my warning signs become stronger.",
            ],
          },
        }}
        pinCrisisStep
        headingLevel={3}
      />
    </main>
  );
}
