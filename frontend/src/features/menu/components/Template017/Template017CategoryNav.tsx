"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import type { MenuCategory } from "@/features/menu/types/menu.types";
import { E017, NAV_OFFSET } from "./utils";

type Props = {
  categories: MenuCategory[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

/** Sticky, horizontally scrollable category strip with a sliding underline. */
export default function Template017CategoryNav({
  categories,
  activeId,
  onSelect,
}: Props) {
  const stripRef = useRef<HTMLDivElement>(null);

  // Keep the active chip visible without scrolling the page itself.
  useEffect(() => {
    const strip = stripRef.current;
    const chip = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!strip || !chip) return;

    const target = chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2;
    strip.scrollTo({ left: target, behavior: "smooth" });
  }, [activeId]);

  if (categories.length === 0) return null;

  return (
    <nav
      aria-label="دسته‌بندی‌ها"
      className="sticky top-0 z-10 -mx-4 px-4 sm:-mx-8 sm:px-8"
      style={{
        height: NAV_OFFSET,
        backgroundColor: `${E017.bg}F2`,
        borderBottom: `1px solid ${E017.border}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        ref={stripRef}
        className={`relative mx-auto flex h-full max-w-6xl items-stretch gap-1 overflow-x-auto ${E017.hideScrollbar}`}
      >
        {categories.map((category) => {
          const active = category.id === activeId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              aria-current={active ? "true" : undefined}
              className="relative shrink-0 whitespace-nowrap px-4 text-sm transition-colors"
              style={{
                color: active ? E017.text : E017.muted,
                fontWeight: active ? 900 : 600,
              }}
            >
              {category.name}

              {active && (
                <motion.span
                  layoutId="t017-nav-underline"
                  className="absolute inset-x-3 bottom-0 h-0.5"
                  style={{ backgroundColor: E017.accent }}
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
