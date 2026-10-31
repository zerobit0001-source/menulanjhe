"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, LayoutGrid, Minus, Plus, ShoppingBag } from "lucide-react";

import type { MenuProduct } from "../../types/menu.types";
import { T011, toFa } from "./utils";

type Props = {
  product: MenuProduct | undefined;
  quantity: number;
  cartCount: number;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onOpenCategories: () => void;
  onOpenCart: () => void;
};

const glassButton =
  "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/25 active:scale-95 " +
  T011.glass;

export default function Template011Controls({
  product,
  quantity,
  cartCount,
  onAdd,
  onDecrease,
  onOpenCategories,
  onOpenCart,
}: Props) {
  const [flashId, setFlashId] = useState<string | null>(null);

  useEffect(() => {
    if (!flashId) return;

    const timer = window.setTimeout(() => setFlashId(null), 900);
    return () => window.clearTimeout(timer);
  }, [flashId]);

  const unavailable = !product || !product.available;
  const justAdded = Boolean(product) && flashId === product?.id;

  const handleAdd = () => {
    if (!product || unavailable) return;

    onAdd(product);
    setFlashId(product.id);
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 px-4 pb-[max(env(safe-area-inset-bottom),20px)]">
      {/* Quantity stepper for the current product */}
      <AnimatePresence>
        {product && quantity > 0 && (
          <motion.div
            key="stepper"
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto flex items-center gap-1 rounded-full p-1 text-white ${T011.glass}`}
          >
            <button
              type="button"
              onClick={() => onDecrease(product)}
              aria-label="کم کردن"
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/20"
            >
              <Minus size={16} />
            </button>

            <span
              className="min-w-16 text-center text-xs font-bold tabular-nums"
              aria-live="polite"
            >
              {toFa(quantity)} عدد در سفارش
            </span>

            <button
              type="button"
              onClick={() => onAdd(product)}
              disabled={unavailable}
              aria-label="اضافه کردن"
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/20 disabled:opacity-40"
            >
              <Plus size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Physical order is fixed: categories | add | cart */}
      <div
        dir="ltr"
        className="pointer-events-auto flex w-full max-w-md items-center justify-center gap-3"
      >
        <button
          type="button"
          onClick={onOpenCategories}
          aria-label="دسته‌بندی‌ها"
          className={glassButton}
        >
          <LayoutGrid size={22} />
        </button>

        <motion.button
          type="button"
          dir="rtl"
          onClick={handleAdd}
          disabled={unavailable}
          whileTap={{ scale: 0.96 }}
          style={
            unavailable
              ? undefined
              : { backgroundColor: T011.accent, color: T011.accentInk }
          }
          className="relative flex h-14 min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-black shadow-[0_10px_30px_rgba(255,180,84,0.35)] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/50 disabled:shadow-none"
        >
          <AnimatePresence mode="wait" initial={false}>
            {justAdded ? (
              <motion.span
                key="added"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2"
              >
                <Check size={18} />
                اضافه شد
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2"
              >
                <Plus size={18} />
                {unavailable ? "ناموجود" : "افزودن به سفارش"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`سبد سفارش، ${toFa(cartCount)} مورد`}
          className={glassButton}
        >
          <ShoppingBag size={22} />

          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-black"
                style={{ backgroundColor: T011.accent, color: T011.accentInk }}
              >
                {toFa(cartCount)}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
