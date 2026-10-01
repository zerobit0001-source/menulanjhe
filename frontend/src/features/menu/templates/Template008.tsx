"use client";
import { useMemo, useState } from "react";
import { MenuData } from "../types/menu.types";
import {
  toT7Model,
  useT7Cart,
  useT7Order,
  useT7Search,
} from "../components/Template008/bindings";
import { Template008Hero } from "../components/Template008/Template008Hero";
import { Template008Featured } from "../components/Template008/Template008Featured";
import { Template008Search } from "../components/Template008/Template008Search";
import { Template008CartButton } from "../components/Template008/Template008CartButton";
import { Template008CartDrawer } from "../components/Template008/Template008CartDrawer";
import { Template008ProductList } from "../components/Template008/Template008ProductList";
import { Template008Header } from "../components/Template008/Template008Header";
import { Template008CategoryNav } from "../components/Template008/Template008CategoryNav";
import { Template008Checkout } from "../components/Template008/Template008Checkout";
import { Template008OrderSuccess } from "../components/Template008/Template008OrderSuccess";

type Props = {
  menu: MenuData;
  tableName?: string | null;
  qrToken?: string | null;
};

type MenuView = "menu" | "checkout" | "success";

export default function Template008({ menu, tableName, qrToken }: Props) {
  const model = useMemo(() => toT7Model(menu), [menu]);
  const cart = useT7Cart(model.all);
  const order = useT7Order(cart.lines, qrToken);
  const search = useT7Search(model.categories);

  const [activeCat, setActiveCat] = useState<string | number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const searching = search.query.trim().length > 0;
  const groups = searching
    ? [{ products: search.results }]
    : model.categories
        .filter((c) => activeCat === null || c.id === activeCat)
        .map((c) => ({ category: c, products: c.products }));

  const handleSubmit = async (v: { customerName?: string; notes?: string }) => {
    if (await order.submit(v)) {
      cart.clear();
      setCheckoutOpen(false);
      setCartOpen(false);
      setSuccess(true);
    }
  };

  const shared = {
    quantityOf: cart.quantityOf,
    onAdd: cart.add,
    onIncrement: cart.increment,
    onDecrement: cart.decrement,
  };

  return (
    <div dir="rtl" className="min-h-dvh bg-[#FAFAFA] text-[#171717]">
      <Template008Header
        shop={model.shop}
        count={cart.count}
        onCart={() => setCartOpen(true)}
      />
      <Template008Hero shop={model.shop} />
      <Template008Search value={search.query} onChange={search.setQuery} />
      {!searching && (
        <Template008Featured products={model.featured} {...shared} />
      )}
      {!searching && (
        <Template008CategoryNav
          categories={model.categories}
          active={activeCat}
          onSelect={setActiveCat}
        />
      )}
      <Template008ProductList groups={groups} {...shared} />

      <Template008CartButton
        count={cart.count}
        total={cart.total}
        onClick={() => setCartOpen(true)}
      />
      <Template008CartDrawer
        open={cartOpen}
        lines={cart.lines}
        total={cart.total}
        onClose={() => setCartOpen(false)}
        onCheckout={() => setCheckoutOpen(true)}
        onIncrement={cart.increment}
        onDecrement={cart.decrement}
        onRemove={cart.remove}
      />
      <Template008Checkout
        open={checkoutOpen}
        total={cart.total}
        submitting={order.submitting}
        error={order.error}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleSubmit}
      />
      <Template008OrderSuccess
        open={success}
        onDone={() => setSuccess(false)}
      />
    </div>
  );
}
