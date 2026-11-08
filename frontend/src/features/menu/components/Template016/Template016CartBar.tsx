"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import { V016, formatNumber, formatPrice } from "./utils";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

/** Floating ticket-style tab: quick cart access on mobile. */
export default function Template016CartBar({ count, total, onClick }: Props) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 320 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-[max(env(safe-area-inset-bottom),14px)]"
        >
          <button
            type="button"
            onClick={onClick}
            className="pointer-events-auto mx-auto flex h-14 w-full max-w-md items-center justify-between px-5 text-sm font-black transition-transform active:scale-[0.98]"
            style={{
              backgroundColor: V016.brown,
              color: V016.bg,
              boxShadow: `inset 0 0 0 3px ${V016.brown}, inset 0 0 0 4px ${V016.cream}88, 0 8px 22px rgba(73,48,32,0.28)`,
            }}
          >
            <span className="flex items-center gap-2">
              <ShoppingBag size={18} />
              مشاهده سفارش · {formatNumber(count)}
            </span>

            <span>{formatPrice(total)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
