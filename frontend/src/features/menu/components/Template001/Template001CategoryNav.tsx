"use client";

import type { MenuCategory } from "../../types/menu.types";

type Props = {
  categories: MenuCategory[];
  activeCategory: string;
  onChange: (id: string) => void;
};

export default function Template001CategoryNav({
  categories,
  activeCategory,
  onChange,
}: Props) {
  return (
    <nav className="sticky top-16 z-30 border-y border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl gap-5 overflow-x-auto px-4 scrollbar-hide">
        {categories.map((category) => {
          const active = category.id === activeCategory;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={`relative shrink-0 py-3 text-xs font-semibold transition ${
                active ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {category.name}

              {active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-gray-900" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
