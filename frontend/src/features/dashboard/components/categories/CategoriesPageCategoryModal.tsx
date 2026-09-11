"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  Coffee,
  CupSoda,
  Drumstick,
  Egg,
  IceCreamBowl,
  Leaf,
  Pizza,
  Salad,
  Sandwich,
  Star,
  Utensils,
  X,
} from "lucide-react";

import type { DashboardCategory } from "../../types/categories/categories.types";

type CategoryModalProps = {
  open: boolean;
  category?: DashboardCategory | null;
  onClose: () => void;
  onSubmit: (
    category: Omit<
      DashboardCategory,
      "id" | "created_at" | "product_count" | "sort_order"
    >,
  ) => void;
};

const categoryIcons = [
  { value: "pizza", label: "پیتزا", icon: Pizza },
  { value: "burger", label: "برگر", icon: Sandwich },
  { value: "utensils", label: "غذا", icon: Utensils },
  { value: "drumstick", label: "مرغ", icon: Drumstick },
  { value: "salad", label: "سالاد", icon: Salad },
  { value: "leaf", label: "سالم", icon: Leaf },
  { value: "coffee", label: "قهوه", icon: Coffee },
  { value: "drink", label: "نوشیدنی", icon: CupSoda },
  { value: "dessert", label: "دسر", icon: IceCreamBowl },
  { value: "egg", label: "صبحانه", icon: Egg },
  { value: "star", label: "ویژه", icon: Star },
];

const categoryColors = [
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#10B981",
  "#3B82F6",
  "#EC4899",
  "#92400E",
  "#6366F1",
  "#16A34A",
  "#F97316",
];

const defaultValues = {
  title: "",
  icon: "utensils",
  color: "#10B981",
  visible: true,
};

export default function CategoriesPageCategoryModal({
  open,
  category,
  onClose,
  onSubmit,
}: CategoryModalProps) {
  const isEdit = Boolean(category);

  const [title, setTitle] = useState(defaultValues.title);
  const [icon, setIcon] = useState(defaultValues.icon);
  const [color, setColor] = useState(defaultValues.color);
  const [visible, setVisible] = useState(defaultValues.visible);

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setIcon(category.icon);
      setColor(category.color);
      setVisible(category.visible);
      return;
    }

    setTitle(defaultValues.title);
    setIcon(defaultValues.icon);
    setColor(defaultValues.color);
    setVisible(defaultValues.visible);
  }, [category, open]);

  const handleSubmit = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onSubmit({
      title: trimmedTitle,
      icon,
      color,
      visible,
    });

    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/40 px-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <Card
        elevation={0}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl! border border-gray-200! bg-white! p-5!"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div>
            <Typography className="font-bold! text-gray-900!">
              {isEdit ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
            </Typography>

            <Typography className="mt-1! text-xs! text-gray-400!">
              {isEdit
                ? "اطلاعات دسته‌بندی را ویرایش کنید."
                : "دسته‌بندی جدیدی برای منوی خود ایجاد کنید."}
            </Typography>
          </div>

          <IconButton
            size="small"
            onClick={onClose}
            className="text-gray-400!"
          >
            <X size={19} />
          </IconButton>
        </div>

        <div className="space-y-6 py-6">
          {/* Title */}
          <div>
            <Typography className="mb-2! text-sm! font-semibold! text-gray-700!">
              نام دسته‌بندی
            </Typography>

            <TextField
              fullWidth
              size="small"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="مثلاً پیتزا"
              inputProps={{
                maxLength: 50,
              }}
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
                    onClick={() => setIcon(item.value)}
                    className={`flex h-16 flex-col items-center justify-center gap-1 rounded-xl border transition-all ${
                      selected
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={20} />

                    <span className="text-[10px]">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color */}
          <div>
            <Typography className="mb-3! text-sm! font-semibold! text-gray-700!">
              رنگ دسته‌بندی
            </Typography>

            <div className="flex flex-wrap items-center gap-2">
              {categoryColors.map((item) => {
                const selected = color === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setColor(item)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-transform ${
                      selected
                        ? "scale-110 border-gray-900"
                        : "border-transparent"
                    }`}
                    style={{
                      backgroundColor: item,
                    }}
                    aria-label={`انتخاب رنگ ${item}`}
                  >
                    {selected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}

              {/* Custom color */}
              <label
                className="relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50"
                title="انتخاب رنگ دلخواه"
              >
                <input
                  type="color"
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />

                <div
                  className="h-6 w-6 rounded-full border border-gray-200"
                  style={{
                    backgroundColor: color,
                  }}
                />
              </label>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-lg"
                style={{
                  backgroundColor: `${color}18`,
                }}
              >
                {(() => {
                  const selectedIcon =
                    categoryIcons.find(
                      (item) => item.value === icon,
                    ) ?? categoryIcons[0];

                  const Icon = selectedIcon.icon;

                  return (
                    <div className="flex h-full w-full items-center justify-center">
                      <Icon
                        size={16}
                        style={{
                          color,
                        }}
                      />
                    </div>
                  );
                })()}
              </div>

              <Typography className="text-xs! text-gray-400!">
                پیش‌نمایش دسته‌بندی
              </Typography>
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
                  onChange={(event) =>
                    setVisible(event.target.checked)
                  }
                  size="small"
                />
              }
              label=""
              sx={{ margin: 0 }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
          <Button
            variant="outlined"
            onClick={onClose}
            className="rounded-xl!"
          >
            انصراف
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="rounded-xl!"
          >
            {isEdit ? "ذخیره تغییرات" : "افزودن دسته‌بندی"}
          </Button>
        </div>
      </Card>
    </div>
  );
}