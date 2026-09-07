export type MenuProduct = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  products: MenuProduct[];
};

export type MenuData = {
  ok: boolean;
  shop: {
    name: string;
    logo?: string;
    description?: string;
  };
  categories: MenuCategory[];
};
