"use client";

import { useCallback, useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { motion } from "framer-motion";

import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import type { TemplateProps } from "@/features/menu/types/menu.types";

import Template015CartBar from "../components/Template015/Template015CartBar";
import Template015CartSheet from "../components/Template015/Template015CartSheet";
import Template015CategoryItem from "../components/Template015/Template015CategoryItem";
import Template015Checkout from "../components/Template015/Template015Checkout";
import Template015Header from "../components/Template015/Template015Header";
import Template015OrderSuccess from "../components/Template015/Template015OrderSuccess";
import { CART_BAR_SPACE, P015 } from "../components/Template015/utils";

type MenuView = "menu" | "checkout" | "success";

/** Previews live inside a frame, so they get a fixed height instead of 100dvh. */
const PREVIEW_HEIGHT = "640px";
const FULL_HEIGHT = "100dvh";

export default function Template015({
  menu,
  qrToken,
  isPreview = false,
}: TemplateProps) {
  const fullHeight = isPreview ? PREVIEW_HEIGHT : FULL_HEIGHT;

  const [view, setView] = useState<MenuView>("menu");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  /** Only one category is expanded at a time; null = all collapsed. */
  const [openId, setOpenId] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    total: number;
  } | null>(null);

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

  const toggleCategory = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

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
      <Template015Checkout
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
      <Template015OrderSuccess
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
        backgroundColor: P015.bg,
        color: P015.text,
      }}
    >
      {/* Soft blurred backdrop shapes (decorative) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -right-20 -top-16 h-72 w-72 rounded-full opacity-70 blur-3xl"
          style={{ backgroundColor: P015.soft }}
        />

        <div
          className="absolute -left-24 top-1/2 h-80 w-80 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: P015.soft }}
        />
      </div>

      <Template015Header
        shopName={menu.shop.name}
        description={menu.shop.description}
        searchOpen={searchOpen}
        search={search}
        onSearchChange={setSearch}
        onToggleSearch={toggleSearch}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <main
        className={`relative z-10 flex-1 overflow-y-auto ${P015.hideScrollbar}`}
        style={{ paddingBottom: CART_BAR_SPACE }}
      >
        <div className="mx-auto max-w-2xl space-y-3 px-4 pt-5">
          {isSearching ? (
            filteredCategories.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <SearchX size={32} style={{ color: P015.muted }} />

                <p className="mt-3 text-sm font-black">محصولی پیدا نشد</p>

                <p className="mt-1 text-xs" style={{ color: P015.muted }}>
                  عبارت دیگری را امتحان کنید.
                </p>
              </div>
            ) : (
              /* Results are shown expanded, grouped by category. */
              filteredCategories.map((category) => (
                <Template015CategoryItem
                  key={category.id}
                  category={category}
                  open
                  onToggle={() => undefined}
                  quantities={quantities}
                  onAdd={addProduct}
                  onDecrease={decreaseProduct}
                />
              ))
            )
          ) : categories.length === 0 ? (
            <p
              className="py-20 text-center text-sm"
              style={{ color: P015.muted }}
            >
              هنوز محصولی در این منو ثبت نشده است.
            </p>
          ) : (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.04 }}
              >
                <Template015CategoryItem
                  category={category}
                  open={openId === category.id}
                  onToggle={() => toggleCategory(category.id)}
                  quantities={quantities}
                  onAdd={addProduct}
                  onDecrease={decreaseProduct}
                />
              </motion.div>
            ))
          )}
        </div>
      </main>

      <Template015CartBar
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      <Template015CartSheet
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
