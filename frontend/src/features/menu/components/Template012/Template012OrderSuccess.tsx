"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { T012, formatPrice } from "./utils";

type Props = {
  orderId: string;
  total: number;
  fullHeight: string;
  onBack: () => void;
};

export default function Template012OrderSuccess({
  orderId,
  total,
  fullHeight,
  onBack,
}: Props) {
  return (
    <div
      dir="rtl"
      className="flex items-center justify-center bg-[#FAF7F2] px-4"
      style={{ minHeight: fullHeight }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex w-full max-w-md flex-col items-center py-10"
      >
        <motion.span
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: T012.accentSoft }}
        >
          <CheckCircle2 size={42} style={{ color: T012.accent }} />
        </motion.span>

        <h1 className="mt-6 text-xl font-black text-[#1F2A24]">
          سفارش شما ثبت شد
        </h1>

        <p className="mt-2 text-center text-sm leading-7 text-[#1F2A24]/60">
          سفارش شما با موفقیت ثبت شد.
          <br />
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </p>

        <div className="mt-6 w-full rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#1F2A24]/60">شماره سفارش</span>

            <span className="font-black text-[#1F2A24]">
              #{orderId.slice(0, 8)}
            </span>
          </div>

          <div className="my-4 h-px bg-black/5" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#1F2A24]/60">مبلغ کل</span>

            <span className="font-black text-[#1F2A24]">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-5 h-14 w-full rounded-full text-sm font-black text-white transition-transform active:scale-[0.98]"
          style={{ backgroundColor: T012.accent }}
        >
          بازگشت به منو
        </button>
      </motion.div>
    </div>
  );
}
