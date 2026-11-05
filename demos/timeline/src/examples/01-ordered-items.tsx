import { Timeline } from "../components/zoblocks/timeline";
import { BASIC_ITEMS } from "../data/timeline-fixtures";

export function OrderedItemsExample() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Ordered items</h2>
      <p className="text-sm opacity-70">Events render in the order they are given.</p>
      <Timeline aria-label="Patient care timeline" items={BASIC_ITEMS} />
    </section>
  );
}
