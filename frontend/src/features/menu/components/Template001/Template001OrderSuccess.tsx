"use client";

import { CheckCircle2, ArrowLeft } from "lucide-react";

type Props = {
  orderId: string;
  total: number;
  onBack: () => void;
};

export default function Template001OrderSuccess({
  orderId,
  total,
  onBack,
}: Props) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 size={42} className="text-emerald-500" />
        </div>

        <h1 className="mt-6 text-xl font-black text-gray-900">
          سفارش شما ثبت شد
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          سفارش شما با موفقیت ثبت شد.
          <br />
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </p>

        <div className="mt-6 w-full rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">شماره سفارش</span>

            <span className="font-bold text-gray-900">
              #{orderId.slice(0, 8)}
            </span>
          </div>

          <div className="my-4 h-px bg-gray-100" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">مبلغ کل</span>

            <span className="font-black text-gray-900">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="
          mt-5
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
          "
        >
          بازگشت به منو
          <ArrowLeft size={18} />
        </button>
      </div>
    </div>
  );
}
