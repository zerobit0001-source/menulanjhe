"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, X } from "lucide-react";

import { TechLabel } from "./TechDetails";
import { N018, formatNumber } from "./utils";

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
  "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors active:scale-95";

export default function Template018Header({
  shopName,
  logo,
  searchOpen,
  search,
  onSearchChange,
  onToggleSearch,
  cartCount,
  onCartClick,
}: Props) {
  const ring = {
    border: `1px solid ${N018.line}`,
    color: N018.fg,
    backgroundColor: N018.panel,
  } as const;

  return (
    <header
      className="z-20 shrink-0 px-4 pb-2.5 pt-[max(env(safe-area-inset-top),12px)] sm:px-8"
      style={{ backgroundColor: N018.bg, borderBottom: `1px solid ${N018.line}` }}
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
              className="flex h-10 flex-1 items-center gap-2 rounded-xl px-3.5"
              style={ring}
            >
              <Search size={15} style={{ color: N018.accent }} />

              <input
                autoFocus
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="جستجو در منو..."
                aria-label="جستجو در منو"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#D9DADC]/50"
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
                  className="h-8 w-8 shrink-0 rounded-lg object-cover"
                  style={{ border: `1px solid ${N018.line}` }}
                />
              )}

              <p className="truncate text-sm font-black">{shopName}</p>

              <span
                className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1"
                style={{ border: `1px solid ${N018.line}` }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: N018.accent }}
                />
                <TechLabel>menu</TechLabel>
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
                className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-[10px] font-black"
                style={{ backgroundColor: N018.accent, color: N018.bg }}
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
