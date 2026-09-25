export type PublicMenuProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  price: number;
  category_name: string;
  is_available: boolean;
  is_featured: boolean;
};

export type PublicMenuCategory = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  sort_order: number;
  products: PublicMenuProduct[];
};

export type PublicMenuResponse = {
  ok: boolean;
  id: string;
  name: string;
  slug: string;
  description: string;
  restaurant_name: string;
  categories: PublicMenuCategory[];
};
