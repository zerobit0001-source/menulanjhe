"use client";

import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { T014 } from "./utils";

type Props = {
  shopName: string;
  description?: string;
  searchOpen: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onToggleSearch: () => void;
};

export default function Template014TopBar({
  shopName,
  description,
  searchOpen,
  search,
  onSearchChange,
  onToggleSearch,
}: Props) {
  return (
    <header
      className="z-20 shrink-0 px-4 pt-[max(env(safe-area-inset-top),14px)]"
      style={{ backgroundColor: T014.base }}
    >
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-3">
        <AnimatePresence mode="wait" initial={false}>
          {searchOpen ? (
            <motion.label
              key="search"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.18 }}
              className="flex h-11 flex-1 items-center gap-2 rounded-2xl px-4"
              style={{
                backgroundColor: T014.s1,
                border: `1px solid ${T014.line}`,
              }}
            >
              <Search size={16} style={{ color: T014.muted }} />

              <input
                autoFocus
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="جستجو در همه دسته‌ها..."
                aria-label="جستجو در منو"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#B7A69A]/60"
                style={{ color: T014.text }}
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
              <h1
                className="truncate text-base font-black leading-6"
                style={{ color: T014.text }}
              >
                {shopName}
              </h1>

              {description && (
                <p
                  className="truncate text-[11px]"
                  style={{ color: T014.muted }}
                >
                  {description}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={onToggleSearch}
          aria-label={searchOpen ? "بستن جستجو" : "جستجو"}
          aria-pressed={searchOpen}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors hover:brightness-125 active:scale-95"
          style={{
            backgroundColor: T014.s1,
            border: `1px solid ${T014.line}`,
            color: T014.text,
          }}
        >
          {searchOpen ? <X size={18} /> : <Search size={18} />}
        </button>
      </div>
    </header>
  );
}
