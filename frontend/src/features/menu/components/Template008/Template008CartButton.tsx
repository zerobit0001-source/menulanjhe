"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { faNum, formatToman } from "./utils";

export function Template008CartButton({
  count,
  total,
  onClick,
}: {
  count: number;
  total: number;
  onClick: () => void;
}) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <button
            onClick={onClick}
            className="mx-auto flex h-14 w-full max-w-md items-center justify-between rounded-full bg-[#F5C400] px-6 text-[#171717] shadow-[0_8px_24px_rgba(245,196,0,0.4)] transition active:scale-[0.98] active:bg-[#E5B800]"
          >
            <span className="flex items-center gap-2 text-[15px] font-bold">
              <ShoppingBag size={19} />
              مشاهده سبد ({faNum(count)})
            </span>
            <span className="text-[15px] font-bold">{formatToman(total)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
