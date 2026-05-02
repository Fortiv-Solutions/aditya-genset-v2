import { SectionReveal, StaggerReveal } from "./SectionReveal";
import { PackageSearch, Wrench, Activity, Truck } from "lucide-react";

const STEPS = [
  {
    icon: PackageSearch,
    title: "Procuring",
    desc: "High-quality raw materials sourced from trusted vendors.",
  },
  {
    icon: Wrench,
    title: "Assembling",
    desc: "Skilled engineering assembly with precision and care.",
  },
  {
    icon: Activity,
    title: "Testing",
    desc: "Rigorous load & performance testing to ensure reliability.",
  },
  {
    icon: Truck,
    title: "Delivering",
    desc: "Pan-India logistics + professional installation.",
  },
];

export function ManufacturingProcess() {
  return (
    <section className="relative flex min-h-screen snap-center flex-col justify-center bg-secondary/30 pt-16 md:pt-0">
      <div className="container-x">
        <SectionReveal className="text-center" variant="fadeUp">
          <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Workflow</div>
          <h2 className="mt-3 w-fit font-display text-4xl font-bold md:text-5xl heading-underline heading-underline-center mx-auto">
            Manufacturing Process
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Our 4-step workflow ensures every generator set meets stringent quality standards before it reaches your site.
          </p>
        </SectionReveal>

        <div className="mt-20 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <StaggerReveal
            className="grid gap-12 md:grid-cols-4 relative z-10"
            staggerMs={120}
            threshold={0.1}
          >
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center text-center group">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-foreground text-white shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-foreground">
                  <step.icon size={32} />
                  <div className="absolute -bottom-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-border text-xs font-bold text-muted-foreground group-hover:bg-brand-navy group-hover:text-white transition-colors duration-500">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
