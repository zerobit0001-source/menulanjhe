"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { T013, formatPrice } from "./utils";

type Props = {
  orderId: string;
  total: number;
  fullHeight: string;
  onBack: () => void;
};

export default function Template013OrderSuccess({
  orderId,
  total,
  fullHeight,
  onBack,
}: Props) {
  return (
    <div
      dir="rtl"
      className="flex items-center justify-center px-5"
      style={{
        minHeight: fullHeight,
        backgroundColor: T013.base,
        color: T013.text,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex w-full max-w-md flex-col items-center py-10"
      >
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.1 }}
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ border: `1px solid ${T013.accent}`, color: T013.accent }}
        >
          <Check size={38} />
        </motion.span>

        <h1 className="mt-7 text-xl font-black">سفارش شما ثبت شد</h1>

        <p
          className="mt-2 text-center text-sm leading-7"
          style={{ color: T013.muted }}
        >
          سفارش شما با موفقیت ثبت شد.
          <br />
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </p>

        <div
          className="mt-7 w-full rounded-3xl p-5"
          style={{ backgroundColor: T013.s1, border: `1px solid ${T013.line}` }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: T013.muted }}>
              شماره سفارش
            </span>

            <span className="font-bold">#{orderId.slice(0, 8)}</span>
          </div>

          <div className="my-4 h-px" style={{ backgroundColor: T013.line }} />

          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: T013.muted }}>
              مبلغ کل
            </span>

            <span className="font-black" style={{ color: T013.accent }}>
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 h-14 w-full rounded-full text-sm font-black transition-transform active:scale-[0.98]"
          style={{ backgroundColor: T013.accent, color: T013.accentInk }}
        >
          بازگشت به منو
        </button>
      </motion.div>
    </div>
  );
}
