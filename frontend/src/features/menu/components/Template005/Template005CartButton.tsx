"use client";

import { ShoppingBag } from "lucide-react";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

export default function Template005CartButton({
  count,
  total,
  onClick,
}: Props) {
  if (!count) return null;

  return (
    <div className="fixed bottom-5 left-0 right-0 z-40 px-4">
      <button
        type="button"
        onClick={onClick}
        className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl bg-slate-950 px-5 py-4 text-white shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <ShoppingBag size={19} />

          <span className="text-sm font-bold">{count} محصول</span>
        </div>

        <span className="text-sm font-black">
          {total.toLocaleString("fa-IR")} تومان
        </span>
      </button>
    </div>
  );
}
