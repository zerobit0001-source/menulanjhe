"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Package,
  Tags,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "داشبورد",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "فروش‌ها",
    href: "/dashboard/sales",
    icon: ShoppingCart,
  },
  {
    title: "محصولات",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "دسته‌بندی‌ها",
    href: "/dashboard/categories",
    icon: Tags,
  },
  {
    title: "گزارش‌ها",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-l border-slate-200 bg-white lg:flex">
      {/* Logo */}
      <div className="flex h-20 items-center px-6">
        <Link href="/dashboard" className="text-xl font-bold text-slate-900">
          Menu Lanjhe
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3
                  text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
              >
                <Icon size={19} strokeWidth={1.8} />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-200 p-4">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Settings size={19} strokeWidth={1.8} />

          <span>تنظیمات</span>
        </Link>
      </div>
    </aside>
  );
}
