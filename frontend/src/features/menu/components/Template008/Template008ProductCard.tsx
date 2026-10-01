"use client";
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { T7Product } from "./bindings";
import { Template007Thumb, faNum, formatToman } from "./utils";

interface Props {
  product: T7Product;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  variant?: "grid" | "featured";
}

export function Template008QtyControl({ quantity, onIncrement, onDecrement }: Pick<Props, "quantity" | "onIncrement" | "onDecrement">) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-[#E5E5E5] bg-white p-1">
      <button onClick={onDecrement} aria-label="کم کردن" className="flex h-8 w-8 items-center justify-center rounded-full text-[#171717] active:bg-neutral-100">
        <Minus size={15} />
      </button>
      <span className="min-w-6 text-center text-sm font-semibold tabular-nums">{faNum(quantity)}</span>
      <button onClick={onIncrement} aria-label="اضافه کردن" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5C400] text-[#171717] active:bg-[#E5B800]">
        <Plus size={15} />
      </button>
    </div>
  );
}

export function Template007ProductCard({ product, quantity, onAdd, onIncrement, onDecrement, variant = "grid" }: Props) {
  const off = !product.available;
  const featured = variant === "featured";
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col overflow-hidden rounded-3xl border border-[#E5E5E5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${
        featured ? "w-64 shrink-0 snap-start" : ""
      } ${off ? "opacity-60" : ""}`}
    >
      <div className={`relative m-2 overflow-hidden rounded-[20px] ${featured ? "aspect-[4/3]" : "aspect-[16/11]"}`}>
        <Template007Thumb src={product.image} alt={product.name} className={off ? "grayscale" : ""} />
        {off && (
          <span className="absolute start-2 top-2 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#737373]">ناموجود</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-4 pb-4 pt-1">
        <h3 className="text-base font-semibold leading-6 text-[#171717]">{product.name}</h3>
        {product.description && <p className="line-clamp-2 text-[13px] leading-6 text-[#737373]">{product.description}</p>}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-[15px] font-bold text-[#171717]">{formatToman(product.price)}</span>
          {off ? null : quantity > 0 ? (
            <Template007QtyControl quantity={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
          ) : (
            <button
              onClick={onAdd}
              aria-label={`افزودن ${product.name}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5C400] text-[#171717] transition active:scale-95 active:bg-[#E5B800]"
            >
              <Plus size={18} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
