"use client";
import type { MenuProduct } from "../adapter";
import { ProductCard } from "./product-card";

interface Props {
  products: MenuProduct[];
  quantityOf: (id: string) => number;
  onAdd: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export function ProductGrid({
  products,
  quantityOf,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="ch-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          quantity={quantityOf(p.id)}
          onAdd={onAdd}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </div>
  );
}
