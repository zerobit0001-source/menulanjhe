"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CornerTicks, TechLabel } from "./TechDetails";
import { N018, formatNumber, pad } from "./utils";

type Props = {
  shopName: string;
  description?: string;
  categoryCount: number;
  productCount: number;
};

/** Compact, asymmetric hero: big name + a small "spec panel" built from real counts. */
export default function Template018Hero({
  shopName,
  description,
  categoryCount,
  productCount,
}: Props) {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: "easeOut" as const },
  });

  return (
    <section
      className="relative mt-5 grid gap-5 overflow-hidden rounded-2xl p-5 sm:p-7 lg:mt-8 lg:grid-cols-12 lg:gap-8 lg:p-9"
      style={{
        border: `1px solid ${N018.line}`,
        backgroundColor: N018.panel,
        backgroundImage: `radial-gradient(${N018.line} 1px, transparent 1px)`,
        backgroundSize: "18px 18px",
      }}
    >
      <CornerTicks color={N018.accent} />

      <div className="lg:col-span-8">
        <motion.div {...rise(0)} className="mb-3 flex items-center gap-2">
          <span aria-hidden className="h-px w-6" style={{ backgroundColor: N018.accent }} />
          <TechLabel accent>menu / index</TechLabel>
        </motion.div>

        <motion.h1
          {...rise(0.07)}
          className="text-[2.2rem] font-black leading-[1.2] sm:text-5xl lg:text-7xl lg:leading-[1.1]"
        >
          {shopName}
        </motion.h1>

        {description && (
          <motion.p
            {...rise(0.14)}
            className="mt-3 max-w-xl text-sm leading-8"
            style={{ color: N018.muted }}
          >
            {description}
          </motion.p>
        )}
      </div>

      <motion.dl
        {...rise(0.2)}
        className="flex gap-6 self-end lg:col-span-4 lg:justify-end"
      >
        {[
          { label: "sections", value: categoryCount },
          { label: "items", value: productCount },
        ].map((stat) => (
          <div key={stat.label} className="min-w-16">
            <dt>
              <TechLabel>{stat.label}</TechLabel>
            </dt>

            <dd className="mt-1 text-3xl font-black tabular-nums" style={{ color: N018.accent }}>
              <span className="sr-only">{formatNumber(stat.value)}</span>
              <span aria-hidden dir="ltr">
                {pad(stat.value)}
              </span>
            </dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
