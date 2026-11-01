"use client";

import { AnimatePresence, motion } from "framer-motion";

import { T013, formatNumber, formatPrice } from "./utils";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

export default function Template013CartBar({ count, total, onClick }: Props) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="bar"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 320 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-5 pb-[max(env(safe-area-inset-bottom),16px)]"
        >
          <button
            type="button"
            onClick={onClick}
            className="pointer-events-auto mx-auto flex h-14 w-full max-w-md items-center justify-between rounded-full px-6 transition-transform active:scale-[0.98]"
            style={{
              backgroundColor: T013.accent,
              color: T013.accentInk,
              boxShadow: "0 14px 34px rgba(0,0,0,0.55)",
            }}
          >
            <span className="text-sm font-black">
              مشاهده سفارش · {formatNumber(count)} مورد
            </span>

            <span className="text-sm font-black">{formatPrice(total)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
