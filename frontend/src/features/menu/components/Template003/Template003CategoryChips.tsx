"use client";

import type { MenuCategory } from "@/features/menu/types/menu.types";

type Props = {
  categories: MenuCategory[];
  activeCategory: string;
  onChange: (id: string) => void;
};

export default function Template003CategoryChips({
  categories,
  activeCategory,
  onChange,
}: Props) {
  return (
    <div className="sticky top-0 z-30 bg-[#FAFAF7]/95 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-2xl gap-2 overflow-x-auto px-4 [scrollbar-width:none]">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={`
                shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors
                ${
                  isActive
                    ? "bg-[#0F5C56] text-white"
                    : "bg-white text-[#1A1A1A] ring-1 ring-black/5"
                }
              `}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
