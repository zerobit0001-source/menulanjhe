"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";

type Props = { orderId: string; total: number; onBack: () => void };

export default function Template003OrderSuccess({
  orderId,
  total,
  onBack,
}: Props) {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0F5C56]/10">
          <CheckCircle2 size={42} className="text-[#0F5C56]" />
        </div>

        <h1 className="mt-6 text-xl font-black text-[#1A1A1A]">
          سفارش شما ثبت شد
        </h1>

        <p className="mt-2 text-center text-sm text-[#7A7A72]">
          سفارش شما با موفقیت ثبت شد.
          <br />
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </p>

        <div className="mt-6 w-full rounded-3xl bg-white p-5 ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#7A7A72]">شماره سفارش</span>
            <span className="font-bold text-[#1A1A1A]">
              #{orderId.slice(0, 8)}
            </span>
          </div>

          <div className="my-4 h-px bg-[#EFEDE5]" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#7A7A72]">مبلغ کل</span>
            <span className="font-black text-[#0F5C56]">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B4A] text-sm font-bold text-white transition hover:opacity-90"
        >
          بازگشت به منو
          <ArrowLeft size={18} />
        </button>
      </div>
    </div>
  );
}
