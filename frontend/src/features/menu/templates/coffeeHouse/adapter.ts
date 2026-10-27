"use client";

import { useMemo } from "react";

import { useMenuSearch } from "../../hooks/useMenuSearch";
import { useMenuCart } from "../../hooks/useMenuCart";
import { useMenuOrder } from "../../hooks/useMenuOrder";

export interface MenuProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  available: boolean;
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
    submit: (input: CheckoutInput) => Promise<OrderReceiptData | null>;
    isSubmitting: boolean;
    error: string | null;
  };
}

const CURRENCY_LABEL = "تومان";

export const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("fa-IR").format(value)} ${CURRENCY_LABEL}`;

export function useCoffeeShop(menu: PublicMenu, qrToken: string): CoffeeShop {
  const allProducts = useMemo(() => {
    const map = new Map<string, MenuProduct>();

    menu.categories.forEach((category) => {
      category.products.forEach((product) => {
        map.set(product.id, product);
      });
    });

    menu.quickSections?.forEach((section) => {
      section.products.forEach((product) => {
        map.set(product.id, product);
      });
    });

    return [...map.values()];
  }, [menu]);

  const searchHook = useMenuSearch(menu.categories);
  const cartHook = useMenuCart(allProducts);
  const orderHook = useMenuOrder();

  const quantityOf = (productId: string) => cartHook.quantities[productId] ?? 0;

  return {
    search: {
      query: searchHook.search,
      setQuery: searchHook.setSearch,
      categories: searchHook.filteredCategories,
      resultCount: searchHook.searchResultCount,
      isSearching: searchHook.isSearching,
    },

    cart: {
      lines: cartHook.cartItems,
      count: cartHook.cartCount,
      total: cartHook.cartTotal,
      quantityOf,

      add: (productId) => {
        const product = allProducts.find((item) => item.id === productId);
        if (product) cartHook.addProduct(product);
      },

      increase: (productId) => {
        const product = allProducts.find((item) => item.id === productId);
        if (product) cartHook.increaseProduct(product);
      },

      decrease: (productId) => {
        const product = allProducts.find((item) => item.id === productId);
        if (product) cartHook.decreaseProduct(product);
      },

      remove: (productId) => {
        const product = allProducts.find((item) => item.id === productId);
        if (product) cartHook.removeProduct(product);
      },

      clear: cartHook.clearCart,
    },

    order: {
      submit: async (input) => {
        const result = await orderHook.submitOrder({
          items: cartHook.cartItems,
          qrToken,
          name: input.customerName,
          notes: input.notes,
        });

        if (!result) return null;

        return {
          id: result.id,
          total: result.total,
        };
      },

      isSubmitting: orderHook.isLoading,
      error: orderHook.error || null,
    },
  };
}
