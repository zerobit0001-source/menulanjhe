"use client";

import { useParams, useSearchParams } from "next/navigation";

import MenuRenderer from "@/features/menu/MenuRenderer";
import { publicMenuToMenuData } from "@/features/menu/utils/publicMenuAdapter";

import { useTableSession } from "@/features/menu/hooks/useTableSession";
import { useGetPublicMenuQuery } from "@/features/menu/api/menuPublicApi";

export default function PublicMenuPageClient() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const slug = params.slug;
  const qrToken = searchParams.get("qr");

  const {
    data,
    isLoading: isMenuLoading,
    isError: isMenuError,
  } = useGetPublicMenuQuery(slug);

  const {
    sessionToken,
    table,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useTableSession(qrToken ?? undefined);

  console.log(
    "sessionToken",
    sessionToken,
    "table",
    table,
    "isSessionLoading",
    isSessionLoading,
    "isSessionError",
    isSessionError,
  );

  // -------------------------
  // Loading
  // -------------------------

  if (isMenuLoading || isSessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-500">در حال آماده‌سازی منو...</p>
      </div>
    );
  }

  // -------------------------
  // Menu error
  // -------------------------

  if (isMenuError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-sm font-bold text-gray-700">منو در دسترس نیست</p>

          <p className="mt-2 text-xs text-gray-400">
            دریافت اطلاعات منو با خطا مواجه شد.
          </p>
        </div>
      </div>
    );
  }

  // -------------------------
  // QR / Table session error
  // -------------------------

  if (qrToken && (isSessionError || !sessionToken)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-sm font-bold text-gray-700">میز شناسایی نشد</p>

          <p className="mt-2 text-xs text-gray-400">
            لطفاً QR Code میز را دوباره اسکن کنید.
          </p>
        </div>
      </div>
    );
  }

  // -------------------------
  // Adapt backend → UI
  // -------------------------

  const menu = publicMenuToMenuData(data);

  return (
    <MenuRenderer
      template="template_001"
      menu={menu}
      sessionToken={sessionToken}
      tableName={table?.table_name}
    />
  );
}
