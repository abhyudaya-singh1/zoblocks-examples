import { Presence, PresenceChip } from "./components/zoblocks/care-team-presence";

export default function App() {
  const presenceList: Presence[] = [
    {
      clinician: {
        id: "123",
        display: "A. Vance, MD",
        role: "Attending",
      },
      state: "available",
    },
    {
      clinician: {
        id: "124",
        display: "L. Marsh, LCSW",
        role: "Therapist",
      },
      state: "in-session",
      until: "15:30",
    },
    {
      clinician: {
        id: "125",
        display: "R. Adeyemi, MD",
        role: "Hospitalist",
      },
      state: "signed-out",
      coveredBy: {
        id: "126",
        display: "T.Boateng, MD",
      },
    },
  ];

  const serverTime = "2026-10-05T10:30:00Z";

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col gap-2">
        {presenceList.map((presence) => (
          <PresenceChip key={presence.clinician.id} presence={presence} now={serverTime} />
        ))}
      </div>
    </div>
  );
}
