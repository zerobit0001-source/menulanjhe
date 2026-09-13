import { DashboardCategory } from "../../types/categories/categories.type";

export const dashboardCategories: DashboardCategory[] = [
  {
    id: "cat_pizza",
    title: "پیتزا",
    product_count: 12,
    visible: true,
    sort_order: 1,
    icon: "pizza",
    color: "#EF4444",
    created_at: "2026-08-12T10:30:00",
  },

  {
    id: "cat_burger",
    title: "برگر",
    product_count: 8,
    visible: true,
    sort_order: 2,
    icon: "burger",
    color: "#F59E0B",
    created_at: "2026-08-13T14:20:00",
  },

  {
    id: "cat_pasta",
    title: "پاستا",
    product_count: 7,
    visible: true,
    sort_order: 3,
    icon: "pasta",
    color: "#8B5CF6",
    created_at: "2026-08-14T11:10:00",
  },

  {
    id: "cat_appetizer",
    title: "پیش‌غذا",
    product_count: 9,
    visible: true,
    sort_order: 4,
    icon: "utensils",
    color: "#10B981",
    created_at: "2026-08-15T09:45:00",
  },

  {
    id: "cat_side_dish",
    title: "دورچین",
    product_count: 6,
    visible: true,
    sort_order: 5,
    icon: "bowl",
    color: "#F97316",
    created_at: "2026-08-16T16:30:00",
  },

  {
    id: "cat_salad",
    title: "سالاد",
    product_count: 5,
    visible: true,
    sort_order: 6,
    icon: "salad",
    color: "#22C55E",
    created_at: "2026-08-17T12:15:00",
  },

  {
    id: "cat_hot_drinks",
    title: "نوشیدنی گرم",
    product_count: 10,
    visible: true,
    sort_order: 7,
    icon: "coffee",
    color: "#92400E",
    created_at: "2026-08-18T08:20:00",
  },

  {
    id: "cat_cold_drinks",
    title: "نوشیدنی سرد",
    product_count: 8,
    visible: true,
    sort_order: 8,
    icon: "drink",
    color: "#3B82F6",
    created_at: "2026-08-19T13:40:00",
  },

  {
    id: "cat_dessert",
    title: "دسر",
    product_count: 11,
    visible: true,
    sort_order: 9,
    icon: "cake",
    color: "#EC4899",
    created_at: "2026-08-20T15:00:00",
  },

  {
    id: "cat_breakfast",
    title: "صبحانه",
    product_count: 6,
    visible: false,
    sort_order: 10,
    icon: "egg",
    color: "#EAB308",
    created_at: "2026-08-21T10:00:00",
  },

  {
    id: "cat_special",
    title: "پیشنهاد ویژه",
    product_count: 4,
    visible: true,
    sort_order: 11,
    icon: "star",
    color: "#6366F1",
    created_at: "2026-08-22T17:20:00",
  },

  {
    id: "cat_healthy",
    title: "غذای سالم",
    product_count: 5,
    visible: false,
    sort_order: 12,
    icon: "leaf",
    color: "#16A34A",
    created_at: "2026-08-23T11:30:00",
  },
];
