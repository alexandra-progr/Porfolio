import { motion } from "motion/react";
import {
  ShieldCheck, Clock, Leaf, Award,
  type LucideIcon,
} from "lucide-react";
import { BlurText } from "@/components/BlurText";
import { REASONS } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck, Clock, Leaf, Award,
};

export function Pourquoi() {
  return (
    <section id="pourquoi" className="relative py-28 md:py-40 border-t border-[hsl(var(--border))]">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">

        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span
            className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80 inline-block mb-6"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Pourquoi nous
          </span>
          <BlurText
            text="La confiance ne s'improvise pas."
            as="h2"
            className="uppercase text-4xl md:text-6xl leading-[0.9] tracking-tight max-w-[18ch] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
            delay={0.06}
          />
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-foreground/60 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Chaque engagement repose sur quatre piliers que nous n'avons jamais compromis en quinze ans d'activité.
          </motion.p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((reason, idx) => {
            const Icon = iconMap[reason.icon] ?? ShieldCheck;
            return (
              <motion.div
                key={reason.title}
                className="liquid-glass rounded-2xl p-7 flex flex-col gap-5 min-h-[260px]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="liquid-glass-strong rounded-full w-11 h-11 flex items-center justify-center">
                  <Icon className="size-5 text-foreground" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h3
                    className="uppercase text-xl tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="text-sm text-foreground/65 leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {reason.body}
                  </p>
                </div>
                <div className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
