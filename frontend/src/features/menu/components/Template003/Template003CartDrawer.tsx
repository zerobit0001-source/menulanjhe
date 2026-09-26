"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Drawer, IconButton } from "@mui/material";

import type { MenuProduct } from "@/features/menu/types/menu.types";

type CartItem = { product: MenuProduct; quantity: number };

type Props = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  total: number;
  onCheckout: () => void;
};

export default function Template003CartDrawer({
  open,
  onClose,
  items,
  onIncrease,
  onDecrease,
  onRemove,
  total,
  onCheckout,
}: Props) {
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: { className: "rounded-t-[32px]! overflow-hidden bg-[#FAFAF7]!" },
      }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-black text-[#1A1A1A]">سبد سفارش</p>
            <p className="text-xs text-[#7A7A72]">{itemsCount} آیتم</p>
          </div>

          <IconButton onClick={onClose} size="small" className="bg-white!">
            <X size={17} />
          </IconButton>
        </div>

        <div className="max-h-[55vh] overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white ring-1 ring-black/5">
                <ShoppingBag size={26} className="text-[#C7C3B6]" />
              </div>
              <p className="text-sm font-bold text-[#1A1A1A]">سبد خالیه</p>
              <p className="mt-1 text-xs text-[#7A7A72]">
                چیزی که دوست داری رو اضافه کن
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 rounded-3xl bg-white p-3 ring-1 ring-black/5 mb-3"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F0EEE6]">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ShoppingBag size={20} className="text-[#C7C3B6]" />
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-[#1A1A1A]">
                      {item.product.name}
                    </p>
                    <IconButton
                      size="small"
                      onClick={() => onRemove(item.product)}
                      className="h-6! w-6! text-[#C7C3B6]!"
                    >
                      <Trash2 size={13} />
                    </IconButton>
                  </div>

                  <p className="mt-1 text-xs text-[#7A7A72]">
                    {item.product.price.toLocaleString("fa-IR")} تومان
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 rounded-full bg-[#F0EEE6] px-1 py-1">
                      <button
                        type="button"
                        onClick={() => onDecrease(item.product)}
                        className="flex h-6 w-6 items-center justify-center"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-4 text-center text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onIncrease(item.product)}
                        className="flex h-6 w-6 items-center justify-center"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <p className="text-sm font-bold text-[#0F5C56]">
                      {(item.product.price * item.quantity).toLocaleString(
                        "fa-IR",
                      )}{" "}
                      تومان
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 pb-5 pt-2">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-[#1A1A1A]">
                مبلغ نهایی
              </span>
              <span className="text-lg font-black text-[#0F5C56]">
                {total.toLocaleString("fa-IR")} تومان
              </span>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="h-12 w-full rounded-2xl bg-[#FF6B4A] text-sm font-bold text-white transition hover:opacity-90"
            >
              ثبت سفارش
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
}
