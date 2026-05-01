import { SectionReveal } from "./SectionReveal";
import { Award, Sparkles, HeartHandshake } from "lucide-react";

const ITEMS = [
  { icon: Award, title: "Value for Money", body: "Engineered for total cost of ownership — not just sticker price." },
  { icon: Sparkles, title: "Excellence in Service", body: "Direct factory support, rapid response, and lifetime relationships." },
  { icon: HeartHandshake, title: "100% Satisfaction", body: "Trusted by Indian Railways, Indian Army, Amazon and 500+ enterprises." },
];

export function TrustGainers() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-accent blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-white blur-3xl animate-float-slower" />
      </div>

      <div className="container-x relative">
        <SectionReveal className="text-center">
          <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Why Choose Us</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            We Are The <span className="text-accent">Trust Gainers</span>
          </h2>
        </SectionReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {ITEMS.map((it, i) => (
            <SectionReveal key={it.title} delay={i * 120}>
              <div className="group relative h-full overflow-hidden rounded-sm border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 ease-brand hover:-translate-y-2 hover:border-accent/60 hover:bg-white/10">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-sm bg-amber-gradient text-foreground transition-transform duration-500 ease-brand group-hover:rotate-6 group-hover:scale-110">
                  <it.icon size={26} strokeWidth={2} />
                </div>
                <h3 className="font-display text-xl font-bold">{it.title}</h3>
                <p className="mt-3 text-sm text-white/80">{it.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
