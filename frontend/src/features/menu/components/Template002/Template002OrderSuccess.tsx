"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";

type Props = {
  orderId: string;
  total: number;
  onBack: () => void;
};

export default function Template002OrderSuccess({
  orderId,
  total,
  onBack,
}: Props) {
  return (
    <div className="min-h-screen bg-[#1C1815] text-[#F2EDE4]">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#B8935F]/40 bg-[#241F1B]">
          <CheckCircle2 size={40} className="text-[#B8935F]" />
        </div>

        <h1 className="mt-6 text-xl font-bold">سفارش شما ثبت شد</h1>

        <p className="mt-2 text-center text-sm text-[#9C9186]">
          سفارش شما با موفقیت ثبت شد.
          <br />
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </p>

        <div className="mt-6 w-full rounded-2xl border border-[#3A332C] bg-[#241F1B] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#9C9186]">شماره سفارش</span>
            <span className="font-bold">#{orderId.slice(0, 8)}</span>
          </div>

          <div className="my-4 h-px bg-[#3A332C]" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#9C9186]">مبلغ کل</span>
            <span className="font-black text-[#B8935F]">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#B8935F] text-sm font-bold text-[#1C1815] transition hover:bg-[#C7A374]"
        >
          بازگشت به منو
          <ArrowLeft size={18} />
        </button>
      </div>
    </div>
  );
}
