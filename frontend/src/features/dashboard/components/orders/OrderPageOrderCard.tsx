"use client";

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import {
  Check,
  CircleX,
  Clock3,
  UserRound,
  MessageSquareText,
} from "lucide-react";
import { useState } from "react";

import {
  useCancelOrderMutation,
  useCompleteOrderMutation,
  useConfirmOrderMutation,
} from "../../api/orderApi";

import type { Order, OrderStatus } from "../../types/orders/orders.types";

import OrdersPageOrderDetailsModal from "./OrdersPageOrderDetailsModal";

type OrderCardProps = {
  order: Order;
};

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    icon: typeof Clock3;
    className: string;
  }
> = {
  PENDING: {
    label: "در انتظار تأیید",
    icon: Clock3,
    className: "bg-amber-50 text-amber-700",
  },

  CONFIRMED: {
    label: "تأیید شده",
    icon: Check,
    className: "bg-blue-50 text-blue-700",
  },

  COMPLETED: {
    label: "تکمیل شده",
    icon: Check,
    className: "bg-green-50 text-green-700",
  },

  CANCELLED: {
    label: "لغو شده",
    icon: CircleX,
    className: "bg-red-50 text-red-700",
  },
};

export default function OrderPageOrderCard({ order }: OrderCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [confirmOrder, { isLoading: isConfirming }] = useConfirmOrderMutation();

  const [completeOrder, { isLoading: isCompleting }] =
    useCompleteOrderMutation();

  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  const statusInfo = statusConfig[order.status];
  const StatusIcon = statusInfo.icon;

  const displayName = order.customer?.name?.trim() || "مهمان";

  const initials = order.customer?.name
    ? order.customer.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
    : null;

  const isActionLoading = isConfirming || isCompleting || isCancelling;

  const handleConfirm = async () => {
    try {
      await confirmOrder(order.id).unwrap();
    } catch (error) {
      console.error("Confirm order failed:", error);
    }
  };

  const handleComplete = async () => {
    try {
      await completeOrder(order.id).unwrap();
    } catch (error) {
      console.error("Complete order failed:", error);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelOrder(order.id).unwrap();
    } catch (error) {
      console.error("Cancel order failed:", error);
    }
  };

  return (
    <>
      <Card
        elevation={0}
        className="overflow-hidden rounded-2xl! border border-gray-200!"
      >
        <CardContent className="p-4!">
          {/* Header */}

          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              {/* Avatar */}

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
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

              <div className="min-w-0">
                <Typography
                  variant="body1"
                  className="truncate font-bold! text-gray-900!"
                >
                  {displayName}
                </Typography>

                <Typography variant="caption" className="text-gray-500!">
                  سفارش #{order.id.slice(0, 8)}
                </Typography>
              </div>
            </div>

            {/* Status + Note */}

            <div className="flex shrink-0 items-center gap-2">
              {order.notes?.trim() && (
                <div
                  title={order.notes}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600"
                >
                  <MessageSquareText size={15} />
                </div>
              )}

              <div
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${statusInfo.className}`}
              >
                <StatusIcon size={14} />

                <Typography variant="caption" className="font-semibold!">
                  {statusInfo.label}
                </Typography>
              </div>
            </div>
          </div>

          {/* Table */}

          <div className="mt-3 flex items-center justify-between">
            <Typography variant="caption" className="text-gray-500!">
              میز
            </Typography>

            <Typography
              variant="caption"
              className="font-medium! text-gray-700!"
            >
              {order.table.slice(0, 8)}
            </Typography>
          </div>

          {/* Date */}

          <div className="mt-3 flex items-center justify-between">
            <Typography variant="caption" className="text-gray-400!">
              {new Date(order.created_at).toLocaleString("fa-IR")}
            </Typography>

            <Typography variant="caption" className="text-gray-400!">
              {order.items.length} آیتم
            </Typography>
          </div>

          <Divider className="my-3!" />

          {/* Items */}

          <div className="flex h-[78px] flex-col overflow-hidden">
            {order.items.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex h-[22px] items-center justify-between gap-3"
              >
                <Typography variant="body2" className="truncate text-gray-700!">
                  {item.product_name}
                </Typography>

                <div className="flex shrink-0 items-center gap-4">
                  <Typography
                    variant="body2"
                    className="w-5 text-center text-gray-500!"
                  >
                    {item.quantity}
                  </Typography>

                  <Typography
                    variant="body2"
                    className="w-24 text-left text-gray-700!"
                  >
                    {item.total_price.toLocaleString("fa-IR")}
                  </Typography>
                </div>
              </div>
            ))}

            {order.items.length > 3 && (
              <Button
                type="button"
                onClick={() => setDetailsOpen(true)}
                className="h-[22px]! text-xs! text-gray-600!"
              >
                + {order.items.length - 3} مورد بیشتر
              </Button>
            )}
          </div>

          <Divider className="my-3!" />

          {/* Total */}

          <div className="flex items-center justify-between">
            <Typography
              variant="body1"
              className="font-semibold! text-gray-700!"
            >
              مجموع
            </Typography>

            <Typography variant="h6" className="font-bold! text-gray-900!">
              {order.total.toLocaleString("fa-IR")} تومان
            </Typography>
          </div>

          {/* Actions */}

          <div className="mt-4 flex gap-2">
            <Button
              variant="outlined"
              fullWidth
              disabled={isActionLoading}
              className="rounded-xl! border-gray-200! text-gray-600!"
              onClick={() => setDetailsOpen(true)}
            >
              مشاهده سفارش
            </Button>

            {order.status === "PENDING" && (
              <>
                <Button
                  variant="outlined"
                  fullWidth
                  disabled={isActionLoading}
                  onClick={handleCancel}
                  className="rounded-xl! border-red-200! text-red-600!"
                >
                  {isCancelling ? (
                    <CircularProgress size={18} className="text-red-600!" />
                  ) : (
                    "لغو"
                  )}
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  disabled={isActionLoading}
                  onClick={handleConfirm}
                  className="rounded-xl! bg-blue-600! shadow-none! hover:bg-blue-700!"
                >
                  {isConfirming ? (
                    <CircularProgress size={18} className="text-white!" />
                  ) : (
                    "تأیید"
                  )}
                </Button>
              </>
            )}

            {order.status === "CONFIRMED" && (
              <>
                <Button
                  variant="outlined"
                  fullWidth
                  disabled={isActionLoading}
                  onClick={handleCancel}
                  className="rounded-xl! border-red-200! text-red-600!"
                >
                  {isCancelling ? (
                    <CircularProgress size={18} className="text-red-600!" />
                  ) : (
                    "لغو"
                  )}
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  disabled={isActionLoading}
                  onClick={handleComplete}
                  className="rounded-xl! bg-green-600! shadow-none! hover:bg-green-700!"
                >
                  {isCompleting ? (
                    <CircularProgress size={18} className="text-white!" />
                  ) : (
                    "تکمیل سفارش"
                  )}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <OrdersPageOrderDetailsModal
        order={order}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
}
