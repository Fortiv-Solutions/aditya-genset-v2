import { cn } from "@/lib/utils";
import type { ShowcaseSection } from "@/data/products";

interface Props {
  sections: ShowcaseSection[];
  active: number;
}

export function StickyImageStack({ sections, active }: Props) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-sm">
      {sections.map((s, i) => (
        <img
          key={s.id}
          src={s.image}
          alt={s.alt}
          loading={i === 0 ? "eager" : "lazy"}
          className={cn(
            "absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-brand",
            i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]",
          )}
        />
      ))}
    </div>
  );
}
