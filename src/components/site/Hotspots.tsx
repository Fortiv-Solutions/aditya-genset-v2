import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Hotspot } from "@/data/products";
import { X, ZoomIn } from "lucide-react";

interface Props {
  image: string;
  alt: string;
  hotspots: Hotspot[];
}

export function Hotspots({ image, alt, hotspots }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide intro after 4 seconds
    const timer = setTimeout(() => setShowIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { 
      if (e.key === "Escape") {
        setOpen(null);
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(null);
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { 
      document.removeEventListener("keydown", onKey); 
      document.removeEventListener("mousedown", onClick); 
    };
  }, []);

  const activeSpot = hotspots.find((h) => h.id === open);

  const handleDotClick = (h: Hotspot, e: React.MouseEvent) => {
    e.stopPropagation();
    const isOpen = open === h.id;
    
    if (isOpen) {
      setOpen(null);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setOpen(h.id);
      // Zoom to 1.5x and center on the hotspot
      setScale(1.5);
      // Calculate offset to center the hotspot
      const offsetX = (50 - h.x) * 0.5;
      const offsetY = (50 - h.y) * 0.5;
      setPosition({ x: offsetX, y: offsetY });
    }
  };

  const colors = [
    { bg: "bg-blue-500", ring: "ring-blue-500/30", text: "text-blue-500", shadow: "shadow-blue-500/50" },
    { bg: "bg-green-500", ring: "ring-green-500/30", text: "text-green-500", shadow: "shadow-green-500/50" },
    { bg: "bg-purple-500", ring: "ring-purple-500/30", text: "text-purple-500", shadow: "shadow-purple-500/50" },
    { bg: "bg-orange-500", ring: "ring-orange-500/30", text: "text-orange-500", shadow: "shadow-orange-500/50" },
    { bg: "bg-pink-500", ring: "ring-pink-500/30", text: "text-pink-500", shadow: "shadow-pink-500/50" },
  ];

  return (
    <div ref={wrapRef} className="relative aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Image container with zoom and pan */}
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        animate={{ 
          scale,
          x: `${position.x}%`,
          y: `${position.y}%`
        }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <img 
          src={image} 
          alt={alt} 
          className="w-[120%] h-[120%] object-contain drop-shadow-2xl" 
        />
      </motion.div>

      {/* Intro overlay - shows all parts with labels */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex items-center justify-center"
          >
            <div className="text-center text-white space-y-6 px-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h3 className="font-display text-3xl font-bold mb-2">Interactive 3D Exploration</h3>
                <p className="text-white/80 text-sm">Click on any numbered part to zoom and explore</p>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-2 gap-4 max-w-md mx-auto"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.5
                    }
                  }
                }}
              >
                {hotspots.map((h, index) => {
                  const color = colors[index % colors.length];
                  return (
                    <motion.div
                      key={h.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
                    >
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm", color.bg, color.shadow, "shadow-lg")}>
                        {index + 1}
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-xs font-semibold text-white">{h.title}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
                className="text-xs text-white/60"
              >
                Starting in {Math.max(0, 4 - Math.floor(Date.now() / 1000) % 4)} seconds...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hotspot dots */}
      {hotspots.map((h, index) => {
        const isOpen = open === h.id;
        const color = colors[index % colors.length];
        
        return (
          <motion.button
            key={h.id}
            onClick={(e) => handleDotClick(h, e)}
            aria-label={h.title}
            aria-expanded={isOpen}
            className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none group z-20"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: showIntro ? 4.2 + index * 0.1 : 0, duration: 0.4, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative flex h-10 w-10 items-center justify-center">
              {/* Pulsing ring */}
              <span className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-75",
                color.bg,
                !isOpen && "animate-ping-soft",
              )} />
              {/* Outer ring on hover/active */}
              <span className={cn(
                "absolute inline-flex h-14 w-14 rounded-full ring-2 transition-all duration-300",
                color.ring,
                isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
              )} />
              {/* Main dot */}
              <span className={cn(
                "relative inline-flex h-10 w-10 items-center justify-center rounded-full border-3 border-white shadow-xl transition-all duration-300 ease-out",
                color.bg,
                color.shadow,
                isOpen && "scale-125 shadow-2xl",
              )}>
                <span className="text-white text-sm font-bold">{index + 1}</span>
              </span>
            </span>
            
            {/* Label on hover */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={cn(
                    "absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-lg pointer-events-none",
                    color.bg
                  )}
                >
                  {h.title}
                  <div className={cn("absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45", color.bg)} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}

      {/* Detail popup */}
      <AnimatePresence>
        {activeSpot && (
          <motion.div
            key={activeSpot.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className={cn(
              "absolute z-30 w-96 max-w-[90%] rounded-xl border-2 bg-white shadow-2xl overflow-hidden",
              activeSpot.x > 60 ? "right-4" : "left-4",
              activeSpot.y > 60 ? "bottom-4" : "top-4",
              (() => {
                const index = hotspots.findIndex((h) => h.id === activeSpot.id);
                return colors[index % colors.length].text.replace('text-', 'border-');
              })()
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with color accent */}
            <div className={cn(
              "px-6 py-5 text-white relative",
              (() => {
                const index = hotspots.findIndex((h) => h.id === activeSpot.id);
                return colors[index % colors.length].bg;
              })()
            )}>
              <button
                onClick={() => {
                  setOpen(null);
                  setScale(1);
                  setPosition({ x: 0, y: 0 });
                }}
                aria-label="Close"
                className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded-full"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold border-2 border-white/40">
                  {hotspots.findIndex((h) => h.id === activeSpot.id) + 1}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-90">
                    Component Detail
                  </div>
                  <div className="mt-0.5 font-display text-2xl font-bold">{activeSpot.title}</div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="px-6 py-5 bg-white">
              <p className="text-sm text-muted-foreground leading-relaxed">{activeSpot.description}</p>
              <div className="mt-5 space-y-3 border-t border-border pt-5">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Specifications</div>
                {activeSpot.specs.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between gap-4 text-sm group hover:bg-slate-50 -mx-2 px-2 py-1.5 rounded transition-colors">
                    <span className="text-muted-foreground font-medium">{s.label}</span>
                    <span className="font-bold tabular-nums text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction label */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: showIntro ? 4.5 : 0, duration: 0.5 }}
        className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-black/80 backdrop-blur-sm px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg flex items-center gap-2"
      >
        <ZoomIn size={14} className="text-accent" />
        <span>Click numbered dots to zoom & explore</span>
      </motion.div>

      {/* Reset zoom button */}
      <AnimatePresence>
        {scale > 1 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => {
              setOpen(null);
              setScale(1);
              setPosition({ x: 0, y: 0 });
            }}
            className="absolute top-4 right-4 z-30 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-black transition-colors shadow-lg"
          >
            Reset View
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
