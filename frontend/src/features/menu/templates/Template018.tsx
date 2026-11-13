"use client";

import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { SearchX } from "lucide-react";

import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import type { TemplateProps } from "@/features/menu/types/menu.types";

import Template018CartBar from "../components/Template018/Template018CartBar";
import Template018CartDrawer from "../components/Template018/Template018CartDrawer";
import {
  CategoryRail,
  CategoryStrip,
} from "../components/Template018/Template018CategoryNav";
import Template018CategorySection from "../components/Template018/Template018CategorySection";
import Template018Checkout from "../components/Template018/Template018Checkout";
import Template018Header from "../components/Template018/Template018Header";
import Template018Hero from "../components/Template018/Template018Hero";
import Template018OrderSuccess from "../components/Template018/Template018OrderSuccess";
import { useScrollSpy } from "../components/Template018/useScrollSpy";
import {
  CART_BAR_SPACE,
  N018,
  type CartControls,
} from "../components/Template018/utils";

type MenuView = "menu" | "checkout" | "success";

const PREVIEW_HEIGHT = "640px";
const FULL_HEIGHT = "100dvh";

function Screen({ height, children }: { height: string; children: ReactNode }) {
  return (
    <div
      dir="rtl"
      className={`w-full overflow-y-auto ${N018.hideScrollbar}`}
      style={{ height, backgroundColor: N018.bg, color: N018.fg }}
    >
      {children}
    </div>
  );
}

export default function Template018({
  menu,
  qrToken,
  isPreview = false,
}: TemplateProps) {
  const fullHeight = isPreview ? PREVIEW_HEIGHT : FULL_HEIGHT;

  const scrollRef = useRef<HTMLElement>(null);

  const [view, setView] = useState<MenuView>("menu");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    total: number;
  } | null>(null);

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

  const visibleCategories = useMemo(
    () => filteredCategories.filter((category) => category.products.length > 0),
    [filteredCategories],
  );

  const categoryIds = useMemo(
    () => visibleCategories.map((category) => category.id),
    [visibleCategories],
  );

  const { activeId, scrollTo } = useScrollSpy(scrollRef, categoryIds);

  const controls: CartControls = useMemo(
    () => ({ quantities, onAdd: addProduct, onDecrease: decreaseProduct }),
    [quantities, addProduct, decreaseProduct],
  );

  const productCount = useMemo(
    () => visibleCategories.reduce((sum, c) => sum + c.products.length, 0),
    [visibleCategories],
  );

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
      <Screen height={fullHeight}>
        <Template018Checkout
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
      </Screen>
    );
  }

  if (view === "success" && createdOrder) {
    return (
      <Screen height={fullHeight}>
        <Template018OrderSuccess
          orderId={createdOrder.id}
          total={createdOrder.total}
          onBack={() => {
            setCreatedOrder(null);
            setView("menu");
          }}
        />
      </Screen>
    );
  }

  return (
    <div
      dir="rtl"
      className="relative flex w-full flex-col overflow-hidden"
      style={{ height: fullHeight, backgroundColor: N018.bg, color: N018.fg }}
    >
      <Template018Header
        shopName={menu.shop.name}
        logo={menu.shop.logo}
        searchOpen={searchOpen}
        search={search}
        onSearchChange={setSearch}
        onToggleSearch={toggleSearch}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <main
        ref={scrollRef}
        className={`flex-1 overflow-y-auto px-4 sm:px-8 ${N018.hideScrollbar}`}
        style={{ paddingBottom: CART_BAR_SPACE }}
      >
        <div className="mx-auto max-w-6xl">
          {!isSearching && (
            <Template018Hero
              shopName={menu.shop.name}
              description={menu.shop.description}
              categoryCount={visibleCategories.length}
              productCount={productCount}
            />
          )}

          <CategoryStrip
            categories={visibleCategories}
            activeId={activeId}
            onSelect={scrollTo}
          />

          {visibleCategories.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <SearchX size={32} style={{ color: N018.muted }} />

              <p className="mt-3 text-sm font-black">
                {isSearching
                  ? "محصولی پیدا نشد"
                  : "هنوز محصولی در این منو ثبت نشده است."}
              </p>

              {isSearching && (
                <p className="mt-1 text-xs" style={{ color: N018.muted }}>
                  عبارت دیگری را امتحان کنید.
                </p>
              )}
            </div>
          ) : (
            <div className="lg:mt-8 lg:grid lg:grid-cols-[13rem_1fr] lg:gap-8">
              <CategoryRail
                categories={visibleCategories}
                activeId={activeId}
                onSelect={scrollTo}
              />

              <div className="min-w-0 pb-6">
                {visibleCategories.map((category, index) => (
                  <Template018CategorySection
                    key={category.id}
                    category={category}
                    index={index}
                    controls={controls}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="lg:hidden">
        <Template018CartBar
          count={cartCount}
          total={cartTotal}
          onClick={() => setCartOpen(true)}
        />
      </div>

      <Template018CartDrawer
        open={cartOpen}
        items={cartItems}
        total={cartTotal}
        onIncrease={increaseProduct}
        onDecrease={decreaseProduct}
        onRemove={removeProduct}
        onClear={clearCart}
        onCheckout={handleCheckout}
        onClose={closeCart}
      />
    </div>
  );
}
