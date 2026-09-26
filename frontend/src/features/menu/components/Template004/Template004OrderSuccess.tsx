"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";

type Props = { orderId: string; total: number; onBack: () => void };

export default function Template004OrderSuccess({
  orderId,
  total,
  onBack,
}: Props) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF9F1C]/10">
          <CheckCircle2 size={42} className="text-[#FF9F1C]" />
        </div>

        <h1 className="mt-6 text-xl font-black text-gray-900">
          سفارش شما ثبت شد
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          سفارش شما با موفقیت ثبت شد.
          <br />
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </p>

        <div className="mt-6 w-full rounded-3xl bg-gray-50 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">شماره سفارش</span>
            <span className="font-bold text-gray-900">
              #{orderId.slice(0, 8)}
            </span>
          </div>

          <div className="my-4 h-px bg-gray-200" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">مبلغ کل</span>
            <span className="font-black text-gray-900">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#FF9F1C] text-sm font-bold text-white transition hover:opacity-90"
        >
          بازگشت به منو
          <ArrowLeft size={18} />
        </button>
      </div>
    </div>
  );
}
