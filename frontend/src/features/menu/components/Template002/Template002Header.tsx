"use client";

import { ShoppingBag, UtensilsCrossed } from "lucide-react";
import { IconButton } from "@mui/material";

type Props = {
  shop: {
    name: string;
    description?: string;
    logo?: string;
  };
  cartCount: number;
  onCartClick: () => void;
};

export default function Template002Header({
  shop,
  cartCount,
  onCartClick,
}: Props) {
  return (
    <header className="border-b border-[#B8935F]/25 bg-[#1C1815]">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 pb-5 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#B8935F]/40 bg-[#241F1B]">
            {shop.logo ? (
              <img
                src={shop.logo}
                alt={shop.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UtensilsCrossed size={18} className="text-[#B8935F]" />
            )}
          </div>

          <div>
            <p className="text-base font-bold text-[#F2EDE4]">{shop.name}</p>
            {shop.description && (
              <p className="mt-0.5 text-[11px] text-[#9C9186]">
                {shop.description}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <IconButton
            onClick={onCartClick}
            size="small"
            className="border! border-[#B8935F]/30! bg-[#241F1B]!"
          >
            <ShoppingBag size={18} className="text-[#F2EDE4]" />
          </IconButton>

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B8935F] px-1 text-[10px] font-bold text-[#1C1815]">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5">
        <div className="h-px w-full bg-gradient-to-l from-[#B8935F] via-[#B8935F]/40 to-transparent" />
      </div>
    </header>
  );
}
