"use client";

import { motion } from "framer-motion";

import type { MenuCategory } from "@/features/menu/types/menu.types";

type Props = {
  categories: MenuCategory[];
  activeCategory: string;
  onChange: (id: string) => void;
};

export default function Template006CategoryNav({
  categories,
  activeCategory,
  onChange,
}: Props) {
  return (
    <div className="mx-auto max-w-5xl overflow-x-auto px-4 py-6">
      <div className="flex w-max gap-2">
        {categories.map((category) => {
          const active = category.id === activeCategory;

          return (
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              key={category.id}
              onClick={() => onChange(category.id)}
              className={[
                "rounded-full border px-5 py-2.5 text-xs font-bold transition",
                active
                  ? "border-white bg-white text-black"
                  : "border-white/[0.08] bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white",
              ].join(" ")}
            >
              {category.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
