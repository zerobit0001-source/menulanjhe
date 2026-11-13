import type { ReactNode } from "react";

import { MONO, N018 } from "./utils";

/** Four thin corner ticks drawn over a positioned parent. */
export function CornerTicks({ color = N018.lineStrong }: { color?: string }) {
  const tick = "pointer-events-none absolute h-2.5 w-2.5";
  const line = `1px solid ${color}`;

  return (
    <>
      <span aria-hidden className={`${tick} left-0 top-0`} style={{ borderLeft: line, borderTop: line }} />
      <span aria-hidden className={`${tick} right-0 top-0`} style={{ borderRight: line, borderTop: line }} />
      <span aria-hidden className={`${tick} bottom-0 left-0`} style={{ borderLeft: line, borderBottom: line }} />
      <span aria-hidden className={`${tick} bottom-0 right-0`} style={{ borderRight: line, borderBottom: line }} />
    </>
  );
}

/** Small uppercase monospaced label (Latin only — letter-spacing never touches Persian). */
export function TechLabel({
  children,
  accent = false,
  className = "",
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      dir="ltr"
      className={`text-[10px] font-semibold uppercase ${className}`}
      style={{
        fontFamily: MONO,
        letterSpacing: "0.16em",
        color: accent ? N018.accent : N018.muted,
      }}
    >
      {children}
    </span>
  );
}
