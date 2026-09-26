"use client";

import { useState } from "react";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import type { MenuData } from "@/features/menu/types/menu.types";
import Template002Header from "../components/Template002/Template002Header";
import Template002Search from "../components/Template002/Template002Search";
import Template002CategoryTabs from "../components/Template002/Template002CategoryTabs";
import Template002Featured from "../components/Template002/Template002Featured";
import Template002ProductList from "../components/Template002/Template002ProductList";
import Template002CartButton from "../components/Template002/Template002CartButton";
import Template002CartDrawer from "../components/Template002/Template002CartDrawer";
import Template002Checkout from "../components/Template002/Template002Checkout";
import Template002OrderSuccess from "../components/Template002/Template002OrderSuccess";

type Props = {
  menu: MenuData;
  tableName?: string | null;
  qrToken?: string | null;
};

type MenuView = "menu" | "checkout" | "success";

export default function Template002({ menu, qrToken }: Props) {
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

  const featured =
    menu.quickSections.find((section) => section.id === "popular")?.products ??
    [];

  const handleCategoryChange = (id: string) => {
    setSearch("");
    setActiveCategory(id);
    requestAnimationFrame(() => {
      document.getElementById(`t2-category-${id}`)?.scrollIntoView({
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
      <Template002Checkout
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
      <Template002OrderSuccess
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
    <div className="min-h-screen bg-[#1C1815] pb-28 text-[#F2EDE4]">
      <Template002Header
        shop={menu.shop}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <Template002Search value={search} onChange={setSearch} />

      {!isSearching && (
        <Template002CategoryTabs
          categories={menu.categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />
      )}

      {!isSearching && featured.length > 0 && (
        <Template002Featured products={featured} onAdd={addProduct} />
      )}

      <div className="mx-auto max-w-2xl px-5">
        {isSearching ? (
          filteredCategories.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm font-semibold text-[#F2EDE4]/80">
                موردی پیدا نشد
              </p>
              <p className="mt-2 text-xs text-[#9C9186]">
                عبارت دیگری را امتحان کنید
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} id={`t2-category-${category.id}`}>
                <Template002ProductList
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
            <div id={`t2-category-${currentCategory.id}`}>
              <Template002ProductList
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

      <Template002CartButton
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      <Template002CartDrawer
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
