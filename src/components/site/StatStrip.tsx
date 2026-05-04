import { SectionReveal, StaggerReveal } from "./SectionReveal";
import { EditableText } from "@/components/cms/EditableText";
import { useCMSState } from "@/components/cms/CMSEditorProvider";

const STAT_KEYS = [
  { valueKey: "stat1Value", labelKey: "stat1Label" },
  { valueKey: "stat2Value", labelKey: "stat2Label" },
  { valueKey: "stat3Value", labelKey: "stat3Label" },
] as const;

export function StatStrip() {
  return (
    <SectionReveal className="relative -mt-12 z-10" variant="scaleUp">
      <div className="container-x">
        <StaggerReveal
          className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-border shadow-2xl md:grid-cols-3"
          staggerMs={80}
          threshold={0.1}
        >
          {STAT_KEYS.map((s) => (
            <div
              key={s.valueKey}
              className="flex flex-col items-start gap-2 bg-white p-6 md:p-8 transition-colors hover:bg-secondary/40"
            >
              <div className="num-display text-2xl font-bold text-foreground md:text-3xl">
                <EditableText section="statStrip" contentKey={s.valueKey} />
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground md:text-xs">
                <EditableText section="statStrip" contentKey={s.labelKey} />
              </div>
              <div className="h-0.5 w-8 bg-amber-gradient" />
            </div>
          ))}
        </StaggerReveal>
      </div>
    </SectionReveal>
  );
}
