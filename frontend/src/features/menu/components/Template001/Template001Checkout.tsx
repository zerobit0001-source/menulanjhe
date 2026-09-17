"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import { useCreatePublicOrderMutation } from "../../api/menuPublicApi";
import { PublicMenuProduct } from "../../types/menu.types";

type CartItem = {
  product: PublicMenuProduct;
  quantity: number;
};

type Props = {
  items: CartItem[];
  total: number;
  sessionToken?: string | null;
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

  const [error, setError] = useState("");

  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const [createOrder, { isLoading }] = useCreatePublicOrderMutation();

  const handleSubmit = async () => {
    if (!items.length || !sessionToken) {
      return;
    }

    setError("");

    try {
      const result = await createOrder({
        session_token: sessionToken,

        idempotency_key: idempotencyKey,

        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),

        customer: name.trim()
          ? {
              name: name.trim(),
            }
          : undefined,

        notes: notes.trim() ? notes.trim() : undefined,
      }).unwrap();

      onSuccess({
        id: result.id,
        total: result.total,
      });
    } catch (error) {
      console.error(error);

      setError("ثبت سفارش انجام نشد. لطفاً دوباره تلاش کنید.");
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
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.product.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {item.quantity} عدد
                  </p>
                </div>

                <p className="text-sm font-bold">
                  {(item.product.price * item.quantity).toLocaleString("fa-IR")}{" "}
                  تومان
                </p>
              </div>
            ))}
          </div>

          <div className="my-4 h-px bg-gray-100" />

          <div className="flex justify-between">
            <span className="text-sm text-gray-500">مبلغ کل</span>

            <span className="font-black">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        {/* Customer */}

        <div className="mt-4 rounded-2xl border border-gray-200 p-4">
          <h2 className="mb-4 text-sm font-bold">اطلاعات سفارش</h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام شما"
            className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none"
          />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="توضیحات سفارش"
            rows={3}
            className="mt-4 w-full resize-none rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        {/* Submit */}

        <button
          disabled={isLoading || !items.length}

          onClick={handleSubmit}

          className="
          mt-4
          flex
          h-12
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gray-900
          text-sm
          font-bold
          text-white
          disabled:opacity-50
          "
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
