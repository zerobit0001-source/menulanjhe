"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { E017, formatPrice } from "./utils";

type Props = {
  orderId: string;
  total: number;
  onBack: () => void;
};

export default function Template017OrderSuccess({ orderId, total, onBack }: Props) {
  return (
    <div dir="rtl" className="mx-auto flex min-h-full max-w-xl flex-col justify-center px-5 py-12">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 16 }}
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: E017.accent, color: E017.surface }}
      >
        <Check size={28} />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <h1 className="mt-6 text-4xl font-black leading-tight">
          سفارش شما ثبت شد
        </h1>

        <p className="mt-3 text-sm leading-7" style={{ color: E017.muted }}>
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </p>

        <dl className="mt-8" style={{ borderBottom: `1px solid ${E017.border}` }}>
          <div
            className="flex items-baseline justify-between py-4"
            style={{ borderTop: `1px solid ${E017.border}` }}
          >
            <dt className="text-sm" style={{ color: E017.muted }}>
              شماره سفارش
            </dt>

            <dd className="font-black">#{orderId.slice(0, 8)}</dd>
          </div>

          <div
            className="flex items-baseline justify-between py-4"
            style={{ borderTop: `1px solid ${E017.border}` }}
          >
            <dt className="text-sm" style={{ color: E017.muted }}>
              مبلغ کل
            </dt>

            <dd className="text-xl font-black" style={{ color: E017.accent }}>
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={onBack}
          className="mt-8 h-14 w-full rounded-full text-sm font-black transition-transform active:scale-[0.98]"
          style={{ backgroundColor: E017.text, color: E017.surface }}
        >
          بازگشت به منو
        </button>
      </motion.div>
    </div>
  );
}
