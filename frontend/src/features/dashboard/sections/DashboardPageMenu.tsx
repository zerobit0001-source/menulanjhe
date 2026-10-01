"use client";

import { Package, Plus } from "lucide-react";
import { Box, Button, Typography } from "@mui/material";

import { SectionTitle } from "../components/SectionTitle";
import DashboardMenuToolbar from "../components/DashboardMenuToolbar";
import DashboardMenuProductCard from "../components/DashboardMenuProductCard";
import { DashboardProduct } from "../types/dasboars.types";
import Link from "next/link";

type DashboardPageMenuProps = {
  products: DashboardProduct[];
};

export default function DashboardPageMenu({
  products,
}: DashboardPageMenuProps) {
  return (
    <section>
      <SectionTitle
        title="منو"
        icon={<Package size={20} className="text-gray-500" />}
      />

      <DashboardMenuToolbar />

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* Add Product */}

        <Button
          component={Link}
          href="/dashboard/products/create"
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

        {/* Products */}

        {products.map((product) => (
          <DashboardMenuProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
