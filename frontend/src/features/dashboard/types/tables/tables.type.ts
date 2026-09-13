export type TableStatus = "AVAILABLE" | "ORDERING" | "WAITING_PAYMENT";

export type DashboardTable = {
  id: string;
  number: number;
  status: TableStatus;
  active_order_count: number;
  created_at: string;
};
