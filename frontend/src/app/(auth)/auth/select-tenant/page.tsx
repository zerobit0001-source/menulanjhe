"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, Loader2, Store } from "lucide-react";

import {
  useLazyMeQuery,
  useSelectTenantMutation,
} from "@/features/auth/api/authApi";

import type { AuthMembership } from "@/features/auth/types/auth.types";

export default function SelectTenantPage() {
  const router = useRouter();

  const [memberships, setMemberships] = useState<AuthMembership[]>([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [getMe, { isFetching }] = useLazyMeQuery();

  const [selectTenant, { isLoading: isSelecting }] = useSelectTenantMutation();

  useEffect(() => {
    const loadMemberships = async () => {
      try {
        const me = await getMe().unwrap();

        const activeMemberships = me.memberships.filter(
          (membership) => membership.is_active,
        );

        if (activeMemberships.length === 0) {
          setErrorMessage("هیچ مجموعه فعالی برای این حساب وجود ندارد.");
          return;
        }

        // اگر فقط یک مجموعه باقی مانده بود،
        // نیازی به ماندن در این صفحه نیست.
        if (activeMemberships.length === 1) {
          await selectTenant({
            tenant_id: activeMemberships[0].tenant_id,
          }).unwrap();

          router.replace("/dashboard");
          return;
        }

        setMemberships(activeMemberships);
      } catch (error) {
        console.error("Load memberships error:", error);

        setErrorMessage("دریافت اطلاعات مجموعه‌ها با خطا مواجه شد.");
      }
    };

    loadMemberships();
  }, [getMe, router, selectTenant]);

  const handleSelectTenant = async (tenantId: string) => {
    try {
      setErrorMessage("");

      await selectTenant({
        tenant_id: tenantId,
      }).unwrap();

      router.replace("/dashboard");
    } catch (error) {
      console.error("Select tenant error:", error);

      setErrorMessage("انتخاب مجموعه با خطا مواجه شد.");
    }
  };

  const loading = isFetching || isSelecting;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2B5288] text-white shadow-sm">
            <Store size={27} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">انتخاب مجموعه</h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            مجموعه‌ای که می‌خواهید مدیریت کنید را انتخاب کنید.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          {loading && memberships.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 size={28} className="animate-spin text-[#2B5288]" />

              <p className="mt-4 text-sm text-slate-500">
                در حال دریافت مجموعه‌ها...
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {memberships.map((membership) => (
                <button
                  key={membership.tenant_id}
                  type="button"
                  disabled={loading}
                  onClick={() => handleSelectTenant(membership.tenant_id)}
                  className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-right transition hover:border-[#2B5288]/30 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-[#2B5288]/10 group-hover:text-[#2B5288]">
                    <Store size={21} />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {membership.tenant_name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {getRoleLabel(membership.role)}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronLeft
                    size={20}
                    className="shrink-0 text-slate-400 transition group-hover:text-[#2B5288]"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          {errorMessage && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
              {errorMessage}
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">Menu Lanjhe</p>
      </div>
    </main>
  );
}

function getRoleLabel(role: string) {
  const roles: Record<string, string> = {
    owner: "مالک",
    manager: "مدیر",
    accountant: "حسابدار",
    cashier: "صندوقدار",
    waiter: "گارسون",
    staff: "کارمند",
  };

  return roles[role] ?? role;
}
