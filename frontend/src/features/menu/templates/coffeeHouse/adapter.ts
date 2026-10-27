// ASSUMPTION: all imports/paths/signatures below must be matched to the real project.
import { useMemo } from "react";
import { useMenuSearch } from "../../hooks/useMenuSearch";
import { useMenuCart } from "../../hooks/useMenuCart";
import { useMenuOrder } from "../../hooks/useMenuOrder";
// import { useMenuSearch } from "@/features/menu/hooks/use-menu-search";
// import { useMenuCart } from "@/features/menu/hooks/use-menu-cart";
// import { useMenuOrder } from "@/features/menu/hooks/use-menu-order";
// import type { PublicMenu, MenuCategory, MenuProduct, QuickSection } from "@/features/menu/types";

export interface MenuProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  isAvailable: boolean;
}
export interface MenuCategory {
  id: string;
  name: string;
  products: MenuProduct[];
}
export interface QuickSectionData {
  id: string;
  title: string;
  products: MenuProduct[];
}
export interface PublicMenu {
  restaurantName: string;
  description?: string | null;
  categories: MenuCategory[];
  quickSections?: QuickSectionData[];
}

export interface CartLine {
  product: MenuProduct;
  quantity: number;
}

export interface OrderReceiptData {
  id: string;
  status?: string;
  total: number;
  items?: {
    name: string;
    quantity: number;
    unitPrice?: number;
    lineTotal?: number;
  }[];
}

export interface CheckoutInput {
  customerName?: string;
  notes?: string;
}

export interface CoffeeShop {
  search: {
    query: string;
    setQuery: (q: string) => void;
    categories: MenuCategory[];
    resultCount: number;
    isSearching: boolean;
  };
  cart: {
    lines: CartLine[];
    count: number;
    total: number;
    quantityOf: (productId: string) => number;
    add: (productId: string) => void;
    increase: (productId: string) => void;
    decrease: (productId: string) => void;
    remove: (productId: string) => void;
    clear: () => void;
  };
  order: {
    /** Returns the backend receipt, or null on failure (error is then set). */
    submit: (input: CheckoutInput) => Promise<OrderReceiptData | null>;
    isSubmitting: boolean;
    error: string | null;
  };
}

// ASSUMPTION: replace with the project's price helper and currency label.
const CURRENCY_LABEL = "تومان";
export const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("fa-IR").format(value)} ${CURRENCY_LABEL}`;

export function useCoffeeShop(menu: PublicMenu, qrToken: string): CoffeeShop {
  // Cart must know every product, including quick-section-only ones.
  const allProducts = useMemo(() => {
    const map = new Map<string, MenuProduct>();
    menu.categories.forEach((c) => c.products.forEach((p) => map.set(p.id, p)));
    menu.quickSections?.forEach((s) =>
      s.products.forEach((p) => map.set(p.id, p)),
    );
    return [...map.values()];
  }, [menu]);

  const searchHooke = useMenuSearch(menu.categories);
  const cartHook = useMenuCart(allProducts);
  const orderHook = useMenuOrder();

  // ---- ASSUMPTION: wire to the real hooks. Sketch: ----
  // const searchHook = useMenuSearch(menu.categories);
  // const cartHook = useMenuCart(allProducts);
  // const orderHook = useMenuOrder();
  //
  // return {
  //   search: {
  //     query: searchHook.query,
  //     setQuery: searchHook.setQuery,
  //     categories: searchHook.filteredCategories,
  //     resultCount: searchHook.filteredCategories.reduce((n, c) => n + c.products.length, 0),
  //     isSearching: searchHook.query.trim().length > 0,
  //   },
  //   cart: {
  //     lines: cartHook.items,                // map to { product, quantity }
  //     count: cartHook.totalCount,
  //     total: cartHook.totalPrice,           // display only; backend is authoritative
  //     quantityOf: cartHook.getQuantity,
  //     add: cartHook.addItem,                // check: id or product?
  //     increase: cartHook.increment,
  //     decrease: cartHook.decrement,
  //     remove: cartHook.removeItem,
  //     clear: cartHook.clear,
  //   },
  //   order: {
  //     submit: async (input) => {
  //       try {
  //         const res = await orderHook.submit({ qrToken, items: cartHook.items, ...input });
  //         return mapToReceipt(res);         // map the REAL response, don't invent fields
  //       } catch { return null; }
  //     },
  //     isSubmitting: orderHook.isPending,
  //     error: orderHook.error?.message ?? null,
  //   },
  // };
  void qrToken;
  void allProducts;
}
