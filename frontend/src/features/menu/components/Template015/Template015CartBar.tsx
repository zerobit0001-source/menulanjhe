"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import { P015, formatNumber, formatPrice } from "./utils";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

export default function Template015CartBar({ count, total, onClick }: Props) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="bar"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 320 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-[max(env(safe-area-inset-bottom),16px)]"
        >
          <button
            type="button"
            onClick={onClick}
            className="pointer-events-auto mx-auto flex h-16 w-full max-w-md items-center justify-between rounded-full bg-white/75 px-3 backdrop-blur-xl transition-transform active:scale-[0.98]"
            style={{
              border: `1px solid ${P015.border}`,
              boxShadow: "0 16px 40px rgba(41,37,34,0.16)",
              color: P015.text,
            }}
          >
            <span
              className="flex h-11 items-center gap-2 rounded-full px-5 text-sm font-black text-white"
              style={{ backgroundColor: P015.accentStrong }}
            >
              <ShoppingBag size={18} />
              مشاهده سبد · {formatNumber(count)}
            </span>

            <span className="pl-3 text-sm font-black">{formatPrice(total)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
