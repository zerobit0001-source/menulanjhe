import DashboardThemeProvider from "@/features/dashboard/DashboardThemeProvider";
import DashboardPageTransition from "@/features/dashboard/components/DashboardPageTransition";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پیش‌نمایش قالب",
  robots: {
    index: false,
    follow: true,
  },
};

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
