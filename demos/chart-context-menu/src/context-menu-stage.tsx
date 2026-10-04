import { useState } from "react";
import {
  ChartContextMenu,
  type ChartMenuAction,
  type MenuSubject,
} from "@/components/zoblocks/chart-context-menu";

// A fixed instant. A disclosure record needs a timestamp, and the component
// never reads the clock itself, so the host app passes one in.
const NOW = "2026-08-31T09:24:00-04:00";

// Who is signed in. The menu uses it to word the "hidden for…" line at its foot.
const POLICY = { role: "a registered nurse", breakGlass: true } as const;

// Invented data only. ZoBlocks never uses real patient information.
const MEDICATION: MenuSubject = {
  resource: "MedicationRequest",
  id: "med-4471",
  label: "Lisinopril 10 mg",
  detail: "Oral · daily · started 4 Mar 2026",
};

const RESULT: MenuSubject = {
  resource: "Observation",
  id: "obs-8812",
  label: "Potassium 6.8 mmol/L",
  detail: "Critical high · preliminary · 09:12 today",
};

// Masked: the data still carries a real label, and the menu must not show it.
const RESTRICTED: MenuSubject = {
  resource: "DocumentReference",
  id: "doc-9911",
  label: "Group therapy note — Nwosu, C.",
  detail: "Signed by R. Adeyemi, LPC",
  masked: true,
};

const MEDICATION_ACTIONS: ChartMenuAction[] = [
  // Routine: runs on the click.
  { id: "open", label: "Open order", tier: "routine", shortcut: "↵" },
  { id: "copy", label: "Copy as text", tier: "routine", shortcut: "⌘C" },
  { id: "history", label: "Administration history", tier: "routine" },
  // Documented: runs, but says what it writes first.
  {
    id: "mar",
    label: "Add a note to the MAR",
    tier: "documented",
    applies: ["MedicationRequest"],
    records: "Writes a note on the medication record. Nursing sees it at the next round.",
  },
  // Clinical: takes a second step, drawn under its row.
  {
    id: "dc",
    label: "Discontinue",
    tier: "clinical",
    applies: ["MedicationRequest"],
    confirm: "The next scheduled dose is 14:00 today. Discontinuing stops it.",
    confirmVerb: "Discontinue",
  },
  // Unavailable: stays in place, with the reason.
  {
    id: "renew",
    label: "Renew for 90 days",
    tier: "clinical",
    applies: ["MedicationRequest"],
    confirm: "Issues a new order in your name.",
    availability: {
      status: "unavailable",
      reason: "Prescriber role required — you are signed in as a registered nurse",
    },
  },
  // Withheld: not shown, but counted at the foot of the menu.
  {
    id: "delete",
    label: "Delete order",
    tier: "clinical",
    applies: ["MedicationRequest"],
    confirm: "Removes the order entirely.",
    availability: { status: "withheld" },
  },
];

const RESULT_ACTIONS: ChartMenuAction[] = [
  { id: "open", label: "Open result", tier: "routine", shortcut: "↵" },
  { id: "range", label: "Show reference range", tier: "routine" },
  // A submenu: routine actions only.
  {
    id: "trend",
    label: "Trend",
    tier: "routine",
    submenu: [
      { id: "t7", label: "Last 7 days", tier: "routine" },
      { id: "t30", label: "Last 30 days", tier: "routine" },
      { id: "t365", label: "Last year", tier: "routine" },
    ],
  },
  // Blocked, with the reason in place rather than the row removed.
  {
    id: "portal",
    label: "Release to patient portal",
    tier: "documented",
    applies: ["Observation"],
    records: "Publishes the value to the patient's portal immediately.",
    availability: {
      status: "unavailable",
      reason: "Preliminary results are not released. This one has not been verified by the lab.",
    },
  },
  {
    id: "ack",
    label: "Acknowledge critical result",
    tier: "clinical",
    applies: ["Observation"],
    confirm: "Recorded against your name, and it stops the escalation page due at 09:42.",
    confirmVerb: "Acknowledge",
  },
];

const NOTE_ACTIONS: ChartMenuAction[] = [
  { id: "open", label: "Open note", tier: "routine" },
  { id: "print", label: "Print", tier: "routine", shortcut: "⌘P" },
  {
    id: "addendum",
    label: "Add an addendum",
    tier: "documented",
    applies: ["DocumentReference"],
    records: "Appended and timestamped. The original text is never altered.",
  },
  // Disclosive: needs a reason, and the reason is recorded.
  {
    id: "part2",
    label: "Reveal Part 2 content",
    tier: "disclosive",
    applies: ["DocumentReference"],
    reasons: [
      "Treatment of this patient",
      "Medical emergency (42 CFR §2.51)",
      "Written patient consent on file",
    ],
  },
];

export type StageDensity = "patient" | "standard" | "clinical";

function Row(props: {
  subject: MenuSubject;
  actions: ChartMenuAction[];
  right: string;
  compact: boolean;
  onEvent: (line: string) => void;
}) {
  const { subject, actions, right, compact, onEvent } = props;
  return (
    <ChartContextMenu
      subject={subject}
      actions={actions}
      policy={POLICY}
      now={NOW}
      density={compact ? "compact" : "comfortable"}
      onRun={(action) => onEvent(`onRun("${action.id}") — ${action.label}`)}
      onBlocked={(_action, reason) => onEvent(`Blocked — ${reason}`)}
      onDisclose={(record) => onEvent(`onDisclose — ${record.action}, ${record.outcome}`)}
    >
      {(trigger) => (
        <div
          {...trigger}
          className="flex select-none items-center gap-3 rounded-md border border-[var(--zb-border)] bg-[var(--zb-surface)] px-3 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--zb-focus-ring)]"
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-[var(--zb-text)]">
              {subject.masked ? "Restricted record" : subject.label}
            </span>
            <span className="block truncate text-xs text-[var(--zb-text-subtle)]">
              {subject.masked ? "42 CFR Part 2 · not disclosed" : subject.detail}
            </span>
          </span>
          <span className="shrink-0 text-xs tabular-nums text-[var(--zb-text-subtle)]">
            {right}
          </span>
        </div>
      )}
    </ChartContextMenu>
  );
}

export function ContextMenuStage({ density }: { density: StageDensity }) {
  const [event, setEvent] = useState<string | null>(null);
  const compact = density === "clinical";

  return (
    <div className="grid gap-3">
      <div className="grid gap-2">
        <Row
          subject={MEDICATION}
          actions={MEDICATION_ACTIONS}
          right="14:00"
          compact={compact}
          onEvent={setEvent}
        />
        <Row
          subject={RESULT}
          actions={RESULT_ACTIONS}
          right="09:12"
          compact={compact}
          onEvent={setEvent}
        />
        <Row
          subject={RESTRICTED}
          actions={NOTE_ACTIONS}
          right="28 Aug"
          compact={compact}
          onEvent={setEvent}
        />
      </div>
      <p className="m-0 min-h-5 text-xs text-[var(--zb-text-muted)]" aria-live="polite">
        {event ?? "Right-click a row, or focus one and press Shift+F10."}
      </p>
    </div>
  );
}
