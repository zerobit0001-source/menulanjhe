"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

const categories = [
  { id: "all", title: "همه" },
  { id: "cat_appetizer", title: "پیش‌غذا" },
  { id: "cat_main_course", title: "غذای اصلی" },
  { id: "cat_side_dish", title: "دورچین" },
  { id: "cat_beverage", title: "نوشیدنی" },
  { id: "cat_dessert", title: "دسر" },
];

export default function DashboardMenuCategoryFilter() {
  const [categoryFilter, setcategoryFilter] = useState("all");

  const handleSetFilter = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string | null,
  ) => {
    if (newFilter !== null) {
      setcategoryFilter(newFilter);
    }
  };

  return (
    <ToggleButtonGroup
      value={categoryFilter}
      exclusive
      onChange={handleSetFilter}
      size="small"
      aria-label="فیلتر دسته‌بندی"
    >
      {categories.map((category) => (
        <ToggleButton
          key={category.id}
          value={category.id}
        >
          {category.title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}