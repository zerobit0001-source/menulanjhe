"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

type Props = { orderId: string; total: number; onBack: () => void };

export default function Template007OrderSuccess({
  orderId,
  total,
  onBack,
}: Props) {
  return (
    <div className="min-h-screen bg-[#120D09] text-[#F5EBDD]">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flex h-20 w-20 items-center justify-center rounded-full border border-[#B98252]/30 bg-[#241811]"
        >
          <CheckCircle2 size={40} className="text-[#B98252]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-6 text-xl font-bold"
        >
          سفارش شما ثبت شد
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.22 }}
          className="mt-2 text-center text-sm text-[#CDBEAE]"
        >
          سفارش شما با موفقیت ثبت شد.
          <br />
          لطفاً برای پرداخت و دریافت سفارش به صندوق مراجعه کنید.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          className="mt-6 w-full rounded-2xl border border-[#F5EBDD]/[0.08] bg-[#18110C] p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#CDBEAE]">شماره سفارش</span>
            <span className="font-bold">#{orderId.slice(0, 8)}</span>
          </div>

          <div className="my-4 h-px bg-[#F5EBDD]/[0.08]" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#CDBEAE]">مبلغ کل</span>
            <span className="font-black text-[#B98252]">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.38 }}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#B98252] text-sm font-bold text-[#18110C] transition-colors hover:bg-[#CDA173]"
        >
          بازگشت به منو
          <ArrowLeft size={18} />
        </motion.button>
      </div>
    </div>
  );
}
