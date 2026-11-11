"use client";

import { motion, useReducedMotion } from "framer-motion";

import { E017, SERIF, formatNumber } from "./utils";

type Props = {
  shopName: string;
  description?: string;
  categoryCount: number;
  productCount: number;
};

/** Asymmetric hero: oversized name on one side, a narrow intro column on the other. */
export default function Template017Hero({
  shopName,
  description,
  categoryCount,
  productCount,
}: Props) {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  });

  return (
    <section className="grid gap-5 pb-8 pt-6 lg:grid-cols-12 lg:gap-10 lg:pb-14 lg:pt-14">
      <div className="lg:col-span-8">
        <motion.p
          {...rise(0)}
          className="mb-3 flex items-center gap-3 text-[11px] font-bold"
          style={{ color: E017.accent }}
        >
          <span aria-hidden className="h-px w-8" style={{ backgroundColor: E017.accent }} />
          منو · {formatNumber(categoryCount)} بخش · {formatNumber(productCount)} محصول
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className="text-[2.6rem] font-black leading-[1.15] sm:text-6xl lg:text-8xl lg:leading-[1.05]"
          style={{ color: E017.text }}
        >
          {shopName}
        </motion.h1>
      </div>

      <motion.div
        {...rise(0.18)}
        className="flex flex-col justify-end lg:col-span-4 lg:border-r lg:pr-8"
        style={{ borderColor: E017.border }}
      >
        <p
          aria-hidden
          className="mb-2 text-5xl leading-none lg:text-7xl"
          style={{ color: E017.accent, fontFamily: SERIF }}
        >
          “
        </p>

        <p className="text-sm leading-8 lg:text-base" style={{ color: E017.muted }}>
          {description || "فهرست کامل محصولات؛ دسته‌ای را انتخاب کنید و سفارش خود را بسازید."}
        </p>
      </motion.div>
    </section>
  );
}
