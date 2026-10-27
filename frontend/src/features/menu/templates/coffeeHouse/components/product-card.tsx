"use client";
import { motion } from "framer-motion";
import { formatPrice, type MenuProduct } from "../adapter";
import { ProductImage } from "./product-image";
import { Minus, Plus } from "lucide-react";

interface Props {
  product: MenuProduct;
  quantity: number;
  onAdd: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export function ProductCard({
  product,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  const available = product.available;

  return (
    <motion.article
      className={`ch-card${available ? "" : "ch-card--off"}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.22 }}
    >
      <div className="ch-card__media">
        <ProductImage src={product.imageUrl} alt={product.name} />
      </div>
      <div className="ch-card__body">
        <h3 className="ch-card__name">{product.name}</h3>
        {product.description && (
          <p className="ch-card__desc">{product.description}</p>
        )}
        <div className="ch-card__foot">
          <span className="ch-price">{formatPrice(product.price)}</span>
          {!available ? (
            <span className="ch-tag">ناموجود</span>
          ) : quantity === 0 ? (
            <motion.button
              type="button"
              className="ch-btn ch-add text-white!"
              whileTap={{ scale: 0.95 }}
              onClick={() => onAdd(product.id)}
              aria-label={`افزودن ${product.name} به سبد`}
            >
              <Plus width={16} height={16} /> افزودن
            </motion.button>
          ) : (
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
              <motion.output
                key={quantity}
                initial={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                {new Intl.NumberFormat("fa-IR").format(quantity)}
              </motion.output>
              <button
                type="button"
                onClick={() => onIncrease(product.id)}
                aria-label="زیاد کردن"
              >
                <Plus width={16} height={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
