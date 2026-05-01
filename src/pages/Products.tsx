import { useMemo, useState } from "react";
import { SEO } from "@/components/site/SEO";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionReveal } from "@/components/site/SectionReveal";
import { PRODUCTS, type KvaRange } from "@/data/products";
import { cn } from "@/lib/utils";

const FILTERS: { id: "all" | KvaRange; label: string }[] = [
  { id: "all", label: "All" },
  { id: "15-62.5", label: "15–62.5 kVA" },
  { id: "75-200", label: "75–200 kVA" },
  { id: "250-500", label: "250–500 kVA" },
];

export default function Products() {
  const [filter, setFilter] = useState<typeof FILTERS[number]["id"]>("all");
  const list = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.range === filter)),
    [filter],
  );

  return (
    <>
      <SEO title="Products — Adityagenset" description="Browse our full catalog of silent diesel generator sets, 15 to 500 kVA." />

      <section className="container-x py-20 md:py-28">
        <SectionReveal>
          <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Catalog</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold leading-[1] md:text-6xl text-balance">
            Silent DG sets. One quietly impressive lineup.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Our 62.5 kVA model is fully detailed today.
          </p>
        </SectionReveal>

        <SectionReveal delay={120}>
          <div className="mt-12 flex flex-wrap gap-2 border-b border-border pb-6">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-sm border px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all duration-300 ease-brand",
                  filter === f.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <SectionReveal key={p.slug} delay={Math.min(i * 40, 400)}>
              <ProductCard product={p} />
            </SectionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
