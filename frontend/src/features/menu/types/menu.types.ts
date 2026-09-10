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
