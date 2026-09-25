import type { MenuData } from "../types/menu.types";
import type { PublicMenuResponse } from "../types/public-menu.types";

export function publicMenuToMenuData(menu: PublicMenuResponse): MenuData {
  const products = menu.categories.flatMap((category) => category.products);

  return {
    shop: {
      name: menu.restaurant_name,
      description: menu.description,
    },

    quickSections: [
      {
        id: "popular",
        title: "محبوب‌ترین‌ها",
        type: "popular",

        products: products
          .filter((product) => product.is_featured)
          .map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image ?? undefined,
            available: product.is_available,
          })),
      },

      {
        id: "discount",
        title: "تخفیف‌ها",
        type: "discount",
        products: [],
      },
    ],

    categories: menu.categories.map((category) => ({
      id: category.id,

      name: category.name,

      products: category.products
        .filter((product) => product.is_available)
        .map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,

          price: product.price,

          image: product.image ?? undefined,

          available: product.is_available,
        })),
    })),
  };
}
