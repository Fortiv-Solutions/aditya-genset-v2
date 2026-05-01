import { Link } from "react-router-dom";
import { SEO } from "@/components/site/SEO";

export default function Welcome() {
  return (
    <>
      <SEO title="Welcome — Adityagenset" description="Step into Adityagenset — silent power, since 1997." />
      <section className="-mt-16 flex min-h-screen items-center justify-center bg-foreground text-background">
        <div className="container-x text-center">
          <div className="mx-auto mb-10 flex items-center justify-center gap-3 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-display text-xs uppercase tracking-[0.4em] text-background/70">Adityagenset</span>
            <span className="h-2 w-2 rounded-full bg-accent" />
          </div>
          <h1 className="mx-auto max-w-3xl font-display text-5xl font-semibold leading-[1] md:text-7xl">
            <span className="block animate-fade-in" style={{ animationDelay: "150ms" }}>Silent Power.</span>
            <span className="block text-accent animate-fade-in" style={{ animationDelay: "400ms" }}>Engineered to last.</span>
            <span className="block animate-fade-in" style={{ animationDelay: "650ms" }}>Since 1997.</span>
          </h1>
          <div className="mt-12 animate-fade-in" style={{ animationDelay: "950ms" }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-sm bg-background px-8 py-3 text-sm font-medium text-foreground transition-transform duration-200 ease-brand hover:scale-[1.04]"
            >
              Enter site →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
