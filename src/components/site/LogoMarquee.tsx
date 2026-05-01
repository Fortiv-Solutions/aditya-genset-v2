const LOGOS = ["Reliance", "TATA", "L&T", "Adani", "JSW", "Mahindra", "Godrej", "Bajaj", "Wipro", "Birla"];

export function LogoMarquee() {
  return (
    <div className="overflow-hidden border-y border-border py-10">
      <div className="flex w-max animate-marquee gap-16 pr-16">
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <div
            key={i}
            className="font-display text-2xl font-semibold uppercase tracking-widest text-muted-foreground/70 transition-colors hover:text-foreground"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
