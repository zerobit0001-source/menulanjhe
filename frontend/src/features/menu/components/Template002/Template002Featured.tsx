"use client";

import { Plus, UtensilsCrossed } from "lucide-react";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  products: MenuProduct[];
  onAdd: (product: MenuProduct) => void;
};

export default function Template002Featured({ products, onAdd }: Props) {
  return (
    <section className="mx-auto max-w-2xl px-5 pt-5">
      <p className="mb-3 text-xs font-bold tracking-wide text-[#B8935F]">
        پیشنهاد سرآشپز
      </p>

      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onAdd(product)}
            disabled={!product.available}
            className="
              relative flex w-40 shrink-0 flex-col overflow-hidden rounded-2xl
              border border-[#3A332C] bg-[#241F1B] text-right
              disabled:opacity-40
            "
          >
            <div className="flex h-24 w-full items-center justify-center bg-[#2C2620]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UtensilsCrossed size={22} className="text-[#5A5148]" />
              )}
            </div>

            <div className="flex flex-1 flex-col gap-1 p-3">
              <p className="line-clamp-1 text-xs font-bold text-[#F2EDE4]">
                {product.name}
              </p>
              <p className="text-[11px] font-semibold text-[#B8935F]">
                {product.price.toLocaleString("fa-IR")} تومان
              </p>
            </div>

            <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#B8935F] text-[#1C1815]">
              <Plus size={14} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
