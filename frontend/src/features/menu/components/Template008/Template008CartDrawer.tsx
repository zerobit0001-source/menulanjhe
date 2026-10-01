"use client";
import { Trash2 } from "lucide-react";
import { Template007Thumb, formatToman } from "./utils";
import { T7CartLine } from "./bindings";
import { Template008Sheet } from "./Template008Sheet";
import { Template008QtyControl } from "./Template008ProductCard";

interface Props {
  open: boolean;
  lines: T7CartLine[];
  total: number;
  onClose: () => void;
  onCheckout: () => void;
  onIncrement: (id: T7CartLine["product"]["id"]) => void;
  onDecrement: (id: T7CartLine["product"]["id"]) => void;
  onRemove: (id: T7CartLine["product"]["id"]) => void;
}

export function Template008CartDrawer({
  open,
  lines,
  total,
  onClose,
  onCheckout,
  onIncrement,
  onDecrement,
  onRemove,
}: Props) {
  return (
    <Template008Sheet open={open} title="سبد خرید" onClose={onClose}>
      {lines.length === 0 ? (
        <p className="px-5 pb-12 pt-6 text-center text-sm text-[#737373]">
          سبد خرید شما خالی است.
        </p>
      ) : (
        <>
          <ul className="flex-1 space-y-3 overflow-y-auto px-5 pb-4">
            {lines.map(({ product, quantity }) => (
              <li
                key={String(product.id)}
                className="flex gap-3 rounded-3xl border border-[#E5E5E5] bg-white p-3"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                  <Template007Thumb src={product.image} alt={product.name} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-[#171717]">
                      {product.name}
                    </h3>
                    <button
                      onClick={() => onRemove(product.id)}
                      aria-label="حذف"
                      className="text-[#A3A3A3] active:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold">
                      {formatToman(product.price * quantity)}
                    </span>
                    <Template008QtyControl
                      quantity={quantity}
                      onIncrement={() => onIncrement(product.id)}
                      onDecrement={() => onDecrement(product.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-3 border-t border-[#E5E5E5] bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 md:rounded-b-[28px]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#737373]">جمع کل</span>
              <span className="text-lg font-bold text-[#171717]">
                {formatToman(total)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="h-14 w-full rounded-full bg-[#F5C400] text-[15px] font-bold text-[#171717] active:bg-[#E5B800]"
            >
              ادامه و ثبت سفارش
            </button>
          </div>
        </>
      )}
    </Template008Sheet>
  );
}
