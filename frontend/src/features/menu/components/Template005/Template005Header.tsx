"use client";

import { ShoppingBag } from "lucide-react";

import type { MenuData } from "@/features/menu/types/menu.types";

type Props = {
  shop: MenuData["shop"];
  cartCount: number;
  onCartClick: () => void;
};

export default function Template005Header({
  shop,
  cartCount,
  onCartClick,
}: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div>
          <h1 className="text-base font-black text-slate-900">{shop.name}</h1>

          {shop.description && (
            <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-400">
              {shop.description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onCartClick}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800"
          aria-label="سبد خرید"
        >
          <ShoppingBag size={19} />

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-black text-slate-900 shadow-sm ring-1 ring-slate-100">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
