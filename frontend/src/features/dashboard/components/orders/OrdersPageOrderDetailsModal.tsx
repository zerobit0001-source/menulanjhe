"use client";

import {
  Button,
  Card,
  CardContent,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import { X, UserRound } from "lucide-react";

import type { Order } from "../../types/orders/orders.types";

type OrderDetailsModalProps = {
  order: Order;
  open: boolean;
  onClose: () => void;
};

export default function OrdersPageOrderDetailsModal({
  order,
  open,
  onClose,
}: OrderDetailsModalProps) {
  const customerName = order.customer?.name?.trim();
  const displayName = customerName || "مهمان";

  const initials = customerName
    ? customerName
        .split(/\s+/)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
    : null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-lg -translate-x-1/2 -translate-y-1/2">
        <Card
          elevation={0}
          className="max-h-[90vh] overflow-y-auto rounded-2xl! border border-gray-200! outline-none"
        >
          <CardContent className="p-5!">
            {/* Header */}

            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h6" className="font-bold! text-gray-900!">
                  جزئیات سفارش
                </Typography>

                <Typography variant="caption" className="text-gray-500!">
                  سفارش #{order.id.slice(0, 8)}
                </Typography>
              </div>

              <Button
                onClick={onClose}
                className="h-9! min-w-0! w-9! rounded-full! text-gray-500!"
              >
                <X size={20} />
              </Button>
            </div>

            <Divider className="my-4!" />

            {/* Customer */}

            <div className="flex items-center gap-3">
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

              <div>
                <Typography
                  variant="body1"
                  className="font-bold! text-gray-900!"
                >
                  {displayName}
                </Typography>

                <Typography variant="caption" className="text-gray-500!">
                  میز {order.table.slice(0, 8)}
                </Typography>
              </div>
            </div>

            <Divider className="my-4!" />

            {/* Order Info */}

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-3">
                <Typography variant="caption" className="text-gray-400!">
                  وضعیت
                </Typography>

                <Typography
                  variant="body2"
                  className="mt-1! font-bold! text-gray-800!"
                >
                  {getOrderStatusLabel(order.status)}
                </Typography>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <Typography variant="caption" className="text-gray-400!">
                  نوع سفارش
                </Typography>

                <Typography
                  variant="body2"
                  className="mt-1! font-bold! text-gray-800!"
                >
                  {order.order_type === "DINE_IN"
                    ? "سفارش داخل سالن"
                    : order.order_type}
                </Typography>
              </div>
            </div>

            <Divider className="my-4!" />

            {/* Items */}

            <div className="flex flex-col gap-3">
              <Typography
                variant="subtitle2"
                className="font-bold! text-gray-800!"
              >
                آیتم‌های سفارش
              </Typography>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <Typography
                      variant="body2"
                      className="font-medium! text-gray-800!"
                    >
                      {item.product_name}
                    </Typography>

                    <Typography variant="caption" className="text-gray-400!">
                      {item.unit_price.toLocaleString("fa-IR")} ×{" "}
                      {item.quantity}
                    </Typography>
                  </div>

                  <Typography
                    variant="body2"
                    className="shrink-0 font-semibold! text-gray-700!"
                  >
                    {item.total_price.toLocaleString("fa-IR")}
                  </Typography>
                </div>
              ))}
            </div>

            {/* Notes */}

            {order.notes.trim() && (
              <>
                <Divider className="my-4!" />

                <div>
                  <Typography
                    variant="subtitle2"
                    className="font-bold! text-gray-800! "
                  >
                    توضیحات
                  </Typography>

                  <Typography
                    variant="body2"
                    className="mt-2! leading-7! text-gray-600! max-w-full text-wrap"
                  >
                    {order.notes}
                  </Typography>
                </div>
              </>
            )}

            <Divider className="my-4!" />

            {/* Price Summary */}

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Typography variant="body2" className="text-gray-500!">
                  مبلغ سفارش
                </Typography>

                <Typography variant="body2" className="text-gray-700!">
                  {order.subtotal.toLocaleString("fa-IR")} تومان
                </Typography>
              </div>

              {order.discount > 0 && (
                <div className="flex items-center justify-between">
                  <Typography variant="body2" className="text-gray-500!">
                    تخفیف
                  </Typography>

                  <Typography variant="body2" className="text-green-600!">
                    {order.discount.toLocaleString("fa-IR")} تومان
                  </Typography>
                </div>
              )}

              <div className="mt-2 flex items-center justify-between">
                <Typography
                  variant="body1"
                  className="font-semibold! text-gray-700!"
                >
                  مجموع سفارش
                </Typography>

                <Typography variant="h6" className="font-bold! text-gray-900!">
                  {order.total.toLocaleString("fa-IR")} تومان
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
}

function getOrderStatusLabel(status: Order["status"]) {
  switch (status) {
    case "PENDING":
      return "در انتظار تأیید";

    case "CONFIRMED":
      return "تأیید شده";

    case "COMPLETED":
      return "تکمیل شده";

    case "CANCELLED":
      return "لغو شده";

    default:
      return status;
  }
}
