"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";

import type { MenuData } from "@/features/menu/types/menu.types";

type Props = {
  shop: MenuData["shop"];
  cartCount: number;
  onCartClick: () => void;
};

export default function Template006Header({
  shop,
  cartCount,
  onCartClick,
}: Props) {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08090B]/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-[70px] max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black">
            <Sparkles size={18} />
          </div>

          <div>
            <h1 className="text-sm font-black text-white">{shop.name}</h1>

            <p className="mt-0.5 text-[10px] text-white/35">MENU</p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.04 }}
          type="button"
          onClick={onCartClick}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white"
        >
          <ShoppingBag size={18} />

          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-black text-black"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}
