import { Timeline } from "../components/zoblocks/timeline";
import { CARE_EVENTS } from "../data/timeline-fixtures";

export function ModesOrientationExample() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Mode and orientation</h2>
      <p className="text-sm opacity-70">
        Alternating sides, and a horizontal layout. On narrow screens the alternating layout
        collapses to a single column.
      </p>
      <div className="flex flex-col gap-8">
        <div>
          <p className="mb-2 text-sm font-medium">mode=&quot;alternate&quot;</p>
          <Timeline
            aria-label="Visit events, alternate mode"
            items={CARE_EVENTS}
            mode="alternate"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">orientation=&quot;horizontal&quot;</p>
          <Timeline
            aria-label="Visit events, horizontal"
            items={CARE_EVENTS}
            orientation="horizontal"
          />
        </div>
      </div>
    </section>
  );
}
