"use client";

import { ShoppingBag } from "lucide-react";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

export default function Template003CartButton({
  count,
  total,
  onClick,
}: Props) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-3 rounded-full bg-[#1A1A1A] py-3 pl-3 pr-5 text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)]"
      >
        <span className="text-xs font-bold">
          {total.toLocaleString("fa-IR")} تومان
        </span>

        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B4A]">
          <ShoppingBag size={16} />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-[#1A1A1A]">
            {count}
          </span>
        </span>
      </button>
    </div>
  );
}
