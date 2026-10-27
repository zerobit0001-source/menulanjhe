"use client";

import { Search, X } from "lucide-react";

interface Props {
  query: string;
  onChange: (q: string) => void;
  resultCount: number;
  isSearching: boolean;
}

export function SearchBar({
  query,
  onChange,
  resultCount,
  isSearching,
}: Props) {
  return (
    <div className="ch-search" role="search">
      <div className="ch-search__field">
        <Search />
        <label className="ch-sr" htmlFor="ch-search-input">
          جستجو در منو
        </label>
        <input
          id="ch-search-input"
          type="search"
          inputMode="search"
          placeholder="جستجوی نوشیدنی یا غذا…"
          value={query}
          onChange={(e) => onChange(e.target.value)}
        />
        {query && (
          <button
            type="button"
            className="ch-icon-btn"
            style={{ width: 36, height: 36 }}
            onClick={() => onChange("")}
            aria-label="پاک کردن جستجو"
          >
            <X width={16} height={16} />
          </button>
        )}
      </div>
      {isSearching && (
        <p className="ch-search__meta" aria-live="polite">
          {new Intl.NumberFormat("fa-IR").format(resultCount)} نتیجه
        </p>
      )}
    </div>
  );
}
