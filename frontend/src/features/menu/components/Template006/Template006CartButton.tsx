"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

export default function Template006CartButton({
  count,
  total,
  onClick,
}: Props) {
  if (!count) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-5 left-0 right-0 z-40 px-4"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={onClick}
        className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-white px-5 py-4 text-black shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <ShoppingBag size={18} />

          <span className="text-sm font-black">{count} محصول</span>
        </div>

        <span className="text-sm font-black">
          {total.toLocaleString("fa-IR")} تومان
        </span>
      </motion.button>
    </motion.div>
  );
}
