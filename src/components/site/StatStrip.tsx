import { CountUp } from "./CountUp";
import { SectionReveal, StaggerReveal } from "./SectionReveal";

const stats = [
  { value: 27, suffix: "+", label: "Years of trust" },
  { value: 500, suffix: " kVA", label: "Up to" },
  { value: 36, suffix: "+", label: "Models in catalog" },
];

export function StatStrip() {
  return (
    <SectionReveal className="relative -mt-12 z-10" variant="scaleUp">
      <div className="container-x">
        <StaggerReveal
          className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-border shadow-2xl md:grid-cols-3"
          staggerMs={80}
          threshold={0.1}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-start gap-2 bg-white p-6 md:p-8 transition-colors hover:bg-secondary/40"
            >
              <div className="num-display text-2xl font-bold text-foreground md:text-3xl">
                <CountUp end={s.value} suffix={s.suffix} decimals={0} />
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground md:text-xs">
                {s.label}
              </div>
              <div className="h-0.5 w-8 bg-amber-gradient" />
            </div>
          ))}
        </StaggerReveal>
      </div>
    </SectionReveal>
  );
}
