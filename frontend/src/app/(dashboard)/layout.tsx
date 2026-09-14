import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";
import DashboardThemeProvider from "@/features/dashboard/DashboardThemeProvider";
import DashboardPageTransition from "@/features/dashboard/components/DashboardPageTransition";
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
  return (
    <DashboardThemeProvider>
      <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <DashboardNavbar />

          <main className="min-h-0 flex-1 overflow-y-auto">
            <DashboardPageTransition>{children}</DashboardPageTransition>
          </main>
        </div>
      </div>
    </DashboardThemeProvider>
  );
}
