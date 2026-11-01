"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Template011Sheet from "./Template011Sheet";
import { T011, toFa, type Template011Collection } from "./utils";

type Props = {
  open: boolean;
  collections: Template011Collection[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export default function Template011CategorySheet({
  open,
  collections,
  activeId,
  onSelect,
  onClose,
}: Props) {
  const activeRef = useRef<HTMLButtonElement>(null);

  // Bring the active card into view once the sheet has mounted.
  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      activeRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <Template011Sheet
      open={open}
      title="دسته‌بندی‌ها"
      onClose={onClose}
      maxHeight="60%"
    >
      <div
        className={`flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-8 pt-1 ${T011.hideScrollbar}`}
      >
        {collections.map((collection, i) => {
          const active = collection.id === activeId;
          const cover = collection.products.find((p) => p.image)?.image;

          return (
            <motion.button
              key={collection.id}
              ref={active ? activeRef : undefined}
              type="button"
              onClick={() => onSelect(collection.id)}
              aria-pressed={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
              whileTap={{ scale: 0.97 }}
              className={`relative h-52 w-40 shrink-0 snap-center overflow-hidden rounded-3xl border text-right text-white transition-colors ${
                active ? "border-amber-300" : "border-white/15"
              }`}
            >
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cover}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-amber-900 to-neutral-900" />
              )}

              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-sm font-black leading-6">{collection.name}</p>

                <p className="mt-0.5 text-[11px] text-white/70">
                  {toFa(collection.products.length)} محصول
                </p>
              </div>

              {active && (
                <span
                  className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-black"
                  style={{ backgroundColor: T011.accent, color: T011.accentInk }}
                >
                  فعلی
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </Template011Sheet>
  );
}
