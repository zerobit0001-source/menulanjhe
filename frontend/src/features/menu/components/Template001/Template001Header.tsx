"use client";

import { ShoppingBag, Store } from "lucide-react";
import { IconButton } from "@mui/material";

type Props = {
  shop: {
    name: string;
    logo?: string;
  };
  cartCount: number;
  onCartClick: () => void;
};

export default function Template001Header({
  shop,
  cartCount,
  onCartClick,
}: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
            {shop.logo ? (
              <img
                src={shop.logo}
                alt={shop.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Store size={20} className="text-gray-500" />
            )}
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900">{shop.name}</p>
            <p className="text-[11px] text-gray-400">منوی دیجیتال</p>
          </div>
        </div>

        <div className="relative">
          <IconButton
            onClick={onCartClick}
            size="small"
            className="bg-gray-50!"
          >
            <ShoppingBag size={20} />
          </IconButton>

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
