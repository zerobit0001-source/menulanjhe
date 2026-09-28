"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Receipt, ShoppingBag, Wallet } from "lucide-react";
import type { ReportSummary } from "../../types/reports";
import { formatMoney, formatNumber } from "./reportFormat";

export default function DashboardReportsSummary({ summary }: { summary: ReportSummary }) {
  const reduce = useReducedMotion();

  const cards = [
    { title: "فروش", value: formatMoney(summary.net_sales), label: "فروش خالص", icon: Wallet, tone: "text-emerald-600 bg-emerald-50" },
    { title: "سفارش‌ها", value: formatNumber(summary.orders_count), label: "کل سفارش‌ها", icon: ShoppingBag, tone: "text-sky-600 bg-sky-50" },
    { title: "میانگین سفارش", value: formatMoney(summary.average_order_value), label: "میانگین مبلغ سفارش", icon: Receipt, tone: "text-amber-600 bg-amber-50" },
    { title: "تکمیل‌شده", value: formatNumber(summary.completed_orders_count), label: "سفارش‌های تکمیل‌شده", icon: CheckCircle2, tone: "text-violet-600 bg-violet-50" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.05 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">{c.title}</span>
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${c.tone}`}>
              <c.icon size={18} strokeWidth={1.8} />
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-slate-900">{c.value}</p>
          <p className="mt-1 text-xs text-slate-500">{c.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
