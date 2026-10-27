"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice, type CartLine } from "../adapter";
import { EmptyState } from "./empty-state";
import { Minus, Plus, Trash, X } from "lucide-react";

interface Props {
  open: boolean;
  lines: CartLine[];
  total: number;
  onClose: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  open,
  lines,
  total,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            className="ch-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            className="ch-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="سبد خرید"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="ch-drawer__head">
              <h2>سبد خرید</h2>
              <button
                ref={closeRef}
                type="button"
                className="ch-icon-btn"
                onClick={onClose}
                aria-label="بستن سبد"
              >
                <X />
              </button>
            </div>

            {lines.length === 0 ? (
              <EmptyState
                title="سبد شما خالی است"
                description="از منو محصولی اضافه کنید."
                actionLabel="بازگشت به منو"
                onAction={onClose}
              />
            ) : (
              <>
                <ul className="ch-drawer__list">
                  {lines.map(({ product, quantity }) => (
                    <li key={product.id} className="ch-line">
                      <div className="ch-line__top">
                        <span className="ch-line__name">{product.name}</span>
                        <button
                          type="button"
                          className="ch-icon-btn"
                          style={{ width: 36, height: 36 }}
                          onClick={() => onRemove(product.id)}
                          aria-label={`حذف ${product.name}`}
                        >
                          <Trash width={18} height={18} />
                        </button>
                      </div>
                      <div className="ch-line__bottom">
                        <div
                          className="ch-stepper"
                          role="group"
                          aria-label={`تعداد ${product.name}`}
                        >
                          <button
                            type="button"
                            onClick={() => onDecrease(product.id)}
                            aria-label="کم کردن"
                          >
                            <Minus width={16} height={16} />
                          </button>
                          <output>
                            {new Intl.NumberFormat("fa-IR").format(quantity)}
                          </output>
                          <button
                            type="button"
                            onClick={() => onIncrease(product.id)}
                            aria-label="زیاد کردن"
                          >
                            <Plus width={16} height={16} />
                          </button>
                        </div>
                        <span className="ch-price">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="ch-drawer__foot">
                  <div className="ch-total">
                    <span>جمع</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <button
                    type="button"
                    className="ch-btn ch-btn--block"
                    onClick={onCheckout}
                  >
                    ادامه و ثبت سفارش
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
