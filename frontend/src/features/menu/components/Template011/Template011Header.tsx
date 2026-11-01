"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

import type { MenuData } from "../../types/menu.types";
import { toFa } from "./utils";

type Props = {
  shop: MenuData["shop"];
  collectionName: string;
  index: number;
  total: number;
  onSearchClick: () => void;
};

export default function Template011Header({
  shop,
  collectionName,
  index,
  total,
  onSearchClick,
}: Props) {
  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 px-4 pt-[max(env(safe-area-inset-top),14px)] text-white">
      <div className="pointer-events-auto mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/25 px-3 py-2 backdrop-blur-xl">
        <div className="flex min-w-0 items-center gap-3">
          {shop.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={shop.logo}
              alt=""
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-black">
              {shop.name.trim().charAt(0)}
            </span>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-black">{shop.name}</p>

            {shop.description && (
              <p className="truncate text-[11px] text-white/65">
                {shop.description}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onSearchClick}
          aria-label="جستجو در منو"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/12 transition-colors hover:bg-white/25"
        >
          <Search size={18} />
        </button>
      </div>

      {total > 0 && (
        <div className="mx-auto mt-3 max-w-2xl px-1">
          <div className="flex items-center justify-between text-xs">
            <span className="rounded-full bg-black/30 px-3 py-1 font-bold backdrop-blur-md">
              {collectionName}
            </span>

            <span className="rounded-full bg-black/30 px-3 py-1 font-semibold tabular-nums backdrop-blur-md">
              {toFa(index + 1)} / {toFa(total)}
            </span>
          </div>

          <div
            className="mt-2 h-0.5 overflow-hidden rounded-full bg-white/20"
            aria-hidden
          >
            <motion.div
              className="h-full rounded-full bg-white"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
