import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardNavbar />

        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
