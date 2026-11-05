"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";

import { P015 } from "./utils";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/** `absolute` inside the template root (never `fixed`) so previews stay framed. */
export default function Template015Sheet({
  open,
  title,
  onClose,
  children,
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
            className="absolute inset-0 z-30 bg-[#292522]/30 backdrop-blur-[3px]"
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
            className="absolute inset-x-0 bottom-0 z-40 mx-auto flex max-h-[86%] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] bg-white/85 outline-none backdrop-blur-2xl"
            style={{
              border: `1px solid ${P015.border}`,
              color: P015.text,
              boxShadow: "0 -18px 50px rgba(41,37,34,0.14)",
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
                style={{ backgroundColor: P015.border }}
              />
            </div>

            <div className="flex items-center justify-between px-6 pb-3 pt-2">
              <h2 className="text-base font-black">{title}</h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="بستن"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:brightness-95"
                style={{ backgroundColor: P015.soft, color: P015.accentStrong }}
              >
                <X size={17} />
              </button>
            </div>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
