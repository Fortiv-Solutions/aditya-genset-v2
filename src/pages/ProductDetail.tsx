import { Link, useParams } from "react-router-dom";
import { SEO } from "@/components/site/SEO";
import { SHOWCASE } from "@/data/products";
import { ScrollStory } from "@/components/site/ScrollStory";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ArrowLeft, Download, Mail } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams();
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowCta(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (slug !== SHOWCASE.slug) {
    return (
      <section className="container-x py-32 text-center">
        <SEO title="Coming soon — Adityagenset" />
        <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Coming soon</div>
        <h1 className="mt-3 font-display text-5xl font-semibold">This story is on its way.</h1>
        <p className="mt-4 text-muted-foreground">Verified specs and imagery for this product are being prepared.</p>
        <Link to="/products" className="mt-8 inline-flex items-center gap-2 story-link">
          <ArrowLeft size={14} /> Back to catalog
        </Link>
      </section>
    );
  }

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: SHOWCASE.name,
    brand: { "@type": "Brand", name: "Adityagenset" },
    description: "62.5 kVA silent diesel generator set, CPCB IV+ compliant, 75 dB(A) at 1m.",
    category: "Diesel generator set",
  };

  return (
    <>
      <SEO title={`${SHOWCASE.name} — Adityagenset`} description="Explore the 62.5 kVA Silent DG Set: engine, power, sound, dimensions — a guided scroll story." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="container-x pt-12 pb-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground story-link">
          <ArrowLeft size={12} /> All products
        </Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Showcase</div>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-none md:text-6xl">{SHOWCASE.name}</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">A 5-chapter walkthrough — scroll to explore each system.</p>
          </div>
          <div className="font-display text-sm uppercase tracking-widest text-muted-foreground">
            06 chapters · 1 product
          </div>
        </div>
      </section>

      <ScrollStory product={SHOWCASE} />


    </>
  );
}
