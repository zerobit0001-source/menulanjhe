"use client";

import { useMemo, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { LayersPlus } from "lucide-react";

import { useGetMenusQuery } from "../../api/menuApi";
import { useCreateCategoryMutation } from "../../api/categoryApi";

import CategoriesPageCategoryModal from "./CategoriesPageCategoryModal";

export default function CategoriesPageAddCategoryButton() {
  const [open, setOpen] = useState(false);

  const {
    data: menusData,
    isLoading: isMenusLoading,
    isError: isMenusError,
  } = useGetMenusQuery();

  const activeMenu = useMemo(() => {
    return menusData?.results.find((menu) => menu.is_active);
  }, [menusData]);

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  const handleSubmit = async (data: {
    name: string;
    description?: string;
    image?: string | null;
  }) => {
    if (!activeMenu) {
      return;
    }

    try {
      await createCategory({
        menu: activeMenu.id,
        name: data.name.trim(),
        description: data.description?.trim() || "",
        // image: data.image ?? null,
      }).unwrap();

      setOpen(false);
    } catch (error) {
      console.error("Create category failed:", error);
    }
  };

  if (isMenusLoading) {
    return (
      <Button variant="contained" disabled endIcon={<LayersPlus size={18} />}>
        <CircularProgress size={16} color="inherit" />
      </Button>
    );
  }

  if (isMenusError || !activeMenu) {
    return (
      <Button variant="contained" disabled endIcon={<LayersPlus size={18} />}>
        افزودن دسته‌بندی
      </Button>
    );
  }

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
        isSubmitting={isCreating}
      />
    </>
  );
}
