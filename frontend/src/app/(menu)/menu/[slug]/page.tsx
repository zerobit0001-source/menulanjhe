"use client";

import { useParams } from "next/navigation";

import MenuRenderer from "@/features/menu/MenuRenderer";
import { publicMenuToMenuData } from "@/features/menu/utils/publicMenuAdapter";
import { useGetPublicMenuQuery } from "@/features/menu/api/menuPublicApi";

export default function PublicMenuPage() {
  const params = useParams<{ slug: string }>();

  const slug = params.slug;

  const { data, isLoading, isError } = useGetPublicMenuQuery(slug);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">در حال دریافت منو...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-red-500">دریافت منو با خطا مواجه شد.</p>
      </div>
    );
  }

  const menu = publicMenuToMenuData(data);

  return <MenuRenderer template="template_001" menu={menu} />;
}
