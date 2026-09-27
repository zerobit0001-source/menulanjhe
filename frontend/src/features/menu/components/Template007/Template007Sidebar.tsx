"use client";

import { motion } from "framer-motion";
import type { MenuCategory } from "@/features/menu/types/menu.types";

type Props = {
  categories: MenuCategory[];
  activeCategory: string;
  onChange: (id: string) => void;
};

export default function Template007Sidebar({
  categories,
  activeCategory,
  onChange,
}: Props) {
  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start">
      <div className="rounded-3xl border border-[#F5EBDD]/[0.08] bg-[#18110C] p-3">
        <p className="px-3 pb-3 pt-1 text-xs font-bold tracking-wide text-[#CDBEAE]">
          دسته‌بندی‌ها
        </p>

        <nav className="flex max-h-[calc(100vh-11rem)] flex-col gap-0.5 overflow-y-auto pr-1">
          {categories.map((category) => {
            const isActive = category.id === activeCategory;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onChange(category.id)}
                className="relative flex items-center rounded-xl px-3 py-2.5 text-right text-sm transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="t6-sidebar-active"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-[#2B1C13]"
                  />
                )}

                {isActive && (
                  <motion.span
                    layoutId="t6-sidebar-bar"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute right-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-[#B98252]"
                  />
                )}

                <span
                  className={`relative z-10 mr-2 font-medium transition-colors ${
                    isActive ? "text-[#F5EBDD]" : "text-[#CDBEAE]"
                  }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
