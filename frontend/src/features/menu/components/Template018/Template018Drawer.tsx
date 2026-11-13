"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { TechLabel } from "./TechDetails";
import { useIsDesktop } from "./useIsDesktop";
import { N018 } from "./utils";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Desktop: side drawer. Mobile: bottom sheet. `absolute` inside the template
 * root so previews stay framed.
 */
export default function Template018Drawer({ open, title, onClose, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();

  useEffect(() => {
    if (!open) return;

    panelRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const hidden = desktop ? { x: "-100%" } : { y: "100%" };
  const shown = desktop ? { x: 0 } : { y: 0 };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            aria-hidden
            className="absolute inset-0 z-30"
            style={{ backgroundColor: N018.overlay }}
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
            className="absolute inset-x-0 bottom-0 z-40 mx-auto flex max-h-[88%] w-full max-w-lg flex-col rounded-t-3xl outline-none lg:inset-y-0 lg:left-0 lg:right-auto lg:mx-0 lg:max-h-none lg:w-[26rem] lg:max-w-none lg:rounded-none lg:rounded-r-3xl"
            style={{
              backgroundColor: N018.bg,
              color: N018.fg,
              border: `1px solid ${N018.lineStrong}`,
              boxShadow: "0 0 40px rgba(0,0,0,0.45)",
            }}
            initial={hidden}
            animate={shown}
            exit={hidden}
            transition={{ type: "spring", damping: 34, stiffness: 320 }}
          >
            <div
              className="flex items-center justify-between px-6 pb-4 pt-6"
              style={{ borderBottom: `1px solid ${N018.line}` }}
            >
              <div>
                <TechLabel accent>cart</TechLabel>
                <h2 className="text-xl font-black">{title}</h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="بستن"
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ border: `1px solid ${N018.line}` }}
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
