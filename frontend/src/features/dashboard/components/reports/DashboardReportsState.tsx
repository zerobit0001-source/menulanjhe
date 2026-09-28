import { AlertCircle } from "lucide-react";

export function DashboardReportsLoading() {
  return (
    <div className="space-y-6" role="status" aria-label="در حال دریافت گزارش...">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
      <p className="text-center text-sm text-slate-400">در حال دریافت گزارش...</p>
    </div>
  );
}

export function DashboardReportsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-500">
        <AlertCircle size={22} strokeWidth={1.8} />
      </span>
      <p className="text-sm font-medium text-slate-700">دریافت گزارش با خطا مواجه شد.</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
