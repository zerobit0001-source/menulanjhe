"use client";

import { ShoppingBag } from "lucide-react";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

export default function Template001CartButton({
  count,
  total,
  onClick,
}: Props) {
  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full max-w-md items-center justify-between rounded-2xl bg-gray-900 px-4 py-3 text-white shadow-xl transition hover:bg-gray-800"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
            <ShoppingBag size={17} />
          </div>

          <span className="text-xs font-bold">مشاهده سبد خرید</span>

          <span className="rounded-full bg-white/10 px-2 py-1 text-[10px]">
            {count}
          </span>
        </div>

        <span className="text-xs font-bold">
          {total.toLocaleString("fa-IR")} تومان
        </span>
      </button>
    </div>
  );
}
