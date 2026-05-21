/**
 * The Pillow Way — 4-step process cards on a dark band.
 *
 * Mirrors dauagency.com's "The dau Way" treatment: large numbered step
 * cards on a near-black surface, with each card showing a process phase
 * + short rationale. Reads as one of the homepage's quieter sections —
 * structure-driven, not flashy.
 */
const STEPS = [
  {
    title: "Industry Research",
    description:
      "We start with the market. Audience research, competitive landscape and category benchmarks ground every strategic decision in evidence — not opinion.",
  },
  {
    title: "Strategic Planning",
    description:
      "Insights become a tactical roadmap. Every brief is sized to your growth stage, mapped to business goals, and built with the right channel mix to deliver.",
  },
  {
    title: "Execution",
    description:
      "Brand, content, media and tech aligned under one timeline. Cross-functional teams ship with speed, precision and visibility at every step.",
  },
  {
    title: "Continuous Optimization",
    description:
      "From attribution to campaign performance, we measure, refine and scale what works. Growth isn't a moment — it's a cycle we keep tightening.",
  },
];

// Forced-dark band — independent of the page theme. Inline colors avoid
// any light-mode token override so this section always reads as the dau-
// style dark band against the lighter sections above and below it.
const DARK_BG = "#0A0612";
const CARD_BG = "rgba(255,255,255,0.04)";
const CARD_BG_HOVER = "rgba(255,255,255,0.07)";
const CARD_BORDER = "rgba(255,255,255,0.10)";

export default function ProcessSteps() {
  return (
    <section
      className="py-24 md:py-32 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: DARK_BG, color: "#FFFFFF" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-14 md:mb-16">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-purple mb-4">
            How We Work
          </p>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-800 leading-[0.95] tracking-[-0.02em] text-white">
            The <span className="text-sp-purple">Pillow</span> Way.
          </h2>
          <p
            className="font-body text-base md:text-lg mt-5 max-w-[540px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Growth isn&apos;t luck. It&apos;s built through systems we&apos;ve refined across
            200+ projects and 20+ industries.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="group relative flex flex-col gap-6 rounded-2xl border transition-colors duration-300 p-7 md:p-8 min-h-[280px] md:min-h-[320px] sp-process-card"
              style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
            >
              <p
                className="font-heading text-3xl md:text-4xl font-800 tabular-nums leading-none"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {String(i + 1).padStart(2, "0")}
                <span className="text-sp-purple">.</span>
              </p>

              <div>
                <h3 className="font-heading text-xl md:text-2xl font-800 leading-tight tracking-[-0.01em] text-white min-h-[2lh]">
                  {step.title}
                </h3>
                <p
                  className="font-body text-sm md:text-base mt-3 leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .sp-process-card:hover {
          background-color: ${CARD_BG_HOVER};
          border-color: rgba(164, 18, 226, 0.45);
        }
      `}</style>
    </section>
  );
}
