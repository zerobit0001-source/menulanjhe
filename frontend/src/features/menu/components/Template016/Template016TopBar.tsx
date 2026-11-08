"use client";

import { Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { V016, formatNumber } from "./utils";

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
  "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors active:scale-95";

export default function Template016TopBar({
  shopName,
  searchOpen,
  search,
  onSearchChange,
  onToggleSearch,
  cartCount,
  onCartClick,
}: Props) {
  const style = {
    border: `1px solid ${V016.border}`,
    color: V016.dark,
    backgroundColor: V016.bg,
  } as const;

  return (
    <div
      className="z-20 shrink-0 px-4 pb-2.5 pt-[max(env(safe-area-inset-top),12px)]"
      style={{
        backgroundColor: V016.cream,
        borderBottom: `1px solid ${V016.border}`,
      }}
    >
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-between gap-3">
        <AnimatePresence mode="wait" initial={false}>
          {searchOpen ? (
            <motion.label
              key="search"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.18 }}
              className="flex h-10 flex-1 items-center gap-2 rounded-full px-4"
              style={style}
            >
              <Search size={15} style={{ color: V016.muted }} />

              <input
                autoFocus
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="جستجو در منو..."
                aria-label="جستجو در منو"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#8A715D]/70"
                style={{ color: V016.text }}
              />
            </motion.label>
          ) : (
            <motion.p
              key="name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="truncate text-sm font-black"
              style={{ color: V016.dark }}
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
            style={style}
          >
            {searchOpen ? <X size={17} /> : <Search size={17} />}
          </button>

          <button
            type="button"
            onClick={onCartClick}
            aria-label={`سبد سفارش، ${formatNumber(cartCount)} مورد`}
            className={iconButton}
            style={style}
          >
            <ShoppingBag size={17} />

            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-black"
                style={{ backgroundColor: V016.brown, color: V016.bg }}
              >
                {formatNumber(cartCount)}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
