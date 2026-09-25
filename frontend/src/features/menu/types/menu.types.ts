export type MenuData = {
  shop: {
    name: string;
    description?: string;
    logo?: string;
  };

  quickSections: MenuQuickSection[];

  categories: MenuCategory[];
};


export type MenuQuickSection = {
  id: string;
  title: string;
  type: string;
  products: MenuProduct[];
};


export type MenuCategory = {
  id: string;
  name: string;
  products: MenuProduct[];
};


export type MenuProduct = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;

  available: boolean;

  // برای آینده
  discountPercent?: number;
  originalPrice?: number;
};