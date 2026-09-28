import type { TopCategory } from "../../types/reports";
import { formatMoney, formatNumber } from "./reportFormat";

export default function DashboardReportsTopCategories({ categories }: { categories: TopCategory[] }) {
  const max = Math.max(...categories.map((c) => c.sales), 1);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">پرفروش‌ترین دسته‌بندی‌ها</h2>

      {categories.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-400">هنوز داده‌ای برای نمایش وجود ندارد.</p>
      ) : (
        <ul className="mt-5 grid gap-x-8 gap-y-5 md:grid-cols-2">
          {categories.map((c) => (
            <li key={c.category_id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-sm font-medium text-slate-900">{c.category_name}</span>
                <span className="shrink-0 text-sm font-semibold text-slate-700">{formatMoney(c.sales)}</span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">{formatNumber(c.quantity)} عدد</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500/70" style={{ width: `${(c.sales / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
