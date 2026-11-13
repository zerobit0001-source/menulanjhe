"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import type { MenuCategory } from "@/features/menu/types/menu.types";
import { TechLabel } from "./TechDetails";
import { N018, formatNumber, pad } from "./utils";

type Props = {
  categories: MenuCategory[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

/** Mobile: sticky horizontal strip. Active chip is yellow. */
export function CategoryStrip({ categories, activeId, onSelect }: Props) {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const chip = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!strip || !chip) return;

    strip.scrollTo({
      left: chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  if (categories.length === 0) return null;

  return (
    <nav
      aria-label="دسته‌بندی‌ها"
      className="sticky top-0 z-10 -mx-4 px-4 py-2.5 sm:-mx-8 sm:px-8 lg:hidden"
      style={{
        backgroundColor: "rgba(43,45,49,0.94)",
        borderBottom: `1px solid ${N018.line}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        ref={stripRef}
        className={`flex gap-2 overflow-x-auto ${N018.hideScrollbar}`}
      >
        {categories.map((category) => {
          const active = category.id === activeId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              aria-current={active ? "true" : undefined}
              className="relative h-10 shrink-0 whitespace-nowrap rounded-lg px-4 text-sm"
              style={{
                border: `1px solid ${active ? N018.accent : N018.line}`,
                color: active ? N018.bg : N018.fg,
                fontWeight: active ? 900 : 600,
              }}
            >
              {active && (
                <motion.span
                  layoutId="t018-chip"
                  aria-hidden
                  className="absolute inset-0 rounded-lg"
                  style={{ backgroundColor: N018.accent }}
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}

              <span className="relative">{category.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** Desktop: sticky vertical index rail with technical numbering. */
export function CategoryRail({ categories, activeId, onSelect }: Props) {
  if (categories.length === 0) return null;

  return (
    <nav
      aria-label="دسته‌بندی‌ها"
      className="sticky top-4 hidden self-start lg:block"
    >
      <div
        className="rounded-2xl p-2"
        style={{ border: `1px solid ${N018.line}`, backgroundColor: N018.panel }}
      >
        <div className="px-3 pb-2 pt-2">
          <TechLabel>index</TechLabel>
        </div>

        <ul className="max-h-[calc(100dvh-9rem)] overflow-y-auto">
          {categories.map((category, i) => {
            const active = category.id === activeId;

            return (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => onSelect(category.id)}
                  aria-current={active ? "true" : undefined}
                  className="relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm transition-colors hover:bg-[rgba(217,218,220,0.06)]"
                  style={{
                    color: active ? N018.accent : N018.fg,
                    fontWeight: active ? 900 : 600,
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="t018-rail"
                      aria-hidden
                      className="absolute inset-y-1.5 right-0 w-0.5 rounded-full"
                      style={{ backgroundColor: N018.accent }}
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}

                  <TechLabel accent={active}>{pad(i + 1)}</TechLabel>

                  <span className="flex-1 truncate">{category.name}</span>

                  <span className="text-[11px] tabular-nums" style={{ color: N018.muted }}>
                    {formatNumber(category.products.length)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
