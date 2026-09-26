"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import { useMenuOrder } from "@/features/menu/hooks/useMenuOrder";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type CartItem = { product: MenuProduct; quantity: number };

type Props = {
  items: CartItem[];
  total: number;
  qrToken?: string | null;
  onBack: () => void;
  onSuccess: (order: { id: string; total: number }) => void;
};

export default function Template003Checkout({
  items,
  total,
  qrToken,
  onBack,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const { submitOrder, error, isLoading } = useMenuOrder();

  const handleSubmit = async () => {
    const result = await submitOrder({ items, qrToken, name, notes });
    if (!result) return;
    onSuccess(result);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-black/5"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-lg font-black text-[#1A1A1A]">ثبت سفارش</h1>
            <p className="mt-0.5 text-xs text-[#7A7A72]">
              اطلاعات سفارش خود را بررسی کنید
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 ring-1 ring-black/5">
          <h2 className="mb-4 text-sm font-bold text-[#1A1A1A]">سفارش شما</h2>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    {item.product.name}
                  </p>
                  <p className="mt-1 text-xs text-[#7A7A72]">
                    {item.quantity} عدد
                  </p>
                </div>
                <p className="text-sm font-bold text-[#0F5C56]">
                  {(item.product.price * item.quantity).toLocaleString(
                    "fa-IR",
                  )}{" "}
                  تومان
                </p>
              </div>
            ))}
          </div>

          <div className="my-4 h-px bg-[#EFEDE5]" />

          <div className="flex justify-between">
            <span className="text-sm text-[#7A7A72]">مبلغ کل</span>
            <span className="font-black text-[#1A1A1A]">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-3xl bg-white p-4 ring-1 ring-black/5">
          <h2 className="mb-4 text-sm font-bold text-[#1A1A1A]">
            اطلاعات سفارش
          </h2>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="نام شما"
            className="h-11 w-full rounded-2xl bg-[#F5F4EF] px-3 text-sm outline-none placeholder:text-[#7A7A72]"
          />

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="توضیحات سفارش"
            maxLength={150}
            rows={3}
            className="mt-4 w-full resize-none rounded-2xl bg-[#F5F4EF] px-3 py-3 text-sm outline-none placeholder:text-[#7A7A72]"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <button
          type="button"
          disabled={isLoading || !items.length}
          onClick={handleSubmit}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B4A] text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              در حال ثبت سفارش...
            </>
          ) : (
            <>
              ثبت سفارش
              <ArrowLeft size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
