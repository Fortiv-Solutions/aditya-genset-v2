import { SectionReveal, StaggerReveal } from "./SectionReveal";
import { Target, Lightbulb, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const MISSION_ITEMS = [
  "Deliver high-quality products and services",
  "Be cost-competitive",
  "Serve all power needs: Baseload, Standby, Critical standby",
];

const VISION_ITEMS = [
  "Become a benchmark in the power industry",
  "Provide world-class products",
  "Driven by: Integrity, Teamwork, Continuous improvement",
];

export function MissionVision() {
  return (
    <section className="relative flex min-h-screen snap-center flex-col justify-center overflow-hidden bg-secondary/40 pt-16 md:pt-0">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Mission */}
          <SectionReveal variant="slideLeft" threshold={0.2}>
            <motion.div 
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              className="group relative h-full overflow-hidden rounded-sm border border-border bg-white p-10 transition-shadow duration-500 hover:border-accent hover:shadow-[0_20px_50px_rgba(242,169,0,0.15)]"
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                <Target size={180} />
              </div>
              
              <div className="relative">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-gradient text-foreground shadow-lg group-hover:animate-pulse-ring">
                  <Target size={32} />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  Our Mission
                </h2>
                
                <StaggerReveal className="mt-8 space-y-4" staggerMs={100}>
                  {MISSION_ITEMS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-accent" />
                      <p className="text-muted-foreground text-lg">{item}</p>
                    </div>
                  ))}
                </StaggerReveal>
              </div>
            </motion.div>
          </SectionReveal>

          {/* Vision */}
          <SectionReveal variant="slideRight" delay={150} threshold={0.2}>
            <motion.div 
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              className="group relative h-full overflow-hidden rounded-sm border border-border bg-brand-navy p-10 text-white transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(11,58,92,0.3)]"
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 text-accent">
                <Lightbulb size={180} />
              </div>
              
              <div className="relative">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-accent shadow-lg backdrop-blur-md group-hover:bg-white/20">
                  <Lightbulb size={32} />
                </div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Our Vision
                </h2>
                
                <StaggerReveal className="mt-8 space-y-4" staggerMs={100}>
                  {VISION_ITEMS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-accent" />
                      <p className="text-white/80 text-lg">{item}</p>
                    </div>
                  ))}
                </StaggerReveal>
              </div>
            </motion.div>
          </SectionReveal>
          
        </div>
      </div>
    </section>
  );
}
