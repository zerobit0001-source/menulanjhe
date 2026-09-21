export type Category = {
  id: string;
  menu: string;
  name: string;
  description: string;
  image: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  icon_name: string;
};

export type CategoryListResponse = {
  ok: boolean;
  count: number;
  total_pages: number;
  current_page: number;
  results: Category[];
};

export type CreateCategoryRequest = {
  menu: string;
  name: string;
  description?: string;
  image?: string | null;
  icon_name?: string;
};

export type UpdateCategoryRequest = {
  name?: string;
  description?: string;
  image?: string | null;
  icon_name?: string;
};
