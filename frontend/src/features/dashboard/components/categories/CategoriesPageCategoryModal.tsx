"use client";

import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { X } from "lucide-react";
import { Category } from "../../types/categories/categories.type";
import { categoryIcons } from "../Icons";

type CategoryModalProps = {
  open: boolean;
  onClose: () => void;
  category?: Category;
  onSubmit: (data: {
    name: string;
    description?: string;
    icon_name?: string;
  }) => void;
  isSubmitting?: boolean;
};

const defaultValues = {
  name: "",
  icon: "utensils",
  color: "#10B981",
  visible: true,
};

export default function CategoriesPageCategoryModal({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  category,
}: CategoryModalProps) {
  const [name, setName] = useState(defaultValues.name);
  const [icon, setIcon] = useState(defaultValues.icon);
  const [color, setColor] = useState(defaultValues.color);
  const [visible, setVisible] = useState(defaultValues.visible);

  const isEditMode = Boolean(category);

  useEffect(() => {
    if (!open) return;

    setName(category?.name ?? defaultValues.name);
    setIcon(category?.icon_name ?? defaultValues.icon);
    setColor(defaultValues.color);
    setVisible(defaultValues.visible);
  }, [open, category]);

  const handleSubmit = () => {
    const trimmedName = name.trim();

    if (!trimmedName || isSubmitting) return;

    onSubmit({
      name: trimmedName,
      description: "",
      icon_name: icon,
    });
  };

  const selectedIcon =
    categoryIcons.find((item) => item.value === icon) ?? categoryIcons[0];

  const SelectedIcon = selectedIcon.icon;

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (!isSubmitting) onClose();
      }}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      aria-labelledby="category-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          maxHeight: "90vh",
          border: "1px solid #E5E7EB",
          boxShadow: "none",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        id="category-dialog-title"
        component="div"
        className="flex items-start justify-between border-b border-gray-100 px-5! py-4!"
      >
        <div>
          <Typography className="font-bold! text-gray-900!">
            {isEditMode ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
          </Typography>

          <Typography className="mt-1! text-xs! text-gray-400!">
            {isEditMode
              ? "اطلاعات دسته‌بندی خود را ویرایش کنید."
              : "دسته‌بندی جدیدی برای منوی خود ایجاد کنید."}
          </Typography>
        </div>

        <IconButton
          size="small"
          onClick={onClose}
          disabled={isSubmitting}
          className="text-gray-400!"
          aria-label="بستن"
        >
          <X size={19} />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent className="space-y-6! px-5! py-6!">
        {/* Name */}
        <div>
          <Typography className="mb-2! text-sm! font-semibold! text-gray-700!">
            نام دسته‌بندی
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="مثلاً پیتزا"
            disabled={isSubmitting}
          />
        </div>

        {/* Icon */}
        <div>
          <Typography className="mb-3! text-sm! font-semibold! text-gray-700!">
            آیکون
          </Typography>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {categoryIcons.map((item) => {
              const Icon = item.icon;
              const selected = icon === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIcon(item.value)}
                  className={`flex h-16 flex-col items-center justify-center gap-1 rounded-xl border transition-all ${
                    selected
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-[10px]">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visibility */}
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
          <div>
            <Typography className="text-sm! font-semibold! text-gray-700!">
              نمایش در منو
            </Typography>

            <Typography className="mt-1! text-xs! text-gray-400!">
              دسته‌بندی در منوی مشتری نمایش داده شود
            </Typography>
          </div>

          <FormControlLabel
            control={
              <Switch
                checked={visible}
                onChange={(event) => setVisible(event.target.checked)}
                disabled={isSubmitting}
                size="small"
              />
            }
            label=""
            sx={{ margin: 0 }}
          />
        </div>
      </DialogContent>

      {/* Footer */}
      <DialogActions className="flex flex-col-reverse gap-2 border-t border-gray-100 px-5! py-4! sm:flex-row sm:justify-end">
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isSubmitting}
          className="rounded-xl!"
        >
          انصراف
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!name.trim() || isSubmitting}
          className="rounded-xl!"
        >
          {isSubmitting ? (
            <>
              <CircularProgress size={18} color="inherit" className="ml-2!" />
              در حال ذخیره...
            </>
          ) : isEditMode ? (
            "ذخیره تغییرات"
          ) : (
            "افزودن دسته‌بندی"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
