import { useMemo, useState } from "react";

import type { MenuCategory } from "../types/menu.types";

export function useMenuSearch(categories: MenuCategory[]) {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return categories;
    }

    return categories
      .map((category) => ({
        ...category,
        products: category.products.filter((product) =>
          `${product.name} ${product.description ?? ""}`
            .toLowerCase()
            .includes(normalizedSearch),
        ),
      }))
      .filter((category) => category.products.length > 0);
  }, [categories, search]);

  const searchResultCount = useMemo(() => {
    return filteredCategories.reduce(
      (total, category) => total + category.products.length,
      0,
    );
  }, [filteredCategories]);

  const isSearching = search.trim().length > 0;

  const clearSearch = () => {
    setSearch("");
  };

  return {
    search,
    setSearch,
    clearSearch,

    isSearching,
    filteredCategories,
    searchResultCount,
  };
}
