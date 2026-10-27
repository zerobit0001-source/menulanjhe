"use client";
import { motion } from "framer-motion";
import { formatPrice } from "../adapter";
import { Coffee, ShoppingCart } from "lucide-react";

interface Props {
  name: string;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onGoMenu: () => void;
}

export function CoffeeHeader({
  name,
  cartCount,
  cartTotal,
  onOpenCart,
  onGoMenu,
}: Props) {
  return (
    <header className="ch-header">
      <div className="ch-container ch-header__bar">
        <div className="ch-brand">
          <Coffee />
          <span>{name}</span>
        </div>
        <nav className="ch-header__actions" aria-label="ناوبری اصلی">
          <button type="button" className="ch-navlink" onClick={onGoMenu}>
            منو
          </button>
          <motion.button
            type="button"
            className="ch-cart-btn"
            onClick={onOpenCart}
            whileTap={{ scale: 0.96 }}
            aria-label={`سبد خرید، ${cartCount} مورد`}
          >
            <ShoppingCart />
            <span className="ch-badge" key={cartCount}>
              <motion.span
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.18 }}
              >
                {new Intl.NumberFormat("fa-IR").format(cartCount)}
              </motion.span>
            </span>
            {cartCount > 0 && (
              <span
                className="ch-navlink"
                style={{ display: "inline", color: "inherit", padding: 0 }}
                aria-hidden
              >
                {formatPrice(cartTotal)}
              </span>
            )}
          </motion.button>
        </nav>
      </div>
    </header>
  );
}
