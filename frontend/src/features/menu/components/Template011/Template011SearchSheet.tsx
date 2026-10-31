"use client";

import { Search, SearchX } from "lucide-react";

import type { MenuCategory } from "../../types/menu.types";
import Template011Sheet from "./Template011Sheet";
import { T011, formatPrice } from "./utils";

type Props = {
  open: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  isSearching: boolean;
  results: MenuCategory[];
  onSelect: (categoryId: string, productId: string) => void;
  onClose: () => void;
};

export default function Template011SearchSheet({
  open,
  search,
  onSearchChange,
  isSearching,
  results,
  onSelect,
  onClose,
}: Props) {
  return (
    <Template011Sheet open={open} title="جستجو در منو" onClose={onClose}>
      <div className="px-5 pb-3">
        <label className="flex h-12 items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4">
          <Search size={18} className="shrink-0 text-white/60" />

          <input
            autoFocus
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="نام محصول را بنویسید..."
            aria-label="جستجوی محصول"
            className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
        </label>
      </div>

      <div className={`flex-1 overflow-y-auto px-5 pb-8 ${T011.hideScrollbar}`}>
        {!isSearching ? (
          <p className="py-10 text-center text-xs text-white/50">
            برای پیدا کردن محصول، نام آن را تایپ کنید.
          </p>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center text-white/60">
            <SearchX size={28} />

            <p className="mt-3 text-sm font-bold text-white">محصولی پیدا نشد</p>

            <p className="mt-1 text-xs">عبارت دیگری را امتحان کنید.</p>
          </div>
        ) : (
          results.map((category) => (
            <section key={category.id} className="mb-4">
              <h3 className="mb-2 text-xs font-bold text-white/50">
                {category.name}
              </h3>

              <ul className="space-y-2">
                {category.products.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(category.id, product.id)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-2.5 text-right transition-colors hover:bg-white/15"
                    >
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
                        {product.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">
                          {product.name}
                        </p>

                        <p className="mt-0.5 text-xs text-white/60">
                          {product.available
                            ? formatPrice(product.price)
                            : "ناموجود"}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </Template011Sheet>
  );
}
