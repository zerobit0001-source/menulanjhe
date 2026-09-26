"use client";

import type { MenuCategory } from "@/features/menu/types/menu.types";

type Props = {
  categories: MenuCategory[];
  activeCategory: string;
  onChange: (id: string) => void;
};

export default function Template002CategoryTabs({
  categories,
  activeCategory,
  onChange,
}: Props) {
  return (
    <nav className="sticky top-0 z-30 border-b border-[#3A332C] bg-[#1C1815]/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl gap-6 overflow-x-auto px-5 py-3 [scrollbar-width:none]">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={`
                shrink-0 whitespace-nowrap pb-1.5 text-sm font-semibold transition-colors
                ${
                  isActive
                    ? "border-b-2 border-[#B8935F] text-[#F2EDE4]"
                    : "border-b-2 border-transparent text-[#9C9186]"
                }
              `}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
