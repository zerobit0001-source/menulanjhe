"use client";

import { Minus, Plus } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  product: MenuProduct;
  quantity: number;
  onAdd: (product: MenuProduct) => void;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template005ProductCard({
  product,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <article className="flex gap-4 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
            بدون تصویر
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-black text-slate-950">{product.name}</h3>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-6 text-slate-400">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <span className="text-sm font-black text-slate-950">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => onAdd(product)}
              disabled={!product.available}
              className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              افزودن
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => onIncrease(product)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-900 shadow-sm"
              >
                <Plus size={15} />
              </button>

              <span className="min-w-5 text-center text-xs font-black">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => onDecrease(product)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-900 shadow-sm"
              >
                <Minus size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
