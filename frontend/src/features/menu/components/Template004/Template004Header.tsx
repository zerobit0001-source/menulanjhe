"use client";

import { Bell, MapPin, Search, SlidersHorizontal, Store, X } from "lucide-react";
import { IconButton, InputBase } from "@mui/material";

type Props = {
  shop: { name: string; description?: string; logo?: string };
  tableName?: string | null;
  search: string;
  onSearchChange: (value: string) => void;
};

export default function Template004Header({
  shop,
  tableName,
  search,
  onSearchChange,
}: Props) {
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            {shop.logo ? (
              <img
                src={shop.logo}
                alt={shop.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Store size={19} className="text-gray-500" />
            )}
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900">{shop.name}</p>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
              <MapPin size={12} />
              <span>{tableName ? `میز ${tableName}` : "منوی دیجیتال"}</span>
            </div>
          </div>
        </div>

        <IconButton size="small" className="bg-gray-100!">
          <Bell size={18} className="text-gray-700" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#FF9F1C]" />
        </IconButton>
      </div>

      <div className="mx-auto mt-4 flex max-w-2xl items-center gap-2 px-4">
        <div className="flex h-12 flex-1 items-center gap-2 rounded-2xl bg-gray-100 px-4">
          <Search size={18} className="shrink-0 text-gray-400" />

          <InputBase
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="جستجو..."
            fullWidth
            className="text-sm!"
          />

          {search && (
            <IconButton size="small" onClick={() => onSearchChange("")}>
              <X size={16} />
            </IconButton>
          )}
        </div>

        <IconButton size="small" className="h-12! w-12! bg-gray-900!">
          <SlidersHorizontal size={17} className="text-white" />
        </IconButton>
      </div>
    </header>
  );
}
