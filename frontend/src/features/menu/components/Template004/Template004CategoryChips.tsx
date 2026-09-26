"use client";

import type { MenuCategory } from "@/features/menu/types/menu.types";

type Props = {
  categories: MenuCategory[];
  activeCategory: string;
  onChange: (id: string) => void;
};

export default function Template004CategoryChips({
  categories,
  activeCategory,
  onChange,
}: Props) {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-5">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        <button
          type="button"
          onClick={() => onChange("all")}
          className={`
            shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors
            ${
              activeCategory === "all"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-500 ring-1 ring-gray-200"
            }
          `}
        >
          همه
        </button>

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
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-500 ring-1 ring-gray-200"
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
