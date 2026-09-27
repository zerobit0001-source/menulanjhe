"use client";

import { useState } from "react";

import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import type { MenuData } from "@/features/menu/types/menu.types";

type Props = {
  menu: MenuData;
  qrToken?: string | null;
};

type MenuView = "menu" | "checkout" | "success";

export default function Template006({ menu, qrToken }: Props) {
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
      document.getElementById(`template006-category-${id}`)?.scrollIntoView({
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
      <Template006Checkout
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
      <Template006OrderSuccess
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
    <main className="min-h-screen overflow-x-hidden bg-[#08090B] pb-28 text-white">
      <Template006Header
        shop={menu.shop}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <Template006Hero shop={menu.shop} />

      <Template006Search value={search} onChange={setSearch} />

      {!isSearching && (
        <>
          <Template006CategoryNav
            categories={menu.categories}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />

          <Template006FeaturedProducts
            products={featuredProducts}
            onAdd={addProduct}
          />
        </>
      )}

      {isSearching ? (
        <section className="mx-auto max-w-5xl px-4">
          <div className="py-7">
            <p className="text-xs font-medium text-white/40">جستجو</p>

            <h2 className="mt-1 text-2xl font-black">نتایج جستجو</h2>

            <p className="mt-2 text-xs text-white/40">
              {searchResultCount} محصول پیدا شد
            </p>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
              <p className="text-sm font-bold text-white/60">محصولی پیدا نشد</p>

              <p className="mt-2 text-xs text-white/30">
                عبارت دیگری را امتحان کنید
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} id={`template006-category-${category.id}`}>
                <Template006ProductList
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
          <div id={`template006-category-${currentCategory.id}`}>
            <Template006ProductList
              category={currentCategory}
              quantities={quantities}
              onAdd={addProduct}
              onIncrease={increaseProduct}
              onDecrease={decreaseProduct}
            />
          </div>
        )
      )}

      <Template006CartButton
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      <Template006CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        onIncrease={increaseProduct}
        onDecrease={decreaseProduct}
        onRemove={removeProduct}
        onCheckout={handleCheckout}
      />
    </main>
  );
}
