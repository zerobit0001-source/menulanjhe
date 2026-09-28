import DashboardThemeProvider from "@/features/dashboard/DashboardThemeProvider";
import DashboardPageTransition from "@/features/dashboard/components/DashboardPageTransition";
import DashboardLayoutClient from "@/features/dashboard/components/DashboardLayoutClient";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth");
  }

  const activeMemberships = currentUser.memberships.filter(
    (membership) => membership.is_active,
  );

  if (activeMemberships.length === 0) {
    redirect("/auth");
  }

  console.log("DASHBOARD CURRENT USER:", currentUser?.user?.full_name);

  if (!currentUser) {
    console.log("❌ DASHBOARD REDIRECT TO AUTH");
    redirect("/auth");
  }

  // اگر کاربر وارد نشده باشد یا عضویت فعال نداشته باشد، به صفحه ورود هدایت می‌شود.

  return (
    <DashboardThemeProvider>
      <DashboardLayoutClient>
        <DashboardPageTransition>{children}</DashboardPageTransition>
      </DashboardLayoutClient>
    </DashboardThemeProvider>
  );
}
