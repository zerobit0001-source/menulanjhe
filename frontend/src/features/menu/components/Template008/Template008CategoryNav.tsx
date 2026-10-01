"use client";
import { motion } from "framer-motion";
import type { T7Category } from "./bindings";

export function Template008CategoryNav({
  categories, active, onSelect,
}: { categories: T7Category[]; active: string | number | null; onSelect: (id: string | number | null) => void }) {
  const items = [{ id: null as string | number | null, name: "همه" }, ...categories.map((c) => ({ id: c.id, name: c.name }))];
  return (
    <nav className="sticky top-14 z-20 bg-[#FAFAFA]/90 py-3 backdrop-blur" aria-label="دسته‌بندی‌ها">
      <ul className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((c) => {
          const on = c.id === active;
          return (
            <li key={String(c.id)} className="shrink-0">
              <button
                onClick={() => onSelect(c.id)}
                aria-pressed={on}
                className="relative h-10 rounded-full border border-[#E5E5E5] bg-white px-5 text-sm text-[#737373] transition-colors"
              >
                {on && (
                  <motion.span layoutId="t7-cat" transition={{ duration: 0.25 }} className="absolute inset-0 rounded-full bg-[#171717]" />
                )}
                <span className={`relative ${on ? "font-semibold text-white" : ""}`}>{c.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
