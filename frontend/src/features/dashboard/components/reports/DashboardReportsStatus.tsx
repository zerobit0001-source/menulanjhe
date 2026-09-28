import type { OrdersByStatus } from "../../types/reports";
import { formatNumber } from "./reportFormat";

const ROWS: { key: keyof OrdersByStatus; label: string; bar: string; dot: string }[] = [
  { key: "pending", label: "در انتظار", bar: "bg-amber-400", dot: "bg-amber-400" },
  { key: "confirmed", label: "تأیید شده", bar: "bg-sky-500", dot: "bg-sky-500" },
  { key: "completed", label: "تکمیل شده", bar: "bg-emerald-500", dot: "bg-emerald-500" },
  { key: "cancelled", label: "لغو شده", bar: "bg-rose-400", dot: "bg-rose-400" },
];

export default function DashboardReportsStatus({ data }: { data: OrdersByStatus }) {
  const total = ROWS.reduce((s, r) => s + (data[r.key] ?? 0), 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">وضعیت سفارش‌ها</h2>

      {total === 0 ? (
        <p className="py-10 text-center text-sm text-slate-400">داده‌ای برای نمایش وجود ندارد.</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {ROWS.map((r) => {
            const value = data[r.key] ?? 0;
            return (
              <li key={r.key}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className={`h-2 w-2 rounded-full ${r.dot}`} />
                    {r.label}
                  </span>
                  <span className="font-semibold text-slate-900">{formatNumber(value)}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${r.bar} transition-[width] duration-300`}
                    style={{ width: `${(value / total) * 100}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
