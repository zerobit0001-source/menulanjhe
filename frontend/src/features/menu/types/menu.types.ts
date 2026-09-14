export type MenuCategory = {
  id: string;
  name: string;
  products: MenuProduct[];
};

export type MenuData = {
  shop: {
    name: string;
    logo?: string;
    description?: string;
  };

  featuredProducts: MenuProduct[];

  quickSections: MenuQuickSection[];

  categories: MenuCategory[];
};
export type MenuProduct = {
  id: string;
  name: string;
  description?: string;

  price: number;
  originalPrice?: number;
  discountPercent?: number;

  image?: string;

  available: boolean;
};

export type MenuQuickSection = {
  id: string;
  title: string;
  type: "popular" | "discount";
  products: MenuProduct[];
};

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

export type CreateMenuRequest = {
  branch: string;
  name: string;
  is_published?: boolean;
};

export type UpdateMenuRequest = {
  name?: string;
  description?: string;
  is_active?: boolean;
  is_published?: boolean;
};
