import dgOverview from "@/assets/brand/dg-real-1.png";
import dgEngine from "@/assets/brand/engine-baudouin.jpg";
import dgAlternator from "@/assets/dg-alternator.jpg";
import dgEnclosure from "@/assets/brand/dg-product.jpg";
import dgDimensions from "@/assets/genset-hero-CdfwbH8a.jpg";
import dgThumb from "@/assets/brand/dg-product.jpg";
import dgControl from "@/assets/brand/control-panel.jpg";
import dgFuel from "@/assets/brand/fuel-tank.jpg";

export type ProductStatus = "active" | "coming_soon";
export type KvaRange = "15-62.5" | "75-200" | "250-500";

export interface ProductSummary {
  slug: string;
  name: string;
  kva: number;
  range: KvaRange;
  status: ProductStatus;
  thumbnail: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface ShowcaseSection {
  id: string;
  number: string;
  title: string;
  tagline?: string;
  image: string;
  alt: string;
  specs: SpecRow[];
  highlight?: { value: number; suffix?: string; label: string }[];
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  specs: SpecRow[];
}

export interface ShowcaseProduct extends ProductSummary {
  status: "active";
  hero: string;
  sections: ShowcaseSection[];
  hotspots: Hotspot[];
}

export const SHOWCASE: ShowcaseProduct = {
  slug: "silent-62-5",
  name: "62.5 kVA Silent DG Set",
  kva: 62.5,
  range: "15-62.5",
  status: "active",
  thumbnail: dgOverview,
  hero: dgOverview,
  hotspots: [
    {
      id: "engine",
      x: 42, y: 55,
      title: "Turbocharged Engine",
      description: "4-cylinder water-cooled diesel engine with electronic governor for tight load response.",
      specs: [
        { label: "Cylinders", value: "4 inline" },
        { label: "Displacement", value: "~3.9 L" },
        { label: "Cooling", value: "Water-cooled" },
      ],
    },
    {
      id: "alternator",
      x: 25, y: 48,
      title: "Brushless Alternator",
      description: "High-efficiency brushless alternator delivering clean, regulated 3-phase power.",
      specs: [
        { label: "Output", value: "62.5 kVA / 50 kW" },
        { label: "Voltage", value: "415 V, 3-phase" },
        { label: "PF", value: "0.8 lagging" },
      ],
    },
    {
      id: "control",
      x: 75, y: 35,
      title: "Smart Control Panel",
      description: "Digital controller with auto-start, fault detection, and remote monitoring readiness.",
      specs: [
        { label: "Display", value: "Backlit LCD" },
        { label: "AMF", value: "Optional" },
        { label: "Comms", value: "Modbus / RS-485" },
      ],
    },
    {
      id: "enclosure",
      x: 85, y: 58,
      title: "Acoustic Enclosure",
      description: "1.6 mm CRCA panels with PU foam insulation. CPCB IV+ compliant, weather-resistant.",
      specs: [
        { label: "Sound", value: "75 dB(A) @ 1m" },
        { label: "Material", value: "1.6 mm CRCA" },
        { label: "Insulation", value: "PU foam, 50 mm" },
      ],
    },
    {
      id: "fuel",
      x: 50, y: 78,
      title: "Integrated Fuel Tank",
      description: "Built-in base fuel tank for extended runtime with overflow and leak protection.",
      specs: [
        { label: "Capacity", value: "230 L" },
        { label: "Runtime", value: "~10 h @ 75% load" },
        { label: "Material", value: "Mild steel, lined" },
      ],
    },
  ],
  sections: [
    {
      id: "overview",
      number: "01",
      title: "62.5 kVA Silent DG Set",
      tagline: "Industrial-grade reliability, whisper-quiet by design.",
      image: dgOverview,
      alt: "62.5 kVA silent diesel generator overview",
      specs: [
        { label: "Model", value: "ADG-62.5S" },
        { label: "Rating", value: "62.5 kVA / 50 kW" },
        { label: "Compliance", value: "CPCB IV+" },
      ],
      highlight: [
        { value: 62.5, suffix: " kVA", label: "Prime power" },
        { value: 75, suffix: " dB(A)", label: "Sound @ 1m" },
        { value: 27, suffix: "+ yrs", label: "Heritage" },
      ],
    },
    {
      id: "engine",
      number: "02",
      title: "Engine",
      tagline: "Built for continuous duty and tight load response.",
      image: dgEngine,
      alt: "Turbocharged 4-cylinder diesel engine",
      specs: [
        { label: "Configuration", value: "4-cylinder, inline" },
        { label: "Aspiration", value: "Turbocharged" },
        { label: "Displacement", value: "~3.9 L" },
        { label: "Cooling", value: "Water-cooled" },
        { label: "Fuel", value: "High-speed diesel" },
      ],
    },
    {
      id: "power",
      number: "03",
      title: "Power Output",
      tagline: "Clean, stable 3-phase power for sensitive loads.",
      image: dgAlternator,
      alt: "Industrial brushless alternator with copper windings",
      specs: [
        { label: "Rating", value: "62.5 kVA / 50 kW" },
        { label: "Voltage", value: "415 V" },
        { label: "Frequency", value: "50 Hz" },
        { label: "Phase", value: "3-phase, 4-wire" },
        { label: "Power factor", value: "0.8 lagging" },
      ],
    },
    {
      id: "sound",
      number: "04",
      title: "Sound & Enclosure",
      tagline: "CPCB IV+ compliant. Engineered to disappear into its environment.",
      image: dgEnclosure,
      alt: "Acoustic enclosure with louvered ventilation",
      specs: [
        { label: "Sound level", value: "75 dB(A) @ 1m" },
        { label: "At 7m", value: "63 dB(A)" },
        { label: "Construction", value: "1.6 mm CRCA panels" },
        { label: "Insulation", value: "PU foam, 50 mm" },
        { label: "Finish", value: "7-tank powder coat" },
      ],
    },
    {
      id: "dimensions",
      number: "05",
      title: "Dimensions & Weight",
      tagline: "Compact footprint, easy to site and service.",
      image: dgDimensions,
      alt: "Side profile view of silent diesel generator",
      specs: [
        { label: "Length", value: "2400 mm" },
        { label: "Width", value: "1050 mm" },
        { label: "Height", value: "1550 mm" },
        { label: "Dry weight", value: "~1250 kg" },
        { label: "Wet weight", value: "~1450 kg" },
      ],
    },
    {
      id: "video",
      number: "06",
      title: "Product Video",
      tagline: "See it in action.",
      image: dgDimensions,
      alt: "Product demonstration video",
      specs: [
        { label: "Duration", value: "2:30 min" },
        { label: "Quality", value: "1080p HD" },
        { label: "Format", value: "MP4" },
      ],
    },
  ],
};

export const PRODUCTS: ProductSummary[] = [
  {
    slug: SHOWCASE.slug,
    name: SHOWCASE.name,
    kva: SHOWCASE.kva,
    range: SHOWCASE.range,
    status: "active",
    thumbnail: dgOverview,
  },
];

// ── EKL 15 (2 Cyl)-IV Showcase ──────────────────────────────────────────────
import ekl15Engine from "@/assets/brand/engine-escorts.jpg";
import ekl15Control from "@/assets/brand/control-panel.jpg";
import ekl15Overview from "@/assets/genset-small-C07x-piZ.jpg";
import ekl15Alternator from "@/assets/dg-alternator.jpg";
import ekl15Dimensions from "@/assets/dg-dimensions.jpg";

export const EKL15_SHOWCASE: ShowcaseProduct = {
  slug: "ekl-15-2cyl",
  name: "EKL 15 kVA (2 Cyl) DG Set",
  kva: 15,
  range: "15-62.5",
  status: "active",
  thumbnail: ekl15Overview,
  hero: ekl15Overview,
  hotspots: [
    {
      id: "engine",
      x: 42, y: 55,
      title: "Escorts G15-IV Engine",
      description: "2-cylinder, naturally aspirated, air-cooled diesel engine with electronic governor for stable frequency.",
      specs: [
        { label: "Cylinders", value: "2 inline" },
        { label: "Displacement", value: "1.56 L" },
        { label: "Bore × Stroke", value: "95 × 110 mm" },
      ],
    },
    {
      id: "alternator",
      x: 25, y: 48,
      title: "Stamford Alternator",
      description: "Brushless, self-excited single-bearing alternator with double layer concentric winding for clean power.",
      specs: [
        { label: "Output", value: "15 kVA / 12 kWe" },
        { label: "Voltage", value: "415 V, 3-phase" },
        { label: "PF", value: "0.8 lagging" },
      ],
    },
    {
      id: "control",
      x: 75, y: 35,
      title: "DEIF SGC 120 Controller",
      description: "Microprocessor-based digital controller with AMF, CANbus engine interface, and LCD display.",
      specs: [
        { label: "Make", value: "DEIF, Denmark" },
        { label: "Model", value: "SGC 120" },
        { label: "Comms", value: "USB / RS-485" },
      ],
    },
    {
      id: "enclosure",
      x: 85, y: 58,
      title: "Acoustic Enclosure",
      description: "CPCB IV compliant acoustic enclosure — silent operation for residential and commercial sites.",
      specs: [
        { label: "Sound", value: "70 dB(A) @ 1m" },
        { label: "Compliance", value: "CPCB IV" },
        { label: "Protection", value: "IP23" },
      ],
    },
    {
      id: "fuel",
      x: 50, y: 78,
      title: "Fuel & Lubrication",
      description: "High-speed diesel engine with full flow oil filter and lube oil cooling for optimum temperature control.",
      specs: [
        { label: "Fuel", value: "4.1 L/h @ 100%" },
        { label: "Lube Oil", value: "15W40 CI4" },
        { label: "Oil Capacity", value: "5.5 L" },
      ],
    },
  ],
  sections: [
    {
      id: "overview",
      number: "01",
      title: "EKL 15 kVA Silent DG Set",
      tagline: "Compact power, CPCB IV compliant — built for demanding environments.",
      image: ekl15Overview,
      alt: "ATM EKL 15 kVA 2-cylinder silent diesel generator",
      specs: [
        { label: "Model", value: "EKL15-IV (2 Cyl)" },
        { label: "Rating", value: "15 kVA / 12 kWe" },
        { label: "Compliance", value: "CPCB IV" },
      ],
      highlight: [
        { value: 15, suffix: " kVA", label: "Prime power" },
        { value: 70, suffix: " dB(A)", label: "Sound @ 1m" },
        { value: 27, suffix: "+ yrs", label: "Heritage" },
      ],
    },
    {
      id: "engine",
      number: "02",
      title: "Engine",
      tagline: "Escorts G15-IV — 2-cylinder, naturally aspirated, built for reliability.",
      image: ekl15Engine,
      alt: "Escorts 2-cylinder diesel engine",
      specs: [
        { label: "Make", value: "Escorts" },
        { label: "Model", value: "G15-IV" },
        { label: "Configuration", value: "2-cylinder inline" },
        { label: "Aspiration", value: "Natural aspiration" },
        { label: "Displacement", value: "1.56 L" },
        { label: "Bore × Stroke", value: "95 × 110 mm" },
        { label: "Cooling", value: "Air cooled" },
        { label: "Speed", value: "1500 RPM" },
        { label: "Gross Power (PRP)", value: "14.1 kWm / 19 hp" },
      ],
    },
    {
      id: "power",
      number: "03",
      title: "Power Output",
      tagline: "Stable 3-phase power at 415 V / 50 Hz for sensitive loads.",
      image: ekl15Alternator,
      alt: "Stamford brushless alternator",
      specs: [
        { label: "Make", value: "Stamford" },
        { label: "Frame", value: "S0L1-P1" },
        { label: "Rating", value: "15 kVA / 12 kWe" },
        { label: "Voltage", value: "415 V (L-L)" },
        { label: "Current", value: "20.88 A" },
        { label: "Frequency", value: "50 Hz" },
        { label: "Phase", value: "3-phase, 1/3" },
        { label: "Power Factor", value: "0.8 lagging" },
        { label: "Insulation", value: "H Class" },
        { label: "Efficiency @ 75%", value: "86.4%" },
        { label: "Efficiency @ 100%", value: "83.5%" },
      ],
    },
    {
      id: "sound",
      number: "04",
      title: "Sound & Enclosure",
      tagline: "CPCB IV compliant. Designed for residential and commercial sites.",
      image: ekl15Overview,
      alt: "Acoustic enclosure of EKL 15 generator",
      specs: [
        { label: "Sound level", value: "70 dB(A) @ 1m" },
        { label: "Compliance", value: "CPCB IV" },
        { label: "Protection", value: "IP23" },
        { label: "Design Ambient", value: "40°C" },
        { label: "Altitude", value: "Up to 1000 m" },
        { label: "Cooling airflow", value: "0.58 m³/sec" },
      ],
    },
    {
      id: "control",
      number: "05",
      title: "Control Panel",
      tagline: "DEIF SGC 120 — Advanced microprocessor controller with AMF & CANbus.",
      image: ekl15Control,
      alt: "DEIF SGC 120 digital genset controller",
      specs: [
        { label: "Controller", value: "DEIF SGC 120" },
        { label: "Display", value: "LCD backlit, full graphics" },
        { label: "Operation", value: "Auto / Manual / Remote" },
        { label: "AMF", value: "Supported" },
        { label: "Comms", value: "USB / RS-485 / CANbus" },
        { label: "Protection", value: "IP65 with gasket" },
        { label: "Operating Temp", value: "-20 to 65°C" },
        { label: "Event Log", value: "100 events" },
      ],
    },
    {
      id: "dimensions",
      number: "06",
      title: "Dimensions & Weight",
      tagline: "Compact footprint — easy to site, transport and service.",
      image: ekl15Dimensions,
      alt: "EKL 15 generator side profile with dimensions",
      specs: [
        { label: "Length", value: "1760 mm" },
        { label: "Width", value: "950 mm" },
        { label: "Height", value: "1495 mm" },
        { label: "Dry weight", value: "~70 kg (open set)" },
        { label: "Day fuel tank", value: "Included" },
        { label: "Lube oil", value: "15W40 CI4, 5.5 L" },
      ],
    },
  ],
};

