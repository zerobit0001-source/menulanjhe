// Local demo data. Replace `getReport` with the real API call when it is ready;
// components only depend on the DashboardReport shape.

import { DashboardReport, ReportPeriod } from "../../types/reports/reports.types";

const todayReport: DashboardReport = {
  ok: true,
  period: "today",
  from: "2026-09-28T00:00:00Z",
  to: "2026-09-28T23:59:59Z",
  summary: {
    orders_count: 42,
    completed_orders_count: 31,
    cancelled_orders_count: 3,
    pending_orders_count: 4,
    confirmed_orders_count: 4,
    gross_sales: 8450000,
    discount_total: 250000,
    net_sales: 8200000,
    average_order_value: 195238,
  },
  orders_by_status: { pending: 4, confirmed: 4, completed: 31, cancelled: 3 },
  top_products: [
    { product_id: "p1", product_name: "کباب کوبیده", quantity: 42, sales: 5040000 },
    { product_id: "p2", product_name: "جوجه کباب", quantity: 30, sales: 4200000 },
    { product_id: "p3", product_name: "زرشک‌پلو با مرغ", quantity: 24, sales: 2880000 },
    { product_id: "p4", product_name: "قیمه بادمجان", quantity: 18, sales: 1980000 },
    { product_id: "p5", product_name: "دوغ محلی", quantity: 40, sales: 800000 },
  ],
  top_categories: [
    { category_id: "c1", category_name: "غذاهای اصلی", quantity: 82, sales: 9600000 },
    { category_id: "c2", category_name: "نوشیدنی‌ها", quantity: 64, sales: 1900000 },
    { category_id: "c3", category_name: "پیش‌غذا", quantity: 27, sales: 1350000 },
    { category_id: "c4", category_name: "دسر", quantity: 15, sales: 900000 },
  ],
};

const weekReport: DashboardReport = {
  ok: true,
  period: "last_7_days",
  from: "2026-09-22T00:00:00Z",
  to: "2026-09-28T23:59:59Z",
  summary: {
    orders_count: 268,
    completed_orders_count: 231,
    cancelled_orders_count: 14,
    pending_orders_count: 9,
    confirmed_orders_count: 14,
    gross_sales: 52100000,
    discount_total: 1900000,
    net_sales: 50200000,
    average_order_value: 187313,
  },
  orders_by_status: { pending: 9, confirmed: 14, completed: 231, cancelled: 14 },
  top_products: [
    { product_id: "p1", product_name: "کباب کوبیده", quantity: 210, sales: 25200000 },
    { product_id: "p2", product_name: "جوجه کباب", quantity: 160, sales: 22400000 },
    { product_id: "p3", product_name: "زرشک‌پلو با مرغ", quantity: 120, sales: 14400000 },
    { product_id: "p4", product_name: "قیمه بادمجان", quantity: 95, sales: 10450000 },
    { product_id: "p5", product_name: "دوغ محلی", quantity: 230, sales: 4600000 },
  ],
  top_categories: [
    { category_id: "c1", category_name: "غذاهای اصلی", quantity: 585, sales: 72450000 },
    { category_id: "c2", category_name: "نوشیدنی‌ها", quantity: 410, sales: 12300000 },
    { category_id: "c3", category_name: "پیش‌غذا", quantity: 160, sales: 8000000 },
    { category_id: "c4", category_name: "دسر", quantity: 90, sales: 5400000 },
  ],
  sales_by_day: [
    { date: "2026-09-22", orders_count: 31, sales: 6200000 },
    { date: "2026-09-23", orders_count: 38, sales: 7400000 },
    { date: "2026-09-24", orders_count: 35, sales: 6600000 },
    { date: "2026-09-25", orders_count: 49, sales: 9300000 },
    { date: "2026-09-26", orders_count: 52, sales: 10100000 },
    { date: "2026-09-27", orders_count: 21, sales: 4400000 },
    { date: "2026-09-28", orders_count: 42, sales: 8200000 },
  ],
};

export async function getReport(period: ReportPeriod): Promise<DashboardReport> {
  await new Promise((r) => setTimeout(r, 500));
  return period === "today" ? todayReport : weekReport;
}
