"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import type { TemplateProps } from "@/features/menu/types/menu.types";

import Template012CartBar from "../components/Template012/Template012CartBar";
import Template012CartSheet from "../components/Template012/Template012CartSheet";
import Template012CategoryDrawer from "../components/Template012/Template012CategoryDrawer";
import Template012Checkout from "../components/Template012/Template012Checkout";
import Template012Header from "../components/Template012/Template012Header";
import Template012OrderSuccess from "../components/Template012/Template012OrderSuccess";
import Template012ProductCard from "../components/Template012/Template012ProductCard";
import { T012 } from "../components/Template012/utils";

type MenuView = "menu" | "checkout" | "success";

/** Previews live inside a frame, so they get a fixed height instead of 100dvh. */
const PREVIEW_HEIGHT = "640px";
const FULL_HEIGHT = "100dvh";

export default function Template012({
  menu,
  qrToken,
  isPreview = false,
}: TemplateProps) {
  const fullHeight = isPreview ? PREVIEW_HEIGHT : FULL_HEIGHT;

  const [view, setView] = useState<MenuView>("menu");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  /** "" = all products. */
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    total: number;
  } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const allProducts = useMemo(
    () => menu.categories.flatMap((category) => category.products),
    [menu.categories],
  );

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

  const { search, setSearch, isSearching, filteredCategories } = useMenuSearch(
    menu.categories,
  );

  const categoryOptions = useMemo(
    () =>
      menu.categories
        .filter((category) => category.products.length > 0)
        .map((category) => ({
          id: category.id,
          name: category.name,
          count: category.products.length,
        })),
    [menu.categories],
  );

  const activeCategory = categoryOptions.find(
    (option) => option.id === activeCategoryId,
  );

  /* Searching looks through the whole menu; otherwise the chosen category (or all). */
  const visibleProducts = useMemo(() => {
    if (isSearching) {
      return filteredCategories.flatMap((category) => category.products);
    }

    if (activeCategory) {
      return (
        menu.categories.find((category) => category.id === activeCategory.id)
          ?.products ?? []
      );
    }

    return allProducts;
  }, [activeCategory, allProducts, filteredCategories, isSearching, menu.categories]);

  const closeCategories = useCallback(() => setCategoryOpen(false), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const handleSelectCategory = (id: string) => {
    setActiveCategoryId(id);
    setSearch("");
    setCategoryOpen(false);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckout = () => {
    if (!cartItems.length) return;

    setCartOpen(false);
    setView("checkout");
  };

  if (view === "checkout") {
    return (
      <Template012Checkout
        items={cartItems}
        total={cartTotal}
        qrToken={qrToken}
        fullHeight={fullHeight}
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
      <Template012OrderSuccess
        orderId={createdOrder.id}
        total={createdOrder.total}
        fullHeight={fullHeight}
        onBack={() => {
          setCreatedOrder(null);
          setView("menu");
        }}
      />
    );
  }

  return (
    <div
      dir="rtl"
      className="relative flex w-full flex-col overflow-hidden"
      style={{ height: fullHeight, backgroundColor: T012.bg }}
    >
      <Template012Header
        shop={menu.shop}
        search={search}
        onSearchChange={setSearch}
        caption={isSearching ? "نتایج جستجو" : (activeCategory?.name ?? "")}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <main
        ref={scrollRef}
        className={`flex-1 overflow-y-auto px-4 pb-28 pt-4 ${T012.hideScrollbar}`}
      >
        <div className="mx-auto max-w-5xl">
          {visibleProducts.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center text-[#1F2A24]/55">
              <SearchX size={34} />

              <p className="mt-3 text-sm font-black text-[#1F2A24]">
                {isSearching ? "محصولی پیدا نشد" : "محصولی برای نمایش نیست"}
              </p>

              {isSearching && (
                <p className="mt-1 text-xs">عبارت دیگری را امتحان کنید.</p>
              )}
            </div>
          ) : (
            <motion.div
              key={`${isSearching ? "search" : activeCategoryId}`}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
            >
              {visibleProducts.map((product, index) => (
                <Template012ProductCard
                  key={product.id}
                  product={product}
                  quantity={quantities[product.id] ?? 0}
                  index={index}
                  onAdd={addProduct}
                  onDecrease={decreaseProduct}
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Template012CartBar
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      <Template012CategoryDrawer
        open={categoryOpen}
        options={categoryOptions}
        activeId={activeCategory?.id ?? ""}
        totalCount={allProducts.length}
        onOpen={() => setCategoryOpen(true)}
        onSelect={handleSelectCategory}
        onClose={closeCategories}
      />

      <Template012CartSheet
        open={cartOpen}
        items={cartItems}
        total={cartTotal}
        onIncrease={increaseProduct}
        onDecrease={decreaseProduct}
        onRemove={removeProduct}
        onCheckout={handleCheckout}
        onClose={closeCart}
      />
    </div>
  );
}
