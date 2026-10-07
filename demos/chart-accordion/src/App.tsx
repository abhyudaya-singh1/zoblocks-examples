import { ChartAccordion, ChartSection } from "./components/zoblocks/chart-accordion";

export default function App() {
  const sectionsList: ChartSection[] = [
    {
      key: "allergies",
      label: "Allergies",
      status: "Active",
      severity: "high",
      count: 2,
      updatedAt: "2026-10-05",
      children: (
        <div>
          <p>Penicillin</p>
          <p>Peanuts</p>
        </div>
      ),
    },
    {
      key: "medications",
      label: "Medications",
      status: "Normal",
      severity: "normal",
      count: 3,
      updatedAt: "2026-10-05",
      children: (
        <div>
          <p>Medication 1</p>
          <p>Medication 2</p>
          <p>Medication 3</p>
        </div>
      ),
    },
    {
      key: "lab-results",
      label: "Lab Results",
      status: "Updated",
      severity: "low",
      count: 5,
      updatedAt: "2026-10-04",
      children: (
        <div>
          <p>5 recent lab results</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ChartAccordion sections={sectionsList} />
    </div>
  );
}
