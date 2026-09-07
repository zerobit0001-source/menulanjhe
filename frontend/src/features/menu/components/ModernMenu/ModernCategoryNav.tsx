"use client";

import { useState } from "react";
import { Chip } from "@mui/material";
import type { MenuCategory } from "../../types/menu.types";

type ModernCategoryNavProps = {
  categories: MenuCategory[];
};

export default function ModernCategoryNav({
  categories,
}: ModernCategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");

  return (
    <nav className="sticky top-0 z-20 border-y border-zinc-100 bg-white/90 px-5 py-3 backdrop-blur">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => setActiveCategory(category.id)}
              variant={isActive ? "filled" : "outlined"}
              sx={{
                flexShrink: 0,
                fontFamily: "Vazirmatn, sans-serif",
                fontWeight: 500,
                borderRadius: "10px",
              }}
            />
          );
        })}
      </div>
    </nav>
  );
}
