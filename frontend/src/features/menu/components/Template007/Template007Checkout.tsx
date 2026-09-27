"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

export default function Template007Checkout({
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
    <div className="min-h-screen bg-[#120D09] text-[#F5EBDD]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-xl px-4 py-6 sm:px-6"
      >
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5EBDD]/[0.08] bg-[#241811]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-lg font-bold text-[#F5EBDD]">ثبت سفارش</h1>
            <p className="mt-0.5 text-xs text-[#CDBEAE]">
              اطلاعات سفارش خود را بررسی کنید
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#F5EBDD]/[0.08] bg-[#18110C] p-4">
          <h2 className="mb-4 text-sm font-bold text-[#F5EBDD]">سفارش شما</h2>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#F5EBDD]">
                    {item.product.name}
                  </p>
                  <p className="mt-1 text-xs text-[#CDBEAE]">
                    {item.quantity} عدد
                  </p>
                </div>
                <p className="text-sm font-bold text-[#B98252]">
                  {(item.product.price * item.quantity).toLocaleString(
                    "fa-IR",
                  )}{" "}
                  تومان
                </p>
              </div>
            ))}
          </div>

          <div className="my-4 h-px bg-[#F5EBDD]/[0.08]" />

          <div className="flex justify-between">
            <span className="text-sm text-[#CDBEAE]">مبلغ کل</span>
            <span className="font-black text-[#F5EBDD]">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[#F5EBDD]/[0.08] bg-[#18110C] p-4">
          <h2 className="mb-4 text-sm font-bold text-[#F5EBDD]">
            اطلاعات سفارش
          </h2>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="نام شما"
            className="h-11 w-full rounded-xl border border-[#F5EBDD]/[0.08] bg-[#120D09] px-3 text-sm text-[#F5EBDD] outline-none transition-colors focus:border-[#B98252] placeholder:text-[#8A7A6C]"
          />

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="توضیحات سفارش"
            maxLength={150}
            rows={3}
            className="mt-4 w-full resize-none rounded-xl border border-[#F5EBDD]/[0.08] bg-[#120D09] px-3 py-3 text-sm text-[#F5EBDD] outline-none transition-colors focus:border-[#B98252] placeholder:text-[#8A7A6C]"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <motion.button
          type="button"
          disabled={isLoading || !items.length}
          onClick={handleSubmit}
          whileTap={{ scale: 0.98 }}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#B98252] text-sm font-bold text-[#18110C] transition-colors hover:bg-[#CDA173] disabled:opacity-50"
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
        </motion.button>
      </motion.div>
    </div>
  );
}
