"use client";

import { useEffect, useRef } from "react";

import { T014, formatNumber } from "./utils";

type Props = {
  categories: { id: string; name: string; count: number }[];
  activeId: string;
  onSelect: (id: string) => void;
};

/**
 * Category selector.
 * Mobile: one horizontally scrollable row. Desktop (md+): wraps and centers so
 * every category is visible at once.
 */
export default function Template014CategoryStrip({
  categories,
  activeId,
  onSelect,
}: Props) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  return (
    <nav
      aria-label="دسته‌بندی‌ها"
      className="z-20 shrink-0 pb-3 pt-1"
      style={{
        backgroundColor: T014.base,
        borderBottom: `1px solid ${T014.line}`,
      }}
    >
      <div
        className={`mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 md:flex-wrap md:justify-center md:overflow-visible ${T014.hideScrollbar}`}
      >
        {categories.map((category) => {
          const active = category.id === activeId;

          return (
            <button
              key={category.id}
              ref={active ? activeRef : undefined}
              type="button"
              onClick={() => onSelect(category.id)}
              aria-pressed={active}
              className="flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition-colors duration-200"
              style={
                active
                  ? {
                      backgroundColor: T014.accent,
                      color: T014.accentInk,
                      border: `1px solid ${T014.accent}`,
                    }
                  : {
                      backgroundColor: T014.s1,
                      color: T014.text,
                      border: `1px solid ${T014.line}`,
                    }
              }
            >
              {category.name}

              <span
                className="rounded-full px-1.5 text-[10px] font-black tabular-nums leading-5"
                style={
                  active
                    ? { backgroundColor: "rgba(23,19,17,0.18)" }
                    : { backgroundColor: T014.s2, color: T014.muted }
                }
              >
                {formatNumber(category.count)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
