"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { LayersPlus } from "lucide-react";
import { DashboardCategory } from "../../types/categories/categories.type";
import CategoriesPageCategoryModal from "./CategoriesPageCategoryModal";

export default function CategoriesPageAddCategoryButton() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (
    data: Omit<
      DashboardCategory,
      "id" | "created_at" | "product_count" | "sort_order"
    >,
  ) => {
    console.log("New category:", data);
  };

  return (
    <>
      <Button
        variant="contained"
        endIcon={<LayersPlus size={18} />}
        onClick={() => setOpen(true)}
      >
        افزودن دسته‌بندی
      </Button>

      <CategoriesPageCategoryModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
