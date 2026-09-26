"use client";

import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Template002Search({ value, onChange }: Props) {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-4">
      <div className="flex h-11 items-center gap-2 rounded-full border border-[#3A332C] bg-[#241F1B] px-4">
        <Search
          size={17}
          className="shrink-0 text-[#9C9186]"
          aria-hidden="true"
        />

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="جستجو در منو..."
          aria-label="جستجو در منو"
          className="min-w-0 flex-1 bg-transparent text-sm text-[#F2EDE4] outline-none placeholder:text-[#9C9186]"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="پاک کردن جستجو"
            className="shrink-0 rounded-full p-1 text-[#9C9186] transition-colors hover:text-[#F2EDE4]"
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
