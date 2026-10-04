import { useId, useState } from "react";

const SECTIONS = [
  { key: "results", label: "Results" },
  { key: "trend", label: "Trend" },
  { key: "orders", label: "Orders" },
];

const WARDS = [
  { value: "acute", label: "Acute medical unit" },
  { value: "ward7", label: "Ward 7 — respiratory" },
  { value: "itu", label: "Intensive care" },
];

// Stand-ins for the controls an application puts around the menu. They are plain
// HTML elements, styled in host-chrome.css, with just enough state to respond.
export function HostChrome() {
  const noteId = useId();
  const wardId = useId();
  const [section, setSection] = useState("results");
  const [acknowledged, setAcknowledged] = useState(false);
  const [precautions, setPrecautions] = useState(true);
  const [seen, setSeen] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <nav className="demo-tabs" aria-label="Chart sections">
        {SECTIONS.map((item) => (
          <button
            key={item.key}
            type="button"
            className="demo-tab"
            aria-current={section === item.key ? "true" : undefined}
            onClick={() => setSection(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="demo-btn" onClick={() => setAcknowledged(true)}>
          {acknowledged ? "Acknowledged" : "Acknowledge result"}
        </button>
        <button type="button" className="demo-btn" data-variant="default">
          Order repeat
        </button>
        <button type="button" className="demo-btn" data-variant="text">
          Dismiss
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <span className="demo-field">
          <label className="demo-field__label" htmlFor={noteId}>
            Note
          </label>
          <input id={noteId} type="text" className="demo-field__input" placeholder="Add a note…" />
        </span>
        <span className="demo-field">
          <label className="demo-field__label" htmlFor={wardId}>
            Ward
          </label>
          <select id={wardId} className="demo-field__input demo-select" defaultValue="acute">
            {WARDS.map((ward) => (
              <option key={ward.value} value={ward.value}>
                {ward.label}
              </option>
            ))}
          </select>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span className="inline-flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={precautions}
            aria-label="Contact precautions"
            className="demo-switch"
            onClick={() => setPrecautions(!precautions)}
          >
            <span className="demo-switch__thumb" />
          </button>
          Contact precautions
        </span>
        <label className="demo-check">
          <input type="checkbox" checked={seen} onChange={(e) => setSeen(e.target.checked)} />
          <span>Seen by the responsible clinician</span>
        </label>
      </div>
    </div>
  );
}
