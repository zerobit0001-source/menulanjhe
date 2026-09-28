export type ReportPeriod = "today" | "last_7_days";

export type OrdersByStatus = {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
};

export type ReportSummary = {
  orders_count: number;
  completed_orders_count: number;
  cancelled_orders_count: number;
  pending_orders_count: number;
  confirmed_orders_count: number;
  gross_sales: number;
  discount_total: number;
  net_sales: number;
  average_order_value: number;
};

export type TopProduct = {
  product_id: string;
  product_name: string;
  quantity: number;
  sales: number;
};

export type TopCategory = {
  category_id: string;
  category_name: string;
  quantity: number;
  sales: number;
};

export type SalesByDay = {
  date: string; // YYYY-MM-DD
  orders_count: number;
  sales: number;
};

export type DashboardReport = {
  ok: boolean;
  period: ReportPeriod | string;
  from: string;
  to: string;
  summary: ReportSummary;
  orders_by_status: OrdersByStatus;
  top_products: TopProduct[];
  top_categories: TopCategory[];
  sales_by_day?: SalesByDay[]; // weekly only
};
