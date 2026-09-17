"use client";

import { CircularProgress, Typography } from "@mui/material";

import { useGetOrdersQuery } from "../../api/orderApi";
import OrderPageOrderCard from "./OrderPageOrderCard";
import type { OrderStatus } from "../../types/orders/orders.types";

type Props = {
  status?: OrderStatus;
  search?: string;
};

export default function OrdersPageOrderList({ status, search = "" }: Props) {
  const { data, isLoading, isFetching, error } = useGetOrdersQuery(
    status ? { status } : undefined,
  );

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <CircularProgress size={28} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <Typography className="text-sm! text-red-500!">
          دریافت سفارش‌ها با خطا مواجه شد.
        </Typography>
      </div>
    );
  }

  const orders = data?.results ?? [];

  console.log(orders);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredOrders = normalizedSearch
    ? orders.filter((order) => {
        const customerName = order.customer?.name ?? "";

        return (
          order.id.toLowerCase().includes(normalizedSearch) ||
          customerName.toLowerCase().includes(normalizedSearch) ||
          order.notes.toLowerCase().includes(normalizedSearch)
        );
      })
    : orders;

  if (!filteredOrders.length) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <Typography className="text-sm! text-gray-500!">
          سفارشی پیدا نشد.
        </Typography>
      </div>
    );
  }

  return (
    <div className="relative">
      {isFetching && (
        <div className="absolute left-0 top-0 z-10">
          <CircularProgress size={18} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order) => (
          <OrderPageOrderCard order={order} key={order.id} />
        ))}
      </div>
    </div>
  );
}
