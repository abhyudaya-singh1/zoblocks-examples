import { Timeline } from "../components/zoblocks/timeline";
import { CARE_EVENTS } from "../data/timeline-fixtures";

export function ReverseOrderExample() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Reverse order</h2>
      <p className="text-sm opacity-70">
        Same events, newest first. Only the rendered order changes.
      </p>
      <Timeline aria-label="Visit events, newest first" items={CARE_EVENTS} reverse />
    </section>
  );
}
