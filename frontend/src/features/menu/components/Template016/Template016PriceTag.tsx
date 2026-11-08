"use client";

import { V016, formatNumber, splitPrice } from "./utils";

export type PriceShape = "circle" | "block" | "plain";

type Props = {
  price: number;
  shape: PriceShape;
  /** Draw on a brown/dark surface (Drink section). */
  onDark?: boolean;
};

/** One component for the three decorative price treatments. */
export default function Template016PriceTag({
  price,
  shape,
  onDark = false,
}: Props) {
  if (shape === "plain") {
    return (
      <span
        className="shrink-0 text-sm font-black tabular-nums"
        style={{ color: onDark ? V016.bg : V016.dark }}
      >
        {formatNumber(price)}
      </span>
    );
  }

  const { main, unit } = splitPrice(price);

  const common = {
    backgroundColor: V016.brown,
    color: V016.bg,
    boxShadow: `inset 0 0 0 2px ${V016.brown}, inset 0 0 0 3px ${V016.cream}88`,
  } as const;

  if (shape === "circle") {
    return (
      <span
        className="flex h-[3.75rem] w-[3.75rem] shrink-0 flex-col items-center justify-center rounded-full leading-none"
        style={common}
      >
        <span className="text-[15px] font-black tabular-nums">{main}</span>

        <span className="mt-1 text-[9px] font-semibold opacity-90">{unit}</span>
      </span>
    );
  }

  return (
    <span
      className="flex h-[3.1rem] w-[3.6rem] shrink-0 flex-col items-center justify-center leading-none"
      style={common}
    >
      <span className="text-sm font-black tabular-nums">{main}</span>

      <span className="mt-1 text-[9px] font-semibold opacity-90">{unit}</span>
    </span>
  );
}
