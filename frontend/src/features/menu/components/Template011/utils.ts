import type { MenuProduct } from "../../types/menu.types";

export type Template011CartItem = {
  product: MenuProduct;
  quantity: number;
};

export type Template011Collection = {
  id: string;
  name: string;
  products: MenuProduct[];
};

export const formatPrice = (value: number) =>
  `${value.toLocaleString("fa-IR")} تومان`;

export const toFa = (value: number) => value.toLocaleString("fa-IR");

/** Visual tokens shared by all Template011 parts. */
export const T011 = {
  accent: "#FFB454",
  accentInk: "#2A1A05",
  glass: "bg-white/12 backdrop-blur-xl border border-white/20",
  glassDark: "bg-neutral-900/65 backdrop-blur-2xl",
  hideScrollbar:
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
} as const;
