"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";

import { T013 } from "./utils";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  maxHeight?: string;
  /** Hides the title row (used by the product detail, which has its own header). */
  hideTitle?: boolean;
};

/** Matte bottom sheet; `absolute` inside the template root so previews stay framed. */
export default function Template013Sheet({
  open,
  title,
  onClose,
  children,
  maxHeight = "86%",
  hideTitle = false,
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
            className="absolute inset-0 z-30 bg-black/60 backdrop-blur-[3px]"
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
            className="absolute inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-t-[26px] outline-none"
            style={{
              maxHeight,
              backgroundColor: T013.s1,
              borderTop: `1px solid ${T013.line}`,
              color: T013.text,
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 320 }}
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
              className="flex cursor-grab touch-none justify-center pb-1 pt-3 active:cursor-grabbing"
              onPointerDown={(event) => controls.start(event)}
            >
              <span
                className="h-1 w-10 rounded-full"
                style={{ backgroundColor: T013.s3 }}
              />
            </div>

            {!hideTitle && (
              <div className="flex items-center justify-between px-6 pb-3 pt-2">
                <h2 className="text-base font-bold">{title}</h2>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="بستن"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:brightness-125"
                  style={{ backgroundColor: T013.s2, color: T013.muted }}
                >
                  <X size={17} />
                </button>
              </div>
            )}

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
