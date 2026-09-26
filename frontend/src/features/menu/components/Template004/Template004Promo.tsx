"use client";

import { UtensilsCrossed } from "lucide-react";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  products: MenuProduct[];
  onAdd: (product: MenuProduct) => void;
};

const BANNER_BG = ["#DCEEDB", "#DCEAF6"];

export default function Template004Promo({ products, onAdd }: Props) {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-4">
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
        {products.slice(0, 4).map((product, index) => (
          <div
            key={product.id}
            className="relative flex h-36 w-64 shrink-0 items-center overflow-hidden rounded-2xl px-4"
            style={{ backgroundColor: BANNER_BG[index % BANNER_BG.length] }}
          >
            <div className="relative z-10 max-w-[55%]">
              <p className="text-sm font-black leading-5 text-gray-900">
                {product.name}
              </p>
              <p className="mt-1 text-xs font-semibold text-gray-500">
                {product.price.toLocaleString("fa-IR")} تومان
              </p>

              <button
                type="button"
                onClick={() => onAdd(product)}
                disabled={!product.available}
                className="mt-3 rounded-full bg-[#FF9F1C] px-3 py-1.5 text-[11px] font-bold text-white disabled:opacity-40"
              >
                افزودن به سبد
              </button>
            </div>

            <div className="absolute -left-4 bottom-0 h-28 w-28 shrink-0">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain drop-shadow-lg"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <UtensilsCrossed size={30} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
