import type { MenuProduct } from "@/features/menu/types/menu.types";

export type Template015CartItem = {
  product: MenuProduct;
  quantity: number;
};

export const formatNumber = (value: number) => value.toLocaleString("fa-IR");

export const formatPrice = (value: number) =>
  `${value.toLocaleString("fa-IR")} تومان`;

/** Premium light palette (warm neutrals). */
export const P015 = {
  bg: "#F8F7F4",
  card: "#FFFFFF",
  text: "#292522",
  /** Slightly deeper than the suggested #827A73 so small text stays readable. */
  muted: "#6F6760",
  accent: "#B8754D",
  /** Accent for fills/text on white (white text on it ≈ 5.3:1). */
  accentStrong: "#9A5C37",
  soft: "#F2E5DC",
  border: "#EAE5DF",
  hideScrollbar:
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
} as const;

/** Space kept under the scroll area for the floating cart bar. */
export const CART_BAR_SPACE = "calc(6.5rem + env(safe-area-inset-bottom))";
