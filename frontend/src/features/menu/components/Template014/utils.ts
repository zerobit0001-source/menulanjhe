import type { MenuProduct } from "../../types/menu.types";

export type Template014CartItem = {
  product: MenuProduct;
  quantity: number;
};

export const formatNumber = (value: number) => value.toLocaleString("fa-IR");

export const formatPrice = (value: number) =>
  `${value.toLocaleString("fa-IR")} تومان`;

/**
 * "Dark Category Flow" palette — deep brown, burnt orange, warm red.
 * `accentInk` is the text color used ON the accent fill (the light text color
 * would only reach ~3.4:1 there; the dark base reaches ~5:1).
 */
export const T014 = {
  base: "#171311",
  s1: "#241B17",
  s2: "#30221B",
  s3: "#3B2A21",
  line: "#49352A",
  text: "#F5EDE5",
  muted: "#B7A69A",
  accent: "#C66A32",
  accent2: "#A9432B",
  accentInk: "#171311",
  hideScrollbar:
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
} as const;

/** Height reserved at the bottom of the scroll area so the nav never covers content. */
export const BOTTOM_NAV_SPACE = "calc(7.5rem + env(safe-area-inset-bottom))";
