"use client";
import { useMemo, useState } from "react";
import type { MenuData } from "../../types"; // TODO: adjust to the project's actual type path
import { toT7Model, useT7Cart, useT7Order, useT7Search } from "./bindings";
import { Template007Header } from "./Template007Header";
import { Template007Hero } from "./Template007Hero";
import { Template007Search } from "./Template007Search";
import { Template007Featured } from "./Template007Featured";
import { Template007CategoryNav } from "./Template007CategoryNav";
import { Template007ProductList } from "./Template007ProductList";
import { Template007CartButton } from "./Template007CartButton";
import { Template007CartDrawer } from "./Template007CartDrawer";
import { Template007Checkout } from "./Template007Checkout";
import { Template007OrderSuccess } from "./Template007OrderSuccess";

export default function Template008({ data }: { data: MenuData }) {
  const model = useMemo(() => toT7Model(data), [data]);
  const cart = useT7Cart();
  const order = useT7Order();
  const search = useT7Search(model.all);

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
      <Template007Header
        shop={model.shop}
        count={cart.count}
        onCart={() => setCartOpen(true)}
      />
      <Template007Hero shop={model.shop} />
      <Template007Search value={search.query} onChange={search.setQuery} />
      {!searching && (
        <Template007Featured products={model.featured} {...shared} />
      )}
      {!searching && (
        <Template007CategoryNav
          categories={model.categories}
          active={activeCat}
          onSelect={setActiveCat}
        />
      )}
      <Template007ProductList groups={groups} {...shared} />

      <Template007CartButton
        count={cart.count}
        total={cart.total}
        onClick={() => setCartOpen(true)}
      />
      <Template007CartDrawer
        open={cartOpen}
        lines={cart.lines}
        total={cart.total}
        onClose={() => setCartOpen(false)}
        onCheckout={() => setCheckoutOpen(true)}
        onIncrement={cart.increment}
        onDecrement={cart.decrement}
        onRemove={cart.remove}
      />
      <Template007Checkout
        open={checkoutOpen}
        total={cart.total}
        submitting={order.submitting}
        error={order.error}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleSubmit}
      />
      <Template007OrderSuccess
        open={success}
        onDone={() => setSuccess(false)}
      />
    </div>
  );
}
