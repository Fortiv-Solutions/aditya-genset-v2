# Adityagenset — Animated Product Presentation (Frontend)

A premium, animated 5-page site centered on a scroll-driven story for the **62.5 kVA Silent DG Set**, plus interactive **hotspot dots** on the product image that reveal part-level specs (Lorenzo-style). Frontend only, content is static, CTAs trigger toasts.

## Design System

- **Palette:** background `#FAFAF7`, foreground `#0E0E0E`, accent `#E1261C`, warm muted gray.
- **Type:** Space Grotesk (display, big numerals) + Inter (body), strong weight contrast.
- **Surfaces:** generous whitespace, hairline 1px dividers, near-zero shadow, 4px corner radius.
- **Motion vocabulary:** fade-up reveals, image cross-fade with subtle scale, count-up numerals, animated link underlines, hover-lift cards, logo marquee, route fade.
- **Easing standard:** `cubic-bezier(0.22, 1, 0.36, 1)`; reveals 600–800ms; cross-fade 400ms; hover scale 1.03 in 200ms.
- **Accessibility:** full `prefers-reduced-motion` support — disable parallax, count-up loops, marquee; keep simple fades.

## Routes & Pages

```text
/                      Home
/welcome               Cinematic brand intro
/products              Catalog (1 active + 35 coming-soon)
/products/silent-62-5  Showcase — split-screen scroll story + hotspots
/about                 Story, timeline, ISO badge, values
```

Shared chrome: sticky navbar (transparent → solid on scroll), footer with contact, floating WhatsApp FAB, fade transition between routes.

### Home `/`
Full-bleed factory hero with parallax + headline "Silent Power. Since 1997.", two CTAs. Stat strip with count-up (27+ years · ISO 9001:2015 · 15–500 kVA · pan-India). Featured showcase card. "Why Adityagenset" 3-up. Monochrome client logo marquee. CTA band.

### Welcome `/welcome`
One-screen cinematic: animated brand mark, line-by-line tagline reveal, "Enter site" button → `/`.

### Products `/products`
Filter chips (All / 15–62.5 / 75–200 / 250–500 kVA). Responsive grid of 36 cards, staggered fade-up on scroll.
- **Active (62.5 kVA):** full color, hover-lift + image zoom, "View story →".
- **Coming soon (35):** desaturated, ribbon, click disabled.

### Showcase `/products/silent-62-5` — centerpiece
Split-screen scrollytelling. Left = sticky cross-fading visual stack. Right = 5 spec sections, each ~1 viewport tall.

```text
+----------------------------+----------------------------+
|                            |  01 / Overview             |
|   [ sticky product image ] |  02 / Engine               |
|   cross-fades on scroll    |  03 / Power output         |
|   + hotspot dots overlay   |  04 / Sound & Enclosure    |
|                            |  05 / Dimensions & Weight  |
+----------------------------+----------------------------+
```

- IntersectionObserver tracks the active section and swaps the sticky image (opacity + 1.02→1 scale, 400ms).
- Vertical 5-dot **progress rail** on the left edge; active dot in accent red; click to jump.
- Section reveals: heading slide-up, spec rows stagger-fade, numerals count-up (once).
- Sticky bottom CTA bar at end: "Request a Quote" + "Download Spec Sheet" (toast).
- **Mobile:** split collapses; image pins above each section, same cross-fade triggers.

**Hotspots feature (Lorenzo-style):** On the Overview image, animated pulsing dots sit on key parts (engine, alternator, control panel, enclosure vent, fuel tank). Click/tap a dot → an elegant info card pops out (fade + slide) showing that part's name, a short description, and 2–3 spec rows. Only one open at a time; click outside or the X to close. Dots have a subtle ping animation; keyboard accessible (focusable, Enter/Esc).

### About `/about`
Founder story (Shri Murlidhar Nair), since-1997 timeline, ISO 9001:2015 badge, values grid, manufacturing photos.

## Showcase Content (62.5 kVA — typical values, flagged for review)

- **Engine:** 4-cyl turbocharged diesel, ~3.9 L, water-cooled.
- **Power:** 62.5 kVA / 50 kW, 415 V, 50 Hz, 3-phase, PF 0.8.
- **Sound:** 75 dB(A) @ 1m, CPCB IV+ enclosure, 1.6 mm CRCA + PU foam.
- **Dimensions:** 2400 × 1050 × 1550 mm, dry ~1250 kg / wet ~1450 kg.
- **Hotspots:** Engine block · Alternator · Control panel · Acoustic enclosure · Fuel tank.

## Component Inventory

```text
src/components/site/
  Navbar.tsx              sticky transparent → solid
  Footer.tsx
  WhatsAppFab.tsx
  RouteFade.tsx           page-level fade transition
  Hero.tsx                home hero with parallax
  StatStrip.tsx           4 stats with count-up
  LogoMarquee.tsx
  ProductCard.tsx         active + coming-soon variants
  SectionReveal.tsx       IntersectionObserver wrapper
  CountUp.tsx             rAF count-up
  ScrollStory.tsx         split-screen orchestrator
  ScrollStorySection.tsx
  StickyImageStack.tsx    cross-fade image stack
  ProgressRail.tsx        5-dot vertical rail
  Hotspots.tsx            dots overlay + popover card
  hooks/useInView.ts
  hooks/useReducedMotion.ts

src/pages/
  Home.tsx · Welcome.tsx · Products.tsx · ProductDetail.tsx · About.tsx

src/data/products.ts      36 entries; showcase has full specs, 5 images, hotspot coords
src/assets/               AI-generated studio renders (placeholders)
```

## Data Model

```ts
type ProductStatus = 'active' | 'coming_soon';

interface ProductSummary {
  slug: string; name: string; kva: number;
  range: '15-62.5' | '75-200' | '250-500';
  status: ProductStatus; thumbnail: string;
}

interface ShowcaseSection {
  id: string; number: string; title: string; tagline?: string;
  image: string;
  specs: { label: string; value: string }[];
  highlight?: { value: number; suffix?: string; label: string }[];
}

interface Hotspot {
  id: string; x: number; y: number;   // % coords on overview image
  title: string; description: string;
  specs: { label: string; value: string }[];
}

interface ShowcaseProduct extends ProductSummary {
  status: 'active'; hero: string;
  sections: ShowcaseSection[];
  hotspots: Hotspot[];
}
```

## Tech Approach

- React 18 + Vite + TS + Tailwind + shadcn (already in repo).
- React Router for 5 routes; design tokens added to `index.css` + `tailwind.config.ts`.
- Hand-rolled `useInView` (IntersectionObserver) — no heavy scroll libs.
- CSS transitions over JS animations where possible; lazy-load non-active showcase images.
- Toasts via existing sonner for all CTAs.
- Google Fonts loaded in `index.html`.
- SEO: per-route `<title>`/meta, single `<h1>`, alt text, JSON-LD Product schema on showcase.

## Out of Scope (this phase)

Backend, lead capture, email, admin/CMS, payments, multilingual, real photography, scroll stories for the other 35 products (template ready, content later).

## Phased Delivery

- **Phase 1 (this build):** Design system, 5 pages, scroll story for 62.5 kVA, hotspot interaction, 36-card catalog, all animations, reduced-motion support.
- **Phase 2:** Real images + verified specs, content for remaining 35 products.
- **Phase 3:** Backend — lead form, email, admin.
