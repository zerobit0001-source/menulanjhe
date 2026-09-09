"use client";

import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { Check, CircleX, Clock3, UserRound } from "lucide-react";
import { DashboardOrder } from "../../types/orders/orders.types";

type OrderCardProps = {
  order: DashboardOrder;
};

const statusConfig = {
  PENDING_PAYMENT: {
    label: "در انتظار پرداخت",
    icon: Clock3,
  },
  PAID: {
    label: "پرداخت شده",
    icon: Check,
  },
  PREPARING: {
    label: "در حال آماده‌سازی",
    icon: Clock3,
  },
  READY: {
    label: "آماده",
    icon: Check,
  },
  COMPLETED: {
    label: "تکمیل شده",
    icon: Check,
  },
  CANCELLED: {
    label: "لغو شده",
    icon: CircleX,
  },
};

export default function OrderPageOrderCard({ order }: OrderCardProps) {
  const statusInfo = statusConfig[order.status];
  const StatusIcon = statusInfo.icon;

  const displayName = order.customerName || "مهمان";

  const initials = order.customerName
    ? order.customerName
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
    : null;

  return (
    <Card
      elevation={0}
      className="rounded-2xl! border border-gray-200! overflow-hidden"
    >
      <CardContent className="p-4!">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
              {initials ? (
                <Typography
                  variant="body2"
                  className="font-bold! text-gray-700!"
                >
                  {initials}
                </Typography>
              ) : (
                <UserRound size={20} className="text-gray-500" />
              )}
            </div>

            {/* Customer */}
            <div>
              <Typography variant="body1" className="font-bold! text-gray-900!">
                {displayName}
              </Typography>

              <Typography variant="caption" className="text-gray-500!">
                سفارش #{order.order_number} • میز {order.table_number}
              </Typography>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5">
            <StatusIcon size={14} className="text-green-600" />

            <Typography
              variant="caption"
              className="font-semibold! text-green-700!"
            >
              {statusInfo.label}
            </Typography>
          </div>
        </div>

        {/* Date */}
        <div className="mt-4 flex items-center justify-between">
          <Typography variant="caption" className="text-gray-400!">
            {new Date(order.created_at).toLocaleString("fa-IR")}
          </Typography>

          <Typography variant="caption" className="text-gray-400!">
            {order.items.length} آیتم
          </Typography>
        </div>

        <Divider className="my-3!" />

        {/* Items */}
        <div className="h-[78px] flex flex-col overflow-hidden">
          {order.items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="h-[22px] flex items-center justify-between gap-3"
            >
              <Typography variant="body2" className="text-gray-700! truncate">
                {item.product_name}
              </Typography>

              <div className="flex items-center gap-4 shrink-0">
                <Typography
                  variant="body2"
                  className="text-gray-500! w-5 text-center"
                >
                  {item.quantity}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-gray-700! w-24 text-left"
                >
                  {item.total_price.toLocaleString("fa-IR")}
                </Typography>
              </div>
            </div>
          ))}

          {order.items.length > 3 && (
            <Button
              type="button"
              className="h-[22px] flex items-center text-xs! text-gray-700 transition-colors text-center"
            >
              + {order.items.length - 3} مورد بیشتر
            </Button>
          )}
        </div>

        <Divider className="my-3!" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <Typography variant="body1" className="font-semibold! text-gray-700!">
            مجموع
          </Typography>

          <Typography variant="h6" className="font-bold! text-gray-900!">
            {order.total_amount.toLocaleString("fa-IR")} تومان
          </Typography>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button
            variant="outlined"
            fullWidth
            className="rounded-xl! border-gray-200! text-gray-600!"
          >
            مشاهده سفارش
          </Button>

          {order.status === "PENDING_PAYMENT" && (
            <Button
              variant="contained"
              fullWidth
              className="rounded-xl! bg-amber-400! text-gray-900! shadow-none! hover:bg-amber-500!"
            >
              پرداخت شد
            </Button>
          )}

          {order.status === "PAID" && (
            <Button
              variant="contained"
              fullWidth
              className="rounded-xl! bg-blue-500! shadow-none! hover:bg-blue-600!"
            >
              شروع آماده‌سازی
            </Button>
          )}

          {order.status === "PREPARING" && (
            <Button
              variant="contained"
              fullWidth
              className="rounded-xl! bg-green-500! shadow-none! hover:bg-green-600!"
            >
              آماده شد
            </Button>
          )}

          {order.status === "READY" && (
            <Button
              variant="contained"
              fullWidth
              className="rounded-xl! bg-gray-900! shadow-none!"
            >
              تکمیل سفارش
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
