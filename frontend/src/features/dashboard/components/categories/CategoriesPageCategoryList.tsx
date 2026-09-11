"use client";

import { dashboardCategories } from "../../data/categories/demoCategories";
import { DashboardCategory } from "../../types/categories/categories.type";
import CategoriesPageCategoryCard from "./CategoriesPageCategoryCard";

type Props = {
  onEdit: (category: DashboardCategory) => void;
  onDelete: (category: DashboardCategory) => void;
  onToggleVisibility: (category: DashboardCategory) => void;
};

export default function CategoriesPageCategoryList({
  onEdit,
  onDelete,
  onToggleVisibility,
}: Props) {
  if (dashboardCategories.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-500">
            دسته‌بندی‌ای پیدا نشد
          </p>

          <p className="mt-1 text-xs text-gray-400">
            عبارت جستجو یا فیلتر را تغییر دهید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {dashboardCategories.map((category) => (
        <CategoriesPageCategoryCard
          key={category.id}
          category={category}
          onEdit={() => onEdit(category)}
          onDelete={() => onDelete(category)}
          onToggleVisibility={() => onToggleVisibility(category)}
        />
      ))}
    </div>
  );
}
