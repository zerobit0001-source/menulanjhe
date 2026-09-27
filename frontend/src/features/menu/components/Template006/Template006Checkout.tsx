"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";

import { useMenuOrder } from "@/features/menu/hooks/useMenuOrder";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type CartItem = {
  product: MenuProduct;
  quantity: number;
};

type Props = {
  items: CartItem[];
  total: number;
  qrToken?: string | null;
  onBack: () => void;
  onSuccess: (order: { id: string; total: number }) => void;
};

export default function Template006Checkout({
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
    const result = await submitOrder({
      items,
      qrToken,
      name,
      notes,
    });

    if (!result) return;

    onSuccess(result);
  };

  return (
    <main className="min-h-screen bg-[#08090B] px-4 py-6 text-white">
      <div className="mx-auto max-w-xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-7 flex items-center gap-2 text-sm font-bold text-white/40 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          برگشت
        </button>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-5"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
            Checkout
          </p>

          <h1 className="mt-2 text-2xl font-black">ثبت سفارش</h1>

          <div className="mt-7 space-y-3">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"
              >
                <div>
                  <p className="text-sm font-bold">{product.name}</p>

                  <p className="mt-1 text-xs text-white/30">
                    تعداد: {quantity}
                  </p>
                </div>

                <span className="text-xs font-black text-white/70">
                  {(product.price * quantity).toLocaleString("fa-IR")} تومان
                </span>
              </div>
            ))}
          </div>

          <div className="my-6 h-px bg-white/[0.07]" />

          <div className="space-y-4">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="نام شما (اختیاری)"
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/20"
            />

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="توضیحات سفارش (اختیاری)"
              rows={4}
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/20"
            />
          </div>

          {error && (
            <p className="mt-4 rounded-xl bg-red-500/10 p-3 text-xs font-bold text-red-400">
              {error}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-white/30">مبلغ نهایی</span>

            <span className="text-lg font-black">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !items.length}
            className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-black transition disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            ثبت سفارش
          </button>
        </motion.div>
      </div>
    </main>
  );
}
