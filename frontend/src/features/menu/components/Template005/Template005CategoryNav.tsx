"use client";

import type { MenuCategory } from "@/features/menu/types/menu.types";

type Props = {
  categories: MenuCategory[];
  activeCategory: string;
  onChange: (id: string) => void;
};

export default function Template005CategoryNav({
  categories,
  activeCategory,
  onChange,
}: Props) {
  return (
    <div className="mx-auto max-w-5xl overflow-x-auto px-4 py-5">
      <div className="flex w-max gap-2">
        {categories.map((category) => {
          const active = category.id === activeCategory;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={[
                "rounded-full px-4 py-2 text-xs font-bold transition",
                active
                  ? "bg-slate-950 text-white"
                  : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-100",
              ].join(" ")}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
