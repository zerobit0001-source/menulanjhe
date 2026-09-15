export type Product = {
  id: string;
  category: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  price: string;
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProductListResponse = {
  ok: boolean;
  count: number;
  total_pages: number;
  current_page: number;
  results: Product[];
};

export type CreateProductRequest = {
  category: string;
  name: string;
  description?: string;
  image?: string | null;
  price: string;
  is_featured?: boolean;
};

export type UpdateProductRequest = {
  category?: string;
  name?: string;
  description?: string;
  image?: string | null;
  price?: string;
  is_featured?: boolean;
};