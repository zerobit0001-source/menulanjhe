"use client";

import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Template005Search({ value, onChange }: Props) {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-5">
      <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm">
        <Search size={18} className="text-slate-400" />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="جستجو در منو..."
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-slate-400 transition hover:text-slate-700"
            aria-label="پاک کردن جستجو"
          >
            <X size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
