"use client";

import {
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Switch,
  Typography,
} from "@mui/material";

import { Eye, EyeOff, Package, Trash, SquarePen } from "lucide-react";

import { useState } from "react";
import { DashboardProduct } from "../types/dasboars.types";

type DashboardMenuProductCardProps = {
  product: DashboardProduct;
};

export default function DashboardMenuProductCard({
  product,
}: DashboardMenuProductCardProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Product Card */}
      <Card
        elevation={1}
        className={`
          min-h-[180px]!
          cursor-pointer
          rounded-2xl!
          p-4!
          shadow-sm!
          transition
          hover:shadow-md!
          ${product.is_available ? "" : "opacity-60"}
        `}
        onClick={handleOpen}
      >
        <Box className="flex h-full flex-col justify-between">
          {/* Header */}
          <Box className="flex items-start justify-between gap-3">
            {/* Image */}
            <Box className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
              {product.image ? (
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Package size={24} className="text-gray-400" />
              )}
            </Box>

            {/* Availability */}
            <Box
              className={`
                flex items-center gap-1
                rounded-full
                px-2.5 py-1
                text-xs font-semibold
                ${
                  product.is_available
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-gray-100 text-gray-500"
                }
              `}
            >
              {product.is_available ? <Eye size={14} /> : <EyeOff size={14} />}

              <Typography className="text-xs! font-semibold!">
                {product.is_available ? "نمایش داده می‌شود" : "مخفی"}
              </Typography>
            </Box>
          </Box>

          {/* Product Info */}
          <Box className="mt-4 flex items-end justify-between gap-3">
            <Box className="min-w-0">
              <Typography variant="body1" className="truncate! font-bold!">
                {product.name}
              </Typography>

              <Typography variant="caption" className="text-gray-500!">
                {product.category_name}
              </Typography>
            </Box>

            {/* Price */}
            <Box className="shrink-0 rounded-lg bg-gray-100 px-3 py-1.5">
              <Typography
                variant="body2"
                className="whitespace-nowrap! font-bold!"
              >
                {product.price.toLocaleString("fa-IR")} تومان
              </Typography>
            </Box>
          </Box>

          {/* Availability Status */}
          <Box className="mt-4 flex items-center justify-between">
            <Typography variant="caption" className="text-gray-500!">
              وضعیت موجودی
            </Typography>

            <Typography
              variant="caption"
              className={`
                font-semibold!
                ${product.is_available ? "text-emerald-600!" : "text-red-500!"}
              `}
            >
              {product.is_available ? "موجود" : "ناموجود"}
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* Product Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          className="
            absolute
            left-1/2
            top-1/2
            flex
            w-[calc(100%-32px)]
            max-w-[400px]
            -translate-x-1/2
            -translate-y-1/2
            flex-col
            gap-6
            rounded-2xl
            bg-white
            p-4
            shadow-2xl
            outline-none
          "
        >
          {/* Image */}
          <Box className="flex h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
            {product.image ? (
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Package size={40} className="text-gray-400" />
            )}
          </Box>

          {/* Title + Price */}
          <Box className="flex items-center justify-between gap-4">
            <Box className="min-w-0">
              <Typography variant="h6" className="font-bold!">
                {product.name}
              </Typography>

              <Typography variant="caption" className="text-gray-500!">
                {product.category_name}
              </Typography>
            </Box>

            <Box className="shrink-0 rounded-full bg-gray-100 px-4 py-2">
              <Typography
                variant="body1"
                className="whitespace-nowrap! font-bold!"
              >
                {product.price.toLocaleString("fa-IR")}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Box>
            <Typography
              variant="caption"
              className="mb-1 block! font-semibold! text-gray-500!"
            >
              توضیحات
            </Typography>

            <Typography variant="body2" className="leading-7! text-gray-700!">
              {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
            </Typography>
          </Box>

          {/* Details */}
          <Box className="grid w-full grid-cols-3 overflow-hidden rounded-2xl border border-gray-300">
            {/* Category */}
            <Box className="flex items-center bg-gray-50 p-3">
              <Box className="w-full text-center">
                <Typography variant="body2" className="font-semibold!">
                  {product.category_name}
                </Typography>

                <Typography variant="caption" className="block! text-gray-400!">
                  دسته‌بندی
                </Typography>
              </Box>
            </Box>

            {/* Visibility */}
            <Box className="flex items-center border-x border-dashed border-gray-300 bg-gray-50 p-3">
              <Box className="w-full text-center">
                <Box
                  className={`
                    flex
                    justify-center
                    ${
                      product.is_available
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }
                  `}
                >
                  {product.is_available ? (
                    <Eye size={17} />
                  ) : (
                    <EyeOff size={17} />
                  )}
                </Box>

                <Typography variant="caption" className="block! text-gray-400!">
                  وضعیت نمایش
                </Typography>
              </Box>
            </Box>

            {/* Availability */}
            <Box className="flex items-center bg-gray-50 p-3">
              <Box className="w-full text-center">
                <Typography
                  variant="body2"
                  className={`
                    font-semibold!
                    ${
                      product.is_available
                        ? "text-emerald-600!"
                        : "text-red-500!"
                    }
                  `}
                >
                  {product.is_available ? "موجود" : "ناموجود"}
                </Typography>

                <Typography variant="caption" className="block! text-gray-400!">
                  موجودی
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Visibility */}
          <Box className="flex items-center justify-between gap-4">
            <Box className="min-w-0">
              <Typography variant="body1" className="font-bold!">
                نمایش محصول
              </Typography>

              <Typography variant="caption" className="text-gray-500!">
                دیده شدن محصول در منو
              </Typography>
            </Box>

            <Switch
              checked={product.is_available}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
