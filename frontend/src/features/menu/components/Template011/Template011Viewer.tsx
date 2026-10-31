"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { MenuProduct } from "../../types/menu.types";
import Template011Slide from "./Template011Slide";

type Props = {
  collectionId: string;
  products: MenuProduct[];
  index: number;
  direction: 1 | -1;
  onIndexChange: (next: number) => void;
};

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.4,
    filter: "blur(16px)",
    scale: 1.04,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-35%" : "35%",
    opacity: 0,
    filter: "blur(16px)",
    scale: 0.97,
  }),
};

export default function Template011Viewer({
  collectionId,
  products,
  index,
  direction,
  onIndexChange,
}: Props) {
  const product = products[index];
  const hasPrev = index > 0;
  const hasNext = index < products.length - 1;

  // Warm the cache for the neighbours so swipes never reveal a blank frame.
  useEffect(() => {
    [products[index + 1], products[index - 1]].forEach((neighbour) => {
      if (neighbour?.image) {
        const img = new Image();
        img.src = neighbour.image;
      }
    });
  }, [products, index]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;

    if ((offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) && hasNext) {
      onIndexChange(index + 1);
    } else if (
      (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) &&
      hasPrev
    ) {
      onIndexChange(index - 1);
    }
  };

  if (!product) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      role="group"
      aria-roledescription="carousel"
      aria-label="محصولات"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`${collectionId}:${product.id}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 260, damping: 32 },
            opacity: { duration: 0.35 },
            filter: { duration: 0.4 },
            scale: { duration: 0.5 },
          }}
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: hasNext ? 0.5 : 0.12, right: hasPrev ? 0.5 : 0.12 }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          aria-roledescription="slide"
          aria-label={`${index + 1} از ${products.length}`}
        >
          <Template011Slide product={product} />
        </motion.div>
      </AnimatePresence>

      {/* Desktop edge arrows (swipe on touch devices) */}
      {hasPrev && (
        <button
          type="button"
          onClick={() => onIndexChange(index - 1)}
          aria-label="محصول قبلی"
          className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-xl transition-colors hover:bg-white/25 md:flex"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={() => onIndexChange(index + 1)}
          aria-label="محصول بعدی"
          className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-xl transition-colors hover:bg-white/25 md:flex"
        >
          <ChevronLeft size={22} />
        </button>
      )}
    </div>
  );
}
