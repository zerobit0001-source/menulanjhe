"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import "./coffee-house.css";
import {
  useCoffeeShop,
  type CheckoutInput,
  type OrderReceiptData,
  type PublicMenu,
} from "./adapter";
import { CoffeeHeader } from "./components/coffee-header";
import { CoffeeHero } from "./components/coffee-hero";
import { SearchBar } from "./components/search-bar";
import { CategoryNavigation } from "./components/category-navigation";
import { QuickSection } from "./components/quick-section";
import { ProductGrid } from "./components/product-grid";
import { CartDrawer } from "./components/cart-drawer";
import { CheckoutView } from "./components/checkout-view";
import { OrderSuccessView } from "./components/order-success-view";
import { EmptyState } from "./components/empty-state";

type View = "menu" | "checkout" | "success";

interface Props {
  menu: PublicMenu;
  qrToken: string;
}

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

export function CoffeeHouseTemplate({ menu, qrToken }: Props) {
  const shop = useCoffeeShop(menu, qrToken);
  const [view, setView] = useState<View>("menu");
  const [cartOpen, setCartOpen] = useState(false);
  const [receipt, setReceipt] = useState<OrderReceiptData | null>(null);

  const { search, cart, order } = shop;
  const { isSubmitting, submit } = order;
  const clearCart = cart.clear;

  const scrollTo = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSubmit = useCallback(
    async (input: CheckoutInput) => {
      if (isSubmitting) return;
      const result = await submit(input);
      if (!result) return; // error is shown by CheckoutView; cart untouched
      setReceipt(result);
      clearCart();
      setView("success");
      window.scrollTo({ top: 0 });
    },
    [isSubmitting, submit, clearCart],
  );

  const goMenu = (resetReceipt = false) => {
    if (resetReceipt) setReceipt(null);
    setView("menu");
    window.scrollTo({ top: 0 });
  };

  const featuredImage =
    menu.categories.flatMap((c) => c.products).find((p) => p.imageUrl)
      ?.imageUrl ?? null;

  const quickSections = search.isSearching
    ? []
    : (menu.quickSections ?? []).filter((s) => s.products.length > 0);
  const visibleCategories = search.categories.filter(
    (c) => c.products.length > 0,
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="ch-root" dir="rtl">
        <CoffeeHeader
          name={menu.restaurantName}
          cartCount={cart.count}
          cartTotal={cart.total}
          onOpenCart={() => setCartOpen(true)}
          onGoMenu={() => (view === "menu" ? scrollTo("ch-menu") : goMenu())}
        />

        <AnimatePresence mode="wait" initial={false}>
          {view === "menu" && (
            <motion.main key="menu" {...fade}>
              <CoffeeHero
                name={menu.restaurantName}
                description={menu.description}
                imageUrl={featuredImage}
                onExplore={() => scrollTo("ch-menu")}
              />

              <div className="ch-container">
                <SearchBar
                  query={search.query}
                  onChange={search.setQuery}
                  resultCount={search.resultCount}
                  isSearching={search.isSearching}
                />
              </div>

              {visibleCategories.length > 0 && (
                <CategoryNavigation
                  categories={visibleCategories}
                  onSelect={(id) => scrollTo(`ch-cat-${id}`)}
                />
              )}

              <div className="ch-container" id="ch-menu">
                {quickSections.map((section) => (
                  <QuickSection
                    key={section.id}
                    section={section}
                    quantityOf={cart.quantityOf}
                    onAdd={cart.add}
                    onIncrease={cart.increase}
                    onDecrease={cart.decrease}
                  />
                ))}

                {visibleCategories.length === 0 ? (
                  <EmptyState
                    title={
                      search.isSearching
                        ? "محصولی پیدا نشد"
                        : "منو هنوز خالی است"
                    }
                    description={
                      search.isSearching
                        ? "عبارت دیگری را جستجو کنید."
                        : undefined
                    }
                    actionLabel={
                      search.isSearching ? "پاک کردن جستجو" : undefined
                    }
                    onAction={
                      search.isSearching ? () => search.setQuery("") : undefined
                    }
                  />
                ) : (
                  visibleCategories.map((category) => (
                    <section
                      key={category.id}
                      id={`ch-cat-${category.id}`}
                      className="ch-section"
                      aria-labelledby={`ch-cat-t-${category.id}`}
                    >
                      <h2
                        id={`ch-cat-t-${category.id}`}
                        className="ch-section__title"
                      >
                        {category.name}
                      </h2>
                      <ProductGrid
                        products={category.products}
                        quantityOf={cart.quantityOf}
                        onAdd={cart.add}
                        onIncrease={cart.increase}
                        onDecrease={cart.decrease}
                      />
                    </section>
                  ))
                )}
                <div style={{ height: 40 }} />
              </div>
            </motion.main>
          )}

          {view === "checkout" && (
            <motion.main key="checkout" {...fade}>
              <CheckoutView
                lines={cart.lines}
                total={cart.total}
                isSubmitting={isSubmitting}
                error={order.error}
                onBack={() => goMenu()}
                onSubmit={handleSubmit}
              />
            </motion.main>
          )}

          {view === "success" && (
            <motion.main key="success" {...fade}>
              <OrderSuccessView
                receipt={receipt}
                onBackToMenu={() => goMenu(true)}
              />
            </motion.main>
          )}
        </AnimatePresence>

        <CartDrawer
          open={cartOpen && view === "menu"}
          lines={cart.lines}
          total={cart.total}
          onClose={() => setCartOpen(false)}
          onIncrease={cart.increase}
          onDecrease={cart.decrease}
          onRemove={cart.remove}
          onCheckout={() => {
            setCartOpen(false);
            setView("checkout");
            window.scrollTo({ top: 0 });
          }}
        />
      </div>
    </MotionConfig>
  );
}
