"use client";

import { useState } from "react";

import type { MenuData } from "@/features/menu/types/menu.types";
import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import Template005Checkout from "../components/Template005/Template005Checkout";
import Template005OrderSuccess from "../components/Template005/Template005OrderSuccess";
import Template005Header from "../components/Template005/Template005Header";
import Template005Hero from "../components/Template005/Template005Hero";
import Template005Search from "../components/Template005/Template005Search";
import Template005CategoryNav from "../components/Template005/Template005CategoryNav";
import Template005FeaturedProducts from "../components/Template005/Template005FeaturedProducts";
import Template005ProductList from "../components/Template005/Template005ProductList";
import Template005CartButton from "../components/Template005/Template005CartButton";
import Template005CartDrawer from "../components/Template005/Template005CartDrawer";

type Props = {
  menu: MenuData;
  qrToken?: string | null;
};

type MenuView = "menu" | "checkout" | "success";

export default function Template005({ menu, qrToken }: Props) {
  const [view, setView] = useState<MenuView>("menu");
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    menu.categories[0]?.id ?? "",
  );

  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    total: number;
  } | null>(null);

  const allProducts = menu.categories.flatMap((category) => category.products);

  const {
    search,
    setSearch,
    isSearching,
    filteredCategories,
    searchResultCount,
  } = useMenuSearch(menu.categories);

  const {
    quantities,
    cartItems,
    cartCount,
    cartTotal,
    addProduct,
    increaseProduct,
    decreaseProduct,
    removeProduct,
    clearCart,
  } = useMenuCart(allProducts);

  const currentCategory = filteredCategories.find(
    (category) => category.id === activeCategory,
  );

  const featuredProducts =
    menu.quickSections.find((section) => section.id === "popular")?.products ??
    [];

  const handleCategoryChange = (id: string) => {
    setSearch("");
    setActiveCategory(id);

    requestAnimationFrame(() => {
      document.getElementById(`template005-category-${id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleCheckout = () => {
    if (!cartItems.length) return;
    if (!qrToken) return;

    setCartOpen(false);
    setView("checkout");
  };

  if (view === "checkout") {
    return (
      <Template005Checkout
        items={cartItems}
        total={cartTotal}
        qrToken={qrToken}
        onBack={() => setView("menu")}
        onSuccess={(order) => {
          setCreatedOrder(order);
          clearCart();
          setView("success");
        }}
      />
    );
  }

  if (view === "success" && createdOrder) {
    return (
      <Template005OrderSuccess
        orderId={createdOrder.id}
        total={createdOrder.total}
        onBack={() => {
          setCreatedOrder(null);
          setView("menu");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <Template005Header
        shop={menu.shop}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <Template005Hero shop={menu.shop} />

      <Template005Search value={search} onChange={setSearch} />

      {!isSearching && (
        <>
          <Template005CategoryNav
            categories={menu.categories}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />

          <Template005FeaturedProducts
            products={featuredProducts}
            onAdd={addProduct}
          />
        </>
      )}

      {isSearching ? (
        <section className="mx-auto max-w-5xl px-4">
          <div className="py-6">
            <h2 className="text-lg font-black text-slate-900">نتایج جستجو</h2>

            <p className="mt-1 text-xs text-slate-400">
              {searchResultCount} محصول پیدا شد
            </p>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
              <p className="text-sm font-bold text-slate-500">
                محصولی پیدا نشد
              </p>

              <p className="mt-2 text-xs text-slate-400">
                عبارت دیگری را امتحان کنید
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} id={`template005-category-${category.id}`}>
                <Template005ProductList
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
          <div id={`template005-category-${currentCategory.id}`}>
            <Template005ProductList
              category={currentCategory}
              quantities={quantities}
              onAdd={addProduct}
              onIncrease={increaseProduct}
              onDecrease={decreaseProduct}
            />
          </div>
        )
      )}

      <Template005CartButton
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      <Template005CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        onIncrease={increaseProduct}
        onDecrease={decreaseProduct}
        onRemove={removeProduct}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
