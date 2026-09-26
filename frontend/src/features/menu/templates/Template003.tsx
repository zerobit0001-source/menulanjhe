"use client";

import { useState } from "react";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import type { MenuData } from "@/features/menu/types/menu.types";
import Template003Header from "../components/Template003/Template003Header";
import Template003CategoryChips from "../components/Template003/Template003CategoryChips";
import Template003DailyPicks from "../components/Template003/Template003DailyPicks";
import Template003ProductGrid from "../components/Template003/Template003ProductGrid";
import Template003CartButton from "../components/Template003/Template003CartButton";
import Template003CartDrawer from "../components/Template003/Template003CartDrawer";
import Template003Checkout from "../components/Template003/Template003Checkout";
import Template003OrderSuccess from "../components/Template003/Template003OrderSuccess";

type Props = {
  menu: MenuData;
  tableName?: string | null;
  qrToken?: string | null;
};

type MenuView = "menu" | "checkout" | "success";

export default function Template003({ menu, qrToken }: Props) {
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

  const currentCategory = filteredCategories.find(
    (category) => category.id === activeCategory,
  );

  const dailyPicks =
    menu.quickSections.find((section) => section.id === "popular")?.products ??
    [];

  const handleCategoryChange = (id: string) => {
    setSearch("");
    setActiveCategory(id);
    requestAnimationFrame(() => {
      document.getElementById(`t3-category-${id}`)?.scrollIntoView({
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
      <Template003Checkout
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
      <Template003OrderSuccess
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
    <div className="min-h-screen bg-[#FAFAF7] pb-28">
      <Template003Header
        shop={menu.shop}
        cartCount={cartCount}
        search={search}
        onSearchChange={setSearch}
      />

      {!isSearching && (
        <Template003CategoryChips
          categories={menu.categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />
      )}

      {!isSearching && dailyPicks.length > 0 && (
        <Template003DailyPicks products={dailyPicks} onAdd={addProduct} />
      )}

      <div className="mx-auto max-w-2xl px-4">
        {isSearching ? (
          filteredCategories.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm font-bold text-[#1A1A1A]">موردی پیدا نشد</p>
              <p className="mt-2 text-xs text-[#7A7A72]">
                عبارت دیگری را امتحان کنید
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} id={`t3-category-${category.id}`}>
                <Template003ProductGrid
                  category={category}
                  quantities={quantities}
                  onAdd={addProduct}
                  onIncrease={increaseProduct}
                  onDecrease={decreaseProduct}
                />
              </div>
            ))
          )
        ) : (
          currentCategory && (
            <div id={`t3-category-${currentCategory.id}`}>
              <Template003ProductGrid
                category={currentCategory}
                quantities={quantities}
                onAdd={addProduct}
                onIncrease={increaseProduct}
                onDecrease={decreaseProduct}
              />
            </div>
          )
        )}
      </div>

      <Template003CartButton
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      <Template003CartDrawer
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
