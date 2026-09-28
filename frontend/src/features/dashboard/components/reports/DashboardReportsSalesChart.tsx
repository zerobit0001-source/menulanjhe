"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SalesByDay } from "../../types/reports/reports.types";
import { formatDay, formatMoney, formatNumber } from "./reportFormat";

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { payload: SalesByDay }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div dir="rtl" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-slate-900">{formatDay(d.date)}</p>
      <p className="mt-1 text-slate-600">{formatMoney(d.sales)}</p>
      <p className="text-slate-400">{formatNumber(d.orders_count)} سفارش</p>
    </div>
  );
}

export default function DashboardReportsSalesChart({ data }: { data: SalesByDay[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h2 className="text-base font-bold text-slate-900">فروش ۷ روز اخیر</h2>
        <span className="text-xs text-slate-400">میلیون تومان</span>
      </div>

      {data.length === 0 ? (
        <p className="py-16 text-center text-sm text-slate-400">داده‌ای برای نمایش وجود ندارد.</p>
      ) : (
        <div dir="ltr" className="mt-4 h-64 w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={formatDay}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748B", fontSize: 11, fontFamily: "inherit" }}
                interval="preserveStartEnd"
                minTickGap={12}
              />
              <YAxis
                tickFormatter={(v: number) => formatNumber(v / 1_000_000)}
                tickLine={false}
                axisLine={false}
                width={48}
                tick={{ fill: "#64748B", fontSize: 11, fontFamily: "inherit" }}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#CBD5E1" }} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#059669", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
