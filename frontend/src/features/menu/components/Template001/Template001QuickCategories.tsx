"use client";

import { Flame, Percent } from "lucide-react";

type Props = {
  active: string;
  onChange: (id: string) => void;
};

const items = [
  {
    id: "popular",
    title: "محبوب‌ترین",
    icon: Flame,
  },
  {
    id: "discount",
    title: "تخفیف‌ها",
    icon: Percent,
  },
];

export default function Template001QuickCategories({
  active,
  onChange,
}: Props) {
  return (
    <div className="mx-auto flex max-w-2xl gap-2 overflow-x-auto px-4 py-4 scrollbar-hide">
      {items.map((item) => {
        const Icon = item.icon;
        const selected = active === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
              selected
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Icon size={15} />
            {item.title}
          </button>
        );
      })}
    </div>
  );
}
