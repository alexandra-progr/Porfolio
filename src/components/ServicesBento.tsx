import { motion } from "motion/react";
import {
  Truck, Package, Warehouse, Globe, Building2, Sparkles, ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { BlurText } from "@/components/BlurText";
import { SERVICES } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Truck, Package, Warehouse, Globe, Building2, Sparkles,
};

const BENTO_HERO_IMAGE = "/court.jpg";

const cardLayouts = [
  "md:row-span-2 md:col-span-1 p-8 min-h-[480px]",
  "md:col-span-1 p-6 min-h-[228px]",
  "md:col-span-1 p-6 min-h-[228px]",
  "md:col-span-2 p-7 min-h-[228px]",
  "md:col-span-1 p-6 min-h-[228px]",
  "md:col-span-3 p-7 min-h-[200px]",
];

export function ServicesBento() {
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">

        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <span
            className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80 inline-block mb-6"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Nos services
          </span>
          <BlurText
            text="Tout ce qui bouge. Sous un seul toit."
            as="h2"
            className="uppercase text-4xl md:text-6xl leading-[0.9] tracking-tight max-w-[20ch]"
            style={{ fontFamily: "var(--font-display)" }}
            delay={0.06}
          />
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {SERVICES.map((service, idx) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            return (
              <motion.div
                key={service.title}
                className={cn(
                  "liquid-glass rounded-2xl relative overflow-hidden group cursor-default",
                  "flex flex-col",
                  cardLayouts[idx]
                )}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
              >
                {/* Photo background on the tall hero card */}
                {idx === 0 && BENTO_HERO_IMAGE && (
                  <>
                    <img
                      src={BENTO_HERO_IMAGE}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-35 transition-opacity duration-500 group-hover:opacity-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
                  </>
                )}

                <div className="liquid-glass-strong rounded-full w-11 h-11 flex items-center justify-center mb-5 shrink-0 relative">
                  <Icon className="size-5 text-foreground" />
                </div>
                <h3
                  className="relative uppercase text-2xl md:text-3xl leading-[0.95] tracking-tight mb-3 max-w-[18ch]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.title}
                </h3>
                <p
                  className="relative text-sm text-foreground/65 max-w-[38ch] leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {service.body}
                </p>
                <ArrowUpRight className="absolute top-6 right-6 size-5 text-foreground/25 group-hover:text-foreground/75 transition-colors duration-200" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
