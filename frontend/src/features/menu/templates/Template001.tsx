"use client";

import { useMemo, useState } from "react";

import type { MenuData, MenuProduct } from "../types/menu.types";
import Template001Header from "../components/Template001/Template001Header";
import Template001Search from "../components/Template001/Template001Search";
import Template001QuickCategories from "../components/Template001/Template001QuickCategories";
import Template001FeaturedProducts from "../components/Template001/Template001FeaturedProducts";
import Template001CategoryNav from "../components/Template001/Template001CategoryNav";
import Template001CartButton from "../components/Template001/Template001CartButton";
import Template001ProductList from "../components/Template001/Template001ProductList";
import Template001CartDrawer from "../components/Template001/Template001CartDrawer";

type Props = {
  menu: MenuData;
};

export default function Template001({ menu }: Props) {
  const [search, setSearch] = useState("");
  const [quickSection, setQuickSection] = useState("popular");
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    menu.categories[0]?.id ?? "",
  );

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const addProduct = (product: MenuProduct) => {
    if (!product.available) return;

    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] ?? 0) + 1,
    }));
  };

  const increaseProduct = (product: MenuProduct) => {
    addProduct(product);
  };

  const decreaseProduct = (product: MenuProduct) => {
    setQuantities((prev) => {
      const current = prev[product.id] ?? 0;

      if (current <= 1) {
        const next = { ...prev };
        delete next[product.id];
        return next;
      }

      return {
        ...prev,
        [product.id]: current - 1,
      };
    });
  };

  const filteredCategories = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return menu.categories;
    }

    return menu.categories
      .map((category) => ({
        ...category,
        products: category.products.filter((product) =>
          `${product.name} ${product.description ?? ""}`
            .toLowerCase()
            .includes(normalizedSearch),
        ),
      }))
      .filter((category) => category.products.length > 0);
  }, [menu.categories, search]);

  const currentCategory = useMemo(() => {
    if (search.trim()) {
      return filteredCategories[0];
    }

    return filteredCategories.find(
      (category) => category.id === activeCategory,
    );
  }, [activeCategory, filteredCategories, search]);

  const featuredProducts =
    menu.quickSections.find((section) => section.id === quickSection)
      ?.products ?? [];

  const cartCount = Object.values(quantities).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  const allProducts = menu.categories.flatMap((category) => category.products);

  const cartItems = Object.entries(quantities)
    .map(([productId, quantity]) => {
      const product = allProducts.find((item) => item.id === productId);

      if (!product) return null;

      return {
        product,
        quantity,
      };
    })
    .filter(
      (
        item,
      ): item is {
        product: MenuProduct;
        quantity: number;
      } => item !== null,
    );

  const cartTotal = Object.entries(quantities).reduce(
    (total, [productId, quantity]) => {
      const product = allProducts.find((item) => item.id === productId);

      if (!product) return total;

      return total + product.price * quantity;
    },
    0,
  );
  const removeProduct = (product: MenuProduct) => {
    setQuantities((prev) => {
      const next = { ...prev };

      delete next[product.id];

      return next;
    });
  };

  const handleCategoryChange = (id: string) => {
    setSearch("");
    setActiveCategory(id);

    requestAnimationFrame(() => {
      document.getElementById(`category-${id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <Template001Header
        shop={menu.shop}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <Template001Search value={search} onChange={setSearch} />

      {!search && (
        <>
          <Template001QuickCategories
            active={quickSection}
            onChange={setQuickSection}
          />

          <Template001FeaturedProducts
            title={quickSection === "discount" ? "تخفیف‌ها" : "محبوب‌ترین‌ها"}
            products={featuredProducts}
            onAdd={addProduct}
          />
        </>
      )}

      {!search && (
        <Template001CategoryNav
          categories={menu.categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />
      )}

      {search ? (
        <section className="mx-auto max-w-2xl px-4">
          <div className="py-5">
            <h2 className="text-lg font-black text-gray-900">نتایج جستجو</h2>

            <p className="mt-1 text-xs text-gray-400">
              {filteredCategories.reduce(
                (total, category) => total + category.products.length,
                0,
              )}{" "}
              محصول پیدا شد
            </p>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm font-bold text-gray-500">محصولی پیدا نشد</p>

              <p className="mt-2 text-xs text-gray-400">
                عبارت دیگری را امتحان کنید
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} id={`category-${category.id}`}>
                <Template001ProductList
                  category={category}
                  quantities={quantities}
                  onAdd={addProduct}
                  onIncrease={increaseProduct}
                  onDecrease={decreaseProduct}
                />
              </div>
            ))
          )}
        </section>
      ) : (
        currentCategory && (
          <div id={`category-${currentCategory.id}`}>
            <Template001ProductList
              category={currentCategory}
              quantities={quantities}
              onAdd={addProduct}
              onIncrease={increaseProduct}
              onDecrease={decreaseProduct}
            />
          </div>
        )
      )}

      <Template001CartButton
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />
      
      <Template001CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        onIncrease={increaseProduct}
        onDecrease={decreaseProduct}
        onRemove={removeProduct}
      />
    </div>
  );
}
