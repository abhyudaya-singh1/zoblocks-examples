import { ClinicalNote } from "./components/zoblocks/clinical-note";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4npm run lint">
      <ClinicalNote
        subject={{
          reference: "Patient/123",
          display: "John Smith",
        }}
        author={{
          display: "Dr. Sarah",
          role: "Attending",
        }}
        noteType="progress"
        now={new Date()}
      />
    </div>
  );
}
