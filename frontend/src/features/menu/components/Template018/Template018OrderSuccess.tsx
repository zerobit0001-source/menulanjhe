"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { CornerTicks, TechLabel } from "./TechDetails";
import { N018, formatPrice } from "./utils";

type Props = {
  orderId: string;
  total: number;
  onBack: () => void;
};

export default function Template018OrderSuccess({ orderId, total, onBack }: Props) {
  return (
    <div dir="rtl" className="mx-auto flex min-h-full max-w-md flex-col justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl p-6"
        style={{ border: `1px solid ${N018.line}`, backgroundColor: N018.panel }}
      >
        <CornerTicks color={N018.accent} />

        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.1 }}
          className="flex h-14 w-14 items-center justify-center rounded-xl"
          style={{ backgroundColor: N018.accent, color: N018.bg }}
        >
          <Check size={28} />
        </motion.span>

        <div className="mt-5">
          <TechLabel accent>order confirmed</TechLabel>
        </div>

        <h1 className="mt-1 text-3xl font-black leading-tight">سفارش شما ثبت شد</h1>

        <p className="mt-3 text-sm leading-7" style={{ color: N018.muted }}>
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </p>

        <dl className="mt-6">
          <div
            className="flex items-baseline justify-between py-3"
            style={{ borderTop: `1px dashed ${N018.line}` }}
          >
            <dt className="text-sm" style={{ color: N018.muted }}>
              شماره سفارش
            </dt>

            <dd className="font-black" dir="ltr">
              #{orderId.slice(0, 8)}
            </dd>
          </div>

          <div
            className="flex items-baseline justify-between py-3"
            style={{ borderTop: `1px dashed ${N018.line}` }}
          >
            <dt className="text-sm" style={{ color: N018.muted }}>
              مبلغ کل
            </dt>

            <dd className="text-xl font-black" style={{ color: N018.accent }}>
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={onBack}
          className="mt-4 h-14 w-full rounded-xl text-sm font-black transition-transform active:scale-[0.98]"
          style={{ backgroundColor: N018.accent, color: N018.bg }}
        >
          بازگشت به منو
        </button>
      </motion.div>
    </div>
  );
}
