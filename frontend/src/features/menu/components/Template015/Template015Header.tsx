"use client";

import { Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { P015, formatNumber } from "./utils";

type Props = {
  shopName: string;
  description?: string;
  searchOpen: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onToggleSearch: () => void;
  cartCount: number;
  onCartClick: () => void;
};

const iconButton =
  "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors active:scale-95";

export default function Template015Header({
  shopName,
  description,
  searchOpen,
  search,
  onSearchChange,
  onToggleSearch,
  cartCount,
  onCartClick,
}: Props) {
  const glass = {
    backgroundColor: "rgba(255,255,255,0.7)",
    border: `1px solid ${P015.border}`,
    color: P015.text,
  } as const;

  return (
    <header
      className="z-20 shrink-0 bg-[#F8F7F4]/70 px-4 pb-3 pt-[max(env(safe-area-inset-top),14px)] backdrop-blur-xl"
      style={{ borderBottom: `1px solid ${P015.border}` }}
    >
      <div className="mx-auto flex h-12 max-w-2xl items-center justify-between gap-3">
        <AnimatePresence mode="wait" initial={false}>
          {searchOpen ? (
            <motion.label
              key="search"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.18 }}
              className="flex h-11 flex-1 items-center gap-2 rounded-2xl bg-white px-4"
              style={{ border: `1px solid ${P015.border}` }}
            >
              <Search size={16} style={{ color: P015.muted }} />

              <input
                autoFocus
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="جستجو در همه دسته‌ها..."
                aria-label="جستجو در منو"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#6F6760]/60"
                style={{ color: P015.text }}
              />
            </motion.label>
          ) : (
            <motion.div
              key="name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="min-w-0"
            >
              <h1 className="truncate text-lg font-black leading-7">
                {shopName}
              </h1>

              {description && (
                <p className="truncate text-xs" style={{ color: P015.muted }}>
                  {description}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSearch}
            aria-label={searchOpen ? "بستن جستجو" : "جستجو"}
            aria-pressed={searchOpen}
            className={iconButton}
            style={glass}
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          <button
            type="button"
            onClick={onCartClick}
            aria-label={`سبد سفارش، ${formatNumber(cartCount)} مورد`}
            className={iconButton}
            style={glass}
          >
            <ShoppingBag size={18} />

            {cartCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-black text-white"
                style={{ backgroundColor: P015.accentStrong }}
              >
                {formatNumber(cartCount)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
