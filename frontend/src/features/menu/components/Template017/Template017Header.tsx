"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, X } from "lucide-react";

import { E017, formatNumber } from "./utils";

type Props = {
  shopName: string;
  logo?: string;
  searchOpen: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onToggleSearch: () => void;
  cartCount: number;
  onCartClick: () => void;
};

const iconButton =
  "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors active:scale-95";

export default function Template017Header({
  shopName,
  logo,
  searchOpen,
  search,
  onSearchChange,
  onToggleSearch,
  cartCount,
  onCartClick,
}: Props) {
  const ring = { border: `1px solid ${E017.border}`, color: E017.text } as const;

  return (
    <header
      className="z-20 shrink-0 px-4 pb-2.5 pt-[max(env(safe-area-inset-top),12px)] sm:px-8"
      style={{ backgroundColor: E017.bg, borderBottom: `1px solid ${E017.border}` }}
    >
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-between gap-3">
        <AnimatePresence mode="wait" initial={false}>
          {searchOpen ? (
            <motion.label
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex h-10 flex-1 items-center gap-2 rounded-full px-4"
              style={{ ...ring, backgroundColor: E017.surface }}
            >
              <Search size={15} style={{ color: E017.muted }} />

              <input
                autoFocus
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="جستجو در منو..."
                aria-label="جستجو در منو"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#6B655C]/70"
              />
            </motion.label>
          ) : (
            <motion.div
              key="brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex min-w-0 items-center gap-3"
            >
              {logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo}
                  alt=""
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
              )}

              <p className="truncate text-sm font-black">{shopName}</p>

              <span
                className="hidden shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold sm:inline"
                style={{ border: `1px solid ${E017.border}`, color: E017.muted }}
              >
                منو
              </span>
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
            style={ring}
          >
            {searchOpen ? <X size={17} /> : <Search size={17} />}
          </button>

          <button
            type="button"
            onClick={onCartClick}
            aria-label={`سبد سفارش، ${formatNumber(cartCount)} مورد`}
            className={iconButton}
            style={ring}
          >
            <ShoppingBag size={17} />

            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-black"
                style={{ backgroundColor: E017.accent, color: E017.surface }}
              >
                {formatNumber(cartCount)}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
