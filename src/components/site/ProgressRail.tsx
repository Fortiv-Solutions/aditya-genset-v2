import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  count: number;
  active: number;
  labels?: string[];
  onJump?: (i: number) => void;
}

export function ProgressRail({ count, active, labels, onJump }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className={cn("hidden lg:flex flex-col gap-5", mounted ? "opacity-100" : "opacity-0", "transition-opacity duration-500")}>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            onClick={() => onJump?.(i)}
            aria-label={labels?.[i] ?? `Section ${i + 1}`}
            className="group flex items-center gap-3"
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full border transition-all duration-500 ease-brand",
                isActive ? "bg-accent border-accent scale-125" : "bg-transparent border-foreground/40 group-hover:border-foreground",
              )}
            />
            <span
              className={cn(
                "font-display text-xs uppercase tracking-widest transition-all duration-500 ease-brand",
                isActive ? "text-foreground opacity-100" : "text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0",
              )}
            >
              {labels?.[i] ?? String(i + 1).padStart(2, "0")}
            </span>
          </button>
        );
      })}
    </div>
  );
}
