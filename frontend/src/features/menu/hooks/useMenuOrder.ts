import { useState } from "react";

import { useCreatePublicOrderMutation } from "../api/menuPublicApi";
import type { MenuProduct } from "../types/menu.types";

type CartItem = {
  product: MenuProduct;
  quantity: number;
};

type SubmitOrderParams = {
  items: CartItem[];
  qrToken?: string | null;
  name?: string;
  notes?: string;
};

export function useMenuOrder() {
  const [error, setError] = useState("");

  const [createOrder, { isLoading }] = useCreatePublicOrderMutation();

  const submitOrder = async ({
    items,
    qrToken,
    name,
    notes,
  }: SubmitOrderParams) => {
    if (!items.length) {
      return null;
    }

    if (!qrToken) {
      setError("اطلاعات میز معتبر نیست.");
      return null;
    }

    setError("");

    try {
      const result = await createOrder({
        idempotency_key: crypto.randomUUID(),
        qr_token: qrToken,

        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),

        customer: name?.trim()
          ? {
              name: name.trim(),
            }
          : undefined,

        notes: notes?.trim() ? notes.trim() : undefined,
      }).unwrap();

      return {
        id: result.id,
        total: result.total,
      };
    } catch (error) {
      console.error(error);

      setError("ثبت سفارش انجام نشد. لطفاً دوباره تلاش کنید.");

      return null;
    }
  };

  return {
    submitOrder,
    error,
    isLoading,
  };
}
