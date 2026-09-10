"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { IconButton } from "@mui/material";
import type { MenuProduct } from "../../types/menu.types";

type Props = {
  product: MenuProduct;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function Template001ProductCard({
  product,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <article
      className={`flex min-h-32 gap-3 border-b border-gray-100 py-4 last:border-b-0 ${
        !product.available ? "opacity-50" : ""
      }`}
    >
      <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <ShoppingBag size={30} className="text-gray-300" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>

          {product.discountPercent && (
            <span className="shrink-0 rounded-full bg-red-50 px-2 py-1 text-[9px] font-bold text-red-500">
              {product.discountPercent}٪
            </span>
          )}
        </div>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-[10px] leading-5 text-gray-400">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            {product.originalPrice && (
              <p className="text-[9px] text-gray-400 line-through">
                {product.originalPrice.toLocaleString("fa-IR")}
              </p>
            )}

            <p className="text-xs font-bold text-gray-900">
              {product.price.toLocaleString("fa-IR")} تومان
            </p>
          </div>

          {!product.available ? (
            <span className="text-[10px] text-gray-400">ناموجود</span>
          ) : quantity === 0 ? (
            <IconButton
              onClick={onAdd}
              size="small"
              className="bg-gray-900! text-white!"
            >
              <Plus size={18} />
            </IconButton>
          ) : (
            <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1">
              <IconButton
                onClick={onDecrease}
                size="small"
                className="h-7! w-7!"
              >
                <Minus size={15} />
              </IconButton>

              <span className="w-5 text-center text-xs font-bold">
                {quantity}
              </span>

              <IconButton
                onClick={onIncrease}
                size="small"
                className="h-7! w-7!"
              >
                <Plus size={15} />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
