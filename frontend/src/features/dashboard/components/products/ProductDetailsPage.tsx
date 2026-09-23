"use client";

import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Switch,
  Typography,
} from "@mui/material";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Edit3,
  Eye,
  EyeOff,
  Package,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  useGetProductQuery,
  useToggleProductActiveMutation,
} from "@/features/dashboard/api/productApi";
import type { Product } from "@/features/dashboard/types/products/products.type";

type Props = {
  productId: string;
};

function formatPrice(price: string) {
  return Number(price).toLocaleString("fa-IR");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Box className="flex items-start gap-3">
      <Box className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
        {icon}
      </Box>

      <Box className="min-w-0">
        <Typography variant="caption" className="mb-1 block! text-gray-400!">
          {label}
        </Typography>

        <Typography
          variant="body2"
          className="break-all font-medium! text-gray-800!"
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ProductDetailsPage({ productId }: Props) {
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductQuery(productId);

  const [toggleProductActive, { isLoading: isToggling }] =
    useToggleProductActiveMutation();

  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (product) {
      setIsAvailable(product.is_available);
    }
  }, [product]);

  const handleToggle = async () => {
    if (!product) return;

    const previousValue = isAvailable;
    const newValue = !isAvailable;

    setIsAvailable(newValue);

    try {
      await toggleProductActive(product.id).unwrap();
    } catch {
      setIsAvailable(previousValue);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <CircularProgress size={30} />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-4">
        <Box className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <CircleAlert size={24} />
        </Box>

        <Typography variant="body2" className="text-gray-500!">
          دریافت اطلاعات محصول با خطا مواجه شد.
        </Typography>

        <Button
          variant="outlined"
          onClick={() => refetch()}
          className="rounded-xl!"
        >
          تلاش مجدد
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Button
            component={Link}
            href="/dashboard/products"
            variant="text"
            size="small"
            startIcon={<ArrowRight size={18} />}
            className="min-w-0!"
          >
            بازگشت
          </Button>

          <Divider orientation="vertical" flexItem />

          <Box>
            <Typography variant="h6" className="font-bold!">
              جزئیات محصول
            </Typography>

            <Typography variant="caption" className="text-gray-500!">
              اطلاعات کامل محصول
            </Typography>
          </Box>
        </div>

        <Button
          component={Link}
          href={`/dashboard/products/${product.id}/edit`}
          variant="outlined"
          startIcon={<Edit3 size={17} />}
          className="rounded-xl!"
        >
          ویرایش محصول
        </Button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Product preview */}
        <Card
          elevation={0}
          className="overflow-hidden border border-gray-200 lg:col-span-1"
        >
          <div className="relative flex h-80 items-center justify-center bg-gray-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <Package size={42} strokeWidth={1.5} />

                <Typography variant="body2" className="text-gray-400!">
                  تصویری برای این محصول ثبت نشده است.
                </Typography>
              </div>
            )}

            <Box className="absolute right-4 top-4">
              <Chip
                label={product.is_available ? "قابل نمایش" : "مخفی"}
                icon={
                  product.is_available ? (
                    <Eye size={15} />
                  ) : (
                    <EyeOff size={15} />
                  )
                }
                size="small"
                className={
                  product.is_available
                    ? "bg-white! text-emerald-600!"
                    : "bg-white! text-gray-500!"
                }
              />
            </Box>
          </div>

          <Box className="flex flex-col gap-4 p-5">
            <Box>
              <Typography variant="h6" className="font-bold! text-gray-900!">
                {product.name}
              </Typography>

              <Typography variant="body2" className="mt-1! text-gray-500!">
                {product.category_name || "دسته‌بندی نامشخص"}
              </Typography>
            </Box>

            <Box className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
              <Typography variant="body2" className="text-gray-500!">
                قیمت
              </Typography>

              <Typography variant="h6" className="font-bold! text-gray-900!">
                {formatPrice(product.price)} تومان
              </Typography>
            </Box>

            <Divider />

            <Box className="flex items-center justify-between gap-3">
              <Box className="min-w-0">
                <Typography variant="body2" className="font-bold!">
                  نمایش محصول
                </Typography>

                <Typography variant="caption" className="text-gray-500!">
                  دیده شدن محصول در منوی مشتری
                </Typography>
              </Box>

              <Switch
                checked={isAvailable}
                onChange={handleToggle}
                disabled={isToggling}
                size="small"
              />
            </Box>
          </Box>
        </Card>

        {/* Product information */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Card elevation={0} className="border border-gray-200 p-5">
            <Box className="mb-5 flex items-center justify-between">
              <Box className="flex items-center gap-2">
                <Box className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                  <Package size={18} />
                </Box>

                <Typography variant="subtitle1" className="font-bold!">
                  اطلاعات محصول
                </Typography>
              </Box>

              {product.is_featured ? (
                <Chip
                  label="محصول ویژه"
                  size="small"
                  icon={<CheckCircle2 size={15} />}
                  className="bg-emerald-50! text-emerald-600!"
                />
              ) : (
                <Chip
                  label="محصول عادی"
                  size="small"
                  className="bg-gray-100! text-gray-500!"
                />
              )}
            </Box>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InfoItem
                icon={<Tag size={17} />}
                label="نام محصول"
                value={product.name}
              />

              <InfoItem
                icon={<Tag size={17} />}
                label="دسته‌بندی"
                value={product.category_name || "دسته‌بندی نامشخص"}
              />

              <InfoItem
                icon={<Package size={17} />}
                label="شناسه محصول"
                value={product.id}
              />

              <InfoItem
                icon={<Tag size={17} />}
                label="Slug"
                value={product.slug}
              />
            </div>
          </Card>

          {/* Description */}
          <Card elevation={0} className="border border-gray-200 p-5">
            <Typography variant="subtitle1" className="mb-4! font-bold!">
              توضیحات محصول
            </Typography>

            <Box className="rounded-2xl bg-gray-50 p-4">
              <Typography
                variant="body2"
                className="whitespace-pre-wrap leading-7! text-gray-600!"
              >
                {product.description?.trim()
                  ? product.description
                  : "توضیحی برای این محصول ثبت نشده است."}
              </Typography>
            </Box>
          </Card>

          {/* Dates */}
          <Card elevation={0} className="border border-gray-200 p-5">
            <Typography variant="subtitle1" className="mb-5! font-bold!">
              اطلاعات سیستم
            </Typography>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoItem
                icon={<CalendarDays size={17} />}
                label="تاریخ ایجاد"
                value={formatDate(product.created_at)}
              />

              <InfoItem
                icon={<Clock3 size={17} />}
                label="آخرین بروزرسانی"
                value={formatDate(product.updated_at)}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
