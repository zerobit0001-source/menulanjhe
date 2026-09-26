"use client";

import { ShoppingBag } from "lucide-react";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

export default function Template002CartButton({
  count,
  total,
  onClick,
}: Props) {
  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-5">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full max-w-md items-center justify-between rounded-full bg-[#B8935F] px-5 py-3 text-[#1C1815] shadow-[0_10px_30px_-10px_rgba(184,147,95,0.6)] transition hover:bg-[#C7A374]"
      >
        <div className="flex items-center gap-2">
          <ShoppingBag size={17} />
          <span className="text-xs font-bold">مشاهده سبد</span>
          <span className="rounded-full bg-[#1C1815]/15 px-2 py-0.5 text-[10px] font-bold">
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
