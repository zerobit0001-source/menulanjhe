"use client";

import { X } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";

type CartItem = {
  product: MenuProduct;
  quantity: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  onCheckout: () => void;
};

export default function Template005CartDrawer({
  open,
  onClose,
  items,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        aria-label="بستن"
      />

      <div className="absolute bottom-0 left-0 right-0 mx-auto max-h-[85vh] max-w-xl overflow-hidden rounded-t-[2rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="font-black text-slate-950">سبد خرید</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-400">
              سبد خرید خالی است.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="rounded-2xl bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {product.price.toLocaleString("fa-IR")} تومان
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemove(product)}
                      className="text-xs font-bold text-red-400"
                    >
                      حذف
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onIncrease(product)}
                      className="h-8 w-8 rounded-lg bg-white text-sm font-black shadow-sm"
                    >
                      +
                    </button>

                    <span className="min-w-6 text-center text-xs font-black">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => onDecrease(product)}
                      className="h-8 w-8 rounded-lg bg-white text-sm font-black shadow-sm"
                    >
                      −
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">مبلغ کل</span>

            <span className="font-black text-slate-950">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            disabled={!items.length}
            className="w-full rounded-2xl bg-slate-950 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            ادامه سفارش
          </button>
        </div>
      </div>
    </div>
  );
}
