"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";

import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import type { TemplateProps } from "@/features/menu/types/menu.types";

import Template014BottomNav from "../components/Template014/Template014BottomNav";
import Template014CartSheet from "../components/Template014/Template014CartSheet";
import Template014CategoryStrip from "../components/Template014/Template014CategoryStrip";
import Template014Checkout from "../components/Template014/Template014Checkout";
import Template014OrderSuccess from "../components/Template014/Template014OrderSuccess";
import Template014ProductCard from "../components/Template014/Template014ProductCard";
import Template014TopBar from "../components/Template014/Template014TopBar";
import {
  BOTTOM_NAV_SPACE,
  T014,
  formatNumber,
} from "../components/Template014/utils";

type MenuView = "menu" | "checkout" | "success";

/** Previews live inside a frame, so they get a fixed height instead of 100dvh. */
const PREVIEW_HEIGHT = "640px";
const FULL_HEIGHT = "100dvh";

export default function Template014({
  menu,
  qrToken,
  isPreview = false,
}: TemplateProps) {
  const fullHeight = isPreview ? PREVIEW_HEIGHT : FULL_HEIGHT;

  const [view, setView] = useState<MenuView>("menu");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    total: number;
  } | null>(null);

  const [position, setPosition] = useState<{
    index: number;
    direction: 1 | -1;
  }>({ index: 0, direction: 1 });

  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => menu.categories.filter((category) => category.products.length > 0),
    [menu.categories],
  );

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

  /* Clamp in case the menu changes underneath us. */
  const index = Math.min(position.index, Math.max(categories.length - 1, 0));
  const activeCategory = categories[index];
  const previousCategory = index > 0 ? categories[index - 1] : null;
  const nextCategory = index < categories.length - 1 ? categories[index + 1] : null;

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= categories.length) return;

      setPosition({ index: nextIndex, direction: nextIndex > index ? 1 : -1 });
    },
    [categories.length, index],
  );

  /* Every category change starts at the top of its product list. */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [activeCategory?.id]);

  const handleSelectCategory = (id: string) => {
    const nextIndex = categories.findIndex((category) => category.id === id);

    if (nextIndex >= 0) goTo(nextIndex);
  };

  const toggleSearch = () => {
    if (searchOpen) setSearch("");
    setSearchOpen((open) => !open);
  };

  const closeCart = useCallback(() => setCartOpen(false), []);

  const handleCheckout = () => {
    if (!cartItems.length) return;

    setCartOpen(false);
    setView("checkout");
  };

  if (view === "checkout") {
    return (
      <Template014Checkout
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
      <Template014OrderSuccess
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
      style={{
        height: fullHeight,
        backgroundColor: T014.base,
        color: T014.text,
      }}
    >
      <Template014TopBar
        shopName={menu.shop.name}
        description={menu.shop.description}
        searchOpen={searchOpen}
        search={search}
        onSearchChange={setSearch}
        onToggleSearch={toggleSearch}
      />

      {!isSearching && categories.length > 0 && (
        <Template014CategoryStrip
          categories={categories.map((category) => ({
            id: category.id,
            name: category.name,
            count: category.products.length,
          }))}
          activeId={activeCategory?.id ?? ""}
          onSelect={handleSelectCategory}
        />
      )}

      <main
        ref={scrollRef}
        className={`flex-1 overflow-y-auto ${T014.hideScrollbar}`}
        style={{ paddingBottom: BOTTOM_NAV_SPACE }}
      >
        <div className="mx-auto max-w-5xl px-4 pt-5">
          {isSearching ? (
            filteredCategories.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <SearchX size={32} style={{ color: T014.muted }} />

                <p className="mt-3 text-sm font-bold">محصولی پیدا نشد</p>

                <p className="mt-1 text-xs" style={{ color: T014.muted }}>
                  عبارت دیگری را امتحان کنید.
                </p>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <section key={category.id} className="mb-6">
                  <h2
                    className="mb-3 text-sm font-black"
                    style={{ color: T014.accent }}
                  >
                    {category.name}
                  </h2>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {category.products.map((product) => (
                      <Template014ProductCard
                        key={product.id}
                        product={product}
                        quantity={quantities[product.id] ?? 0}
                        onAdd={addProduct}
                        onDecrease={decreaseProduct}
                      />
                    ))}
                  </div>
                </section>
              ))
            )
          ) : !activeCategory ? (
            <p
              className="py-20 text-center text-sm"
              style={{ color: T014.muted }}
            >
              هنوز محصولی در این منو ثبت نشده است.
            </p>
          ) : (
            <AnimatePresence mode="wait" initial={false} custom={position.direction}>
              <motion.section
                key={activeCategory.id}
                custom={position.direction}
                initial={{ opacity: 0, x: position.direction * -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: position.direction * 28 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                aria-label={activeCategory.name}
              >
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="text-xl font-black">{activeCategory.name}</h2>

                  <span
                    className="text-xs"
                    style={{ color: T014.muted }}
                  >
                    {formatNumber(activeCategory.products.length)} محصول
                  </span>

                  <span
                    aria-hidden
                    className="h-px flex-1"
                    style={{ backgroundColor: T014.line }}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {activeCategory.products.map((product) => (
                    <Template014ProductCard
                      key={product.id}
                      product={product}
                      quantity={quantities[product.id] ?? 0}
                      onAdd={addProduct}
                      onDecrease={decreaseProduct}
                    />
                  ))}
                </div>
              </motion.section>
            </AnimatePresence>
          )}
        </div>
      </main>

      <Template014BottomNav
        previousName={previousCategory?.name ?? null}
        nextName={nextCategory?.name ?? null}
        navigationEnabled={!isSearching && categories.length > 0}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onPrevious={() => goTo(index - 1)}
        onNext={() => goTo(index + 1)}
        onCartClick={() => setCartOpen(true)}
      />

      <Template014CartSheet
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
