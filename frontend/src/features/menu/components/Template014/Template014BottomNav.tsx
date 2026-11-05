"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

import { T014, formatNumber, formatPrice } from "./utils";

type Props = {
  previousName: string | null;
  nextName: string | null;
  /** Prev/next are hidden while a search is active. */
  navigationEnabled: boolean;
  cartCount: number;
  cartTotal: number;
  onPrevious: () => void;
  onNext: () => void;
  onCartClick: () => void;
};

/**
 * Fixed bottom navigation: [previous category] [cart] [next category].
 * The order is physical (left / center / right) regardless of text direction.
 * At the first/last category the missing side is shown disabled.
 */
export default function Template014BottomNav({
  previousName,
  nextName,
  navigationEnabled,
  cartCount,
  cartTotal,
  onPrevious,
  onNext,
  onCartClick,
}: Props) {
  const showPrev = navigationEnabled && previousName !== null;
  const showNext = navigationEnabled && nextName !== null;

  return (
    <nav
      aria-label="ناوبری پایین"
      dir="ltr"
      className="absolute inset-x-0 bottom-0 z-20"
      style={{
        backgroundColor: `${T014.s1}F5`,
        borderTop: `1px solid ${T014.line}`,
        boxShadow: "0 -10px 28px rgba(0,0,0,0.38)",
      }}
    >
      <div className="mx-auto grid max-w-3xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3">
        {/* Left: previous */}
        <button
          type="button"
          onClick={onNext}
          disabled={!showNext}
          aria-label={showNext ? `بعدی: ${nextName}` : "دسته بعدی وجود ندارد"}
          className="flex min-w-0 items-center justify-start gap-2 rounded-2xl px-3 py-2 text-right transition-colors enabled:hover:brightness-125 enabled:active:scale-[0.97] disabled:cursor-default disabled:opacity-35"
          style={{ backgroundColor: T014.s2, border: `1px solid ${T014.line}` }}
        >
          <ChevronLeft
            size={18}
            className="shrink-0"
            style={{ color: T014.accent }}
          />
          <span dir="ltr" className="min-w-0">
            <span className="block text-[10px]" style={{ color: T014.muted }}>
              {navigationEnabled && nextName === null ? "انتهای منو" : "بعدی"}
            </span>

            <span
              className="block truncate text-xs font-black"
              style={{ color: T014.text }}
            >
              {showNext ? nextName : "—"}
            </span>
          </span>
        </button>
        {/* Center: cart */}
        <button
          type="button"
          onClick={onCartClick}
          aria-label={`سبد سفارش، ${formatNumber(cartCount)} مورد، ${formatPrice(cartTotal)}`}
          className="relative -mt-9 flex h-[68px] w-[68px] flex-col items-center justify-center rounded-full transition-transform active:scale-95"
          style={{
            backgroundColor: T014.accent,
            color: T014.accentInk,
            border: `4px solid ${T014.base}`,
            boxShadow: "0 10px 24px rgba(198,106,50,0.35)",
          }}
        >
          <ShoppingBag size={24} />

          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 520, damping: 22 }}
                className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-black"
                style={{
                  backgroundColor: T014.accent2,
                  color: T014.text,
                  border: `2px solid ${T014.base}`,
                }}
              >
                {formatNumber(cartCount)}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Right: next */}

        <button
          type="button"
          onClick={onPrevious}
          disabled={!showPrev}
          aria-label={
            showPrev ? `قبلی: ${previousName}` : "دسته قبلی وجود ندارد"
          }
          className="flex min-w-0 items-center justify-end gap-2 rounded-2xl px-3 py-2 text-right transition-colors enabled:hover:brightness-125 enabled:active:scale-[0.97] disabled:cursor-default disabled:opacity-35"
          style={{ backgroundColor: T014.s2, border: `1px solid ${T014.line}` }}
        >
          <span dir="rtl" className="min-w-0">
            <span className="block text-[10px]" style={{ color: T014.muted }}>
              {navigationEnabled && previousName === null
                ? "ابتدای منو"
                : "قبلی"}
            </span>

            <span
              className="block truncate text-xs font-black"
              style={{ color: T014.text }}
            >
              {showPrev ? previousName : "—"}
            </span>
          </span>
          <ChevronRight
            size={18}
            className="shrink-0"
            style={{ color: T014.accent }}
          />
        </button>
      </div>
    </nav>
  );
}
