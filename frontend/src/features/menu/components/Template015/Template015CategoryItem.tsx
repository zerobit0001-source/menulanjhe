"use client";

import { useEffect, useId, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronLeft } from "lucide-react";

import type {
  MenuCategory,
  MenuProduct,
} from "@/features/menu/types/menu.types";
import Template015ProductRow from "./Template015ProductRow";
import { P015, formatNumber } from "./utils";

type Props = {
  category: MenuCategory;
  open: boolean;
  onToggle: () => void;
  quantities: Record<string, number>;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
};

export default function Template015CategoryItem({
  category,
  open,
  onToggle,
  quantities,
  onAdd,
  onDecrease,
}: Props) {
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const headerId = useId();
  const rootRef = useRef<HTMLElement>(null);

  /* After opening, make sure the box is fully visible in the scroll area. */
  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      rootRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [open, reduceMotion]);

  return (
    <section
      ref={rootRef}
      className="overflow-hidden rounded-3xl transition-colors duration-300"
      style={{
        backgroundColor: open ? "rgba(255,255,255,0.82)" : P015.card,
        backdropFilter: open ? "blur(14px)" : undefined,
        border: `1px solid ${open ? P015.accent + "55" : P015.border}`,
        boxShadow: open
          ? "0 18px 40px rgba(184,117,77,0.14)"
          : "0 2px 10px rgba(41,37,34,0.05)",
      }}
    >
      <motion.button
        type="button"
        id={headerId}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.15 }}
        className="flex w-full items-center justify-between gap-3 px-5 py-5 text-right"
      >
        {/* Right side (RTL start): name · count */}
        <span className="flex min-w-0 items-baseline gap-2">
          <span className="truncate text-lg font-black">{category.name}</span>

          <span aria-hidden style={{ color: P015.accent }}>
            ·
          </span>

          <span
            className="shrink-0 text-xs font-semibold"
            style={{ color: P015.muted }}
          >
            {formatNumber(category.products.length)} محصول
          </span>
        </span>

        {/* Left side: arrow, rotates to point down when expanded */}
        <motion.span
          aria-hidden
          animate={{ rotate: open ? -90 : 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: P015.soft, color: P015.accentStrong }}
        >
          <ChevronLeft size={19} />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduceMotion ? 0 : 0.34, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: reduceMotion ? 0 : 0.22 },
            }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="mx-5 h-px"
              style={{ backgroundColor: P015.border }}
              aria-hidden
            />

            <motion.ul
              variants={listVariants}
              initial={reduceMotion ? "visible" : "hidden"}
              animate="visible"
              className="px-2 pb-3 pt-2"
            >
              {category.products.map((product) => (
                <Template015ProductRow
                  key={product.id}
                  product={product}
                  quantity={quantities[product.id] ?? 0}
                  onAdd={onAdd}
                  onDecrease={onDecrease}
                />
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
