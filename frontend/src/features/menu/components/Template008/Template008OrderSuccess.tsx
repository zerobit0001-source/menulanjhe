"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

export function Template008OrderSuccess({ open, onDone }: { open: boolean; onDone: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#FAFAFA] px-8 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F5C400]"
          >
            <Check size={44} strokeWidth={2.5} className="text-[#171717]" />
          </motion.div>
          <h2 className="mb-3 text-2xl font-bold text-[#171717]">سفارش شما ثبت شد</h2>
          <p className="max-w-xs text-[15px] leading-7 text-[#737373]">سفارش شما ثبت شد. لطفاً برای پرداخت به صندوق مراجعه کنید.</p>
          <button onClick={onDone} className="mt-10 h-14 w-full max-w-xs rounded-full border border-[#E5E5E5] bg-white text-[15px] font-semibold text-[#171717] active:bg-neutral-50">
            بازگشت به منو
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
