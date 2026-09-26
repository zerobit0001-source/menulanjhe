"use client";

import { Plus, UtensilsCrossed } from "lucide-react";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  products: MenuProduct[];
  onAdd: (product: MenuProduct) => void;
};

export default function Template003DailyPicks({ products, onAdd }: Props) {
  return (
    <section className="mx-auto max-w-2xl px-4 pt-1">
      <p className="mb-3 text-sm font-black text-[#1A1A1A]">پیشنهاد امروز</p>

      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative h-40 w-64 shrink-0 overflow-hidden rounded-3xl bg-[#E4E1D8]"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <UtensilsCrossed size={26} className="text-[#B8B4A8]" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
              <div>
                <p className="text-sm font-bold text-white">{product.name}</p>
                <p className="text-xs font-semibold text-white/85">
                  {product.price.toLocaleString("fa-IR")} تومان
                </p>
              </div>

              <button
                type="button"
                onClick={() => onAdd(product)}
                disabled={!product.available}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6B4A] text-white disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
