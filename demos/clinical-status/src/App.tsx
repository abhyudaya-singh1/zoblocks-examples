import { useState } from "react";
import {
  ClinicalStatus,
  StatusLegend,
  SCALES,
  STEP_COUNT,
  SCALE_NAMES,
  type ScaleName,
  type StatusAudience,
  type StatusStep,
} from "./components/zoblocks/clinical-status";

/* A small, deliberate slice of the vocabulary — every pair below exists in SCALES. */
const SHOWN_SCALES: ScaleName[] = ["criticality", "result-status", "access"];

const RESULTS = [
  { test: "Sodium", value: "139 mmol/L", step: "final" },
  { test: "Potassium", value: "6.8 mmol/L", step: "final" },
  { test: "TSH", value: "3.1 mIU/L", step: "preliminary" },
  { test: "HbA1c", value: "52 mmol/mol", step: "corrected" },
];

const HUE_SAMPLES: { scale: ScaleName; step: string }[] = [
  { scale: "criticality", step: "critical" },
  { scale: "criticality", step: "high" },
  { scale: "criticality", step: "normal" },
  { scale: "access", step: "restricted" },
  { scale: "result-status", step: "preliminary" },
];

const AUDIENCE_SAMPLES: { scale: ScaleName; step: string }[] = [
  { scale: "result-status", step: "entered-in-error" },
  { scale: "result-status", step: "preliminary" },
  { scale: "data-quality", step: "self-reported" },
  { scale: "access", step: "part-2" },
  { scale: "criticality", step: "critical" },
];

function Section({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-slate-700/60 py-10">
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{lead}</p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function App() {
  const [audience, setAudience] = useState<StatusAudience>("clinician");
  const [explained, setExplained] = useState<{
    step: StatusStep;
    scale: ScaleName;
  } | null>(null);

  return (
    <main className="min-h-screen bg-[#0d141b] px-6 text-slate-100">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="py-12">
          <h1 className="text-3xl font-semibold tracking-tight">ClinicalStatus</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            One closed vocabulary for every clinical status in a product. Each state carries a hue,
            a shape and a word together, so none of them has to be read by colour alone.{" "}
            {SCALE_NAMES.length} scales, {STEP_COUNT} steps, no free text.
          </p>
        </header>

        {/* 1. Vocabulary */}
        <Section
          title="One vocabulary"
          lead="Three of the nine scales are shown. Select any chip to see what the component knows about that step."
        >
          <div className="space-y-6">
            {SHOWN_SCALES.map((scale) => (
              <div key={scale}>
                <p className="mb-2 text-sm text-slate-400">{SCALES[scale].label}</p>
                <div className="flex flex-wrap gap-2">
                  {SCALES[scale].steps.map((s) => (
                    <ClinicalStatus
                      key={s.id}
                      scale={scale}
                      step={s.id}
                      onExplain={(step, sc) => setExplained({ step, scale: sc })}
                    />
                  ))}
                </div>
              </div>
            ))}

            <div
              aria-live="polite"
              className="min-h-[5.5rem] rounded-lg border border-slate-700/70 bg-[#111b24] p-4 text-sm"
            >
              {explained ? (
                <dl className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1">
                  <dt className="text-slate-500">Scale</dt>
                  <dd>{SCALES[explained.scale].label}</dd>
                  <dt className="text-slate-500">Clinician word</dt>
                  <dd>{explained.step.clinician}</dd>
                  <dt className="text-slate-500">Patient word</dt>
                  <dd>{explained.step.patient}</dd>
                  <dt className="text-slate-500">Tone / glyph</dt>
                  <dd>
                    {explained.step.tone} / {explained.step.glyph}
                  </dd>
                </dl>
              ) : (
                <p className="text-slate-500">
                  Nothing selected. This is the onExplain callback: the chip becomes a button only
                  when one is passed.
                </p>
              )}
            </div>
          </div>
        </Section>

        {/* 2. Presentations */}
        <Section
          title="Three presentations"
          lead="The same datum as a chip, a dot or an affix. The dot drops the word, so it only works beside a legend."
        >
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="mb-3 text-sm text-slate-400">Chip</p>
                <div className="flex flex-col items-start gap-3">
                  <ClinicalStatus scale="criticality" step="critical" />
                  <ClinicalStatus scale="criticality" step="critical" density="compact" />
                  <p className="text-xs text-slate-500">Default, then compact density.</p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm text-slate-400">Dot, with legend</p>
                <StatusLegend scale="criticality" />
              </div>

              <div>
                <p className="mb-3 text-sm text-slate-400">Affix, in a grid</p>
                <p className="text-xs leading-5 text-slate-500">
                  A thin rule and short code at the end of each row, shown to the right.
                </p>
              </div>
            </div>

            <table className="w-full max-w-xl text-sm">
              <caption className="sr-only">Results with affix status</caption>
              <tbody className="divide-y divide-slate-700/50">
                {RESULTS.map((r) => (
                  <tr key={r.test}>
                    <td className="py-2.5 pr-4 text-slate-200">{r.test}</td>
                    <td className="py-2.5 pr-4 tabular-nums text-slate-300">{r.value}</td>
                    <td className="py-2.5 text-right">
                      <ClinicalStatus scale="result-status" step={r.step} shape="affix" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 3. Audience */}
        <Section
          title="Two registers"
          lead="The same steps, worded for whoever is reading. “Entered in error” is a system word; a patient should see “Recorded by mistake”."
        >
          <div>
            <div
              role="group"
              aria-label="Audience"
              className="mb-5 inline-flex rounded-lg border border-slate-700 p-0.5 text-sm"
            >
              {(["clinician", "patient"] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={audience === a}
                  onClick={() => setAudience(a)}
                  className={`rounded-md px-4 py-1.5 capitalize transition-colors ${
                    audience === a
                      ? "bg-teal-300 text-slate-900"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {AUDIENCE_SAMPLES.map((s) => (
                <ClinicalStatus
                  key={`${s.scale}-${s.step}`}
                  scale={s.scale}
                  step={s.step}
                  audience={audience}
                />
              ))}
            </div>

            <div className="mt-6 text-sm text-slate-400">
              <p className="mb-2">
                With a qualifier, which is added to the screen-reader name rather than shown beside
                the chip:
              </p>
              <ClinicalStatus
                scale="result-status"
                step="preliminary"
                audience={audience}
                qualifier="resulted 41 minutes ago"
              />
            </div>
          </div>
        </Section>

        {/* 4. Hue removed */}
        <Section
          title="Colour removed"
          lead="Same chips, desaturated. Shape and word survive, which is what matters on a mono printer or for a reader with red-green colour deficiency."
        >
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm text-slate-400">In colour</p>
              <div className="flex flex-wrap gap-2">
                {HUE_SAMPLES.map((s) => (
                  <ClinicalStatus key={`c-${s.scale}-${s.step}`} scale={s.scale} step={s.step} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-400">Desaturated</p>
              <div className="flex flex-wrap gap-2 grayscale">
                {HUE_SAMPLES.map((s) => (
                  <ClinicalStatus key={`g-${s.scale}-${s.step}`} scale={s.scale} step={s.step} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <footer className="border-t border-slate-700/60 py-8 text-xs text-slate-500">
          An invalid scale and step pair throws at render time by design. There is no fallback
          status.
        </footer>
      </div>
    </main>
  );
}
