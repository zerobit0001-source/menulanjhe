"use client";

import { Box, Card, IconButton, Modal, Typography } from "@mui/material";
import {
  Eye,
  EyeOff,
  Package,
  Tag,
  CircleCheck,
  CircleX,
  Trash,
  SquarePen,
} from "lucide-react";
import { useState } from "react";

export default function DashboardMenuProductCard({ product }) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        key={product.id}
        elevation={1}
        className={`
          min-h-[180px]!
          cursor-pointer
          rounded-2xl!
          p-4!
          shadow-sm!
          transition
          hover:shadow-md!
          ${product.visible ? "" : "opacity-60"}
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
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Package size={24} className="text-gray-400" />
              )}
            </Box>

            {/* Visibility */}
            <Box
              className={`
                flex items-center gap-1
                rounded-full
                px-2.5 py-1
                text-xs font-semibold
                ${
                  product.visible
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-gray-100 text-gray-500"
                }
              `}
            >
              {product.visible ? <Eye size={14} /> : <EyeOff size={14} />}

              <Typography className="text-xs! font-semibold!">
                {product.visible ? "نمایش داده می‌شود" : "مخفی"}
              </Typography>
            </Box>
          </Box>

          {/* Product info */}
          <Box className="mt-4 flex items-end justify-between gap-3">
            <Box className="min-w-0">
              <Typography variant="body1" className="truncate! font-bold!">
                {product.title}
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

          {/* Stock */}
          <Box className="mt-4 flex items-center justify-between">
            <Typography variant="caption" className="text-gray-500!">
              وضعیت موجودی
            </Typography>

            <Typography
              variant="caption"
              className={`
                font-semibold!
                ${product.stock ? "text-emerald-600!" : "text-red-500!"}
              `}
            >
              {product.stock ? "موجود" : "ناموجود"}
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
            w-[calc(100%-32px)]
            max-w-[480px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-2xl
            bg-white
            p-2
            shadow-2xl
            outline-none
            flex flex-col
            gap-6
          "
        >
          {/* Image */}
          <Box className="flex h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
            {product.image ? (
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <Package size={40} className="text-gray-400" />
            )}
          </Box>

          {/* Title + Price */}
          <Box className="flex items-start justify-between gap-4">
            <Box className="min-w-0">
              <Typography variant="h6" className="font-bold!">
                {product.title}
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
          <Box className="">
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
          <Box className="w-full grid grid-cols-3 border border-gray-300 rounded-2xl">
            {/* Category */}
            <Box className="flex items-center gap-2 rounded-r-2xl bg-gray-50">
              <Box className=" w-full text-center">
                <Typography variant="body2" className="font-semibold!">
                  {product.category_name}
                </Typography>
                <Typography variant="caption" className="block! text-gray-400!">
                  دسته‌بندی
                </Typography>
              </Box>
            </Box>

            {/* Visibility */}
            <Box className="flex items-center gap-2 bg-gray-50 p-3 border-x border-gray-300 border-dashed">
              <Box className=" w-full text-center">
                <Typography
                  variant="body2"
                  className={`
                      font-semibold!
                      ${
                        product.visible ? "text-emerald-600!" : "text-gray-500!"
                      }
                    `}
                >
                  <Box
                    className={`
                        flex
                        justify-center
                        ${
                          product.visible ? "text-emerald-600" : "text-gray-400"
                        }
                        `}
                  >
                    {product.visible ? <Eye size={17} /> : <EyeOff size={17} />}
                  </Box>
                </Typography>
                <Typography variant="caption" className="block! text-gray-400!">
                  وضعیت نمایش
                </Typography>
              </Box>
            </Box>

            {/* Stock */}
            <Box className="flex items-center gap-2 rounded-l-2xl bg-gray-50 p-3">
              <Box className=" w-full text-center">
                <Typography
                  variant="body2"
                  className={`
                      font-semibold!
                      ${product.stock ? "text-emerald-600!" : "text-red-500!"}
                    `}
                >
                  {product.stock ? "موجود" : "ناموجود"}
                </Typography>
                <Typography variant="caption" className="block! text-gray-400!">
                  موجودی
                </Typography>
              </Box>
            </Box>
          </Box>
          <div className="text-end">
            <span className="py-2 px-4 bg-gray-200 rounded-full">
              <IconButton color="error">
                <Trash />
              </IconButton>
              <IconButton color="info">
                <SquarePen />
              </IconButton>
            </span>
          </div>
        </Box>
      </Modal>
    </>
  );
}
