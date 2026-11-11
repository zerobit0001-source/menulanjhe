"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { E017 } from "./utils";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/** Bottom sheet; `absolute` inside the template root so previews stay framed. */
export default function Template017Sheet({ open, title, onClose, children }: Props) {
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
            className="absolute inset-0 z-30"
            style={{ backgroundColor: "rgba(36,34,31,0.45)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 z-40 mx-auto flex max-h-[88%] w-full max-w-lg flex-col rounded-t-3xl outline-none"
            style={{ backgroundColor: E017.surface, color: E017.text }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 320 }}
          >
            <div className="flex items-center justify-between px-6 pb-3 pt-6">
              <h2 className="text-2xl font-black">{title}</h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="بستن"
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ border: `1px solid ${E017.border}` }}
              >
                <X size={16} />
              </button>
            </div>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
