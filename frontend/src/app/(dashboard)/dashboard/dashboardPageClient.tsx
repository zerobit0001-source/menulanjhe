"use client";

import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { useGetDashboardQuery } from "@/features/dashboard/api/dashboardApi";
import { DashboardPageCategories } from "@/features/dashboard/sections/DashboardPageCategories";
import DashboardPageMenu from "@/features/dashboard/sections/DashboardPageMenu";

export default function DashboardPageClient() {
  const { data, isLoading, isError, refetch } = useGetDashboardQuery();


  if (isLoading) {
    return (
      <DashboardContainer>
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-slate-500">
            در حال دریافت اطلاعات داشبورد...
          </p>
        </div>
      </DashboardContainer>
    );
  }

  if (isError || !data?.ok) {
    return (
      <DashboardContainer>
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <p className="text-sm text-red-500">
            دریافت اطلاعات داشبورد با خطا مواجه شد.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-800"
          >
            تلاش مجدد
          </button>
        </div>
      </DashboardContainer>
    );
  }

  const { summary, categories, products } = data;

  return (
    <DashboardContainer>
      <DashboardPageCategories categories={categories} />
      <DashboardPageMenu products={products} />
    </DashboardContainer>
  );
}
