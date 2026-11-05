"use client";
import { OrderedItemsExample } from "./examples/01-ordered-items";
import { ReverseOrderExample } from "./examples/02-reverse-order";
import { RailVariantsExample } from "./examples/03-rail-variants";
import { ModesOrientationExample } from "./examples/04-modes-orientation";
import { ItemStatesExample } from "./examples/05-item-states";

export default function App() {
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-3xl space-y-12">
        <OrderedItemsExample />
        <ReverseOrderExample />
        <RailVariantsExample />
        <ModesOrientationExample />
        <ItemStatesExample />
      </div>
    </main>
  );
}
