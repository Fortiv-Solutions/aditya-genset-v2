import { Link } from "react-router-dom";
import { SectionReveal } from "./SectionReveal";
import { ArrowRight } from "lucide-react";
import dgImg from "@/assets/brand/dg-real-1.png";
import containerImg from "@/assets/brand/container.png";
import nonStandard from "@/assets/brand/non-standard.jpeg";

const CATEGORIES = [
  {
    title: "Diesel Generators",
    desc: "Silent DG sets from 15 to 500 kVA. CPCB IV+ compliant.",
    image: dgImg,
    href: "/products",
    badge: "36+ Models",
  },
  {
    title: "Non-Standard Containers",
    desc: "Custom acoustic enclosures and weather-proof container builds.",
    image: containerImg,
    href: "/products",
    badge: "Custom Build",
  },
  {
    title: "Containerized DG Sets",
    desc: "Plug-and-play containerized power for sites and projects.",
    image: nonStandard,
    href: "/products",
    badge: "Project Power",
  },
];

export function ProductCategories() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="container-x">
        <SectionReveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Our Products</div>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl heading-underline">
                Power, in every form factor.
              </h2>
            </div>
            <Link to="/products" className="hidden text-sm font-semibold text-accent hover:underline md:inline-flex items-center gap-1">
              View all products <ArrowRight size={14} />
            </Link>
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <SectionReveal key={c.title} delay={i * 120}>
              <Link
                to={c.href}
                className="group relative block h-full overflow-hidden rounded-sm border border-border bg-secondary/30 transition-all duration-500 ease-brand hover:-translate-y-2 hover:border-accent hover:shadow-2xl"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-white">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-contain p-6 transition-transform duration-700 ease-brand group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 rounded-sm bg-amber-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">
                    {c.badge}
                  </div>
                </div>
                <div className="border-t border-border bg-white p-6">
                  <h3 className="font-display text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    View Products
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
