"use client";
import type { T7Category, T7Product } from "./bindings";
import { Template008ProductCard } from "./Template008ProductCard";

interface Props {
  groups: { category?: T7Category; products: T7Product[] }[];
  quantityOf: (id: T7Product["id"]) => number;
  onAdd: (p: T7Product) => void;
  onIncrement: (id: T7Product["id"]) => void;
  onDecrement: (id: T7Product["id"]) => void;
}

export function Template008ProductList({
  groups,
  quantityOf,
  onAdd,
  onIncrement,
  onDecrement,
}: Props) {
  const empty = groups.every((g) => g.products.length === 0);
  if (empty)
    return (
      <p className="px-4 py-16 text-center text-sm text-[#737373]">
        محصولی پیدا نشد. عبارت دیگری را جستجو کنید.
      </p>
    );
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 pb-32 pt-2">
      {groups
        .filter((g) => g.products.length)
        .map((g) => (
          <section key={String(g.category?.id ?? "results")}>
            {g.category && (
              <h2 className="mb-3 text-lg font-bold text-[#171717]">
                {g.category.name}
              </h2>
            )}
            <div className="grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 lg:grid-cols-3">
              {g.products.map((p) => (
                <Template008ProductCard
                  key={String(p.id)}
                  product={p}
                  quantity={quantityOf(p.id)}
                  onAdd={() => onAdd(p)}
                  onIncrement={() => onIncrement(p.id)}
                  onDecrement={() => onDecrement(p.id)}
                />
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
