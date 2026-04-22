import { motion } from "motion/react";
import { BlurText } from "@/components/BlurText";
import { PROCESS_STEPS } from "@/lib/data";

export function Process() {
  return (
    <section id="processus" className="relative py-28 md:py-40 border-t border-[hsl(var(--border))]">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">

        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <span
            className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80 inline-block mb-6"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Comment ça marche
          </span>
          <BlurText
            text="Quatre étapes. Zéro friction."
            as="h2"
            className="uppercase text-4xl md:text-6xl leading-[0.9] tracking-tight max-w-[18ch]"
            style={{ fontFamily: "var(--font-display)" }}
            delay={0.06}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.n}
              className="relative px-6 md:px-10 py-10 md:py-14 flex flex-col gap-4 items-start border-t md:border-t-0 md:border-l border-[hsl(var(--border))] first:border-t-0 first:md:border-l-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="text-[80px] md:text-[110px] leading-none text-primary/20 -mb-4 select-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.n.padStart(2, "0")}
              </span>
              <h3
                className="uppercase text-2xl md:text-3xl tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm text-foreground/65 leading-relaxed max-w-[30ch]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
