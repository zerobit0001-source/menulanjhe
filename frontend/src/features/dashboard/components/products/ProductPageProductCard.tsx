"use client";

import { Box, Button, Card, Switch, Typography } from "@mui/material";
import { Eye, EyeOff, Package } from "lucide-react";
import { useEffect, useState } from "react";

import { useToggleProductActiveMutation } from "../../api/productApi";
import { Product } from "../../types/products/products.type";

export default function ProductPageProductCard({
  product,
}: {
  product: Product;
}) {
  const [checked, setChecked] = useState(product.is_available);

  const [toggleProductActive, { isLoading }] = useToggleProductActiveMutation();

  /*
   * اگر اطلاعات product از سمت RTK Query
   * تغییر کرد، state داخلی Switch هم sync شود.
   */
  useEffect(() => {
    setChecked(product.is_available);
  }, [product.is_available]);

  const handleToggle = async () => {
    const previousValue = checked;
    const newValue = !checked;

    // Optimistic update
    setChecked(newValue);

    try {
      await toggleProductActive(product.id).unwrap();
    } catch {
      // Rollback
      setChecked(previousValue);
    }
  };

  return (
    <Card elevation={1}>
      {/* Image */}
      <div className="relative flex h-50 w-full items-center justify-center bg-gray-200 p-2 text-gray-400">
        <span className="absolute right-2 top-2 z-10 rounded-full bg-white px-4 py-1">
          <Typography variant="body2" className="text-xs!">
            {product.category_detail?.name ?? "دسته‌بندی نامشخص"}
          </Typography>
        </span>

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <Package size={20} />
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-5 p-2">
        {/* Name + Price */}
        <span className="flex w-full items-center justify-between gap-2">
          <span className="min-w-0">
            <Typography variant="body1" className="font-bold!">
              {product.name}
            </Typography>

            <Typography
              variant="caption"
              className="block! truncate text-gray-500!"
            >
              {product.description || "توضیحی برای این محصول ثبت نشده است."}
            </Typography>
          </span>

          <Box className="shrink-0 rounded-lg bg-gray-100 px-3 py-1.5">
            <Typography
              variant="body2"
              className="whitespace-nowrap! font-bold!"
            >
              {Number(product.price).toLocaleString("fa-IR")} ت
            </Typography>
          </Box>
        </span>

        {/* Details */}
        <Box className="grid w-full grid-cols-2 rounded-2xl border border-gray-300">
          {/* Available */}
          <Box className="rounded-r-2xl border-l border-dashed border-gray-300 bg-gray-50 p-1">
            <Box className="w-full text-center">
              <Box
                className={`flex justify-center ${
                  checked ? "text-emerald-600" : "text-gray-400"
                }`}
              >
                {checked ? <Eye size={17} /> : <EyeOff size={17} />}
              </Box>

              <Typography variant="caption" className="block! text-gray-400!">
                وضعیت
              </Typography>
            </Box>
          </Box>

          {/* Featured */}
          <Box className="rounded-l-2xl bg-gray-50 p-1">
            <Box className="w-full text-center">
              <Typography
                variant="body2"
                className={`font-semibold! ${
                  product.is_featured ? "text-emerald-600!" : "text-gray-500!"
                }`}
              >
                {product.is_featured ? "ویژه" : "عادی"}
              </Typography>

              <Typography variant="caption" className="block! text-gray-400!">
                نوع محصول
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Toggle */}
        <Box className="flex items-center justify-between gap-4">
          <Box className="min-w-0">
            <Typography variant="body2" className="font-bold!">
              نمایش محصول
            </Typography>

            <Typography variant="caption" className="text-gray-500!">
              دیده شدن محصول در منو
            </Typography>
          </Box>

          <Switch
            checked={checked}
            onChange={handleToggle}
            disabled={isLoading}
            size="small"
          />
        </Box>

        {/* Details button */}
        <Button variant="text" fullWidth size="small">
          مشاهده
        </Button>
      </div>
    </Card>
  );
}
