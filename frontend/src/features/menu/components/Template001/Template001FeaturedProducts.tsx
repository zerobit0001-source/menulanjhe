"use client";

import { ChevronLeft, Plus } from "lucide-react";
import type { MenuProduct } from "../../types/menu.types";

type Props = {
  title: string;
  products: MenuProduct[];
  onAdd: (product: MenuProduct) => void;
};

export default function Template001FeaturedProducts({
  title,
  products,
  onAdd,
}: Props) {
  if (!products.length) return null;

  return (
    <section className="mx-auto max-w-2xl px-4 pb-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>

        <button
          type="button"
          className="flex items-center text-xs text-gray-400"
        >
          مشاهده همه
          <ChevronLeft size={15} />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {products.map((product) => (
          <article
            key={product.id}
            className="w-36 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white"
          >
            <div className="relative flex h-28 items-center justify-center bg-gray-50">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl">🍔</span>
              )}

              {product.discountPercent && (
                <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
                  {product.discountPercent}٪
                </span>
              )}
            </div>

            <div className="p-3">
              <h3 className="truncate text-xs font-bold text-gray-900">
                {product.name}
              </h3>

              <div className="mt-2 flex items-center justify-between gap-2">
                <div>
                  {product.originalPrice && (
                    <p className="text-[9px] text-gray-400 line-through">
                      {product.originalPrice.toLocaleString("fa-IR")}
                    </p>
                  )}

                  <p className="text-[11px] font-bold text-gray-800">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!product.available}
                  onClick={() => onAdd(product)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white disabled:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
