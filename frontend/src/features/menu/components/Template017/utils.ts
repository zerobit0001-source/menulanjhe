import type { MenuProduct } from "@/features/menu/types/menu.types";

export type Template017CartItem = {
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

/** Section index as an editorial folio: ۰۱, ۰۲ … */
export const folio = (index: number) =>
  (index + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 });

/**
 * Editorial palette. `muted` is slightly darker than the suggested #777168 so
 * small secondary text keeps ≥ 4.5:1 contrast on the page background.
 */
export const E017 = {
  bg: "#F5F2EB",
  surface: "#FFFDF8",
  text: "#24221F",
  muted: "#6B655C",
  accent: "#A34F35",
  border: "#DED8CD",
  soft: "#EAE5DB",
  hideScrollbar:
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
} as const;

export const SERIF = 'Georgia, "Times New Roman", Times, serif';

export const CART_BAR_SPACE = "calc(6rem + env(safe-area-inset-bottom))";

export const sectionId = (categoryId: string) => `t017-${categoryId}`;

/** Height of the sticky category navigation, used for scroll offsets. */
export const NAV_OFFSET = 56;
