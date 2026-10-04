export type ReportsPeriod = "today" | "week";

export type ReportsSummary = {
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

export type ReportStatusCounts = {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
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
  date: string;
  orders_count: number;
  sales: number;
};

export type ReportsResponse = {
  ok: boolean;
  period: ReportsPeriod;
  from: string;
  to: string;
  summary: ReportsSummary;
  orders_by_status: ReportStatusCounts;
  top_products: TopProduct[];
  top_categories: TopCategory[];
  sales_by_day?: SalesByDay[];
};
