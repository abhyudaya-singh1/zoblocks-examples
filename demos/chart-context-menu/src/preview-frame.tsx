import { useState } from "react";
import { ContextMenuStage, type StageDensity } from "./context-menu-stage";
import { HostChrome } from "./host-chrome";

const DENSITIES: StageDensity[] = ["patient", "standard", "clinical"];

export function PreviewFrame() {
  const [density, setDensity] = useState<StageDensity>("standard");

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
        <div className="demo-frame__main">
          <div
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
        </div>
      </div>
    </div>
  );
}
