"use client";

import { dashboardTables } from "../../data/tables/demoTables";
import { DashboardTable } from "../../types/tables/tables.type";
import TablesPageTableCard from "./TablesPageTableCard";

export default function TablesPageTableList() {
  if (dashboardTables.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-500">میزی پیدا نشد</p>

          <p className="mt-1 text-xs text-gray-400">
            جستجو یا فیلتر را تغییر دهید
          </p>
        </div>
      </div>
    );
  }

  const onEdit = (table: DashboardTable) => {
    console.log("edit", table);
  };
  const onDelete = (table: DashboardTable) => {
    console.log("delete", table);
  };
  const onShowQr = (table: DashboardTable) => {
    console.log("QR", table);
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {dashboardTables.map((table) => (
        <TablesPageTableCard
          key={table.id}
          table={table}
          onEdit={onEdit}
          onDelete={onDelete}
          onShowQr={onShowQr}
        />
      ))}
    </div>
  );
}
