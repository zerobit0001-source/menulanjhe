"use client";

import {
  ChevronDown,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  X,
} from "lucide-react";

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import type { MenuProduct } from "../../types/menu.types";

type CartItem = {
  product: MenuProduct;
  quantity: number;
};

type Props = {
  open: boolean;
  onClose: () => void;

  items: CartItem[];

  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;

  total: number;
};

export default function Template001CartDrawer({
  open,
  onClose,
  items,
  onIncrease,
  onDecrease,
  onRemove,
  total,
}: Props) {
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const delivery = 0;
  const discount = 0;
  const finalTotal = total + delivery - discount;

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          className: "rounded-t-[28px]! overflow-hidden bg-white!",
        },
      }}
    >
      <Box className="mx-auto flex w-full max-w-2xl flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={19} />

            <div>
              <Typography variant="body1" className="font-bold!">
                سبد سفارش
              </Typography>

              <Typography variant="caption" className="text-gray-400!">
                {itemsCount} آیتم
              </Typography>
            </div>
          </div>

          <IconButton onClick={onClose} size="small" className="bg-gray-100!">
            <X size={18} />
          </IconButton>
        </div>

        {/* Content */}
        <div className="max-h-[55vh] overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                <ShoppingBag size={28} className="text-gray-400" />
              </div>

              <Typography variant="body1" className="font-bold!">
                سبد سفارش خالیه
              </Typography>

              <Typography variant="caption" className="mt-1 text-gray-400!">
                محصولات مورد علاقه‌ات رو اضافه کن
              </Typography>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 border-b border-gray-100 py-4 last:border-b-0"
                >
                  {/* Image */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ShoppingBag size={24} className="text-gray-300" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Typography variant="body2" className="font-bold!">
                        {item.product.name}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() => onRemove(item.product)}
                        className="h-7! w-7! text-gray-300!"
                      >
                        <Trash2 size={14} />
                      </IconButton>
                    </div>

                    <Typography
                      variant="caption"
                      className="mt-1 text-gray-400!"
                    >
                      {item.product.price.toLocaleString("fa-IR")} تومان
                    </Typography>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
                        <IconButton
                          size="small"
                          onClick={() => onDecrease(item.product)}
                          className="h-7! w-7!"
                        >
                          <Minus size={14} />
                        </IconButton>

                        <span className="w-5 text-center text-xs font-bold">
                          {item.quantity}
                        </span>

                        <IconButton
                          size="small"
                          onClick={() => onIncrease(item.product)}
                          className="h-7! w-7!"
                        >
                          <Plus size={14} />
                        </IconButton>
                      </div>

                      {/* Item total */}
                      <Typography variant="body2" className="font-bold!">
                        {(item.product.price * item.quantity).toLocaleString(
                          "fa-IR",
                        )}{" "}
                        تومان
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <>
            {/* Coupon */}
            <div className="border-t border-gray-100 px-4 pt-4">
              <div className="mb-2 flex items-center gap-2">
                <Tag size={15} className="text-gray-400" />

                <Typography
                  variant="caption"
                  className="font-semibold! text-gray-600!"
                >
                  کد تخفیف
                </Typography>
              </div>

              <div className="flex gap-2">
                <TextField
                  size="small"
                  fullWidth
                  placeholder="کد تخفیف را وارد کنید"
                  className="text-xs!"
                  slotProps={{
                    input: {
                      className: "rounded-xl!",
                    },
                  }}
                />

                <Button
                  variant="outlined"
                  className="min-w-20! rounded-xl! border-gray-200! text-gray-700!"
                >
                  اعمال
                </Button>
              </div>
            </div>

            {/* Summary */}
            <div className="px-4 pt-4">
              <div className="flex items-center justify-between py-1.5">
                <Typography variant="caption" className="text-gray-500!">
                  مبلغ سفارش
                </Typography>

                <Typography variant="caption" className="font-semibold!">
                  {total.toLocaleString("fa-IR")} تومان
                </Typography>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <Typography variant="caption" className="text-gray-500!">
                  هزینه سرویس
                </Typography>

                <Typography variant="caption" className="font-semibold!">
                  {delivery === 0
                    ? "رایگان"
                    : `${delivery.toLocaleString("fa-IR")} تومان`}
                </Typography>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between py-1.5">
                  <Typography variant="caption" className="text-green-600!">
                    تخفیف
                  </Typography>

                  <Typography
                    variant="caption"
                    className="font-semibold! text-green-600!"
                  >
                    -{discount.toLocaleString("fa-IR")} تومان
                  </Typography>
                </div>
              )}

              <Divider className="my-2!" />

              <div className="flex items-center justify-between">
                <Typography variant="body2" className="font-bold!">
                  مبلغ نهایی
                </Typography>

                <Typography variant="h6" className="font-black!">
                  {finalTotal.toLocaleString("fa-IR")} تومان
                </Typography>
              </div>
            </div>

            {/* Submit */}
            <div className="px-4 pb-5 pt-4">
              <Button
                fullWidth
                variant="contained"
                className="h-12! rounded-xl! bg-gray-900! font-bold! shadow-none! hover:bg-gray-800!"
              >
                پرداخت سفارش
              </Button>
            </div>
          </>
        )}
      </Box>
    </Drawer>
  );
}
