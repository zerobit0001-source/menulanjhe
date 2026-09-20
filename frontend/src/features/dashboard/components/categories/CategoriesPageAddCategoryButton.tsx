"use client";

import { useMemo, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { LayersPlus } from "lucide-react";

import { useGetMenusQuery } from "../../api/menuApi";
import { useCreateCategoryMutation } from "../../api/categoryApi";

import CategoriesPageCategoryModal from "./CategoriesPageCategoryModal";
import { Category } from "../../types/categories/categories.type";



export default function CategoriesPageAddCategoryButton({}: CategoryModalProps) {
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
    icon_name?: string;
  }) => {
    if (!activeMenu) {
      return;
    }

    try {
      await createCategory({
        menu: activeMenu.id,
        name: data.name.trim(),
        description: data.description?.trim() || "",
        icon_name: data.icon_name?.trim() || "",
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
