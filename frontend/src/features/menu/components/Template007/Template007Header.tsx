"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

type Props = {
  shopName: string;
  cartCount: number;
  onCartClick: () => void;
};

export default function Template007Header({
  shopName,
  cartCount,
  onCartClick,
}: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-[#F5EBDD]/[0.08] bg-[#120D09]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div>
          <p className="text-[15px] font-bold text-[#F5EBDD]">{shopName}</p>
          <p className="text-[11px] tracking-wide text-[#CDBEAE]">
            منوی دیجیتال
          </p>
        </div>

        <motion.button
          type="button"
          onClick={onCartClick}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#F5EBDD]/[0.08] bg-[#241811]"
        >
          <ShoppingBag size={18} className="text-[#F5EBDD]" />

          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B98252] px-1 text-[10px] font-bold text-[#18110C]"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}
