import { useState } from "react";
import { ContextMenuStage, type StageDensity } from "./context-menu-stage";
import { HostChrome } from "./host-chrome";

const DENSITIES: StageDensity[] = ["patient", "standard", "clinical"];

// The three states from the ZoBlocks docs. All three show the same live stage;
// what changes is the note explaining why that behaviour exists.
const STATES = [
  {
    id: "subject",
    label: "It names what it is about",
    note: "Right-click any row. The header names the record, so the first thing under the pointer is never a verb — the wrong-patient check and the accidental click-through, closed at once. It also names the popup for a screen reader. No prop removes it.",
  },
  {
    id: "consequence",
    label: "Consequence is a rank, not a boolean",
    note: "Copy runs on the click. “Add a note to the MAR” runs too, but says what it writes first. Discontinue takes a second step, drawn under its row rather than in a modal. “Reveal Part 2 content” takes a reason — and records it the moment the list is offered, even if you press Escape.",
  },
  {
    id: "withheld",
    label: "Withheld is counted, masked stays masked",
    note: "The medication hides one action from a nurse and says so at the foot of the menu. The third row is restricted, and its menu will not resolve the name the list was hiding. The potassium's portal release is blocked with the reason in place, not removed.",
  },
];

export function PreviewFrame() {
  const [stateId, setStateId] = useState("subject");
  const [density, setDensity] = useState<StageDensity>("standard");
  const state = STATES.find((item) => item.id === stateId) ?? STATES[0];

  return (
    <div className="demo-frame">
      <div className="demo-frame__chrome">
        <div className="demo-frame__live">
          <span className="demo-frame__dot" />
          <span className="demo-eyebrow">Live · real component</span>
        </div>
        <div className="demo-frame__densities">
          {DENSITIES.map((item) => (
            <button
              key={item}
              type="button"
              className="demo-density"
              aria-pressed={density === item}
              onClick={() => setDensity(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="demo-frame__body">
        <nav className="demo-rail" aria-label="States">
          <p className="demo-rail__heading">
            States <span>{STATES.length}</span>
          </p>
          {STATES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="demo-rail__item"
              aria-current={item.id === state.id ? "true" : undefined}
              onClick={() => setStateId(item.id)}
            >
              <span className="demo-rail__bullet" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="demo-frame__main">
          {/* key={state.id} remounts the stage on every switch, so one state's
              status line and control values never bleed into the next. */}
          <div
            key={state.id}
            className="demo-stage"
            role="region"
            aria-label="Live preview"
            tabIndex={0}
            data-zb-density={density}
          >
            <div className="demo-stage__inner">
              <HostChrome />
              <ContextMenuStage density={density} />
            </div>
          </div>

          <div className="demo-note">
            <p className="demo-eyebrow">Why this state exists</p>
            <p className="demo-note__text">{state.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
