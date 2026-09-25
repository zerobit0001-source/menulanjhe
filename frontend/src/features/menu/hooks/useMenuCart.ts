import { useMemo, useState } from "react";
import type { MenuProduct } from "../types/menu.types";

export function useMenuCart(products: MenuProduct[]) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const addProduct = (product: MenuProduct) => {
    if (!product.available) return;

    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] ?? 0) + 1,
    }));
  };

  const increaseProduct = (product: MenuProduct) => {
    addProduct(product);
  };

  const decreaseProduct = (product: MenuProduct) => {
    setQuantities((prev) => {
      const current = prev[product.id] ?? 0;

      if (current <= 1) {
        const next = { ...prev };

        delete next[product.id];

        return next;
      }

      return {
        ...prev,
        [product.id]: current - 1,
      };
    });
  };

  const removeProduct = (product: MenuProduct) => {
    setQuantities((prev) => {
      const next = { ...prev };

      delete next[product.id];

      return next;
    });
  };

  const cartItems = useMemo(() => {
    return Object.entries(quantities)
      .map(([productId, quantity]) => {
        const product = products.find((item) => item.id === productId);

        if (!product) return null;

        return {
          product,
          quantity,
        };
      })
      .filter(
        (
          item,
        ): item is {
          product: MenuProduct;
          quantity: number;
        } => item !== null,
      );
  }, [quantities, products]);

  const cartCount = useMemo(() => {
    return Object.values(quantities).reduce(
      (sum, quantity) => sum + quantity,
      0,
    );
  }, [quantities]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const clearCart = () => {
    setQuantities({});
  };

  return {
    quantities,

    cartItems,
    cartCount,
    cartTotal,

    addProduct,
    increaseProduct,
    decreaseProduct,
    removeProduct,
    clearCart,
  };
}
