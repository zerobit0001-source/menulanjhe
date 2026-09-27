"use client";

import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  products: MenuProduct[];
  onAdd: (product: MenuProduct) => void;
};

export default function Template005FeaturedProducts({
  products,
  onAdd,
}: Props) {
  if (!products.length) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-6">
      <div className="mb-4">
        <h2 className="text-lg font-black text-slate-950">پیشنهاد ویژه</h2>

        <p className="mt-1 text-xs text-slate-400">انتخاب‌های محبوب</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-64 shrink-0 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100"
          >
            <div className="h-36 bg-slate-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                  بدون تصویر
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-black text-slate-900">{product.name}</h3>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-sm font-black text-slate-950">
                  {product.price.toLocaleString("fa-IR")} تومان
                </span>

                <button
                  type="button"
                  onClick={() => onAdd(product)}
                  disabled={!product.available}
                  className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  افزودن
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
