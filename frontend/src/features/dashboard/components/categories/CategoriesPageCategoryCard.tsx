"use client";

import {
  Ban,
  Eye,
  EyeOff,
  Folder,
  GripVertical,
  MoreVertical,
  Pencil,
  Utensils,
} from "lucide-react";

import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import {
  useToggleCategoryActiveMutation,
  useUpdateCategoryMutation,
} from "../../api/categoryApi";

import type { Category } from "../../types/categories/categories.type";

import CategoriesPageCategoryModal from "./CategoriesPageCategoryModal";
import { categoryIcons } from "../Icons";

type Props = {
  category: Category;
};

export default function CategoriesPageCategoryCard({ category }: Props) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [checked, setChecked] = useState(category.is_active);

  const [toggleCategoryActive, { isLoading }] =
    useToggleCategoryActiveMutation();

  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const menuOpen = Boolean(menuAnchor);

  /*
   * Sync with RTK Query data after refetch
   */
  useEffect(() => {
    setChecked(category.is_active);
  }, [category.is_active]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    setEditOpen(true);
  };

  const handleUpdate = async (data: {
    name: string;
    description?: string;
    icon_name?: string;
  }) => {
    try {
      await updateCategory({
        id: category.id,
        body: {
          name: data.name.trim(),
          description: data.description?.trim() || "",
          icon_name: data.icon_name?.trim() || "",
        },
      }).unwrap();

      setEditOpen(false);
    } catch (error) {
      console.error("Update category failed:", error);
    }
  };

  const handleToggle = async () => {
    const previousValue = checked;
    const newValue = !checked;

    // Optimistic update
    setChecked(newValue);

    try {
      await toggleCategoryActive(category.id).unwrap();
    } catch {
      // Rollback if request fails
      setChecked(previousValue);
    }
  };

  const categoryIcon =
    categoryIcons.find((item) => item.value === category.icon_name) ??
    categoryIcons.find((item) => item.value === "ban");

  const CategoryIcon = categoryIcon?.icon ?? Ban;

  return (
    <Card
      elevation={0}
      className={`rounded-2xl! border! p-3! transition-colors ${
        checked
          ? "border-gray-200! bg-white!"
          : "border-gray-100! bg-gray-50/60!"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Drag Handle */}
        <div className="hidden cursor-grab text-gray-300 sm:block">
          <GripVertical size={19} />
        </div>

        {/* Category Icon */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            checked
              ? "bg-gray-100 text-gray-600"
              : "bg-gray-100/70 text-gray-300"
          }`}
        >
          <CategoryIcon size={20} />
        </div>

        {/* Category Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Typography
              variant="body2"
              className={`font-bold! ${
                checked ? "text-gray-900!" : "text-gray-400!"
              }`}
            >
              {category.name}
            </Typography>

            {!checked && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-400">
                مخفی
              </span>
            )}
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
            <Folder size={13} />

            <span>{category.description || "توضیحی ثبت نشده است"}</span>
          </div>
        </div>

        {/* Visibility */}
        <div className="hidden items-center gap-2 sm:flex">
          {checked ? (
            <Eye size={16} className="text-green-500" />
          ) : (
            <EyeOff size={16} className="text-gray-300" />
          )}

          <Switch
            checked={checked}
            onChange={handleToggle}
            disabled={isLoading}
            size="small"
          />
        </div>

        {/* More */}
        <IconButton
          size="small"
          onClick={handleMenuOpen}
          className="text-gray-400!"
        >
          <MoreVertical size={19} />
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              className: "mt-2! rounded-xl!",
            },
          }}
        >
          {/* Edit */}
          <MenuItem onClick={handleEdit} className="gap-2! text-sm!">
            <Pencil size={16} />
            ویرایش
          </MenuItem>

          {/* Toggle */}
          <MenuItem
            disabled={isLoading}
            onClick={() => {
              handleMenuClose();
              handleToggle();
            }}
            className="gap-2! text-sm!"
          >
            {checked ? (
              <>
                <EyeOff size={16} />
                مخفی کردن
              </>
            ) : (
              <>
                <Eye size={16} />
                نمایش دادن
              </>
            )}
          </MenuItem>
        </Menu>
      </div>

      {/* Edit Modal */}
      <CategoriesPageCategoryModal
        open={editOpen}
        category={category}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        isSubmitting={isUpdating}
      />
    </Card>
  );
}
