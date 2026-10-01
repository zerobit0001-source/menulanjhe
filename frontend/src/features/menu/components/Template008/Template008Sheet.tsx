"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Bottom sheet on mobile, centered panel on larger screens. */
export function Template008Sheet({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[90dvh] w-full max-w-lg flex-col rounded-t-[28px] bg-[#FAFAFA] md:rounded-[28px]"
          >
            <div className="flex items-center gap-3 px-5 pb-3 pt-5">
              <button onClick={onClose} aria-label="بازگشت" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-white">
                <ArrowRight size={18} />
              </button>
              <h2 className="text-lg font-bold text-[#171717]">{title}</h2>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
