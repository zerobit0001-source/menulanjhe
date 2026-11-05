"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { P015, formatPrice } from "./utils";

type Props = {
  orderId: string;
  total: number;
  fullHeight: string;
  onBack: () => void;
};

export default function Template015OrderSuccess({
  orderId,
  total,
  fullHeight,
  onBack,
}: Props) {
  return (
    <div
      dir="rtl"
      className="relative flex items-center justify-center overflow-hidden px-4"
      style={{
        minHeight: fullHeight,
        backgroundColor: P015.bg,
        color: P015.text,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: P015.soft }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative flex w-full max-w-md flex-col items-center py-10"
      >
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.1 }}
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: P015.soft, color: P015.accentStrong }}
        >
          <Check size={38} />
        </motion.span>

        <h1 className="mt-7 text-xl font-black">سفارش شما ثبت شد</h1>

        <p
          className="mt-2 text-center text-sm leading-7"
          style={{ color: P015.muted }}
        >
          سفارش شما با موفقیت ثبت شد.
          <br />
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </p>

        <div
          className="mt-7 w-full rounded-3xl bg-white/80 p-5 backdrop-blur-md"
          style={{ border: `1px solid ${P015.border}` }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: P015.muted }}>
              شماره سفارش
            </span>

            <span className="font-black">#{orderId.slice(0, 8)}</span>
          </div>

          <div
            className="my-4 h-px"
            style={{ backgroundColor: P015.border }}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: P015.muted }}>
              مبلغ کل
            </span>

            <span className="font-black" style={{ color: P015.accentStrong }}>
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 h-14 w-full rounded-full text-sm font-black text-white transition-transform active:scale-[0.98]"
          style={{ backgroundColor: P015.accentStrong }}
        >
          بازگشت به منو
        </button>
      </motion.div>
    </div>
  );
}
