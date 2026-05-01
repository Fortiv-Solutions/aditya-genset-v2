import { SectionReveal } from "./SectionReveal";

const CLIENTS = [
  "Indian Railways", "Indian Army", "Amazon", "Avadh Builders",
  "Reliance", "TATA", "L&T", "Adani", "JSW", "Mahindra",
  "Godrej", "Bajaj", "Wipro", "Birla", "ONGC", "BHEL",
];

export function HappyCustomers() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container-x">
        <SectionReveal className="text-center">
          <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Trusted By</div>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl heading-underline inline-block">
            Our Happy Customers
          </h2>
        </SectionReveal>
      </div>

      {/* Marquee */}
      <div className="mt-14 overflow-hidden border-y border-border bg-secondary/30 py-8">
        <div className="flex w-max animate-marquee gap-12 pr-12">
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <div
              key={i}
              className="font-display text-xl font-bold uppercase tracking-wider text-foreground/60 transition-colors hover:text-accent whitespace-nowrap"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
