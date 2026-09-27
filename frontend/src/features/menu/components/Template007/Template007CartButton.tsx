"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

export default function Template007CartButton({
  count,
  total,
  onClick,
}: Props) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
        >
          <motion.button
            type="button"
            onClick={onClick}
            whileTap={{ scale: 0.97 }}
            className="flex w-full max-w-md items-center justify-between rounded-2xl bg-[#F5EBDD] px-5 py-3.5 text-[#18110C] shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B98252] text-[#18110C]">
                <ShoppingBag size={16} />
              </span>

              <span className="text-xs font-bold">مشاهده سبد</span>

              <motion.span
                key={count}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="rounded-full bg-[#18110C]/10 px-2 py-0.5 text-[10px] font-bold"
              >
                {count}
              </motion.span>
            </div>

            <span className="text-xs font-bold">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
