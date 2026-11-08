import type { MenuProduct } from "@/features/menu/types/menu.types";

export type Template016CartItem = {
  product: MenuProduct;
  quantity: number;
};

/** Everything a product row needs to talk to the cart. */
export type CartControls = {
  quantities: Record<string, number>;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export const formatNumber = (value: number) => value.toLocaleString("fa-IR");

export const formatPrice = (value: number) =>
  `${value.toLocaleString("fa-IR")} تومان`;

/**
 * Badge text derived from the real price: round thousands are shown as
 * "۳۲۰ هزار" so they fit a circle; anything else is shown in full.
 */
export const splitPrice = (price: number): { main: string; unit: string } =>
  price >= 1000 && price % 1000 === 0
    ? { main: formatNumber(price / 1000), unit: "هزار" }
    : { main: formatNumber(price), unit: "تومان" };

/**
 * Vintage palette. `brown` is a touch deeper than the suggested #A66D3F so
 * cream text on it stays ≥ 4.5:1; the original tone remains as `brownLight`
 * for ornaments.
 */
export const V016 = {
  bg: "#FFFDF8",
  brown: "#9A6236",
  brownLight: "#A66D3F",
  dark: "#6D351C",
  beige: "#C49A70",
  cream: "#F4E8D8",
  text: "#493020",
  muted: "#8A715D",
  border: "#B88C66",
  hideScrollbar:
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
} as const;

/** Latin ornaments use a classic serif stack; Persian text keeps the app font. */
export const SERIF = 'Georgia, "Times New Roman", Times, serif';

/** Space reserved under the scroll area for the floating cart tab. */
export const CART_TAB_SPACE = "calc(6rem + env(safe-area-inset-bottom))";
