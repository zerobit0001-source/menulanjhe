"use client";

import { useState } from "react";
import { SquareText } from "lucide-react";

import { SectionTitle } from "@/features/dashboard/components/SectionTitle";
import OrdersPageToolbar from "@/features/dashboard/components/orders/OrdersPageToolbar";
import OrderPageOrdersList from "@/features/dashboard/components/orders/OrderPageOrdersList";

import { useGetOrdersQuery } from "@/features/dashboard/api/orderApi";

import type { OrderStatus } from "@/features/dashboard/types/orders/orders.types";
import { useOrdersRealtime } from "@/features/dashboard/realtime/useOrdersRealtime";
import { Button } from "@mui/material";

type FilterValue = "ALL" | OrderStatus;

export default function OrdersPageClient({ search }: { search: string }) {
  const [filter, setFilter] = useState<FilterValue>("ALL");
  const [page, setPage] = useState(1);

  const { connectionState, isConnected } = useOrdersRealtime();

  console.log("Orders realtime:", {
    connectionState,
    isConnected,
  });

  const status = filter === "ALL" ? undefined : filter;

  const { data, isLoading, isFetching, error } = useGetOrdersQuery({
    ...(status && { status }),
    page,
    search,
  });

  const handleFilterChange = (newFilter: FilterValue) => {
    setFilter(newFilter);
    setPage(1);
  };

  return (
    <>
      <SectionTitle
        title="سفارش ها"
        icon={<SquareText size={20} className="text-gray-500" />}
        count={data?.count ?? 0}
      />

      <div className="mt-6 flex flex-col gap-4">
        <OrdersPageToolbar
          filter={filter}
          search={search}
          onFilterChange={handleFilterChange}
        />

        <OrderPageOrdersList
          orders={data?.results ?? []}
          search={search}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
        />

        {data && data.total_pages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="contained"
              disabled={page === 1 || isFetching}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              قبلی
            </Button>

            <span className="text-sm text-gray-500">
              صفحه {data.current_page} از {data.total_pages}
            </span>

            <Button
              variant="contained"
              disabled={page === data.total_pages || isFetching}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              بعدی
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
