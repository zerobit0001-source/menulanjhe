"use client";

import { Search, ShoppingBag, Store, X } from "lucide-react";
import { IconButton, InputBase } from "@mui/material";

type Props = {
  shop: { name: string; description?: string; logo?: string };
  cartCount: number;
  search: string;
  onSearchChange: (value: string) => void;
};

export default function Template003Header({
  shop,
  cartCount,
  search,
  onSearchChange,
}: Props) {
  return (
    <header className="rounded-b-[32px] bg-[#0F5C56] pb-6 pt-6">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white/15">
            {shop.logo ? (
              <img
                src={shop.logo}
                alt={shop.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Store size={19} className="text-white" />
            )}
          </div>

          <div>
            <p className="text-base font-black text-white">{shop.name}</p>
            {shop.description && (
              <p className="mt-0.5 text-[11px] text-white/70">
                {shop.description}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <IconButton size="small" className="bg-white/15!">
            <ShoppingBag size={19} className="text-white" />
          </IconButton>

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF6B4A] px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-2xl px-4">
        <div className="flex h-12 items-center gap-2 rounded-2xl bg-white px-4 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.25)]">
          <Search size={18} className="shrink-0 text-[#7A7A72]" />

          <InputBase
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="دنبال چی می‌گردی؟"
            fullWidth
            className="text-sm!"
          />

          {search && (
            <IconButton size="small" onClick={() => onSearchChange("")}>
              <X size={16} />
            </IconButton>
          )}
        </div>
      </div>
    </header>
  );
}
