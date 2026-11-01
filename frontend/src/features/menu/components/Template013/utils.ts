import type { MenuProduct } from "../../types/menu.types";

export type Template013CartItem = {
  product: MenuProduct;
  quantity: number;
};

/** Price without currency (the currency is stated once in the page header). */
export const formatNumber = (value: number) => value.toLocaleString("fa-IR");

export const formatPrice = (value: number) =>
  `${value.toLocaleString("fa-IR")} تومان`;

/**
 * "Matte black" palette.
 * - Base is a warm charcoal, never pure black (less harsh, reads as matte).
 * - Elevation is expressed by lightness steps, not shadows.
 * - One muted champagne accent used sparingly (prices, active states, CTA).
 * - Text is warm off-white / muted stone, both well above AA on the base.
 */
export const T013 = {
  base: "#141311",
  s1: "#1B1A17",
  s2: "#232220",
  s3: "#2C2B27",
  line: "rgba(236,231,221,0.09)",
  text: "#ECE7DD",
  muted: "#A8A194",
  accent: "#C9AA71",
  accentInk: "#1A1408",
  hideScrollbar:
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
} as const;
