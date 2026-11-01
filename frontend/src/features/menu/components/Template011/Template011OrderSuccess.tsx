"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { T011, formatPrice } from "./utils";

type Props = {
  orderId: string;
  total: number;
  fullHeight: string;
  onBack: () => void;
};

export default function Template011OrderSuccess({
  orderId,
  total,
  fullHeight,
  onBack,
}: Props) {
  return (
    <div
      dir="rtl"
      className="relative flex items-center justify-center overflow-hidden bg-neutral-950 px-4 text-white"
      style={{ minHeight: fullHeight }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45 }}
        className="relative flex w-full max-w-md flex-col items-center py-10"
      >
        <motion.span
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15"
        >
          <CheckCircle2 size={42} className="text-emerald-400" />
        </motion.span>

        <h1 className="mt-6 text-xl font-black">سفارش شما ثبت شد</h1>

        <p className="mt-2 text-center text-sm leading-7 text-white/65">
          سفارش شما با موفقیت ثبت شد.
          <br />
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </p>

        <div className={`mt-6 w-full rounded-3xl p-5 ${T011.glass}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/65">شماره سفارش</span>

            <span className="font-bold">#{orderId.slice(0, 8)}</span>
          </div>

          <div className="my-4 h-px bg-white/10" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-white/65">مبلغ کل</span>

            <span className="font-black">{formatPrice(total)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-5 h-14 w-full rounded-full text-sm font-black transition-transform active:scale-[0.98]"
          style={{ backgroundColor: T011.accent, color: T011.accentInk }}
        >
          بازگشت به منو
        </button>
      </motion.div>
    </div>
  );
}
