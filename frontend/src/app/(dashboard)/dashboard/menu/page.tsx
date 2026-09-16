"use client";

import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import MenuPageMenuHeader from "@/features/dashboard/components/menu/MenuPageMenuHeader";
import MenuPageMenuLinkCard from "@/features/dashboard/components/menu/MenuPageMenuLinkCard";
import MenuPageMenuQrCard from "@/features/dashboard/components/menu/MenuPageMenuQrCard";
import MenuPageMenuTemplateGrid from "@/features/dashboard/components/menu/MenuPageMenuTemplateGrid";

import { menuTemplates } from "@/features/dashboard/data/menu/demoMenu";
import { demoMenu } from "@/features/menu/data/demoMenu";

import { useGetMenusQuery } from "@/features/dashboard/api/menuApi";

export default function MenuPage() {
  const { data, isLoading, isError, refetch } = useGetMenusQuery();

  if (isLoading) {
    return (
      <DashboardContainer>
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-slate-500">در حال دریافت اطلاعات منو...</p>
        </div>
      </DashboardContainer>
    );
  }

  if (isError) {
    return (
      <DashboardContainer>
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <p className="text-sm text-red-500">
            دریافت اطلاعات منو با خطا مواجه شد.
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

  const menu = data?.results?.[0];

  if (!menu) {
    return (
      <DashboardContainer>
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-slate-500">هنوز منویی ایجاد نشده است.</p>
        </div>
      </DashboardContainer>
    );
  }

  const menuUrl = `/menu/${menu.slug}`;
  const qrUrl = `${window.location.origin}${menuUrl}`;

  return (
    <DashboardContainer>
      <MenuPageMenuHeader menuUrl={menuUrl} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MenuPageMenuLinkCard
          menuUrl={menuUrl}
          isPublished={menu.is_published}
        />

        <MenuPageMenuQrCard
          menuUrl={menuUrl}
          shopName={menu.name}
          qrUrl={qrUrl}
        />
      </div>

      <MenuPageMenuTemplateGrid templates={menuTemplates} />
    </DashboardContainer>
  );
}
