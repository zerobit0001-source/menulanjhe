"use client";
import { motion } from "framer-motion";
import type { OrderReceiptData } from "../adapter";
import { OrderReceipt } from "./order-receipt";
import { Check } from "lucide-react";

interface Props {
  receipt: OrderReceiptData | null;
  onBackToMenu: () => void;
}

export function OrderSuccessView({ receipt, onBackToMenu }: Props) {
  return (
    <div className="ch-container">
      <div className="ch-page ch-center">
        <motion.div
          className="ch-success-mark"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <Check width={30} height={30} />
        </motion.div>
        <h1 style={{ margin: "0 0 6px", fontSize: "1.4rem" }}>
          سفارش شما ثبت شد
        </h1>
        <p style={{ margin: 0, opacity: 0.75 }}>از انتخاب شما سپاسگزاریم.</p>

        {receipt && (
          <div style={{ textAlign: "start" }}>
            <OrderReceipt receipt={receipt} />
          </div>
        )}

        <button type="button" className="ch-btn" onClick={onBackToMenu}>
          بازگشت به منو
        </button>
      </div>
    </div>
  );
}
