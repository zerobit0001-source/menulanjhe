"use client";
import { motion } from "framer-motion";

interface Props {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  onExplore: () => void;
}

export function CoffeeHero({ name, description, imageUrl, onExplore }: Props) {
  return (
    <section className="ch-hero" aria-labelledby="ch-hero-title">
      <div className="ch-container ch-hero__inner">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 id="ch-hero-title">{name}</h1>
          {description ? <p>{description}</p> : <div style={{ height: 14 }} />}
          <motion.button
            type="button"
            className="ch-btn ch-btn--cream"
            onClick={onExplore}
            whileTap={{ scale: 0.97 }}
          >
            مشاهده منو
          </motion.button>
        </motion.div>
        {imageUrl && (
          <motion.div
            className="ch-hero__img"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="" loading="eager" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
