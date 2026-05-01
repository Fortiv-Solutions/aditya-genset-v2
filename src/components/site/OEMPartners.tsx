import { SectionReveal } from "./SectionReveal";

const PARTNERS = [
  { name: "Escorts Kubota", tag: "Engine Partner" },
  { name: "Baudouin", tag: "Engine Partner" },
  { name: "Stamford", tag: "Alternator" },
  { name: "Leroy Somer", tag: "Alternator" },
  { name: "Deepsea", tag: "Controller" },
  { name: "ComAp", tag: "Controller" },
];

export function OEMPartners() {
  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionReveal className="text-center">
          <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Built With The Best</div>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl heading-underline inline-block">
            Our OEM Partners
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            We engineer with world-class OEMs to deliver dependable, certified power.
          </p>
        </SectionReveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((p, i) => (
            <SectionReveal key={p.name} delay={i * 80}>
              <div className="group relative aspect-[3/2] overflow-hidden rounded-sm border border-border bg-secondary/40 p-4 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-accent hover:bg-white hover:shadow-lg">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 to-transparent transition-transform duration-700 ease-brand group-hover:translate-x-full" />
                <div className="relative flex h-full flex-col items-center justify-center text-center">
                  <div className="font-display text-base font-bold text-foreground md:text-lg">{p.name}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{p.tag}</div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
