export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type OrderItem = {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export type DashboardOrder = {
  id: string;
  order_number: number;
  table_number: number;
  status: OrderStatus;
  items: OrderItem[];
  total_amount: number;
  created_at: string;
};
