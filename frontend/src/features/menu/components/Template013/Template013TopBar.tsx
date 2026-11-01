"use client";

import { Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { T013, formatNumber } from "./utils";

type Props = {
  shopName: string;
  searchOpen: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onToggleSearch: () => void;
  cartCount: number;
  onCartClick: () => void;
};

const iconButton =
  "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:brightness-125 active:scale-95";

export default function Template013TopBar({
  shopName,
  searchOpen,
  search,
  onSearchChange,
  onToggleSearch,
  cartCount,
  onCartClick,
}: Props) {
  return (
    <div
      className="z-20 shrink-0 px-5 pt-[max(env(safe-area-inset-top),14px)]"
      style={{ backgroundColor: T013.base }}
    >
      <div className="mx-auto flex h-11 max-w-3xl items-center justify-between gap-3">
        <AnimatePresence mode="wait" initial={false}>
          {searchOpen ? (
            <motion.label
              key="search"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.18 }}
              className="flex h-10 flex-1 items-center gap-2 rounded-full px-4"
              style={{ backgroundColor: T013.s2 }}
            >
              <Search size={16} style={{ color: T013.muted }} />

              <input
                autoFocus
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="جستجو در منو..."
                aria-label="جستجو در منو"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#A8A194]/60"
                style={{ color: T013.text }}
              />
            </motion.label>
          ) : (
            <motion.p
              key="name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="truncate text-sm font-bold"
              style={{ color: T013.accent }}
            >
              {shopName}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSearch}
            aria-label={searchOpen ? "بستن جستجو" : "جستجو"}
            aria-pressed={searchOpen}
            className={iconButton}
            style={{ backgroundColor: T013.s2, color: T013.text }}
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          <button
            type="button"
            onClick={onCartClick}
            aria-label={`سبد سفارش، ${formatNumber(cartCount)} مورد`}
            className={iconButton}
            style={{ backgroundColor: T013.s2, color: T013.text }}
          >
            <ShoppingBag size={18} />

            {cartCount > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-black"
                style={{ backgroundColor: T013.accent, color: T013.accentInk }}
              >
                {formatNumber(cartCount)}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
