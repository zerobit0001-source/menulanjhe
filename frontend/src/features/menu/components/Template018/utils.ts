import type { MenuProduct } from "@/features/menu/types/menu.types";

export type Template018CartItem = {
  product: MenuProduct;
  quantity: number;
};

export type CartControls = {
  quantities: Record<string, number>;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export const formatNumber = (value: number) => value.toLocaleString("fa-IR");

export const formatPrice = (value: number) =>
  `${value.toLocaleString("fa-IR")} تومان`;

/** Two-digit Latin index for technical labels: 01, 02 … */
export const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Three base colours (#2B2D31 / #D9DADC / #FFC93C) plus opacity variations of
 * them for borders, panels and secondary text — no other hues.
 */
export const N018 = {
  bg: "#2B2D31",
  fg: "#D9DADC",
  accent: "#FFC93C",
  /** Secondary text: light gray at ~70% (≈5:1 on the charcoal background). */
  muted: "rgba(217,218,220,0.7)",
  line: "rgba(217,218,220,0.14)",
  lineStrong: "rgba(217,218,220,0.28)",
  panel: "rgba(217,218,220,0.045)",
  panelHover: "rgba(217,218,220,0.08)",
  overlay: "rgba(18,19,21,0.6)",
  hideScrollbar:
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
} as const;

export const MONO =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

export const CART_BAR_SPACE = "calc(6rem + env(safe-area-inset-bottom))";

export const sectionId = (categoryId: string) => `t018-${categoryId}`;
