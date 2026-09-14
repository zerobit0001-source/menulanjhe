"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Phone, UtensilsCrossed } from "lucide-react";

import {
  useLazyMeQuery,
  useLoginMutation,
  useSelectTenantMutation,
} from "@/features/auth/api/authApi";

export default function AuthPage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const [getMe, { isFetching: isMeLoading }] = useLazyMeQuery();

  const [selectTenant, { isLoading: isTenantLoading }] =
    useSelectTenantMutation();

  const isLoading = isLoginLoading || isMeLoading || isTenantLoading;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!phoneNumber.trim() || !password.trim()) {
      setErrorMessage("شماره موبایل و رمز عبور را وارد کنید.");
      return;
    }

    try {
      // 1. Login
      await login({
        phone_number: phoneNumber.trim(),
        password,
      }).unwrap();

      // 2. Get current user + memberships
      const me = await getMe().unwrap();

      const activeMemberships = me.memberships.filter(
        (membership) => membership.is_active,
      );

      // No active tenant
      if (activeMemberships.length === 0) {
        setErrorMessage("هیچ مجموعه فعالی برای این حساب وجود ندارد.");
        return;
      }

      // Multiple tenants
      if (activeMemberships.length > 1) {
        router.push("/auth/select-tenant");
        return;
      }

      // 3. Automatically select the only tenant
      const membership = activeMemberships[0];

      await selectTenant({
        tenant_id: membership.tenant_id,
      }).unwrap();

      // 4. Go to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage("شماره موبایل یا رمز عبور اشتباه است.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2B5288] text-white shadow-sm">
            <UtensilsCrossed size={27} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Menu Lanjhe</h1>

          <p className="mt-2 text-sm text-slate-500">
            وارد پنل مدیریت مجموعه خود شوید
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              ورود به حساب
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              اطلاعات حساب خود را وارد کنید.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone */}
            <div>
              <label
                htmlFor="phone_number"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                شماره موبایل
              </label>

              <div className="relative">
                <Phone
                  size={19}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="phone_number"
                  type="tel"
                  inputMode="numeric"
                  dir="ltr"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  placeholder="09123456789"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pr-10 pl-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2B5288] focus:bg-white focus:ring-2 focus:ring-[#2B5288]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                رمز عبور
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type="password"
                  dir="ltr"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="رمز عبور"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pr-10 pl-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2B5288] focus:bg-white focus:ring-2 focus:ring-[#2B5288]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-xl bg-[#2B5288] text-sm font-semibold text-white transition hover:bg-[#234572] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "در حال ورود..." : "ورود"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Menu Lanjhe · مدیریت ساده و هوشمند منو
        </p>
      </div>
    </main>
  );
}
