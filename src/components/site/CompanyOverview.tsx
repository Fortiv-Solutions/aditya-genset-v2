import { SectionReveal } from "./SectionReveal";
import { CheckCircle2 } from "lucide-react";
import { CountUp } from "./CountUp";

export function CompanyOverview() {
  return (
    <section className="relative flex min-h-screen snap-center flex-col justify-center overflow-hidden bg-white pt-16 md:pt-0">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <SectionReveal variant="slideLeft">
            <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">About Us</div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl heading-underline">
              Company Overview
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Aditya Tech Mech is a leading manufacturer and supplier of silent diesel generator sets. 
              We engineer dependable power solutions tailored for India's demanding industrial and commercial environments.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { label: "Headquarters", value: "Silvassa" },
                { label: "Offices", value: "Surat, Gujarat" },
                { label: "Founder", value: "Murlidhar Nair" },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-accent pl-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold text-foreground">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="font-display text-sm font-bold uppercase tracking-widest text-foreground mb-4">
                Proudly Serving
              </div>
              <div className="flex flex-wrap gap-3">
                {["Private enterprises", "Government bodies", "Indian Railways", "Indian Army"].map((client) => (
                  <div key={client} className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium">
                    <CheckCircle2 size={16} className="text-accent" />
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Stats Grid */}
          <SectionReveal variant="slideRight" delay={150}>
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-brand-navy opacity-5 blur-3xl" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 1997, suffix: "", label: "Founded" },
                  { value: 25, suffix: "+", label: "Years Experience" },
                  { value: 14, suffix: "+", label: "Cities Served" },
                  { value: 100, suffix: "%", label: "Customer Satisfaction" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-sm border border-border bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                      <div className="h-16 w-16 rounded-full bg-accent blur-xl" />
                    </div>
                    <div className="num-display text-3xl font-bold text-foreground md:text-4xl">
                      <CountUp end={stat.value} suffix={stat.suffix} decimals={0} />
                    </div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
