"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchX } from "lucide-react";

import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import type {
  MenuProduct,
  TemplateProps,
} from "@/features/menu/types/menu.types";

import Template013CartBar from "../components/Template013/Template013CartBar";
import Template013CartSheet from "../components/Template013/Template013CartSheet";
import Template013Checkout from "../components/Template013/Template013Checkout";
import Template013DetailSheet from "../components/Template013/Template013DetailSheet";
import Template013Item from "../components/Template013/Template013Item";
import Template013OrderSuccess from "../components/Template013/Template013OrderSuccess";
import Template013Tabs from "../components/Template013/Template013Tabs";
import Template013TopBar from "../components/Template013/Template013TopBar";
import { T013 } from "../components/Template013/utils";

type MenuView = "menu" | "checkout" | "success";

/** Previews live inside a frame, so they get a fixed height instead of 100dvh. */
const PREVIEW_HEIGHT = "640px";
const FULL_HEIGHT = "100dvh";

const sectionDomId = (id: string) => `t013-section-${id}`;

export default function Template013({
  menu,
  qrToken,
  isPreview = false,
}: TemplateProps) {
  const fullHeight = isPreview ? PREVIEW_HEIGHT : FULL_HEIGHT;

  const [view, setView] = useState<MenuView>("menu");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [detail, setDetail] = useState<MenuProduct | null>(null);
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    total: number;
  } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(
    () => menu.categories.filter((category) => category.products.length > 0),
    [menu.categories],
  );

  const [activeId, setActiveId] = useState("");
  const currentActiveId = activeId || sections[0]?.id || "";

  /* "Signature" items come from the existing popular quick section. */
  const signatureIds = useMemo(() => {
    const popular = menu.quickSections.find(
      (section) => section.type === "popular",
    );

    return new Set(popular?.products.map((product) => product.id) ?? []);
  }, [menu.quickSections]);

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

  /* Scroll-spy: highlight the tab whose section is near the top. */
  useEffect(() => {
    const root = scrollRef.current;

    if (!root || isSearching || view !== "menu") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) {
          setActiveId(visible.target.getAttribute("data-section-id") ?? "");
        }
      },
      { root, rootMargin: "0px 0px -75% 0px", threshold: 0 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(sectionDomId(section.id));
      if (element && root.contains(element)) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, isSearching, view]);

  const handleTabSelect = (id: string) => {
    setActiveId(id);

    document.getElementById(sectionDomId(id))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleSearch = () => {
    if (searchOpen) setSearch("");
    setSearchOpen((open) => !open);
  };

  const closeCart = useCallback(() => setCartOpen(false), []);
  const closeDetail = useCallback(() => setDetail(null), []);

  const handleCheckout = () => {
    if (!cartItems.length) return;

    setCartOpen(false);
    setView("checkout");
  };

  const renderItem = (product: MenuProduct) => (
    <Template013Item
      key={product.id}
      product={product}
      quantity={quantities[product.id] ?? 0}
      signature={signatureIds.has(product.id)}
      onOpen={setDetail}
      onAdd={addProduct}
      onDecrease={decreaseProduct}
    />
  );

  if (view === "checkout") {
    return (
      <Template013Checkout
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
      <Template013OrderSuccess
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
        backgroundColor: T013.base,
        color: T013.text,
      }}
    >
      <Template013TopBar
        shopName={menu.shop.name}
        searchOpen={searchOpen}
        search={search}
        onSearchChange={setSearch}
        onToggleSearch={toggleSearch}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      {!isSearching && sections.length > 0 && (
        <Template013Tabs
          tabs={sections.map((section) => ({
            id: section.id,
            name: section.name,
          }))}
          activeId={currentActiveId}
          onSelect={handleTabSelect}
        />
      )}

      <main
        ref={scrollRef}
        className={`flex-1 overflow-y-auto pb-32 ${T013.hideScrollbar}`}
      >
        <div className="mx-auto max-w-3xl px-5">
          {/* Hero */}
          {!isSearching && (
            <section className="pb-6 pt-8 text-center">
              <h1
                className="text-3xl font-black leading-snug"
                style={{ color: T013.text }}
              >
                {menu.shop.name}
              </h1>

              <div
                aria-hidden
                className="mx-auto my-4 h-px w-16"
                style={{ backgroundColor: T013.accent }}
              />

              {menu.shop.description && (
                <p className="text-sm leading-7" style={{ color: T013.muted }}>
                  {menu.shop.description}
                </p>
              )}

              <p
                className="mt-3 text-[11px]"
                style={{ color: `${T013.muted}B3` }}
              >
                قیمت‌ها به تومان است
              </p>
            </section>
          )}

          {isSearching ? (
            filteredCategories.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <SearchX size={32} style={{ color: T013.muted }} />

                <p className="mt-3 text-sm font-bold">محصولی پیدا نشد</p>

                <p className="mt-1 text-xs" style={{ color: T013.muted }}>
                  عبارت دیگری را امتحان کنید.
                </p>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <section key={category.id} className="pt-6">
                  <h2
                    className="text-xs font-bold"
                    style={{ color: T013.accent }}
                  >
                    {category.name}
                  </h2>

                  {category.products.map(renderItem)}
                </section>
              ))
            )
          ) : sections.length === 0 ? (
            <p
              className="py-20 text-center text-sm"
              style={{ color: T013.muted }}
            >
              هنوز محصولی در این منو ثبت نشده است.
            </p>
          ) : (
            sections.map((section) => (
              <section
                key={section.id}
                id={sectionDomId(section.id)}
                data-section-id={section.id}
                className="pt-6"
              >
                <div className="flex items-center gap-3">
                  <h2
                    className="text-lg font-black"
                    style={{ color: T013.text }}
                  >
                    {section.name}
                  </h2>

                  <span
                    aria-hidden
                    className="h-px flex-1"
                    style={{ backgroundColor: T013.line }}
                  />
                </div>

                {section.products.map(renderItem)}
              </section>
            ))
          )}
        </div>
      </main>

      <Template013CartBar
        count={cartCount}
        total={cartTotal}
        onClick={() => setCartOpen(true)}
      />

      <Template013DetailSheet
        product={detail}
        quantity={detail ? (quantities[detail.id] ?? 0) : 0}
        onAdd={addProduct}
        onDecrease={decreaseProduct}
        onClose={closeDetail}
      />

      <Template013CartSheet
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
