export type CreateOrderItem = {
  product_id: string;
  quantity: number;
};

export type CreateOrderRequest = {
  session_token: string;
  idempotency_key: string;
  items: CreateOrderItem[];
  customer?: {
    name?: string;
    phone?: string;
  };
  notes?: string;
};

export type CreateOrderResponse = {
  ok: boolean;
  id: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  total: number;
  created_at: string;
};
