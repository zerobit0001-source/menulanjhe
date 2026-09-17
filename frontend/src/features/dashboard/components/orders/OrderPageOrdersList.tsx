"use client";

import { CircularProgress, Typography } from "@mui/material";

import OrderPageOrderCard from "./OrderPageOrderCard";

import type { Order } from "../../types/orders/orders.types";

type Props = {
  orders: Order[];
  search?: string;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
};

export default function OrderPageOrdersList({
  orders,
  search = "",
  isLoading,
  isFetching,
  error,
}: Props) {
  // ─────────────────────────────
  // Initial Loading
  // ─────────────────────────────

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <CircularProgress size={28} />
      </div>
    );
  }

  // ─────────────────────────────
  // Error
  // ─────────────────────────────

  if (error) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-2">
        <Typography className="font-semibold! text-gray-700!">
          دریافت سفارش‌ها امکان‌پذیر نیست
        </Typography>

        <Typography className="text-sm! text-gray-400!">
          لطفاً دوباره تلاش کنید.
        </Typography>
      </div>
    );
  }

  // ─────────────────────────────
  // Local Search
  // ─────────────────────────────

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

  // ─────────────────────────────
  // Empty
  // ─────────────────────────────

  if (!filteredOrders.length) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-2">
        <Typography className="font-semibold! text-gray-700!">
          سفارشی پیدا نشد
        </Typography>

        <Typography className="text-sm! text-gray-400!">
          {normalizedSearch
            ? "عبارت جستجو را تغییر دهید."
            : "هنوز سفارشی برای نمایش وجود ندارد."}
        </Typography>
      </div>
    );
  }

  // ─────────────────────────────
  // Data
  // ─────────────────────────────

  return (
    <div className="relative">
      {isFetching && (
        <div className="absolute left-0 top-0 z-10">
          <CircularProgress size={18} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order) => (
          <OrderPageOrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
