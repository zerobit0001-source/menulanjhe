"use client";
import { ShoppingBag } from "lucide-react";
import type { T7Shop } from "./bindings";
import { faNum } from "./utils";

export function Template008Header({ shop, count, onCart }: { shop: T7Shop; count: number; onCart: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#E5E5E5] bg-[#FAFAFA]/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          {shop.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shop.logo} alt="" className="h-8 w-8 rounded-full border border-[#E5E5E5] object-cover" />
          )}
          <span className="truncate text-[15px] font-semibold text-[#171717]">{shop.name}</span>
        </div>
        <button
          onClick={onCart}
          aria-label="سبد خرید"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#171717] transition active:scale-95"
        >
          <ShoppingBag size={19} strokeWidth={1.75} />
          {count > 0 && (
            <span className="absolute -top-1 -start-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F5C400] px-1 text-[10px] font-bold text-[#171717]">
              {faNum(count)}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
