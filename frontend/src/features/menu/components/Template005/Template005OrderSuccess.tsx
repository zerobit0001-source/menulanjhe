"use client";

import { CheckCircle2 } from "lucide-react";

type Props = {
  orderId: string;
  total: number;
  onBack: () => void;
};

export default function Template005OrderSuccess({
  orderId,
  total,
  onBack,
}: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-sm">
        <CheckCircle2 size={56} className="mx-auto text-emerald-500" />

        <h1 className="mt-5 text-xl font-black text-slate-950">
          سفارش شما ثبت شد
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          سفارش شما با موفقیت ثبت شده است. برای پرداخت به صندوق مراجعه کنید.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-400">شماره سفارش</p>

          <p className="mt-1 break-all text-sm font-black text-slate-900">
            {orderId}
          </p>

          <p className="mt-4 text-xs text-slate-400">مبلغ</p>

          <p className="mt-1 font-black text-slate-950">
            {total.toLocaleString("fa-IR")} تومان
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 w-full rounded-2xl bg-slate-950 py-4 text-sm font-black text-white"
        >
          بازگشت به منو
        </button>
      </div>
    </main>
  );
}
