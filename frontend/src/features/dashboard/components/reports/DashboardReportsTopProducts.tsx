import type { TopProduct } from "../../types/reports";
import { formatMoney, formatNumber, formatRank } from "./reportFormat";

export default function DashboardReportsTopProducts({ products }: { products: TopProduct[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">پرفروش‌ترین محصولات</h2>

      {products.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-400">هنوز داده‌ای برای نمایش وجود ندارد.</p>
      ) : (
        <ol className="mt-3 divide-y divide-slate-100">
          {products.slice(0, 10).map((p, i) => (
            <li key={p.product_id} className="flex items-center gap-3 py-3">
              <span className="w-6 shrink-0 text-xs font-medium text-slate-300">{formatRank(i + 1)}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">{p.product_name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{formatNumber(p.quantity)} عدد</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-slate-700">{formatMoney(p.sales)}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
