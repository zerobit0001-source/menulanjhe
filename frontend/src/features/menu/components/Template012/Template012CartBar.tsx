"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import { T012, formatPrice, toFa } from "./utils";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

/** Floating summary shown only while the cart has items. */
export default function Template012CartBar({ count, total, onClick }: Props) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-[max(env(safe-area-inset-bottom),16px)]"
        >
          <button
            type="button"
            onClick={onClick}
            className="pointer-events-auto mx-auto flex h-14 w-full max-w-md items-center justify-between rounded-full px-5 text-white shadow-[0_12px_32px_rgba(31,111,74,0.4)] transition-transform active:scale-[0.98]"
            style={{ backgroundColor: T012.accent }}
          >
            <span className="flex items-center gap-2 text-sm font-black">
              <ShoppingBag size={19} />
              مشاهده سبد ({toFa(count)})
            </span>

            <span className="text-sm font-black">{formatPrice(total)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
