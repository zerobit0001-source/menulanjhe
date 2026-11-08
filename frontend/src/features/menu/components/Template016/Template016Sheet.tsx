"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { DoubleRule } from "./Ornaments";
import { V016 } from "./utils";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/** Paper-style sheet; `absolute` inside the template root so previews stay framed. */
export default function Template016Sheet({
  open,
  title,
  onClose,
  children,
}: Props) {
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
            style={{ backgroundColor: "rgba(73,48,32,0.45)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 z-40 mx-auto flex max-h-[88%] w-full max-w-lg flex-col outline-none"
            style={{
              backgroundColor: V016.bg,
              border: `1px solid ${V016.border}`,
              color: V016.text,
              boxShadow: "0 -12px 40px rgba(73,48,32,0.25)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 320 }}
          >
            <div className="flex items-center justify-between px-6 pb-2 pt-5">
              <h2 className="text-lg font-black" style={{ color: V016.dark }}>
                {title}
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="بستن"
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ border: `1px solid ${V016.border}`, color: V016.dark }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6">
              <DoubleRule />
            </div>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
