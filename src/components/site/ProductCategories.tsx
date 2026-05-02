import { Link } from "react-router-dom";
import { SectionReveal } from "./SectionReveal";
import { ChevronRight, Zap, Box } from "lucide-react";
import { motion } from "framer-motion";
import dgProduct from "@/assets/brand/dg-product.jpg";
import containerImg from "@/assets/brand/container.png";

const CATEGORIES = [
  {
    title: "DG SETS",
    desc: "High-performance diesel generator sets for industrial and commercial power..",
    icon: Zap,
    image: dgProduct,
    href: "/products",
  },
  {
    title: "NON STANDARD",
    desc: "Customized containers and specialized enclosures tailored to unique..",
    icon: Box,
    image: containerImg,
    href: "/products",
  },
];

export function ProductCategories() {
  return (
    <section className="relative flex min-h-screen snap-center flex-col justify-center bg-white py-20">
      <div className="container-x">
        <SectionReveal variant="fadeUp" className="text-center mb-16">
          <div className="font-display text-[10px] font-black uppercase tracking-[0.4em] text-accent">Official Range</div>
          <h2 className="mt-4 font-display text-5xl font-black text-foreground md:text-6xl">
            Our Products
          </h2>
          <p className="mt-6 mx-auto max-w-lg text-sm font-medium leading-relaxed text-muted-foreground uppercase tracking-wider">
            Select a category to explore our comprehensive range of power solutions and customized enclosures.
          </p>
        </SectionReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <SectionReveal
              key={cat.title}
              variant={i % 2 === 0 ? "slideLeft" : "slideRight"}
              delay={i * 150}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Link
                  to={cat.href}
                  className="group relative flex flex-col h-full min-h-[480px] overflow-hidden rounded-[2.5rem] bg-[#F8F8F8] p-10 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]"
                >
                  {/* Image Container */}
                  <div className="absolute top-10 right-10 w-2/3 h-64 transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="h-full w-full object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Content (Bottom Left) */}
                  <div className="mt-auto relative z-10 flex flex-col items-start text-left">
                    {/* Icon Box */}
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-xl transition-all duration-500 group-hover:bg-accent group-hover:text-black">
                      <cat.icon size={24} strokeWidth={2.5} />
                    </div>
                    
                    <h3 className="font-display text-4xl font-black text-foreground tracking-tighter uppercase mb-3">
                      {cat.title}
                    </h3>
                    
                    <p className="text-sm font-medium text-muted-foreground max-w-[280px] mb-8 leading-relaxed">
                      {cat.desc}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-black text-foreground uppercase tracking-widest group-hover:text-accent transition-colors duration-300">
                      Select Category <ChevronRight size={18} strokeWidth={3} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
