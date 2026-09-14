"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { useLogoutMutation } from "@/features/auth/api/authApi";

export default function LogoutButton() {
  const router = useRouter();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      router.replace("/auth");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <LogOut size={18} />

      <span>{isLoading ? "در حال خروج..." : "خروج از حساب"}</span>
    </button>
  );
}
