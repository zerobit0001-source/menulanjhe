"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

import { sectionId } from "./utils";

/** Sticky mobile nav height; on desktop the rail floats, so only a small gap. */
const MOBILE_OFFSET = 60;
const DESKTOP_OFFSET = 16;

/**
 * Presentation-only helper: tracks which category section sits at the top of
 * the scroll container and scrolls to a section on request.
 */
export function useScrollSpy(
  containerRef: RefObject<HTMLElement | null>,
  categoryIds: string[],
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const key = categoryIds.join("|");
  const current =
    activeId && categoryIds.includes(activeId)
      ? activeId
      : (categoryIds[0] ?? null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.getAttribute("data-category-id"));
        }
      },
      { root, rootMargin: "-12% 0px -78% 0px", threshold: 0 },
    );

    categoryIds.forEach((id) => {
      const el = root.querySelector(`#${CSS.escape(sectionId(id))}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, key]);

  const scrollTo = useCallback(
    (id: string) => {
      const root = containerRef.current;
      const el = root?.querySelector<HTMLElement>(`#${CSS.escape(sectionId(id))}`);
      if (!root || !el) return;

      setActiveId(id);

      const offset = window.matchMedia("(min-width: 1024px)").matches
        ? DESKTOP_OFFSET
        : MOBILE_OFFSET;

      const top =
        el.getBoundingClientRect().top -
        root.getBoundingClientRect().top +
        root.scrollTop -
        offset;

      root.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    },
    [containerRef, reduce],
  );

  return { activeId: current, scrollTo };
}
