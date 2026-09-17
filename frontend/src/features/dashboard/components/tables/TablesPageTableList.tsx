"use client";

import { useGetTablesQuery } from "@/features/dashboard/api/tableApi";
import TablesPageTableCard from "./TablesPageTableCard";

export default function TablesPageTableList() {
  const { data, isLoading, isError } = useGetTablesQuery();

  if (isLoading) {
    return (
      <div className="py-12 text-center text-sm text-gray-400">
        در حال دریافت میزها...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 text-center text-sm text-red-500">
        دریافت میزها با خطا مواجه شد.
      </div>
    );
  }

  if (!data?.results.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm font-bold text-gray-700">
          هنوز میزی ایجاد نشده است
        </p>

        <p className="mt-2 text-xs text-gray-400">
          اولین میز خود را ایجاد کنید.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {data.results.map((table) => (
        <TablesPageTableCard key={table.id} table={table} />
      ))}
    </div>
  );
}
