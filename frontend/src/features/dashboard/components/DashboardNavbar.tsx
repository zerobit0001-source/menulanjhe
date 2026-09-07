"use client";

import { Bell, Search, ChevronDown } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <header className="h-20 shrink-0 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-6">
        {/* Shop */}
        <button className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            M
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">فروشگاه من</p>

            <p className="text-xs text-slate-500">فروشگاه فعال</p>
          </div>

          <ChevronDown size={16} className="text-slate-400" />
        </button>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden h-10 w-64 items-center gap-2 rounded-xl bg-slate-50 px-3 md:flex">
            <Search size={17} className="text-slate-400" />

            <input
              type="text"
              placeholder="جستجو..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Notification */}
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50">
            <Bell size={18} strokeWidth={1.8} />
          </button>

          {/* Avatar */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
            A
          </button>
        </div>
      </div>
    </header>
  );
}
