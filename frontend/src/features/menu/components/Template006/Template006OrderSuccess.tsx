"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Props = {
  orderId: string;
  total: number;
  onBack: () => void;
};

export default function Template006OrderSuccess({
  orderId,
  total,
  onBack,
}: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08090B] px-4 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          damping: 18,
          stiffness: 180,
        }}
        className="w-full max-w-md rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 220,
          }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black"
        >
          <Check size={28} />
        </motion.div>

        <h1 className="mt-6 text-2xl font-black">سفارش ثبت شد</h1>

        <p className="mt-3 text-sm leading-7 text-white/35">
          سفارش شما با موفقیت ثبت شده است. برای پرداخت به صندوق مراجعه کنید.
        </p>

        <div className="mt-7 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
            Order ID
          </p>

          <p className="mt-2 break-all text-sm font-black">{orderId}</p>

          <div className="my-4 h-px bg-white/[0.07]" />

          <p className="text-xs text-white/30">مبلغ</p>

          <p className="mt-1 font-black">
            {total.toLocaleString("fa-IR")} تومان
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onBack}
          className="mt-6 w-full rounded-2xl bg-white py-4 text-sm font-black text-black"
        >
          بازگشت به منو
        </motion.button>
      </motion.div>
    </main>
  );
}
