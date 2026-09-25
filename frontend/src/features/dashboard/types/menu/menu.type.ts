export type Menu = {
  id: string;
  branch: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type MenuListResponse = {
  ok: boolean;
  count: number;
  total_pages: number;
  current_page: number;
  results: Menu[];
};

export type UpdateMenuRequest = {
  name?: string;
  description?: string;
  is_active?: boolean;
  is_published?: boolean;
};
