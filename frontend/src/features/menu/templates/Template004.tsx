"use client";

import { useState } from "react";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import type { MenuData } from "@/features/menu/types/menu.types";
import Template004Header from "../components/Template004/Template004Header";
import Template004Promo from "../components/Template004/Template004Promo";
import Template004CategoryChips from "../components/Template004/Template004CategoryChips";
import Template004ProductGrid from "../components/Template004/Template004ProductGrid";
import Template004CartButton from "../components/Template004/Template004CartButton";
import Template004CartDrawer from "../components/Template004/Template004CartDrawer";
import Template004Checkout from "../components/Template004/Template004Checkout";
import Template004OrderSuccess from "../components/Template004/Template004OrderSuccess";

type Props = {
  menu: MenuData;
  tableName?: string | null;
  qrToken?: string | null;
};

type MenuView = "menu" | "checkout" | "success";

export default function Template004({ menu, tableName, qrToken }: Props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState<MenuView>("menu");
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    total: number;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const { search, setSearch, isSearching, filteredCategories } =
    useMenuSearch(menu.categories);

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

  const popular =
    menu.quickSections.find((section) => section.id === "popular")
      ?.products ?? [];

  const visibleCategories =
    activeCategory === "all"
      ? filteredCategories
      : filteredCategories.filter((category) => category.id === activeCategory);

  const handleCheckout = () => {
    if (!cartItems.length || !qrToken) return;
    setCartOpen(false);
    setView("checkout");
  };

  if (view === "checkout") {
    return (
      <Template004Checkout
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
      <Template004OrderSuccess
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
    <div className="min-h-screen bg-white pb-24">
      <Template004Header
        shop={menu.shop}
        tableName={tableName}
        search={search}
        onSearchChange={setSearch}
      />

      {!isSearching && popular.length > 0 && (
        <Template004Promo products={popular} onAdd={addProduct} />
      )}

      {!isSearching && (
        <Template004CategoryChips
          categories={menu.categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
      )}

      <div className="mx-auto max-w-2xl px-4">
        {visibleCategories.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm font-bold text-gray-900">موردی پیدا نشد</p>
            <p className="mt-2 text-xs text-gray-400">
              عبارت دیگری را امتحان کنید
            </p>
          </div>
        ) : (
          visibleCategories.map((category) => (
            <Template004ProductGrid
              key={category.id}
              category={category}
              quantities={quantities}
              onAdd={addProduct}
              onIncrease={increaseProduct}
              onDecrease={decreaseProduct}
            />
          ))
        )}
      </div>

      <Template004CartButton
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      <Template004CartDrawer
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
