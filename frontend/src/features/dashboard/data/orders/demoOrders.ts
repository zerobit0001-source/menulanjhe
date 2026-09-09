import { DashboardOrder } from "../../types/orders/orders.types";

export const dashboardOrders: DashboardOrder[] = [
  {
    id: "order_1001",
    order_number: 1001,
    table_number: 4,
    status: "PENDING_PAYMENT",
    items: [
      {
        id: "item_1001_1",
        product_name: "لاته",
        quantity: 2,
        unit_price: 125000,
        total_price: 250000,
      },
      {
        id: "item_1001_2",
        product_name: "چیزکیک",
        quantity: 1,
        unit_price: 165000,
        total_price: 165000,
      },
      {
        id: "item_1001_3",
        product_name: "چیزکیک",
        quantity: 1,
        unit_price: 165000,
        total_price: 165000,
      },
      {
        id: "item_1001_4",
        product_name: "چیزکیک",
        quantity: 1,
        unit_price: 165000,
        total_price: 165000,
      },
    ],
    total_amount: 415000,
    created_at: "2026-09-08T18:42:00",
  },

  {
    id: "order_1002",
    order_number: 1002,
    table_number: 7,
    status: "PAID",
    items: [
      {
        id: "item_1002_1",
        product_name: "برگر کلاسیک",
        quantity: 1,
        unit_price: 350000,
        total_price: 350000,
      },
      {
        id: "item_1002_2",
        product_name: "سیب‌زمینی سرخ‌کرده",
        quantity: 1,
        unit_price: 110000,
        total_price: 110000,
      },
    ],
    total_amount: 460000,
    created_at: "2026-09-08T18:35:00",
  },

  {
    id: "order_1003",
    order_number: 1003,
    table_number: 2,
    status: "PREPARING",
    items: [
      {
        id: "item_1003_1",
        product_name: "پاستا آلفردو",
        quantity: 2,
        unit_price: 320000,
        total_price: 640000,
      },
      {
        id: "item_1003_2",
        product_name: "موهیتو",
        quantity: 2,
        unit_price: 145000,
        total_price: 290000,
      },
    ],
    total_amount: 930000,
    created_at: "2026-09-08T18:27:00",
  },

  {
    id: "order_1004",
    order_number: 1004,
    table_number: 9,
    status: "READY",
    items: [
      {
        id: "item_1004_1",
        product_name: "چیکن استریپس",
        quantity: 1,
        unit_price: 285000,
        total_price: 285000,
      },
      {
        id: "item_1004_2",
        product_name: "آمریکانو",
        quantity: 1,
        unit_price: 95000,
        total_price: 95000,
      },
    ],
    total_amount: 380000,
    created_at: "2026-09-08T18:15:00",
  },

  {
    id: "order_1005",
    order_number: 1005,
    table_number: 1,
    status: "COMPLETED",
    items: [
      {
        id: "item_1005_1",
        product_name: "کاپوچینو",
        quantity: 2,
        unit_price: 130000,
        total_price: 260000,
      },
      {
        id: "item_1005_2",
        product_name: "براونی شکلاتی",
        quantity: 1,
        unit_price: 145000,
        total_price: 145000,
      },
    ],
    total_amount: 405000,
    created_at: "2026-09-08T17:52:00",
  },

  {
    id: "order_1006",
    order_number: 1006,
    table_number: 5,
    status: "PREPARING",
    items: [
      {
        id: "item_1006_1",
        product_name: "برگر کلاسیک",
        quantity: 2,
        unit_price: 350000,
        total_price: 700000,
      },
      {
        id: "item_1006_2",
        product_name: "سیب‌زمینی سرخ‌کرده",
        quantity: 2,
        unit_price: 110000,
        total_price: 220000,
      },
    ],
    total_amount: 920000,
    created_at: "2026-09-08T17:41:00",
  },

  {
    id: "order_1007",
    order_number: 1007,
    table_number: 8,
    status: "PENDING_PAYMENT",
    items: [
      {
        id: "item_1007_1",
        product_name: "اسپرسو",
        quantity: 2,
        unit_price: 85000,
        total_price: 170000,
      },
      {
        id: "item_1007_2",
        product_name: "چیزکیک",
        quantity: 2,
        unit_price: 165000,
        total_price: 330000,
      },
    ],
    total_amount: 500000,
    created_at: "2026-09-08T17:28:00",
  },

  {
    id: "order_1008",
    order_number: 1008,
    table_number: 3,
    status: "READY",
    items: [
      {
        id: "item_1008_1",
        product_name: "پاستا آلفردو",
        quantity: 1,
        unit_price: 320000,
        total_price: 320000,
      },
      {
        id: "item_1008_2",
        product_name: "موهیتو",
        quantity: 1,
        unit_price: 145000,
        total_price: 145000,
      },
    ],
    total_amount: 465000,
    created_at: "2026-09-08T17:12:00",
  },

  {
    id: "order_1009",
    order_number: 1009,
    table_number: 6,
    status: "COMPLETED",
    items: [
      {
        id: "item_1009_1",
        product_name: "لاته",
        quantity: 1,
        unit_price: 125000,
        total_price: 125000,
      },
      {
        id: "item_1009_2",
        product_name: "نان سیر",
        quantity: 1,
        unit_price: 120000,
        total_price: 120000,
      },
    ],
    total_amount: 245000,
    created_at: "2026-09-08T16:48:00",
  },

  {
    id: "order_1010",
    order_number: 1010,
    table_number: 10,
    status: "PAID",
    items: [
      {
        id: "item_1010_1",
        product_name: "چیکن استریپس",
        quantity: 2,
        unit_price: 285000,
        total_price: 570000,
      },
      {
        id: "item_1010_2",
        product_name: "آمریکانو",
        quantity: 2,
        unit_price: 95000,
        total_price: 190000,
      },
      {
        id: "item_1010_3",
        product_name: "براونی شکلاتی",
        quantity: 1,
        unit_price: 145000,
        total_price: 145000,
      },
    ],
    total_amount: 905000,
    created_at: "2026-09-08T16:31:00",
  },
];
