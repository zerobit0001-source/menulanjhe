"use client";

import { Minus, Plus, UtensilsCrossed } from "lucide-react";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  product: MenuProduct;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function Template003ProductCard({
  product,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 ${
        !product.available ? "opacity-40" : ""
      }`}
    >
      <div className="relative aspect-square w-full bg-[#F0EEE6]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UtensilsCrossed size={22} className="text-[#C7C3B6]" />
          </div>
        )}

        {product.available &&
          (quantity === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B4A] text-white shadow-md"
            >
              <Plus size={16} />
            </button>
          ) : (
            <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-white px-1.5 py-1 shadow-md">
              <button
                type="button"
                onClick={onIncrease}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B4A] text-white"
              >
                <Plus size={12} />
              </button>
              <span className="w-3 text-center text-xs font-bold text-[#1A1A1A]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={onDecrease}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0EEE6] text-[#1A1A1A]"
              >
                <Minus size={12} />
              </button>
            </div>
          ))}
      </div>

      <div className="p-3">
        <p className="line-clamp-1 text-xs font-bold text-[#1A1A1A]">
          {product.name}
        </p>

        {!product.available ? (
          <p className="mt-1 text-[11px] font-semibold text-[#7A7A72]">
            ناموجود
          </p>
        ) : (
          <p className="mt-1 text-xs font-bold text-[#0F5C56]">
            {product.price.toLocaleString("fa-IR")} تومان
          </p>
        )}
      </div>
    </div>
  );
}
