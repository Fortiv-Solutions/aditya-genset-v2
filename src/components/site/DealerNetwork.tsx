import { SectionReveal } from "./SectionReveal";
import dealerMap from "@/assets/brand/dealer-network.jpg";
import { MapPin } from "lucide-react";

const CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad", "Pune",
  "Ahmedabad", "Surat", "Kolkata", "Jaipur", "Lucknow", "Indore",
];

export function DealerNetwork() {
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-24 md:py-32">
      {/* Decorative blob */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-gradient opacity-20 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand-navy opacity-10 blur-3xl animate-float-slower" />

      <div className="container-x grid gap-16 md:grid-cols-2 md:items-center">
        <SectionReveal>
          <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Pan-India Presence</div>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl heading-underline">
            Our Dealer Network
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            From metros to remote industrial corridors — our authorized dealers and service partners keep you powered, everywhere in India.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {CITIES.map((c, i) => (
              <SectionReveal key={c} delay={i * 30}>
                <div className="flex items-center gap-2 rounded-sm border border-border bg-white px-3 py-2 text-sm transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:border-accent hover:shadow-md">
                  <MapPin size={14} className="text-accent" /> {c}
                </div>
              </SectionReveal>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={120}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-sm bg-amber-gradient opacity-30 blur-xl" />
            <div className="relative overflow-hidden rounded-sm border border-border bg-white p-4 shadow-xl">
              <img src={dealerMap} alt="Aditya dealer network across India" loading="lazy" className="w-full" />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
