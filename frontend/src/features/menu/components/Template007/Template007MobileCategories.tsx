"use client";

import { motion } from "framer-motion";
import type { MenuCategory } from "@/features/menu/types/menu.types";

type Props = {
  categories: MenuCategory[];
  activeCategory: string;
  onChange: (id: string) => void;
};

export default function Template007MobileCategories({
  categories,
  activeCategory,
  onChange,
}: Props) {
  return (
    <div className="pb-4 lg:hidden">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className="relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold"
            >
              {isActive && (
                <motion.span
                  layoutId="t6-mobile-active"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-[#B98252]"
                />
              )}

              <span
                className={`relative z-10 ${
                  isActive ? "text-[#18110C]" : "text-[#CDBEAE]"
                }`}
              >
                {category.name}
              </span>

              {!isActive && (
                <span className="absolute inset-0 rounded-full border border-[#F5EBDD]/[0.08]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
