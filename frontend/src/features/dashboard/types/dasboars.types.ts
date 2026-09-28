export type DashboardSummary = {
  product_count: number;
  category_count: number;
  active_product_count: number;
  pending_order_count: number;
};

export type DashboardCategory = {
  id: string;
  menu: string;
  name: string;
  description: string;
  icon_name: string;
  image: string | null;
  sort_order: number;
  is_active: boolean;
  product_count: number;
  created_at: string;
  updated_at: string;
};

export type DashboardProduct = {
  id: string;
  category: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  price: number;
  category_name: string;
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type DashboardResponse = {
  ok: boolean;
  summary: DashboardSummary;
  categories: DashboardCategory[];
  products: DashboardProduct[];
};
