import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import factoryHero from "@/assets/brand/factory-hero.jpg";
import dgRealistic from "@/assets/brand/dg-realistic.png";
import { SEO } from "@/components/site/SEO";
import { StatStrip } from "@/components/site/StatStrip";
import { SectionReveal } from "@/components/site/SectionReveal";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductCategories } from "@/components/site/ProductCategories";
import { TrustGainers } from "@/components/site/TrustGainers";
import { DealerNetwork } from "@/components/site/DealerNetwork";
import { OEMPartners } from "@/components/site/OEMPartners";
import { HappyCustomers } from "@/components/site/HappyCustomers";
import { SHOWCASE } from "@/data/products";
import { ArrowRight, Play, Zap } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { wordStagger, fadeUp } from "@/lib/animations";

export default function Home() {
  const reduced = useReducedMotion();
  const [y, setY] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <>
      <SEO
        title="Get Your Silent Diesel Generators Today | Aditya — ISO Certified"
        description="ISO 9001:2015 certified manufacturer of silent diesel generator sets, 15–500 kVA. Pan-India delivery. Trusted since 1997."
      />

      {/* HERO — split layout, parallax bg, floating elements */}
      <section className="relative -mt-[88px] min-h-screen overflow-hidden bg-hero-gradient pt-[88px]">
        {/* Background image with parallax + dim */}
        <div
          className="absolute inset-0"
          style={{ transform: `translate3d(0, ${y * 0.3}px, 0)`, willChange: "transform" }}
        >
          <img
            src={factoryHero}
            alt="Aditya manufacturing facility"
            className="h-[120%] w-full object-cover opacity-40"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-deep/70 via-brand-navy/60 to-brand-navy-deep/95" />
        </div>

        {/* Floating decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-[100px] animate-float-slow mix-blend-screen" />
          <div className="absolute top-1/2 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px] animate-float-slower mix-blend-screen" />
          <div className="absolute bottom-20 left-1/4 h-72 w-72 rounded-full bg-white/5 blur-[100px] animate-float-slow" />
        </div>

        {/* Hero grid */}
        <div className="container-x relative z-10 grid min-h-[calc(100vh-88px)] gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          {/* Left content */}
          <div className="flex flex-col items-start gap-8 text-white">
            <SectionReveal delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Since 1997
              </div>
            </SectionReveal>

            <SectionReveal delay={150}>
              <motion.h1 
                className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-balance md:text-5xl lg:text-6xl xl:text-7xl"
                variants={wordStagger}
                initial="hidden"
                animate="visible"
              >
                <motion.span className="block" variants={fadeUp}>Silent Power.</motion.span>
                <motion.span className="block" variants={fadeUp}>
                  Built to <span className="text-accent">Endure.</span>
                </motion.span>
              </motion.h1>
            </SectionReveal>

            <SectionReveal delay={300}>
              <p className="max-w-xl text-base text-white/80 md:text-lg">
                Premium silent diesel generator sets from <strong className="text-accent">15 to 500 kVA</strong>. Engineered with Escorts-Kubota and Baudouin, delivered across India.
              </p>
            </SectionReveal>

            <SectionReveal delay={450}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/products/silent-62-5"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-all duration-500 ease-brand hover:bg-white hover:text-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <Play size={14} className="fill-current transition-transform duration-300 group-hover:scale-110" /> 
                  <span className="relative z-10">Watch the Showcase</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </Link>
              </div>
            </SectionReveal>

            {/* Mini stats */}
            <SectionReveal delay={600} className="w-full">
              <div className="grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-8">
                {[
                  { v: "27+", l: "Years" },
                  { v: "500", l: "kVA Max" },
                  { v: "Pan-India", l: "Reach" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="num-display text-xl font-bold text-accent md:text-2xl">{s.v}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-white/60">{s.l}</div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Right floating product card */}
          <div className="relative hidden lg:block">
            <SectionReveal delay={300}>
              <motion.div
                className="relative"
                style={{ transform: `translate3d(0, ${-y * 0.08}px, 0)` }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <div className="absolute -inset-8 rounded-full bg-amber-gradient opacity-40 blur-3xl animate-float-slow" />
                {/* Rotating ring */}
                <div className="absolute inset-0 -m-8 animate-spin-slow opacity-30">
                  <div className="h-full w-full rounded-full border-2 border-dashed border-accent" />
                </div>
                <motion.div 
                  className="relative rounded-sm bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(255,176,0,0.2)] hover:border-accent/30 group/card"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <div className="absolute -top-3 left-6 rounded-sm bg-amber-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground shadow-lg transition-transform duration-300 group-hover/card:-translate-y-1">
                    Featured · 62.5 kVA
                  </div>
                  <div className="mx-auto h-72 w-full overflow-hidden rounded-sm transition-transform duration-700 group-hover/card:scale-[1.02]">
                    <img 
                      src={dgRealistic} 
                      alt="62.5 kVA Silent Diesel Generator" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/20 pt-6 text-white">
                    <Stat v="62.5" l="kVA" />
                    <Stat v="75" l="dB(A)" />
                    <Stat v="CPCB IV+" l="Compliant" small />
                  </div>
                  <Link
                    to="/products/silent-62-5"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 ease-brand hover:bg-accent/90 hover:shadow-lg active:scale-[0.98] group"
                  >
                    Explore Specs <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </SectionReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block">
          <SectionReveal delay={800}>
            <div className="flex flex-col items-center gap-2 text-white/60">
              <div className="text-[10px] uppercase tracking-[0.3em]">Scroll</div>
              <div className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
            </div>
          </SectionReveal>
        </div>
      </section>

      <StatStrip />

      <ProductCategories />

      {/* Featured 62.5 showcase teaser */}
      <section className="relative overflow-hidden bg-secondary/30 py-24 md:py-32">
        <div className="container-x">
          <SectionReveal>
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">In The Spotlight</div>
                <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold md:text-4xl heading-underline">
                  62.5 kVA Silent DG Set — explored, in detail.
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  A scroll-driven walkthrough of every system: engine, alternator, sound enclosure and more.
                </p>
              </div>
              <Link
                to="/products/silent-62-5"
                className="inline-flex items-center gap-2 self-start rounded-sm bg-foreground px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-brand hover:scale-[1.03] hover:bg-brand-navy-deep md:self-auto"
              >
                Open the showcase <ArrowRight size={14} />
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal delay={120}>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <ProductCard product={{ ...SHOWCASE, status: "active" }} />
              </div>
              <div className="space-y-4">
                {[
                  { icon: Zap, title: "Tight load response", body: "Turbocharged engine with electronic governor." },
                  { icon: Zap, title: "Whisper-quiet 75 dB(A)", body: "PU-foam acoustic enclosure, CPCB IV+ certified." },
                  { icon: Zap, title: "Smart controller", body: "Backlit LCD with Modbus / RS-485 readiness." },
                ].map((f) => (
                  <div key={f.title} className="group/feature rounded-sm border border-border bg-white p-5 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-accent hover:shadow-xl">
                    <f.icon size={20} className="text-accent transition-transform duration-300 group-hover/feature:scale-110" />
                    <div className="mt-3 font-display text-sm font-bold">{f.title}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <TrustGainers />

      <DealerNetwork />

      <OEMPartners />

      <HappyCustomers />
    </>
  );
}

function Stat({ v, l, small }: { v: string; l: string; small?: boolean }) {
  return (
    <div>
      <div className={`num-display font-bold text-white ${small ? "text-sm" : "text-lg"}`}>{v}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-widest text-white/70">{l}</div>
    </div>
  );
}
