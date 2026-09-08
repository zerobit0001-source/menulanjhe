"use client";

import { Eye, EyeOff, Package, Plus } from "lucide-react";
import { Box, Button, Card, Typography } from "@mui/material";
import { SectionTitle } from "../components/SectionTitle";
import DashboardMenuToolbar from "../components/DashboardMenuToolbar";
import { dashboardProducts } from "../data/demoDashboard";
import DashboardMenuProductCard from "../components/DashboardMenuProductCard";

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
          <DashboardMenuProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
