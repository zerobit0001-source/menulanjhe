"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { BotanicalSprig, DoubleRule, OrnamentalFrame } from "./Ornaments";
import { V016, formatPrice } from "./utils";

type Props = {
  orderId: string;
  total: number;
  onBack: () => void;
};

/** Order confirmation shaped like a printed receipt. */
export default function Template016OrderSuccess({
  orderId,
  total,
  onBack,
}: Props) {
  return (
    <div dir="rtl" className="mx-auto flex min-h-full max-w-md items-center px-4 py-10">
      <OrnamentalFrame>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.1 }}
            className="mt-2 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: V016.brown, color: V016.bg }}
          >
            <Check size={32} />
          </motion.span>

          <BotanicalSprig
            className="mt-4 h-7 w-28"
          />

          <h1 className="mt-1 text-xl font-black" style={{ color: V016.dark }}>
            سفارش شما ثبت شد
          </h1>

          <p className="mt-2 text-sm leading-7" style={{ color: V016.muted }}>
            لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
          </p>

          <div className="mt-5 w-full">
            <DoubleRule />

            <div className="flex items-center justify-between py-3">
              <span className="text-sm" style={{ color: V016.muted }}>
                شماره سفارش
              </span>

              <span className="font-black" style={{ color: V016.dark }}>
                #{orderId.slice(0, 8)}
              </span>
            </div>

            <div
              aria-hidden
              className="border-t border-dashed"
              style={{ borderColor: V016.border }}
            />

            <div className="flex items-center justify-between py-3">
              <span className="text-sm" style={{ color: V016.muted }}>
                مبلغ کل
              </span>

              <span className="text-lg font-black" style={{ color: V016.brown }}>
                {formatPrice(total)}
              </span>
            </div>

            <DoubleRule />
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-5 h-13 w-full py-3.5 text-sm font-black transition-transform active:scale-[0.98]"
            style={{
              backgroundColor: V016.brown,
              color: V016.bg,
              boxShadow: `inset 0 0 0 3px ${V016.brown}, inset 0 0 0 4px ${V016.cream}88`,
            }}
          >
            بازگشت به منو
          </button>
        </motion.div>
      </OrnamentalFrame>
    </div>
  );
}
