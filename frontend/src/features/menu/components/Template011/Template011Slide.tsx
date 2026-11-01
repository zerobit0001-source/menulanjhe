"use client";

import { useState } from "react";

import type { MenuProduct } from "../../types/menu.types";
import { formatPrice } from "./utils";

type Props = {
  product: MenuProduct;
};

/** One full-window product. Pure presentation; no cart state. */
export default function Template011Slide({ product }: Props) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(product.image) && !failed;

  return (
    <div className="absolute inset-0 overflow-hidden bg-neutral-900">
      {hasImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.image}
          alt={product.name}
          draggable={false}
          onError={() => setFailed(true)}
          className="h-full w-full select-none object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-full w-full items-center justify-center bg-linear-to-br from-amber-900 via-neutral-800 to-neutral-950"
        >
          <span className="text-[34vmin] font-black leading-none text-white/10">
            {product.name.trim().charAt(0)}
          </span>
        </div>
      )}

      {/* Legibility scrims */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-linear-to-b from-black/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-linear-to-t from-black/90 via-black/45 to-transparent"
      />

      {/* Info */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-40 text-white">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-black leading-tight drop-shadow-lg sm:text-4xl">
              {product.name}
            </h2>
          </div>

          {product.description && (
            <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-7 text-white/80">
              {product.description}
            </p>
          )}

          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full border border-white/25 bg-white/15 px-4 py-2 text-base font-black backdrop-blur-md">
              {formatPrice(product.price)}
            </span>

            {!product.available && (
              <span className="rounded-full bg-red-500/80 px-3 py-2 text-xs font-bold backdrop-blur-md">
                ناموجود
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
