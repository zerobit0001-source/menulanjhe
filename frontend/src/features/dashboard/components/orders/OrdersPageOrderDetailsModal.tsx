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
import { DashboardOrder } from "../../types/orders/orders.types";

type OrderDetailsModalProps = {
  order: DashboardOrder;
  open: boolean;
  onClose: () => void;
};

export default function OrderPageOrderDetailsModal({
  order,
  open,
  onClose,
}: OrderDetailsModalProps) {
  const displayName = order.customerName || "مهمان";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 w-[calc(100%-32px)] max-w-lg -translate-x-1/2 -translate-y-1/2">
        <Card
          elevation={0}
          className="rounded-2xl! border border-gray-200! outline-none max-h-[90vh] overflow-y-auto"
        >
          <CardContent className="p-5!">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <Typography
                  variant="h6"
                  className="font-bold! text-gray-900!"
                >
                  جزئیات سفارش
                </Typography>

                <Typography
                  variant="caption"
                  className="text-gray-500!"
                >
                  سفارش #{order.order_number}
                </Typography>
              </div>

              <Button
                onClick={onClose}
                className="min-w-0! w-9! h-9! rounded-full! text-gray-500!"
              >
                <X size={20} />
              </Button>
            </div>

            <Divider className="my-4!" />

            {/* Customer */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                {order.customerName ? (
                  <Typography
                    variant="body2"
                    className="font-bold! text-gray-700!"
                  >
                    {order.customerName
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
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

                <Typography
                  variant="caption"
                  className="text-gray-500!"
                >
                  میز {order.table_number}
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

                    <Typography
                      variant="caption"
                      className="text-gray-400!"
                    >
                      {item.unit_price.toLocaleString("fa-IR")} ×{" "}
                      {item.quantity}
                    </Typography>
                  </div>

                  <Typography
                    variant="body2"
                    className="font-semibold! text-gray-700! shrink-0"
                  >
                    {item.total_price.toLocaleString("fa-IR")}
                  </Typography>
                </div>
              ))}
            </div>

            <Divider className="my-4!" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <Typography
                variant="body1"
                className="font-semibold! text-gray-700!"
              >
                مجموع سفارش
              </Typography>

              <Typography
                variant="h6"
                className="font-bold! text-gray-900!"
              >
                {order.total_amount.toLocaleString("fa-IR")} تومان
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
}