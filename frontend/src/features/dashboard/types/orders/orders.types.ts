export type OrderStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export type OrderType = "DINE_IN";

export type OrderCustomer = {
  name?: string;
  phone?: string;
} | null;

export type OrderItem = {
  id: string;
  product: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  total_price: number;
};

export type Order = {
  id: string;
  branch: string;
  table: string;
  table_number: string;
  table_session: string | null;
  customer: OrderCustomer;
  order_type: OrderType;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  total: number;
  notes: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
};

export type OrderListResponse = {
  ok: boolean;
  count: number;
  total_pages: number;
  current_page: number;
  results: Order[];
};

export type AdminCreateOrderRequest = {
  order_type: "DINE_IN";
  table_id: string;
  items: {
    product_id: string;
    quantity: number;
  }[];
  customer?: {
    name?: string;
    phone?: string;
  };
  notes?: string;
  branch?: string;
  idempotency_key?: string;
};
