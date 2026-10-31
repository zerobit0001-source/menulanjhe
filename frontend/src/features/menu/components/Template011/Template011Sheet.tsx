"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";

import { T011 } from "./utils";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** Max height of the panel relative to the template root. */
  maxHeight?: string;
};

/**
 * Glass bottom sheet. Positioned `absolute` inside the template root (never
 * `fixed`) so it also stays inside preview frames.
 */
export default function Template011Sheet({
  open,
  title,
  onClose,
  children,
  maxHeight = "82%",
}: Props) {
  const controls = useDragControls();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    panelRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            aria-hidden
            className="absolute inset-0 z-30 bg-black/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={`absolute inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-2xl flex-col rounded-t-[28px] border-t border-white/15 text-white shadow-2xl outline-none ${T011.glassDark}`}
            style={{ maxHeight }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag="y"
            dragListener={false}
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110 || info.velocity.y > 600) onClose();
            }}
          >
            <div
              className="flex cursor-grab touch-none flex-col items-center pt-3 active:cursor-grabbing"
              onPointerDown={(event) => controls.start(event)}
            >
              <span className="h-1.5 w-10 rounded-full bg-white/30" />
            </div>

            <div className="flex items-center justify-between px-5 pb-3 pt-3">
              <h2 className="text-base font-black">{title}</h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="بستن"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
