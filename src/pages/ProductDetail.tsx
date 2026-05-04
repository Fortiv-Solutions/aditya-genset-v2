import { Link, useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/site/SEO";
import { SHOWCASE, EKL15_SHOWCASE } from "@/data/products";
import { ScrollStory } from "@/components/site/ScrollStory";
import { ArrowLeft, Monitor } from "lucide-react";
import { useRef } from "react";
import { EditableText } from "@/components/cms/EditableText";
import { useCMSState } from "@/components/cms/CMSEditorProvider";

// Map of slug → showcase data
const SHOWCASES = {
  [SHOWCASE.slug]: SHOWCASE,
  [EKL15_SHOWCASE.slug]: EKL15_SHOWCASE,
};

export default function ProductDetail() {
  const { slug, pageId } = useParams();
  const navigate = useNavigate();
  const scrollStoryRef = useRef<{ enterPresentMode: () => void }>(null);
  const { content } = useCMSState();

  const isCMSPreview = !!pageId?.startsWith("showcaseData") || !!pageId?.startsWith("ekl15ShowcaseData");
  const sectionId = isCMSPreview ? pageId : (slug === EKL15_SHOWCASE.slug ? "ekl15ShowcaseData" : "showcaseData");

  // Find matching showcase
  const product = slug ? SHOWCASES[slug] : undefined;

  if (!isCMSPreview && !product) {
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

  const activeProduct = product || SHOWCASE;

  // Ensure type-safety for the section
  const sectionKey = sectionId as "showcaseData" | "ekl15ShowcaseData";
  const productName = content?.[sectionKey]?.productName || activeProduct.name;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    brand: { "@type": "Brand", name: "Adityagenset" },
    description: `${activeProduct.kva} kVA silent diesel generator set, CPCB IV+ compliant.`,
    category: "Diesel generator set",
  };

  return (
    <>
      <SEO title={`${productName} — Adityagenset`} description={`Explore the ${activeProduct.kva} kVA Silent DG Set: engine, power, sound, dimensions — a guided scroll story.`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="container-x pt-12 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground story-link"
        >
          <ArrowLeft size={12} /> Back to category
        </button>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <EditableText
              section={sectionKey}
              contentKey="pageLabel"
              className="font-display text-xs uppercase tracking-[0.3em] text-accent block"
              as="div"
            />
            <EditableText
              section={sectionKey}
              contentKey="productName"
              className="mt-3 font-display text-5xl font-semibold leading-none md:text-6xl block"
              as="h1"
            />
            <EditableText
              section={sectionKey}
              contentKey="pageSubtitle"
              className="mt-3 max-w-xl text-muted-foreground block"
              as="p"
            />
          </div>

          <button
            onClick={() => scrollStoryRef.current?.enterPresentMode()}
            className="cms-clickable inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-navy-deep hover:scale-[1.03] hover:shadow-lg active:scale-95 self-end"
          >
            <Monitor size={16} className="shrink-0" />
            <EditableText section={sectionKey} contentKey="presentModeBtn" as="span" />
          </button>
        </div>
      </section>

      <ScrollStory ref={scrollStoryRef} product={activeProduct} sectionId={sectionKey} />
    </>
  );
}
