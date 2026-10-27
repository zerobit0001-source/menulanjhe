"use client";
import { useEffect, useState } from "react";
import type { MenuCategory } from "../adapter";

interface Props {
  categories: MenuCategory[];
  onSelect: (id: string) => void;
}

export function CategoryNavigation({ categories, onSelect }: Props) {
  const [activeId, setActiveId] = useState<string | null>(
    categories[0]?.id ?? null,
  );

  // Track the section nearest the top while scrolling.
  useEffect(() => {
    const targets = categories
      .map((c) => document.getElementById(`ch-cat-${c.id}`))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || typeof IntersectionObserver === "undefined")
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (visible) setActiveId(visible.target.id.replace("ch-cat-", ""));
      },
      { rootMargin: "-130px 0px -60% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [categories]);

  const currentId = categories.some((c) => c.id === activeId)
    ? activeId
    : categories[0]?.id;

  return (
    <nav className="ch-cats" aria-label="دسته‌بندی منو">
      <div className="ch-container">
        <div className="ch-cats__list">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="ch-chip"
              aria-current={c.id === currentId}
              onClick={() => {
                setActiveId(c.id);
                onSelect(c.id);
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
