"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { SearchX } from "lucide-react";

import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import type { TemplateProps } from "@/features/menu/types/menu.types";

import { OrnamentalFrame } from "../components/Template016/Ornaments";
import Template016CartBar from "../components/Template016/Template016CartBar";
import Template016CartSheet from "../components/Template016/Template016CartSheet";
import Template016Checkout from "../components/Template016/Template016Checkout";
import Template016Columns from "../components/Template016/Template016Columns";
import Template016OrderSuccess from "../components/Template016/Template016OrderSuccess";
import Template016TopBar from "../components/Template016/Template016TopBar";
import { buildLayout } from "../components/Template016/layout";
import {
  CART_TAB_SPACE,
  V016,
  type CartControls,
} from "../components/Template016/utils";

type MenuView = "menu" | "checkout" | "success";

const PREVIEW_HEIGHT = "640px";
const FULL_HEIGHT = "100dvh";
const SPECIAL_LIMIT = 4;

function Screen({
  height,
  children,
}: {
  height: string;
  children: ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className={`w-full overflow-y-auto ${V016.hideScrollbar}`}
      style={{ height, backgroundColor: V016.cream, color: V016.text }}
    >
      {children}
    </div>
  );
}

export default function Template016({
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

  const allProducts = useMemo(
    () => menu.categories.flatMap((category) => category.products),
    [menu.categories],
  );

  /** "Special menu" = the shop's own quick-section products (no invented data). */
  const specialProducts = useMemo(() => {
    const seen = new Set<string>();

    return (menu.quickSections ?? [])
      .flatMap((section) => section.products)
      .filter((product) => {
        if (seen.has(product.id)) return false;
        seen.add(product.id);
        return true;
      })
      .slice(0, SPECIAL_LIMIT);
  }, [menu.quickSections]);

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

  const layout = useMemo(
    () =>
      isSearching
        ? buildLayout(filteredCategories, [])
        : buildLayout(menu.categories, specialProducts),
    [isSearching, filteredCategories, menu.categories, specialProducts],
  );

  const controls: CartControls = useMemo(
    () => ({
      quantities,
      onAdd: addProduct,
      onDecrease: decreaseProduct,
    }),
    [quantities, addProduct, decreaseProduct],
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
        <Template016Checkout
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
        <Template016OrderSuccess
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

  const isEmpty =
    layout.left.length + layout.center.length + layout.right.length === 0;

  return (
    <div
      dir="rtl"
      className="relative flex w-full flex-col overflow-hidden"
      style={{
        height: fullHeight,
        backgroundColor: V016.cream,
        color: V016.text,
      }}
    >
      <Template016TopBar
        shopName={menu.shop.name}
        searchOpen={searchOpen}
        search={search}
        onSearchChange={setSearch}
        onToggleSearch={toggleSearch}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <main
        className={`flex-1 overflow-y-auto px-3 pt-4 sm:px-6 ${V016.hideScrollbar}`}
        style={{ paddingBottom: CART_TAB_SPACE }}
      >
        <div className="mx-auto max-w-6xl">
          <OrnamentalFrame>
            {isEmpty ? (
              <div className="flex flex-col items-center py-20 text-center">
                <SearchX size={32} style={{ color: V016.muted }} />

                <p className="mt-3 text-sm font-black" style={{ color: V016.dark }}>
                  {isSearching
                    ? "محصولی پیدا نشد"
                    : "هنوز محصولی در این منو ثبت نشده است."}
                </p>
              </div>
            ) : (
              <Template016Columns
                layout={layout}
                shopName={menu.shop.name}
                description={menu.shop.description}
                controls={controls}
              />
            )}
          </OrnamentalFrame>
        </div>
      </main>

      <Template016CartBar
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      <Template016CartSheet
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
