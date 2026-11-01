"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

import { T012, toFa } from "./utils";

export type Template012CategoryOption = {
  id: string;
  name: string;
  count: number;
};

type Props = {
  open: boolean;
  options: Template012CategoryOption[];
  /** "" means all products. */
  activeId: string;
  totalCount: number;
  onOpen: () => void;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export default function Template012CategoryDrawer({
  open,
  options,
  activeId,
  totalCount,
  onOpen,
  onSelect,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const rows: Template012CategoryOption[] = [
    { id: "", name: "همه محصولات", count: totalCount },
    ...options,
  ];

  return (
    <>
      {/* Small arrow, left edge, vertically centered */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="handle"
            type="button"
            onClick={onOpen}
            aria-label="باز کردن دسته‌بندی‌ها"
            aria-expanded={open}
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="absolute left-0 top-1/2 z-20 flex h-12 w-6 -translate-y-1/2 items-center justify-center rounded-r-2xl bg-white/90 text-[#1F2A24] shadow-md ring-1 ring-black/10 backdrop-blur-md"
          >
            <ChevronRight size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden
              className="absolute inset-0 z-30 bg-black/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />

            <motion.nav
              key="panel"
              aria-label="دسته‌بندی‌ها"
              className="absolute inset-y-0 left-0 z-40 flex w-64 max-w-[78%] flex-col rounded-r-[28px] bg-[#FAF7F2]/95 shadow-2xl backdrop-blur-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0.4, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70 || info.velocity.x < -500) onClose();
              }}
            >
              <div className="flex items-center justify-between px-5 pb-3 pt-[max(env(safe-area-inset-top),20px)]">
                <h2 className="text-base font-black text-[#1F2A24]">
                  دسته‌بندی‌ها
                </h2>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="بستن دسته‌بندی‌ها"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-[#1F2A24] hover:bg-black/10"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>

              <ul
                className={`flex-1 space-y-1.5 overflow-y-auto px-3 pb-6 ${T012.hideScrollbar}`}
              >
                {rows.map((row, i) => {
                  const active = row.id === activeId;

                  return (
                    <motion.li
                      key={row.id || "all"}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.25 }}
                    >
                      <button
                        type="button"
                        onClick={() => onSelect(row.id)}
                        aria-current={active ? "true" : undefined}
                        className={`flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-3 text-right text-sm font-bold transition-colors ${
                          active
                            ? "text-white"
                            : "text-[#1F2A24] hover:bg-black/5"
                        }`}
                        style={
                          active ? { backgroundColor: T012.accent } : undefined
                        }
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          {active && <Check size={16} className="shrink-0" />}
                          <span className="truncate">{row.name}</span>
                        </span>

                        <span
                          className={`shrink-0 text-xs ${
                            active ? "text-white/80" : "text-[#1F2A24]/45"
                          }`}
                        >
                          {toFa(row.count)}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
