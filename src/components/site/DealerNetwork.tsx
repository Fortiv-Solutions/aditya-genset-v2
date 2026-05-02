import { SectionReveal, StaggerReveal } from "./SectionReveal";
import dealerMap from "@/assets/brand/dealer-network.jpg";
import { MapPin } from "lucide-react";

const CITIES = [
  "Silvassa (HQ)", "Surat", "Vadodara", "Vapi",
  "Rajkot", "Bhavnagar", "Jamnagar", "Gandhidham",
  "Mehsana", "Jaipur", "Jodhpur", "Udaipur",
  "Kota", "Alwar", "Ajmer"
];

export function DealerNetwork() {
  return (
    <section className="relative flex min-h-screen snap-center flex-col justify-center overflow-hidden bg-white pt-16 md:pt-0">
      <div className="container-x grid gap-16 md:grid-cols-2 md:items-center">
        {/* Left — text + cities */}
        <SectionReveal variant="slideLeft">
          <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Pan-India Presence</div>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl heading-underline">
            Service Locations
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            From metros to remote industrial corridors — our authorized dealers and service partners keep you powered, everywhere in India.
          </p>

          <StaggerReveal
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3"
            staggerMs={30}
            threshold={0.04}
          >
            {CITIES.map((c) => (
              <div
                key={c}
                className="flex items-center gap-2 rounded-sm border border-border bg-secondary/50 px-3 py-2 text-sm transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <MapPin size={14} className="text-accent shrink-0" /> {c}
              </div>
            ))}
          </StaggerReveal>
        </SectionReveal>

        {/* Right — map image */}
        <SectionReveal variant="slideRight" delay={100}>
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
