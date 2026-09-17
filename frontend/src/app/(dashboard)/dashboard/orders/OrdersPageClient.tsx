"use client";

import { useState } from "react";

import OrdersPageToolbar from "@/features/dashboard/components/orders/OrdersPageToolbar";
import OrderPageOrdersList from "@/features/dashboard/components/orders/OrderPageOrdersList";

import type { OrderStatus } from "@/features/dashboard/types/orders/orders.types";

type FilterValue = "ALL" | OrderStatus;

export default function OrdersPageClient() {
  const [filter, setFilter] = useState<FilterValue>("ALL");
  const [search, setSearch] = useState("");

  const status = filter === "ALL" ? undefined : filter;

  return (
    <div className="mt-6 flex flex-col gap-4">
      <OrdersPageToolbar
        filter={filter}
        search={search}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
      />

      <OrderPageOrdersList status={status} search={search} />
    </div>
  );
}
