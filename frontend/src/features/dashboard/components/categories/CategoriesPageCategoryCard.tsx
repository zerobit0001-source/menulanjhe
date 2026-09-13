"use client";

import {
  Eye,
  EyeOff,
  MoreVertical,
  Package,
  Pencil,
  GripVertical,
  Trash2,
} from "lucide-react";

import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";

import { useState } from "react";

import type { DashboardCategory } from "../../types/categories/categories.types";
import CategoriesPageCategoryModal from "./CategoriesPageCategoryModal";

type Props = {
  category: DashboardCategory;

  onEdit: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
};

export default function CategoriesPageCategoryCard({
  category,
  onEdit,
  onDelete,
  onToggleVisibility,
}: Props) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);

  const menuOpen = Boolean(menuAnchor);

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

  const handleDelete = () => {
    handleMenuClose();
    onDelete();
  };

  return (
    <Card
      elevation={0}
      className={`rounded-2xl! border! p-3! transition-colors ${
        category.visible
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
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${category.color}18`,
          }}
        >
          <Package
            size={20}
            style={{
              color: category.color,
            }}
          />
        </div>

        {/* Category Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Typography
              variant="body2"
              className={`font-bold! ${
                category.visible ? "text-gray-900!" : "text-gray-400!"
              }`}
            >
              {category.title}
            </Typography>

            {!category.visible && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-400">
                مخفی
              </span>
            )}
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
            <Package size={13} />

            <span>{category.product_count.toLocaleString("fa-IR")} محصول</span>
          </div>
        </div>

        {/* Visibility */}
        <div className="hidden items-center gap-2 sm:flex">
          {category.visible ? (
            <Eye size={16} className="text-green-500" />
          ) : (
            <EyeOff size={16} className="text-gray-300" />
          )}

          <Switch
            checked={category.visible}
            onChange={onToggleVisibility}
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
          <MenuItem onClick={handleEdit} className="gap-2! text-sm!">
            <Pencil size={16} />
            ویرایش
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleMenuClose();
              onToggleVisibility();
            }}
            className="gap-2! text-sm!"
          >
            {category.visible ? (
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

          <MenuItem
            onClick={handleDelete}
            className="gap-2! text-sm! text-red-500!"
          >
            <Trash2 size={16} />
            حذف
          </MenuItem>
        </Menu>
      </div>
      <CategoriesPageCategoryModal
        open={editOpen}
        category={category}
        onClose={() => setEditOpen(false)}
        onSubmit={(data) => {
          console.log("Updated category:", {
            ...category,
            ...data,
          });
        }}
      />
    </Card>
  );
}
