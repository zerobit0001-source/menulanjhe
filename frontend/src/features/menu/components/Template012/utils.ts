import type { MenuProduct } from "../../types/menu.types";

export type Template012CartItem = {
  product: MenuProduct;
  quantity: number;
};

export const formatPrice = (value: number) =>
  `${value.toLocaleString("fa-IR")} تومان`;

export const toFa = (value: number) => value.toLocaleString("fa-IR");

/** Template012 palette: warm paper + deep green accent. */
export const T012 = {
  bg: "#FAF7F2",
  ink: "#1F2A24",
  accent: "#1F6F4A",
  accentSoft: "#E3F1EA",
  hideScrollbar:
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
} as const;
