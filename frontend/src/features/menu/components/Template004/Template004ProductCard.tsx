"use client";

import { useState } from "react";
import { Heart, Minus, Plus, UtensilsCrossed } from "lucide-react";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  product: MenuProduct;
  colorIndex: number;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

const CARD_BG = ["#E4F3E1", "#DDEFF6", "#FBF3DA", "#FAE6E0"];

export default function Template004ProductCard({
  product,
  colorIndex,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-3 ${
        !product.available ? "opacity-40" : ""
      }`}
      style={{ backgroundColor: CARD_BG[colorIndex % CARD_BG.length] }}
    >
      <button
        type="button"
        onClick={() => setLiked((value) => !value)}
        className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/80"
      >
        <Heart
          size={14}
          className={liked ? "fill-[#FF9F1C] text-[#FF9F1C]" : "text-gray-400"}
        />
      </button>

      <div className="flex h-24 w-full items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain drop-shadow-md"
          />
        ) : (
          <UtensilsCrossed size={26} className="text-gray-400" />
        )}
      </div>

      <p className="mt-2 line-clamp-1 text-sm font-bold text-gray-900">
        {product.name}
      </p>

      <div className="mt-2 flex items-end justify-between">
        <div>
          {product.available ? (
            <>
              <p className="text-[10px] text-gray-500">شروع از</p>
              <p className="text-sm font-black text-gray-900">
                {product.price.toLocaleString("fa-IR")}{" "}
                <span className="text-[10px] font-normal">تومان</span>
              </p>
            </>
          ) : (
            <p className="text-[11px] font-semibold text-gray-500">ناموجود</p>
          )}
        </div>

        {product.available &&
          (quantity === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white"
            >
              <Plus size={16} />
            </button>
          ) : (
            <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gray-900 px-1.5 py-1">
              <button
                type="button"
                onClick={onIncrease}
                className="flex h-6 w-6 items-center justify-center text-white"
              >
                <Plus size={13} />
              </button>
              <span className="w-3 text-center text-xs font-bold text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={onDecrease}
                className="flex h-6 w-6 items-center justify-center text-white"
              >
                <Minus size={13} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
