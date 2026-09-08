"use client";

import { Eye, EyeOff, Package, Plus } from "lucide-react";
import { Box, Button, Card, Typography } from "@mui/material";
import { SectionTitle } from "../components/SectionTitle";
import DashboardMenuToolbar from "../components/DashboardMenuToolbar";
import { dashboardProducts } from "../data/demoDashboard";

export default function DashboardPageMenu() {
  return (
    <section>
      <SectionTitle
        title="منو"
        icon={<Package size={20} className="text-gray-500" />}
      />

      <DashboardMenuToolbar />

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <Button
          variant="contained"
          className="
            min-h-[180px]!
            rounded-2xl!
            bg-gray-100!
            text-gray-400!
            shadow-none!
            hover:bg-gray-200!
          "
        >
          <Box className="flex items-center gap-2">
            <Plus size={20} />

            <Typography className="text-base! font-semibold!">
              محصول جدید
            </Typography>
          </Box>
        </Button>

        {dashboardProducts.map((product) => (
          <Card
            key={product.id}
            elevation={1}
            className={`
              min-h-[180px]!
              rounded-2xl!
              p-4!
              shadow-sm!
              transition
              hover:shadow-md!

              ${product.visible ? "" : "opacity-60"}
            `}
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
        ))}
      </div>
    </section>
  );
}
