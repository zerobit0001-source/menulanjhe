"use client";

import { Minus, Plus } from "lucide-react";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  product: MenuProduct;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function Template002ProductRow({
  product,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className={`py-4 ${!product.available ? "opacity-40" : ""}`}>
      <div className="flex items-baseline gap-2">
        <span className="whitespace-nowrap text-[15px] font-bold text-[#F2EDE4]">
          {product.name}
        </span>

        <span className="mb-1 h-0 flex-1 border-b border-dotted border-[#4A423A]" />

        <span className="whitespace-nowrap text-sm font-bold text-[#B8935F]">
          {product.price.toLocaleString("fa-IR")}
        </span>
      </div>

      {product.description && (
        <p className="mt-1.5 max-w-md text-xs leading-5 text-[#9C9186]">
          {product.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between">
        {!product.available ? (
          <span className="text-[11px] font-semibold text-[#9C9186]">
            ناموجود
          </span>
        ) : (
          <span />
        )}

        {product.available &&
          (quantity === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="flex items-center gap-1 rounded-full border border-[#B8935F]/50 px-3 py-1.5 text-xs font-bold text-[#B8935F] transition-colors hover:bg-[#B8935F]/10"
            >
              <Plus size={13} />
              افزودن
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-full border border-[#B8935F]/40 bg-[#241F1B] px-2 py-1">
              <button
                type="button"
                onClick={onIncrease}
                className="flex h-6 w-6 items-center justify-center rounded-full text-[#F2EDE4]"
              >
                <Plus size={13} />
              </button>

              <span className="w-4 text-center text-xs font-bold text-[#F2EDE4]">
                {quantity}
              </span>

              <button
                type="button"
                onClick={onDecrease}
                className="flex h-6 w-6 items-center justify-center rounded-full text-[#F2EDE4]"
              >
                <Minus size={13} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
