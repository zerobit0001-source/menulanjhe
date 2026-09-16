"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import type { MenuProduct } from "../../types/menu.types";
import { useCreatePublicOrderMutation } from "../../api/menuPublicApi";

type CartItem = {
  product: MenuProduct;
  quantity: number;
};

type Props = {
  items: CartItem[];
  total: number;
  sessionToken: string;
  onBack: () => void;
  onSuccess: (order: { id: string; total: number }) => void;
};

export default function Template001Checkout({
  items,
  total,
  sessionToken,
  onBack,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const [createOrder, { isLoading }] = useCreatePublicOrderMutation();

  const handleSubmit = async () => {
    if (!items.length || !sessionToken) {
      return;
    }

    const idempotencyKey = crypto.randomUUID();

    try {
      const result = await createOrder({
        session_token: sessionToken,
        idempotency_key: idempotencyKey,

        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),

        customer: name
          ? {
              name,
            }
          : undefined,

        notes: notes || undefined,
      }).unwrap();

      onSuccess({
        id: result.id,
        total: result.total,
      });
    } catch (error) {
      console.error("Create order failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-5">
        {/* Header */}

        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-lg font-black text-gray-900">ثبت سفارش</h1>

            <p className="mt-1 text-xs text-gray-400">
              اطلاعات سفارش خود را بررسی کنید
            </p>
          </div>
        </div>

        {/* Items */}

        <div className="rounded-2xl border border-gray-200 p-4">
          <h2 className="mb-4 text-sm font-bold text-gray-900">سفارش شما</h2>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {item.product.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {item.quantity} عدد
                  </p>
                </div>

                <p className="shrink-0 text-sm font-bold text-gray-900">
                  {(item.product.price * item.quantity).toLocaleString("fa-IR")}{" "}
                  تومان
                </p>
              </div>
            ))}
          </div>

          <div className="my-4 h-px bg-gray-100" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">مبلغ کل</span>

            <span className="text-base font-black text-gray-900">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        {/* Customer */}

        <div className="mt-4 rounded-2xl border border-gray-200 p-4">
          <h2 className="mb-4 text-sm font-bold text-gray-900">
            اطلاعات سفارش
          </h2>

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-500">
              نام
            </label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="مثلاً امیر"
              className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400"
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-xs font-medium text-gray-500">
              توضیحات
            </label>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="مثلاً بدون شکر"
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none transition focus:border-gray-400"
            />
          </div>
        </div>

        {/* Submit */}

        <button
          type="button"
          disabled={isLoading || !items.length}
          onClick={handleSubmit}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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
