"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { T013 } from "./utils";

type Props = {
  tabs: { id: string; name: string }[];
  activeId: string;
  onSelect: (id: string) => void;
};

/** Quiet text tabs with a sliding gold underline (no pills). */
export default function Template013Tabs({ tabs, activeId, onSelect }: Props) {
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
      className="z-20 shrink-0"
      style={{
        backgroundColor: `${T013.base}F2`,
        borderBottom: `1px solid ${T013.line}`,
      }}
    >
      <div
        className={`mx-auto flex max-w-3xl gap-7 overflow-x-auto px-5 ${T013.hideScrollbar}`}
      >
        {tabs.map((tab) => {
          const active = tab.id === activeId;

          return (
            <button
              key={tab.id}
              ref={active ? activeRef : undefined}
              type="button"
              onClick={() => onSelect(tab.id)}
              aria-current={active ? "true" : undefined}
              className="relative shrink-0 py-3.5 text-sm font-bold transition-colors"
              style={{ color: active ? T013.accent : T013.muted }}
            >
              {tab.name}

              {active && (
                <motion.span
                  layoutId="t013-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full"
                  style={{ backgroundColor: T013.accent }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
