import type { TimelineItemType } from "../components/zoblocks/timeline";

export const BASIC_ITEMS: readonly TimelineItemType[] = [
  { title: "0.4.0", content: "Timeline." },
  { title: "0.3.0", content: "Switch, Tabs." },
  { title: "0.2.0", content: "Signature." },
];

export const CARE_EVENTS: readonly TimelineItemType[] = [
  { title: "09:00", content: "Arrived at clinic." },
  { title: "09:20", content: "Triage completed." },
  { title: "10:05", content: "Seen by doctor." },
];

export const STATE_ITEMS: readonly TimelineItemType[] = [
  { title: "Registered", content: "Record created.", color: "green" },
  { title: "Allergy flagged", content: "Needs review.", color: "red" },
  { title: "Archived", content: "Closed encounter.", color: "gray" },
  { title: "Custom colour", content: "Any CSS colour works.", color: "#7c3aed" },
  { title: "Awaiting results", content: "Sample in lab.", loading: true },
];
