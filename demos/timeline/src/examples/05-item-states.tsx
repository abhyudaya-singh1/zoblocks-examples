import { Timeline } from "../components/zoblocks/timeline";
import { STATE_ITEMS } from "../data/timeline-fixtures";

export function ItemStatesExample() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Item states</h2>
      <p className="text-sm opacity-70">
        Per-item colour and a custom icon. The last-but-one item sets loading, which only adds a
        data-loading attribute. The stylesheet does not animate it yet.
      </p>
      <Timeline
        aria-label="Encounter status events"
        items={[
          ...STATE_ITEMS,
          {
            title: "Discharged",
            content: "Home with follow-up.",
            icon: <span aria-hidden="true">✓</span>,
          },
        ]}
      />
    </section>
  );
}
