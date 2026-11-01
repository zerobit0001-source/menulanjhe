"use client";

import { Search, ShoppingBag, X } from "lucide-react";

import type { MenuData } from "../../types/menu.types";
import { T012, toFa } from "./utils";

type Props = {
  shop: MenuData["shop"];
  search: string;
  onSearchChange: (value: string) => void;
  /** Name of the selected category, shown as a small caption (empty = all). */
  caption: string;
  cartCount: number;
  onCartClick: () => void;
};

export default function Template012Header({
  shop,
  search,
  onSearchChange,
  caption,
  cartCount,
  onCartClick,
}: Props) {
  return (
    <header className="z-10 shrink-0 border-b border-black/5 bg-[#FAF7F2]/85 px-4 pb-3 pt-[max(env(safe-area-inset-top),14px)] backdrop-blur-xl">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {shop.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.logo}
                alt=""
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                style={{ backgroundColor: T012.accent }}
              >
                {shop.name.trim().charAt(0)}
              </span>
            )}

            <div className="min-w-0">
              <h1 className="truncate text-base font-black text-[#1F2A24]">
                {shop.name}
              </h1>

              <p className="truncate text-xs text-[#1F2A24]/55">
                {caption || shop.description || "همه محصولات"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCartClick}
            aria-label={`سبد سفارش، ${toFa(cartCount)} مورد`}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1F2A24] shadow-sm ring-1 ring-black/5 transition-transform active:scale-95"
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-black text-white"
                style={{ backgroundColor: T012.accent }}
              >
                {toFa(cartCount)}
              </span>
            )}
          </button>
        </div>

        <label className="mt-3 flex h-11 items-center gap-2 rounded-2xl bg-white px-3 shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[#1F6F4A]/50">
          <Search size={18} className="shrink-0 text-[#1F2A24]/45" />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="جستجو در منو..."
            aria-label="جستجو در منو"
            className="h-full w-full bg-transparent text-sm text-[#1F2A24] outline-none placeholder:text-[#1F2A24]/40"
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="پاک کردن جستجو"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#1F2A24]/50 hover:bg-black/5"
            >
              <X size={16} />
            </button>
          )}
        </label>
      </div>
    </header>
  );
}
