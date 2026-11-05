import { Timeline } from "../components/zoblocks/timeline";
import { CARE_EVENTS } from "../data/timeline-fixtures";

export function RailVariantsExample() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Rail variants</h2>
      <p className="text-sm opacity-70">The node marks come in filled and outlined styles.</p>
      <div className="flex flex-col gap-8">
        <div>
          <p className="mb-2 text-sm font-medium">variant=&quot;filled&quot;</p>
          <Timeline
            aria-label="Visit events, filled variant"
            items={CARE_EVENTS}
            variant="filled"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">variant=&quot;outlined&quot;</p>
          <Timeline
            aria-label="Visit events, outlined variant"
            items={CARE_EVENTS}
            variant="outlined"
          />
        </div>
      </div>
    </section>
  );
}
