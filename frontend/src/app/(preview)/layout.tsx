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

  return (
    <DashboardThemeProvider>
        <DashboardPageTransition>{children}</DashboardPageTransition>
    </DashboardThemeProvider>
  );
}
