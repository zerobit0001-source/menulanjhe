"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import type {
  MenuProduct,
  TemplateProps,
} from "@/features/menu/types/menu.types";

import Template011CartSheet from "../components/Template011/Template011CartSheet";
import Template011CategorySheet from "../components/Template011/Template011CategorySheet";
import Template011Checkout from "../components/Template011/Template011Checkout";
import Template011Controls from "../components/Template011/Template011Controls";
import Template011Header from "../components/Template011/Template011Header";
import Template011OrderSuccess from "../components/Template011/Template011OrderSuccess";
import Template011SearchSheet from "../components/Template011/Template011SearchSheet";
import Template011Viewer from "../components/Template011/Template011Viewer";
import type { Template011Collection } from "../components/Template011/utils";

type MenuView = "menu" | "checkout" | "success";
type SheetName = "categories" | "cart" | "search" | null;

type Position = {
  collectionId: string;
  index: number;
  direction: 1 | -1;
};

/** Height of the template root. Previews live inside a frame, so no 100dvh there. */
const PREVIEW_HEIGHT = "640px";
const FULL_HEIGHT = "100dvh";

export default function Template011({
  menu,
  qrToken,
  isPreview = false,
}: TemplateProps) {
  const fullHeight = isPreview ? PREVIEW_HEIGHT : FULL_HEIGHT;

  const [view, setView] = useState<MenuView>("menu");
  const [sheet, setSheet] = useState<SheetName>(null);
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    total: number;
  } | null>(null);

  /* Categories first, quick sections (when they have products) after them. */
  const collections = useMemo<Template011Collection[]>(() => {
    const categories = menu.categories
      .filter((category) => category.products.length > 0)
      .map((category) => ({
        id: category.id,
        name: category.name,
        products: category.products,
      }));

    const quick = menu.quickSections
      .filter((section) => section.products.length > 0)
      .map((section) => ({
        id: `quick-${section.id}`,
        name: section.title,
        products: section.products,
      }));

    return [...categories, ...quick];
  }, [menu.categories, menu.quickSections]);

  /* Every product the cart may need to resolve, quick sections included. */
  const allProducts = useMemo<MenuProduct[]>(() => {
    const byId = new Map<string, MenuProduct>();

    [
      ...menu.categories.flatMap((category) => category.products),
      ...menu.quickSections.flatMap((section) => section.products),
    ].forEach((product) => {
      if (!byId.has(product.id)) byId.set(product.id, product);
    });

    return Array.from(byId.values());
  }, [menu.categories, menu.quickSections]);

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

  const { search, setSearch, clearSearch, isSearching, filteredCategories } =
    useMenuSearch(menu.categories);

  const [position, setPosition] = useState<Position>({
    collectionId: "",
    index: 0,
    direction: 1,
  });

  const activeCollection =
    collections.find((collection) => collection.id === position.collectionId) ??
    collections[0];

  const products = activeCollection?.products ?? [];
  const index = Math.min(position.index, Math.max(products.length - 1, 0));
  const currentProduct: MenuProduct | undefined = products[index];

  const goTo = useCallback(
    (next: number) => {
      if (!activeCollection) return;

      const clamped = Math.max(
        0,
        Math.min(next, activeCollection.products.length - 1),
      );

      if (clamped === index) return;

      setPosition({
        collectionId: activeCollection.id,
        index: clamped,
        direction: clamped > index ? 1 : -1,
      });
    },
    [activeCollection, index],
  );

  const selectCollection = (id: string) => {
    setPosition({ collectionId: id, index: 0, direction: 1 });
    setSheet(null);
  };

  const selectSearchResult = (categoryId: string, productId: string) => {
    const category = collections.find((item) => item.id === categoryId);
    const productIndex =
      category?.products.findIndex((product) => product.id === productId) ?? -1;

    if (category && productIndex >= 0) {
      setPosition({
        collectionId: category.id,
        index: productIndex,
        direction: 1,
      });
    }

    setSheet(null);
    clearSearch();
  };

  const closeSheet = useCallback(() => setSheet(null), []);

  const closeSearch = () => {
    setSheet(null);
    clearSearch();
  };

  /* Keyboard paging (LTR arrows map to the physical swipe direction). */
  useEffect(() => {
    if (isPreview || view !== "menu" || sheet !== null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goTo(index + 1);
      if (event.key === "ArrowRight") goTo(index - 1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, isPreview, sheet, view]);

  const handleCheckout = () => {
    if (!cartItems.length) return;

    setSheet(null);
    setView("checkout");
  };

  if (view === "checkout") {
    return (
      <Template011Checkout
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
      <Template011OrderSuccess
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
    <main
      dir="rtl"
      className="relative w-full overflow-hidden bg-neutral-950 text-white"
      style={{ height: fullHeight }}
    >
      {activeCollection && currentProduct ? (
        <>
          <Template011Viewer
            collectionId={activeCollection.id}
            products={products}
            index={index}
            direction={position.direction}
            onIndexChange={goTo}
          />

          <Template011Header
            shop={menu.shop}
            collectionName={activeCollection.name}
            index={index}
            total={products.length}
            onSearchClick={() => setSheet("search")}
          />

          <Template011Controls
            product={currentProduct}
            quantity={quantities[currentProduct.id] ?? 0}
            cartCount={cartCount}
            onAdd={addProduct}
            onDecrease={decreaseProduct}
            onOpenCategories={() => setSheet("categories")}
            onOpenCart={() => setSheet("cart")}
          />
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-base font-black">{menu.shop.name}</p>

          <p className="mt-2 text-sm text-white/60">
            هنوز محصولی در این منو ثبت نشده است.
          </p>
        </div>
      )}

      <Template011CategorySheet
        open={sheet === "categories"}
        collections={collections}
        activeId={activeCollection?.id ?? ""}
        onSelect={selectCollection}
        onClose={closeSheet}
      />

      <Template011CartSheet
        open={sheet === "cart"}
        items={cartItems}
        total={cartTotal}
        onIncrease={increaseProduct}
        onDecrease={decreaseProduct}
        onRemove={removeProduct}
        onCheckout={handleCheckout}
        onClose={closeSheet}
      />

      <Template011SearchSheet
        open={sheet === "search"}
        search={search}
        onSearchChange={setSearch}
        isSearching={isSearching}
        results={filteredCategories}
        onSelect={selectSearchResult}
        onClose={closeSearch}
      />
    </main>
  );
}
