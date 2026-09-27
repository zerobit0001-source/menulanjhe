"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import type { MenuData } from "@/features/menu/types/menu.types";
import Template007Checkout from "../components/Template007/Template007Checkout";
import Template007OrderSuccess from "../components/Template007/Template007OrderSuccess";
import Template007Header from "../components/Template007/Template007Header";
import Template007Hero from "../components/Template007/Template007Hero";
import Template007Search from "../components/Template007/Template007Search";
import Template007MobileCategories from "../components/Template007/Template007MobileCategories";
import Template007Sidebar from "../components/Template007/Template007Sidebar";
import Template007Featured from "../components/Template007/Template007Featured";
import Template007ProductGrid from "../components/Template007/Template007ProductGrid";
import Template007CartButton from "../components/Template007/Template007CartButton";
import Template007CartDrawer from "../components/Template007/Template007CartDrawer";

type Props = {
  menu: MenuData;
  tableName?: string | null;
  qrToken?: string | null;
};

type MenuView = "menu" | "checkout" | "success";

export default function Template007({ menu, qrToken }: Props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState<MenuView>("menu");
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    total: number;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState(
    menu.categories[0]?.id ?? "",
  );

  const { search, setSearch, isSearching, filteredCategories } = useMenuSearch(
    menu.categories,
  );

  const allProducts = menu.categories.flatMap((category) => category.products);

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

  const featuredProducts =
    menu.quickSections.find((section) => section.id === "popular")?.products ??
    [];

  const currentCategory = filteredCategories.find(
    (category) => category.id === activeCategory,
  );

  const handleCategoryChange = (id: string) => {
    setSearch("");
    setActiveCategory(id);
    requestAnimationFrame(() => {
      document.getElementById(`t6-category-${id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleCheckout = () => {
    if (!cartItems.length || !qrToken) return;
    setCartOpen(false);
    setView("checkout");
  };

  if (view === "checkout") {
    return (
      <Template007Checkout
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
      <Template007OrderSuccess
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
    <div className="relative min-h-screen bg-[#120D09] text-[#F5EBDD]">
      <Template007Header
        shopName={menu.shop.name}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <Template007Hero
        shopName={menu.shop.name}
        description={menu.shop.description}
      />

      <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Template007Search value={search} onChange={setSearch} />
      </div>

      {!isSearching && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Template007MobileCategories
            categories={menu.categories}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-8">
        {!isSearching && (
          <Template007Sidebar
            categories={menu.categories}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />
        )}

        <main className="min-w-0">
          {!isSearching && featuredProducts.length > 0 && (
            <Template007Featured
              products={featuredProducts}
              onAdd={addProduct}
            />
          )}

          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div
                key="search-results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {filteredCategories.length === 0 ? (
                  <div className="py-20 text-center">
                    <p className="text-sm font-bold text-[#F5EBDD]">
                      موردی پیدا نشد
                    </p>
                    <p className="mt-2 text-xs text-[#CDBEAE]">
                      عبارت دیگری را امتحان کنید
                    </p>
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <div key={category.id} id={`t6-category-${category.id}`}>
                      <Template007ProductGrid
                        category={category}
                        quantities={quantities}
                        onAdd={addProduct}
                        onIncrease={increaseProduct}
                        onDecrease={decreaseProduct}
                      />
                    </div>
                  ))
                )}
              </motion.div>
            ) : (
              currentCategory && (
                <motion.div
                  key={currentCategory.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  id={`t6-category-${currentCategory.id}`}
                >
                  <Template007ProductGrid
                    category={currentCategory}
                    quantities={quantities}
                    onAdd={addProduct}
                    onIncrease={increaseProduct}
                    onDecrease={decreaseProduct}
                  />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </main>
      </div>

      <Template007CartButton
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      <Template007CartDrawer
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
